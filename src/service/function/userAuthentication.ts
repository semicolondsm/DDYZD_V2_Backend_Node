import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import { User } from "../../entity/model";
import { HttpError } from "../../shared/exception";

type UserInfo = Partial<User>;

const DSM_AUTH_URL = "http://54.180.98.91:8090";

const issuanceToken = async (user_id: number, type: string)
: Promise<string> => {
  return jwt.sign({
    subject: user_id,
    type: type,
  }, process.env.JWT_SECRET, {
    issuer: "ddyzd",
    expiresIn: type === "access" ? "2h" : "14d",
  });
}

const getUserInfoWithDsmAuth = async (token: string): Promise<UserInfo> => {
  try {
    const response: AxiosResponse<UserInfo> = await axios.get(`${DSM_AUTH_URL}/v1/info/basic`, {
      headers: {
        "access-token": token,
      }
    });
    return response.data;
  } catch(err) {
    throw new HttpError(err.response.status, err.response.data.message);
  }
}

export { issuanceToken, getUserInfoWithDsmAuth }