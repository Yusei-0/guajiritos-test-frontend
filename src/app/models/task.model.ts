import { TaskStatus, TaskStatusOptions } from './types/';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const TASK_DEFAULT: Task = {
  id: 0,
  title: '',
  description: '',
  status: TaskStatusOptions.TODO,
  createdAt: new Date(),
  updatedAt: new Date(),
};
