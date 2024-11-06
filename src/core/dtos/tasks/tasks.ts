import { FrequencyType } from "@/lib/constants/frequencyType";

export interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  commentCount: number;
  frequency: FrequencyType;
  checked: boolean;
  date: string;
  updatedAt: string;
  doneAt: string |null;
  recurringId: number;
  writer: {
    nickname: string;
    image: string;
  };
  recurring: {
    weekDays: [];
    monthDay: number;
    taskListId: number;
    groupId: number;
    startDate: string;
    updatedAt: string;
  };
}

export interface TaskRecurring {
  startDate: string;
  updatedAt: string;
}

export interface TaskComment {
  id: number;
  content: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
}

export interface TaskCommentForm {
  content: string;
}

export interface AddTaskForm {
  name: string;
  frequencyType: FrequencyType;
  description: string;
  startDate: string;
  monthDay?: number;
  weekDays?: number[];
}

export interface EditTaskForm {
  name?: string;
  description?: string;
  done?: boolean;
}

export interface AddTaskListForm {
  name: string;
}

export interface TaskOrderForm {
  displayIndex: number;
}
