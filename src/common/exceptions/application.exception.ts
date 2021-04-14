
export class ApplicationException extends Error {
    constructor(message = 'An unexpeted error ocurred.') {
        super(message);
    }
}