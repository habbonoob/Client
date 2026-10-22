/** BitmapData.encode() as PNG; `fastCompression` trades file size for speed. */
export class PNGEncoderOptions {
    fastCompression: boolean;

    constructor(fastCompression: boolean = false) {
        this.fastCompression = fastCompression;
    }
}
