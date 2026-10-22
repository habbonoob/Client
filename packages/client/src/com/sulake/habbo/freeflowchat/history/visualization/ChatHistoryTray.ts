import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { ChatHistoryScrollView } from '@/com/sulake/habbo/freeflowchat/history/visualization/ChatHistoryScrollView';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';

export class ChatHistoryTray implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization::ChatHistoryTray'); }

    constructor(param1: HabboFreeFlowChat, param2: ChatHistoryScrollView) {
        this._component = param1;
        this._SafeStr_2361 = param2;
        this._rootDisplayObject = new Sprite();
        this._SafeStr_2526 = new Bitmap();
        this._SafeStr_2526.bitmapData = castTo(this._component.assets.getAssetByName("tray_bar").content, BitmapData);
        this._SafeStr_2526.width = this._SafeStr_2526.bitmapData.width;
        this._SafeStr_2526.height = 0;
        this._SafeStr_2526.scaleX = 1;
        this._SafeStr_2526.x = -this._SafeStr_2526.bitmapData.width;
        this._SafeStr_2295 = new Bitmap();
        this._SafeStr_2295.bitmapData = castTo(this._component.assets.getAssetByName("tray_handle_open").content, BitmapData);
        this._SafeStr_2295.scaleX = 1;
        this._SafeStr_2295.scaleY = 1;
        this._SafeStr_2295.x = -0;
        this._SafeStr_2295.y = 350;
        this._SafeStr_2295.visible = false;
        this._tab = new Sprite();
        this._tab.scaleX = 1;
        this._tab.scaleY = 1;
        this._tab.visible = true;
        this._tab.addChild(this._SafeStr_2526);
        this._tab.addChild(this._SafeStr_2295);
        this._rootDisplayObject.addChild(this._tab);
        this._bg = new Bitmap();
        this._bg.bitmapData = new BitmapData(1, 1, true, 2720277278);
        this._bg.width = 0;
        this._bg.height = 0;
        this._rootDisplayObject.addChild(this._bg);
        this._rootDisplayObject.addEventListener("addedToStage", this.onAddedToStage);
        this._openedWidth = 350 + 62 + 1;
    }

    declare private _SafeStr_2569: Stage;

    declare private _component: HabboFreeFlowChat;

    declare private _SafeStr_2361: ChatHistoryScrollView;

    declare private _tab: Sprite;

    declare private _SafeStr_2526: Bitmap;

    declare private _SafeStr_2295: Bitmap;

    declare private _bg: Bitmap;

    declare private _openedWidth: number;
    static { (this.prototype as any)._openedWidth = 0; }

    private _flagUpdateDisableRoomMouseEvents: boolean = false;

    declare private _rootDisplayObject: DisplayObjectContainer;

    public get rootDisplayObject(): DisplayObjectContainer {
        return this._rootDisplayObject;
    }

    public get disposed(): boolean {
        return this._rootDisplayObject == null;
    }

    public set visible(param1: boolean) {
        if (this._SafeStr_2361.isActive && !param1 || !this._SafeStr_2361.isActive && param1) {
            this.toggleHistoryVisibility();
        }
    }

    public dispose(): void {
        this._component.disableRoomMouseEventsLeftOfX(0);
        if (this._rootDisplayObject) {
            this._rootDisplayObject.removeEventListener("addedToStage", this.onAddedToStage);
            this._SafeStr_2361.deactivateScrolling();
            if (this._SafeStr_2569) {
                this._SafeStr_2569.removeEventListener("click", this.stageMouseClickedEventHandler);
            }
        }
        this._rootDisplayObject = null;
    }

    public resize(param1: number, param2: number): void {
        this._tab.height = param2 - 50;
        this._SafeStr_2526.height = param2 - 50;
        this._bg.height = param2 - 50;
        this._tab.scaleY = 1;
        this._SafeStr_2295.scaleY = 1;
        this._SafeStr_2295.y = param2 - 215;
    }

    public toggleHistoryVisibility(): void {
        if (this._rootDisplayObject == null || this._SafeStr_2361 == null) {
            return;
        }
        if (this._SafeStr_2361.isActive) {
            this._SafeStr_2361.deactivateScrolling();
            if (this._SafeStr_2361.rootDisplayObject.parent == this._rootDisplayObject) {
                this._rootDisplayObject.removeChild(this._SafeStr_2361.rootDisplayObject);
            }
            this._SafeStr_2361.deactivateView();
            this._bg.width = 0;
            this._SafeStr_2526.x = -this._SafeStr_2526.bitmapData.width;
            this._SafeStr_2295.x = -0;
            this._SafeStr_2295.visible = false;
            this._SafeStr_2361.viewWidth = 0;
            this._SafeStr_2295.bitmapData = castTo(this._component.assets.getAssetByName("tray_handle_open").content, BitmapData);
        } else {
            if (this._SafeStr_2361.rootDisplayObject.parent != this._rootDisplayObject) {
                this._rootDisplayObject.addChild(this._SafeStr_2361.rootDisplayObject);
            }
            this._SafeStr_2361.scrollToBottom();
            this._SafeStr_2361.activateScrolling();
            this._SafeStr_2361.activateView();
            this._bg.width = this._openedWidth;
            this._SafeStr_2526.x = this._openedWidth;
            this._SafeStr_2295.visible = true;
            this._SafeStr_2295.x = this._openedWidth - 0 + this._SafeStr_2526.bitmapData.width;
            this._SafeStr_2361.viewWidth = this._openedWidth;
            this._SafeStr_2295.bitmapData = castTo(this._component.assets.getAssetByName("tray_handle_close").content, BitmapData);
        }
        this._flagUpdateDisableRoomMouseEvents = true;
    }

    public update(param1: number): void {
        if (this._flagUpdateDisableRoomMouseEvents && param1 > 20) {
            this._component.disableRoomMouseEventsLeftOfX(!this._SafeStr_2361.isActive ? 0 : this._openedWidth + this._SafeStr_2526.bitmapData.width);
            this._flagUpdateDisableRoomMouseEvents = false;
        }
    }

    private onAddedToStage = (param1: Event): void => {
        this.resize(this._rootDisplayObject.stage.stageWidth, this._rootDisplayObject.stage.stageHeight);
        this._rootDisplayObject.stage.addEventListener("click", this.stageMouseClickedEventHandler);
        this._SafeStr_2569 = this._rootDisplayObject.stage;
    };

    private stageMouseClickedEventHandler = (param1: Event): void => {
        if (!this._rootDisplayObject || !this._rootDisplayObject.stage) {
            return;
        }
        let _loc2_: MouseEvent = castTo(param1, MouseEvent);
        if (this._SafeStr_2361.isActive && this._SafeStr_2295.x <= _loc2_.stageX && _loc2_.stageX <= this._SafeStr_2295.x + this._SafeStr_2295.width && this._SafeStr_2295.y <= _loc2_.stageY && _loc2_.stageY <= this._SafeStr_2295.y + this._SafeStr_2295.height) {
            this.toggleHistoryVisibility();
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
