import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetReceiver } from '@/com/sulake/core/assets/IAssetReceiver';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { GroupDetailsChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GroupDetailsChangedMessageEvent';
import { HabboGroupBadgesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupBadgesMessageEvent';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { BadgeImageType } from '@/com/sulake/habbo/window/enum/BadgeImageType';
import { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class BadgeImageWidget implements IBadgeImageWidget, IAssetReceiver {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::BadgeImageWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "badge_image";
    private static readonly _SafeStr_7616: string = "badge_image:type";
    private static readonly _SafeStr_8605: string = "badge_image:badge_id";
    private static readonly NO_GLOW_COLOR: number = -1;
    private static readonly GLOW_DURATION_MS: number = 1000;
    private static readonly GLOW_TIMER_DELAY_MS: number = 16;
    private static readonly PENDING_GLOW_MAX_WAIT_MS: number = 5000;
    private static readonly _SafeStr_14254: number = 0.7;
    private static readonly INNER_GLOW_MAX_ALPHA: number = 0.22;
    private static readonly COLOR_MATRIX_MIX_MAX: number = 0.48;
    private static readonly COLOR_MATRIX_OFFSET_MAX: number = 80;

    private static get TYPE_DEFAULT(): PropertyStruct {
        BadgeImageWidget.#initStatics();
        return BadgeImageWidget.TYPE_DEFAULT;
    }

    private static get ID_DEFAULT(): PropertyStruct {
        BadgeImageWidget.#initStatics();
        return BadgeImageWidget.ID_DEFAULT;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _root: IWindowContainer;

    declare private _bitmap: IStaticBitmapWrapperWindow;

    declare private _SafeStr_2394: IRegionWindow;

    private _type: string = String(BadgeImageWidget.TYPE_DEFAULT.value);
    private _badgeId: string = String(BadgeImageWidget.ID_DEFAULT.value);

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    private _glowColor: number = -1;

    declare private _SafeStr_4650: GroupDetailsChangedMessageEvent;

    declare private _SafeStr_3668: HabboGroupBadgesMessageEvent;

    declare private _SafeStr_14255: Timer;

    declare private _SafeStr_14256: boolean;
    static { (this.prototype as any)._SafeStr_14256 = false; }

    declare private _glowRestoreFilters: any[];

    declare private _SafeStr_14257: Timer;

    declare private _pendingGlowAssetUri: string;

    private _pendingGlowColor: number = -1;
    private _SafeStr_14258: number = 1000;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("badge_image_xml").content, XML)), isIWindowContainer);
        this._bitmap = asGuarded(this._root.findChildByName("bitmap"), isIStaticBitmapWrapperWindow);
        this._SafeStr_2394 = asGuarded(this._root.findChildByName("region"), isIRegionWindow);
        this._SafeStr_2394.addEventListener("WME_CLICK", this.onClick);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    private static easeInOutCubic(param1: number, param2: number, param3: number, param4: number): number {
        let _loc5_: number = param1 / param4;
        let _loc6_: number = -(_loc5_ * 1.75 - 0.7) * (_loc5_ * 1.75 - 0.7) + 1;
        return param2 + param3 * _loc6_;
    }

    private static clamp01(param1: number): number {
        if (param1 < 0) {
            return 0;
        }
        if (param1 > 1) {
            return 1;
        }
        return param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.clearGlow();
            this.groupId = 0;
            if (this._SafeStr_2394 != null) {
                this._SafeStr_2394.removeEventListener("WME_CLICK", this.onClick);
                this._SafeStr_2394.dispose();
                this._SafeStr_2394 = null;
            }
            this._bitmap = null;
            this._glowRestoreFilters = null;
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc2_: any[] = [];
        if (this._disposed) {
            return _loc2_;
        }
        _loc2_.push(BadgeImageWidget.TYPE_DEFAULT.withValue(this._type));
        _loc2_.push(BadgeImageWidget.ID_DEFAULT.withValue(this._badgeId));
        for (const _loc1_ of this._bitmap.properties ?? []) {
            if (_loc1_.key != "asset_uri") {
                _loc2_.push(_loc1_.withNameSpace("badge_image"));
            }
        }
        return _loc2_;
    }

    public set properties(param1: any[]) {
        this._SafeStr_4202 = true;
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "badge_image:type":
                    this.type = String(_loc2_.value);
                    break;
                case "badge_image:badge_id":
                    this.badgeId = String(_loc2_.value);
            }
            if (_loc2_.key != "badge_image:asset_uri") {
                _loc3_.push(_loc2_.withoutNameSpace());
            }
        }
        this._bitmap.properties = _loc3_;
        this._SafeStr_4202 = false;
        this.refresh();
    }

    public get type(): string {
        return this._type;
    }

    public set type(param1: string) {
        this._type = param1;
        this.refresh();
    }

    public get badgeId(): string {
        return this._badgeId;
    }

    public set badgeId(param1: string) {
        if (this._badgeId != param1) {
            this.clearGlow();
            this._glowColor = -1;
        }
        this._badgeId = param1;
        this.refresh();
    }

    public get groupId(): number {
        return this._groupId;
    }

    public set groupId(param1: number) {
        this._groupId = param1;
        let _loc2_: boolean = this._type == "group" && this._groupId > 0;
        if (this._windowManager != null && this._windowManager.communication != null) {
            if (!_loc2_ && this._SafeStr_3668 != null) {
                this._windowManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_4650);
                this._windowManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_3668);
                this._SafeStr_4650 = null;
                this._SafeStr_3668 = null;
            } else if (_loc2_ && this._SafeStr_3668 == null) {
                this._SafeStr_4650 = new GroupDetailsChangedMessageEvent(this.onGroupDetailsChanged);
                this._SafeStr_3668 = new HabboGroupBadgesMessageEvent(this.onHabboGroupBadges);
                this._windowManager.communication.addHabboConnectionMessageEvent(this._SafeStr_4650);
                this._windowManager.communication.addHabboConnectionMessageEvent(this._SafeStr_3668);
            }
        }
    }

    public get glowColor(): number {
        return this._glowColor;
    }

    public set glowColor(param1: number) {
        this._glowColor = param1;
        if (this._glowColor < 0 && (this._SafeStr_14256 || this._pendingGlowAssetUri != null)) {
            this.clearGlow();
        }
    }

    public get bitmapData(): BitmapData {
        return this._bitmap.bitmapData;
    }

    public get pivotPoint(): number {
        return this._bitmap.pivotPoint;
    }

    public set pivotPoint(param1: number) {
        this._bitmap.pivotPoint = param1;
        this._bitmap.invalidate();
    }

    public get stretchedX(): boolean {
        return this._bitmap.stretchedX;
    }

    public set stretchedX(param1: boolean) {
        this._bitmap.stretchedX = param1;
        this._bitmap.invalidate();
    }

    public get stretchedY(): boolean {
        return this._bitmap.stretchedY;
    }

    public set stretchedY(param1: boolean) {
        this._bitmap.stretchedY = param1;
        this._bitmap.invalidate();
    }

    public get zoomX(): number {
        return this._bitmap.zoomX;
    }

    public set zoomX(param1: number) {
        this._bitmap.zoomX = param1;
        this._bitmap.invalidate();
    }

    public get zoomY(): number {
        return this._bitmap.zoomY;
    }

    public set zoomY(param1: number) {
        this._bitmap.zoomY = param1;
        this._bitmap.invalidate();
    }

    public get greyscale(): boolean {
        return this._bitmap.greyscale;
    }

    public set greyscale(param1: boolean) {
        this._bitmap.greyscale = param1;
        this._bitmap.invalidate();
    }

    public get etchingColor(): number {
        return this._bitmap.etchingColor;
    }

    public set etchingColor(param1: number) {
        this._bitmap.etchingColor = param1;
        this._bitmap.invalidate();
    }

    public get fitSizeToContents(): boolean {
        return this._bitmap.fitSizeToContents;
    }

    public set fitSizeToContents(param1: boolean) {
        this._bitmap.fitSizeToContents = param1;
        this._bitmap.invalidate();
    }

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._groupId > 0) {
            this._windowManager.communication.connection.send(new GetHabboGroupDetailsMessageComposer(this._groupId, true));
        }
    };

    public refresh(): void {
        if (this._SafeStr_4202) {
            return;
        }
        let _loc1_: string = this.assetUri;
        if (this._pendingGlowAssetUri != null && this._pendingGlowAssetUri != _loc1_) {
            this.cancelPendingGlow();
        }
        this._bitmap.assetUri = _loc1_;
        this._bitmap.blend = this._SafeStr_2293.blend;
        this._bitmap.invalidate();
    }

    public playGlow(param1: number, param2: number = 500, param3: number = 1.04): void {
        if (this._disposed || this._bitmap == null || this._SafeStr_2293 == null) {
            return;
        }
        this._glowColor = param1 & 0xFFFFFF;
        if (param2 <= 0) {
            param2 = 1000;
        }
        this.clearGlow();
        let _loc4_: string = this.assetUri;
        if (_loc4_ == null || _loc4_.length == 0 || this._windowManager == null || this._windowManager.resourceManager == null) {
            return;
        }
        this._pendingGlowAssetUri = _loc4_;
        this._pendingGlowColor = this._glowColor;
        this._SafeStr_14258 = param2;
        this._SafeStr_14257 = new Timer(5000, 1);
        this._SafeStr_14257.addEventListener("timerComplete", this.onPendingGlowTimeout);
        this._SafeStr_14257.start();
        this._windowManager.resourceManager.retrieveAsset(this._pendingGlowAssetUri, this);
    }

    public clearGlow(): void {
        this.cancelPendingGlow();
        if (this._SafeStr_14255 != null) {
            this._SafeStr_14255.stop();
            this._SafeStr_14255.removeEventListener("timer", this.onGlowTick);
            this._SafeStr_14255.removeEventListener("timerComplete", this.onGlowComplete);
            this._SafeStr_14255 = null;
        }
        if (!this._SafeStr_14256) {
            return;
        }
        if (this._SafeStr_2293 != null) {
            this._SafeStr_2293.filters = this._glowRestoreFilters ?? [];
        }
        this.refresh();
        this._SafeStr_14256 = false;
    }

    public receiveAsset(param1: IAsset, param2: string): void {
        if (this._disposed || this._pendingGlowAssetUri == null || this._windowManager == null || this._windowManager.resourceManager == null) {
            return;
        }
        if (!this._windowManager.resourceManager.isSameAsset(this._pendingGlowAssetUri, param2)) {
            return;
        }
        if (this._bitmap == null || this._bitmap.assetUri != this._pendingGlowAssetUri || this._bitmap.bitmapData == null) {
            return;
        }
        let _loc3_: number = this._pendingGlowColor;
        let _loc4_: number = this._SafeStr_14258;
        this.cancelPendingGlow();
        this.startGlowAnimation(_loc3_ >>> 0, _loc4_);
    }

    private get assetUri(): string {
        let _loc1_: string = "";
        if (this._badgeId != null && this._badgeId.length > 0) {
            switch (this._type) {
                case "normal":
                    _loc1_ = "${image.library.url}album1584/" + this._badgeId + ".png";
                    break;
                case "group":
                    _loc1_ = this._windowManager.getProperty("group.badge.url").replace("%imagerdata%", this._badgeId);
                    break;
                case "perk":
                    _loc1_ = "${image.library.url}perk/" + this._badgeId + ".png";
            }
        }
        return _loc1_;
    }

    private forceRefresh(param1: number, param2: string): void {
        if (param1 != this._groupId) {
            return;
        }
        this._badgeId = param2;
        this._windowManager.resourceManager.removeAsset(this.assetUri);
        this.refresh();
    }

    private onGroupDetailsChanged = (param1: GroupDetailsChangedMessageEvent): void => {
        this.forceRefresh(param1.groupId, this._badgeId);
    };

    private onHabboGroupBadges = (param1: HabboGroupBadgesMessageEvent): void => {
        if (param1.badges.hasKey(this._groupId)) {
            this.forceRefresh(this._groupId, stringOrNull(param1.badges[this._groupId]));
        }
    };

    private applyGlowStrength(param1: number): void {
        if (this._SafeStr_2293 == null) {
            return;
        }
        param1 = BadgeImageWidget.clamp01(param1);
        let _loc2_: any[] = this._glowRestoreFilters != null ? this._glowRestoreFilters.concat() : [];
        if (param1 > 0.001 && this._glowColor >= 0) {
            _loc2_.push(this.createOuterGlowFilter(this._glowColor >>> 0, param1));
            _loc2_.push(this.createInnerGlowFilter(this._glowColor >>> 0, param1));
            _loc2_.push(this.createColorTintFilter(this._glowColor >>> 0, param1));
        }
        this._SafeStr_2293.filters = _loc2_;
    }

    private startGlowAnimation(param1: number, param2: number): void {
        this._glowColor = param1 & 0xFFFFFF;
        this._glowRestoreFilters = this._SafeStr_2293.filters != null ? this._SafeStr_2293.filters.concat() : [];
        this._SafeStr_14256 = true;
        this.applyGlowStrength(0);
        let _loc3_: number = Math.max(1, param2 / 16 | 0) | 0;
        this._SafeStr_14255 = new Timer(16, _loc3_);
        this._SafeStr_14255.addEventListener("timer", this.onGlowTick);
        this._SafeStr_14255.addEventListener("timerComplete", this.onGlowComplete);
        this._SafeStr_14255.start();
    }

    private cancelPendingGlow(): void {
        if (this._SafeStr_14257 != null) {
            this._SafeStr_14257.stop();
            this._SafeStr_14257.removeEventListener("timerComplete", this.onPendingGlowTimeout);
            this._SafeStr_14257 = null;
        }
        this._pendingGlowAssetUri = null;
        this._pendingGlowColor = -1;
        this._SafeStr_14258 = 1000;
    }

    private createOuterGlowFilter(param1: number, param2: number): GlowFilter {
        return new GlowFilter(param1, 0.7 * param2, 4 + param2 * 4, 4 + param2 * 4, 1 + param2 * 1.2, 2, false, false);
    }

    private createInnerGlowFilter(param1: number, param2: number): GlowFilter {
        return new GlowFilter(param1, 0.22 * param2, 2 + param2 * 2, 2 + param2 * 2, 0.8 + param2 * 0.6, 1, true, false);
    }

    private createColorTintFilter(param1: number, param2: number): ColorMatrixFilter {
        let _loc3_: number = (param1 >> 16 & 0xFF) / 255;
        let _loc4_: number = (param1 >> 8 & 0xFF) / 255;
        let _loc5_: number = (param1 & 0xFF) / 255;
        let _loc8_: number = 0.48 * param2;
        let _loc7_: number = _loc8_ * 0.05;
        let _loc6_: number = 80 * param2;
        return new ColorMatrixFilter([1 - _loc8_ + _loc8_ * _loc3_, _loc7_ * _loc4_, _loc7_ * _loc5_, 0, _loc3_ * _loc6_, _loc7_ * _loc3_, 1 - _loc8_ + _loc8_ * _loc4_, _loc7_ * _loc5_, 0, _loc4_ * _loc6_, _loc7_ * _loc3_, _loc7_ * _loc4_, 1 - _loc8_ + _loc8_ * _loc5_, 0, _loc5_ * _loc6_, 0, 0, 0, 1, 0]);
    }

    private onGlowTick = (param1: TimerEvent): void => {
        if (this._SafeStr_14255 == null) {
            return;
        }
        let _loc2_: number = BadgeImageWidget.easeInOutCubic(this._SafeStr_14255.currentCount, 0, 1, this._SafeStr_14255.repeatCount);
        this.applyGlowStrength(_loc2_);
    };

    private onGlowComplete = (param1: TimerEvent): void => {
        this.clearGlow();
    };

    private onPendingGlowTimeout = (param1: TimerEvent): void => {
        this.cancelPendingGlow();
    };

    public get etchingPoint(): Point {
        return new Point(0, 1);
    }

    public get wrapX(): boolean {
        return false;
    }

    public set wrapX(param1: boolean) {
    }

    public get wrapY(): boolean {
        return false;
    }

    public set wrapY(param1: boolean) {
    }

    public get flipX(): boolean {
        return this._bitmap.flipX;
    }

    public set flipX(param1: boolean) {
        this._bitmap.flipX = param1;
        this._bitmap.invalidate();
    }

    public get flipY(): boolean {
        return this._bitmap.flipY;
    }

    public set flipY(param1: boolean) {
        this._bitmap.flipY = param1;
        this._bitmap.invalidate();
    }

    public get rotation(): number {
        return 0;
    }

    public set rotation(param1: number) {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BadgeImageWidget.#staticsReady) return;
        BadgeImageWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BadgeImageWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("TYPE_DEFAULT", null);
        set("ID_DEFAULT", null);
        set("TYPE_DEFAULT", new PropertyStruct("badge_image:type", "normal", "String", false, BadgeImageType.ALL));
        set("ID_DEFAULT", new PropertyStruct("badge_image:badge_id", "", "String"));
    }

    get [IBadgeImageWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IBitmapDataContainer](): true {
        return true;
    }
}
