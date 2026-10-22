import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPollEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPollEvent'); }

    public static readonly OFFER: string = "RSPE_POLL_OFFER";
    public static readonly ERROR: string = "RSPE_POLL_ERROR";
    public static readonly CONTENT: string = "RSPE_POLL_CONTENT";

    constructor(param1: string, param2: IRoomSession, param3: number) {
        super(param1, param2);
        this._id = param3;
    }

    private _id: number = -1;

    declare private _summary: string;

    private _numQuestions: number = 0;
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

    public get npsPoll(): boolean {
        return this._npsPoll;
    }

    public set npsPoll(param1: boolean) {
        this._npsPoll = param1;
    }
}
