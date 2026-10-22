import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IWidgetFactory } from '@/com/sulake/core/window/IWidgetFactory';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

const preSuperWidgetWindowController: ((self: WidgetWindowController) => void)[] = [];

export class WidgetWindowController extends WindowController implements IWidgetWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::WidgetWindowController'); }

    declare private _SafeStr_4843: IWidgetFactory;

    declare private _widgetType: string;

    declare private _widget: IWidget;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        preSuperWidgetWindowController.push((self: WidgetWindowController) => {
            self._SafeStr_4843 = param5.getWidgetFactory();
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._widget != null) {
                this._widget.dispose();
                this._widget = null;
            }
            this._SafeStr_4843 = null;
            super.dispose();
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = this._widget != null ? this._widget.properties : [];
        _loc1_.unshift(this.createProperty("widget_type", this._widgetType));
        return super.properties.concat(_loc1_);
    }

    public override set properties(param1: any[]) {
        let _loc3_: string = null;
        for (const _loc2_ of param1 ?? []) {
            if (_loc2_.key == "widget_type") {
                _loc3_ = String(_loc2_.value);
                if (this._widgetType != _loc3_) {
                    if (this._widget != null) {
                        this.removeChildAt(0);
                        this._widget.dispose();
                    }
                    this._widget = this._SafeStr_4843.createWidget(String(_loc2_.value), this);
                    this._widgetType = _loc3_;
                }
                break;
            }
        }
        if (this._widget != null) {
            this._widget.properties = param1;
        }
        super.properties = param1;
    }

    public override set color(param1: number) {
        super.color = param1;
        let _loc2_: any[] = [];
        this.groupChildrenWithTag("_COLORIZE", _loc2_, -1);
        for (const _loc3_ of _loc2_ ?? []) {
            _loc3_.color = param1;
        }
    }

    public get iterator(): IIterator {
        return this._widget != null ? this._widget.iterator : EmptyIterator.INSTANCE;
    }

    public get widget(): IWidget {
        return this._widget;
    }

    public get rootWindow(): IWindow {
        return this.getChildAt(0);
    }

    public set rootWindow(param1: IWindow) {
        this.removeChildAt(0);
        if (param1 == null) {
            return;
        }
        this.addChild(param1);
        if (param1.tags.indexOf("_EXCLUDE") < 0) {
            param1.tags.push("_EXCLUDE");
        }
    }

    protected override initInstanceFields(): void {
        this._widgetType = "";
        preSuperWidgetWindowController.pop()!(this);
        super.initInstanceFields();
    }

    public override get color(): number {
        return super.color;
    }

    get [IWidgetWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
