import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { ExternalIsometricImageFurniVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/ExternalIsometricImageFurniVisualization';

export class FurnitureYoutubeVisualization extends ExternalIsometricImageFurniVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureYoutubeVisualization'); }

    protected static readonly THUMBNAIL_URL_KEY: string = "THUMBNAIL_URL";

    constructor() {
        super();
    }

    protected override getThumbnailURL(): string {
        let _loc3_: IRoomObjectModel = this.object.getModel();
        let _loc2_: UtilsMap = _loc3_.getStringToStringMap("furniture_data");
        let _loc1_: string = _loc3_.getString("session_url_prefix");
        if (_loc1_ == null) {
            return null;
        }
        return _loc1_ + _loc2_.getValue("THUMBNAIL_URL");
    }
}
