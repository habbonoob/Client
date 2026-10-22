import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { IssueBrowser } from '@/com/sulake/habbo/moderation/IssueBrowser';
import type { IssueManager } from '@/com/sulake/habbo/moderation/IssueManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IssueCategoryNames } from '@/com/sulake/habbo/moderation/IssueCategoryNames';

export class IssueListView {
    static { registerClassName(this, 'com.sulake.habbo.moderation::IssueListView'); }

    constructor(param1: IssueManager, param2: IssueBrowser, param3: IItemListWindow) {
        this._issueManager = param1;
        this._SafeStr_3534 = param2;
        this._SafeStr_2221 = param3;
        this._SafeStr_5708 = asGuarded(param3.getListItemAt(0), isIWindowContainer);
        param3.removeListItems();
        this._issueListLimit = param1.issueListLimit;
    }

    declare private _issueManager: IssueManager;

    declare private _SafeStr_3534: IssueBrowser;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_5708: IWindowContainer;

    declare private _SafeStr_8588: BitmapData;

    declare private _SafeStr_8376: BitmapData;

    private _issueListLimit: number = 200;

    public update(param1: any[]): void {
        let _loc9_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc3_: IWindow = null;
        let _loc14_: IWindow = null;
        let _loc12_: any = null;
        let _loc6_: IssueMessageData = null;
        let _loc8_: IBitmapWrapperWindow = null;
        let _loc10_: string = null;
        let _loc11_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        if (this._SafeStr_2221 == null) {
            return;
        }
        if (param1 == null || param1.length == 0) {
            this._SafeStr_2221.destroyListItems();
            return;
        }
        param1.sort((a, b) => a.highestPriority - b.highestPriority || a.issueAgeInMilliseconds - b.issueAgeInMilliseconds);
        let _loc13_: number = this._SafeStr_2221.numListItems;
        let _loc5_: number = param1.length | 0;
        if (_loc5_ > this._issueListLimit) {
            _loc5_ = this._issueListLimit;
        }
        if (_loc13_ < _loc5_) {
            _loc9_ = 0;
            while (_loc9_ < _loc5_ - _loc13_) {
                _loc2_ = asGuarded(this._SafeStr_5708.clone(), isIWindowContainer);
                this._SafeStr_2221.addListItem(_loc2_);
                _loc9_++;
            }
        } else if (_loc13_ > _loc5_) {
            _loc9_ = 0;
            while (_loc9_ < _loc13_ - _loc5_) {
                _loc3_ = this._SafeStr_2221.removeListItemAt(0);
                _loc3_.dispose();
                _loc9_++;
            }
        }
        _loc9_ = 1;
        let _loc7_: number = getTimer();
        for (_loc12_ of param1 ?? []) {
            if (_loc9_ > this._issueListLimit) {
                break;
            }
            if (_loc12_ == null || this._SafeStr_5708 == null) {
                return;
            }
            _loc2_ = asGuarded(this._SafeStr_2221.getListItemAt(_loc9_ - 1 >>> 0), isIWindowContainer);
            if (_loc2_ == null) {
                return;
            }
            _loc2_.width = this._SafeStr_2221.width;
            _loc2_.color = _loc9_++ % 2 ? 4289914618 : 4294967295;
            _loc14_ = _loc2_.findChildByName("score");
            if (_loc14_ != null) {
                _loc14_.caption = stringOrNull(_loc12_.highestPriority.toString());
            }
            _loc6_ = _loc12_.getHighestPriorityIssue();
            if (_loc6_ == null) {
                return;
            }
            _loc14_ = _loc2_.findChildByName("source");
            if (_loc14_ != null) {
                _loc14_.caption = IssueCategoryNames.getSourceName(_loc6_.categoryId);
            }
            _loc14_ = _loc2_.findChildByName("category");
            if (_loc14_ != null) {
                _loc14_.caption = IssueCategoryNames.getCategoryName(_loc6_.reportedCategoryId);
            }
            _loc14_ = _loc2_.findChildByName("target_name");
            if (_loc14_ != null) {
                if (_loc6_.reportedUserId != 0) {
                    _loc14_.caption = _loc6_.reportedUserName;
                } else {
                    _loc14_.caption = "";
                }
            }
            _loc8_ = asGuarded(_loc2_.findChildByName("target_icon"), isIBitmapWrapperWindow);
            if (_loc8_ != null) {
                _loc10_ = _loc6_.reportedUserId ? "user_icon_png" : "room_icon_png";
                _loc11_ = asInstanceOf(this._SafeStr_3534.assets.getAssetByName(_loc10_), BitmapDataAsset);
                if (_loc11_ != null && asInstanceOf(_loc11_.content, BitmapData) != null) {
                    _loc4_ = asInstanceOf(_loc11_.content, BitmapData);
                    if (_loc4_ != null) {
                        _loc8_.bitmap = _loc4_.clone();
                    }
                }
            }
            _loc14_ = _loc2_.findChildByName("time");
            if (_loc14_ != null) {
                _loc14_.caption = stringOrNull(_loc12_.getOpenTime(_loc7_));
            }
            _loc14_ = _loc2_.findChildByName("msgs");
            if (_loc14_ != null) {
                _loc14_.caption = stringOrNull(_loc12_.getMessageCount().toString());
            }
            _loc14_ = _loc2_.findChildByName("picker");
            if (_loc14_ != null) {
                _loc14_.caption = stringOrNull(_loc12_.pickerName);
            }
            _loc14_ = _loc2_.findChildByName("pick_button");
            if (_loc14_ != null) {
                _loc14_.id = _loc12_.id | 0;
                _loc14_.removeEventListener("WME_CLICK", this.onPick);
                _loc14_.addEventListener("WME_CLICK", this.onPick);
            }
            _loc14_ = _loc2_.findChildByName("handle_button");
            if (_loc14_ != null) {
                _loc14_.id = _loc12_.id | 0;
                _loc14_.removeEventListener("WME_CLICK", this.onHandle);
                _loc14_.addEventListener("WME_CLICK", this.onHandle);
            }
            _loc14_ = _loc2_.findChildByName("release_button");
            if (_loc14_ != null) {
                _loc14_.id = _loc12_.id | 0;
                _loc14_.removeEventListener("WME_CLICK", this.onRelease);
                _loc14_.addEventListener("WME_CLICK", this.onRelease);
            }
        }
    }

    private onPick = (param1: WindowMouseEvent): void => {
        if (this._issueManager == null) {
            return;
        }
        this._issueManager.pickBundle(param1.window.id, "pick button");
    };

    private onHandle = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_3534 == null) {
            return;
        }
        this._issueManager.handleBundle(param1.window.id);
    };

    private onRelease = (param1: WindowMouseEvent): void => {
        if (this._issueManager == null) {
            return;
        }
        this._issueManager.releaseBundle(param1.window.id);
    };
}
