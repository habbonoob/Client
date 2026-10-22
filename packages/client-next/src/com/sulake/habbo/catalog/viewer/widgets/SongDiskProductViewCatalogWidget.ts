import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalog, ProductViewCatalogWidget } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { OfficialSongIdMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/OfficialSongIdMessageEvent';
import { GetOfficialSongIdMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetOfficialSongIdMessageComposer';

export class SongDiskProductViewCatalogWidget extends ProductViewCatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SongDiskProductViewCatalogWidget'); }

    declare private _soundManager: IHabboSoundManager;

    declare private _connection: IConnection;

    declare private _playPreviewContainer: IWindowContainer;

    declare private _SafeStr_3040: IButtonWindow;

    declare private _SafeStr_4698: IWindow;

    private _SafeStr_3028: number = -1;
    private _officialSongId: string = "";
    private _SafeStr_8458: string = "";
    private _officialSongIdListener: IMessageEvent = null;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1, param2);
        this._SafeStr_3040 = asGuarded(this._window.findChildByName("listen"), isIButtonWindow);
        this._SafeStr_4698 = this._window.findChildByName("ctlg_song_length");
        if (this._SafeStr_3040 != null) {
            this._SafeStr_3040.addEventListener("WME_CLICK", this.onClickPlay);
            this._SafeStr_3040.disable();
        }
        this._playPreviewContainer = asGuarded(this._window.findChildByName("playPreviewContainer"), isIWindowContainer);
        if (this._playPreviewContainer != null) {
            this._playPreviewContainer.visible = false;
        }
        this._soundManager = param2.soundManager;
        if (this._soundManager != null) {
            this._soundManager.events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
        }
        this._connection = param2.connection;
        if (this._connection && !this._officialSongIdListener) {
            this._officialSongIdListener = new OfficialSongIdMessageEvent(this.onOfficialSongIdMessageEvent);
            this._connection.addMessageEvent(this._officialSongIdListener);
        }
    }

    public override dispose(): void {
        if (this._SafeStr_3040 != null) {
            this._SafeStr_3040.removeEventListener("WME_CLICK", this.onClickPlay);
        }
        if (this._soundManager != null && this._soundManager.musicController != null) {
            this._soundManager.musicController.stop(3);
            if (this._soundManager.events != null) {
                this._soundManager.events.removeEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
            }
            this._soundManager = null;
            if (this._connection && this._officialSongIdListener) {
                this._connection.removeMessageEvent(this._officialSongIdListener);
                this._officialSongIdListener = null;
            }
            this._connection = null;
        }
        super.dispose();
    }

    public override closed(): void {
        super.closed();
        if (this._soundManager != null && this._soundManager.musicController != null) {
            this._soundManager.musicController.stop(3);
        }
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

    private onClickPlay = (param1: WindowMouseEvent): void => {
        if (this._soundManager != null && this._soundManager.musicController != null) {
            this.forceNoFadeoutOnPlayingSong(0);
            this.forceNoFadeoutOnPlayingSong(3);
            this._soundManager.musicController.playSong(this._SafeStr_3028, 3, 15, 40, 0.5, 2);
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
        let _loc2_: IProduct = param1.offer.product;
        if (_loc2_.extraParam.length > 0) {
            this._SafeStr_3028 = parseInt(_loc2_.extraParam) | 0;
            if (this._SafeStr_3028 == 0) {
                this._officialSongId = _loc2_.extraParam;
                if (this._connection) {
                    this._connection.send(new GetOfficialSongIdMessageComposer(this._officialSongId));
                }
            }
            if (this._playPreviewContainer != null) {
                this._playPreviewContainer.visible = true;
            }
        } else {
            this._SafeStr_3028 = -1;
        }
        this.updateView();
    };

    private updateView(): void {
        let _loc1_: number = 0;
        let _loc4_: number = 0;
        let _loc8_: string = null;
        let _loc6_: string = null;
        let _loc3_: IHabboLocalizationManager = null;
        let _loc7_: string = null;
        let _loc2_: boolean = false;
        let _loc5_: number = this.getSongLength();
        if (_loc5_ >= 0) {
            _loc1_ = _loc5_ / 60 | 0;
            _loc4_ = _loc5_ % 60;
            _loc8_ = "" + _loc1_;
            _loc6_ = "" + _loc4_;
            if (_loc4_ < 10) {
                _loc6_ = "0" + _loc6_;
            }
            _loc3_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).localization;
            _loc3_.registerParameter("catalog.song.length", "min", _loc8_);
            _loc7_ = _loc3_.registerParameter("catalog.song.length", "sec", _loc6_);
            _loc2_ = true;
            if (this._SafeStr_4698 != null) {
                this._SafeStr_4698.caption = _loc7_;
            }
        } else if (this._SafeStr_4698 != null) {
            this._SafeStr_4698.caption = "";
        }
        if (this._SafeStr_3040 != null) {
            if (_loc2_) {
                this._SafeStr_3040.enable();
            } else {
                this._SafeStr_3040.disable();
            }
        }
    }

    private getSongLength(): number {
        let _loc1_: ISongInfo = null;
        if (this._soundManager != null && this._soundManager.musicController != null) {
            _loc1_ = this._soundManager.musicController.getSongInfo(this._SafeStr_3028);
            if (_loc1_ != null) {
                return _loc1_.length / 1000 | 0;
            }
            this._soundManager.musicController.requestSongInfoWithoutSamples(this._SafeStr_3028);
        }
        return -1;
    }

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        if (param1.id == this._SafeStr_3028) {
            this.updateView();
        }
    };

    private onOfficialSongIdMessageEvent = (param1: OfficialSongIdMessageEvent): void => {
        if (param1.getParser().officialSongId == this._officialSongId) {
            this._SafeStr_3028 = param1.getParser().songId;
            this.updateView();
        }
    };
}
