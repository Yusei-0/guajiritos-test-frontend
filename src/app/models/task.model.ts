import { TaskStatus, TaskStatusOptions } from './types/';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
}

export const TASK_DEFAULT: Task = {
  id: 0,
  title: '',
  description: '',
  status: TaskStatusOptions.PENDING,
  userId: 0,
};
