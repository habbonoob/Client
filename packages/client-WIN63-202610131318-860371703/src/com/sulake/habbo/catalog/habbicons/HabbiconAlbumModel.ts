import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import { HabbiconAlbumStats } from '@/com/sulake/habbo/catalog/habbicons/HabbiconAlbumStats';

export class HabbiconAlbumModel {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconAlbumModel'); }

    public sets: HabbiconSetModel[] = new Array<HabbiconSetModel>(0).fill(null);
    public _SafeStr_14867: HabbiconSetModel[] = new Array<HabbiconSetModel>(0).fill(null);
    public favouriteGroups: HabbiconSetModel[] = new Array<HabbiconSetModel>(0).fill(null);
    public _SafeStr_14866: HabbiconAlbumStats = new HabbiconAlbumStats();

    constructor() {
    }

    public findSetById(param1: string): HabbiconSetModel {
        for (const _loc2_ of this.sets ?? []) {
            if (_loc2_ != null && _loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public findSetByCollectionId(param1: number): HabbiconSetModel {
        for (const _loc2_ of this.sets ?? []) {
            if (_loc2_ != null && _loc2_.collectionId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public findEntryByHabbiconId(param1: number): HabbiconEntryModel {
        let _loc2_: any = null;
        for (const _loc3_ of this.sets ?? []) {
            if (_loc3_ != null) {
                for (_loc2_ of _loc3_.habbicons ?? []) {
                    if (_loc2_ != null && _loc2_.habbiconId == param1) {
                        return _loc2_;
                    }
                }
                if (_loc3_.rewardHabbicon != null && _loc3_.rewardHabbicon.habbiconId == param1) {
                    return _loc3_.rewardHabbicon;
                }
            }
        }
        return null;
    }
}
