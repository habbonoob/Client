import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SavedSearch } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SavedSearch';
import type { NavigatorMetaDataParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorMetaDataParser';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class ContextContainer {
    static { registerClassName(this, 'com.sulake.habbo.navigator.context::ContextContainer'); }

    declare private _navigator: HabboNewNavigator;

    declare private _SafeStr_3864: UtilsMap;

    private _savedSearches: SavedSearch[] = [];

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    public hasContextFor(param1: string): boolean {
        if (!this._SafeStr_3864) {
            return false;
        }
        return this._SafeStr_3864.hasKey(param1);
    }

    public initialize(param1: NavigatorMetaDataParser): void {
        this._SafeStr_3864 = new UtilsMap();
        for (const _loc2_ of param1.topLevelContexts ?? []) {
            this._SafeStr_3864.add(_loc2_.searchCode, _loc2_.quickLinks);
        }
    }

    public getTopLevelSearches(): any[] {
        return this._SafeStr_3864.getKeys();
    }

    public get savedSearches(): SavedSearch[] {
        return this._savedSearches;
    }

    public set savedSearches(param1: SavedSearch[]) {
        this._savedSearches = param1;
    }

    public isReady(): boolean {
        return this._SafeStr_3864 != null;
    }
}
