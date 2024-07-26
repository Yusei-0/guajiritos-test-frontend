import { Role, RoleOptions } from './types/';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export const USER_DEFAULT: User = {
  id: 0,
  name: '',
  email: '',
  password: '',
  role: RoleOptions.USER,
};
