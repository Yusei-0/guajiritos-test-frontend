import { NewTaskDto, Task, TaskStatus } from '@/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  constructor() {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.urlServer + '/tasks');
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(environment.urlServer + '/tasks/' + id);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(environment.urlServer + '/tasks/' + id);
  }

  createNewTask(newTask: NewTaskDto): Observable<Task> {
    return this.http.post<Task>(environment.urlServer + '/tasks/', {
      ...newTask,
    });
  }

  updateTaskStatus(id: number, newStatus: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(environment.urlServer + '/tasks/' + id, {
      status: newStatus,
    });
  }
}
