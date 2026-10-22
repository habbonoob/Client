import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ActivatorController } from '@/com/sulake/core/window/Classes.group';
import { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { GraphicContext } from '@/com/sulake/core/window/graphics/GraphicContext';

export class DesktopController extends ActivatorController implements IDesktopWindow, IDisplayObjectWrapper {
    static { registerClassName(this, 'com.sulake.core.window.components::DesktopController'); }

    constructor(param1: string, param2: WindowContext, param3: Rectangle) {
        // AS3 passed its own defaultProcedure, which JS cannot reach before super(); it sets it right
        // after (a no-op procedure, like the null one WindowController falls back to meanwhile)
        super(param1, 0, 0, 0, param2, param3, null, null, null, null, 0);
        this._procedure = this.defaultProcedure;
    }

    public override set parent(param1: IWindow) {
        throw new Error("Desktop window doesn\'t have parent!");
    }

    public override set procedure(param1: (...args: any[]) => any) {
        this._procedure = param1 != null ? param1 : this.defaultProcedure;
    }

    public override get host(): IWindow {
        return this;
    }

    public override get desktop(): IDesktopWindow {
        return this;
    }

    public get mouseX(): number {
        return this.getDisplayObject().stage.mouseX | 0;
    }

    public get mouseY(): number {
        return this.getDisplayObject().stage.mouseY | 0;
    }

    public override getGraphicContext(param1: boolean): IGraphicContext {
        if (param1 && !this._SafeStr_2145) {
            this._SafeStr_2145 = new GraphicContext("GC {" + this._name + "}", 256, this.rectangle);
            castTo(this._SafeStr_2145, GraphicContext).mouseEnabled = true;
            castTo(this._SafeStr_2145, GraphicContext).doubleClickEnabled = true;
        }
        return this._SafeStr_2145;
    }

    public override invalidate(param1: Rectangle = null): void {
    }

    public getActiveWindow(): IWindow {
        return this.getActiveChild();
    }

    public setActiveWindow(param1: IWindow): IWindow {
        return this.setActiveChild(param1);
    }

    public getDisplayObject(): DisplayObject {
        return asInstanceOf(this.getGraphicContext(true), DisplayObject);
    }

    public setDisplayObject(param1: DisplayObject): void {
        this.getGraphicContext(true).setDisplayObject(param1);
    }

    private defaultProcedure(param1: WindowEvent, param2: IWindow): void {
    }

    protected override initInstanceFields(): void {
        this.defaultProcedure = this.defaultProcedure.bind(this);
        super.initInstanceFields();
    }

    public override get parent(): IWindow {
        return super.parent;
    }

    public override get procedure(): (...args: any[]) => any {
        return super.procedure;
    }

    get [IDesktopWindow](): true {
        return true;
    }

    get [IDisplayObjectWrapper](): true {
        return true;
    }
}
