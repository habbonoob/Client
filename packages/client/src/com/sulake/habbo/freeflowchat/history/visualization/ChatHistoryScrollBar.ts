import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChatHistoryScrollView } from '@/com/sulake/habbo/freeflowchat/history/visualization/ChatHistoryScrollView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';

export class ChatHistoryScrollBar {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization::ChatHistoryScrollBar'); }

    public static readonly RIGHT_MARGIN: number = 0;

    constructor(param1: ChatHistoryScrollView, param2: HabboFreeFlowChat) {
        this._SafeStr_2361 = param1;
        this._SafeStr_2817 = HabboFreeFlowChat.create9SliceSprite(new Rectangle(2, 2, 1, 1), asInstanceOf(param2.assets.getAssetByName("scrollbar_thumb").content, BitmapData));
        this._SafeStr_2817.x = 2;
        this._SafeStr_2817.y = 2;
        this._background = HabboFreeFlowChat.create9SliceSprite(new Rectangle(2, 2, 5, 5), asInstanceOf(param2.assets.getAssetByName("scrollbar_back").content, BitmapData));
        this._displayObject = new Sprite();
        this._displayObject.addChild(this._background);
        this._displayObject.addChild(this._SafeStr_2817);
        this._SafeStr_2817.addEventListener("addedToStage", this.onAddedToStage);
        this._SafeStr_2817.addEventListener("removedFromStage", this.onRemovedFromStage);
        this._SafeStr_2817.addEventListener("mouseDown", this.mouseDownEventHandler);
    }

    declare private _SafeStr_2361: ChatHistoryScrollView;

    declare private _background: Sprite;

    declare private _SafeStr_2817: Sprite;

    declare private _SafeStr_5599: number;
    static { (this.prototype as any)._SafeStr_5599 = 0; }

    declare private _SafeStr_6782: number;
    static { (this.prototype as any)._SafeStr_6782 = 0; }

    declare private _SafeStr_2569: Stage;

    declare private _displayObject: Sprite;

    public get displayObject(): Sprite {
        return this._displayObject;
    }

    public set height(param1: number) {
        this._background.height = param1;
        this.updateThumbTrack();
    }

    public updateThumbTrack(): void {
        let _loc1_: number = this._SafeStr_2361.topY + (this._SafeStr_2361.viewPort.height - this._background.height) | 0;
        this._SafeStr_2817.height = Math.min(this._background.height - 4, Math.max(5, (this._background.height - 4) * (this._background.height / this._SafeStr_2361.bufferHeight) | 0));
        this._SafeStr_2817.y = Math.min(this._background.height - 2 - this._SafeStr_2817.height, Math.max(2, (this._background.height - 4) * (Math.max(1, _loc1_) / this._SafeStr_2361.bufferHeight) - this._SafeStr_2817.height / 2 | 0));
    }

    public endScroll(): void {
        if (this._SafeStr_2569) {
            this._SafeStr_2569.removeEventListener("mouseUp", this.mouseDragEventHandler);
            this._SafeStr_2569.removeEventListener("mouseMove", this.mouseDragEventHandler);
        }
    }

    private onAddedToStage = (param1: Event): void => {
        this._SafeStr_2569 = this._SafeStr_2817.stage;
    };

    private onRemovedFromStage = (param1: Event): void => {
        this._SafeStr_2569 = null;
    };

    private mouseDownEventHandler = (param1: Event): void => {
        this._SafeStr_5599 = castTo(param1, MouseEvent).stageY | 0;
        this._SafeStr_6782 = this._SafeStr_2361.topY;
        this._SafeStr_2569.addEventListener("mouseUp", this.mouseDragEventHandler);
        this._SafeStr_2569.addEventListener("mouseMove", this.mouseDragEventHandler);
        param1.stopImmediatePropagation();
    };

    private mouseDragEventHandler = (param1: Event): void => {
        let _loc4_: number = NaN;
        let _loc2_: number = 0;
        let _loc3_: MouseEvent = castTo(param1, MouseEvent);
        switch (_loc3_.type) {
            case "mouseMove":
                _loc4_ = this._SafeStr_2361.bufferHeight / this._background.height;
                _loc2_ = (_loc3_.stageY - this._SafeStr_5599) * _loc4_ | 0;
                this._SafeStr_2361.topY = this._SafeStr_6782 + _loc2_;
                break;
            case "mouseUp":
                this.endScroll();
        }
        param1.stopImmediatePropagation();
    };
}
