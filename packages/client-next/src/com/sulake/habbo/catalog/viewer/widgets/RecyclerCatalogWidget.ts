import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { FurniSlotItem } from '@/com/sulake/habbo/catalog/recycler/FurniSlotItem';
import type { IRecycler } from '@/com/sulake/habbo/catalog/recycler/IRecycler';
import type { IRecyclerVisualization } from '@/com/sulake/habbo/catalog/recycler/IRecyclerVisualization';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogObjectMover } from '@/com/sulake/habbo/catalog/viewer/CatalogObjectMover';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { FrankRecyclerEmotion } from '@/com/sulake/habbo/catalog/viewer/widgets/franksemotions/FrankRecyclerEmotion';
import { RecyclerEngineAnimator } from '@/com/sulake/habbo/catalog/viewer/widgets/utils/RecyclerEngineAnimator';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class RecyclerCatalogWidget extends CatalogWidget implements ICatalogWidget, IRecyclerVisualization, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::RecyclerCatalogWidget'); }

    declare private _SafeStr_2482: CatalogObjectMover;

    declare private _awaitingImages: Map<any, any>;

    declare private _SafeStr_3177: RecyclerEngineAnimator;

    declare private _SafeStr_2856: Timer;

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    private get recycler(): IRecycler {
        return this.page.viewer.catalog.getRecycler();
    }

    public override dispose(): void {
        if (this._SafeStr_2482 != null) {
            this._SafeStr_2482.dispose();
            this._SafeStr_2482 = null;
        }
        if (this.recycler != null) {
            this.recycler.cancel();
        }
        if (this._SafeStr_3177 != null) {
            this._SafeStr_3177.dispose();
            this._SafeStr_3177 = null;
        }
        if (this._SafeStr_2856 != null) {
            this.stopTimer();
        }
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("recyclerWidget");
        this.renderSlotGraphics();
        this.renderDucketCost();
        let _loc2_: IWindow = this.window.findChildByName("recycler_recycle");
        _loc2_.addEventListener("WME_CLICK", this.onRecycleButtonClick);
        let _loc1_: IWindow = this.window.findChildByName("abort_region");
        _loc1_.addEventListener("WME_CLICK", this.onAbortClick);
        this.patFrankButton.addEventListener("WME_CLICK", this.onPatFrank);
        this.abortButtonVisible = false;
        this._SafeStr_3177 = new RecyclerEngineAnimator(asGuarded(this.window.findChildByName("pointer_arrow"), isIStaticBitmapWrapperWindow), asGuarded(this.window.parent.findChildByName("recycle_machine"), isIStaticBitmapWrapperWindow), this.onAnimationComplete);
        if (this.recycler == null) {
            return false;
        }
        this.recycler.init(this);
        return true;
    }

    private onPatFrank = (param1: WindowMouseEvent): void => {
        let _loc2_: FrankRecyclerEmotion = new FrankRecyclerEmotion(this.emoji2BitmapTemplate);
        _loc2_.start(this.disabledBorder);
    };

    public updateUI(): void {
        let _loc1_: IWindow = this.window;
        while (_loc1_ != null) {
            _loc1_.procedure = this.onMainContainerEvent;
            _loc1_.mouseThreshold = 0;
            _loc1_ = _loc1_.parent;
        }
        let _loc2_: IWindow = (asGuarded(this.window.parent, isIWindowContainer)).findChildByName("catalog.header.description");
        if (_loc2_ != null) {
            _loc2_.caption = "${recycler.info.ready}";
        }
        this.disabledBorder.visible = this.recycler.recyclerDisabled;
        this.updateRecycleButton();
    }

    private startTimer(): void {
        this._SafeStr_2856 = new Timer(1000);
        this._SafeStr_2856.addEventListener("timer", this.onTimerTick);
        this._SafeStr_2856.start();
    }

    private stopTimer(): void {
        if (this._SafeStr_2856) {
            this._SafeStr_2856.stop();
            this._SafeStr_2856.removeEventListener("timer", this.onTimerTick);
            this._SafeStr_2856 = null;
        }
    }

    private onTimerTick = (param1: TimerEvent): void => {
        this.updateRecycleButton();
        if (this.recycler.secondsToWait() <= 0) {
            this.stopTimer();
        }
    };

    private renderSlotGraphics(): void {
        let _loc3_: number = 0;
        let _loc1_: IBitmapWrapperWindow = null;
        let _loc2_: BitmapData = this.getAssetBitmapData("ctlg_recycler_slot_bg");
        if (_loc2_ == null) {
            return;
        }
        _loc3_ = 1;
        while (_loc3_ <= this.recycler.numberOfSlots) {
            _loc1_ = asGuarded(this.window.findChildByName("slot_bg_" + _loc3_), isIBitmapWrapperWindow);
            if (_loc1_ != null) {
                _loc1_.bitmap = _loc2_.clone();
                _loc1_.procedure = this.onSlotMouseEvent;
                _loc1_.mouseThreshold = 0;
            }
            _loc3_++;
        }
        _loc3_ = 1;
        while (_loc3_ <= this.recycler.numberOfSlots) {
            _loc1_ = asGuarded(this.window.findChildByName("slot_img_" + _loc3_), isIBitmapWrapperWindow);
            if (_loc1_ != null) {
                _loc1_.bitmap = _loc2_.clone();
                _loc1_.procedure = this.onSlotMouseEvent;
                _loc1_.mouseThreshold = 0;
            }
            _loc3_++;
        }
    }

    private renderDucketCost(): void {
        if (this.window == null || this.recycler == null) {
            return;
        }
        let _loc1_: ITextWindow = asGuarded(this.window.findChildByName("ducket_cost"), isITextWindow);
        let _loc3_: IIconWindow = asGuarded(this.window.findChildByName("ducket_icon"), isIIconWindow);
        let _loc2_: number = this.recycler.ducketCost;
        if (_loc2_ == 0) {
            _loc1_.visible = false;
            _loc3_.visible = false;
        } else {
            _loc1_.visible = true;
            _loc3_.visible = true;
            _loc1_.text = String(_loc2_);
        }
    }

    public updateSlots(): void {
        let _loc4_: number = 0;
        let _loc3_: IBitmapWrapperWindow = null;
        let _loc2_: FurniSlotItem = null;
        let _loc1_: ImageResult = null;
        if (this.window == null || this.recycler == null) {
            return;
        }
        this._awaitingImages = new Dictionary();
        _loc4_ = 0;
        while (_loc4_ < this.recycler.numberOfSlots) {
            _loc3_ = asGuarded(this.window.findChildByName("slot_img_" + (_loc4_ + 1)), isIBitmapWrapperWindow);
            if (_loc3_ == null) {
                return;
            }
            _loc2_ = this.recycler.getSlotContent(_loc4_);
            if (_loc2_ == null) {
                _loc3_.bitmap = new BitmapData(1, 1, true, 16777215);
            } else {
                _loc1_ = this.getFurniImageResult(_loc2_);
                if (_loc1_ != null) {
                    if (_loc1_.data != null) {
                        this.updateImage(_loc1_.data, _loc3_);
                    } else {
                        this._awaitingImages.set(_loc1_.id, _loc4_);
                    }
                }
            }
            _loc4_++;
        }
    }

    private updateImage(param1: BitmapData, param2: IBitmapWrapperWindow): void {
        let _loc4_: BitmapData = new BitmapData(param2.width, param2.height, true, 16777215);
        _loc4_.fillRect(_loc4_.rect, 16777215);
        let _loc3_: Point = new Point((param2.width - param1.width) / 2, (param2.height - param1.height) / 2);
        _loc4_.copyPixels(param1, param1.rect, _loc3_, null, null, true);
        param2.bitmap = _loc4_;
        param1.dispose();
    }

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc4_: number = 0;
        let _loc3_: IBitmapWrapperWindow = null;
        if (this._awaitingImages != null && this._awaitingImages.has(param1)) {
            _loc4_ = this._awaitingImages.get(param1) | 0;
            this._awaitingImages.delete(param1);
            _loc3_ = asGuarded(this.window.findChildByName("slot_img_" + (_loc4_ + 1)), isIBitmapWrapperWindow);
            if (_loc3_ == null) {
                return;
            }
            this.updateImage(param2, _loc3_);
        }
    }

    public imageFailed(param1: number): void {
        if (this._awaitingImages != null) {
            this._awaitingImages.delete(param1);
        }
    }

    private getFurniImageResult(param1: FurniSlotItem): ImageResult {
        if (param1 == null || this.page.viewer.roomEngine == null) {
            return null;
        }
        if (param1.category == 10) {
            return this.page.viewer.roomEngine.getFurnitureIcon(param1.typeId, this);
        }
        if (param1.category == 20) {
            return this.page.viewer.roomEngine.getWallItemIcon(param1.typeId, this, param1.xxxExtra);
        }
        return null;
    }

    private get easterEggMode(): boolean {
        let _loc2_: number = 0;
        let _loc1_: FurniSlotItem = null;
        if (this.recycler == null) {
            return false;
        }
        this._awaitingImages = new Dictionary();
        _loc2_ = 0;
        while (_loc2_ < this.recycler.numberOfSlots) {
            _loc1_ = this.recycler.getSlotContent(_loc2_);
            if (this.page.viewer.roomEngine.getFurnitureType(_loc1_.typeId) == "wf_act_reset_timers") {
                return true;
            }
            _loc2_++;
        }
        return false;
    }

    private onMainContainerEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.page == null || this.page.viewer == null) {
            return;
        }
        let _loc5_: IRoomEngine = this.page.viewer.roomEngine;
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: ISelectedRoomObjectData = _loc5_.getSelectedObjectData(_loc5_.activeRoomId);
        switch (param1.type) {
            case "WME_OUT":
                if (this._SafeStr_2482 != null) {
                    this._SafeStr_2482.onMainContainerEvent(param1, param2, _loc4_);
                }
                break;
            case "WME_MOVE":
                if (this._SafeStr_2482 != null) {
                    this._SafeStr_2482.onMainContainerEvent(param1, param2, _loc4_);
                }
                break;
            case "WME_OVER":
                if (this._SafeStr_2482 == null) {
                    this._SafeStr_2482 = new CatalogObjectMover();
                    this._SafeStr_2482.mainContainer = this.window;
                    this._SafeStr_2482.roomEngine = _loc5_;
                }
        }
        let _loc3_: boolean = this._SafeStr_2482 != null && this._SafeStr_2482.state;
        if (_loc3_ && _loc5_.getObjectMoverIconSpriteVisible()) {
            _loc5_.setObjectMoverIconSpriteVisible(false);
        }
    };

    private onSlotMouseEvent = (param1: WindowEvent, param2: IWindow): void => {
        let objectData: ISelectedRoomObjectData;
        let slotId: number = 0;
        let event: WindowEvent = param1;
        let target: IWindow = param2;
        let roomEngine: IRoomEngine = this.page.viewer.roomEngine;
        if (roomEngine == null || this.recycler == null) {
            return;
        }
        objectData = roomEngine.getSelectedObjectData(roomEngine.activeRoomId);
        if (event.type == "WME_UP") {
            if (event.window.name.indexOf("slot_") == 0) {
                slotId = (Number(event.window.name.charAt(event.window.name.length - 1)) | 0) - 1;
                if (objectData != null) {
                    if (objectData.operation != "OBJECT_PLACE") {
                        this.page.viewer.catalog.windowManager.alert("${generic.alert.title}", "${catalog.alert.recycler.inventory}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                         param1.dispose();
                     });
                        return;
                    }
                    this.recycler.placeObjectAtSlot(slotId, objectData.id, objectData.category, objectData.typeId, objectData.instanceData);
                } else {
                    this.recycler.releaseSlot(slotId);
                }
                roomEngine.cancelRoomObjectInsert();
                if (this._SafeStr_2482 != null) {
                    this._SafeStr_2482.resetIcon();
                }
                return;
            }
        }
        if (event.type == "WME_MOVE") {
            this.onMainContainerEvent(event, target);
        }
    };

    public updateRecycleButton(): void {
        let _loc2_: number = 0;
        if (this.disposed || this.window == null) {
            return;
        }
        let _loc1_: IWindow = this.window.findChildByName("recycler_recycle");
        if (_loc1_ != null) {
            _loc2_ = this.recycler.secondsToWait();
            if (_loc2_ > 0) {
                _loc1_.caption = this.page.viewer.catalog.localization.getLocalizationWithParams("catalog.recycler.button.wait", "", "s", _loc2_);
            } else {
                _loc1_.caption = "${catalog.recycler.button.recycle}";
            }
            if (this.recycler.isReadyToRecycle() && !this._SafeStr_3177.isBusy() && _loc2_ <= 0) {
                _loc1_.enable();
            } else {
                _loc1_.disable();
            }
            if (this._SafeStr_2856 == null && this.recycler.secondsToWait() > 0) {
                this.startTimer();
            }
        }
    }

    private onRecycleButtonClick = (param1: WindowMouseEvent): void => {
        let event: WindowMouseEvent = param1;
        if (!this.recycler.hasEnoughDuckets()) {
            this.page.viewer.catalog.windowManager.alert("${generic.alert.title}", "${catalog.alert.notenough.activitypoints.title.0}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
            return;
        }
        this._SafeStr_3177.start(this.easterEggMode);
        this.updateRecycleButton();
        this.abortButtonVisible = true;
    };

    private onAbortClick = (param1: WindowMouseEvent): void => {
        this.abortButtonVisible = false;
        this._SafeStr_3177.stop();
        this.updateRecycleButton();
        setTimeout(this.resetAnimation, 650);
    };

    private onAnimationComplete = (): void => {
        if (this.recycler != null) {
            this.recycler.executeRecycler();
            this.recycler.setNextRecycleAllowedTimestamp(getTimer() + this.recycler.timeout * 1000);
        }
        this.updateRecycleButton();
        setTimeout(this.resetAnimation, 1000);
        this.abortButtonVisible = false;
    };

    private resetAnimation = (): void => {
        this._SafeStr_3177.reset();
    };

    private set abortButtonVisible(param1: boolean) {
        let _loc2_: IWindow = this.window.findChildByName("abort_region");
        _loc2_.visible = param1;
    }

    private get disabledBorder(): IBorderWindow {
        return asGuarded(this.window.findChildByName("disabled_border"), isIBorderWindow);
    }

    private get patFrankButton(): IButtonWindow {
        return asGuarded(this.window.findChildByName("pat_frank_btn"), isIButtonWindow);
    }

    private get emoji1Bitmap(): IStaticBitmapWrapperWindow {
        return asGuarded(this.window.findChildByName("emoji_1"), isIStaticBitmapWrapperWindow);
    }

    private get emoji2BitmapTemplate(): IStaticBitmapWrapperWindow {
        return asGuarded(this.window.findChildByName("emoji_2_template"), isIStaticBitmapWrapperWindow);
    }

    get [IGetImageListener](): true {
        return true;
    }
}
