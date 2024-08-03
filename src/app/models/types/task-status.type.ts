export type TaskStatus = 'pending' | 'in progress' | 'complete';

export const TASK_STATUSES: TaskStatus[] = [
  'pending',
  'in progress',
  'complete',
];

export enum TaskStatusOptions {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETE = 'complete',
}
