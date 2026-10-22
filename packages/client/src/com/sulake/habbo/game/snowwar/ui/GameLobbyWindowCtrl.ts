import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import type { GamesMainViewController } from '@/com/sulake/habbo/game/snowwar/ui/GamesMainViewController';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Game2LeaveGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2LeaveGameMessageComposer';
import { HabboGamesCom, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarAnimatedWindowElement } from '@/com/sulake/habbo/game/snowwar/utils/SnowWarAnimatedWindowElement';

export class GameLobbyWindowCtrl implements IDisposable, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::GameLobbyWindowCtrl'); }

    constructor(param1: GamesMainViewController, param2: string, param3: number, param4: number) {
        this._SafeStr_2276 = param1;
        this._gameEngine = param1.gameEngine;
        this._SafeStr_3169 = new UtilsMap();
        this._SafeStr_2891 = new UtilsMap();
        this._levelName = param2;
        this._numberOfTeams = param3;
        this._numberOfPlayers = this.numberOfPlayers;
        this._maxNumberOfPlayers = param4;
    }

    declare private _SafeStr_2276: GamesMainViewController;

    declare private _gameEngine: SnowWarEngine;

    declare private _SafeStr_2492: IWindowContainer;

    declare private _SafeStr_3433: Timer;

    private _counter: number = -1;
    private _queuePosition: number = -1;
    private _disposed: boolean = false;

    declare private _SafeStr_3169: UtilsMap;

    declare private _SafeStr_2891: UtilsMap;

    declare private _levelName: string;

    public get levelName(): string {
        return this._levelName;
    }

    public set levelName(param1: string) {
        this._levelName = param1;
    }

    declare private _numberOfTeams: number;
    static { (this.prototype as any)._numberOfTeams = 0; }

    public get numberOfTeams(): number {
        return this._numberOfTeams;
    }

    public set numberOfTeams(param1: number) {
        this._numberOfTeams = param1;
    }

    declare private _numberOfPlayers: number;
    static { (this.prototype as any)._numberOfPlayers = 0; }

    public get numberOfPlayers(): number {
        return this._numberOfPlayers;
    }

    public set numberOfPlayers(param1: number) {
        this._numberOfPlayers = param1;
    }

    declare private _maxNumberOfPlayers: number;
    static { (this.prototype as any)._maxNumberOfPlayers = 0; }

    public get maxNumberOfPlayers(): number {
        return this._maxNumberOfPlayers;
    }

    public set maxNumberOfPlayers(param1: number) {
        this._maxNumberOfPlayers = param1;
    }

    public get visible(): boolean {
        if (this._SafeStr_2492) {
            return this._SafeStr_2492.visible;
        }
        return false;
    }

    public set visible(param1: boolean) {
        if (!this._SafeStr_2492) {
            this.createLobbyView();
        }
        this._SafeStr_2492.visible = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set queuePosition(param1: number) {
        this._queuePosition = param1;
    }

    public set counter(param1: number) {
        this._counter = param1;
    }

    public onClose(param1: boolean): void {
        if (param1) {
            this._gameEngine.communication.connection.send(new Game2LeaveGameMessageComposer());
        }
        this.disposeCountdownTimer();
        this._queuePosition = -1;
    }

    public dispose(): void {
        this._disposed = true;
        if (this._SafeStr_2891) {
            for (const _loc1_ of valuesOf(this._SafeStr_2891)) {
                _loc1_.dispose();
            }
            this._SafeStr_2891.dispose();
            this._SafeStr_2891 = null;
        }
        if (this._SafeStr_2492 != null) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
        this.disposeCountdownTimer();
        if (this._SafeStr_3169) {
            this._SafeStr_3169.dispose();
            this._SafeStr_3169 = null;
        }
        this._queuePosition = -1;
    }

    public playerLeft(param1: number): void {
        this._SafeStr_3169.remove(param1);
        this.updateDialog(true);
    }

    public playerJoined(param1: GameLobbyPlayerData): void {
        if (param1) {
            this._SafeStr_3169.add(param1.userId, param1);
            this.updateDialog(true, param1.figure);
        }
    }

    public clearPlayerList(): void {
        this._SafeStr_3169.reset();
    }

    public startCountdown(param1: number): void {
        this.disposeCountdownTimer();
        this._counter = param1;
        this._SafeStr_3433 = new Timer(1000, param1);
        this._SafeStr_3433.addEventListener("timer", this.onTick);
        this._SafeStr_3433.start();
        this.updateDialog(false);
    }

    public stopCountdown(): void {
        this.disposeCountdownTimer();
        this.updateDialog(false);
    }

    public avatarImageReady(param1: string): void {
        this.updateDialog(true, param1);
    }

    private createLobbyView(): void {
        let _loc1_: any = null;
        let _loc3_: number = 0;
        this._SafeStr_2492 = asGuarded(this._SafeStr_2276.rootWindow.findChildByName("snowwar_lobby_cont"), isIWindowContainer);
        this._SafeStr_2492.center();
        this._SafeStr_2492.findChildByName("cancel_link_region").procedure = this.onCancel;
        let _loc2_: IItemGridWindow = asGuarded(this._SafeStr_2492.findChildByName("players_grid"), isIItemGridWindow);
        let _loc4_: IWindowContainer = asGuarded(WindowUtils.createWindow("snowwar_lobby_player"), isIWindowContainer);
        _loc3_ = 0;
        while (_loc3_ < this._maxNumberOfPlayers) {
            _loc2_.addGridItem(_loc4_.clone());
            _loc3_++;
        }
        _loc4_.dispose();
        this._SafeStr_2492.visible = false;
    }

    private createWindow(param1: string): IWindowContainer {
        let _loc2_: XmlAsset = asInstanceOf(this._gameEngine.assets.getAssetByName(param1), XmlAsset);
        return asGuarded(this._gameEngine.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
    }

    private onCancel = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.onClose(true);
        if (!this._gameEngine.gameCenterEnabled) {
            this._SafeStr_2276.openMainWindow(true);
        } else {
            this._SafeStr_2276.close(true);
        }
    };

    private disposeCountdownTimer(): void {
        if (this._SafeStr_3433 != null) {
            this._SafeStr_3433.removeEventListener("timer", this.onTick);
            this._SafeStr_3433.stop();
            this._SafeStr_3433 = null;
        }
        this._counter = -1;
    }

    private updateDialog(param1: boolean, param2: string = null): void {
        let _loc16_: string = null;
        let _loc13_: any = null;
        let _loc9_: IRegionWindow = null;
        let _loc8_: IBitmapWrapperWindow = null;
        let _loc15_: SnowWarAnimatedWindowElement = null;
        let _loc10_: IAvatarImage = null;
        let _loc4_: BitmapData = null;
        let _loc6_: Point = null;
        let _loc14_: IWindow = asGuarded(this._SafeStr_2492.findChildByName("wait_text"), isITextWindow);
        let _loc5_: IWindow = asGuarded(this._SafeStr_2492.findChildByName("wait_text_stroke"), isITextWindow);
        let _loc3_: IHabboLocalizationManager = this._gameEngine.localization;
        if (this._counter >= 0) {
            _loc16_ = "snowwar.lobby_game_start_countdown";
            _loc3_.registerParameter(_loc16_, "seconds", String(this._counter));
            _loc13_ = _loc16_ + " " + "%seconds%" + " " + this._counter;
        } else if (this._queuePosition >= 0) {
            _loc16_ = "snowwar.lobby_arena_queue_position";
            _loc3_.registerParameter(_loc16_, "position", String(this._queuePosition));
            _loc13_ = _loc16_ + " " + "%position%" + " " + this._queuePosition;
        } else {
            _loc13_ = _loc16_ = "snowwar.lobby_waiting_for_more_players";
        }
        let _loc11_: string = _loc3_.getLocalization(_loc16_);
        if (_loc11_) {
            _loc14_.caption = _loc11_;
            _loc5_.caption = _loc11_;
        } else {
            _loc14_.caption = stringOrNull(_loc13_);
            _loc5_.caption = stringOrNull(_loc13_);
        }
        let _loc7_: number = 0;
        let _loc12_: IItemGridWindow = asGuarded(this._SafeStr_2492.findChildByName("players_grid"), isIItemGridWindow);
        if (param1) {
            for (const _loc17_ of this._SafeStr_3169.getValues() ?? []) {
                _loc10_ = null;
                if (_loc17_.figure == param2 || !param2) {
                    _loc10_ = this._gameEngine.avatarManager.createAvatarImage(stringOrNull(_loc17_.figure), "h", stringOrNull(_loc17_.gender), this);
                }
                if (_loc10_) {
                    _loc10_.setDirection("head", 2);
                    _loc4_ = _loc10_.getCroppedImage("head");
                    _loc9_ = asGuarded(_loc12_.getGridItemAt(_loc7_ >>> 0), isIRegionWindow);
                    if (_loc9_) {
                        _loc9_.toolTipCaption = stringOrNull(_loc17_.name);
                        _loc9_.mouseThreshold = 0;
                        _loc8_ = asGuarded(_loc9_.findChildByName("image"), isIBitmapWrapperWindow);
                        _loc15_ = this._SafeStr_2891.remove(_loc8_);
                        if (_loc15_) {
                            _loc15_.dispose();
                        }
                        if (_loc8_.bitmap) {
                            _loc8_.bitmap.dispose();
                        }
                        _loc8_.bitmap = new BitmapData(_loc8_.width, _loc8_.height, true, 0);
                        _loc6_ = new Point((_loc8_.width - _loc4_.width) / 2, (_loc8_.height - _loc4_.height) / 2);
                        _loc8_.bitmap.copyPixels(_loc4_, _loc4_.rect, _loc6_);
                    }
                    _loc4_.dispose();
                    _loc10_.dispose();
                }
                _loc7_++;
            }
            while (_loc7_ < this.maxNumberOfPlayers) {
                _loc9_ = asGuarded(_loc12_.getGridItemAt(_loc7_ >>> 0), isIRegionWindow);
                _loc8_ = asGuarded(_loc9_.findChildByName("image"), isIBitmapWrapperWindow);
                if (!this._SafeStr_2891.hasKey(_loc8_)) {
                    _loc15_ = new SnowWarAnimatedWindowElement(this._gameEngine.assets, _loc8_, "load_", 8);
                    this._SafeStr_2891.add(_loc8_, _loc15_);
                }
                _loc7_++;
            }
        }
    }

    private onTick = (param1: TimerEvent): void => {
        if (this._disposed) {
            return;
        }
        if (this._counter && this._counter > 0) {
            this._counter = this._counter - 1;
            HabboGamesCom.log("on tick " + this._counter);
            this.updateDialog(false);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
