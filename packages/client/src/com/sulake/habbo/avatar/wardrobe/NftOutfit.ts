import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { Outfit } from '@/com/sulake/habbo/avatar/wardrobe/Outfit';

export class NftOutfit extends Outfit {
    static { registerClassName(this, 'com.sulake.habbo.avatar.wardrobe::NftOutfit'); }

    public static readonly _SafeStr_8738: string = "habbo:avatar";
    public static readonly collectionClothes: string = "habbo:clothes";
    public static readonly collectionGenesis: string = "habbo:avatar_genesis";

    constructor(param1: HabboAvatarEditor, param2: string, param3: string, param4: string, param5: string, param6: string) {
        super(param1, param3, param4);
        this._id = param2;
        this._tokenId = param5;
        this._contractKey = param6;
        this.initNftColors();
    }

    declare private _id: string;

    declare private _tokenId: string;

    declare private _contractKey: string;

    public get contractKey(): string {
        return this._contractKey;
    }

    public get id(): string {
        return this._id;
    }

    public get tokenId(): string {
        return this._tokenId;
    }

    private initNftColors(): void {
        switch (this._contractKey) {
            case "habbo:avatar":
                this.view.setColors(4294928384 | 0, 4294936611 | 0, -1, -1);
                break;
            case "habbo:clothes":
                this.view.setColors(4288715443 | 0, 4289965509 | 0, -1, -1);
                break;
            case "habbo:avatar_genesis":
                this.view.setColors(4280129447 | 0, 4282165689 | 0, 4287901875 | 0, 4289219523 | 0);
                break;
            default:
                this.view.setColors(4294967295 | 0, 4294967295 | 0, -1, -1);
        }
    }
}
