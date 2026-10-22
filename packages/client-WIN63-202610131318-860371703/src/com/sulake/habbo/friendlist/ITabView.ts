import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';

export interface ITabView {
    init(param1: HabboFriendList): void;
    fillFooter(param1: IWindowContainer): void;
    fillList(param1: IItemListWindow): void;
    getEntryCount(): number;
    tabClicked(param1: number): void;
}
