import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomDesktop } from '@/com/sulake/habbo/ui/RoomDesktop';
import type { CameraWidget } from '@/com/sulake/habbo/ui/widget/camera/CameraWidget';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CameraPublishStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CameraPublishStatusMessageEvent';
import { CameraPurchaseOKMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CameraPurchaseOKMessageEvent';
import { CameraStorageUrlMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CameraStorageUrlMessageEvent';
import { CompetitionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CompetitionStatusMessageEvent';
import { InitCameraMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/InitCameraMessageEvent';
import { InitCameraMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/InitCameraMessageComposer';
import { PhotoCompetitionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/PhotoCompetitionMessageComposer';
import { PublishPhotoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/PublishPhotoMessageComposer';
import { PurchasePhotoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/PurchasePhotoMessageComposer';
import { RenderRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomMessageComposer';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class CameraWidgetHandler implements IRoomWidgetHandler, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::CameraWidgetHandler'); }

    constructor(param1: RoomDesktop) {
        this._roomDesktop = param1;
        this._SafeStr_4772 = new CameraStorageUrlMessageEvent(this.onCameraStorageUrlEvent);
        this._SafeStr_4854 = new CameraPurchaseOKMessageEvent(this.onPurchaseOK);
        this._SafeStr_5353 = new CameraPublishStatusMessageEvent(this.onPublishStatus);
        this._SafeStr_5227 = new CompetitionStatusMessageEvent(this.onCompetitionStatus);
        this._SafeStr_4863 = new InitCameraMessageEvent(this.onInitCameraEvent);
    }

    declare private _widget: CameraWidget;

    declare private _SafeStr_4772: CameraStorageUrlMessageEvent;

    declare private _SafeStr_4854: CameraPurchaseOKMessageEvent;

    declare private _SafeStr_5353: CameraPublishStatusMessageEvent;

    declare private _SafeStr_5227: CompetitionStatusMessageEvent;

    declare private _SafeStr_4863: InitCameraMessageEvent;

    declare private _roomDesktop: RoomDesktop;

    private _creditPrice: number = 999;
    private _ducketPrice: number = 999;
    private _publishDucketPrice: number = 999;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container && this._container.toolbar) {
            this._container.toolbar.events.removeEventListener("HTE_ICON_CAMERA", this.onCameraRequested);
        }
        if (this._container && this._container.connection) {
            this._container.connection.removeMessageEvent(this._SafeStr_4772);
            this._container.connection.removeMessageEvent(this._SafeStr_4854);
            this._container.connection.removeMessageEvent(this._SafeStr_5353);
            this._container.connection.removeMessageEvent(this._SafeStr_5227);
            this._container.connection.removeMessageEvent(this._SafeStr_4863);
        }
        this._container = param1;
        if (this._container && this._container.toolbar) {
            this._container.toolbar.events.addEventListener("HTE_ICON_CAMERA", this.onCameraRequested);
        }
        if (this._container) {
            this._container.connection.addMessageEvent(this._SafeStr_4772);
            this._container.connection.addMessageEvent(this._SafeStr_4854);
            this._container.connection.addMessageEvent(this._SafeStr_5353);
            this._container.connection.addMessageEvent(this._SafeStr_5227);
            this._container.connection.addMessageEvent(this._SafeStr_4863);
        }
    }

    public get creditPrice(): number {
        return this._creditPrice;
    }

    public get ducketPrice(): number {
        return this._ducketPrice;
    }

    public get publishDucketPrice(): number {
        return this._publishDucketPrice;
    }

    public get type(): string {
        return "RWE_CAMERA";
    }

    public get roomDesktop(): RoomDesktop {
        return this._roomDesktop;
    }

    public set roomDesktop(param1: RoomDesktop) {
        this._roomDesktop = param1;
    }

    public set widget(param1: CameraWidget) {
        this._widget = param1;
    }

    public sendInitCameraMessage(): void {
        if (this._container.sessionDataManager.isPerkAllowed("CAMERA")) {
            this._container.connection.send(new InitCameraMessageComposer());
        }
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
    }

    public dispose(): void {
        if (this._container && this.container.connection) {
            this._container.connection.removeMessageEvent(this._SafeStr_4772);
            this._container.connection.removeMessageEvent(this._SafeStr_4854);
            this._container.connection.removeMessageEvent(this._SafeStr_5353);
            this._container.connection.removeMessageEvent(this._SafeStr_5227);
            this._container.connection.removeMessageEvent(this._SafeStr_4863);
        }
        this._disposed = true;
        this._container = null;
        this._roomDesktop = null;
        this._widget = null;
    }

    public confirmPhotoPurchase(): void {
        this._container.connection.send(new PurchasePhotoMessageComposer());
    }

    public confirmPhotoPublish(): void {
        this._container.connection.send(new PublishPhotoMessageComposer());
    }

    public confirmPhotoCompetitionSubmit(): void {
        this._container.connection.send(new PhotoCompetitionMessageComposer());
    }

    public collectPhotoData(): RenderRoomMessageComposer {
        if (this._roomDesktop == null) {
            return null;
        }
        return asInstanceOf(this._roomDesktop.roomEngine.getRenderRoomMessage(this._widget.getViewPort(), this._roomDesktop.roomBackgroundColor), RenderRoomMessageComposer);
    }

    public sendPhotoData(param1: RenderRoomMessageComposer): void {
        this._container.connection.send(param1);
    }

    private onInitCameraEvent = (param1: InitCameraMessageEvent): void => {
        this._creditPrice = param1.getParser().getCreditPrice();
        this._ducketPrice = param1.getParser().getDucketPrice();
        this._publishDucketPrice = param1.getParser().getPublishDucketPrice();
    };

    private onPurchaseOK = (param1: CameraPurchaseOKMessageEvent): void => {
        if (this._widget) {
            this._widget.purchaseSuccessful();
        }
    };

    private onPublishStatus = (param1: CameraPublishStatusMessageEvent): void => {
        if (this._widget) {
            this._widget.publishingStatus(param1);
        }
    };

    private onCompetitionStatus = (param1: CompetitionStatusMessageEvent): void => {
        if (this._widget) {
            this._widget.competitionStatus(param1);
        }
    };

    private onCameraStorageUrlEvent = (param1: CameraStorageUrlMessageEvent): void => {
        if (!this._widget) {
            return;
        }
        let _loc2_: string = param1.getParser().url;
        this._widget.setRenderedPhotoUrl(_loc2_);
    };

    public processEvent(param1: Event): void {
    }

    private onCameraRequested = (param1: HabboToolbarEvent): void => {
        if (param1.type == "HTE_ICON_CAMERA") {
            if (this._widget) {
                this._widget.startTakingPhoto(param1.iconName);
            }
        }
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
