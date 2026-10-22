import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ChatlineData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ChatlineData';

export class ChatRecordData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ChatRecordData'); }

    public static readonly _SafeStr_7731: number = 0;
    public static readonly _SafeStr_8080: number = 1;
    public static readonly _SafeStr_8274: number = 2;
    public static readonly _SafeStr_7687: number = 3;
    public static readonly _SafeStr_7782: number = 4;
    public static readonly TYPE_SELFIE: number = 5;
    public static readonly _SafeStr_8219: number = 6;

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc3_: string = null;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        this._context = new Dictionary();
        this._chatlog = [];
        this._recordType = param1.readByte();
        let _loc2_: number = param1.readShort();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = param1.readString();
            switch (_loc6_ = param1.readByte()) {
                case 0:
                    this._context.set(_loc3_, param1.readBoolean());
                    break;
                case 1:
                    this._context.set(_loc3_, param1.readInteger());
                    break;
                case 2:
                    this._context.set(_loc3_, param1.readString());
                    break;
                default:
                    throw new Error("Unknown data type " + _loc6_);
            }
            _loc4_++;
        }
        let _loc7_: number = param1.readShort();
        _loc5_ = 0;
        while (_loc5_ < _loc7_) {
            this._chatlog.push(new ChatlineData(param1));
            _loc5_++;
        }
    }

    declare private _recordType: number;
    static { (this.prototype as any)._recordType = 0; }

    declare private _chatlog: any[];

    declare private _context: Map<any, any>;

    public get context(): Map<any, any> {
        return this._context;
    }

    public get recordType(): number {
        return this._recordType;
    }

    public get chatlog(): any[] {
        return this._chatlog;
    }

    public get roomId(): number {
        return this.getInt("roomId");
    }

    public get roomName(): string {
        return asGuarded(this._context.get("roomName"), isString);
    }

    public get groupId(): number {
        return this.getInt("groupId");
    }

    public get threadId(): number {
        return this.getInt("threadId");
    }

    public get messageId(): number {
        return this.getInt("messageId");
    }

    private getInt(param1: string): number {
        let _loc2_: any = this._context.get(param1);
        if (_loc2_ == null) {
            return 0;
        }
        return typeof _loc2_ === "number" && (_loc2_ | 0) === _loc2_ ? _loc2_ : null;
    }
}
