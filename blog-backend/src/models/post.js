import mongoose from 'mongoose';

const { Schema } = mongoose;

// 스키마 설정
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

// 모델 설정
// model(스키마 이름, 스키마 객체, custom-스키마-이름)
const Post = mongoose.model('Post', PostSchema);
export default Post;

/**
 * 스키마
 * - 컬렉션(테이블)에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체
 *
 * 모델
 * - 데이터베이스에서 실제 작업을 처리하는 객체 (서버에서 실제 DB와 소통하기 위한 객체)
 */
