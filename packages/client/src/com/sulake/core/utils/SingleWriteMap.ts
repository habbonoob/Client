import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { QName } from '@habbo-pixi/runtime/xml/QName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class SingleWriteMap extends UtilsMap {
    static { registerClassName(this, 'com.sulake.core.utils::SingleWriteMap'); }

    public override setProperty(param1: any, param2: any): void {
        if (this.hasKey(param1 instanceof QName ? castTo(param1, QName).localName : param1)) {
            throw new Error("Trying to overwrite value in SingleWriteMap - key: " + param1 + ", value: " + param2);
        }
        super.setProperty(param1, param2);
    }
}
