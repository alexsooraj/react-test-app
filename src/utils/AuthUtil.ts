export class AuthUtil {
  private static _isLoggedIn: boolean = false;

  public static get isLoggedIn(): boolean {
    // return localStorage.getItem("jwt") !== undefined && this._isLoggedIn;
    return true;
  }

  public static set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
    if (!value) {
      localStorage.clear();
    }
  }
}
