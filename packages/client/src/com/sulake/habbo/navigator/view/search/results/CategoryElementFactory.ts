import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import type { BlockResultsView } from '@/com/sulake/habbo/navigator/view/search/results/BlockResultsView';
import type { RoomEntryElementFactory } from '@/com/sulake/habbo/navigator/view/search/results/RoomEntryElementFactory';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class CategoryElementFactory {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search.results::CategoryElementFactory'); }

    private static readonly MARGIN_LAYOUT_CATEGORY_CONTAINER: number = 13;

    constructor(param1: HabboNewNavigator, param2: RoomEntryElementFactory) {
        this._navigator = param1;
        this._SafeStr_3356 = param2;
    }

    declare private _navigator: HabboNewNavigator;

    declare private _blockResultsView: BlockResultsView;

    declare private _SafeStr_3356: RoomEntryElementFactory;

    declare private _categoryTemplate: IWindowContainer;

    declare private _collapsedCategoryTemplate: IWindowContainer;

    declare private _noResultsTemplate: IWindowContainer;

    public set blockResultsView(param1: BlockResultsView) {
        this._blockResultsView = param1;
    }

    public set categoryTemplate(param1: IWindowContainer) {
        this._categoryTemplate = param1;
    }

    public set collapsedCategoryTemplate(param1: IWindowContainer) {
        this._collapsedCategoryTemplate = param1;
    }

    public set noResultsTemplate(param1: IWindowContainer) {
        this._noResultsTemplate = param1;
    }

    public getOpenCategoryElement(param1: GuestRoomData[], param2: string, param3: number = -1, param4: number = 0, param5: number = -1): IWindowContainer {
        let headerControls: IItemListWindow;
        let roomList: IItemListWindow;
        let colorMod: number = 0;
        let color: number = 0;
        let colorModAccumulator: number = 0;
        let currentTileContainer: IItemListWindow;
        let guestRoom: GuestRoomData;
        let alternatingColor: number = 0;
        let guestRooms: GuestRoomData[] = param1;
        let title: string = param2;
        let showMoreId: number = param3;
        let actionAllowed: number = param4;
        let resultMode: number = param5;
        let container: IWindowContainer = castGuarded(this._categoryTemplate.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        container.width = this._blockResultsView.itemListWidth - 13;
        container.height = 16 + this._SafeStr_3356.rowEntryTemplateHeight * (guestRooms.length + 1);
        container.findChildByName("category_name").caption = title;
        container.findChildByName("category_back").addEventListener("WME_CLICK", this._blockResultsView.onCategoryBackClicked);
        container.findChildByName("category_back").visible = actionAllowed == 2;
        container.findChildByName("category_collapse").visible = actionAllowed != 2;
        container.findChildByName("category_collapse").id = showMoreId;
        container.findChildByName("category_collapse").addEventListener("WME_CLICK", this._blockResultsView.onCategoryCollapseClicked);
        container.findChildByName("category_name_region").id = showMoreId;
        container.findChildByName("category_name_region").addEventListener("WME_CLICK", this._blockResultsView.onCategoryCollapseClicked);
        container.findChildByName("category_show_more").id = showMoreId;
        container.findChildByName("category_show_more").addEventListener("WME_CLICK", this._blockResultsView.onCategoryShowMoreClicked);
        container.findChildByName("category_show_more").visible = actionAllowed == 1;
        container.findChildByName("category_add_quick_link").id = showMoreId;
        container.findChildByName("category_add_quick_link").addEventListener("WME_CLICK", this._blockResultsView.onCategoryAddQuickLinkClicked);
        container.findChildByName("category_content_background").background = true;
        container.findChildByName("category_content_background").height = 12 + this._SafeStr_3356.rowEntryTemplateHeight * (guestRooms.length + 1);
        container.findChildByName("category_add_quick_link").visible = this._navigator.currentResults.searchCodeOriginal.indexOf("official_view") == -1;
        headerControls = castGuarded(container.findChildByName("category_controls_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (this._navigator.sessionData.isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA")) {
            headerControls.getListItemByName("category_toggle_tiles").addEventListener("WME_CLICK", this._blockResultsView.onCategoryToggleModeClicked);
            headerControls.getListItemByName("category_toggle_tiles").id = showMoreId;
            headerControls.getListItemByName("category_toggle_tiles").visible = resultMode == 0;
            headerControls.getListItemByName("category_toggle_rows").addEventListener("WME_CLICK", this._blockResultsView.onCategoryToggleModeClicked);
            headerControls.getListItemByName("category_toggle_rows").id = showMoreId;
            headerControls.getListItemByName("category_toggle_rows").visible = resultMode == 1;
        } else {
            headerControls.removeListItem(headerControls.getListItemByName("category_toggle_tiles"));
            headerControls.removeListItem(headerControls.getListItemByName("category_toggle_rows"));
        }
        headerControls.arrangeListItems();
        roomList = castGuarded(container.findChildByName("category_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (resultMode == 0) {
            roomList.spacing = 0;
        }
        colorMod = 9412607;
        color = -1;
        colorModAccumulator = 1;
        currentTileContainer = null;
        for (guestRoom of guestRooms ?? []) {
            alternatingColor = (colorModAccumulator % 2 == 0 ? color : colorMod) | 0;
            if (resultMode == 0) {
                roomList.addListItem(this._SafeStr_3356.getNewRowElement(guestRoom, alternatingColor));
                colorModAccumulator = colorModAccumulator + 1;
            } else {
                if (!currentTileContainer) {
                    currentTileContainer = this._SafeStr_3356.getNewTileContainerElement();
                    roomList.addListItem(currentTileContainer);
                    currentTileContainer.addEventListener("WME_WHEEL", (param1: WindowMouseEvent): void => {
                            this._blockResultsView.itemList.scrollWithWheel(param1.delta);
                        });
                }
                currentTileContainer.addListItem(this._SafeStr_3356.getNewTileElement(guestRoom, alternatingColor));
                if (currentTileContainer.numListItems >= 3) {
                    currentTileContainer = null;
                    colorModAccumulator = colorModAccumulator + 1;
                }
            }
        }
        roomList.arrangeListItems();
        return container;
    }

    public getCollapsedCategoryElement(param1: string, param2: number = -1, param3: number = 0): IWindowContainer {
        let _loc4_: IWindowContainer = castGuarded(this._collapsedCategoryTemplate.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc4_.findChildByName("category_name").caption = param1;
        _loc4_.findChildByName("category_show_more").id = param2;
        _loc4_.findChildByName("category_show_more").addEventListener("WME_CLICK", this._blockResultsView.onCategoryShowMoreClicked);
        _loc4_.findChildByName("category_show_more").visible = param3 == 1;
        _loc4_.findChildByName("category_expand").addEventListener("WME_CLICK", this._blockResultsView.onCategoryExpandClicked);
        _loc4_.findChildByName("category_expand").id = param2;
        _loc4_.findChildByName("category_name_region").addEventListener("WME_CLICK", this._blockResultsView.onCategoryExpandClicked);
        _loc4_.findChildByName("category_name_region").id = param2;
        _loc4_.findChildByName("category_add_quick_link").addEventListener("WME_CLICK", this._blockResultsView.onCategoryAddQuickLinkClicked);
        _loc4_.findChildByName("category_add_quick_link").id = param2;
        _loc4_.findChildByName("category_add_quick_link").visible = this._navigator.currentResults.searchCodeOriginal.indexOf("official_view") == -1;
        _loc4_.width = this._blockResultsView.itemListWidth - 13;
        castGuarded(_loc4_.findChildByName("category_controls_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        return _loc4_;
    }

    public getNoResultsELement(): IWindowContainer {
        return castGuarded(this._noResultsTemplate.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }
}
