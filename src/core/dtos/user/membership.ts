import { Roles } from "@/core/types/member";

export interface MembershipGroup {
  teamId: string;
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string;
  group: MembershipGroup;
  role: Roles;
}
