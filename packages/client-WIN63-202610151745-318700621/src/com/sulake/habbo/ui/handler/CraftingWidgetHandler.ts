import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { FurnitureProductItem } from '@/com/sulake/habbo/communication/messages/parser/crafting/FurnitureProductItem';
import type { HabboInventoryFurniListParsedEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryFurniListParsedEvent';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomDesktop } from '@/com/sulake/habbo/ui/RoomDesktop';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CraftableProductsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/crafting/CraftableProductsMessageEvent';
import { CraftingRecipeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/crafting/CraftingRecipeMessageEvent';
import { CraftingRecipesAvailableMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/crafting/CraftingRecipesAvailableMessageEvent';
import { CraftingResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/crafting/CraftingResultMessageEvent';
import { FurniListInvalidateEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListInvalidateEvent';
import { CraftComposer } from '@/com/sulake/habbo/communication/messages/outgoing/crafting/CraftComposer';
import { CraftSecretComposer } from '@/com/sulake/habbo/communication/messages/outgoing/crafting/CraftSecretComposer';
import { GetCraftableProductsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/crafting/GetCraftableProductsComposer';
import { GetCraftingRecipeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/crafting/GetCraftingRecipeComposer';
import { GetCraftingRecipesAvailableComposer } from '@/com/sulake/habbo/communication/messages/outgoing/crafting/GetCraftingRecipesAvailableComposer';
import { RequestFurniInventoryComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/furni/RequestFurniInventoryComposer';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class CraftingWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::CraftingWidgetHandler'); }

    private _disposed: boolean = false;

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: CraftingWidget;

    declare private _roomDesktop: RoomDesktop;

    declare private _SafeStr_3584: IMessageEvent;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_3274: number;
    static { (this.prototype as any)._SafeStr_3274 = 0; }

    declare private _SafeStr_4632: boolean;
    static { (this.prototype as any)._SafeStr_4632 = false; }

    declare private _SafeStr_4054: boolean;
    static { (this.prototype as any)._SafeStr_4054 = false; }

    declare private _craftingInProgress: boolean;
    static { (this.prototype as any)._craftingInProgress = false; }

    declare private _SafeStr_5359: IProductData;

    declare private _SafeStr_4549: string;

    constructor(param1: RoomDesktop) {
        this._roomDesktop = param1;
    }

    public dispose(): void {
        this.removeMessageEvents();
        this._widget = null;
        this._container = null;
        this._roomDesktop = null;
        this._SafeStr_5359 = null;
        this._SafeStr_4549 = null;
        this._disposed = true;
    }

    private addMessageEvents(): void {
        if (!this._container || !this._container.connection) {
            return;
        }
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new CraftableProductsMessageEvent(this.onCraftableProductsMessage));
        this._messageEvents.push(new CraftingRecipeMessageEvent(this.onCraftingRecipeMessage));
        this._messageEvents.push(new CraftingResultMessageEvent(this.onCraftingResultMessage));
        this._messageEvents.push(new CraftingRecipesAvailableMessageEvent(this.onCraftingRecipesAvailableMessage));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._container.connection.addMessageEvent(_loc1_);
        }
    }

    private removeMessageEvents(): void {
        if (!this._container || !this._container.connection || !this._messageEvents) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._container.connection.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this.removeInventoryUpdateEvent();
        if (this._container.inventory && this._container.inventory.events) {
            this._container.inventory.events.removeEventListener("HFLPE_FURNI_LIST_PARSED", this.onFurniListParsed);
        }
        this._messageEvents = null;
    }

    public initializeData(): void {
        if (this._SafeStr_4632) {
            return;
        }
        this._SafeStr_4632 = true;
        if (this._container.inventory.checkCategoryInitilization("furni")) {
            this.getCraftableProducts();
        }
    }

    private onFurniListParsed = (param1: HabboInventoryFurniListParsedEvent): void => {
        if (this._SafeStr_4632 && param1.category == "furni") {
            this.getCraftableProducts();
        }
    };

    private getCraftableProducts(): void {
        this._container.connection.send(new GetCraftableProductsComposer(this._SafeStr_3274));
    }

    private onCraftableProductsMessage = (param1: CraftableProductsMessageEvent): void => {
        this._SafeStr_4632 = false;
        if (!this._widget) {
            return;
        }
        if (!param1.getParser().hasData()) {
            this._widget.hide();
            return;
        }
        this._widget.showWidget();
        this._widget.showCraftingCategories(param1.getParser().recipeProductItems, param1.getParser().usableInventoryFurniClasses, this._container.roomEngine, this._container.sessionDataManager);
        this._SafeStr_4054 = false;
    };

    public getCraftingRecipe(param1: string, param2: string): void {
        this._SafeStr_5359 = this._container.sessionDataManager.getProductData(param2);
        this._SafeStr_4549 = param1;
        this._container.connection.send(new GetCraftingRecipeComposer(param1));
    }

    private onCraftingRecipeMessage = (param1: CraftingRecipeMessageEvent): void => {
        this._widget.showCraftingRecipe(param1.getParser().ingredients);
    };

    public getCraftingRecipesAvailable(param1: number[]): void {
        this._container.connection.send(new GetCraftingRecipesAvailableComposer(this._SafeStr_3274, param1));
    }

    private onCraftingRecipesAvailableMessage = (param1: CraftingRecipesAvailableMessageEvent): void => {
        this._widget.infoCtrl.craftingSecretRecipesAvailable(param1.getParser().count, param1.getParser().recipeComplete);
    };

    public doCraftingWithRecipe(): void {
        if (!this._SafeStr_5359 || !this._SafeStr_4549) {
            return;
        }
        this._widget.infoCtrl.setState(1000);
        this.registerForFurniListInvalidate();
        this._container.connection.send(new CraftComposer(this._SafeStr_3274, this._SafeStr_4549));
    }

    public doCraftingWithMixer(): void {
        this._widget.infoCtrl.setState(1000);
        let _loc1_: number[] = this._widget.getSelectedIngredients();
        this.registerForFurniListInvalidate();
        this._container.connection.send(new CraftSecretComposer(this._SafeStr_3274, _loc1_));
    }

    private onCraftingResultMessage = (param1: CraftingResultMessageEvent): void => {
        let _loc2_: FurnitureProductItem = null;
        let _loc3_: IFurnitureData = null;
        this._craftingInProgress = false;
        if (!param1.getParser().success) {
            this._widget.clearMixerItems();
            this._SafeStr_4054 = false;
            this.removeInventoryUpdateEvent();
            this._widget.setInfoState(1);
        } else {
            this._widget.clearMixerItems();
            _loc2_ = param1.getParser().productData;
            _loc3_ = this._container.sessionDataManager.getFloorItemDataByName(_loc2_.furnitureClassName);
            if (!_loc3_) {
                return;
            }
            this._widget.setInfoState(999, _loc3_);
        }
    };

    private registerForFurniListInvalidate(): void {
        this._SafeStr_4054 = true;
        if (this._SafeStr_3584 == null) {
            this._SafeStr_3584 = new FurniListInvalidateEvent(this.onFurniListInvalidate);
            this._container.connection.addMessageEvent(this._SafeStr_3584);
        }
    }

    private onFurniListInvalidate = (param1: FurniListInvalidateEvent): void => {
        this._container.connection.send(new RequestFurniInventoryComposer());
        this._container.connection.send(new GetCraftableProductsComposer(this._SafeStr_3274));
        this.removeInventoryUpdateEvent();
    };

    public removeInventoryUpdateEvent(): void {
        if (this._SafeStr_3584) {
            this._container.connection.removeMessageEvent(this._SafeStr_3584);
            this._SafeStr_3584 = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_CRAFTING";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this.addMessageEvents();
        if (this._container.inventory && this._container.inventory.events) {
            this._container.inventory.events.addEventListener("HFLPE_FURNI_LIST_PARSED", this.onFurniListParsed);
        }
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set widget(param1: CraftingWidget) {
        this._widget = param1;
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RETWE_OPEN_WIDGET", "RETWE_CLOSE_WIDGET"];
    }

    public processEvent(param1: Event): void {
        if (this._container.roomEngine == null || this._widget == null) {
            return;
        }
        let _loc3_: RoomEngineToWidgetEvent = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IRoomObject = this._container.roomEngine.getRoomObject(_loc3_.roomId, _loc3_.objectId, _loc3_.category);
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                if (this._widget.window != null) {
                    return;
                }
                if (_loc2_ != null) {
                    this._SafeStr_3274 = _loc2_.getId();
                    this.initializeData();
                }
                break;
            case "RETWE_CLOSE_WIDGET":
                this._SafeStr_3274 = -1;
                this._widget.hide();
        }
    }

    public get isOwner(): boolean {
        let _loc1_: number = this._container.roomEngine.activeRoomId;
        let _loc2_: IRoomObject = this._container.roomEngine.getRoomObject(_loc1_, this._SafeStr_3274, 10);
        return _loc2_ != null && this._container.isOwnerOfFurniture(_loc2_);
    }

    public get craftingInProgress(): boolean {
        return this._craftingInProgress;
    }

    public set craftingInProgress(param1: boolean) {
        this._craftingInProgress = param1;
    }

    public get inventoryDirty(): boolean {
        return this._SafeStr_4054;
    }

    public update(): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
