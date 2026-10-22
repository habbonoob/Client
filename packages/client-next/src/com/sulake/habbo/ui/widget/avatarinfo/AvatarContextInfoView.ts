import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RelationshipStatusEnum } from '@/com/sulake/habbo/friendlist/RelationshipStatusEnum';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';

export class AvatarContextInfoView extends ContextInfoView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::AvatarContextInfoView'); }

    declare protected _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare protected _userName: string;

    declare protected _userType: number;
    static { (this.prototype as any)._userType = 0; }

    declare protected _allowNameChange: boolean;
    static { (this.prototype as any)._allowNameChange = false; }

    declare protected _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare protected _isBlocked: boolean;
    static { (this.prototype as any)._isBlocked = false; }

    constructor(param1: IContextMenuParentWidget) {
        super(param1);
        this._widget = param1 instanceof AvatarInfoWidget ? param1 : null;
    }

    public static setup(param1: AvatarContextInfoView, param2: number, param3: string, param4: number, param5: number, param6: boolean = false, param7: boolean = false): void {
        param1._userId = param2;
        param1._userName = param3;
        param1._userType = param5;
        param1._roomIndex = param4;
        param1._allowNameChange = param6;
        param1._isBlocked = param7;
        ContextInfoView.setupContext(param1);
    }

    public get userId(): number {
        return this._userId;
    }

    public get userType(): number {
        return this._userType;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get userName(): string {
        return this._userName;
    }

    public get allowNameChange(): boolean {
        return this._allowNameChange;
    }

    public get isBlocked(): boolean {
        return this.isBlocked;
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (!this._window) {
            _loc1_ = asInstanceOf(this._widget.assets.getAssetByName("avatar_info_widget").content, XML);
            this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
            if (!this._window) {
                return;
            }
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("name"), isITextWindow);
        if (this._isBlocked) {
            _loc2_.italic = true;
            _loc2_.caption = "${infostand.blocked_user}";
        } else {
            _loc2_.italic = false;
            _loc2_.caption = this._userName;
        }
        _loc2_.caption = this._userName;
        this.updateRelationshipStatus();
        this._window.findChildByName("change_name_container").visible = false;
        this._window.height = 39;
        this.activeView = this._window;
    }

    protected override getOffset(param1: Rectangle): number {
        let _loc2_: number = -this._SafeStr_2220.height;
        if (this._userType == 1 || this._userType == 3 || this._userType == 4) {
            _loc2_ -= 10;
        } else {
            _loc2_ -= 4;
        }
        return _loc2_;
    }

    protected updateRelationshipStatus(): void {
        let _loc1_: IStaticBitmapWrapperWindow = null;
        if (this._widget && this._widget.friendList) {
            _loc1_ = castGuarded(this._window.findChildByName("relationship_status"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
            _loc1_.assetUri = "relationship_status_" + RelationshipStatusEnum.statusAsString(this._widget.friendList.getRelationshipStatus(this.userId));
        }
    }
}
