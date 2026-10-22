import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class JsonTextureColumnData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera.json::JsonTextureColumnData'); }

    private _assetNames: any[] = [];

    constructor() {
    }

    public addAssetName(param1: string): void {
        this._assetNames.push(param1);
    }

    public get assetNames(): any[] {
        return this._assetNames;
    }

    /** What AS3's JSON.stringify writes for an instance: its public getters, not its private fields. */
    public toJSON(): object {
        return { assetNames: this.assetNames };
    }
}
