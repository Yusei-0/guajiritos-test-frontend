import { AuthUser, User, USER_DEFAULT } from '@/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(USER_DEFAULT);
  user$ = this.userSubject.asObservable();

  constructor() {}

  setAuthUser(authUser: AuthUser) {
    const user: User = {
      id: authUser.user.id,
      name: authUser.user.name,
      email: authUser.user.email,
      role: authUser.user.role,
      password: '',
    };
    this.userSubject.next(user);
  }

  getUser(): User {
    return this.userSubject.value;
  }
}
