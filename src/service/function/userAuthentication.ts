import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { User } from "../../entity/model";
import { HttpError } from "../../shared/exception";

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
    const response = await axios.post(`${config.dsmAuthUrl}/dsmauth/token`, {
      client_id: config.dsmAuthClientId,
	    client_secret: config.dsmAuthClientSecret,
      code,
    });
    return response.data["access-token"];
  } catch(err) {
    throw new HttpError(err.response.status, err.response.data.message);
  }
}

const getUserInfoWithDsmAuth = async (token: string): Promise<Partial<User>> => {
  try {
    const response: AxiosResponse<Partial<User>> = await axios.get(`${config.dsmOpenApiUrl}/v1/info/basic`, {
      headers: {
        "access-token": token,
      }
    });
    return response.data;
  } catch(err) {
    throw new HttpError(err.response.status, err.response.data.message);
  }
}

export { getUserToken, issuanceToken, getUserInfoWithDsmAuth }