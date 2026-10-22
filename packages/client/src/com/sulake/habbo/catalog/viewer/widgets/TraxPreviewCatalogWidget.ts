import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class TraxPreviewCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::TraxPreviewCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        TraxPreviewCatalogWidget.#initStatics();
        return TraxPreviewCatalogWidget._log;
    }

    constructor(param1: IWindowContainer, param2: IHabboSoundManager) {
        super(param1);
        this._SafeStr_3040 = asGuarded(this._window.findChildByName("listen"), isIButtonWindow);
        TraxPreviewCatalogWidget._log.info("Trax listener found button: " + this._SafeStr_3040);
        if (this._SafeStr_3040 != null) {
            this._SafeStr_3040.addEventListener("WME_CLICK", this.onClickPlay);
            this._SafeStr_3040.disable();
        }
        this._soundManager = param2;
    }

    declare private _soundManager: IHabboSoundManager;

    declare private _SafeStr_3040: IButtonWindow;

    private _SafeStr_3028: number = -1;

    public override dispose(): void {
        if (this._SafeStr_3040 != null) {
            this._SafeStr_3040.removeEventListener("WME_CLICK", this.onClickPlay);
        }
        if (this._soundManager != null && this._soundManager.musicController != null) {
            this._soundManager.musicController.stop(3);
            this._soundManager = null;
        }
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.page.offers.length == 0) {
            return false;
        }
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        return true;
    }

    public override closed(): void {
        super.closed();
        if (this._soundManager != null && this._soundManager.musicController != null) {
            this._soundManager.musicController.stop(3);
        }
    }

    private onClickPlay = (param1: WindowMouseEvent): void => {
        if (this._soundManager != null && this._soundManager.musicController != null) {
            this.forceNoFadeoutOnPlayingSong(0);
            this.forceNoFadeoutOnPlayingSong(3);
            this._soundManager.musicController.playSong(this._SafeStr_3028, 3, 15, 40, 0, 2);
        }
    };

    private forceNoFadeoutOnPlayingSong(param1: number): void {
        let _loc2_: ISongInfo = null;
        let _loc3_: number = this._soundManager.musicController.getSongIdPlayingAtPriority(param1);
        if (_loc3_ != -1) {
            _loc2_ = this._soundManager.musicController.getSongInfo(_loc3_);
            if (_loc2_.soundObject != null) {
                _loc2_.soundObject.fadeOutSeconds = 0;
            }
        }
    }

    private onSelectProduct = (param1: SelectProductEvent): void => {
        if (param1 == null || param1.offer == null) {
            return;
        }
        let _loc3_: boolean = false;
        let _loc2_: IProduct = param1.offer.product;
        if (_loc2_.extraParam.length > 0) {
            this._SafeStr_3028 = parseInt(_loc2_.extraParam) | 0;
            _loc3_ = true;
        }
        if (this._SafeStr_3040 != null) {
            if (_loc3_) {
                this._SafeStr_3040.enable();
            } else {
                this._SafeStr_3040.disable();
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TraxPreviewCatalogWidget.#staticsReady) return;
        TraxPreviewCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TraxPreviewCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.TraxPreviewCatalogWidget"));
    }
}
