import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class RC4Cipher {
    static { registerClassName(this, 'RC4Cipher'); }

    private readonly STATE_SIZE: number = 0x0100;

    constructor(key: ByteArray = null) {
        this.state = new ByteArray();
        if (key) {
            this.init(key);
        }
    }

    private i: number = 0;
    private j: number = 0;

    declare private state: ByteArray;

    public getStateSize(): number {
        return this.STATE_SIZE;
    }

    public init(key: ByteArray): void {
        let k: number = 0;
        let swap: number = 0;
        let temp: number = 0;
        k = 0;
        while (k < 0x0100) {
            this.state.setByteAt(k, k);
            k++;
        }
        swap = 0;
        k = 0;
        while (k < 0x0100) {
            swap = swap + this.state.byteAt(k) + key.byteAt(k % key.length) & 0xFF;
            temp = this.state.byteAt(k) | 0;
            this.state.setByteAt(k, this.state.byteAt(swap));
            this.state.setByteAt(swap, temp);
            k++;
        }
        this.i = 0;
        this.j = 0;
    }

    public getBlockSize(): number {
        return 1;
    }

    public encrypt(data: ByteArray): void {
        let pos: number = 0;
        while (pos < data.length) {
            let idx: number = pos++ | 0;
            data.setByteAt(idx, data.byteAt(idx) ^ this.nextByte());
        }
    }

    public decrypt(data: ByteArray): void {
        this.encrypt(data);
    }

    public dispose(): void {
        let k: number = 0;
        if (this.state != null) {
            k = 0;
            while (k < this.state.length) {
                this.state.setByteAt(k, Math.random() * 0x0100);
                k++;
            }
            this.state.length = 0;
            this.state = null;
        }
        this.i = 0;
        this.j = 0;
    }

    private nextByte(): number {
        let temp: number = 0;
        this.i = this.i + 1 & 0xFF;
        this.j = this.j + this.state.byteAt(this.i) & 0xFF;
        temp = this.state.byteAt(this.i) | 0;
        this.state.setByteAt(this.i, this.state.byteAt(this.j));
        this.state.setByteAt(this.j, temp);
        return this.state.byteAt(temp + this.state.byteAt(this.i) & 0xFF);
    }
}
