import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { TradeOpenFailedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeOpenFailedEvent';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { ITradingModel } from '@/com/sulake/habbo/inventory/trading/ITradingModel';
import type { TradingModel } from '@/com/sulake/habbo/inventory/trading/TradingModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectibleGroupedItem } from '@/com/sulake/habbo/inventory/collectibles/CollectibleGroupedItem';
import { ItemPopupCtrl } from '@/com/sulake/habbo/inventory/ItemPopupCtrl';
import { CreditTradingItem } from '@/com/sulake/habbo/inventory/items/CreditTradingItem';
import { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { Util } from '@/com/sulake/habbo/inventory/Util';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class TradingView implements IInventoryView, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading::TradingView'); }

    private static readonly COLOR_LOCKED: number = 4284532064;
    private static readonly COLOR_UNLOCKED: number = 2577770;
    public static readonly ALERT_SCAM: number = 0;
    public static readonly ALERT_OTHER_CANCELLED: number = 1;
    public static readonly ALERT_ALREADY_OPEN: number = 2;
    private static readonly TRADE_UI_SPACING: number = 7;

    declare private _tradingModel: TradingModel;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _roomEngine: IRoomEngine;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _SafeStr_3399: ItemPopupCtrl;

    declare private _soundManager: IHabboSoundManager;

    private _disposed: boolean = false;

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    declare private _SafeStr_2186: IWindowContainer;

    declare private _windowMin: IWindowContainer;

    declare private _SafeStr_2458: Timer;

    declare private _SafeStr_3340: GroupItem;

    declare private _SafeStr_2596: boolean;
    static { (this.prototype as any)._SafeStr_2596 = false; }

    private _waitingSongInfo: any[] = [];

    constructor(param1: TradingModel, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IRoomEngine, param5: IHabboLocalizationManager, param6: IHabboSoundManager) {
        this._tradingModel = param1;
        this._windowManager = param2;
        this._localization = param5;
        this._SafeStr_3052 = param3;
        this._roomEngine = param4;
        this._soundManager = param6;
        this._visible = false;
        let _loc8_: IAsset = this._SafeStr_3052.getAssetByName("item_popup_xml");
        let _loc7_: XmlAsset = castTo(_loc8_, XmlAsset);
        let _loc9_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc7_.content, XML)), isIWindowContainer);
        _loc9_.visible = false;
        this._SafeStr_3399 = new ItemPopupCtrl(_loc9_, this._SafeStr_3052, this._windowManager, this._tradingModel.getInventory());
        this._soundManager.events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
    }

    public static updateItemsGrid(param1: IItemGridWindow, param2: UtilsMap, param3: UtilsMap = null): void {
        let _loc4_: GroupItem = null;
        let _loc8_: CollectibleGroupedItem = null;
        let _loc7_: IWindowContainer = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        while (_loc6_ < param2.length) {
            _loc4_ = asInstanceOf(param2.getWithIndex(_loc6_ | 0), GroupItem);
            _loc7_ = asGuarded(param1.getGridItemAt(_loc6_), isIWindowContainer);
            if (_loc7_) {
                _loc7_.id = _loc6_ | 0;
                while (_loc7_.numChildren > 0) {
                    _loc7_.removeChildAt(0);
                }
                _loc7_.addChild(TradingView.fixItemWindow(_loc4_.window));
                _loc4_.window.id = _loc6_ | 0;
                _loc4_.removeIntervalProcedure();
            }
            _loc6_++;
        }
        if (param3 != null) {
            _loc5_ = _loc6_ | 0;
            while (_loc6_ < _loc5_ + param3.length) {
                _loc8_ = asInstanceOf(param3.getWithIndex(_loc6_ - _loc5_), CollectibleGroupedItem);
                _loc7_ = asGuarded(param1.getGridItemAt(_loc6_), isIWindowContainer);
                if (_loc7_) {
                    _loc7_.id = _loc6_ | 0;
                    while (_loc7_.numChildren > 0) {
                        _loc7_.removeChildAt(0);
                    }
                    _loc7_.addChild(TradingView.fixItemWindow(_loc8_.window));
                    _loc8_.window.id = _loc6_ | 0;
                    _loc8_.removeIntervalProcedure();
                }
                _loc6_++;
            }
        }
        while (_loc6_ < param1.numGridItems) {
            _loc7_ = asGuarded(param1.getGridItemAt(_loc6_), isIWindowContainer);
            if (_loc7_) {
                _loc7_.id = _loc6_ | 0;
                _loc7_.removeChildAt(0);
                _loc7_.invalidate();
            }
            _loc6_++;
        }
    }

    private static fixItemWindow(param1: IWindowContainer): IWindowContainer {
        let _loc2_: number = 0;
        let _loc3_: IWindow = null;
        param1.height = 40;
        param1.width = 40;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc3_ = param1.getChildAt(_loc2_);
            _loc3_.rectangle = new Rectangle(0, 0, 40, 40);
            _loc2_++;
        }
        return param1;
    }

    public static thumbEventProc(param1: WindowEvent, param2: IWindow, param3: boolean, param4: ITradingModel, param5: UtilsMap, param6: UtilsMap, param7: UtilsMap, param8: UtilsMap, param9: ItemPopupCtrl, param10: IHabboLocalizationManager, param11: IHabboSoundManager = null, param12: any[] = null): void {
        let _loc15_: GroupItem = null;
        let _loc20_: CollectibleGroupedItem = null;
        let _loc13_: FurnitureItem = null;
        let _loc18_: number = 0;
        let _loc23_: IProductDisplayInfo = null;
        let _loc22_: string = null;
        let _loc19_: CreditTradingItem = null;
        let _loc14_: BitmapData = null;
        let _loc21_: string = null;
        let _loc17_: FurnitureItem = null;
        let _loc16_: Date = null;
        if (param3 && param1.type == "WME_CLICK") {
            param4.requestRemoveItemFromTrading(param2.id);
        }
        if (param1.type == "WME_OVER") {
            if (param3) {
                _loc18_ = param5.length | 0;
                if (param2.id >= _loc18_ && param6 != null) {
                    _loc20_ = param6.getWithIndex(param2.id - _loc18_);
                } else {
                    _loc15_ = param5.getWithIndex(param2.id);
                }
            } else {
                _loc18_ = param7.length | 0;
                if (param2.id >= _loc18_ && param8 != null) {
                    _loc20_ = param8.getWithIndex(param2.id - _loc18_);
                } else {
                    _loc15_ = param7.getWithIndex(param2.id);
                }
            }
            if (_loc20_ != null) {
                _loc23_ = _loc20_.renderableItem;
                _loc22_ = param4.getInventory().catalog.collectorHub.getProductName(_loc23_);
                param9.updateContent(isIWindowContainer(param2) ? param2 : null, _loc22_, null, _loc23_);
                param9.show();
                return;
            }
            if (_loc15_ == null) {
                return;
            }
            _loc19_ = _loc15_ instanceof CreditTradingItem ? _loc15_ : null;
            if (_loc19_ != null && !param3) {
                param9.updateContent(isIWindowContainer(param2) ? param2 : null, _loc19_.getItemTooltipText(), _loc19_.getItemIcon(), null, null, 2, false);
                param9.show();
                return;
            }
            _loc13_ = _loc15_.peek();
            if (_loc13_ == null) {
                return;
            }
            _loc14_ = param4.getInventory().getItemImage(_loc13_);
            if (!_loc13_.isWallItem) {
                _loc21_ = "${roomItem.name." + _loc13_.type + "}";
            } else {
                _loc21_ = "${wallItem.name." + _loc13_.type + "}";
            }
            if (_loc13_.category == 6) {
                _loc21_ = "${poster_" + _loc13_.stuffData.getLegacyString() + "_name}";
            }
            if (_loc13_.category == 10) {
                _loc17_ = _loc13_ instanceof FurnitureItem ? _loc13_ : null;
                _loc16_ = new Date(_loc17_.creationYear, _loc17_.creationMonth - 1, _loc17_.creationDay);
                _loc21_ = param10.getLocalization("roomItem.name." + _loc13_.type) + " " + _loc16_.toLocaleDateString();
            }
            if (_loc13_.category == 8 && param11 != null && param12 != null) {
                _loc21_ = TradingView.getTraxSongFurniName(param10, param11, param12, _loc15_, _loc21_, true, param2.id, param3);
            }
            param9.updateContent(isIWindowContainer(param2) ? param2 : null, _loc21_, _loc14_, null, _loc15_.peek().stuffData, 2, TradingView.isExternalImagetype(param4.getInventory(), _loc13_));
            param9.show();
        } else if (param1.type == "WME_OUT") {
            param9.hideDelayed();
        }
    }

    private static isExternalImagetype(param1: HabboInventory, param2: FurnitureItem): boolean {
        if (!param1) {
            return false;
        }
        let _loc3_: IFurnitureData = param1.getFurnitureData(param2.type, "i");
        return !!(_loc3_ && _loc3_.isExternalImageType);
    }

    private static getTraxSongFurniName(param1: IHabboLocalizationManager, param2: IHabboSoundManager, param3: any[], param4: GroupItem, param5: string, param6: boolean, param7: number = -1, param8: boolean = false): string {
        let _loc9_: IFurnitureItem = param4.peek();
        let _loc10_: ISongInfo = param2.musicController.getSongInfo(_loc9_.extra | 0);
        if (_loc10_ != null) {
            param1.registerParameter("songdisc.info", "name", _loc10_.name);
            param1.registerParameter("songdisc.info", "author", _loc10_.creator);
            param5 = param1.getLocalization("songdisc.info");
        } else if (param6) {
            if (param3.length > 0) {
                param3.pop();
                param3.pop();
                param3.pop();
            }
            param3.push(param7);
            param3.push(param4);
            param3.push(param8);
            param2.musicController.requestSongInfoWithoutSamples(_loc9_.extra | 0);
        }
        return param5;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2186 && !this._SafeStr_2186.disposed) {
                this._SafeStr_2186.dispose();
                this._SafeStr_2186 = null;
            }
            if (this._SafeStr_2458) {
                this._SafeStr_2458.removeEventListener("timer", this.timerEventHandler);
                this._SafeStr_2458.stop();
                this._SafeStr_2458 = null;
            }
            if (this._SafeStr_3399 != null) {
                this._SafeStr_3399.dispose();
                this._SafeStr_3399 = null;
            }
            if (this._soundManager) {
                if (this._soundManager.events != null) {
                    this._soundManager.events.removeEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
                }
                this._soundManager = null;
            }
            this._waitingSongInfo = null;
            this._tradingModel = null;
            this._windowManager = null;
            this._roomEngine = null;
            this._localization = null;
            this._SafeStr_3052 = null;
            this._SafeStr_3340 = null;
            this._visible = false;
            this._disposed = true;
        }
    }

    public setup(param1: number, param2: boolean, param3: number, param4: boolean): void {
        this.setMinimized(false);
        this.hideOwnUserNotification();
        this.hideOtherUserNotification();
        if (!param2 && !param4) {
            this.showInfoMessage("${inventory.trading.warning.both_accounts_disabled}");
            this.showOwnUserNotification("");
            this.showOtherUserNotification("");
        } else {
            if (!param2) {
                this.showOwnUserNotification("${inventory.trading.warning.own_account_disabled}");
            }
            if (!param4) {
                this.showOtherUserNotification("${inventory.trading.warning.others_account_disabled}");
            }
        }
    }

    public getWindowContainer(): IWindowContainer {
        if (this._SafeStr_2186 == null) {
            this._SafeStr_2186 = this.createNormalWindow();
            this.showHighlightInfo(null);
        }
        if (this._windowMin == null) {
            this._windowMin = this.createMinimizedWindow();
        }
        if (!this._SafeStr_2596) {
            this.resizeWindow(true);
            return this._SafeStr_2186;
        }
        return this._windowMin;
    }

    public setMinimized(param1: boolean = false): void {
        this._SafeStr_2596 = param1;
    }

    public updateItemList(param1: number): void {
        let _loc4_: boolean = false;
        if (!this._SafeStr_2186) {
            return;
        }
        _loc4_ = param1 == this._tradingModel.otherUserId;
        let _loc3_: UtilsMap = _loc4_ ? this._tradingModel.otherUserItems : this._tradingModel.ownUserItems;
        let _loc5_: UtilsMap = _loc4_ ? this._tradingModel.otherUserNftItems : this._tradingModel.ownUserNftItems;
        let _loc2_: IItemGridWindow = _loc4_ ? this.getOtherUsersItemGrid() : this.getOwnUsersItemGrid();
        TradingView.updateItemsGrid(_loc2_, _loc3_, _loc5_);
        this.updateActionState();
    }

    public clearItemLists(): void {
        let _loc3_: IWindowContainer = null;
        let _loc2_: any = 0;
        let _loc1_: IItemGridWindow = null;
        _loc1_ = this.getOwnUsersItemGrid();
        _loc2_ = 0;
        while (_loc2_ < _loc1_.numGridItems) {
            _loc3_ = asGuarded(_loc1_.getGridItemAt(_loc2_ >>> 0), isIWindowContainer);
            if (_loc3_) {
                _loc3_.id = _loc2_ | 0;
                _loc3_.removeChildAt(0);
            }
            _loc2_++;
        }
        _loc1_ = this.getOtherUsersItemGrid();
        _loc2_ = 0;
        while (_loc2_ < _loc1_.numGridItems) {
            _loc3_ = asGuarded(_loc1_.getGridItemAt(_loc2_ >>> 0), isIWindowContainer);
            if (_loc3_) {
                _loc3_.id = _loc2_ | 0;
                _loc3_.removeChildAt(0);
            }
            _loc2_++;
        }
    }

    public updateUserInterface(): void {
        let _loc2_: ITextWindow = null;
        let _loc1_: IStaticBitmapWrapperWindow = null;
        if (this._SafeStr_2186) {
            this.updateActionState();
            _loc2_ = asGuarded(this._SafeStr_2186.findChildByTag("OTHER_USER_NAME"), isITextWindow);
            if (_loc2_) {
                _loc2_.text = this._tradingModel.otherUserName;
            }
            _loc1_ = asGuarded(this._SafeStr_2186.findChildByTag("OWN_USER_LOCK"), isIStaticBitmapWrapperWindow);
            if (_loc1_) {
                _loc1_.assetUri = this._tradingModel.ownUserAccepts ? "inventory_trading_trading_locked_icon" : "inventory_trading_trading_unlocked_icon";
            }
            _loc1_ = asGuarded(this._SafeStr_2186.findChildByTag("OTHER_USER_LOCK"), isIStaticBitmapWrapperWindow);
            if (_loc1_) {
                _loc1_.assetUri = this._tradingModel.otherUserAccepts ? "inventory_trading_trading_locked_icon" : "inventory_trading_trading_unlocked_icon";
            }
        }
    }

    public updateActionState(): void {
        let _loc1_: IWindow = null;
        let _loc2_: IWindow = null;
        if (this._SafeStr_2186) {
            _loc1_ = this._SafeStr_2186.findChildByName("button_accept");
            _loc2_ = this._SafeStr_2186.findChildByName("button_cancel");
            if (this._tradingModel.getInventory().getBoolean("trading.warning.enabled")) {
                if (this._tradingModel.isCreditFurniPresent()) {
                    this.showHighlightInfo(this._localization.getLocalization("inventory.trading.warning.credits", "inventory.trading.warning.credits"));
                } else {
                    this.showHighlightInfo(null);
                }
            }
            this.showSilverFeeInfo(this._tradingModel.requiredSilverFee, this._tradingModel.playerSilver, this._tradingModel.otherPlayerSilver);
            this.showOwnOfferInfo(this._tradingModel.ownUserNumItemsTotal, this._tradingModel.ownUserNumCredits);
            this.showOtherOfferInfo(this._tradingModel.otherUserNumItemsTotal, this._tradingModel.otherUserNumCredits);
            switch (this._tradingModel.state | 0) {
                case 0:
                    if ((this._tradingModel.otherHasAnyOffer || this._tradingModel.ownHasAnyOffer) && this._tradingModel.tradeFeeReached()) {
                        _loc1_.enable();
                    } else {
                        _loc1_.disable();
                    }
                    _loc1_.caption = "${inventory.trading.accept}";
                    break;
                case 1:
                    if ((this._tradingModel.otherHasAnyOffer || this._tradingModel.ownHasAnyOffer) && this._tradingModel.tradeFeeReached()) {
                        _loc1_.enable();
                    } else {
                        _loc1_.disable();
                    }
                    _loc1_.caption = this._tradingModel.ownUserAccepts ? "${inventory.trading.modify}" : "${inventory.trading.accept}";
                    this.showInfoMessage("${inventory.trading.info.add}");
                    break;
                case 2:
                    _loc1_.disable();
                    _loc1_.caption = "${inventory.trading.countdown}";
                    this.showInfoMessage("${inventory.trading.info.confirm}");
                    break;
                case 3:
                    _loc1_.enable();
                    _loc1_.caption = "${inventory.trading.confirm}";
                    this.showInfoMessage("${inventory.trading.info.confirm}");
                    break;
                case 4:
                    _loc1_.disable();
                    this.showInfoMessage("${inventory.trading.info.waiting}");
                    break;
                case 5:
                    _loc1_.disable();
                    _loc1_.caption = "${inventory.trading.accept}";
                    this.showInfoMessage("${inventory.trading.info.confirm}");
                    break;
                case 6:
                    break;
                default:
                    throw new Error("Unknown trading progress state: \"" + this._tradingModel.state + "\"");
            }
            Util.disableButton(_loc2_, this._tradingModel.isConfirmingWeb3Trade());
        }
    }

    public showInfoMessage(param1: string): void {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2186.findChildByName("help_text"), isITextWindow);
        _loc2_.text = param1;
        _loc2_.visible = true;
    }

    private showHighlightInfo(param1: string): void {
        if (!this._SafeStr_2186) {
            return;
        }
        let _loc3_: IWindow = this._SafeStr_2186.findChildByName("info_border_highlighted");
        if (_loc3_) {
            _loc3_.visible = param1 != null;
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2186.findChildByName("info_text_highlighted"), isITextWindow);
        if (_loc2_) {
            _loc2_.visible = param1 != null;
            if (param1) {
                _loc2_.text = param1;
            }
        }
        this.resizeWindow();
    }

    private showSilverFeeInfo(param1: number, param2: number, param3: number): void {
        let _loc4_: string = null;
        this.silverFeeContainer.visible = this._tradingModel.isWeb3Trade();
        this.yourSilver.text = String(param2);
        this.otherSilver.text = String(param3);
        let _loc6_: number = param2 + param3;
        let _loc7_: string = param1 <= _loc6_ ? "000000" : "AC232A";
        this.silverProgress.text = "<font color=\"#" + _loc7_ + "\">" + _loc6_ + "</font>/" + param1;
        let _loc5_: boolean = this._tradingModel.state == 0 || this._tradingModel.state == 1;
        Util.disableButton(this.feeMinusButton, param2 <= 0 || !_loc5_);
        Util.disableButton(this.feePlusButton, param2 + param3 >= param1 || param2 >= this._tradingModel.getInventory().catalog.getPurse().silverBalance || !_loc5_);
        if (this._tradingModel.isWeb3Trade()) {
            _loc4_ = param1 <= 0 ? "inventory.trading.note_silver_fee_free_temporarily" : "inventory.trading.note_silver_fee";
            this.silverFeeInfoText.text = this._localization.getLocalization(_loc4_);
        }
        this.resizeWindow();
    }

    private resizeWindow(param1: boolean = true): void {
        Util.moveAllChildrenToColumn(this._SafeStr_2186, 7, !param1);
        this._SafeStr_2186.height = Util.getLowestPoint(this._SafeStr_2186);
        this._tradingModel.getInventory().view.resizeToFitContents();
    }

    private showOwnOfferInfo(param1: number, param2: number): void {
        this.showOfferInfo("content_text_1_a", param1, "content_text_1_b", param2, true);
    }

    private showOtherOfferInfo(param1: number, param2: number): void {
        this.showOfferInfo("content_text_2_a", param1, "content_text_2_b", param2, false);
    }

    private showOfferInfo(param1: string, param2: number, param3: string, param4: number, param5: boolean): void {
        let _loc6_: ITextWindow = null;
        if (!this._tradingModel.getInventory().getBoolean("trading.warning.enabled")) {
            return;
        }
        _loc6_ = asGuarded(this._SafeStr_2186.findChildByName(param1), isITextWindow);
        if (_loc6_) {
            this._localization.registerParameter("inventory.trading.info.itemcount", "value", param2.toString());
            _loc6_.text = this._localization.getLocalization("inventory.trading.info.itemcount");
        }
        _loc6_ = asGuarded(this._SafeStr_2186.findChildByName(param3), isITextWindow);
        if (_loc6_) {
            this._localization.registerParameter("inventory.trading.info.creditvalue", "value", param4.toString());
            _loc6_.text = this._localization.getLocalization("inventory.trading.info.creditvalue");
        }
    }

    public showOwnUserNotification(param1: string): void {
        let _loc3_: ITextWindow = asGuarded(this._SafeStr_2186.findChildByName("info_text_0"), isITextWindow);
        _loc3_.text = param1;
        _loc3_.visible = true;
        let _loc2_: IItemGridWindow = asGuarded(this._SafeStr_2186.findChildByName("item_grid_0"), isIItemGridWindow);
        if (_loc2_) {
            _loc2_.visible = false;
        }
    }

    public hideOwnUserNotification(): void {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2186.findChildByName("info_text_0"), isITextWindow);
        _loc2_.visible = false;
        let _loc1_: IItemGridWindow = asGuarded(this._SafeStr_2186.findChildByName("item_grid_0"), isIItemGridWindow);
        if (_loc1_) {
            _loc1_.visible = true;
        }
    }

    public showOtherUserNotification(param1: string): void {
        let _loc3_: ITextWindow = asGuarded(this._SafeStr_2186.findChildByName("info_text_1"), isITextWindow);
        _loc3_.text = param1;
        _loc3_.visible = true;
        let _loc2_: IItemGridWindow = asGuarded(this._SafeStr_2186.findChildByName("item_grid_1"), isIItemGridWindow);
        if (_loc2_) {
            _loc2_.visible = false;
        }
    }

    public hideOtherUserNotification(): void {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2186.findChildByName("info_text_1"), isITextWindow);
        _loc2_.visible = false;
        let _loc1_: IItemGridWindow = asGuarded(this._SafeStr_2186.findChildByName("item_grid_1"), isIItemGridWindow);
        if (_loc1_) {
            _loc1_.visible = true;
        }
    }

    public alertTradeOpenFailed(param1: TradeOpenFailedEvent): void {
        let _loc2_: string = "inventory.trading.openfail." + param1.getParser().reason;
        this._windowManager.registerLocalizationParameter(_loc2_, "otherusername", param1.getParser().otherUserName);
        this._windowManager.simpleAlert("${inventory.trading.openfail.title}", "${inventory.trading.openfail.caption}", "${" + _loc2_ + "}");
    }

    public alertPopup(param1: number): void {
        switch (param1) {
            case 0:
                this._windowManager.alert("${inventory.trading.notification.title}", "${inventory.trading.warning.other_not_offering}", 0, this.onTradingAlert);
                break;
            case 1:
                this._windowManager.alert("${inventory.trading.notification.title}", "${inventory.trading.info.closed}", 0, this.onTradingAlert);
                break;
            case 2:
                this._windowManager.alert("${inventory.trading.notification.title}", "${inventory.trading.info.already_open}", 0, this.onTradingAlert);
        }
    }

    public showAlertNotification(param1: string, param2: string, param3: (...args: any[]) => any): void {
        let title: string = param1;
        let description: string = param2;
        let callback: (...args: any[]) => any = param3;
        this._windowManager.alert(title, description, 0, callback ?? ((param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         }));
    }

    public startConfirmCountdown(): void {
        if (this._SafeStr_2458 == null) {
            this._SafeStr_2458 = new Timer(1000, 3);
            this._SafeStr_2458.addEventListener("timer", this.timerEventHandler);
        }
        this._SafeStr_2458.reset();
        this._SafeStr_2458.repeatCount = 3;
        this._SafeStr_2458.start();
        this._windowManager.registerLocalizationParameter("inventory.trading.countdown", "counter", "3");
        this.updateUserInterface();
    }

    public cancelConfirmCountdown(): void {
        if (this._SafeStr_2458 != null) {
            this._SafeStr_2458.reset();
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc4_: GroupItem = null;
        let _loc6_: UtilsMap = null;
        let _loc3_: boolean = false;
        let _loc5_: any = 0;
        _loc6_ = this._tradingModel.ownUserItems;
        _loc3_ = false;
        _loc5_ = 0;
        while (_loc5_ < _loc6_.length) {
            _loc4_ = asInstanceOf(_loc6_.getWithIndex(_loc5_ | 0), GroupItem);
            if (_loc4_.iconCallbackId == param1) {
                _loc4_.iconImage = param2;
                _loc3_ = true;
            }
            _loc5_++;
        }
        if (_loc3_) {
            this.updateItemList(this._tradingModel.ownUserId);
        }
        _loc6_ = this._tradingModel.otherUserItems;
        _loc3_ = false;
        _loc5_ = 0;
        while (_loc5_ < _loc6_.length) {
            _loc4_ = asInstanceOf(_loc6_[_loc5_], GroupItem);
            if (_loc4_.iconCallbackId == param1) {
                _loc4_.iconImage = param2;
                _loc3_ = true;
            }
            _loc5_++;
        }
        if (_loc3_) {
            this.updateItemList(this._tradingModel.otherUserId);
        }
    }

    public imageFailed(param1: number): void {
    }

    public setSelection(param1: GroupItem): void {
        this.removeSelection();
        if (param1) {
            this._SafeStr_3340 = param1;
            this._SafeStr_3340.isSelected = true;
        }
    }

    public removeSelection(): void {
        if (this._SafeStr_3340) {
            this._SafeStr_3340.isSelected = false;
            this._SafeStr_3340 = null;
        }
    }

    public onTradingAlert = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
            param1.dispose();
        }
    };

    protected getOwnUsersItemGrid(): IItemGridWindow {
        return asGuarded(this._SafeStr_2186.findChildByTag("OWN_USER_GRID"), isIItemGridWindow);
    }

    protected getOtherUsersItemGrid(): IItemGridWindow {
        return asGuarded(this._SafeStr_2186.findChildByTag("OTHER_USER_GRID"), isIItemGridWindow);
    }

    private createNormalWindow(): IWindowContainer {
        let _loc2_: IWindow = null;
        let _loc3_: any = null;
        let _loc5_: any = 0;
        let _loc4_: IItemGridWindow = null;
        let _loc1_: XML = asInstanceOf(castTo(this._SafeStr_3052.getAssetByName("inventory_trading_xml"), XmlAsset).content, XML);
        let _loc6_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(_loc1_), isIWindowContainer);
        _loc4_ = asGuarded(_loc6_.findChildByTag("OWN_USER_GRID"), isIItemGridWindow);
        _loc5_ = 0;
        while (_loc5_ < _loc4_.numGridItems) {
            _loc2_ = _loc4_.getGridItemAt(_loc5_ >>> 0);
            _loc2_.id = _loc5_ | 0;
            _loc2_.procedure = this.ownThumbEventProc;
            _loc2_.addEventListener("WME_OVER", this.ownThumbEventProc);
            _loc2_.addEventListener("WME_OUT", this.ownThumbEventProc);
            _loc5_++;
        }
        _loc4_ = asGuarded(_loc6_.findChildByTag("OTHER_USER_GRID"), isIItemGridWindow);
        _loc5_ = 0;
        while (_loc5_ < _loc4_.numGridItems) {
            _loc2_ = _loc4_.getGridItemAt(_loc5_ >>> 0);
            _loc2_.id = _loc5_ | 0;
            _loc2_.procedure = this.othersThumbEventProc;
            _loc2_.addEventListener("WME_OVER", this.othersThumbEventProc);
            _loc2_.addEventListener("WME_OUT", this.othersThumbEventProc);
            _loc5_++;
        }
        _loc6_.procedure = this.windowEventProc;
        return _loc6_;
    }

    private createMinimizedWindow(): IWindowContainer {
        let _loc1_: XML = asInstanceOf(castTo(this._SafeStr_3052.getAssetByName("inventory_trading_minimized_xml"), XmlAsset).content, XML);
        let _loc2_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(_loc1_), isIWindowContainer);
        _loc2_.procedure = this.windowMininizedEventProc;
        return _loc2_;
    }

    private windowMininizedEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_continue":
                    this._tradingModel.requestFurniViewOpen();
                    break;
                case "button_cancel":
                    this._tradingModel.requestCancelTrading();
            }
        }
    };

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_accept":
                    switch ((this._tradingModel.state | 0) - 1) {
                        case 0:
                            if (this._tradingModel.otherUserItems.length == 0 && this._tradingModel.otherUserNftItems.length == 0 && !this._tradingModel.ownUserAccepts) {
                                this.alertPopup(0);
                            }
                            if (this._tradingModel.ownUserAccepts) {
                                this._tradingModel.requestUnacceptTrading();
                            } else {
                                this._tradingModel.requestAcceptTrading();
                            }
                            break;
                        case 2:
                            param2.disable();
                            this._tradingModel.requestConfirmAcceptTrading();
                    }
                    break;
                case "button_cancel":
                    switch ((this._tradingModel.state | 0) - 1) {
                        case 0:
                            this._tradingModel.requestCancelTrading();
                            break;
                        case 2:
                            this._tradingModel.requestConfirmDeclineTrading();
                    }
                    break;
                case "silver_minus_button":
                    this._tradingModel.addSilverFee(false);
                    break;
                case "silver_plus_button":
                    this._tradingModel.addSilverFee(true);
            }
        }
    };

    private ownThumbEventProc = (param1: WindowEvent, param2: IWindow): void => {
        TradingView.thumbEventProc(param1, param2, true, this._tradingModel, this._tradingModel.ownUserItems, this._tradingModel.ownUserNftItems, this._tradingModel.otherUserItems, this._tradingModel.otherUserNftItems, this._SafeStr_3399, this._localization, this._soundManager, this._waitingSongInfo);
    };

    private othersThumbEventProc = (param1: WindowEvent, param2: IWindow): void => {
        TradingView.thumbEventProc(param1, param2, false, this._tradingModel, this._tradingModel.ownUserItems, this._tradingModel.ownUserNftItems, this._tradingModel.otherUserItems, this._tradingModel.otherUserNftItems, this._SafeStr_3399, this._localization, this._soundManager, this._waitingSongInfo);
    };

    private timerEventHandler = (param1: TimerEvent): void => {
        this._windowManager.registerLocalizationParameter("inventory.trading.countdown", "counter", String(3 - this._SafeStr_2458.currentCount));
        if (this._SafeStr_2458.currentCount == 3) {
            this._tradingModel.confirmCountdownReady();
            this._SafeStr_2458.reset();
        }
    };

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        let _loc8_: boolean = false;
        let _loc6_: GroupItem = null;
        let _loc7_: any = 0;
        let _loc3_: FurnitureItem = null;
        let _loc4_: string = null;
        let _loc5_: BitmapData = null;
        let _loc2_: IWindow = null;
        if (this._waitingSongInfo.length > 0) {
            _loc8_ = Boolean(this._waitingSongInfo.pop());
            _loc6_ = this._waitingSongInfo.pop();
            _loc7_ = this._waitingSongInfo.pop() >>> 0;
            _loc3_ = _loc6_.peek();
            if (_loc3_.extra == param1.id) {
                if (_loc8_ && this._tradingModel.ownUserItems.getWithIndex(_loc7_ | 0) == _loc6_ || !_loc8_ && this._tradingModel.otherUserItems.getWithIndex(_loc7_ | 0) == _loc6_) {
                    _loc4_ = TradingView.getTraxSongFurniName(this._localization, this._soundManager, this._waitingSongInfo, _loc6_, "", false);
                    _loc5_ = this._tradingModel.getInventory().getItemImage(_loc3_);
                    _loc2_ = _loc8_ ? this.getOwnUsersItemGrid().getGridItemAt(_loc7_ >>> 0) : this.getOtherUsersItemGrid().getGridItemAt(_loc7_ >>> 0);
                    this._SafeStr_3399.updateContent(isIWindowContainer(_loc2_) ? _loc2_ : null, _loc4_, _loc5_);
                }
            } else {
                this._waitingSongInfo.push(_loc7_);
                this._waitingSongInfo.push(_loc6_);
                this._waitingSongInfo.push(_loc8_);
            }
        }
    };

    private get silverFeeContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2186.findChildByName("silver_container"), isIWindowContainer);
    }

    private get yourSilver(): ITextWindow {
        return asGuarded(this.silverFeeContainer.findChildByName("your_silver"), isITextWindow);
    }

    private get otherSilver(): ITextWindow {
        return asGuarded(this.silverFeeContainer.findChildByName("other_silver"), isITextWindow);
    }

    private get silverProgress(): IHTMLTextWindow {
        return asGuarded(this.silverFeeContainer.findChildByName("silver_progress_html"), isIHTMLTextWindow);
    }

    private get feeMinusButton(): IIconButtonWindow {
        return asGuarded(this.silverFeeContainer.findChildByName("silver_minus_button"), isIIconButtonWindow);
    }

    private get feePlusButton(): IIconButtonWindow {
        return asGuarded(this.silverFeeContainer.findChildByName("silver_plus_button"), isIIconButtonWindow);
    }

    private get silverFeeInfoText(): ITextWindow {
        return asGuarded(this.silverFeeContainer.findChildByName("silver_fee_info_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
