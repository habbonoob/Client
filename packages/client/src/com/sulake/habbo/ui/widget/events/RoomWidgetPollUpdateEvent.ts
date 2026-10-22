import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPollUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPollUpdateEvent'); }

    public static readonly OFFER: string = "RWPUW_OFFER";
    public static readonly ERROR: string = "RWPUW_ERROR";
    public static readonly CONTENT: string = "RWPUW_CONTENT";

    constructor(param1: number, param2: string, param3: boolean = false, param4: boolean = false) {
        super(param2, param3, param4);
        this._id = param1;
    }

    private _id: number = -1;

    declare private _summary: string;

    private _numQuestions: number = 0;
    private _SafeStr_6211: string = "";
    private _npsPoll: boolean = false;

    declare private _headline: string;

    public get headline(): string {
        return this._headline;
    }

    public set headline(param1: string) {
        this._headline = param1;
    }

    private _startMessage: string = "";

    public get startMessage(): string {
        return this._startMessage;
    }

    public set startMessage(param1: string) {
        this._startMessage = param1;
    }

    private _endMessage: string = "";

    public get endMessage(): string {
        return this._endMessage;
    }

    public set endMessage(param1: string) {
        this._endMessage = param1;
    }

    private _questionArray: any[] = null;

    public get questionArray(): any[] {
        return this._questionArray;
    }

    public set questionArray(param1: any[]) {
        this._questionArray = param1;
    }

    public get id(): number {
        return this._id;
    }

    public get summary(): string {
        return this._summary;
    }

    public set summary(param1: string) {
        this._summary = param1;
    }

    public get numQuestions(): number {
        return this._numQuestions;
    }

    public set numQuestions(param1: number) {
        this._numQuestions = param1;
    }

    public get pollType(): string {
        return this._SafeStr_6211;
    }

    public set pollType(param1: string) {
        this._SafeStr_6211 = param1;
    }

    public get npsPoll(): boolean {
        return this._npsPoll;
    }

    public set npsPoll(param1: boolean) {
        this._npsPoll = param1;
    }
}
