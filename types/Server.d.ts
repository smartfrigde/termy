export type ServerType = {
  name: string;
  hostname: string;
  port: number;
  password: string;
  login: string;
  public_key?: string;
  private_key?: string;
  id?: string;
};
