export interface TokenPayload {
  type: "access" | "refresh";
  subject: number;
  iat: number;
  exp: number;
  iss: string;
}