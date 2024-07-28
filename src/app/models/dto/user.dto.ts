import { User } from '../user.model';

export interface GetUserDTO {
  id: number;
}

export interface CreateUserDTO {
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthUser {
  token: string;
  refreshToken: string;
  user: User;
}

export interface CreateUserDto {
  email: string;
  password: string;
}
