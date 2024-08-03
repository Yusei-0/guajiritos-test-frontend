import { CreateUserDTO, UpdateUserDto, User } from '@/models';

export interface UpdateUserDialogData {
  user: User;
}

export interface CloseUpdateUserDialogData {
  ther_is_password: boolean;
  updated_user: UpdateUserDto;
}
