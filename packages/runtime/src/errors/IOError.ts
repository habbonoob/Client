/** An input/output operation failed. */
export class IOError extends Error {
    errorID: number;

    constructor(message: string = '', id: number = 0) {
        super(message);
        this.name = 'IOError';
        this.errorID = id;
    }
}
