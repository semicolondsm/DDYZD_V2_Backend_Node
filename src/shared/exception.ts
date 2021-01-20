export class HttpError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404, "Not Found");
  }
}