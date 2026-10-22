import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { YoutubeDisplayPlaylist } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/YoutubeDisplayPlaylist';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Loader } from '@habbo-pixi/runtime/display/Loader';
import { LoaderInfo } from '@habbo-pixi/runtime/display/LoaderInfo';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurnitureYoutubeDisplayWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureYoutubeDisplayWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class YoutubeDisplayWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.video::YoutubeDisplayWidget'); }

    private static readonly _SafeStr_8242: number = 4291611903;
    private static readonly _SafeStr_7918: number = 4294967295;

    declare private _habboTracking: IHabboTracking;

    declare private _player: any;

    declare private _window: IWindowContainer;

    declare private _roomObject: IRoomObject;

    declare private _selectedItem: IWindowContainer;

    declare private _itemTemplate: IWindow;

    declare private _queuedVideoParams: any;

    declare private _SafeStr_4183: string;

    declare private _canControlPlayback: boolean;
    static { (this.prototype as any)._canControlPlayback = false; }

    private _SafeStr_4212: number = -1;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: IHabboTracking) {
        super(param1, param2, param3, param4);
        this._habboTracking = param5;
        this.ownHandler.widget = this;
    }

    private get ownHandler(): FurnitureYoutubeDisplayWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureYoutubeDisplayWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override get mainWindow(): IWindow {
        return this._window;
    }

    public show(param1: IRoomObject, param2: boolean): void {
        this._roomObject = param1;
        this._canControlPlayback = param2;
        this.createWindow(param2);
        this._window.visible = true;
    }

    private createWindow(param1: boolean): void {
        if (this._window != null) {
            return;
        }
        this._window = asGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("video_viewer_xml").content)), isIWindowContainer);
        if (param1) {
            this._itemTemplate = castGuarded(this._window.findChildByName("playlists"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        } else {
            this._window.findChildByName("right_pane").dispose();
            this._window.findChildByName("video_background").width = this._window.width - 20;
            this._window.findChildByName("video_background").setParamFlag(128);
            this._window.width -= 250;
        }
        this._window.procedure = this.windowProcedure;
        this._window.center();
    }

    private onPlayerLoaderInit(param1: Event): void {
        let _loc2_: Loader = null;
        if (this._window == null) {
            return;
        }
        let _loc3_: LoaderInfo = asInstanceOf(param1.target, LoaderInfo);
        if (_loc3_) {
            _loc2_ = _loc3_.loader;
            castGuarded(this._window.findChildByName("video_wrapper"), isIDisplayObjectWrapper, "com.sulake.core.window.components.IDisplayObjectWrapper").setDisplayObject(_loc2_);
            _loc2_.content.addEventListener("onReady", this.onPlayerReady);
            _loc2_.content.addEventListener("onStateChange", this.onPlayerStateChange);
            _loc2_.content.addEventListener("mouseUp", this.onVideoMouseEvent);
            _loc2_.content.addEventListener("mouseMove", this.onVideoMouseEvent);
        }
    }

    private onVideoMouseEvent = (param1: MouseEvent): void => {
        if (this._window != null && this._canControlPlayback) {
            castTo(param1.target, DisplayObject).stage.dispatchEvent(new MouseEvent(param1.type));
            if (this._player && param1.type == "mouseUp" && this._SafeStr_4183 != "") {
                if (this._player.getPlayerState() == 1) {
                    this.ownHandler.pauseVideo(this._roomObject.getId());
                } else if (this._player.getPlayerState() == 2) {
                    this.ownHandler.continueVideo(this._roomObject.getId());
                }
            }
        }
    };

    private onPlayerReady = (param1: Event): void => {
        let _loc2_: IWindow = null;
        this._player = param1.target;
        if (this._window != null) {
            _loc2_ = this._window.findChildByName("video_wrapper");
            this._player.setSize(_loc2_.width, _loc2_.height);
            if (this._queuedVideoParams != null) {
                this.loadVideo(this._queuedVideoParams);
                this._queuedVideoParams = null;
            }
        } else {
            this._player.destroy();
        }
    };

    private onPlayerStateChange = (param1: Event): void => {
        this._player = param1.target;
        if (this._window != null) {
            switch (this._player.getPlayerState()) {
                case -1:
                case 1:
                    if (this._SafeStr_4212 == 2) {
                        this._player.pauseVideo();
                    }
            }
        }
    };

    public hide(param1: IRoomObject): void {
        if (this._roomObject != param1) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._itemTemplate != null) {
            this._itemTemplate.dispose();
            this._itemTemplate = null;
        }
        if (this._player != null) {
            this._player.destroy();
            this._player = null;
        }
        if (this._SafeStr_4183 != null) {
            this._habboTracking.trackEventLog("YouTubeTVs", this._SafeStr_4183, "video.closed");
        }
        this._queuedVideoParams = null;
        this._selectedItem = null;
        this._roomObject = null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide(this._roomObject);
        this._habboTracking = null;
        super.dispose();
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: IWindow = null;
        let _loc6_: number = 0;
        let _loc3_: number = 0;
        let _loc8_: IWindow = null;
        let _loc9_: IItemListWindow = null;
        let _loc7_: number = 0;
        let _loc4_: IWindowContainer = null;
        switch (param1.type) {
            case "WME_CLICK":
                switch (param2.name) {
                    case "header_button_close":
                        this.hide(this._roomObject);
                        break;
                    case "playlist_prev":
                        this.ownHandler.switchToPreviousVideo(this._roomObject.getId());
                        break;
                    case "playlist_next":
                        this.ownHandler.switchToNextVideo(this._roomObject.getId());
                        break;
                    default:
                        if (isIRegionWindow(param2)) {
                            if (this._selectedItem != null) {
                                this._selectedItem.findChildByName("item_background").color = 4294967295;
                            }
                            if (this._selectedItem == param2) {
                                this._selectedItem = null;
                                this.ownHandler.selectPlaylist(this._roomObject.getId(), "");
                            } else {
                                this._selectedItem = isIWindowContainer(param2) ? param2 : null;
                                this._selectedItem.findChildByName("item_background").color = 4291611903;
                                this.ownHandler.selectPlaylist(this._roomObject.getId(), this._selectedItem.name);
                            }
                            this.updateButtons();
                        }
                }
                break;
            case "WE_RESIZE":
                switch (param2.name) {
                    case "video_viewer":
                        if (this._window != null) {
                            _loc5_ = this._window.findChildByName("right_pane");
                            if (_loc5_ != null) {
                                _loc6_ = this._window.width - 29;
                                _loc3_ = _loc6_ * 0.66 | 0;
                                _loc8_ = this._window.findChildByName("video_background");
                                _loc8_.width = _loc3_;
                                _loc5_.x = _loc8_.right + 9;
                                _loc5_.width = _loc6_ - _loc3_;
                            }
                        }
                        break;
                    case "playlists":
                        _loc9_ = isIItemListWindow(param2) ? param2 : null;
                        if (_loc9_ != null) {
                            _loc7_ = 0;
                            while (_loc7_ < _loc9_.numListItems) {
                                _loc4_ = asGuarded(_loc9_.getListItemAt(_loc7_ >>> 0), isIWindowContainer);
                                _loc4_.findChildByName("item_background").width = _loc9_.width;
                                _loc4_.findChildByName("item_contents").width = _loc9_.width;
                                _loc4_.findChildByName("item_description").width = _loc9_.width - 22;
                                _loc7_++;
                            }
                        }
                        break;
                    case "video_wrapper":
                        if (this._player != null) {
                            this._player.setSize(param2.width, param2.height);
                        }
                }
        }
    };

    public showVideo(param1: number, param2: string, param3: number, param4: number, param5: number): void {
        if (this._roomObject == null || this._roomObject.getId() != param1) {
            return;
        }
        let _loc6_: any = param3 > 0 || param4 > 0 ? { "videoId": param2, "startSeconds": param3, "endSeconds": param4, "suggestedQuality": "large" } : { "videoId": param2, "suggestedQuality": "large" };
        if (this._player != null) {
            this.loadVideo(_loc6_);
            this._queuedVideoParams = null;
        } else {
            this._queuedVideoParams = _loc6_;
        }
        this._SafeStr_4212 = param5;
    }

    public controlVideo(param1: number, param2: number): void {
        if (this._roomObject == null || this._roomObject.getId() != param1) {
            return;
        }
        if (this._window != null) {
            if (this._player) {
                switch (param2 - 1) {
                    case 0:
                        this._SafeStr_4212 = 1;
                        this._player.playVideo();
                        break;
                    case 1:
                        this._SafeStr_4212 = 2;
                        this._player.pauseVideo();
                }
            }
        }
    }

    private loadVideo(param1: any): void {
        this._SafeStr_4183 = stringOrNull(param1.videoId);
        let _loc2_: boolean = this._SafeStr_4183 != "";
        if (_loc2_) {
            this._player.loadVideoById(param1);
            this._habboTracking.trackEventLog("YouTubeTVs", this._SafeStr_4183, "video.started");
        } else {
            this._player.stopVideo();
        }
        if (this._window != null) {
            this._window.findChildByName("no_videos_label").visible = !_loc2_;
            this._window.findChildByName("video_wrapper").visible = _loc2_;
        }
    }

    public populatePlaylists(param1: number, param2: YoutubeDisplayPlaylist[], param3: string): void {
        let _loc4_: IWindowContainer = null;
        if (this._roomObject == null || this._roomObject.getId() != param1 || this._window == null || this._itemTemplate == null) {
            return;
        }
        let _loc6_: IItemListWindow = asGuarded(this._window.findChildByName("playlists"), isIItemListWindow);
        if (_loc6_ == null) {
            return;
        }
        _loc6_.destroyListItems();
        this._selectedItem = null;
        for (const _loc5_ of param2 ?? []) {
            _loc4_ = asGuarded(this._itemTemplate.clone(), isIWindowContainer);
            _loc4_.name = _loc5_.playlistId;
            _loc4_.findChildByName("item_background").width = _loc6_.width;
            if (_loc5_.playlistId == param3) {
                _loc4_.findChildByName("item_background").color = 4291611903;
                this._selectedItem = _loc4_;
            }
            _loc4_.findChildByName("item_contents").width = _loc6_.width;
            _loc4_.findChildByName("item_title").caption = _loc5_.title;
            _loc4_.findChildByName("item_description").caption = _loc5_.description.replace(/\r/g, "");
            _loc4_.findChildByName("item_description").width = _loc6_.width - 22;
            _loc6_.addListItem(_loc4_);
        }
        this.updateButtons();
    }

    private updateButtons(): void {
        if (this._window == null) {
            return;
        }
        if (this._selectedItem != null) {
            this._window.findChildByName("playlist_prev").enable();
            this._window.findChildByName("playlist_next").enable();
        } else {
            this._window.findChildByName("playlist_prev").disable();
            this._window.findChildByName("playlist_next").disable();
        }
    }
}
