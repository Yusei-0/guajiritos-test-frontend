import { User } from '@/models';

export interface UpdateTaskDialogModel {
  taskToUpdate: {
    title: string;
    description: string;
    userId: number;
  };

  users: User[];
}

export interface CloseUpdateTaskDialogModel {
  title: string;
  description: string;
  userId?: number;
}
