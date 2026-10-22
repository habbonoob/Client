/** IDataOutput */
export interface IDataOutput {
    endian: string;
    objectEncoding: number;
    writeBoolean(value: boolean): void;
    writeByte(value: number): void;
    writeBytes(bytes: any, offset?: number, length?: number): void;
    writeDouble(value: number): void;
    writeFloat(value: number): void;
    writeInt(value: number): void;
    writeMultiByte(value: string, charSet: string): void;
    writeObject(object: any): void;
    writeShort(value: number): void;
    writeUnsignedInt(value: number): void;
    writeUTF(value: string): void;
    writeUTFBytes(value: string): void;
}
