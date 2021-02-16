import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { User } from "../../entity/model";
import { HttpError } from "../../shared/exception";

const DSM_AUTH_URL = "http://54.180.98.91:8080";
const DSM_OPEN_API_URL = "http://54.180.98.91:8090";

const issuanceToken = async (user_id: number, type: string): Promise<string> => {
  return jwt.sign({
    sub: `${user_id}`,
    type: type,
  }, config.jwtSecret, {
    algorithm: "HS256",
    expiresIn: type === "access" ? "2h" : "14d",
  });
}

const getUserToken = async (code: string): Promise<string> => {
  try {
    const response = await axios.post(`${DSM_AUTH_URL}/dsmauth/token`, {
      client_id: process.env.DSM_AUTH_CLIENT_ID,
	    client_secret: process.env.DSM_AUTH_CLIENT_SECRET,
      code,
    });
    return response.data["access-token"];
  } catch(err) {
    throw new HttpError(err.response.status, err.response.data.message);
  }
}

const getUserInfoWithDsmAuth = async (token: string): Promise<Partial<User>> => {
  try {
    const response: AxiosResponse<Partial<User>> = await axios.get(`${DSM_OPEN_API_URL}/v1/info/basic`, {
      headers: {
        "access-token": "Bearer " + token,
      }
    });
    return response.data;
  } catch(err) {
    throw new HttpError(err.response.status, err.response.data.message);
  }
}

export { getUserToken, issuanceToken, getUserInfoWithDsmAuth }