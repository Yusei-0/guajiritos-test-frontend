import { Task, User } from '@/models';

export const TaskForUserAdapter = (tasks: Task[], user: User): Task[] => {
  if (user.role === 'user') {
    const resTasks = tasks.filter((task) => task.userId === user.id);
    return resTasks;
  }

  return tasks;
};
