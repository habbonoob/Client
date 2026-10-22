import { asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboAvatarEditorAvatarEffect } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorAvatarEffect';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class AvatarEditorGridItemEffect {
    static { registerClassName(this, 'com.sulake.habbo.avatar.effects::AvatarEditorGridItemEffect'); }

    constructor(param1: IHabboAvatarEditorAvatarEffect, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._window = castGuarded(param2.buildFromXML(asInstanceOf(param3.getAssetByName("avatar_editor_effect_griditem_xml").content, XML)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3024 = this._window.findChildByTag("BG_COLOR");
        this._SafeStr_5824 = param1;
        if (param1 != null) {
            this.bitmap = param1.icon;
            this.amount = param1.amountInInventory;
            if (param1.isPermanent) {
                this.setSecondsLeft(param1.duration, param1.duration);
            } else if (param1.isActive) {
                this.setSecondsLeft(param1.secondsLeft, param1.duration);
            }
        } else {
            this.bitmap = castTo(param2.assets.getAssetByName("avatar_editor_generic_remove_selection").content, BitmapData);
            this.amount = 1;
        }
        this.selected = false;
        this._window.addEventListener("WME_OVER", this.onMouseOver);
        this._window.addEventListener("WME_OUT", this.onMousetOut);
    }

    declare private _SafeStr_3024: IWindow;

    private _isSelected: boolean = false;

    declare private _SafeStr_5824: IHabboAvatarEditorAvatarEffect;

    declare private _window: IWindowContainer;

    public get window(): IWindow {
        return this._window;
    }

    public get effectType(): number {
        return this._SafeStr_5824 != null ? this._SafeStr_5824.type : -1;
    }

    public set selected(param1: boolean) {
        this._isSelected = param1;
        this._SafeStr_3024.visible = this._isSelected;
        this._SafeStr_3024.blend = 1;
    }

    private set bitmap(param1: BitmapData) {
        castGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow").bitmap = param1;
    }

    private set amount(param1: number) {
        let _loc2_: IWindowContainer = castGuarded(this._window.findChildByName("effect_amount_bg1"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc3_: ITextWindow = castGuarded(this._window.findChildByName("effect_amount"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc2_.visible = param1 > 1;
        _loc3_.text = param1.toString();
    }

    private onMousetOut = (param1: WindowMouseEvent): void => {
        if (!this._isSelected) {
            this._SafeStr_3024.visible = false;
        }
        this._SafeStr_3024.blend = 1;
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        if (!this._isSelected) {
            this._SafeStr_3024.visible = true;
            this._SafeStr_3024.blend = 0.5;
        }
    };

    private setSecondsLeft(param1: number, param2: number): void {
        this._window.findChildByName("duration_container").visible = true;
        let _loc5_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName("progress_bar"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc3_: BitmapData = new BitmapData(_loc5_.width, _loc5_.height, false, 0);
        let _loc4_: Rectangle = new Rectangle(0, 0, _loc3_.width * (param1 / param2) | 0, _loc3_.height);
        _loc3_.fillRect(_loc4_, 2146080);
        _loc5_.bitmap = _loc3_;
    }
}
