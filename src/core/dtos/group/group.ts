import { Member } from "@/core/types/member";
import { FrequencyType } from "@/lib/constants/frequencyType";

interface BaseUser {
  id: number;
  nickname: string;
  image: string | null;
}

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

export interface AcceptInvitationForm {
  userEmail: string;
  token: string;
}

export interface AcceptInvitationResponse {
  groupId: number;
}

export interface TaskListTasks {
  id: number;
  name: string;
  description: string;
  frequency: FrequencyType;
  displayIndex: number;
  recurringId: number;
  commentCount: number;
  doneBy: {
    user: BaseUser | null;
  } | null;
  writer: BaseUser;
  date: string;
  updatedAt: string;
  doneAt: string | null;
  deletedAt: string | null;
}
