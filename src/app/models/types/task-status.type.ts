export type TaskStatus = 'todo' | 'in-progress' | 'done';

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'done'];

export enum TaskStatusOptions {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}
