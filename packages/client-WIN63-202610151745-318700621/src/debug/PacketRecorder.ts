import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { byteArrayAccess, type ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

/**
 * An incoming packet as its parser reads it: each read is passed on to the packet and written down as G-Earth
 * writes it ({i:1}{s:"text"}), for PacketLog. Only used while the packet log is on.
 */
export class PacketRecorder implements IMessageDataWrapper {
    static { registerClassName(this, 'debug::PacketRecorder'); }

    declare private _data: IMessageDataWrapper;

    private _text: string = "";

    /** The packet's body as it arrived, for PacketCapture: what is left to read when the parser starts. */
    public readonly body: Uint8Array;

    constructor(data: IMessageDataWrapper) {
        this._data = data;
        const bytes: ByteArray = (data as any)._data;
        this.body = bytes != null ? byteArrayAccess.view(bytes).slice(bytes.position) : new Uint8Array(0);
    }

    /** What was read, in order. */
    public get text(): string {
        return this._text;
    }

    public getID(): number {
        return this._data.getID();
    }

    public readString(): string {
        let v: string = this._data.readString();
        this._text += "{s:\"" + v + "\"}";
        return v;
    }

    public readInteger(): number {
        let v: number = this._data.readInteger();
        this._text += "{i:" + v + "}";
        return v;
    }

    public readLong(): number {
        let v: number = this._data.readLong();
        this._text += "{l:" + v + "}";
        return v;
    }

    public readBoolean(): boolean {
        let v: boolean = this._data.readBoolean();
        this._text += "{b:" + v + "}";
        return v;
    }

    public readShort(): number {
        let v: number = this._data.readShort();
        this._text += "{u:" + v + "}";
        return v;
    }

    public readByte(): number {
        let v: number = this._data.readByte();
        this._text += "{b:" + v + "}";
        return v;
    }

    public readFloat(): number {
        let v: number = this._data.readFloat();
        this._text += "{f:" + v + "}";
        return v;
    }

    public readDouble(): number {
        let v: number = this._data.readDouble();
        this._text += "{d:" + v + "}";
        return v;
    }

    public get bytesAvailable(): number {
        return this._data.bytesAvailable;
    }
}
