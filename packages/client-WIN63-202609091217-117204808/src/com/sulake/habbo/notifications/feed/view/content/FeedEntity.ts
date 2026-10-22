import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { NotificationController } from '@/com/sulake/habbo/notifications/feed/NotificationController';
import type { IFeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/IFeedEntity';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class FeedEntity implements IFeedEntity {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.content::FeedEntity'); }

    public static _SafeStr_4237: IWindowContainer;
    public static _SafeStr_5408: IHabboLocalizationManager;
    public static ASSETS: IAssetLibrary;
    public static FEED_CONTROLLER: NotificationController;
    protected static readonly LIST: string = "content_list";
    protected static readonly TITLE: string = "title";
    protected static readonly MESSAGE: string = "message";
    protected static readonly TIME: string = "time";
    protected static readonly ICON: string = "icon";
    protected static readonly DECORATION: string = "decoration";
    protected static readonly ACTION_BUTTON: string = "action_button";
    protected static readonly UNIT_MINUTES: string = "minutes";
    protected static readonly UNIT_HOURS: string = "hours";
    protected static readonly _SafeStr_8237: string = "days";
    private static readonly BUTTON_HEIGHT: number = 25;
    private static readonly _SafeStr_3935: FeedEntity[] = [];

    declare protected _window: IWindowContainer;

    protected _disposed: boolean = false;
    protected _recycled: boolean = false;
    protected _id: number = -1;

    declare protected _minutesElapsed: number;
    static { (this.prototype as any)._minutesElapsed = 0; }

    declare protected _iconFilePath: string;

    declare protected _decorationFilePath: string;

    declare protected _buttonAction: string;

    constructor() {
        this._window = asGuarded(FeedEntity._SafeStr_4237.clone(), isIWindowContainer);
    }

    public static assignHandles(param1: IHabboWindowManager, param2: IAssetLibrary, param3: IHabboLocalizationManager, param4: NotificationController): void {
        FeedEntity._SafeStr_4237 = asGuarded(param1.buildFromXML(asInstanceOf(param2.getAssetByName("feed_entity_xml").content, XML)), isIWindowContainer);
        FeedEntity.ASSETS = param2;
        FeedEntity._SafeStr_5408 = param3;
        FeedEntity.FEED_CONTROLLER = param4;
    }

    public static removeHandles(): void {
        if (FeedEntity._SafeStr_4237) {
            FeedEntity._SafeStr_4237.dispose();
            FeedEntity._SafeStr_4237 = null;
        }
        FeedEntity.ASSETS = null;
        FeedEntity._SafeStr_5408 = null;
        FeedEntity.FEED_CONTROLLER = null;
    }

    public static allocate(): FeedEntity {
        let _loc1_: FeedEntity = FeedEntity._SafeStr_3935.length > 0 ? FeedEntity._SafeStr_3935.pop() : new FeedEntity();
        _loc1_._recycled = false;
        return _loc1_;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get id(): number {
        return this._id;
    }

    public set title(param1: string) {
        this._window.findChildByName("title").caption = param1 ? param1 : "";
    }

    public get title(): string {
        return this._window ? this._window.findChildByName("title").caption : null;
    }

    public set message(param1: string) {
        this._window.findChildByName("message").caption = param1 ? param1 : "";
    }

    public get message(): string {
        return this._window ? this._window.findChildByName("message").caption : null;
    }

    public setButton(param1: string, param2: string): void {
        if (!this._window) {
            return;
        }
        this._buttonAction = param1;
        let _loc3_: IButtonWindow = asGuarded(this._window.findChildByName("action_button"), isIButtonWindow);
        if (this._buttonAction == null) {
            _loc3_.height = 0;
        } else {
            _loc3_.height = 25;
            _loc3_.caption = param2;
            _loc3_.addEventListener("WME_CLICK", this.onActionButton);
        }
    }

    public set iconFilePath(param1: string) {
        let _loc2_: IAsset = null;
        if (!param1) {
            return;
        }
        if (param1 != this._iconFilePath) {
            this._iconFilePath = param1;
            _loc2_ = FeedEntity.ASSETS.getAssetByName(param1);
            if (_loc2_) {
                this.icon = asInstanceOf(_loc2_.content, BitmapData);
            } else {
                this.loadImageUrl(param1);
            }
        }
    }

    public set decorationFilePath(param1: string) {
        let _loc2_: IAsset = null;
        if (!param1) {
            return;
        }
        if (param1 != this._decorationFilePath) {
            this._decorationFilePath = param1;
            _loc2_ = FeedEntity.ASSETS.getAssetByName(param1);
            if (_loc2_) {
                this.decoration = asInstanceOf(_loc2_.content, BitmapData);
            } else {
                this.loadImageUrl(param1);
            }
        }
    }

    public set icon(param1: BitmapData) {
        if (this.disposed || !this._window) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("icon"), isIBitmapWrapperWindow);
        this.updateImage(_loc2_, param1);
        this._iconFilePath = null;
    }

    public set decoration(param1: BitmapData) {
        if (this.disposed || !this._window) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("decoration"), isIBitmapWrapperWindow);
        this.updateImage(_loc2_, param1);
        this._decorationFilePath = null;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get recycled(): boolean {
        return this._recycled;
    }

    public set minutesElapsed(param1: number) {
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName("time"), isITextWindow);
        if (param1 < 0) {
            _loc4_.height = 0;
            return;
        }
        this._minutesElapsed = param1;
        let _loc3_: string = "minutes";
        if (this._minutesElapsed >= 1440) {
            _loc3_ = "days";
            param1 = param1 / 1440 | 0;
        } else if (this._minutesElapsed >= 60) {
            _loc3_ = "hours";
            param1 = param1 / 60 | 0;
        }
        let _loc2_: ILocalization = FeedEntity._SafeStr_5408.getLocalizationRaw("friendbar.stream." + _loc3_ + ".ago");
        _loc4_.caption = _loc2_ ? _loc2_.raw.replace("%value%", String(param1)) : "...?";
    }

    public get minutesElapsed(): number {
        return this._minutesElapsed;
    }

    public updateContainerSize(): void {
        if (!this._window || this.disposed) {
            return;
        }
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName("content_list"), isIItemListWindow);
        let _loc1_: IWindow = asGuarded(_loc2_.getListItemAt(_loc2_.numListItems - 1 >>> 0), isIWindow);
        _loc2_.height = _loc1_ ? _loc1_.y + _loc1_.height : 0;
    }

    public recycle(): void {
        if (!this._recycled) {
            if (!this._disposed) {
                this._window.parent = null;
                castGuarded(this._window.findChildByName("decoration"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow").bitmap = null;
                castGuarded(this._window.findChildByName("icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow").bitmap = null;
                (asGuarded(this._window.findChildByName("action_button"), isIButtonWindow)).removeEventListener("WME_CLICK", this.onActionButton);
                this._decorationFilePath = null;
                this._recycled = true;
                FeedEntity._SafeStr_3935.push(this);
            }
        }
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
            if (this._recycled) {
                FeedEntity._SafeStr_3935.splice(FeedEntity._SafeStr_3935.indexOf(this), 1);
                this._recycled = false;
            }
            this._disposed = true;
        }
    }

    protected onActionButton = (param1: WindowMouseEvent): void => {
        FeedEntity.FEED_CONTROLLER.executeAction(this._buttonAction);
    };

    private updateImage(param1: IBitmapWrapperWindow, param2: BitmapData): void {
        if (param2 == null) {
            param1.bitmap = null;
            param1.height = 0;
            return;
        }
        let _loc4_: number = param1.x + param1.width / 2;
        let _loc3_: number = param1.y + param1.height / 2;
        param1.bitmap = param2;
        param1.x = _loc4_ - param2.width / 2 | 0;
        param1.y = _loc3_ - param2.height / 2 | 0;
        param1.width = param2.width;
        param1.height = param2.height;
    }

    private loadImageUrl(param1: string): void {
        let _loc2_: AssetLoaderStruct = FeedEntity.ASSETS.loadAssetFromFile(param1, new URLRequest(param1));
        _loc2_.addEventListener("AssetLoaderEventComplete", this.onImageFileLoaded);
        _loc2_.addEventListener("AssetLoaderEventError", this.onImageFileLoaded);
    }

    private onImageFileLoaded = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = null;
        let _loc3_: IAsset = null;
        if (param1.type == "AssetLoaderEventComplete") {
            _loc2_ = asInstanceOf(param1.target, AssetLoaderStruct);
            if (_loc2_.assetName == this._decorationFilePath) {
                _loc3_ = FeedEntity.ASSETS.getAssetByName(this._decorationFilePath);
                if (_loc3_) {
                    this.decoration = asInstanceOf(_loc3_.content, BitmapData);
                }
            } else if (_loc2_.assetName == this._iconFilePath) {
                _loc3_ = FeedEntity.ASSETS.getAssetByName(this._iconFilePath);
                if (_loc3_) {
                    this.icon = asInstanceOf(_loc3_.content, BitmapData);
                }
            }
            this.updateContainerSize();
        }
    };
}
