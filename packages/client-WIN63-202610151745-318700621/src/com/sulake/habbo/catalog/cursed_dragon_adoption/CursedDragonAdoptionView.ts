import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { CursedDragonAdoptionController } from '@/com/sulake/habbo/catalog/cursed_dragon_adoption/CursedDragonAdoptionController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { CursedDragonPreviewView } from '@/com/sulake/habbo/catalog/cursed_dragon_adoption/CursedDragonPreviewView';

export class CursedDragonAdoptionView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.cursed_dragon_adoption::CursedDragonAdoptionView'); }

    private static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _controller: CursedDragonAdoptionController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _preview: CursedDragonPreviewView;

    declare private _SafeStr_3939: IConfirmDialog;

    private _SafeStr_14840: number = -1;
    private _disposed: boolean = false;

    constructor(param1: CursedDragonAdoptionController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("cursed_dragon_adoption_xml").content), 1), isIFrameWindow);
        this._window.findChildByName("header_button_help").visible = false;
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.blueAdoptButton.addEventListener("WME_CLICK", this.onBlueAdopt);
        this.purpleAdoptButton.addEventListener("WME_CLICK", this.onPurpleAdopt);
        this._preview = new CursedDragonPreviewView(this._controller, this._window);
        this._window.center();
        this._window.visible = false;
    }

    public show(): void {
        this._window.visible = true;
        this._window.activate();
        this._preview.show();
    }

    public hide(): void {
        this.closeConfirmation();
        this._window.visible = false;
        this._preview.hide();
    }

    public updateClaimState(): void {
        if (!this._controller.canClaim) {
            this.closeConfirmation();
        }
        let _loc1_: string = this._controller.claimState == 4 ? "${cursed_dragon_adoption.adopted}" : "${cursed_dragon_adoption.adopt}";
        this.blueAdoptButton.caption = _loc1_;
        this.purpleAdoptButton.caption = _loc1_;
        this.updateButtons();
    }

    private updateButtons(): void {
        let _loc1_: boolean = !this._controller.canClaim || this._SafeStr_3939 != null;
        WindowUtils.disableSection(this.blueAdoptButton, _loc1_);
        WindowUtils.disableSection(this.purpleAdoptButton, _loc1_);
    }

    private onBlueAdopt = (param1: WindowMouseEvent): void => {
        this.confirmAdoption(0);
    };

    private onPurpleAdopt = (param1: WindowMouseEvent): void => {
        this.confirmAdoption(1);
    };

    private confirmAdoption(param1: number): void {
        if (!this._controller.canClaim || this._SafeStr_3939 != null) {
            return;
        }
        this._SafeStr_14840 = param1;
        let _loc2_: string = param1 == 0 ? "cursed_dragon_adoption.blue.name" : "cursed_dragon_adoption.purple.name";
        this._SafeStr_3939 = this._windowManager.confirm("${cursed_dragon_adoption.confirm.title}", this._controller.localizationManager.getLocalizationWithParams("cursed_dragon_adoption.confirm.desc", "", "colour", this._controller.localizationManager.getLocalization(_loc2_)), 0, this.onAdoptionConfirmed);
        this.updateButtons();
    }

    private onAdoptionConfirmed = (param1: IConfirmDialog, param2: WindowEvent): void => {
        let _loc3_: number = this._SafeStr_14840;
        this.closeConfirmation();
        if (param2.type == "WE_OK") {
            this._controller.makeClaim(_loc3_);
        }
        this.updateButtons();
    };

    private closeConfirmation(): void {
        if (this._SafeStr_3939 != null) {
            this._SafeStr_3939.dispose();
            this._SafeStr_3939 = null;
            this._SafeStr_14840 = -1;
        }
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.closeConfirmation();
        this.closeButton.removeEventListener("WME_CLICK", this.onClose);
        this.blueAdoptButton.removeEventListener("WME_CLICK", this.onBlueAdopt);
        this.purpleAdoptButton.removeEventListener("WME_CLICK", this.onPurpleAdopt);
        this._preview.dispose();
        this._preview = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._windowManager = null;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get blueAdoptButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("blue_adopt"), isIButtonWindow);
    }

    private get purpleAdoptButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("purple_adopt"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
