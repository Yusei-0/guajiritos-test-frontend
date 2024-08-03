import { TaskStatus } from '../types';

export interface GetTaskDTO {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
}

export interface NewTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
}
