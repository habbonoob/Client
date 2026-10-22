import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { LocalizedSprite } from '@/onBoardingHcUi/LocalizedSprite.group';

const button_png_pngAsset = embedBitmap("onboarding/button_png.png");
const button_pressed_png_pngAsset = embedBitmap("onboarding/button_pressed_png.png");
const button_inactive_png_pngAsset = embedBitmap("onboarding/button_inactive_png.png");

export class Button extends LocalizedSprite {
    static { registerClassName(this, 'onBoardingHcUi::Button'); }

    private static readonly button_png = button_png_pngAsset;

    private static readonly button_pressed_png = button_pressed_png_pngAsset;

    private static readonly button_inactive_png = button_inactive_png_pngAsset;

    declare private _caption: string;

    declare private _localizedText: string;

    declare protected _rectangle: Rectangle;

    declare private _fitWidthToText: boolean;
    static { (this.prototype as any)._fitWidthToText = false; }

    declare private _centred: boolean;
    static { (this.prototype as any)._centred = false; }

    declare private _action: (...args: any[]) => any;

    declare private _glowColour: number;
    static { (this.prototype as any)._glowColour = 0; }

    declare private _background: Sprite;

    declare private _defaultBackground: DisplayObject;

    declare private _editingBackground: DisplayObject;

    declare private _pressedBackground: DisplayObject;

    declare private _inactiveBackground: DisplayObject;

    declare private _rolloverBackground: DisplayObject;

    declare private _captionElement: TextField;

    declare private _pressed: boolean;
    static { (this.prototype as any)._pressed = false; }

    declare private _hover: boolean;
    static { (this.prototype as any)._hover = false; }

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _currentlyEditing: boolean;
    static { (this.prototype as any)._currentlyEditing = false; }

    declare private _alignRight: boolean;
    static { (this.prototype as any)._alignRight = false; }

    declare private _icon: Bitmap;

    constructor(param1: string, param2: Rectangle, param3: boolean, param4: (...args: any[]) => any, param5: number = 16777215) {
        super();
        this.onAddedToStage = this.onAddedToStage.bind(this);
        this.removeOldLocalization(this._caption);
        this._caption = param1;
        this._localizedText = param1;
        this.checkLocalization(this._caption);
        this._rectangle = param2;
        this._fitWidthToText = param3;
        this._action = param4;
        this._glowColour = param5;
        this._icon = this.icon;
        this.active = true;
        this.mouseChildren = false;
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.addEventListener("removedFromStage", this.onRemovedFromStage);
    }

    private onRemovedFromStage = (param1: Event): void => {
        this.stage.removeEventListener("mouseUp", this.onStageMouseUp);
        this.removeEventListener("mouseDown", this.onMouseDown);
        this.removeEventListener("mouseUp", this.onMouseUp);
        this.removeEventListener("mouseOver", this.onMouseOver);
        this.removeEventListener("mouseOut", this.onMouseOut);
    };

    protected onAddedToStage(param1: Event = null): void {
        this.x = this._rectangle.x;
        this.y = this._rectangle.y;
        if (this._caption != "") {
            this._captionElement = LoaderUI.createTextField(this._localizedText, 18, this.textColour, true, false, false, this.italic, "left", false, this.underline);
            if (this.etching) {
                LoaderUI.addEtching(this._captionElement);
            }
            if (this._fitWidthToText) {
                this._rectangle.width = this._captionElement.textWidth + this.padding;
            }
        }
        this._defaultBackground = this.defaultBackground;
        this._defaultBackground.width = this._rectangle.width;
        this._defaultBackground.height = this._rectangle.height;
        this._editingBackground = this.currentlyActive;
        this._editingBackground.width = this._rectangle.width;
        this._editingBackground.height = this._rectangle.height;
        this._pressedBackground = this.pressedBackground;
        this._pressedBackground.width = this._rectangle.width;
        this._pressedBackground.height = this._rectangle.height;
        this._inactiveBackground = this.inactiveBackground;
        this._inactiveBackground.width = this._rectangle.width;
        this._inactiveBackground.height = this._rectangle.height;
        this._rolloverBackground = this.rolloverBackground;
        if (this._rolloverBackground != null) {
            this._rolloverBackground.width = this._rectangle.width;
            this._rolloverBackground.height = this._rectangle.height;
        }
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        this._background = new Sprite();
        this._background.addChild(this._defaultBackground);
        this._background.addChild(this._pressedBackground);
        this._background.addChild(this._inactiveBackground);
        this._background.addChild(this._editingBackground);
        if (this._rolloverBackground != null) {
            this._background.addChild(this._rolloverBackground);
        }
        this.addChild(this._background);
        if (this._caption != "") {
            this.addChild(this._captionElement);
            this._captionElement.x = (this._rectangle.width - this._captionElement.textWidth) / 2 - 2;
            this._captionElement.y = (this._rectangle.height - this._captionElement.textHeight) / 2 - 2;
        }
        if (this.icon != null) {
            this._background.addChild(this.icon);
            this.icon.x = 10;
            this._icon.y = (this._background.height - this.icon.height) / 2;
        }
        this.refresh();
        this.width = this._rectangle.width;
        this.height = this._rectangle.height;
        if (this.centred) {
            this.x = (this.parent.width - this.width) / 2 | 0;
        }
        if (this._alignRight) {
            this.x = this.parent.width - this.width;
        }
        this.addEventListener("mouseDown", this.onMouseDown);
        this.addEventListener("mouseOver", this.onMouseOver);
        this.addEventListener("mouseOut", this.onMouseOut);
    }

