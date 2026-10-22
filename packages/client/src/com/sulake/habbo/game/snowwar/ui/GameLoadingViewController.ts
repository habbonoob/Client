import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { GameLobbyData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyData';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Game2ExitGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/arena/Game2ExitGameMessageComposer';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';
import { BackgroundViewController, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarAnimatedWindowElement } from '@/com/sulake/habbo/game/snowwar/utils/SnowWarAnimatedWindowElement';

export class GameLoadingViewController implements IDisposable, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::GameLoadingViewController'); }

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
        this._SafeStr_2891 = new UtilsMap();
        this.createMainWindow();
        this._SafeStr_3852 = new BackgroundViewController(this._gameEngine);
        this._SafeStr_3852.background.visible = true;
        this._gameEngine.windowManager.getDesktop(1).visible = false;
        this._gameEngine.roomUI.visible = false;
    }

    declare private _gameEngine: SnowWarEngine;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2891: UtilsMap;

    declare private _lobbyData: GameLobbyData;

    declare private _SafeStr_3852: BackgroundViewController;

    private _avatarFigures: any[] = [];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._gameEngine.windowManager.getDesktop(1).visible = true;
        this._gameEngine = null;
        if (this._SafeStr_2891) {
            for (const _loc1_ of valuesOf(this._SafeStr_2891)) {
                _loc1_.dispose();
            }
            this._SafeStr_2891.dispose();
            this._SafeStr_2891 = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_3852) {
            this._SafeStr_3852.dispose();
            this._SafeStr_3852 = null;
        }
        this._disposed = true;
        this._avatarFigures = [];
    }

    public show(param1: GameLobbyData): void {
        this._lobbyData = param1;
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("arenaPreview"), isIBitmapWrapperWindow);
        let _loc3_: IAsset = this._gameEngine.assets.getAssetByName("arena_" + param1.fieldType + "_preview");
        if (_loc3_) {
            _loc2_.bitmap = asInstanceOf(_loc3_.content, BitmapData);
            _loc2_.disposesBitmap = false;
        }
        WindowUtils.setCaption(this._window.findChildByName("arenaName"), this._gameEngine.getArenaName(param1));
        this.renderPlayers();
    }

    public avatarImageReady(param1: string): void {
        if (this._avatarFigures.indexOf(param1) == -1) {
            this.renderPlayers();
            this._avatarFigures.push(param1);
        }
    }

    public showReadyPlayers(param1: any[]): void {
        let _loc3_: SnowWarAnimatedWindowElement = null;
        for (const _loc2_ of param1 ?? []) {
            _loc3_ = this._SafeStr_2891.remove(_loc2_);
            if (_loc3_) {
                _loc3_.dispose();
            }
        }
        if (this._SafeStr_2891.length == 0) {
            this._SafeStr_2891.add(-1, new SnowWarAnimatedWindowElement(this._gameEngine.assets, asGuarded(this._window.findChildByName("mainLoadingIcon"), isIBitmapWrapperWindow), "load_", 8));
            WindowUtils.setCaption(this._window.findChildByName("loadingText"), "${snowwar.loading_arena}");
        }
    }

    private createMainWindow(): void {
        this._window = asGuarded(WindowUtils.createWindow("snowwar_ending"), isIWindowContainer);
        this._window.x = (this._window.desktop.width - this._window.width) / 2 | 0;
        this._window.y = this._window.desktop.height > 685 ? 115 : 10;
        WindowUtils.setCaption(this._window.findChildByName("endingInformation"), "${snowwar.loading.title}");
        WindowUtils.hideElement(this._window, "buttonsContainer");
        WindowUtils.hideElement(this._window, "mostKillsContainer");
        WindowUtils.hideElement(this._window, "mostHitsContainer");
        WindowUtils.hideElement(this._window, "team1Score");
        WindowUtils.hideElement(this._window, "team2Score");
        WindowUtils.hideElement(this._window, "statusContainer");
        this._window.findChildByName("loadingContainer").visible = true;
        this._window.findChildByName("leave_link_region").procedure = this.onCancel;
    }

    private onCancel = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.onClose();
    };

    private onClose(): void {
        if (this._gameEngine != null) {
            this._gameEngine.gameCancelled(true);
            this._gameEngine.send(new Game2ExitGameMessageComposer());
            if (this._gameEngine.roomBeforeGame > -1) {
                this._gameEngine.send(new GetGuestRoomMessageComposer(this._gameEngine.roomBeforeGame, false, true));
            }
            this._gameEngine.disposeLoadingView();
        }
    }

    private renderPlayers(): void {
        this.clearPlayers();
        for (const _loc1_ of valuesOf(this._lobbyData.players.sort(GameLobbyPlayerData._SafeStr_5887))) {
            this.addPlayer(_loc1_);
        }
    }

    private clearPlayers(): void {
        let _loc2_: IItemListWindow = null;
        let _loc1_: number = 1;
        while (true) {
            _loc2_ = asGuarded(this._window.findChildByName("team" + _loc1_++ + "PlayersList"), isIItemListWindow);
            if (_loc2_ == null) {
                break;
            }
            _loc2_.destroyListItems();
        }
    }

    private addPlayer(param1: GameLobbyPlayerData): void {
        let _loc12_: number = 0;
        let _loc5_: number = param1.teamId;
        let _loc8_: IItemListWindow = asGuarded(this._window.findChildByName("team" + _loc5_ + "PlayersList"), isIItemListWindow);
        let _loc7_: IItemListWindow = asGuarded(WindowUtils.createWindow("snowwar_results_player_team_" + _loc5_), isIItemListWindow);
        let _loc9_: IWindowContainer = asGuarded(_loc7_.getListItemByName("playerImageContainer"), isIWindowContainer);
        let _loc6_: IWindowContainer = asGuarded(_loc7_.getListItemByName("playerDataContainer"), isIWindowContainer);
        let _loc2_: IWindowContainer = asGuarded(_loc7_.getListItemByName("playerScoreContainer"), isIWindowContainer);
        if (param1.userId == this._gameEngine.sessionDataManager.userId) {
            WindowUtils.setElementImage(_loc9_.findChildByName("playerImageBackground"), this.getBitmap("green_square"));
        }
        switch (_loc5_ - 1) {
            case 1:
                _loc12_ = 4;
                break;
            default:
                _loc12_ = 2;
        }
        WindowUtils.setElementImage(this.getElement(_loc9_, "playerImage"), this.getAvatarFigure(param1.teamId, param1.figure, param1.gender, _loc12_));
        WindowUtils.setCaption(this.getElement(_loc6_, "playerName"), param1.name);
        WindowUtils.hideElement(_loc6_, "playerStats");
        WindowUtils.hideElement(_loc2_, "playerScore");
        WindowUtils.hideElement(_loc6_, "playerTotalStats");
        let _loc10_: IBitmapWrapperWindow = asGuarded(_loc6_.findChildByName("skillLevel"), isIBitmapWrapperWindow);
        if (_loc10_.bitmap) {
            _loc10_.bitmap.dispose();
        }
        _loc10_.bitmap = this.getSkillLevelImage(param1.skillLevel, param1.teamId);
        let _loc3_: IRegionWindow = asGuarded(_loc6_.findChildByName("scoreTooltip"), isIRegionWindow);
        _loc3_.toolTipCaption = param1.totalScore.toString() + "/" + param1.scoreToNextLevel.toString();
        _loc3_.visible = true;
        _loc8_.addListItem(_loc7_);
        let _loc4_: IBitmapWrapperWindow = asGuarded(_loc2_.findChildByName("loadingIcon"), isIBitmapWrapperWindow);
        let _loc11_: SnowWarAnimatedWindowElement = this._SafeStr_2891.remove(param1.userId);
        if (_loc11_) {
            _loc11_.dispose();
        }
        _loc11_ = new SnowWarAnimatedWindowElement(this._gameEngine.assets, _loc4_, "load_", 8);
        this._SafeStr_2891.add(param1.userId, _loc11_);
        _loc4_.visible = true;
    }

    private getSkillLevelImage(param1: number, param2: number): BitmapData {
        let _loc6_: BitmapData = null;
        let _loc8_: number = 0;
        let _loc7_: Point = null;
        param1 = Math.min(param1, 30) | 0;
        let _loc3_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_empty").content, BitmapData);
        let _loc11_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_filled_bronze").content, BitmapData);
        let _loc9_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_filled_silver").content, BitmapData);
        let _loc10_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_filled_gold").content, BitmapData);
        let _loc5_: number = param1 > 0 ? (param1 - 1) % 10 + 1 : 0;
        let _loc4_: BitmapData = new BitmapData(150, 13, true, 0);
        _loc8_ = 0;
        while (_loc8_ < 10) {
            _loc7_ = param2 == 1 ? new Point(_loc8_ * 15, 0) : new Point((9 - _loc8_) * 15, 0);
            _loc6_ = param1 > 20 ? (_loc5_-- > 0 ? _loc10_ : _loc3_) : (param1 > 10 ? (_loc5_-- > 0 ? _loc9_ : _loc3_) : (_loc5_-- > 0 ? _loc11_ : _loc3_));
            _loc4_.copyPixels(_loc6_, _loc6_.rect, _loc7_);
            _loc8_++;
        }
        return _loc4_;
    }

    private getElement(param1: IWindowContainer, param2: string): IWindow {
        return param1.findChildByName(param2);
    }

    private getBitmap(param1: string): BitmapData {
        return asInstanceOf(this._gameEngine.assets.getAssetByName(param1).content, BitmapData);
    }

    private getAvatarFigure(param1: number, param2: string, param3: string, param4: number): BitmapData {
        let _loc5_: IAvatarFigureContainer = this._gameEngine.avatarManager.createFigureContainer(param2);
        switch (param1 - 1) {
            case 0:
                _loc5_.updatePart("ch", 20000, [1]);
                break;
            case 1:
                _loc5_.updatePart("ch", 20001, [1]);
                break;
            default:
                _loc5_.updatePart("ch", 20000, [1]);
        }
        _loc5_.removePart("cc");
        let _loc6_: IAvatarImage = this._gameEngine.avatarManager.createAvatarImage(_loc5_.getFigureString(), "h_50", param3, this);
        if (_loc6_) {
            _loc6_.setDirection("full", param4);
            return _loc6_.getCroppedImage("full");
        }
        return null;
    }

    get [IDisposable](): true {
        return true;
    }
}
