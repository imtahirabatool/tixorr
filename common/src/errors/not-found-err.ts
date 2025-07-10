import { CustomError } from "./custom-err";

export class NotFoundError extends CustomError{
    statusCode = 404;
    reason = 'Route not found';

    constructor() {
        super("Route not Found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}