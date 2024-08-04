import {
  AuthUser,
  CreateUserDTO,
  Role,
  UpdateUserDto,
  User,
  USER_DEFAULT,
} from '@/models';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private userSubject = new BehaviorSubject<User>(
    this.isBrowser() && this.getUserFromLocalStorage()
      ? (this.getUserFromLocalStorage() as User)
      : USER_DEFAULT
  );
  user$ = this.userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setAuthUser(authUser: User) {
    this.userSubject.next(authUser);
    if (this.isBrowser()) {
      this.saveUserToLocalStorage(authUser);
    }
  }

  getUserAuthenticated(): User {
    return this.userSubject.value;
  }

  getUserRole(): Role {
    return this.userSubject.value.role;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.urlServer + '/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.urlServer + '/users/' + id);
  }

  createNewUser(newUser: CreateUserDTO): Observable<User> {
    return this.http.post<User>(environment.urlServer + '/signup', {
      ...newUser,
    });
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(environment.urlServer + '/users/' + id);
  }

  updateUser(updateUser: UpdateUserDto, id: number): Observable<User> {
    return this.http.patch<User>(environment.urlServer + '/users/' + id, {
      ...updateUser,
    });
  }

  updatePassword(
    password: string,
    id: number
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.urlServer + '/admin/change-password',
      {
        userId: id,
        newPassword: password,
      }
    );
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('authUser', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('authUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  clearUserFromLocalStorage(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('authUser');
    }
  }
}
