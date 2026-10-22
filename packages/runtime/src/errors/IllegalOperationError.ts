/** A method was called in a state that doesn't allow it. */
export class IllegalOperationError extends Error {
    errorID: number;

    constructor(message: string = '', id: number = 0) {
        super(message);
        this.name = 'IllegalOperationError';
        this.errorID = id;
    }
}
