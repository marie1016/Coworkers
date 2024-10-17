import { Member } from "@/core/types/member";

export interface GroupTask {
  id: number;
  groupId: number;
  name: string;
  displayIndex: number;
  createdAt: string;
  updatedAt: string;
  tasks: string[];
}

export interface GroupResponse {
  id: number;
  teamId: string;
  name: string;
  image: string;
  members: Member[];
  taskLists: GroupTask[];
  createdAt: string;
  updatedAt: string;
}

export interface AddTeamForm {
  image?: string;
  name: string;
}

export interface AddTeamResponse {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
