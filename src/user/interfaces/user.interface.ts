export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

export interface IUserWithPass {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
}

export interface IUserToken {
  access_token: string;
}

export interface IAuth {
  email: string;
}
