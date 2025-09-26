export type UserType = 'user' | 'trainer';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  profileImage?: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}