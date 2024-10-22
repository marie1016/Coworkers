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
  image?: string | null;
  name: string;
}

export interface PatchTeamForm {
  image?: string | null;
  name?: string;
}

export interface SubmitTeamResponse {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
