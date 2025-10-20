export default class PostComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    postId: string,
    authorId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.postId = postId;
    this.authorId = authorId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
