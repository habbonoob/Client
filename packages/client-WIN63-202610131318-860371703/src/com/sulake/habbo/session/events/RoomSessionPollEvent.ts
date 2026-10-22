import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPollEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPollEvent'); }

    public static readonly OFFER: string = "RSPE_POLL_OFFER";
    public static readonly ERROR: string = "RSPE_POLL_ERROR";
    public static readonly CONTENT: string = "RSPE_POLL_CONTENT";
    private _id: number = -1;

    declare private _headline: string;

    declare private _SafeStr_5145: string;

    private _numQuestions: number = 0;
    private _startMessage: string = "";
    private _endMessage: string = "";
    private _questionArray: any[] = null;
    private _npsPoll: boolean = false;

    constructor(param1: string, param2: IRoomSession, param3: number) {
        super(param1, param2);
        this._id = param3;
    }

    public get id(): number {
        return this._id;
    }

    public get headline(): string {
        return this._headline;
    }

    public set headline(param1: string) {
        this._headline = param1;
    }

    public get summary(): string {
        return this._SafeStr_5145;
    }

    public set summary(param1: string) {
        this._SafeStr_5145 = param1;
    }

    public get numQuestions(): number {
        return this._numQuestions;
    }

    public set numQuestions(param1: number) {
        this._numQuestions = param1;
    }

    public get startMessage(): string {
        return this._startMessage;
    }

    public set startMessage(param1: string) {
        this._startMessage = param1;
    }

    public get endMessage(): string {
        return this._endMessage;
    }

    public set endMessage(param1: string) {
        this._endMessage = param1;
    }

    public get questionArray(): any[] {
        return this._questionArray;
    }

    public set questionArray(param1: any[]) {
        this._questionArray = param1;
    }

    public get npsPoll(): boolean {
        return this._npsPoll;
    }

    public set npsPoll(param1: boolean) {
        this._npsPoll = param1;
    }
}
