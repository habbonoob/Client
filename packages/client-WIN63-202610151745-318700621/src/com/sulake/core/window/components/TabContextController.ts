import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { isISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import { isITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export class TabContextController extends WindowController implements ITabContextWindow, IIterable {
    static { registerClassName(this, 'com.sulake.core.window.components::TabContextController'); }

    private static readonly TAG_TAB_CONTEXT_SELECTOR: string = "_SELECTOR";
    private static readonly TAG_TAB_CONTEXT_CONTENT: string = "_CONTENT";

    declare protected _SafeStr_4230: ISelectorListWindow;

    declare protected _SafeStr_5650: IWindowContainer;

    private _SafeStr_5235: boolean = false;
    private _initialized: boolean = false;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        let _loc12_: any[] = [];
        this.groupChildrenWithTag("_INTERNAL", _loc12_, -1);
        for (const _loc13_ of _loc12_ ?? []) {
            _loc13_.style = this._style;
            _loc13_.procedure = this.selectorEventProc;
        }
        this._initialized = true;
    }

    public get selector(): ISelectorListWindow {
        if (this._SafeStr_4230 == null) {
            this._SafeStr_4230 = asGuarded(this.findChildByTag("_SELECTOR"), isISelectorListWindow);
            if (this._SafeStr_4230 != null) {
                this._SafeStr_4230.procedure = this.selectorEventProc;
            }
        }
        return this._SafeStr_4230;
    }

    public get container(): IWindowContainer {
        if (this._SafeStr_5650 == null) {
            this._SafeStr_5650 = asGuarded(this.findChildByTag("_CONTENT"), isIWindowContainer);
        }
        return this._SafeStr_5650;
    }

    public get iterator(): IIterator {
        return this._initialized ? this.selector.iterator : null;
    }

    public get numTabItems(): number {
        return this._SafeStr_4230.numSelectables;
    }

    public addTabItem(param1: ITabButtonWindow): ITabButtonWindow {
        return asGuarded(this.selector.addSelectable(param1), isITabButtonWindow);
    }

    public addTabItemAt(param1: ITabButtonWindow, param2: number): ITabButtonWindow {
        return asGuarded(this.selector.addSelectableAt(param1, param2 | 0), isITabButtonWindow);
    }

    public removeTabItem(param1: ITabButtonWindow): void {
        this.selector.removeSelectable(param1);
    }

    public getTabItemAt(param1: number): ITabButtonWindow {
        return asGuarded(this.selector.getSelectableAt(param1 | 0), isITabButtonWindow);
    }

    public getTabItemByName(param1: string): ITabButtonWindow {
        return asGuarded(this.selector.getSelectableByName(param1), isITabButtonWindow);
    }

    public getTabItemByID(param1: number): ITabButtonWindow {
        return asGuarded(this.selector.getSelectableByID(param1), isITabButtonWindow);
    }

    public getTabItemIndex(param1: ITabButtonWindow): number {
        return this.selector.getSelectableIndex(param1) >>> 0;
    }

    private selectorEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECTED") {
            this.notifyEventListeners(param1);
        }
    };

    get [ITabContextWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
