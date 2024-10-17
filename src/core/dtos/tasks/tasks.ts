export interface TaskList {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  groupId: number;
  displayIndex: number;
}

export interface TaskListsResponse {
  taskLists: TaskList[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  commentCount: number;
  frequency: string;
  checked: boolean;
  date: Date;
  updatedAt: Date;
  writer: {
    nickname: string;
    image: string;
  };
}
