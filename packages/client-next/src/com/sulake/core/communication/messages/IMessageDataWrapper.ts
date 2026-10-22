export interface IMessageDataWrapper {
    getID(): number;
    readString(): string;
    readInteger(): number;
    readLong(): number;
    readBoolean(): boolean;
    readShort(): number;
    readByte(): number;
    readFloat(): number;
    readDouble(): number;
    get bytesAvailable(): number;
}
