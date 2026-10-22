import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/HabboSearchResultData';
import type { AvatarSearchResults } from '@/com/sulake/habbo/friendlist/domain/AvatarSearchResults';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { ITabView } from '@/com/sulake/habbo/friendlist/ITabView';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/HabboSearchMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { ISearchView } from '@/com/sulake/habbo/friendlist/ISearchView';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ExtendedProfileIcon } from '@/com/sulake/habbo/utils/ExtendedProfileIcon';

export class SearchView implements ITabView, ISearchView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::SearchView'); }

    declare private _friendList: HabboFriendList;

    declare private _searchStr: ITextFieldWindow;

    declare private _SafeStr_2221: IItemListWindow;

    constructor() {
    }

    public init(param1: HabboFriendList): void {
        this._friendList = param1;
    }

    public getEntryCount(): number {
        if (this._friendList.searchResults.friends == null) {
            return 0;
        }
        return this._friendList.searchResults.friends.length + this._friendList.searchResults.others.length;
    }

    public fillList(param1: IItemListWindow): void {
        this._SafeStr_2221 = param1;
    }

    public fillFooter(param1: IWindowContainer): void {
        this._searchStr = castGuarded(param1.findChildByName("search_str"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._searchStr.procedure = this.onSearchInput;
        this._searchStr.addEventListener("WKE_KEY_DOWN", this.onSearchStrInput);
        param1.findChildByName("search_but").procedure = this.onSearchButtonClick;
        this._friendList.refreshButton(param1, "search", true, null, 0);
    }

    public tabClicked(param1: number): void {
    }

    public refreshList(): void {
        let _loc4_: number = 0;
        let _loc5_: boolean = false;
        let _loc3_: HabboSearchResultData = null;
        let _loc6_: HabboSearchResultData = null;
        let _loc1_: boolean = false;
        this._SafeStr_2221.autoArrangeItems = false;
        let _loc2_: AvatarSearchResults = this._friendList.searchResults;
        _loc4_ = 0;
        while (true) {
            _loc5_ = this._friendList.isMessagesPersisted();
            if (_loc4_ == 0) {
                this.refreshEntry(true, _loc4_, null, null, this.getFriendsCaption(), false, false, 0);
            } else if (_loc4_ <= _loc2_.friends.length) {
                _loc3_ = _loc2_.friends[_loc4_ - 1];
                this.refreshEntry(true, _loc4_, _loc3_.avatarFigure, _loc3_.avatarName, null, _loc3_.isAvatarOnline || _loc5_, false, _loc3_.avatarId);
            } else if (_loc4_ == _loc2_.friends.length + 1) {
                this.refreshEntry(true, _loc4_, null, null, this.getOthersCaption(), false, false, 0);
            } else if (_loc4_ <= _loc2_.friends.length + _loc2_.others.length + 1) {
                _loc6_ = _loc2_.others[_loc4_ - 2 - _loc2_.friends.length];
                this.refreshEntry(true, _loc4_, _loc6_.avatarFigure, _loc6_.avatarName, null, false, _loc6_.avatarId != this._friendList.avatarId && !this._friendList.searchResults.isFriendRequestSent(_loc6_.avatarId), _loc6_.avatarId);
            } else {
                _loc1_ = this.refreshEntry(false, _loc4_, null, null, null, false, false, 0);
                if (_loc1_) {
                    break;
                }
            }
            _loc4_++;
        }
        this.refreshShading();
        this._SafeStr_2221.autoArrangeItems = true;
    }

    private refreshShading(): void {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2221.numListItems) {
            this._SafeStr_2221.getListItemAt(_loc1_ >>> 0).color = this._friendList.laf.getRowShadingColor(3, _loc1_ % 2 == 1);
            _loc1_++;
        }
    }

    public setSearchStr(param1: string): void {
        this._searchStr.text = param1;
    }

    public focus(): void {
        this._searchStr.focus();
    }

    private getFriendsCaption(): string {
        if (this._friendList.searchResults.friends.length == 0) {
            return "${friendlist.search.nofriendsfound}";
        }
        this._friendList.registerParameter("friendlist.search.friendscaption", "cnt", "" + this._friendList.searchResults.friends.length);
        return "${friendlist.search.friendscaption}";
    }

    private getOthersCaption(): string {
        if (this._friendList.searchResults.others.length == 0) {
            return "${friendlist.search.noothersfound}";
        }
        this._friendList.registerParameter("friendlist.search.otherscaption", "cnt", "" + this._friendList.searchResults.others.length);
        return "${friendlist.search.otherscaption}";
    }

    private refreshEntry(param1: boolean, param2: number, param3: string, param4: string, param5: string, param6: boolean, param7: boolean, param8: number): boolean {
        let _loc9_: IWindowContainer = asGuarded(this._SafeStr_2221.getListItemAt(param2 >>> 0), isIWindowContainer);
        if (_loc9_ == null) {
            if (!param1) {
                return true;
            }
            _loc9_ = castGuarded(this._friendList.getXmlWindow("search_entry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc9_.findChildByName("bg_region").procedure = this.onSearchEntry;
            this._SafeStr_2221.addListItem(_loc9_);
        }
        if (param1) {
            _loc9_.height = 20;
            _loc9_.visible = true;
        } else {
            _loc9_.height = 0;
            _loc9_.visible = false;
        }
        _loc9_.id = param8;
        _loc9_.findChildByName("bg_region").id = param8;
        this.refreshFigure(_loc9_, param3, param8 < 0);
        this._friendList.refreshText(_loc9_, "name", param4 != null, param4);
        this._friendList.refreshText(_loc9_, "caption", param5 != null, param5);
        this._friendList.refreshButton(_loc9_, "start_chat", param6, this.onChatButtonClick, param8);
        this._friendList.refreshButton(_loc9_, "ask_for_friend", param7, this.onAskForFriendButtonClick, param8);
        ExtendedProfileIcon.setUserInfoState(false, _loc9_);
        _loc9_.findChildByName("user_info_region").visible = param8 > 0;
        return false;
    }

    private refreshFigure(param1: IWindowContainer, param2: string, param3: boolean = false): void {
        let _loc4_: IBitmapWrapperWindow = asGuarded(param1.getChildByName("face"), isIBitmapWrapperWindow);
        if (param2 == null || param2 == "") {
            _loc4_.visible = false;
        } else {
            if (param3) {
                _loc4_.bitmap = this._friendList.getSmallGroupBadgeBitmap(param2);
            } else {
                _loc4_.bitmap = this._friendList.getAvatarFaceBitmap(param2);
            }
            _loc4_.width = _loc4_.bitmap.width;
            _loc4_.height = _loc4_.bitmap.height;
            _loc4_.visible = true;
        }
    }

    private onSearchEntry = (param1: WindowEvent, param2: IWindow): void => {
        if (param2.id < 1) {
            return;
        }
        this._friendList.view.showInfo(param1, "${infostand.profile.link.tooltip}");
        if (param1.type == "WME_OVER") {
            ExtendedProfileIcon.setUserInfoState(true, castGuarded(param2.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        } else if (param1.type == "WME_OUT") {
            ExtendedProfileIcon.setUserInfoState(false, castGuarded(param2.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        } else if (param1.type == "WME_CLICK") {
            this._friendList.trackGoogle("extendedProfile", "friendList_friendsSearch");
            this._friendList.send(new GetExtendedProfileMessageComposer(param2.id));
        }
    };

    private onSearchButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.search}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Search clicked: " + param2.name);
        this.searchAvatar();
    };

    private onAskForFriendButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.addfriend}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Ask for friend clicked: " + param2.id);
        let _loc3_: HabboSearchResultData = this._friendList.searchResults.getResult(param2.id);
        if (_loc3_ == null) {
            Logger.log("No search result found with id: " + param2.id);
            return;
        }
        Logger.log("Search result found: " + _loc3_.avatarName);
        let _loc4_: boolean = this._friendList.askForAFriend(_loc3_.avatarId, _loc3_.avatarName);
        if (!_loc4_) {
            this._friendList.showLimitReachedAlert();
        } else {
            this._friendList.showFriendRequestSentAlert(_loc3_.avatarName);
            this.refreshEntry(true, this.findIndexFor(_loc3_.avatarId), _loc3_.avatarFigure, _loc3_.avatarName, null, false, false, _loc3_.avatarId);
        }
    };

    private findIndexFor(param1: number): number {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2221.numListItems) {
            if (this._SafeStr_2221.getListItemAt(_loc2_ >>> 0).id == param1) {
                return _loc2_;
            }
            _loc2_++;
        }
        return -1;
    }

    private onChatButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.im}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: HabboSearchResultData = this._friendList.searchResults.getResult(param2.id);
        if (_loc3_ == null) {
            Logger.log("No search result found with id: " + param2.id);
            return;
        }
        this._friendList.messenger.startConversation(_loc3_.avatarId);
    };

    private onSearchInput = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.searchstr}");
    };

    private onSearchStrInput = (param1: WindowKeyboardEvent): void => {
        let _loc3_: any = null;
        let _loc2_: number = 0;
        let _loc4_: string = null;
        let _loc5_: IWindow = param1.target;
        Logger.log("Test key event " + param1 + ", " + param1.type + " " + _loc5_.name);
        if (param1.charCode == 13) {
            this.searchAvatar();
        } else {
            _loc2_ = 25;
            _loc4_ = this._searchStr.text;
            if (_loc4_.length > _loc2_) {
                this._searchStr.text = _loc4_.substring(0, _loc2_);
            }
        }
    };

    private searchAvatar(): void {
        let _loc1_: string = this._searchStr.text;
        Logger.log("Search avatar: " + _loc1_);
        if (_loc1_ == "") {
            Logger.log("No text...");
            return;
        }
        this._friendList.send(new HabboSearchMessageComposer(_loc1_));
    }

    get [ISearchView](): true {
        return true;
    }
}
