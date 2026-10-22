import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ContainerController } from '@/com/sulake/core/window/Classes.group';
import { IHeaderWindow } from '@/com/sulake/core/window/components/IHeaderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';

export class HeaderController extends ContainerController implements IHeaderWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::HeaderController'); }

    private static readonly TAG_TITLE_ELEMENT: string = "_TITLE";
    private static readonly TAG_CONTROLS_ELEMENT: string = "_CONTROLS";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 1;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set caption(param1: string) {
        super.caption = param1;
        try {
            this.title.text = param1;
        } catch (e) {
        }
    }

    public override set color(param1: number) {
        super.color = param1;
        let _loc2_: any[] = [];
        this.groupChildrenWithTag("_COLORIZE", _loc2_, -1);
        for (const _loc3_ of _loc2_ ?? []) {
            _loc3_.color = param1;
        }
    }

    public get title(): ILabelWindow {
        return asGuarded(this.findChildByTag("_TITLE"), isILabelWindow);
    }

    public get controls(): IItemListWindow {
        return asGuarded(this.findChildByTag("_CONTROLS"), isIItemListWindow);
    }

    public override get caption(): string {
        return super.caption;
    }

    public override get color(): number {
        return super.color;
    }

    get [IHeaderWindow](): true {
        return true;
    }
}
