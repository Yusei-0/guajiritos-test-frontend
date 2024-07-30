import { Role, RoleOptions } from './types/';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export const USER_DEFAULT: User = {
  id: 0,
  name: '',
  email: '',
  role: RoleOptions.USER,
};
