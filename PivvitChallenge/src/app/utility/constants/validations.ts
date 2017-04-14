export class CommonRegexp{
  public EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public PASSWORD = /^\S*$/
}

export class Validation{
  public EMAIL : string  = "Email is required.";
  public EMAIL_LENGTH = "Email length must be between 5 to 30.";
  public EMAIL_VALID = "Enter valid email";

  public PASSWORD = "Password is required";
  public PASSWORD_LENGTH = "Password minimum length is 8.";
}
