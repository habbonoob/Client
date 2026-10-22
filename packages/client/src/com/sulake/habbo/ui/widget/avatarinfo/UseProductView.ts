import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { UseProductItem } from '@/com/sulake/habbo/ui/widget/events/UseProductItem';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class UseProductView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::UseProductView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        UseProductView.#initStatics();
        return UseProductView._log;
    }

    private static readonly MODE_NORMAL: number = 0;
    private static readonly MODE_SHAMPOO: number = 1;
    private static readonly MODE_CUSTOM_PART: number = 2;
    private static readonly MODE_CUSTOM_PART_SHAMPOO: number = 3;
    private static readonly MODE_SADDLE: number = 4;
    private static readonly MODE_REVIVE: number = 5;
    private static readonly MODE_REBREED: number = 6;
    private static readonly MODE_FERTILIZE: number = 7;

    public static setup_UseProductView(param1: UseProductView, param2: number, param3: string, param4: number, param5: number, param6: UseProductItem): void {
        param1._SafeStr_2728 = param6;
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
        this._SafeStr_2318 = false;
    }

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    declare private _SafeStr_2728: UseProductItem;

    public get objectId(): number {
        return this._SafeStr_2728.id;
    }

    public get requestRoomObjectId(): number {
        return this._SafeStr_2728.requestRoomObjectId;
    }

    private get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
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
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("use_product_menu"), XmlAsset).content, XML);
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
                switch (param2.parent.name) {
                    case "use_product":
                    case "use_product_shampoo":
                    case "use_product_custom_part":
                    case "use_product_custom_part_shampoo":
                    case "use_product_saddle":
                    case "replace_product_saddle":
                    case "revive_monsterplant":
                    case "rebreed_monsterplant":
                    case "fertilize_monsterplant":
                        this.widget.showUseProductConfirmation(this._SafeStr_2728.requestRoomObjectId, this._SafeStr_2728.targetRoomObjectId, this._SafeStr_2728.requestInventoryStripId);
                }
            }
            if (_loc4_) {
                this._widget.messageListener.processWidgetMessage(_loc4_);
            }
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this.widget.removeUseProductViews();
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
                this.showButton("use_product");
                break;
            case 1:
                this.showButton("use_product_shampoo");
                break;
            case 2:
                this.showButton("use_product_custom_part");
                break;
            case 3:
                this.showButton("use_product_custom_part_shampoo");
                break;
            case 4:
                if (this._SafeStr_2728.replace) {
                    this.showButton("replace_product_saddle");
                    break;
                }
                this.showButton("use_product_saddle");
                break;
            case 5:
                this.showButton("revive_monsterplant");
                break;
            case 6:
                this.showButton("rebreed_monsterplant");
                break;
            case 7:
                this.showButton("fertilize_monsterplant");
        }
        this._buttons.autoArrangeItems = true;
        this._buttons.visible = true;
    }

    private resolveMode(): void {
        let _loc1_: IFurnitureData = null;
        let _loc2_: number = this.widget.handler.roomSession.roomId;
        let _loc3_: IRoomObject = this.widget.handler.roomEngine.getRoomObject(_loc2_, this._SafeStr_2728.requestRoomObjectId, 10);
        if (_loc3_ != null) {
            _loc1_ = this.widget.handler.getFurniData(_loc3_);
        } else {
            _loc1_ = this.widget.handler.container.sessionDataManager.getFloorItemData(this._SafeStr_2728.requestRoomObjectId);
        }
        if (!_loc1_) {
            return;
        }
        this._mode = 0;
        switch (_loc1_.category - 13) {
            case 0:
                this._mode = 1;
                break;
            case 1:
                this._mode = 2;
                break;
            case 2:
                this._mode = 3;
                break;
            case 3:
                this._mode = 4;
                break;
            case 7:
                this._mode = 5;
                break;
            case 8:
                this._mode = 6;
                break;
            case 9:
                this._mode = 7;
                break;
            default:
                UseProductView._log.warn("[UseProductView.open()] Unsupported furniture category: " + _loc1_.category);
        }
    }

    private changeMode(param1: number): void {
        this._mode = param1;
        this.updateButtons();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (UseProductView.#staticsReady) return;
        UseProductView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(UseProductView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.avatarinfo.UseProductView"));
    }
}
