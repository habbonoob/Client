import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NftAvatarsModel } from '@/com/sulake/habbo/avatar/nft/NftAvatarsModel';
import type { NftOutfit } from '@/com/sulake/habbo/avatar/wardrobe/NftOutfit';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class NftWardrobeParamView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.avatar.nft::NftWardrobeParamView'); }

    constructor(param1: NftAvatarsModel) {
        this._SafeStr_2134 = param1;
        this._container = param1.controller.view.collectiblesAvatarInfoContainer;
        this._SafeStr_5609 = asGuarded(this._container.findChildByName("avatar_info_text"), isITextWindow);
        this.updateView(null);
    }

    declare private _SafeStr_2134: NftAvatarsModel;

    declare private _container: IWindowContainer;

    declare private _SafeStr_5609: ITextWindow;

    public get disposed(): boolean {
        return this._SafeStr_2134 == null;
    }

    public dispose(): void {
        this._SafeStr_2134 = null;
    }

    public updateView(param1: NftOutfit): void {
        if (param1 == null) {
            this._container.visible = false;
        } else {
            this._SafeStr_5609.text = this.getLocalizedCollectionName(param1.contractKey) + " #" + param1.id;
            this._SafeStr_5609.textColor = this.getCollectionTextColor(param1.contractKey) >>> 0;
            this._container.visible = true;
        }
    }

    private getLocalizedCollectionName(param1: string): string {
        let _loc2_: string = null;
        switch (param1) {
            case "habbo:avatar":
                _loc2_ = "wardrobe.token.avatar.name";
                break;
            case "habbo:clothes":
                _loc2_ = "wardrobe.token.clothing.name";
                break;
            case "habbo:avatar_genesis":
                _loc2_ = "wardrobe.token.crafted_avatar.name";
                break;
            default:
                return null;
        }
        return this._SafeStr_2134.controller.manager.localization.getLocalization(_loc2_);
    }

    private getCollectionTextColor(param1: string): number {
        switch (param1) {
            case "habbo:avatar":
                return 4294936611 | 0;
            case "habbo:clothes":
                return 4289965509 | 0;
            case "habbo:avatar_genesis":
                return 4279945953 | 0;
            default:
                return 4294967295 | 0;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
