import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { UseProductItem } from '@/com/sulake/habbo/ui/widget/events/UseProductItem';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';

export class BreedPetView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::BreedPetView'); }

    private static readonly MODE_NORMAL: number = 0;

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    declare private _SafeStr_2728: UseProductItem;

    declare private _canBreed: boolean;
    static { (this.prototype as any)._canBreed = false; }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
        this._SafeStr_2318 = false;
    }

    public static setup_BreedPetView(param1: BreedPetView, param2: number, param3: string, param4: number, param5: number, param6: UseProductItem, param7: boolean): void {
        param1._SafeStr_2728 = param6;
        param1._canBreed = param7;
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    public get objectId(): number {
        return this._SafeStr_2728.id;
    }

    public get requestRoomObjectId(): number {
        return this._SafeStr_2728.requestRoomObjectId;
    }

    public override dispose(): void {
        if (this._window) {
            this._window.removeEventListener("WME_OVER", this.onMouseHoverEvent);
            this._window.removeEventListener("WME_OUT", this.onMouseHoverEvent);
        }
        if (this._SafeStr_2728) {
            this._SafeStr_2728.dispose();
        }
        this._SafeStr_2728 = null;
        super.dispose();
    }

    private resolveMode(): void {
        let _loc1_: number = this.widget.handler.roomSession.roomId;
        this._mode = 0;
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        this.resolveMode();
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (!this._window) {
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("breed_pet_menu"), XmlAsset).content, XML);
                this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
                if (!this._window) {
                    return;
                }
                this._window.addEventListener("WME_OVER", this.onMouseHoverEvent);
                this._window.addEventListener("WME_OUT", this.onMouseHoverEvent);
                this._window.findChildByName("minimize").addEventListener("WME_CLICK", this.onMinimize);
                this._window.findChildByName("minimize").addEventListener("WME_OVER", this.onMinimizeHover);
                this._window.findChildByName("minimize").addEventListener("WME_OUT", this.onMinimizeHover);
            }
            this._buttons = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
            this._buttons.procedure = this.buttonEventProc;
            this._window.findChildByName("name").caption = this._userName;
            this._window.visible = false;
            this.activeView = this._window;
            this.updateButtons();
        }
    }

    public updateButtons(): void {
        let _loc2_: number = 0;
        if (!this._window || !this._buttons) {
            return;
        }
        this._buttons.autoArrangeItems = false;
        let _loc1_: number = this._buttons.numListItems;
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            this._buttons.getListItemAt(_loc2_ >>> 0).visible = false;
            _loc2_++;
        }
        switch (this._mode) {
            case 0:
                if (this._canBreed) {
                    this.showButton("breed");
                }
        }
        this._buttons.autoArrangeItems = true;
        this._buttons.visible = true;
    }

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc4_: any = null;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc3_ = true;
                let _loc5_: string = param2.parent.name;
                if ("breed" === _loc5_) {
                    this.widget.showBreedMonsterPlantsConfirmationView(this._SafeStr_2728.requestRoomObjectId, this._SafeStr_2728.targetRoomObjectId, false);
                }
            }
            if (_loc4_) {
                this._widget.messageListener.processWidgetMessage(_loc4_);
            }
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this.widget.removeBreedPetViews();
        }
    }

    private changeMode(param1: number): void {
        this._mode = param1;
        this.updateButtons();
    }

    private get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }
}
