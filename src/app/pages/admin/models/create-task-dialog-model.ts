import { User } from '@/models';

export interface CloseCreateTaskDialogModel {
  title: string;
  description: string;
  userId?: number;
}

export interface CreateTaskDialogModel {
  users: User[];
}
