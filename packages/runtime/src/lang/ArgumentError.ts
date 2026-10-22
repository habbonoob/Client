/** A function received an invalid argument. */
export class ArgumentError extends Error {
    errorID: number;

    constructor(message: string = '', id: number = 0) {
        super(message);
        this.name = 'ArgumentError';
        this.errorID = id;
    }
}
