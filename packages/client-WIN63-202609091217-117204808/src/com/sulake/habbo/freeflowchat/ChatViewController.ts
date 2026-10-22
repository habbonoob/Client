import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { ChatHistoryTray } from '@/com/sulake/habbo/freeflowchat/history/visualization/ChatHistoryTray';
import type { ChatFlowViewer } from '@/com/sulake/habbo/freeflowchat/viewer/ChatFlowViewer';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ChatViewController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat::ChatViewController'); }

    declare private _rootDisplayObject: DisplayObjectContainer;

    declare private _SafeStr_2569: Stage;

    declare private _component: HabboFreeFlowChat;

    declare private _SafeStr_5853: ChatFlowViewer;

    declare private _pulldown: ChatHistoryTray;

    declare private _flowViewerDisplayObject: DisplayObject;

    declare private _pulldownDisplayObject: DisplayObject;

    constructor(param1: HabboFreeFlowChat, param2: ChatFlowViewer, param3: ChatHistoryTray) {
        this._component = param1;
        this._SafeStr_5853 = param2;
        this._pulldown = param3;
        this._flowViewerDisplayObject = this._SafeStr_5853.rootDisplayObject;
        this._pulldownDisplayObject = this._pulldown.rootDisplayObject;
        this._rootDisplayObject = new Sprite();
        this._rootDisplayObject.addChild(this._flowViewerDisplayObject);
        this._rootDisplayObject.addChild(this._pulldownDisplayObject);
        this._rootDisplayObject.addEventListener("addedToStage", this.onAddedToStage);
    }

    public dispose(): void {
        if (this._rootDisplayObject) {
            if (this._SafeStr_2569) {
                this._SafeStr_2569.removeEventListener("resize", this.onStageResized);
            }
            this._rootDisplayObject.removeChild(this._pulldownDisplayObject);
            this._rootDisplayObject.removeChild(this._flowViewerDisplayObject);
            this._rootDisplayObject.removeEventListener("addedToStage", this.onAddedToStage);
            this._rootDisplayObject = null;
            this._pulldownDisplayObject = null;
            this._flowViewerDisplayObject = null;
        }
    }

    public get disposed(): boolean {
        return this._rootDisplayObject == null;
    }

    public get rootDisplayObject(): DisplayObject {
        return this._rootDisplayObject;
    }

    private onAddedToStage = (param1: Event): void => {
        this._SafeStr_2569 = this._rootDisplayObject.stage;
        this._SafeStr_2569.addEventListener("resize", this.onStageResized);
        this._pulldown.resize(this._SafeStr_2569.stageWidth, this._SafeStr_2569.stageHeight);
    };

    private onStageResized = (param1: Event): void => {
        this._pulldown.resize(this._SafeStr_2569.stageWidth, this._SafeStr_2569.stageHeight);
        this._SafeStr_5853.resize(this._SafeStr_2569.stageWidth, this._SafeStr_2569.stageHeight);
    };

    get [IDisposable](): true {
        return true;
    }
}
