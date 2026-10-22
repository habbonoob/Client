import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class JsonTextureColumnData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera.json::JsonTextureColumnData'); }

    constructor() {
    }

    private _assetNames: any[] = [];

    public get assetNames(): any[] {
        return this._assetNames;
    }

    public addAssetName(param1: string): void {
        this._assetNames.push(param1);
    }
}
