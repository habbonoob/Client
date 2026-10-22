import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetPollMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetPollMessage'); }

    public static readonly START: string = "RWPM_START";
    public static readonly REJECT: string = "RWPM_REJECT";
    public static readonly ANSWER: string = "RWPM_ANSWER";

    constructor(param1: string, param2: number) {
        super(param1);
        this._id = param2;
    }

    private _id: number = -1;
    private _questionId: number = 0;
    private _answers: any[] = null;

    public get answers(): any[] {
        return this._answers;
    }

    public set answers(param1: any[]) {
        this._answers = param1;
    }

    public get id(): number {
        return this._id;
    }

    public get questionId(): number {
        return this._questionId;
    }

    public set questionId(param1: number) {
        this._questionId = param1;
    }
}
