import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import type { VariableNode } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNode';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VariableNodeListView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNodeListView.group';

export class VariableNodeView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.overview::VariableNodeView'); }

    private static HOVER_BG: number = 4292927712;
    private static MODE1_BG: number = 4293914607;
    private static MODE2_BG: number = 4294638330;

    constructor(param1: VariableNode, param2: NewVariablePicker, param3: VariableNodeListView, param4: number) {
        this._variableNode = param1;
        this._picker = param2;
        this._i = param4;
        this._parent = param3;
        this._style = param2.roomEvents.wiredCtrl.wiredStyle;
        this._window = param2.roomEvents.variablePickerHelper.acquireNodeView(this._style);
        this._SafeStr_4880 = param1.canBeSelected(param2);
        this._SafeStr_5445 = param1.isDisabled(param2);
        this.icon.visible = param1.childrenCount > 0;
        this.nodeName.text = param1.name;
        this._window.interactiveCursorDisabled = !this._SafeStr_4880;
        this.nodeName.blend = this._SafeStr_5445 ? 0.55 : 1;
        this.icon.blend = this._SafeStr_5445 ? 0.55 : 1;
        this._window.addEventListener("WME_CLICK", this.onClick);
        this._window.addEventListener("WME_OVER", this.onOver);
        let _loc5_: IHabboLocalizationManager = this._picker.roomEvents.localization;
        if (this._SafeStr_5445) {
            this._window.toolTipCaption = _loc5_.getLocalization("wiredfurni.variable_picker.tooltip_disabled");
        } else if (!this._SafeStr_4880) {
            this._window.toolTipCaption = _loc5_.getLocalization("wiredfurni.variable_picker.tooltip_not_selectable");
        } else {
            this._window.toolTipCaption = "";
        }
        this.updateColoring();
    }

    declare private _picker: NewVariablePicker;

    declare private _style: WiredStyle;

    declare private _i: number;
    static { (this.prototype as any)._i = 0; }

    private _hovered: boolean = false;
    private _SafeStr_4880: boolean = false;
    private _SafeStr_5445: boolean = false;

    declare private _parent: VariableNodeListView;

    private _SafeStr_4477: VariableNodeListView = null;

    declare private _variableNode: VariableNode;

    public get variableNode(): VariableNode {
        return this._variableNode;
    }

    declare private _window: IRegionWindow;

    public get window(): IRegionWindow {
        return this._window;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set hover(param1: boolean) {
        if (this._hovered == param1) {
            return;
        }
        this._hovered = param1;
        this.updateColoring();
        if (this.variableNode.childrenCount > 0) {
            if (this._hovered) {
                this.initSublist();
            } else {
                this.removeSublist();
            }
        }
    }

    private get icon(): IIconWindow {
        return asGuarded(this._window.findChildByName("right_triangle_icon"), isIIconWindow);
    }

    private get nodeName(): ITextWindow {
        return asGuarded(this._window.findChildByName("node_name"), isITextWindow);
    }

    private get sublistWrapper(): IWindowContainer {
        return asGuarded(this._window.findChildByName("sublist_wrapper"), isIWindowContainer);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.removeSublist();
        this._window.removeEventListener("WME_CLICK", this.onClick);
        this._window.removeEventListener("WME_OVER", this.onOver);
        this._picker.roomEvents.variablePickerHelper.releaseNodeView(this._style, this._window);
        this._picker = null;
        this._window = null;
        this._style = null;
        this._variableNode = null;
        this._i = 0;
        this._hovered = false;
        this._parent = null;
        this._disposed = true;
    }

    protected onClick = (param1: WindowMouseEvent): void => {
        if (!this._SafeStr_4880) {
            return;
        }
        this._picker.select(this._variableNode.variable);
    };

    private updateColoring(): void {
        if (this._hovered) {
            this._window.color = VariableNodeView.HOVER_BG;
        } else if (this._i % 2 == 0) {
            this._window.color = VariableNodeView.MODE1_BG;
        } else {
            this._window.color = VariableNodeView.MODE2_BG;
        }
    }

    private onOver = (param1: WindowMouseEvent): void => {
        this._parent.setHover(this);
    };

    private initSublist(): void {
        this._SafeStr_4477 = new VariableNodeListView(this._picker, this.variableNode.children, this._window.width);
        let _loc4_: IWindowContainer = this._SafeStr_4477.window;
        let _loc5_: IWindowContainer = this._picker.expandedView.window;
        _loc5_.addChild(_loc4_);
        let _loc6_: Point = new Point();
        this.window.getGlobalPosition(_loc6_);
        let _loc2_: Point = new Point();
        _loc5_.getGlobalPosition(_loc2_);
        _loc4_.x = _loc6_.x - _loc2_.x + this._window.width + this._parent.scrollbarWidth | 0;
        _loc4_.y = _loc6_.y - _loc2_.y | 0;
        let _loc3_: IDesktopWindow = _loc4_.desktop;
        let _loc1_: Rectangle = new Rectangle();
        _loc4_.getGlobalRectangle(_loc1_);
        if (_loc1_.bottom > _loc3_.bottom) {
            _loc4_.offset(0, _loc3_.bottom - _loc1_.bottom);
            if (_loc4_.y < 0) {
                _loc4_.y = 0;
            }
        }
    }

    private removeSublist(): void {
        if (this._SafeStr_4477 == null) {
            return;
        }
        (asGuarded(this._window.parent, isIWindowContainer)).removeChild(this._SafeStr_4477.window);
        this._SafeStr_4477.dispose();
    }

    get [IDisposable](): true {
        return true;
    }
}
