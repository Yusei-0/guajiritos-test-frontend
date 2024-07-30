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

  setAuthUser(authUser: User) {
    this.userSubject.next(authUser);
  }

  getUser(): User {
    return this.userSubject.value;
  }
}
