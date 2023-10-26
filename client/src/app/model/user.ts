/**
 * `User`: clase definida para poder realizar la consulta de autenticacion del lado del cliente al servidor
 */

export class User {
  host: string;
  port: number;
  database_name: string;
  user: string;
  password: string;

  constructor(
    host: string,
    port: number,
    database_name: string,
    user: string,
    password: string
  ) {
    this.host = host;
    this.port = port;
    this.database_name = database_name;
    this.user = user;
    this.password = password;
  }
}
