import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { PurseEvent } from '@/com/sulake/habbo/catalog/purse/PurseEvent';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { MiniMailMessageEvent } from '@/com/sulake/habbo/messenger/events/MiniMailMessageEvent';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HabboHelpTutorialEvent } from '@/com/sulake/habbo/help/enum/HabboHelpTutorialEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetHabboClubUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetHabboClubUpdateEvent';
import { RoomWidgetMiniMailUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetMiniMailUpdateEvent';
import { RoomWidgetPurseUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPurseUpdateEvent';
import { RoomWidgetSettingsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSettingsUpdateEvent';
import { RoomWidgetTutorialEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetTutorialEvent';
import { RoomWidgetUpdateEffectsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEffectsUpdateEvent';
import { RoomWidgetAvatarExpressionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetAvatarExpressionMessage';
import { RoomWidgetChangePostureMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChangePostureMessage';
import { RoomWidgetDanceMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDanceMessage';
import { RoomWidgetMeMenuMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMeMenuMessage';
import { RoomWidgetOpenCatalogMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenCatalogMessage';
import { RoomWidgetOpenInventoryMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenInventoryMessage';
import { RoomWidgetSelectEffectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetSelectEffectMessage';
import { RoomWidgetStoreSettingsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetStoreSettingsMessage';

export class MeMenuWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::MeMenuWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    declare private _inventory: IHabboInventory;

    declare private _toolbar: IHabboToolbar;

    declare private _catalog: IHabboCatalog;

    declare private _widget: MeMenuWidget;

    constructor() {
        Logger.log("[MeMenuWidgetHandler]");
    }

    public set widget(param1: MeMenuWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        if (this._container && this._container.avatarEditor) {
            this._container.avatarEditor.close(0);
        }
        this._disposed = true;
        this.container = null;
        this._inventory = null;
        this._toolbar = null;
        this._catalog = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_ME_MENU";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container != null) {
            if (this._inventory && !this._inventory.disposed && this._inventory.events) {
                this._inventory.events.removeEventListener("HIEE_EFFECTS_CHANGED", this.onAvatarEffectsChanged);
                this._inventory.events.removeEventListener("HIHCE_HABBO_CLUB_CHANGED", this.onHabboClubSubscriptionChanged);
            }
            if (this._toolbar && !this._toolbar.disposed && this._toolbar.events) {
                this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onHabboToolbarEvent);
            }
            if (this._container.habboHelp && !this._container.habboHelp.disposed && this._container.habboHelp.events) {
                this._container.habboHelp.events.removeEventListener("HHTPNUFWE_LIGHT_CLOTHES_ICON", this.onHelpTutorialEvent);
                this._container.habboHelp.events.removeEventListener("HHTPNUFWE_AVATAR_TUTORIAL_START", this.onHelpTutorialEvent);
            }
            if (this._container.catalog && !this._container.catalog.disposed && this._container.catalog.events) {
                this._container.catalog.events.removeEventListener("catalog_purse_credit_balance", this.onCreditBalance);
            }
            if (this._container.messenger && !this._container.messenger.disposed && this._container.messenger.events) {
                this._container.messenger.events.removeEventListener("MMME_new", this.onMiniMailNewMessage);
                this._container.messenger.events.removeEventListener("MMME_unread", this.onMiniMailUnreadCount);
            }
        }
        this._container = param1;
        if (this._container == null) {
            return;
        }
        this._inventory = this._container.inventory;
        if (this._inventory != null) {
            this._inventory.events.addEventListener("HIEE_EFFECTS_CHANGED", this.onAvatarEffectsChanged);
            this._inventory.events.addEventListener("HIHCE_HABBO_CLUB_CHANGED", this.onHabboClubSubscriptionChanged);
        }
        this._toolbar = this._container.toolbar;
        if (this._toolbar && this._toolbar.events) {
            this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onHabboToolbarEvent);
        }
        if (this._container.habboHelp != null) {
            this._container.habboHelp.events.addEventListener("HHTPNUFWE_LIGHT_CLOTHES_ICON", this.onHelpTutorialEvent);
            this._container.habboHelp.events.addEventListener("HHTPNUFWE_AVATAR_TUTORIAL_START", this.onHelpTutorialEvent);
        }
        this._catalog = this._container.catalog;
        if (this._container.catalog != null) {
            this._container.catalog.events.addEventListener("catalog_purse_credit_balance", this.onCreditBalance);
        }
        if (this._container.messenger && !this._container.messenger.disposed && this._container.messenger.events) {
            this._container.messenger.events.addEventListener("MMME_new", this.onMiniMailNewMessage);
            this._container.messenger.events.addEventListener("MMME_unread", this.onMiniMailUnreadCount);
        }
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    private onHabboToolbarEvent = (param1: HabboToolbarEvent): void => {
        if (this.disposed || !this._container || !this._container.events) {
            return;
        }
        if (param1.type == "HTE_TOOLBAR_CLICK") {
            let _loc2_: string = param1.iconId;
            if ("HTIE_ICON_MEMENU" !== _loc2_) {
            }
        }
    };

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWCM_MESSAGE_AVATAR_EXPRESSION");
        _loc1_.push("RWCM_MESSAGE_DANCE");
        _loc1_.push("RWCPM_MESSAGE_CHANGE_POSTURE");
        _loc1_.push("RWCM_MESSAGE_GET_EFFECTS");
        _loc1_.push("RWCM_MESSAGE_SELECT_EFFECT");
        _loc1_.push("RWCM_MESSAGE_UNSELECT_EFFECT");
        _loc1_.push("RWCM_MESSAGE_UNSELECT_ALL_EFFECTS");
        _loc1_.push("RWGOI_MESSAGE_OPEN_INVENTORY");
        _loc1_.push("RWGOI_MESSAGE_OPEN_CATALOG");
        _loc1_.push("RWGOI_MESSAGE_STOP_EFFECT");
        _loc1_.push("RWGOI_MESSAGE_NAVIGATE_TO_ROOM");
        _loc1_.push("RWGOI_MESSAGE_NAVIGATE_HOME");
        _loc1_.push("RWCM_OPEN_AVATAR_EDITOR");
        _loc1_.push("RWCM_GET_WARDROBE");
        _loc1_.push("select_outfit");
        _loc1_.push("RWSORM_SHOW_OWN_ROOMS");
        _loc1_.push("RWRWM_ME_MENU");
        _loc1_.push("RWMMM_MESSAGE_ME_MENU_OPENED");
        _loc1_.push("RWGSM_GET_SETTINGS");
        _loc1_.push("RWSSM_STORE_SETTINGS");
        _loc1_.push("RWSSM_STORE_SOUND");
        _loc1_.push("RWSSM_PREVIEW_SOUND");
        _loc1_.push("RWAEM_AVATAR_EDITOR_VIEW_DISPOSED");
        _loc1_.push("RWRWM_EFFECTS");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc4_: HabboToolbarEvent = null;
        let _loc13_: RoomWidgetDanceMessage = null;
        let _loc11_: RoomWidgetChangePostureMessage = null;
        let _loc10_: any[] = null;
        let _loc2_: RoomWidgetSelectEffectMessage = null;
        let _loc9_: RoomWidgetSelectEffectMessage = null;
        let _loc14_: RoomWidgetOpenCatalogMessage = null;
        let _loc5_: RoomWidgetOpenInventoryMessage = null;
        let _loc15_: RoomWidgetMeMenuMessage = null;
        let _loc12_: boolean = false;
        let _loc6_: number = 0;
        let _loc3_: IUserData = null;
        let _loc8_: number = 0;
        let _loc7_: RoomWidgetStoreSettingsMessage = null;
        if (!param1) {
            return null;
        }
        switch (param1.type) {
            case "RWRWM_ME_MENU":
                if (this._container != null && this._container.toolbar != null && this._container.toolbar.events != null) {
                    _loc4_ = new HabboToolbarEvent("HTE_TOOLBAR_CLICK");
                    _loc4_.iconId = "HTIE_ICON_MEMENU";
                    if (!this.disposed && this._container && this._container.toolbar && this._container.toolbar.events) {
                        this._container.toolbar.events.dispatchEvent(_loc4_);
                    }
                }
                break;
            case "RWCM_MESSAGE_AVATAR_EXPRESSION":
                if (this._container != null && this._container.roomSession != null) {
                    this._container.roomSession.sendAvatarExpressionMessage(castTo(param1, RoomWidgetAvatarExpressionMessage).animation.ordinal);
                }
                break;
            case "RWCM_MESSAGE_DANCE":
                if (this._container != null && this._container.roomSession != null) {
                    _loc13_ = param1 instanceof RoomWidgetDanceMessage ? param1 : null;
                    if (_loc13_ != null) {
                        this._container.roomSession.sendDanceMessage(_loc13_.style);
                    }
                }
                break;
            case "RWCPM_MESSAGE_CHANGE_POSTURE":
                if (this._container != null && this._container.roomSession != null) {
                    _loc11_ = param1 instanceof RoomWidgetChangePostureMessage ? param1 : null;
                    if (_loc11_ != null) {
                        this._container.roomSession.sendChangePostureMessage(_loc11_.posture);
                    }
                }
                break;
            case "RWCM_MESSAGE_GET_EFFECTS":
                if (this._inventory != null) {
                    _loc10_ = this._inventory.getAvatarEffects();
                    this._container.events.dispatchEvent(new RoomWidgetUpdateEffectsUpdateEvent(_loc10_));
                }
                break;
            case "RWCM_MESSAGE_SELECT_EFFECT":
                if (this._inventory != null) {
                    _loc2_ = param1 instanceof RoomWidgetSelectEffectMessage ? param1 : null;
                    this._inventory.setEffectSelected(_loc2_.effectType);
                }
                break;
            case "RWCM_MESSAGE_UNSELECT_EFFECT":
                if (this._inventory != null) {
                    _loc9_ = param1 instanceof RoomWidgetSelectEffectMessage ? param1 : null;
                    this._inventory.setEffectDeselected(_loc9_.effectType);
                }
                break;
            case "RWGOI_MESSAGE_OPEN_CATALOG":
                _loc14_ = param1 instanceof RoomWidgetOpenCatalogMessage ? param1 : null;
                if (this._catalog != null && _loc14_.pageKey == "RWOCM_CLUB_MAIN") {
                    this._catalog.openClubCenter();
                }
                break;
            case "RWGOI_MESSAGE_OPEN_INVENTORY":
                _loc5_ = param1 instanceof RoomWidgetOpenInventoryMessage ? param1 : null;
                if (this._inventory != null) {
                    Logger.log("MeMenuWidgetHandler open inventory: " + _loc5_.inventoryType);
                    switch (_loc5_.inventoryType) {
                        case "inventory_effects":
                            this._catalog.openCatalogPage("avatar_effects");
                            break;
                        case "inventory_badges":
                            this._inventory.toggleInventoryPage("badges");
                            break;
                        case "inventory_furniture":
                            this._inventory.toggleInventoryPage("furni");
                            break;
                        case "inventory_clothes":
                            break;
                        default:
                            Logger.log("MeMenuWidgetHandler: unknown inventory type: " + _loc5_.inventoryType);
                    }
                }
                break;
            case "RWCM_MESSAGE_UNSELECT_ALL_EFFECTS":
            case "RWGOI_MESSAGE_STOP_EFFECT":
                Logger.log("STOP ALL EFFECTS");
                if (this._inventory != null) {
                    this._inventory.deselectAllEffects(true);
                }
                break;
            case "RWGOI_MESSAGE_NAVIGATE_HOME":
                Logger.log("MeMenuWidgetHandler: GO HOME");
                if (this._container != null) {
                    this._container.navigator.goToHomeRoom();
                }
                break;
            case "RWSORM_SHOW_OWN_ROOMS":
                if (this._container != null) {
                    this._container.navigator.showOwnRooms();
                }
                break;
            case "RWMMM_MESSAGE_ME_MENU_OPENED":
                _loc15_ = param1 instanceof RoomWidgetMeMenuMessage ? param1 : null;
                if (!_loc15_ || !this._container || !this._container.events) {
                    return null;
                }
                if (this._inventory != null) {
                    _loc12_ = false;
                    if (this._container != null && this._container.sessionDataManager != null) {
                        _loc12_ = this._container.sessionDataManager.hasClub;
                    }
                    this._container.events.dispatchEvent(new RoomWidgetHabboClubUpdateEvent(this._inventory.clubDays, this._inventory.clubPeriods, this._inventory.clubPastPeriods, _loc12_, this._inventory.clubLevel));
                }
                if (this._catalog != null && this._catalog.getPurse() != null) {
                    this._container.events.dispatchEvent(new RoomWidgetPurseUpdateEvent("RWPUE_CREDIT_BALANCE", this._catalog.getPurse().credits));
                }
                if (this._container.roomSession && this._container.roomSession.userDataManager && this._container.roomEngine) {
                    _loc6_ = this._container.sessionDataManager != null ? this._container.sessionDataManager.userId : -1;
                    _loc3_ = this._container.roomSession.userDataManager.getUserData(_loc6_);
                    if (!_loc3_) {
                        return null;
                    }
                    _loc8_ = 0;
                    this._container.roomEngine.selectAvatar(_loc8_, _loc3_.roomObjectId);
                }
                break;
            case "RWCM_OPEN_AVATAR_EDITOR":
                Logger.log("MeMenuWidgetHandler: Open avatar editor...");
                if (this._container) {
                    this._container.avatarEditor.openEditor(0, null, null, true);
                    this._container.avatarEditor.loadOwnAvatarInEditor(0);
                    if (this._container.habboHelp && this._container.habboHelp.events) {
                        this._container.habboHelp.events.dispatchEvent(new HabboHelpTutorialEvent("HHTE_DONE_AVATAR_EDITOR_OPENING"));
                    }
                }
                break;
            case "RWGSM_GET_SETTINGS":
                this._container.events.dispatchEvent(new RoomWidgetSettingsUpdateEvent("RWSUE_SETTINGS", this._container.soundManager.traxVolume, this._container.soundManager.furniVolume, this._container.soundManager.genericVolume));
                break;
            case "RWSSM_STORE_SOUND":
                this._container.soundManager.traxVolume = (param1 instanceof RoomWidgetStoreSettingsMessage ? param1 : null).traxVolume;
                this._container.soundManager.furniVolume = (param1 instanceof RoomWidgetStoreSettingsMessage ? param1 : null).furniVolume;
                this._container.soundManager.genericVolume = (param1 instanceof RoomWidgetStoreSettingsMessage ? param1 : null).genericVolume;
                this._container.events.dispatchEvent(new RoomWidgetSettingsUpdateEvent("RWSUE_SETTINGS", this._container.soundManager.traxVolume, this._container.soundManager.furniVolume, this._container.soundManager.genericVolume));
                break;
            case "RWSSM_PREVIEW_SOUND":
                _loc7_ = param1 instanceof RoomWidgetStoreSettingsMessage ? param1 : null;
                this._container.soundManager.previewVolume(_loc7_.genericVolume, _loc7_.furniVolume, _loc7_.traxVolume);
                this._container.events.dispatchEvent(new RoomWidgetSettingsUpdateEvent("RWSUE_SETTINGS", this._container.soundManager.traxVolume, this._container.soundManager.furniVolume, this._container.soundManager.genericVolume));
                break;
            case "RWAEM_AVATAR_EDITOR_VIEW_DISPOSED":
                if (this._container.habboHelp && this._container.habboHelp.events) {
                    this._container.habboHelp.events.dispatchEvent(new HabboHelpTutorialEvent("HHTE_DONE_AVATAR_EDITOR_CLOSING"));
                }
                break;
            default:
                Logger.log("Unhandled message in MeMenuWidgetHandler: " + param1.type);
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
    }

    public update(): void {
    }

    private onAvatarEffectsChanged = (param1: Event = null): void => {
        let _loc2_: any[] = null;
        if (this._container == null) {
            return;
        }
        Logger.log("[MeMenuWidgetHandler] Received Avatar Effects Have Changed Event...\t");
        if (this._inventory != null) {
            _loc2_ = this._inventory.getAvatarEffects();
            this._container.events.dispatchEvent(new RoomWidgetUpdateEffectsUpdateEvent(_loc2_));
        }
    };

    private onHabboClubSubscriptionChanged = (param1: Event = null): void => {
        let _loc2_: boolean = false;
        if (this._inventory != null) {
            _loc2_ = false;
            if (this._container != null && this._container.sessionDataManager != null) {
                _loc2_ = this._container.sessionDataManager.hasClub;
            }
            this._container.events.dispatchEvent(new RoomWidgetHabboClubUpdateEvent(this._inventory.clubDays, this._inventory.clubPeriods, this._inventory.clubPastPeriods, _loc2_, this._inventory.clubLevel));
        }
    };

    private onCreditBalance = (param1: PurseEvent): void => {
        if (param1 == null || this._container == null || this._container.events == null) {
            return;
        }
        this._container.events.dispatchEvent(new RoomWidgetPurseUpdateEvent("RWPUE_CREDIT_BALANCE", param1.balance));
    };

    private onHelpTutorialEvent = (param1: HabboHelpTutorialEvent): void => {
        if (this._container == null) {
            return;
        }
        switch (param1.type) {
            case "HHTPNUFWE_AVATAR_TUTORIAL_START":
                this._container.events.dispatchEvent(new RoomWidgetTutorialEvent("HHTPNUFWE_AE_STARTED"));
                break;
            case "HHTPNUFWE_LIGHT_CLOTHES_ICON":
                this._container.events.dispatchEvent(new RoomWidgetTutorialEvent("HHTPNUFWE_AE_HIGHLIGHT"));
        }
    };

    private onMiniMailNewMessage = (param1: MiniMailMessageEvent): void => {
        this._container.events.dispatchEvent(new RoomWidgetMiniMailUpdateEvent("RWMMUE_new_mini_mail"));
    };

    private onMiniMailUnreadCount = (param1: MiniMailMessageEvent): void => {
        this._container.events.dispatchEvent(new RoomWidgetMiniMailUpdateEvent("RWMMUE_unread_mini_mail"));
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
