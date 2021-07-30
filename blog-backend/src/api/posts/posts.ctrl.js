import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

// 미들웨어에서 id로 해당 포스트를 찾음. 존재하면 state 로 전달
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);
    // 포스트 존재하지 않으면
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (error) {
    ctx.throw(500, error);
  }
  return next();
};

// id로 찾은 post 가 로그인 중인 사용자가 작성한 포스트인지 확인해 줌.
// 아닌 경우 403 에러 발생
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/**
 * POST /api/posts
 * {
 *  title: '제목',
 *  body: '내용',
 *  tags: ['태그1', '태그2']
 * }
 */
export const write = async (ctx) => {
  // 유효성 검증
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * GET /api/posts?username=&tag=&page=
 */
export const list = async (ctx) => {
  // query 는 문자열, 그래서 숫자로 변환해야함.
  // 값이 주어지지 않으면 1 을 기본으로 사용
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음.
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();

    // custom header 설정
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-page', Math.ceil(postCount / 10));

    // body 가 200자 이상인 경우 200자 까지만 전달
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * GET /api/posts/:id
 */
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

/**
 * DELETE /api/posts/:id
 */
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id);
    ctx.status = 204;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * PATCH /api/posts/:id
 * {
 *  title: '수정',
 *  body: '수정 내용',
 *  tags: ['수정', '태그']
 * }
 *
 * findByIdAndUpdate(id, 업데이트 내용, 업데이트의 옵션)
 */
export const update = async (ctx) => {
  const { id } = ctx.params;

  // 유효성 검증
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 업데이트 된 데이터를 반환, false 인 경우 업데이트 되기 전의 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