    private onMouseOut = (param1: MouseEvent): void => {
        this._hover = false;
        this.refresh();
    };

    private onMouseOver = (param1: MouseEvent): void => {
        if (!this._active) {
            return;
        }
        this._hover = true;
        this.refresh();
    };

    private onMouseDown = (param1: MouseEvent): void => {
        if (!this._active) {
            return;
        }
        this.stage.addEventListener("mouseUp", this.onStageMouseUp);
        this.addEventListener("mouseUp", this.onMouseUp);
        this._pressed = true;
        this.refresh();
    };

    private onMouseUp = (param1: MouseEvent): void => {
        param1.stopImmediatePropagation();
        this.stage.removeEventListener("mouseUp", this.onStageMouseUp);
        this.removeEventListener("mouseUp", this.onMouseUp);
        this._pressed = false;
        this.refresh();
        this._action(this);
    };

    private onStageMouseUp = (param1: MouseEvent): void => {
        this.stage.removeEventListener("mouseUp", this.onStageMouseUp);
        this.removeEventListener("mouseUp", this.onMouseUp);
        this._pressed = false;
        this.refresh();
    };

    private refresh(): void {
        let _loc3_: number = 0;
        _loc3_ = 1;
        let _loc1_: number = 0;
        _loc1_ = 2;
        let _loc2_: number = 0;
        _loc2_ = 3;
        let _loc5_: number = 0;
        _loc5_ = 4;
        if (this._background == null) {
            return;
        }
        let _loc4_: number = this._active ? (this._pressed && this._hover || this._selected ? 2 : 1) : 3;
        if (this._currentlyEditing) {
            _loc4_ = 4;
        }
        this._defaultBackground.visible = _loc4_ == 1 && (this._rolloverBackground == null || !this._hover);
        this._pressedBackground.visible = _loc4_ == 2;
        this._inactiveBackground.visible = _loc4_ == 3;
        this._editingBackground.visible = _loc4_ == 4;
        if (this._rolloverBackground != null) {
            this._rolloverBackground.visible = _loc4_ == 1 && this._hover;
            this.filters = [];
        } else {
            this.filters = this._hover ? [new GlowFilter(this._glowColour, 0.7, 10, 10)] : [];
        }
        if (this._captionElement) {
            this._captionElement.textColor = (this._active ? this.textColour : 10066329) >>> 0;
        }
    }

    public get centred(): boolean {
        return this._centred;
    }

    public set centred(param1: boolean) {
        this._centred = param1;
    }

    public override set x(param1: number) {
        super.x = param1;
        this._rectangle.x = param1;
    }

    public override set y(param1: number) {
        super.y = param1;
        this._rectangle.y = param1;
    }

    public get active(): boolean {
        return this._active;
    }

    public set active(param1: boolean) {
        this._active = param1;
        this.buttonMode = this._active;
        this.refresh();
    }

    public unselect(): void {
        this._currentlyEditing = false;
        this._selected = false;
        this.refresh();
    }

    public currentlyEditing(): void {
        this._currentlyEditing = true;
        this.refresh();
    }

    public select(): void {
        this._selected = true;
        this.refresh();
    }

    public set alignRight(param1: boolean) {
        this._alignRight = param1;
    }

    protected get defaultBackground(): DisplayObject {
        return LoaderUI.createScale9GridShapeFromImage(castTo(new Button.button_png(), Bitmap).bitmapData, new Rectangle(5, 5, 1, 2));
    }

    protected get pressedBackground(): DisplayObject {
        return LoaderUI.createScale9GridShapeFromImage(castTo(new Button.button_pressed_png(), Bitmap).bitmapData, new Rectangle(6, 10, 1, 3));
    }

    protected get inactiveBackground(): DisplayObject {
        return LoaderUI.createScale9GridShapeFromImage(castTo(new Button.button_inactive_png(), Bitmap).bitmapData, new Rectangle(5, 6, 1, 2));
    }

    protected get currentlyActive(): DisplayObject {
        return LoaderUI.createScale9GridShapeFromImage(castTo(new Button.button_png(), Bitmap).bitmapData, new Rectangle(5, 6, 1, 2));
    }

    protected get rolloverBackground(): DisplayObject {
        return null;
    }

    protected get icon(): Bitmap {
        return this._icon;
    }

    protected get etching(): boolean {
        return true;
    }

    protected get padding(): number {
        return 24;
    }

    protected get textColour(): number {
        return 0;
    }

    protected get italic(): boolean {
        return false;
    }

    protected get underline(): boolean {
        return false;
    }

    public get label(): string {
        return this._caption;
    }

    public get localizedText(): string {
        return this._localizedText;
    }

    public set localizedText(param1: string) {
        this._localizedText = param1;
        if (this._captionElement) {
            this._captionElement.text = param1;
            this.onAddedToStage();
        }
    }

    public override get x(): number {
        return super.x;
    }

    public override get y(): number {
        return super.y;
    }
}
