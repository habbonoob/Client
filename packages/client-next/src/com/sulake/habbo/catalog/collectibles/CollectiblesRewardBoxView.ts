import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { BaseItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/BaseItemWrapper';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectibleRarity } from '@/com/sulake/habbo/catalog/collectibles/util/CollectibleRarity';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';

export class CollectiblesRewardBoxView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles::CollectiblesRewardBoxView'); }

    public static BG_STAR_ROTATE_SPEED: number = 20;

    declare private _windowManager: IHabboWindowManager;

    declare private _controller: CollectiblesController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3957: IStaticBitmapWrapperWindow;

    private _SafeStr_5137: any[] = [];

    constructor(param1: CollectiblesController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("collectible_reward_xml").content), 2), isIWindowContainer);
        this._SafeStr_3957 = this.rotatingStar;
        this._controller.registerUpdateReceiver(this, 1);
        if (this.closeButton != null) {
            this.closeButton.addEventListener("WME_CLICK", this.onWindowCloseRequested);
        }
        if (this.okButton != null) {
            this.okButton.addEventListener("WME_CLICK", this.onWindowCloseRequested);
        }
    }

    public dispose(): void {
        this._controller.removeUpdateReceiver(this);
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return false;
    }

    private onWindowCloseRequested = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.showNextRewardOrClose();
    };

    private hideWindow(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent != null) {
            _loc1_ = this._windowManager.getDesktop(2);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public showReward(param1: BaseItemWrapper, param2: boolean): void {
        let _loc3_: IDesktopWindow = null;
        if (param1.baseItem == null) {
            return;
        }
        this._SafeStr_5137.push(param1);
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc3_ = this._windowManager.getDesktop(2);
            if (_loc3_ != null) {
                _loc3_.addChild(this._window);
            }
            this.showNextRewardOrClose();
        } else if (param2) {
            this.showNextRewardOrClose();
        }
    }

    private showNextRewardOrClose(): void {
        let _loc1_: BaseItemWrapper = null;
        if (this._SafeStr_5137.length > 0) {
            _loc1_ = this._SafeStr_5137.shift();
            this.populateRewardItem(_loc1_);
        } else {
            this.hideWindow();
        }
    }

    private populateRewardItem(param1: BaseItemWrapper): void {
        this.productImage.productInfo = param1;
        this.setWindowColors(param1.baseItem.rarity);
        this.productNameText.caption = this._controller.getProductName(param1);
        this.rarityText.text = param1.baseItem.rarity.toUpperCase();
    }

    private setWindowColors(param1: string): void {
        let _loc2_: number = CollectibleRarity.getRarityColor(param1);
        this._window.color = _loc2_;
        this.background.color = _loc2_;
    }

    private get background(): IWindow {
        return asGuarded(this._window.findChildByName("background"), isIWindow);
    }

    private get productImage(): IProductImageWidget {
        let _loc1_: IWidgetWindow = asGuarded(this._window.findChildByName("product_image"), isIWidgetWindow);
        return asGuarded(_loc1_.widget, isIProductImageWidget);
    }

    private get productNameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("product_name"), isITextWindow);
    }

    private get closeButton(): IWindow {
        return asGuarded(this._window.findChildByName("header_button_close"), isIWindow);
    }

    private get okButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("ok_button"), isIButtonWindow);
    }

    private get rotatingStar(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("rotating_star"), isIStaticBitmapWrapperWindow);
    }

    private get rarityText(): ITextWindow {
        return asGuarded(this._window.findChildByName("rarity_text"), isITextWindow);
    }

    public update(param1: number): void {
        let _loc2_: number = CollectiblesRewardBoxView.BG_STAR_ROTATE_SPEED * (param1 / 1000);
        this._SafeStr_3957.rotation += _loc2_;
        this._SafeStr_3957.rotation %= 360;
        this._SafeStr_3957.invalidate();
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
