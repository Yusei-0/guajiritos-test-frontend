import { User } from '@/models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskuser',
  standalone: true,
})
export class TaskuserPipe implements PipeTransform {
  transform(userId: number, users: User[]): string {
    if (!users || users.length === 0) {
      return 'Unknown User';
    }

    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  }
}
