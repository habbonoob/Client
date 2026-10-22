/** One HTTP request header. */
export class URLRequestHeader {
    name: string;
    value: string;

    constructor(name: string = '', value: string = '') {
        this.name = name;
        this.value = value;
    }
}
