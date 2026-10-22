export interface IMessageDataWrapper {
    get bytesAvailable(): number;
    getID(): number;
    readString(): string;
    readInteger(): number;
    readLong(): number;
    readBoolean(): boolean;
    readShort(): number;
    readByte(): number;
    readFloat(): number;
    readDouble(): number;
}
