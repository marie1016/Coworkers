export enum Roles {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface Member {
  userId: number;
  groupId: number;
  role: Roles;
  userName: string;
  userEmail: string;
  userImage: string;
}
