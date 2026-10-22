import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { NftAvatarsView } from '@/com/sulake/habbo/avatar/nft/NftAvatarsView';
import { NftWardrobeParamView } from '@/com/sulake/habbo/avatar/nft/NftWardrobeParamView';
import { NftOutfit } from '@/com/sulake/habbo/avatar/wardrobe/NftOutfit';
import { UserNftWardrobeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/nft/UserNftWardrobeMessageEvent';
import { GetUserNftWardrobeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nft/GetUserNftWardrobeMessageComposer';

export class NftAvatarsModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.nft::NftAvatarsModel'); }

    constructor(param1: HabboAvatarEditor) {
        super(param1);
        this._nftAvatars = [];
        this.requestNftAvatars(param1);
    }

    declare private _SafeStr_4087: UserNftWardrobeMessageEvent;

    declare private _SafeStr_6141: NftWardrobeParamView;

    declare private _selectedNftOutfit: NftOutfit;

    declare private _nftAvatars: any[];

    public get nftAvatars(): any[] {
        return this._nftAvatars;
    }

    public override dispose(): void {
        if (this.controller && this._SafeStr_4087) {
            this.controller.manager.communication.removeHabboConnectionMessageEvent(this._SafeStr_4087);
            this._SafeStr_4087 = null;
        }
        this._nftAvatars = null;
        super.dispose();
    }

    protected override init(): void {
        if (!this._view) {
            this._view = new NftAvatarsView(this);
            this._SafeStr_6141 = new NftWardrobeParamView(this);
        }
        this._view.init();
        this._isInitialized = true;
    }

    public override switchCategory(param1: string = ""): void {
    }

    public override getCategoryData(param1: string): CategoryData {
        return null;
    }

    public override selectPart(param1: string, param2: number): void {
    }

    public selectNftAvatar(param1: number): void {
        let _loc2_: NftOutfit = this._nftAvatars[param1];
        if (_loc2_ != null) {
            if (_loc2_.figure == "") {
                return;
            }
            this._controller.setNftOutfit(_loc2_);
            this._controller.loadAvatarInEditor(_loc2_.figure, _loc2_.gender, this._controller.clubMemberLevel);
        }
        if (this._selectedNftOutfit != null) {
            this._selectedNftOutfit.view.toggleActive(false);
        }
        this._selectedNftOutfit = _loc2_;
        if (this._selectedNftOutfit != null) {
            this._selectedNftOutfit.view.toggleActive(true);
        }
        this._SafeStr_6141.updateView(_loc2_);
    }

    public getNftAvatarByTokenId(param1: string): NftOutfit {
        let _loc3_: any = 0;
        let _loc2_: NftOutfit = null;
        _loc3_ = 0;
        while (_loc3_ < this._nftAvatars.length) {
            _loc2_ = this._nftAvatars[_loc3_];
            if (_loc2_.tokenId == param1) {
                return _loc2_;
            }
            _loc3_++;
        }
        return null;
    }

    private requestNftAvatars(param1: HabboAvatarEditor): void {
        if (param1.manager.communication) {
            this._SafeStr_4087 = new UserNftWardrobeMessageEvent(this.onUserNftWardrobeMessage);
            param1.manager.communication.addHabboConnectionMessageEvent(this._SafeStr_4087);
            param1.manager.communication.connection.send(new GetUserNftWardrobeMessageComposer());
        }
    }

    private onUserNftWardrobeMessage = (param1: UserNftWardrobeMessageEvent): void => {
        for (const _loc2_ of param1.getParser().nftAvatars ?? []) {
            this._nftAvatars.push(new NftOutfit(this._controller, stringOrNull(_loc2_.id), stringOrNull(_loc2_.figureString), stringOrNull(_loc2_.gender), stringOrNull(_loc2_.tokenId), stringOrNull(_loc2_.contractKey)));
        }
    };
}
