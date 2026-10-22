import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { ChatFlowStage } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatFlowStage';
import type { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';

export class ChatFlowViewer implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer::ChatFlowViewer'); }

    private readonly VIEW_BOTTOM_DEFAULT: number = 230;

    constructor(param1: HabboFreeFlowChat, param2: ChatFlowStage) {
        this._rootDisplayObject = new Sprite();
        this._component = param1;
        this._component.registerUpdateReceiver(this, 1);
        this._SafeStr_2608 = param2;
    }

    declare private _component: HabboFreeFlowChat;

    declare private _SafeStr_2608: ChatFlowStage;

    declare private _SafeStr_6388: number;
    static { (this.prototype as any)._SafeStr_6388 = 0; }

    private _SafeStr_5637: number = 0;
    private _runTime: number = 0;
    private _SafeStr_7539: number = 0.25;
    private _bubbles: PooledChatBubble[] = new Array<PooledChatBubble>(0).fill(null);
    private _toRemove: PooledChatBubble[] = new Array<PooledChatBubble>(0).fill(null);

    declare private _rootDisplayObject: DisplayObjectContainer;

    public get rootDisplayObject(): DisplayObjectContainer {
        return this._rootDisplayObject;
    }

    public get disposed(): boolean {
        return this._rootDisplayObject == null && this._component == null;
    }

    public get viewBottom(): number {
        if (!this._rootDisplayObject.stage) {
            return 230;
        }
        return this._rootDisplayObject.stage.stageHeight * this._SafeStr_7539 | 0;
    }

    public dispose(): void {
        if (this._component) {
            this._component.removeUpdateReceiver(this);
            this._component = null;
        }
        this._SafeStr_2608 = null;
        this._rootDisplayObject = null;
    }

    public insertBubble(param1: PooledChatBubble, param2: Point): void {
        param1.roomPanOffsetX = this._SafeStr_5637;
        this._bubbles.push(param1);
        this._rootDisplayObject.addChild(param1);
        param1.warpTo(param2.x | 0, param2.y | 0);
        param1.repositionPointer();
        this._SafeStr_6388 = param1.roomId;
    }

    public update(param1: number): void {
        let _loc6_: number = 0;
        this._runTime += param1;
        let _loc3_: Point = this._component.roomEngine.getRoomCanvasScreenOffset(this._SafeStr_6388);
        if (_loc3_ != null) {
            if (_loc3_.x != this._SafeStr_5637 && this._bubbles.length > 0) {
                for (const _loc2_ of this._bubbles ?? []) {
                    _loc2_.roomPanOffsetX = _loc3_.x | 0;
                }
            }
            this._SafeStr_5637 = _loc3_.x | 0;
        }
        for (const _loc4_ of this._bubbles ?? []) {
            _loc4_.update(param1);
            if (_loc4_.readyToRecycle) {
                this._toRemove.push(_loc4_);
            }
        }
        if (this._toRemove.length > 0) {
            for (const _loc5_ of this._toRemove ?? []) {
                this._rootDisplayObject.removeChild(_loc5_);
                _loc6_ = this._bubbles.indexOf(_loc5_);
                this._bubbles.splice(_loc6_, 1);
                _loc5_.unregister();
                this._component.chatBubbleFactory.recycle(_loc5_);
            }
            this._toRemove = new Array<PooledChatBubble>(0).fill(null);
        }
    }

    public resize(param1: number, param2: number): void {
        if (this._SafeStr_2608) {
            this._SafeStr_2608.resize(param1, param2);
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
