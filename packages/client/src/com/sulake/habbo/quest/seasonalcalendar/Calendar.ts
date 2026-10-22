import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { MainWindow } from '@/com/sulake/habbo/quest/seasonalcalendar/MainWindow';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import { CalendarArrowButton } from '@/com/sulake/habbo/quest/seasonalcalendar/CalendarArrowButton';
import { CalendarBackgroundRenderer } from '@/com/sulake/habbo/quest/seasonalcalendar/CalendarBackgroundRenderer';
import { CalendarEntityStateEnums } from '@/com/sulake/habbo/quest/seasonalcalendar/CalendarEntityStateEnums';

export class Calendar implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::Calendar'); }

    private static readonly BG_IMAGE_PREFIX: string = "background_";
    private static readonly ENTITY_IMAGE_PREFIX: string = "day";
    private static readonly ENTITY_IMAGE_UNCOMPLETE_POSTFIX: string = "_uncomplete";
    private static readonly ENTITY_IMAGE_COMPLETED_POSTFIX: string = "_completed";
    private static readonly SHOW_FUTURE_INACTIVE_ENTITIES_COUNT: number = 2;
    private static readonly _SafeStr_8553: number = 3;
    private static readonly ENTITY_SPACING: number = 80;
    private static readonly ENTITIES_LEFT_MARGIN: number = 37;
    private static readonly _SafeStr_8700: number = 7;
    private static readonly DAILY_REFRESH_DELAY_MINUTES: number = 5;
    private static readonly FLASH_PULSE_LENGHT_IN_MS: number = 2000;
    private static readonly FLASH_MAX_BRIGHTNESS: number = 100;

    private static adjustBrightness(param1: number, param2: number): number {
        let _loc3_: number = Math.min(255, Math.max(0, (param1 >> 16 & 0xFF) + param2)) | 0;
        let _loc5_: number = Math.min(255, Math.max(0, (param1 >> 8 & 0xFF) + param2)) | 0;
        let _loc4_: number = Math.min(255, Math.max(0, (param1 & 0xFF) + param2)) | 0;
        return ((_loc3_ & 0xFF) << 16) + ((_loc5_ & 0xFF) << 8) + (_loc4_ & 0xFF) >>> 0;
    }

    constructor(param1: HabboQuestEngine, param2: MainWindow) {
        this._questEngine = param1;
        this._SafeStr_2133 = param2;
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _SafeStr_2133: MainWindow;

    declare private _quests: any[];

    declare private _backgroundImageCache: BitmapData[];

    declare private _graphicEntityCache: BitmapData[];

    declare private _SafeStr_4619: UtilsMap;

    declare private _bgAssetNameArray: any[];

    declare private _SafeStr_6845: string;

    declare private _SafeStr_2560: CalendarBackgroundRenderer;

    declare private _entityWindows: IWindowContainer[];

    declare private _states: any[];

    declare private _SafeStr_3316: CalendarArrowButton;

    declare private _SafeStr_3332: CalendarArrowButton;

    declare private _SafeStr_2175: IWindowContainer;

    declare private _SafeStr_5918: IWindowContainer;

    declare private _SafeStr_3103: IBitmapWrapperWindow;

    private _viewIndex: number = -1;
    private _SafeStr_2669: number = -1;
    private _highestAvailableQuestIndex: number = -1;
    private _maximumEntities: number = 42;

    declare private _SafeStr_2454: Timer;

    private _scrollOffset: number = 0;
    private _SafeStr_3528: number = 0;
    private _scrollBgStartOffset: number = 0;
    private _SafeStr_3257: number = -1;

    declare private _SafeStr_4340: number;
    static { (this.prototype as any)._SafeStr_4340 = 0; }

    private _SafeStr_5482: number = -1;
    private _SafeStr_5273: boolean = false;
    private _SafeStr_4811: boolean = false;

    declare private _SafeStr_3764: Timer;

    private _SafeStr_4006: number = -1;

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    private get firstVisibleIndex(): number {
        let _loc1_: number = this._viewIndex - 1;
        return _loc1_ < 0 ? 0 : _loc1_;
    }

    private get lastVisibleIndex(): number {
        let _loc2_: number = this._viewIndex + 7 + 1;
        let _loc1_: number = this._SafeStr_2669 - 1;
        return _loc2_ > _loc1_ ? _loc1_ : _loc2_;
    }

    private get firstBgIndex(): number {
        let _loc2_: number = this.getBackgroundSliceOffset(this._viewIndex);
        let _loc1_: number = this._SafeStr_2560.getImageIndexForOffset(_loc2_);
        return _loc1_ < 0 ? 0 : _loc1_;
    }

    private get lastBgIndex(): number {
        let _loc1_: number = this.getBackgroundSliceOffset(this._viewIndex);
        return this._SafeStr_2560.getImageIndexForOffset(_loc1_ + 640);
    }

    private get maxScrollRightIndex(): number {
        return this._maximumEntities - 7;
    }

    public dispose(): void {
        if (!this.disposed) {
            this._questEngine.removeUpdateReceiver(this);
            this.cleanUpEntityWindows();
            if (this._SafeStr_2560 != null) {
                this._SafeStr_2560.dispose();
                this._SafeStr_2560 = null;
            }
            if (this._SafeStr_3316 != null) {
                this._SafeStr_3316.dispose();
                this._SafeStr_3316 = null;
            }
            if (this._SafeStr_3332 != null) {
                this._SafeStr_3332.dispose();
                this._SafeStr_3332 = null;
            }
            if (this._SafeStr_2454 != null) {
                this._SafeStr_2454.stop();
                this._SafeStr_2454 = null;
            }
            if (this._SafeStr_3764 != null) {
                this._SafeStr_3764.stop();
                this._SafeStr_3764 = null;
            }
            this._backgroundImageCache = null;
            this._graphicEntityCache = null;
            this._states = null;
            this._SafeStr_4619 = null;
            this._bgAssetNameArray = null;
            this._questEngine = null;
        }
    }

    public onQuests(param1: any[]): void {
        let _loc4_: Date = new Date();
        this._SafeStr_4006 = _loc4_.getDate() | 0;
        let _loc2_: number = this._SafeStr_2669;
        this._quests = [];
        this._highestAvailableQuestIndex = 0;
        let _loc3_: QuestMessageData = null;
        for (_loc3_ of param1 ?? []) {
            if (this._questEngine.isSeasonalQuest(_loc3_)) {
                this._quests.push(_loc3_);
                if (this._highestAvailableQuestIndex < _loc3_.sortOrder - 1) {
                    this._highestAvailableQuestIndex = _loc3_.sortOrder - 1;
                }
            }
        }
        this._quests.sort((a, b) => (String(a.sortOrder) < String(b.sortOrder) ? -1 : String(a.sortOrder) > String(b.sortOrder) ? 1 : 0));
        this._maximumEntities = Number(this._questEngine.configuration.getProperty("seasonalQuestCalendar.maximum.entities")) | 0;
        this._SafeStr_2669 = Math.min(this._maximumEntities, this._highestAvailableQuestIndex + 1 + 2) | 0;
        if (_loc2_ != -1 && this._SafeStr_2669 > _loc2_) {
            this.prepareImages();
        }
    }

    public prepare(param1: IFrameWindow): void {
        let _loc2_: IBitmapWrapperWindow = null;
        this._SafeStr_6845 = this._SafeStr_2133.getCalendarImageGalleryHost();
        this._SafeStr_2175 = castGuarded(param1.findChildByName("calendar_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3103 = castGuarded(param1.findChildByName("background_slice"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        this._SafeStr_5918 = castGuarded(param1.findChildByName("entity_template"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_5918.visible = false;
        this._SafeStr_2560 = new CalendarBackgroundRenderer();
        this._SafeStr_3316 = new CalendarArrowButton(this._questEngine.assets, castGuarded(param1.findChildByName("button_left"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow"), 0, this.scrollArrowProcedure);
        this._SafeStr_3332 = new CalendarArrowButton(this._questEngine.assets, castGuarded(param1.findChildByName("button_right"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow"), 1, this.scrollArrowProcedure);
        _loc2_ = castGuarded(param1.findChildByName("stripe_mask_left"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = castTo(this._questEngine.assets.getAssetByName("stripe_mask_L").content, BitmapData);
        _loc2_ = castGuarded(param1.findChildByName("stripe_mask_right"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = castTo(this._questEngine.assets.getAssetByName("stripe_mask_R").content, BitmapData);
        if (this._viewIndex == -1) {
            this.goToDay(this._SafeStr_2133.currentDay);
        }
        this.prepareImages();
        let _loc3_: Date = new Date();
        this._SafeStr_4006 = _loc3_.getDate() | 0;
        this._SafeStr_3764 = new Timer(60000 * 5);
        this._SafeStr_3764.addEventListener("timer", this.onDateRefreshTimer);
        this._SafeStr_3764.start();
        this.onDateRefreshTimer(new TimerEvent("timer"));
        this._questEngine.registerUpdateReceiver(this, 1);
        this._SafeStr_2454 = new Timer(10, 10);
    }

    public close(): void {
        this.cleanUpEntityWindows();
        if (this._SafeStr_2560 != null) {
            this._SafeStr_2560.initializeImageChain([]);
        }
    }

    public refresh(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        for (const _loc3_ of this._quests ?? []) {
            _loc1_ = _loc3_.sortOrder - 1 | 0;
            _loc2_ = Number(_loc3_.completedCampaign ? 2 : this._states[_loc1_]) | 0;
            if (_loc2_ != this._states[_loc1_]) {
                this.retrieveEntityImageAsset(_loc3_.sortOrder | 0, _loc2_);
                this.updateEntityIndicatorPanel(_loc1_, false);
                if (_loc2_ == 2 && this._SafeStr_3257 == _loc1_) {
                    this.stopFlashing();
                }
            }
        }
        this.initializeBackgroundRendererIfAllImagesInCache();
        this.initializeEntitiesIfAllImagesInCache();
    }

    public goToDay(param1: number): void {
        this.scrollToIndex(Math.max(0, Math.min(param1 - 3, this.maxScrollRightIndex)) | 0);
    }

    public update(param1: number): void {
        let _loc5_: number = 0;
        let _loc4_: number = NaN;
        let _loc2_: IBorderWindow = null;
        let _loc3_: number = NaN;
        if (this._entityWindows != null && this._SafeStr_3257 != -1) {
            _loc5_ = CalendarEntityStateEnums.INDICATOR_COLOR[this._states[this._SafeStr_3257]] | 0;
            _loc4_ = this._SafeStr_4340 % 2000 / 2000;
            _loc4_ -= 1;
            _loc4_ = Math.abs(2 * (_loc4_ > 0.5 ? _loc4_ : _loc4_));
            _loc2_ = castGuarded(this._entityWindows[this._SafeStr_3257].findChildByName("entity_indicator"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
            if (_loc2_) {
                _loc3_ = _loc4_ * 100;
                if (this._SafeStr_5482 == this._SafeStr_3257) {
                    _loc3_ += 20;
                }
                _loc2_.color = Calendar.adjustBrightness(_loc5_ >>> 0, _loc3_ | 0);
            }
            this._SafeStr_4340 += param1;
        }
        if (this._SafeStr_2454 != null) {
            if (this._SafeStr_5273 && !this._SafeStr_2454.running && this._scrollOffset == 0) {
                if (this._viewIndex > 0 && !this._SafeStr_3316.isInactive()) {
                    this.scrollToIndex(this._viewIndex - 1);
                }
            }
            if (this._SafeStr_4811 && !this._SafeStr_2454.running && this._scrollOffset == 0) {
                if (this._viewIndex < this._highestAvailableQuestIndex && !this._SafeStr_3332.isInactive()) {
                    this.scrollToIndex(this._viewIndex + 1);
                }
            }
        }
    }

    private getImageGalleryHost(): string {
        return this._SafeStr_6845;
    }

    private prepareImages(): void {
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc2_: boolean = false;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc1_: number = Math.ceil(this._SafeStr_2669 / 7) + 1 | 0;
        this._bgAssetNameArray = new Array(_loc1_);
        this._backgroundImageCache = new Array<BitmapData>(_loc1_ >>> 0).fill(null);
        this._graphicEntityCache = new Array<BitmapData>(this._SafeStr_2669 >>> 0).fill(null);
        this._states = new Array(this._SafeStr_2669);
        let _loc8_: BitmapData[] = [];
        _loc6_ = 0;
        while (_loc6_ < _loc1_) {
            _loc8_.push(new BitmapData(640, 320, false, 16777215));
            _loc6_++;
        }
        this._SafeStr_2560.initializeImageChain(_loc8_);
        _loc4_ = this.firstBgIndex;
        while (_loc4_ <= this.lastBgIndex) {
            this.retrieveBackgroundImageAsset(_loc4_);
            _loc4_++;
        }
        this._SafeStr_4619 = new UtilsMap();
        for (const _loc9_ of this._quests ?? []) {
            if (_loc9_.sortOrder <= this._maximumEntities) {
                _loc7_ = _loc9_.completedCampaign ? 2 : 0;
                _loc2_ = _loc9_.sortOrder - 1 >= this.firstVisibleIndex && _loc9_.sortOrder - 1 <= this.lastVisibleIndex;
                this.retrieveEntityImageAsset(_loc9_.sortOrder | 0, _loc7_, !_loc2_);
            }
        }
        if (this._quests.length < this._SafeStr_2669) {
            _loc3_ = this._highestAvailableQuestIndex + 1;
            while (_loc3_ < this._SafeStr_2669) {
                this.retrieveEntityImageAsset(_loc3_ + 1, 1, _loc3_ > this.lastVisibleIndex);
                _loc3_++;
            }
        }
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_2669) {
            if (this._states[_loc5_] == null) {
                this.retrieveEntityImageAsset(_loc5_ + 1, 3, _loc5_ < this.firstVisibleIndex || _loc5_ > this.lastVisibleIndex);
            }
            _loc5_++;
        }
    }

    private initializeBackgroundRendererIfAllImagesInCache(): void {
        let _loc2_: number = 0;
        let _loc1_: BitmapData = null;
        if (!this.areViewableBackgroundBitmapsInitialized()) {
            return;
        }
        let _loc4_: any[] = [];
        let _loc5_: BitmapData[] = [];
        _loc2_ = 0;
        while (_loc2_ < this._backgroundImageCache.length) {
            _loc1_ = this._backgroundImageCache[_loc2_];
            if (_loc1_ != null) {
                _loc5_.push(_loc1_);
            } else {
                _loc5_.push(new BitmapData(640, 320, false, 16777215));
                _loc4_.push(_loc2_);
            }
            _loc2_++;
        }
        this._SafeStr_2560.initializeImageChain(_loc5_);
        this.assignCurrentBackgroundSlice();
        for (const _loc3_ of _loc4_ ?? []) {
            this.retrieveBackgroundImageAsset(_loc3_ | 0);
        }
    }

    private cleanUpEntityWindows(): void {
        if (this._entityWindows == null) {
            return;
        }
        for (const _loc1_ of this._entityWindows ?? []) {
            this._SafeStr_2175.removeChild(_loc1_);
            _loc1_.dispose();
        }
        this._entityWindows = null;
    }

    private initializeEntitiesIfAllImagesInCache(): void {
        let _loc8_: IWindowContainer = null;
        let _loc6_: number = 0;
        let _loc9_: IBitmapWrapperWindow = null;
        let _loc2_: IWindow = null;
        let _loc1_: IWindow = null;
        let _loc3_: IWindow = null;
        if (!this.areViewableEntityBitmapsInitialized()) {
            return;
        }
        this.cleanUpEntityWindows();
        if (this._entityWindows == null) {
            this._entityWindows = [];
        }
        let _loc5_: any[] = [];
        for (const _loc4_ of this._graphicEntityCache ?? []) {
            _loc8_ = castGuarded(this._SafeStr_5918.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc6_ = this._entityWindows.length | 0;
            if (_loc4_ != null) {
                _loc9_ = asGuarded(_loc8_.findChildByName("entity_bitmap"), isIBitmapWrapperWindow);
                _loc9_.width = _loc4_.width;
                _loc9_.height = _loc4_.height;
                _loc9_.bitmap = _loc4_.clone();
            } else {
                _loc5_.push(_loc6_);
            }
            _loc2_ = _loc8_.findChildByName("entity_mouse_region");
            _loc2_.procedure = this.entityMouseRegionWindowProcedure;
            if (this._states[_loc6_] == 1 || this._states[_loc6_] == 2 || this._states[_loc6_] == 3) {
                _loc2_.visible = false;
            }
            _loc8_.visible = true;
            this._SafeStr_2175.addChild(_loc8_);
            this._entityWindows.push(_loc8_);
            this.updateEntityIndicatorPanel(_loc6_, false);
        }
        this.repositionEntityWrappers();
        this.updateEntityVisibilities();
        _loc1_ = this._SafeStr_2175.findChildByName("stripe_mask_left");
        this._SafeStr_2175.setChildIndex(_loc1_, this._SafeStr_2175.numChildren - 1);
        _loc1_ = this._SafeStr_2175.findChildByName("stripe_mask_right");
        this._SafeStr_2175.setChildIndex(_loc1_, this._SafeStr_2175.numChildren - 1);
        _loc3_ = this._SafeStr_2175.findChildByName("button_left");
        this._SafeStr_2175.setChildIndex(_loc3_, this._SafeStr_2175.numChildren - 1);
        _loc3_ = this._SafeStr_2175.findChildByName("button_right");
        this._SafeStr_2175.setChildIndex(_loc3_, this._SafeStr_2175.numChildren - 1);
        for (const _loc7_ of _loc5_ ?? []) {
            this.retrieveEntityImageAsset(_loc7_ + 1 | 0, this._states[_loc7_] | 0);
        }
        if (this._states[this._SafeStr_2133.currentDay - 1] == 0) {
            this.startFlashingAtIndex(this._SafeStr_2133.currentDay - 1);
        }
    }

    private areViewableEntityBitmapsInitialized(): boolean {
        let _loc1_: number = 0;
        if (this._graphicEntityCache == null) {
            return false;
        }
        _loc1_ = this.firstVisibleIndex;
        while (_loc1_ <= this.lastVisibleIndex) {
            if (this._graphicEntityCache[_loc1_] == null) {
                return false;
            }
            _loc1_++;
        }
        return true;
    }

    private areViewableBackgroundBitmapsInitialized(): boolean {
        let _loc1_: number = 0;
        if (this._backgroundImageCache == null) {
            return false;
        }
        let _loc2_: number = this.getBackgroundSliceOffset(this._viewIndex);
        _loc1_ = this.firstBgIndex;
        while (_loc1_ <= this.lastBgIndex) {
            if (this._backgroundImageCache[_loc1_] == null) {
                return false;
            }
            _loc1_++;
        }
        return true;
    }

    private updateEntityIndicatorPanel(param1: number, param2: boolean): void {
        let _loc6_: BitmapData = null;
        let _loc7_: string = null;
        if (this._entityWindows == null || this._entityWindows.length < param1 - 1) {
            return;
        }
        let _loc3_: IBorderWindow = castGuarded(this._entityWindows[param1].findChildByName("entity_indicator"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        let _loc5_: number = CalendarEntityStateEnums.INDICATOR_COLOR[this._states[param1]] >>> 0;
        if (param2) {
            _loc5_ += 2105376;
        }
        if (this._SafeStr_3257 != param1) {
            _loc3_.color = _loc5_;
        }
        let _loc9_: IBitmapWrapperWindow = castGuarded(this._entityWindows[param1].findChildByName("entity_indicator_status"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        if (this._states[param1] == 2) {
            _loc6_ = castTo(this._questEngine.assets.getAssetByName("calendar_quest_complete").content, BitmapData);
            _loc9_.width = _loc6_.width;
            _loc9_.height = _loc6_.height;
            _loc9_.bitmap = _loc6_.clone();
        } else {
            _loc9_.bitmap = null;
        }
        let _loc4_: ITextWindow = asGuarded(_loc3_.findChildByName("entity_indicator_text"), isITextWindow);
        let _loc8_: QuestMessageData = this.getQuestByEntityWindowIndex(param1);
        if (_loc8_ != null) {
            _loc4_.text = this._questEngine.getCampaignName(_loc8_);
        } else {
            _loc7_ = QuestMessageData.getCampaignLocalizationKeyForCode(this._questEngine.getSeasonalCampaignCodePrefix() + "_" + (param1 + 1));
            _loc4_.text = this._questEngine.getCampaignNameByCode(_loc7_);
        }
    }

    private retrieveEntityImageAsset(param1: number, param2: number, param3: boolean = false): void {
        let _loc4_: string = "day" + param1;
        switch (param2) {
            case 0:
            case 1:
            case 3:
                _loc4_ += "_uncomplete";
                break;
            case 2:
                _loc4_ += "_completed";
        }
        this._states[param1 - 1] = param2;
        this._SafeStr_4619[_loc4_] = param1 - 1;
        let _loc5_: IAsset = this._questEngine.assets.getAssetByName(_loc4_);
        if (_loc5_ != null) {
            this.assignEntityBitmapToCacheByAssetName(_loc4_);
            this.initializeEntitiesIfAllImagesInCache();
        } else if (!param3) {
            this.loadAssetFromImageGallery(_loc4_, this.onEntityImageAssetDownloaded);
        }
    }

    private retrieveBackgroundImageAsset(param1: number): void {
        let _loc2_: string = "background_" + (param1 + 1);
        this._bgAssetNameArray[param1] = _loc2_;
        let _loc3_: IAsset = this._questEngine.assets.getAssetByName(_loc2_);
        if (_loc3_ != null) {
            this.assignBackgroundBitmapToCacheByAssetName(_loc2_);
            this.initializeBackgroundRendererIfAllImagesInCache();
        } else {
            this.loadAssetFromImageGallery(_loc2_, this.onBackgroundImageAssetDownloaded);
        }
    }

    private loadAssetFromImageGallery(param1: string, param2: (...args: any[]) => any): void {
        let _loc5_: string = this.getImageGalleryHost() + param1 + ".png";
        let _loc3_: URLRequest = new URLRequest(_loc5_);
        let _loc4_: AssetLoaderStruct = this._questEngine.assets.loadAssetFromFile(param1, _loc3_, "image/png");
        if (_loc4_ && !_loc4_.disposed) {
            _loc4_.addEventListener("AssetLoaderEventComplete", param2);
            _loc4_.addEventListener("AssetLoaderEventError", param2);
        }
    }

    private assignBackgroundBitmapToCacheByAssetName(param1: string): void {
        let _loc2_: number = this._bgAssetNameArray.indexOf(param1);
        if (_loc2_ == -1) {
            return;
        }
        let _loc3_: IAsset = this._questEngine.assets.getAssetByName(param1);
        this._backgroundImageCache[_loc2_] = _loc3_ != null ? asInstanceOf(_loc3_.content, BitmapData) : new BitmapData(640, 320);
    }

    private assignEntityBitmapToCacheByAssetName(param1: string): void {
        let _loc3_: IAsset = this._questEngine.assets.getAssetByName(param1);
        let _loc2_: number = this._SafeStr_4619[param1] | 0;
        if (_loc2_ == -1 || _loc2_ >= this._graphicEntityCache.length) {
            return;
        }
        this._graphicEntityCache[_loc2_] = _loc3_ != null ? asInstanceOf(_loc3_.content, BitmapData) : new BitmapData(1, 1, true, 0);
    }

    private repositionEntityWrappers(): void {
        let _loc1_: number = 0;
        if (this._entityWindows == null) {
            return;
        }
        _loc1_ = 0;
        while (_loc1_ < this._entityWindows.length) {
            this._entityWindows[_loc1_].x = (_loc1_ - this._viewIndex) * 80 + this._scrollOffset + 37;
            _loc1_++;
        }
    }

    private getBackgroundSliceOffset(param1: number): number {
        return param1 * 80;
    }

    private assignCurrentBackgroundSlice(): void {
        let _loc1_: BitmapData = this._SafeStr_2560.getSlice(this.getBackgroundSliceOffset(this._viewIndex), this._SafeStr_2175.width);
        this._SafeStr_3103.x = 0;
        this._SafeStr_3103.width = _loc1_.width;
        this._SafeStr_3103.height = _loc1_.height;
        this._SafeStr_3103.bitmap = _loc1_.clone();
    }

    private assignScrollableBackgroundSlice(param1: number): void {
        let _loc3_: BitmapData = null;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        if (param1 < this._viewIndex) {
            _loc5_ = this._viewIndex - param1;
            _loc4_ = this.getBackgroundSliceOffset(param1);
            _loc3_ = this._SafeStr_2560.getSlice(_loc4_, this._SafeStr_2175.width + 80 * _loc5_);
            this._scrollBgStartOffset = -(80 * _loc5_);
        } else {
            _loc2_ = param1 - this._viewIndex;
            _loc6_ = 80 * _loc2_ + this._SafeStr_2175.width;
            _loc3_ = this._SafeStr_2560.getSlice(this.getBackgroundSliceOffset(this._viewIndex), _loc6_);
            this._scrollBgStartOffset = 0;
        }
        this._SafeStr_3103.x = this._scrollBgStartOffset;
        if (_loc3_ != null) {
            this._SafeStr_3103.width = _loc3_.width;
            this._SafeStr_3103.height = _loc3_.height;
            this._SafeStr_3103.bitmap = _loc3_.clone();
        }
    }

    private repositionBackgroundSlice(): void {
        this._SafeStr_3103.x = this._scrollBgStartOffset + this._scrollOffset;
    }

    private scrollToIndex(param1: number): void {
        if (param1 < 0 || param1 >= this._SafeStr_2669) {
            return;
        }
        if (this._SafeStr_2454 != null && this._SafeStr_2454.running) {
            return;
        }
        if (!this.areViewableEntityBitmapsInitialized()) {
            this._viewIndex = param1;
            this.enableScrollArrowsByViewIndex();
            return;
        }
        let _loc2_: number = this._viewIndex;
        this._viewIndex = param1;
        if (this.areViewableBackgroundBitmapsInitialized()) {
            this._viewIndex = _loc2_;
            this.assignScrollableBackgroundSlice(param1);
            this.updateEntityVisibilities(true, param1 - this._viewIndex);
            this._SafeStr_3528 = -(80 * (param1 - this._viewIndex)) / 10 | 0;
            this._SafeStr_2454 = new Timer(10, 10);
            this._SafeStr_2454.addEventListener("timer", this.onAnimateScroll);
            this._SafeStr_2454.addEventListener("timerComplete", this.onAnimateScroll);
            this._SafeStr_2454.start();
        } else {
            this._viewIndex = _loc2_;
        }
    }

    private enableScrollArrowsByViewIndex(): void {
        if (this._viewIndex > 0) {
            this._SafeStr_3316.activate();
        } else {
            this._SafeStr_3316.deactivate();
        }
        if (this._viewIndex < Math.min(this._SafeStr_2669 - 3 - 1, this.maxScrollRightIndex)) {
            this._SafeStr_3332.activate();
        } else {
            this._SafeStr_3332.deactivate();
        }
    }

    private updateEntityVisibilities(param1: boolean = false, param2: number = 0): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        if (this._entityWindows != null) {
            _loc4_ = this._viewIndex - 1;
            if (param1 && param2 < 0) {
                _loc4_ += param2;
            }
            _loc3_ = this._viewIndex + 7 + 1;
            if (param1 && param2 > 0) {
                _loc3_ += param2;
            }
            _loc5_ = 0;
            while (_loc5_ < this._entityWindows.length) {
                if (_loc5_ < _loc4_ || _loc5_ > _loc3_) {
                    this._entityWindows[_loc5_].visible = false;
                } else {
                    this._entityWindows[_loc5_].visible = true;
                    if (_loc5_ == _loc4_ || _loc5_ == _loc3_) {
                        this._entityWindows[_loc5_].getChildByName("entity_mouse_region").visible = false;
                    } else if (this._states[_loc5_] == 0) {
                        this._entityWindows[_loc5_].getChildByName("entity_mouse_region").visible = true;
                    }
                }
                _loc5_++;
            }
        }
    }

    private scrollArrowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_DOWN") {
            switch (param2.name) {
                case "button_left":
                    this._SafeStr_5273 = true;
                    break;
                case "button_right":
                    this._SafeStr_4811 = true;
            }
        }
        if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            this._SafeStr_5273 = false;
            this._SafeStr_4811 = false;
        }
    };

    private entityMouseRegionWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        let _loc4_: QuestMessageData = null;
        if (param2.name == "entity_mouse_region") {
            _loc3_ = this._entityWindows.indexOf(asGuarded(param2.parent, isIWindowContainer));
            if (param1.type == "WME_CLICK") {
                _loc4_ = this.getQuestByEntityWindowIndex(_loc3_);
                if (_loc4_ != null) {
                    this._questEngine.questController.questDetails.openDetails(_loc4_, true);
                }
            }
            if (param1.type == "WME_OVER") {
                this.updateEntityIndicatorPanel(_loc3_, true);
                this._SafeStr_5482 = _loc3_;
            }
            if (param1.type == "WME_OUT") {
                this.updateEntityIndicatorPanel(_loc3_, false);
                this._SafeStr_5482 = -1;
            }
        }
    };

    private getQuestByEntityWindowIndex(param1: number): QuestMessageData {
        for (const _loc2_ of this._quests ?? []) {
            if (_loc2_.sortOrder - 1 == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private startFlashingAtIndex(param1: number): void {
        if (param1 < 0 || param1 >= this._SafeStr_2669) {
            return;
        }
        this._SafeStr_3257 = param1;
        this._SafeStr_4340 = 0;
    }

    private stopFlashing(): void {
        this._SafeStr_3257 = -1;
    }

    private onBackgroundImageAssetDownloaded = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc2_ != null) {
            this.assignBackgroundBitmapToCacheByAssetName(_loc2_.assetName);
        }
        this.initializeBackgroundRendererIfAllImagesInCache();
    };

    private onEntityImageAssetDownloaded = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc2_ != null) {
            this.assignEntityBitmapToCacheByAssetName(_loc2_.assetName);
        }
        this.initializeEntitiesIfAllImagesInCache();
    };

    private onAnimateScroll = (param1: TimerEvent): void => {
        switch (param1.type) {
            case "timer":
                this._scrollOffset += this._SafeStr_3528;
                this.repositionBackgroundSlice();
                this.repositionEntityWrappers();
                break;
            case "timerComplete":
                this._scrollOffset = 0;
                if (this._SafeStr_3528 > 0) {
                    this._viewIndex -= 1;
                } else {
                    this._viewIndex += 1;
                }
                this.assignCurrentBackgroundSlice();
                this.repositionEntityWrappers();
                this.enableScrollArrowsByViewIndex();
                this.updateEntityVisibilities();
                this._SafeStr_2454.removeEventListener("timer", this.onAnimateScroll);
                this._SafeStr_2454.removeEventListener("timerComplete", this.onAnimateScroll);
        }
    };

    private onDateRefreshTimer = (param1: TimerEvent): void => {
        let _loc2_: Date = new Date();
        if (this._SafeStr_4006 != _loc2_.getDate()) {
            this._questEngine.requestSeasonalQuests();
        }
        this._SafeStr_4006 = _loc2_.getDate() | 0;
    };

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
