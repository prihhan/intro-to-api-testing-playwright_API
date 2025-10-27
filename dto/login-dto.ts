export class LoginDTO {
  username: string | undefined
  password: string | undefined


  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
static createLoginDto(): LoginDTO{
    return new LoginDTO(
      process.env.USER || '',
      process.env.PASSWORD || '')
}
}