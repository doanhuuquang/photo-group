export class Post {
  id: string;
  authorId: string;
  content: string;
  imageUrls: string[];
  peopleWhoLiked: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    authorId: string,
    content: string,
    imageUrls: string[],
    peopleWhoLiked: string[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.authorId = authorId;
    this.content = content;
    this.imageUrls = imageUrls;
    this.peopleWhoLiked = peopleWhoLiked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
