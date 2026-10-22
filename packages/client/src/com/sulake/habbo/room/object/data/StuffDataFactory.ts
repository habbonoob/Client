import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { isIStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { CrackableStuffData } from '@/com/sulake/habbo/room/object/data/CrackableStuffData';
import { EmptyStuffData } from '@/com/sulake/habbo/room/object/data/EmptyStuffData';
import { HighScoreStuffData } from '@/com/sulake/habbo/room/object/data/HighScoreStuffData';
import { IntArrayStuffData } from '@/com/sulake/habbo/room/object/data/IntArrayStuffData';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { VoteResultStuffData } from '@/com/sulake/habbo/room/object/data/VoteResultStuffData';

export class StuffDataFactory {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::StuffDataFactory'); }

    public static getStuffDataWrapperForType(param1: number): IStuffData {
        let _loc3_: any = param1 & 0xFF;
        let _loc2_: IStuffData = null;
        switch (_loc3_) {
            case 0:
                _loc2_ = asGuarded(new LegacyStuffData(), isIStuffData);
                break;
            case 1:
                _loc2_ = asGuarded(new MapStuffData(), isIStuffData);
                break;
            case 2:
                _loc2_ = asGuarded(new StringArrayStuffData(), isIStuffData);
                break;
            case 3:
                _loc2_ = asGuarded(new VoteResultStuffData(), isIStuffData);
                break;
            case 4:
                _loc2_ = asGuarded(new EmptyStuffData(), isIStuffData);
                break;
            case 5:
                _loc2_ = asGuarded(new IntArrayStuffData(), isIStuffData);
                break;
            case 6:
                _loc2_ = asGuarded(new HighScoreStuffData(), isIStuffData);
                break;
            case 7:
                _loc2_ = asGuarded(new CrackableStuffData(), isIStuffData);
        }
        if (_loc2_ != null) {
            _loc2_.flags = param1 & 0xFF00;
        }
        return _loc2_;
    }

    constructor() {
    }
}
