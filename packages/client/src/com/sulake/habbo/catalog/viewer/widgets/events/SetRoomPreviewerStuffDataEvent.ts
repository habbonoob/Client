import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SetRoomPreviewerStuffDataEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::SetRoomPreviewerStuffDataEvent'); }

    constructor(param1: IStuffData, param2: boolean = false, param3: boolean = false) {
        super("CWE_SET_PREVIEWER_STUFFDATA", param2, param3);
        this._stuffData = param1;
    }

    declare private _stuffData: IStuffData;

    public get stuffData(): IStuffData {
        return this._stuffData;
    }
}
