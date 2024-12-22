export class CreateError extends Error {
  name: string;
  status: number;
  success: boolean;

  constructor(message: string, status: number) {
    super(message);
    this.name = "Error";
    this.status = status;
    this.success = false;
  }
}

export default function createError(message: string, status: number): CreateError {
  return new CreateError(message, status);
}
