import { AuthUser, CreateUserDTO, User, USER_DEFAULT } from '@/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private userSubject = new BehaviorSubject<User>(USER_DEFAULT);
  user$ = this.userSubject.asObservable();

  constructor() {}

  setAuthUser(authUser: User) {
    this.userSubject.next(authUser);
  }

  getUserAuthenticated(): User {
    return this.userSubject.value;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.urlServer + '/users');
  }

  createNewUser(newUser: CreateUserDTO): Observable<User> {
    return this.http.post<User>(environment.urlServer + '/signup', {
      ...newUser,
    });
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(environment.urlServer + '/users/' + id);
  }

  updateUser(user: User) {}
}
