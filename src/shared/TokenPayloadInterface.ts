export interface TokenPayload {
  type: "access" | "refresh";
  sub: number;
  iat: number;
  exp: number;
  iss: string;
}