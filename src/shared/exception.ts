export class HttpError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class UnAuthorizedTokenError extends HttpError {
  constructor() {
    super(401, "Unauthorized Token");
  }
}

export class ExpiredTokenError extends HttpError {
  constructor() {
    super(401, "Expired Token");
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super(403, "Forbidden Request");
  }
}

export class NotFoundError extends HttpError {
  constructor(url: string) {
    super(404, `Not Found ${url}`);
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400, "Bad Request");
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500, "Interal Server Error");
  }
}