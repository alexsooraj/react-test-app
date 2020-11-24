import { User } from "../models/User";

export class AuthUtil {
  static isLoggedIn(): boolean {
    return localStorage.getItem("userData") !== null;
  }

  static getUserData(): User {
    return JSON.parse(localStorage.getItem('userData') as any) as User;
  }

  static setUserData(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  static clearUserData() {
    localStorage.removeItem('userData');
  }
}
