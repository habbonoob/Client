import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { HighScoreData } from '@/com/sulake/habbo/room/object/data/HighScoreData';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class HighScoreStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::HighScoreStuffData'); }

    public static readonly FORMAT_KEY: number = 6;
    private _state: string = "";
    private _scoreType: number = -1;
    private _clearType: number = -1;

    declare private _entries: HighScoreData[];

    constructor() {
        super();
    }

    public get scoreType(): number {
        return this._scoreType;
    }

    public get clearType(): number {
        return this._clearType;
    }

    public get entries(): HighScoreData[] {
        return this._entries;
    }

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        let _loc5_: number = 0;
        let _loc2_: HighScoreData = null;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        this._entries = [];
        this._state = param1.readString();
        this._scoreType = param1.readInteger();
        this._clearType = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc2_ = new HighScoreData();
            _loc2_.score = param1.readInteger();
            _loc4_ = param1.readInteger();
            _loc6_ = 0;
            while (_loc6_ < _loc4_) {
                _loc2_.addUser(param1.readString());
                _loc6_++;
            }
            this._entries.push(_loc2_);
            _loc5_++;
        }
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        let _loc4_: number = 0;
        let _loc2_: HighScoreData = null;
        this._entries = [];
        super.initializeFromRoomObjectModel(param1);
        this._scoreType = param1.getNumber("furniture_highscore_score_type") | 0;
        this._clearType = param1.getNumber("furniture_highscore_clear_type") | 0;
        let _loc3_: number = param1.getNumber("furniture_highscore_data_entry_count") | 0;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new HighScoreData();
            _loc2_.score = param1.getNumber("furniture_highscore_data_entry_base_score_" + _loc4_) | 0;
            _loc2_.users = param1.getStringArray("furniture_highscore_data_entry_base_users_" + _loc4_);
            this._entries.push(_loc2_);
            _loc4_++;
        }
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        let _loc3_: number = 0;
        let _loc2_: HighScoreData = null;
        super.writeRoomObjectModel(param1);
        param1.setNumber("furniture_data_format", 6);
        param1.setNumber("furniture_highscore_score_type", this._scoreType);
        param1.setNumber("furniture_highscore_clear_type", this._clearType);
        if (this._entries) {
            param1.setNumber("furniture_highscore_data_entry_count", this._entries.length);
            _loc3_ = 0;
            while (_loc3_ < this._entries.length) {
                _loc2_ = this._entries[_loc3_];
                param1.setNumber("furniture_highscore_data_entry_base_score_" + _loc3_, _loc2_.score);
                param1.setStringArray("furniture_highscore_data_entry_base_users_" + _loc3_, _loc2_.users);
                _loc3_++;
            }
        }
    }

    public override getLegacyString(): string {
        return this._state;
    }
}
