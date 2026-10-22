import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BreedPetsResultData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::BreedPetsResultData'); }

    constructor() {
    }

    declare public stuffId: number;
    static { (this.prototype as any).stuffId = 0; }

    declare public classId: number;
    static { (this.prototype as any).classId = 0; }

    declare public productCode: string;

    declare public userId: number;
    static { (this.prototype as any).userId = 0; }

    declare public userName: string;

    declare public rarityLevel: number;
    static { (this.prototype as any).rarityLevel = 0; }

    declare public hasMutation: boolean;
    static { (this.prototype as any).hasMutation = false; }
}
