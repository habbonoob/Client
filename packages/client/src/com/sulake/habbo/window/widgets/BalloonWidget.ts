import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IBalloonWidget } from '@/com/sulake/habbo/window/widgets/IBalloonWidget';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';
import { BalloonArrowPivot } from '@/com/sulake/habbo/window/enum/BalloonArrowPivot';

export class BalloonWidget implements IBalloonWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::BalloonWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "balloon";
    private static readonly ARROW_PIVOT_KEY: string = "balloon:arrow_pivot";
    private static readonly ARROW_DISPLACEMENT_KEY: string = "balloon:arrow_displacement";
    private static readonly ARROW_ASSET_PREFIX: string = "illumina_light_balloon_arrow_";
    private static readonly ARROW_FREE_PADDING: number = 6;
    private static readonly ARROW_LENGTH: number = 6;
    private static readonly ARROW_WIDTH: number = 9;

    private static get ARROW_PIVOT_DEFAULT(): PropertyStruct {
        BalloonWidget.#initStatics();
        return BalloonWidget.ARROW_PIVOT_DEFAULT;
    }

    private static get ARROW_DISPLACEMENT_DEFAULT(): PropertyStruct {
        BalloonWidget.#initStatics();
        return BalloonWidget.ARROW_DISPLACEMENT_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("balloon_xml").content, XML)), isIWindowContainer);
        this._SafeStr_3987 = asGuarded(this._root.findChildByName("bitmap"), isIStaticBitmapWrapperWindow);
        this._contents = asGuarded(this._root.findChildByName("border"), isIWindowContainer);
        this.syncFlags();
        this._SafeStr_2293.addEventListener("WE_RESIZE", this.onChange);
        this._SafeStr_2293.addEventListener("WE_RESIZED", this.onChange);
        this._contents.addEventListener("WE_RESIZE", this.onChange);
        this._contents.addEventListener("WE_RESIZED", this.onChange);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    private _settingProperties: boolean = false;
    private _SafeStr_2809: boolean = false;

    declare private _root: IWindowContainer;

    declare private _contents: IWindowContainer;

    declare private _SafeStr_3987: IStaticBitmapWrapperWindow;

    private _arrowPivot: string = String(BalloonWidget.ARROW_PIVOT_DEFAULT.value);
    private _arrowDisplacement: number = BalloonWidget.ARROW_DISPLACEMENT_DEFAULT.value | 0;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return this._contents != null ? this._contents.iterator : null;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(BalloonWidget.ARROW_PIVOT_DEFAULT.withValue(this._arrowPivot));
        _loc1_.push(BalloonWidget.ARROW_DISPLACEMENT_DEFAULT.withValue(this._arrowDisplacement));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        this._settingProperties = true;
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "balloon:arrow_pivot":
                    this.arrowPivot = String(_loc2_.value);
                    break;
                case "balloon:arrow_displacement":
                    this.arrowDisplacement = _loc2_.value | 0;
            }
        }
        this._settingProperties = false;
        this.refresh();
    }

    public get arrowPivot(): string {
        return this._arrowPivot;
    }

    public set arrowPivot(param1: string) {
        this._arrowPivot = param1;
        this.clearFlags();
        this.refresh();
        this.syncFlags();
        this.refresh();
    }

    public get arrowDisplacement(): number {
        return this._arrowDisplacement;
    }

    public set arrowDisplacement(param1: number) {
        this._arrowDisplacement = param1;
        this.refresh();
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._contents != null) {
                this._contents.removeEventListener("WE_RESIZE", this.onChange);
                this._contents.removeEventListener("WE_RESIZED", this.onChange);
                this._contents = null;
            }
            this._SafeStr_3987 = null;
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.removeEventListener("WE_RESIZE", this.onChange);
                this._SafeStr_2293.removeEventListener("WE_RESIZED", this.onChange);
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    private onChange = (param1: WindowEvent): void => {
        this.refresh();
    };

    private syncFlags(): void {
        if (this._contents != null) {
            this._contents.setParamFlag(131072, this._SafeStr_2293.getParamFlag(131072));
            this._contents.setParamFlag(147456, this._SafeStr_2293.getParamFlag(147456));
        }
    }

    private clearFlags(): void {
        if (this._contents != null) {
            this._contents.setParamFlag(131072, false);
            this._contents.setParamFlag(147456, false);
        }
    }

    private refresh(): void {
        let _loc1_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        if (this._settingProperties || this._SafeStr_2809 || this._disposed || this._contents == null) {
            return;
        }
        let _loc4_: string;
        switch (_loc4_ = BalloonArrowPivot.directionFromPivot(this._arrowPivot)) {
            case "up":
            case "down":
                _loc1_ = this._contents.width;
                _loc3_ = this._contents.height + 6 - 1;
                break;
            case "left":
            case "right":
                _loc1_ = this._contents.width + 6 - 1;
                _loc3_ = this._contents.height;
        }
        this._SafeStr_2809 = true;
        if (this._SafeStr_2293.testParamFlag(147456)) {
            this._root.width = _loc1_;
            this._root.height = _loc3_;
        } else if (this._SafeStr_2293.testParamFlag(131072)) {
            this._root.width = Math.max(this._SafeStr_2293.width, _loc1_) | 0;
            this._root.height = Math.max(this._SafeStr_2293.height, _loc3_) | 0;
        } else {
            this._root.width = this._SafeStr_2293.width;
            this._root.height = this._SafeStr_2293.height;
        }
        this._SafeStr_2293.width = this._root.width;
        this._SafeStr_2293.height = this._root.height;
        this._SafeStr_2809 = false;
        this._SafeStr_3987.assetUri = "illumina_light_balloon_arrow_" + _loc4_;
        switch (_loc4_) {
            case "up":
            case "down":
                switch (BalloonArrowPivot.positionFromPivot(this._arrowPivot)) {
                    case "minimum":
                        _loc2_ = 6;
                        break;
                    case "middle":
                        _loc2_ = (this._root.width - 9) / 2 | 0;
                        break;
                    case "maximum":
                        _loc2_ = this._root.width - 6 - 9;
                }
                this._SafeStr_2809 = true;
                this._contents.rectangle = new Rectangle(0, _loc4_ == "up" ? 6 - 1 : 0, this._root.width, this._root.height + 1 - 6);
                this._SafeStr_2809 = false;
                this._SafeStr_3987.rectangle = new Rectangle(MathUtils.clamp(_loc2_ + this._arrowDisplacement, 6, this._root.width - 6), _loc4_ == "up" ? 0 : this._contents.bottom - 1, 9, 6);
                break;
            case "left":
            case "right":
                switch (BalloonArrowPivot.positionFromPivot(this._arrowPivot)) {
                    case "minimum":
                        _loc2_ = 6;
                        break;
                    case "middle":
                        _loc2_ = (this._root.height - 9) / 2 | 0;
                        break;
                    case "maximum":
                        _loc2_ = this._root.height - 6 - 9;
                }
                this._SafeStr_2809 = true;
                this._contents.rectangle = new Rectangle(_loc4_ == "left" ? 6 - 1 : 0, 0, this._root.width + 1 - 6, this._root.height);
                this._SafeStr_2809 = false;
                this._SafeStr_3987.rectangle = new Rectangle(_loc4_ == "left" ? 0 : this._contents.right - 1, MathUtils.clamp(_loc2_ + this._arrowDisplacement, 6, this._root.height - 6), 6, 9);
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BalloonWidget.#staticsReady) return;
        BalloonWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BalloonWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("ARROW_PIVOT_DEFAULT", null);
        set("ARROW_DISPLACEMENT_DEFAULT", null);
        set("ARROW_PIVOT_DEFAULT", new PropertyStruct("balloon:arrow_pivot", "up, center", "String", false, BalloonArrowPivot.ALL));
        set("ARROW_DISPLACEMENT_DEFAULT", new PropertyStruct("balloon:arrow_displacement", 0, "int"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
