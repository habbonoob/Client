import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ILandingPageUserEntry } from '@/com/sulake/habbo/communication/messages/incoming/quest/ILandingPageUserEntry';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class UserListWidget implements ILandingViewWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::UserListWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    declare private _popup: IWindowContainer;

    private _startOffset: number = 150;
    private _avatarOffsetsY: any[] = [0, 10, 5, 0, 5, 10, 0, 10, 5, 10];
    private _avatarContainerWidths: any[] = [];
    private _SafeStr_7235: any[] = [2, 4, 2, 2, 4, 2, 2, 2, 4, 2];

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    public get container(): IWindow {
        return this._container;
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
        if (this._popup != null) {
            this._popup.dispose();
            this._popup = null;
        }
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("user_list"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.registerMessageListeners();
    }

    public refresh(): void {
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public refreshContent(): void {
        if (this.users == null) {
            this._container.visible = false;
            return;
        }
        this._container.visible = true;
        this.refreshList();
        this.backToDefaultPopup();
    }

    private refreshList(): void {
        let _loc5_: number = 0;
        let _loc6_: IWindowContainer = null;
        let _loc1_: ILandingPageUserEntry = null;
        let _loc3_: IWidgetWindow = null;
        let _loc4_: IAvatarImageWidget = null;
        let _loc2_: number = this._startOffset;
        _loc5_ = 0;
        while (_loc5_ < 10) {
            _loc6_ = this.getAvatarContainer(_loc5_);
            if (_loc6_ == null) {
                _loc6_ = this.createAvatarContainer(_loc5_);
                this._container.addChild(_loc6_);
                _loc6_.x = _loc2_;
                _loc2_ += _loc6_.width;
            }
            _loc1_ = this.users[_loc5_];
            _loc6_.visible = _loc1_ != null;
            if (_loc1_) {
                _loc3_ = castGuarded(_loc6_.findChildByName("avatar_image_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
                _loc4_ = castGuarded(_loc3_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget");
                _loc4_.figure = _loc1_.figure;
            }
            _loc5_++;
        }
    }

    private getAvatarContainer(param1: number): IWindowContainer {
        return castGuarded(this._container.getChildByID(param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private createAvatarContainer(param1: number): IWindowContainer {
        let _loc3_: IWindowContainer = castGuarded(this._landingView.getXmlWindow("user_entry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.setupVariation(_loc3_, param1);
        _loc3_.procedure = this.onEntry;
        _loc3_.id = param1;
        if (this._avatarContainerWidths.length > param1) {
            _loc3_.width = this._avatarContainerWidths[param1] | 0;
        }
        let _loc2_: IWindow = _loc3_.findChildByName("extra_link_region");
        _loc2_.visible = this.hasExtraLink();
        _loc2_.procedure = this.onExtraLink;
        _loc2_.id = param1;
        return _loc3_;
    }

    private setupVariation(param1: IWindowContainer, param2: number): void {
        let _loc3_: IWidgetWindow = castGuarded(param1.findChildByName("avatar_image_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc4_: IAvatarImageWidget = castGuarded(_loc3_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget");
        param1.y += this._avatarOffsetsY[param2] + 70;
        if (this._avatarOffsetsY[param2] < 0) {
            param1.height += -this._avatarOffsetsY[param2];
        }
        _loc4_.direction = this._SafeStr_7235[param2] | 0;
        param1.findChildByName("extra_link_region").y = param1.findChildByName("extra_link_region").y - this._avatarOffsetsY[param2] | 0;
    }

    private getEntry(param1: IWindow): ILandingPageUserEntry {
        let _loc2_: number = param1.id;
        return this.users[_loc2_];
    }

    private onEntry = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ILandingPageUserEntry = this.getEntry(param2);
        if (_loc3_ == null) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            this._landingView.send(new GetExtendedProfileMessageComposer(_loc3_.userId));
        } else if (param1.type == "WME_OVER") {
            this.showPopup(_loc3_, param2);
        } else if (param1.type == "WME_OUT") {
            this.backToDefaultPopup();
        }
    };

    private onExtraLink = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ILandingPageUserEntry = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this.getEntry(param2);
            if (_loc3_ == null) {
                return;
            }
            this.extraLinkClicked(_loc3_);
        } else {
            this.onEntry(param1, param2.parent);
        }
    };

    private showPopup(param1: ILandingPageUserEntry, param2: IWindow): void {
        if (this._popup == null) {
            this._popup = castGuarded(this._landingView.getXmlWindow(this.getPopupXml()), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._container.addChild(this._popup);
        }
        this.refreshPopup(param1, this._popup);
        this._popup.y = Math.max(0, 79 - this._popup.height) | 0;
        this._popup.x = param2.x + (param2.width - this._popup.width) / 2 | 0;
        this._popup.visible = true;
    }

    private backToDefaultPopup(): void {
        if (this.users.length > 0) {
            this.showPopup(this.users[0], this._container.getChildByID(0));
        } else if (this._popup != null) {
            this._popup.visible = false;
        }
    }

    protected get landingView(): HabboLandingView {
        return this._landingView;
    }

    protected getText(param1: string): string {
        return "${" + param1 + "}";
    }

    protected registerMessageListeners(): void {
    }

    protected get users(): any[] {
        return null;
    }

    protected refreshPopup(param1: ILandingPageUserEntry, param2: IWindowContainer): void {
    }

    protected getPopupXml(): string {
        return null;
    }

    protected hasExtraLink(): boolean {
        return false;
    }

    protected extraLinkClicked(param1: ILandingPageUserEntry): void {
    }

    protected set avatarOffsetsY(param1: any[]) {
        this._avatarOffsetsY = param1;
    }

    protected set avatarContainerWidths(param1: any[]) {
        this._avatarContainerWidths = param1;
    }

    public set startOffset(param1: number) {
        this._startOffset = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
