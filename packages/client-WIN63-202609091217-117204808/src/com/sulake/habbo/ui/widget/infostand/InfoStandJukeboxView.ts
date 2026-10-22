import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { RoomWidgetSongUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSongUpdateEvent';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { InfoStandFurniView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandFurniView';

export class InfoStandJukeboxView extends InfoStandFurniView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandJukeboxView'); }

    declare private _SafeStr_4873: number;

    declare private _songName: string;

    declare private _songAuthor: string;

    constructor(param1: InfoStandWidget, param2: string, param3: IHabboCatalog) {
        super(param1, param2, param3);
    }

    public override dispose(): void {
        super.dispose();
    }

    protected override createWindow(param1: string): void {
        let _loc2_: IWindow = null;
        let _loc7_: number = 0;
        let _loc5_: BitmapData = null;
        let _loc10_: BitmapDataAsset = null;
        let _loc4_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("jukebox_view"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        this._buttons = asGuarded(this._window.getListItemByName("button_list"), isIItemListWindow);
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        }
        this._window.name = param1;
        this._widget.mainContainer.addChild(this._window);
        let _loc3_: IWindow = this._border.findChildByTag("close");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onClose);
        }
        if (this._buttons != null) {
            _loc7_ = 0;
            while (_loc7_ < this._buttons.numListItems) {
                _loc2_ = this._buttons.getListItemAt(_loc7_ >>> 0);
                _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
                _loc7_++;
            }
        }
        this._SafeStr_2445 = this._border.findChildByTag("catalog");
        if (this._SafeStr_2445 != null) {
            this._SafeStr_2445.addEventListener("WME_CLICK", this.onCatalogButtonClicked);
        }
        this._SafeStr_2457 = this._border.findChildByName("rent_button");
        if (this._SafeStr_2457 != null) {
            this._SafeStr_2457.addEventListener("WME_CLICK", this.onRentButtonClicked);
        }
        this._SafeStr_2436 = this._border.findChildByName("extend_button");
        if (this._SafeStr_2436 != null) {
            this._SafeStr_2436.addEventListener("WME_CLICK", this.onExtendButtonClicked);
        }
        this._SafeStr_2432 = this._border.findChildByName("buyout_button");
        if (this._SafeStr_2432 != null) {
            this._SafeStr_2432.addEventListener("WME_CLICK", this.onBuyoutButtonClicked);
        }
        let _loc6_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("icon_disc"), isIBitmapWrapperWindow);
        if (_loc6_ != null) {
            _loc10_ = asInstanceOf(this._widget.assets.getAssetByName("jb_icon_disc"), BitmapDataAsset);
            _loc5_ = asInstanceOf(_loc10_.content, BitmapData);
            _loc6_.bitmap = _loc5_.clone();
        }
        let _loc9_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("icon_composer"), isIBitmapWrapperWindow);
        if (_loc9_ != null) {
            _loc10_ = asInstanceOf(this._widget.assets.getAssetByName("jb_icon_composer"), BitmapDataAsset);
            _loc5_ = asInstanceOf(_loc10_.content, BitmapData);
            _loc9_.bitmap = _loc5_.clone();
        }
        let _loc8_: IRegionWindow = asGuarded(this._SafeStr_2212.getListItemByName("owner_region"), isIRegionWindow);
        if (_loc8_ != null) {
            _loc8_.addEventListener("WME_CLICK", this.onOwnerRegion);
            _loc8_.addEventListener("WME_OVER", this.onOwnerRegion);
            _loc8_.addEventListener("WME_OUT", this.onOwnerRegion);
        }
    }

    private set nowPlayingTrackName(param1: string) {
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("trackname_container"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(_loc2_.getChildByName("track_name_text"), isITextWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.text = param1;
        _loc3_.visible = true;
        _loc3_.height = _loc3_.textHeight + 5 | 0;
    }

    private set nowPlayingAuthorName(param1: string) {
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("creatorname_container"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(_loc2_.getChildByName("track_creator_text"), isITextWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.text = param1;
        _loc3_.visible = true;
        _loc3_.height = _loc3_.textHeight + 5 | 0;
    }

    public updateSongInfo(param1: RoomWidgetSongUpdateEvent): void {
        if (param1.type == "RWSUE_PLAYING_CHANGED") {
            this._SafeStr_4873 = param1.songId;
        }
        if (param1.songId == this._SafeStr_4873) {
            this._songName = param1.songName;
            this._songAuthor = param1.songAuthor;
            this.updateNowPlaying(this._SafeStr_4873 >= 0);
        }
    }

    private updateNowPlaying(param1: boolean): void {
        let _loc2_: string = null;
        let _loc3_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("now_playing_text"), isITextWindow);
        if (_loc3_ != null) {
            if (param1) {
                _loc2_ = this._widget.localizations.getLocalization("infostand.jukebox.text.now.playing");
            } else {
                _loc2_ = this._widget.localizations.getLocalization("infostand.jukebox.text.not.playing");
            }
            _loc3_.text = _loc2_;
        }
        if (param1) {
            this.nowPlayingTrackName = this._songName;
            this.nowPlayingAuthorName = this._songAuthor;
        } else {
            this.nowPlayingTrackName = "";
            this.nowPlayingAuthorName = "";
        }
        this.updateWindow();
    }

    protected override initInstanceFields(): void {
        this._SafeStr_4873 = -1;
        this._songName = "";
        this._songAuthor = "";
        super.initInstanceFields();
    }
}
