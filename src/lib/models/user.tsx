export class User {
  id: string;
  avatarBase64: string;
  firstName: string;
  lastName: string;
  email: string;
  birthOfDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isOnline: boolean;

  constructor({
    id,
    avatarBase64,
    firstName,
    lastName,
    email,
    birthOfDate,
    createdAt,
    updatedAt,
    isVerified,
    isOnline,
  }: {
    id: string;
    avatarBase64: string;
    firstName: string;
    lastName: string;
    email: string;
    birthOfDate: Date;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
    isOnline: boolean;
  }) {
    this.id = id;
    this.avatarBase64 = avatarBase64;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthOfDate = birthOfDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isVerified = isVerified;
    this.isOnline = isOnline;
  }
}

export default User;
