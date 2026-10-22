import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MovieClip } from '@habbo-pixi/runtime/display/MovieClip';
import { SiteLockValidator } from '@/com/sulake/habbo/SiteLockValidator';

export class _SafeCls_6000 extends MovieClip {
    static { registerClassName(this, '_SafeCls_6000'); }

    public _loc1_: boolean = true;
    public _loc2_: boolean = false;

    constructor() {
        super();
        let _loc2_: boolean = true;
        let _loc3_: boolean = false;
        if (!_loc3_) {
            super();
        }
        let _loc1_: SiteLockValidator = new SiteLockValidator();
        if (_loc2_) {
            if (_loc1_.validateDomain(this)) {
                return;
            }
        }
    }
}
