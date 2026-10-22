import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class BottomBackgroundBorder implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::BottomBackgroundBorder'); }

    constructor(param1: HabboToolbar) {
        this._window = asGuarded(param1.windowManager.buildFromXML(asInstanceOf(param1.assets.getAssetByName("bottom_background_border_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.onWindowEvent;
        this.updatePosition();
    }

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this.disposed) {
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_PARENT_RESIZED") {
            this.updatePosition();
        }
    };

    private updatePosition(): void {
        this._window.position = new Point(-10, this._window.desktop.height - (this._window.height - 3));
        this._window.width = this._window.desktop.width + 20;
    }

    get [IDisposable](): true {
        return true;
    }
}
