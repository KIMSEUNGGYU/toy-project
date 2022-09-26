import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * token
 * {
 *   _id: '610476cc08148e4ae094d579',
 *  username: 'gyu',
 *  iat: 1627683716,
 *  exp: 1628288516
 * }
 * iat 는 토큰이 생성된 값,
 * exp 는 토큰의 만료 값
 */
const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); // 토큰 없음.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    // 토큰의 남은 유효 기간이 3.5일 미만이면 재 발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (error) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
