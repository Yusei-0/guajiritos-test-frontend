import { Role } from '../types';
import { User } from '../user.model';

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: Role;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthUser {
  accessToken: string;
  user: User;
}
