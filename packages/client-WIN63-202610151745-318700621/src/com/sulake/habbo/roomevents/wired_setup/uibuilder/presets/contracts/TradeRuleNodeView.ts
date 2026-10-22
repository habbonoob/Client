import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';
import type { IProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ChestItemTypeRenderableWrapper } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestItemTypeRenderableWrapper';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class TradeRuleNodeView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts::TradeRuleNodeView'); }

    private static UNIQUE_ID_COUNTER: number = 0;

    declare private _editorPreset: TradeRuleEditorPreset;

    declare private _node: TradeRequirementNode;

    declare private _window: IRegionWindow;

    private _hovered: boolean = false;
    private _SafeStr_4163: boolean = false;

    declare private _SafeStr_5040: boolean;
    static { (this.prototype as any)._SafeStr_5040 = false; }

    declare private _SafeStr_6496: number;
    static { (this.prototype as any)._SafeStr_6496 = 0; }

    private _disposed: boolean = false;

    constructor(param1: IRegionWindow) {
        this._SafeStr_6496 = TradeRuleNodeView.UNIQUE_ID_COUNTER++;
        this._window = asGuarded(param1.clone(), isIRegionWindow);
        this._window.addEventListener("WME_OVER", this.onHover);
        this._window.addEventListener("WME_OUT", this.onHoverEnd);
        this.closeRegion.addEventListener("WME_OVER", this.onCloseHover);
        this.closeRegion.addEventListener("WME_OUT", this.onCloseHoverEnd);
        this._window.addEventListener("WME_CLICK", this.onClick);
        this.closeRegion.addEventListener("WME_CLICK", this.onCloseClick);
    }

    public initialize(param1: TradeRuleEditorPreset, param2: TradeRequirementNode, param3: boolean = true): void {
        this._editorPreset = param1;
        this._node = param2;
        this._SafeStr_5040 = param3;
        this._hovered = false;
        this._SafeStr_4163 = false;
        Util.disableSection(this._window, false);
        this.updateUI();
    }

    public release(): void {
        this._editorPreset = null;
        this._node = null;
        this._SafeStr_5040 = true;
    }

    private onCloseClick = (param1: WindowMouseEvent): void => {
        if (this._node == null) {
            return;
        }
        this._editorPreset.removeNode(this);
    };

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._node == null) {
            return;
        }
        this._editorPreset.editNode(this);
    };

    private updateUI(): void {
        let _loc2_: ChestItemTypeRenderableWrapper = null;
        this.closeRegion.visible = this._SafeStr_5040 && (this._hovered || this._SafeStr_4163);
        this.quantityAmount.text = String(this._node.amount);
        this.quantityBorder.visible = this._node.amount != 1 || this._node.type == TradeRequirementNode.TYPE_COIN;
        let _loc1_: IProductIconWidget = asGuarded(this.iconWidget.widget, isIProductIconWidget);
        if (this._node.type == TradeRequirementNode.TYPE_FURNI) {
            this.iconWidget.visible = true;
            _loc2_ = null;
            if (this._node.itemType != null) {
                _loc2_ = new ChestItemTypeRenderableWrapper(this._node.itemType);
            }
            _loc1_.productInfo = _loc2_;
            this.coinsIcon.visible = false;
        } else {
            this.iconWidget.visible = false;
            _loc1_.productInfo = null;
            this.coinsIcon.visible = true;
        }
    }

    private onHoverEnd = (param1: WindowMouseEvent): void => {
        if (this._node == null) {
            return;
        }
        this._hovered = false;
        this.updateUI();
    };

    private onHover = (param1: WindowMouseEvent): void => {
        if (this._node == null) {
            return;
        }
        this._hovered = true;
        this.updateUI();
    };

    private onCloseHoverEnd = (param1: WindowMouseEvent): void => {
        if (this._node == null) {
            return;
        }
        this._SafeStr_4163 = false;
        this.updateUI();
    };

    private onCloseHover = (param1: WindowMouseEvent): void => {
        if (this._node == null) {
            return;
        }
        this._SafeStr_4163 = true;
        this.updateUI();
    };

    public get window(): IRegionWindow {
        return this._window;
    }

    public get node(): TradeRequirementNode {
        return this._node;
    }

    public set node(param1: TradeRequirementNode) {
        this._node = param1;
        this.updateUI();
    }

    public get uniqueID(): number {
        return this._SafeStr_6496;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._editorPreset = null;
        this._node = null;
        this._window.dispose();
        this._window = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get iconWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("element_icon_widget"), isIWidgetWindow);
    }

    private get coinsIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("coins_icon"), isIStaticBitmapWrapperWindow);
    }

    private get quantityBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("quantity_border"), isIBorderWindow);
    }

    private get quantityAmount(): ITextWindow {
        return asGuarded(this._window.findChildByName("quantity_amount"), isITextWindow);
    }

    private get closeRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("close_region"), isIRegionWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
