export class LoginDTO {
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
  static createLoginDto(): LoginDTO {
    return new LoginDTO(process.env.USER || '', process.env.PASSWORD || '')
  }
}
