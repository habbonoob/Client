import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';

export class FriendNotification implements IFriendNotification {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.data::FriendNotification'); }

    public static readonly TYPE_MESSENGER: number = -1;
    public static readonly _SafeStr_8289: number = 0;
    public static readonly _SafeStr_7963: number = 1;
    public static readonly TYPE_QUEST: number = 2;
    public static readonly TYPE_PLAYING_GAME: number = 3;
    public static readonly TYPE_FINISHED_GAME: number = 4;
    private _typeCode: number = -1;

    declare private _message: string;

    declare private _viewOnce: boolean;
    static { (this.prototype as any)._viewOnce = false; }

    constructor(param1: number, param2: string, param3: boolean) {
        this._typeCode = param1;
        this._message = param2;
        this._viewOnce = param3;
    }

    public static typeCodeToString(param1: number): string {
        switch (param1 - -1) {
            case 0:
                return "instant_message";
            case 1:
                return "room_event";
            case 2:
                return "achievement";
            case 3:
                return "quest";
            case 4:
                return "playing_game";
            case 5:
                return "finished_game";
            default:
                return "unknown";
        }
    }

    public get typeCode(): number {
        return this._typeCode;
    }

    public set typeCode(param1: number) {
        this._typeCode = param1;
    }

    public get message(): string {
        return this._message;
    }

    public set message(param1: string) {
        this._message = param1;
    }

    public get viewOnce(): boolean {
        return this._viewOnce;
    }

    public set viewOnce(param1: boolean) {
        this._viewOnce = param1;
    }
}
