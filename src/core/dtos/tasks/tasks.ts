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

export interface TaskComment {
  id: number;
  content: string;
  updatedAt: Date;
  taskId: number;
  userId: number;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
}
