export class UserSharePost {
  userId: string;
  postIds: string[];

  constructor({ userId, postIds }: { userId: string; postIds: string[] }) {
    this.userId = userId;
    this.postIds = postIds;
  }
}
