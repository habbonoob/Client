/** IDataInput */
export interface IDataInput {
    readonly bytesAvailable: number;
    endian: string;
    objectEncoding: number;
    readBoolean(): boolean;
    readByte(): number;
    readBytes(bytes: any, offset?: number, length?: number): void;
    readDouble(): number;
    readFloat(): number;
    readInt(): number;
    readMultiByte(length: number, charSet: string): string;
    readObject(): any;
    readShort(): number;
    readUnsignedByte(): number;
    readUnsignedInt(): number;
    readUnsignedShort(): number;
    readUTF(): string;
    readUTFBytes(length: number): string;
}
