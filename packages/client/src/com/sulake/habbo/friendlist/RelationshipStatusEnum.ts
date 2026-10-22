import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RelationshipStatusEnum {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::RelationshipStatusEnum'); }

    public static readonly NONE: number = 0;
    public static readonly _SafeStr_7726: number = 1;
    public static readonly SMILE: number = 2;
    public static readonly BOBBA: number = 3;
    private static readonly _asString: any[] = ["none", "heart", "smile", "bobba"];

    public static get displayableStatuses(): any[] {
        return [1, 2, 3];
    }

    public static statusAsString(param1: number): string {
        return stringOrNull(RelationshipStatusEnum._asString[param1]);
    }

    public static stringAsStatus(param1: string): number {
        for (const _loc2_ of RelationshipStatusEnum.displayableStatuses ?? []) {
            if (RelationshipStatusEnum.statusAsString(_loc2_ | 0) == param1) {
                return _loc2_ | 0;
            }
        }
        return 0;
    }

    constructor() {
    }
}
