import { User } from '@src/app/shared/models/user.model';

export interface RegisterPostBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface authUserInfo {
  user: User;
  accessToken: string;
}
