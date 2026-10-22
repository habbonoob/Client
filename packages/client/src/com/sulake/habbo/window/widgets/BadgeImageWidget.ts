import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
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

export class BadgeImageWidget implements IBadgeImageWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::BadgeImageWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "badge_image";
    private static readonly _SafeStr_7616: string = "badge_image:type";
    private static readonly _SafeStr_8605: string = "badge_image:badge_id";

    private static get TYPE_DEFAULT(): PropertyStruct {
        BadgeImageWidget.#initStatics();
        return BadgeImageWidget.TYPE_DEFAULT;
    }

    private static get ID_DEFAULT(): PropertyStruct {
        BadgeImageWidget.#initStatics();
        return BadgeImageWidget.ID_DEFAULT;
    }

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

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _root: IWindowContainer;

    declare private _bitmap: IStaticBitmapWrapperWindow;

    declare private _SafeStr_2394: IRegionWindow;

    private _type: string = String(BadgeImageWidget.TYPE_DEFAULT.value);
    private _badgeId: string = String(BadgeImageWidget.ID_DEFAULT.value);

    declare private _SafeStr_4650: GroupDetailsChangedMessageEvent;

    declare private _SafeStr_3668: HabboGroupBadgesMessageEvent;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

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
        this._badgeId = param1;
        this.refresh();
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

    public get rotation(): number {
        return 0;
    }

    public set rotation(param1: number) {
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

    public dispose(): void {
        if (!this._disposed) {
            this.groupId = 0;
            if (this._SafeStr_2394 != null) {
                this._SafeStr_2394.removeEventListener("WME_CLICK", this.onClick);
                this._SafeStr_2394.dispose();
                this._SafeStr_2394 = null;
            }
            this._bitmap = null;
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

    public refresh(): void {
        if (this._SafeStr_4202) {
            return;
        }
        this._bitmap.assetUri = this.assetUri;
        this._bitmap.blend = this._SafeStr_2293.blend;
        this._bitmap.invalidate();
    }

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._groupId > 0) {
            this._windowManager.communication.connection.send(new GetHabboGroupDetailsMessageComposer(this._groupId, true));
        }
    };

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
