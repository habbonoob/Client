import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { FurnitureContextMenuWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureContextMenuWidgetHandler';
import { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { FurnitureContextInfoView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextInfoView';
import { FriendFurniContextMenuView, GuildFurnitureContextMenuView, MonsterPlantSeedContextMenuView, MysteryBoxContextMenuView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget.group';
import { GenericUsableFurnitureContextMenuView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/GenericUsableFurnitureContextMenuView';
import { MonsterPlantSeedConfirmationView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/MonsterPlantSeedConfirmationView';
import { PurchasableClothingConfirmationView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/PurchasableClothingConfirmationView';
import { RandomTeleportContextMenuView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/RandomTeleportContextMenuView';
import { EffectBoxOpenDialogView } from '@/com/sulake/habbo/ui/widget/furniture/effectbox/EffectBoxOpenDialogView';
import { MysteryBoxOpenDialogView } from '@/com/sulake/habbo/ui/widget/furniture/mysterybox/MysteryBoxOpenDialogView';
import { MysteryTrophyOpenDialogView } from '@/com/sulake/habbo/ui/widget/furniture/mysterytrophy/MysteryTrophyOpenDialogView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class FurnitureContextMenuWidget extends RoomWidgetBase implements IContextMenuParentWidget, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.contextmenu::FurnitureContextMenuWidget'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: ICoreConfiguration, param5: IHabboLocalizationManager, param6: Component, param7: IHabboGroupsManager, param8: IHabboCatalog) {
        super(param1, param2, param3, param5);
        this._component = param6;
        this._SafeStr_3214 = new GuildFurnitureContextMenuView(this, param7, param2);
        this._SafeStr_4026 = new RandomTeleportContextMenuView(this);
        this._SafeStr_4040 = new MonsterPlantSeedContextMenuView(this);
        this._SafeStr_3050 = new MysteryBoxContextMenuView(this);
        this._SafeStr_3229 = new FriendFurniContextMenuView(this);
        this._SafeStr_3077 = new GenericUsableFurnitureContextMenuView(this);
        this._SafeStr_3086 = new MonsterPlantSeedConfirmationView(this);
        this._SafeStr_4623 = new MysteryBoxOpenDialogView(this);
        this._SafeStr_3525 = new EffectBoxOpenDialogView(this);
        this._SafeStr_3477 = new MysteryTrophyOpenDialogView(this);
        this._SafeStr_3372 = new PurchasableClothingConfirmationView(this);
        this._catalog = param8;
        this.handler.widget = this;
        this.handler.roomEngine.events.addEventListener("REOE_REMOVED", this.onRoomObjectRemoved);
    }

    declare private _component: Component;

    declare private _view: FurnitureContextInfoView;

    private _selectedObject: IRoomObject = null;

    declare private _SafeStr_3214: GuildFurnitureContextMenuView;

    declare private _SafeStr_4026: RandomTeleportContextMenuView;

    declare private _SafeStr_4040: MonsterPlantSeedContextMenuView;

    declare private _SafeStr_3086: MonsterPlantSeedConfirmationView;

    declare private _SafeStr_3525: EffectBoxOpenDialogView;

    declare private _SafeStr_3050: MysteryBoxContextMenuView;

    declare private _SafeStr_3477: MysteryTrophyOpenDialogView;

    declare private _SafeStr_4623: MysteryBoxOpenDialogView;

    declare private _SafeStr_3229: FriendFurniContextMenuView;

    declare private _SafeStr_3077: GenericUsableFurnitureContextMenuView;

    declare private _SafeStr_3372: PurchasableClothingConfirmationView;

    declare private _catalog: IHabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get handler(): FurnitureContextMenuWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureContextMenuWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get roomEngine(): IRoomEngine {
        return this._container ? this._container.roomEngine : null;
    }

    public get friendList(): IHabboFriendList {
        return null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._component.removeUpdateReceiver(this);
        this.removeView(this._view, false);
        this._SafeStr_3214.dispose();
        this._SafeStr_3214 = null;
        this._SafeStr_4026.dispose();
        this._SafeStr_4026 = null;
        this._SafeStr_4040.dispose();
        this._SafeStr_4040 = null;
        this._SafeStr_3086.dispose();
        this._SafeStr_3086 = null;
        this._SafeStr_3050.dispose();
        this._SafeStr_3050 = null;
        this._SafeStr_4623.dispose();
        this._SafeStr_4623 = null;
        this._SafeStr_3229.dispose();
        this._SafeStr_3229 = null;
        this._SafeStr_3077.dispose();
        this._SafeStr_3077 = null;
        this._SafeStr_3525.dispose();
        this._SafeStr_3525 = null;
        this._SafeStr_3477.dispose();
        this._SafeStr_3477 = null;
        this._SafeStr_3372.dispose();
        this._SafeStr_3372 = null;
        this._catalog = null;
        super.dispose();
    }

    public override release(): void {
        if (this._selectedObject != null) {
            this.hideContextMenu(this._selectedObject);
        }
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        super.release();
    }

    public override reuse(param1: IRoomDesktop): void {
        super.reuse(param1);
    }

    public hideContextMenu(param1: IRoomObject): void {
        if (this._selectedObject != null && this._selectedObject.getId() == param1.getId()) {
            this.removeView(this._view, false);
            this._component.removeUpdateReceiver(this);
            this._selectedObject = null;
        }
    }

    public showGuildFurnitureContextMenu(param1: IRoomObject, param2: number, param3: string, param4: number, param5: boolean, param6: boolean): void {
        this._selectedObject = param1;
        this._SafeStr_3214._guildId = param2;
        this._SafeStr_3214._guildHomeRoomId = param4;
        this._SafeStr_3214._userIsMember = param5;
        this._SafeStr_3214._guildHasReadableForum = param6;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        this._view = this._SafeStr_3214;
        FurnitureContextInfoView.setup(this._view, param1, param3);
        this._component.registerUpdateReceiver(this, 10);
    }

    public showRandomTeleportContextMenu(param1: IRoomObject, param2: number): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        this._SafeStr_4026.objectCategory = param2;
        this._view = this._SafeStr_4026;
        FurnitureContextInfoView.setup(this._view, param1);
        this._component.registerUpdateReceiver(this, 10);
    }

    public showMonsterPlantSeedContextMenu(param1: IRoomObject, param2: number): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        this._SafeStr_4040.objectCategory = param2;
        this._view = this._SafeStr_4040;
        FurnitureContextInfoView.setup(this._view, param1);
        this._component.registerUpdateReceiver(this, 10);
    }

    public showPlantSeedConfirmationDialog(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (!this._SafeStr_3086) {
            this._SafeStr_3086 = new MonsterPlantSeedConfirmationView(this);
        }
        this._SafeStr_3086.open(param1.getId());
    }

    public showPurchasableClothingConfirmationDialog(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (!this._SafeStr_3372) {
            this._SafeStr_3372 = new PurchasableClothingConfirmationView(this);
        }
        this._SafeStr_3372.open(param1.getId());
    }

    public showEffectBoxOpenDialog(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (!this._SafeStr_3525) {
            this._SafeStr_3525 = new EffectBoxOpenDialogView(this);
        }
        this._SafeStr_3525.open(param1.getId());
    }

    public showMysteryTrophyOpenDialog(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (!this._SafeStr_3477) {
            this._SafeStr_3477 = new MysteryTrophyOpenDialogView(this);
        }
        this._SafeStr_3477.open(param1.getId());
    }

    public showMysteryBoxContextMenu(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (this._SafeStr_3050 == null) {
            this._SafeStr_3050 = new MysteryBoxContextMenuView(this);
        }
        this._SafeStr_3050.isOwnerMode = this.handler.container.isOwnerOfFurniture(param1);
        this._SafeStr_3050.show();
        this._view = this._SafeStr_3050;
        FurnitureContextInfoView.setup(this._view, param1);
        this._component.registerUpdateReceiver(this, 10);
    }

    public showFriendFurnitureContextMenu(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (this._SafeStr_3229 == null) {
            this._SafeStr_3229 = new FriendFurniContextMenuView(this);
        }
        this._SafeStr_3229.show();
        this._view = this._SafeStr_3229;
        FurnitureContextInfoView.setup(this._view, param1);
        this._component.registerUpdateReceiver(this, 10);
    }

    public showUsableFurnitureContextMenu(param1: IRoomObject, param2: number): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        if (this._SafeStr_3077 == null) {
            this._SafeStr_3077 = new GenericUsableFurnitureContextMenuView(this);
        }
        this._SafeStr_3077.show();
        this._SafeStr_3077.objectCategory = param2;
        this._view = this._SafeStr_3077;
        FurnitureContextInfoView.setup(this._view, param1);
        this._component.registerUpdateReceiver(this, 10);
    }

    public showMysteryBoxOpenDialog(param1: IRoomObject): void {
        this._selectedObject = param1;
        if (this._view != null) {
            this.removeView(this._view, false);
        }
        this._SafeStr_4623.startOpenFlow(param1);
    }

    public removeView(param1: ContextInfoView, param2: boolean): void {
        if (param1) {
            param1.hide(false);
            if (param1 == this._view) {
                this._view = null;
            }
        }
    }

    public update(param1: number): void {
        if (this._view && this._selectedObject) {
            this._view.update(this.handler.getObjectRectangle(this._selectedObject.getId()), this.handler.getObjectScreenLocation(this._selectedObject.getId()), param1);
        }
    }

    private removePlantSeedConfirmationView(): void {
        if (this._SafeStr_3086 != null) {
            this._SafeStr_3086.close();
        }
    }

    private onRoomObjectRemoved = (param1: RoomEngineObjectEvent): void => {
        let _loc2_: number = 0;
        if (param1.category == 10) {
            _loc2_ = param1.objectId;
            if (this._selectedObject != null && this._selectedObject.getId() == _loc2_) {
                this.removeView(this._view, false);
                this.removePlantSeedConfirmationView();
                this._component.removeUpdateReceiver(this);
                this._selectedObject = null;
            }
        }
    };

    get [IContextMenuParentWidget](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
