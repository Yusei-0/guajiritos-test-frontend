import { TaskStatus } from '../types';
import { takeUntil } from 'rxjs/operators';

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

export interface UpdateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
  userId?: number;
}
