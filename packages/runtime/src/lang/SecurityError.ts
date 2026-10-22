/** An operation was refused for security reasons. */
export class SecurityError extends Error {
    errorID: number;

    constructor(message: string = '', id: number = 0) {
        super(message);
        this.name = 'SecurityError';
        this.errorID = id;
    }
}
