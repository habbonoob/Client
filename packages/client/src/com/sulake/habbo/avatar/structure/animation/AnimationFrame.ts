import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class AnimationFrame {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.animation::AnimationFrame'); }

    constructor(param1: XML) {
        this._number = parseInt(param1.attribute("number").toString()) | 0;
        this._assetPartDefinition = param1.attribute("assetpartdefinition").toString();
    }

    declare private _number: number;
    static { (this.prototype as any)._number = 0; }

    declare private _assetPartDefinition: string;

    public get number(): number {
        return this._number;
    }

    public get assetPartDefinition(): string {
        return this._assetPartDefinition;
    }
}
