import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChatBubbleSimulationEntity } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatBubbleSimulationEntity';

export class ChatBubbleCollisionEvent {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.simulation::ChatBubbleCollisionEvent'); }

    constructor(param1: ChatBubbleSimulationEntity, param2: ChatBubbleSimulationEntity) {
        this._first = param1;
        this._second = param2;
    }

    declare private _first: ChatBubbleSimulationEntity;

    declare private _second: ChatBubbleSimulationEntity;

    public get first(): ChatBubbleSimulationEntity {
        return this._first;
    }

    public get second(): ChatBubbleSimulationEntity {
        return this._second;
    }

    public get top(): ChatBubbleSimulationEntity {
        return this._first.y < this._second.y ? this._first : this._second;
    }

    public get bottom(): ChatBubbleSimulationEntity {
        return this._first.y >= this._second.y ? this._first : this._second;
    }

    public get left(): ChatBubbleSimulationEntity {
        return this._first.x < this._second.x ? this._first : this._second;
    }

    public get right(): ChatBubbleSimulationEntity {
        return this._first.x >= this._second.x ? this._first : this._second;
    }

    public get areSameY(): boolean {
        return (this._first.y | 0) == (this._second.y | 0);
    }

    public get older(): ChatBubbleSimulationEntity {
        return this._first.timeStamp < this._second.timeStamp ? this._first : this._second;
    }
}
