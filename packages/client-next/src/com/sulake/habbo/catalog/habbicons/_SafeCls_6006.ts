import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { _SafeCls_6003 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6003';
import type { _SafeCls_6004 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6004';
import type { _SafeCls_6005 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6005';

export interface _SafeCls_6006 extends IUnknown {
    get hasLoadedShopData(): boolean;
    get ownedHabbicons(): any[];
    get recentHabbiconIds(): any[];
    get shopCollections(): _SafeCls_6004[];
    get unseenHabbiconCount(): number;
    addEventListener(param1: string, param2: (...args: any[]) => any): void;
    removeEventListener(param1: string, param2: (...args: any[]) => any): void;
    openHabbiconHub(): void;
    getShopData(param1?: boolean): void;
    getHabbiconInfo(param1: number): void;
    noteHabbiconUsed(param1: number): void;
    isUnseenHabbicon(param1: number): boolean;
    removeUnseenHabbicon(param1: number): void;
    resetUnseenHabbicons(): void;
    buyHabbicon(param1: number): void;
    buyHabbiconCollection(param1: number): void;
    claimHabbicon(param1: number): void;
    favoriteHabbicon(param1: number): void;
    unfavoriteHabbicon(param1: number): void;
    tryGetOwnedHabbicon(param1: number): _SafeCls_6003;
    tryGetShopItem(param1: number): _SafeCls_6005;
}
