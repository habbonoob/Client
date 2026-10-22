import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionWordQuizEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionWordQuizEvent'); }

    public static readonly _SafeStr_7512: string = "RWPUW_NEW_QUESTION";
    public static readonly FINISHED: string = "RWPUW_QUESION_FINSIHED";
    public static readonly _SafeStr_7534: string = "RWPUW_QUESTION_ANSWERED";
    private _id: number = -1;
    private _SafeStr_5320: string = null;
    private _pollId: number = -1;
    private _questionId: number = -1;
    private _duration: number = -1;
    private _question: Map<any, any> = null;
    private _userId: number = -1;

    declare private _value: string;

    declare private _answerCounts: UtilsMap;

    constructor(param1: string, param2: IRoomSession, param3: number = -1) {
        super(param1, param2);
        this._id = param3;
    }

    public get id(): number {
        return this._id;
    }

    public get pollType(): string {
        return this._SafeStr_5320;
    }

    public set pollType(param1: string) {
        this._SafeStr_5320 = param1;
    }

    public get pollId(): number {
        return this._pollId;
    }

    public set pollId(param1: number) {
        this._pollId = param1;
    }

    public get questionId(): number {
        return this._questionId;
    }

    public set questionId(param1: number) {
        this._questionId = param1;
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(param1: number) {
        this._duration = param1;
    }

    public get question(): Map<any, any> {
        return this._question;
    }

    public set question(param1: Map<any, any>) {
        this._question = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(param1: number) {
        this._userId = param1;
    }

    public get value(): string {
        return this._value;
    }

    public set value(param1: string) {
        this._value = param1;
    }

    public get answerCounts(): UtilsMap {
        return this._answerCounts;
    }

    public set answerCounts(param1: UtilsMap) {
        this._answerCounts = param1;
    }
}
