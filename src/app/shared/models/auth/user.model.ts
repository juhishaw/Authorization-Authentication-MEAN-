export class User {
  email: string;
  password: string;
  token: string;

  constructor(data) {
    this.email = data ? data.email : null;
    this.password = data ? data.password : null;
    this.token = data ? data.token : null;
  }
}

export class ForgotOrResetPassword {
  email: string;
  passwordToken: string;

  constructor(data) {
    this.email = data ? data.email : null;
    this.passwordToken = data ? data.passwordToken : null;
  }
}

