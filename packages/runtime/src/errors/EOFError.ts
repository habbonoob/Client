/** A read went past the end of the available data. */
export class EOFError extends Error {
    errorID: number;

    constructor(message: string = 'End of file was encountered.', id: number = 0) {
        super(message);
        this.name = 'EOFError';
        this.errorID = id;
    }
}
