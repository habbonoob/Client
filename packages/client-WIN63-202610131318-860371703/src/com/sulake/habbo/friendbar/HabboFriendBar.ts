import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboFriendBar } from '@/com/sulake/habbo/friendbar/IHabboFriendBar';
import type { IHabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/IHabboFriendBarView';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { HabboFriendBarData } from '@/com/sulake/habbo/friendbar/data/HabboFriendBarData';
import { GroupForumController } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { HabboEpicPopupView } from '@/com/sulake/habbo/friendbar/popup/HabboEpicPopupView';
import { HabboTalent } from '@/com/sulake/habbo/friendbar/talent/HabboTalent';
import { HabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/HabboFriendBarView';
import { isIHabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/IHabboFriendBarView';
import { IIDHabboEpicPopupView } from '@/com/sulake/iid/IIDHabboEpicPopupView';
import { IIDHabboFriendBarData } from '@/com/sulake/iid/IIDHabboFriendBarData';
import { IIDHabboFriendBarView } from '@/com/sulake/iid/IIDHabboFriendBarView';
import { IIDHabboGroupForumController } from '@/com/sulake/iid/IIDHabboGroupForumController';
import { IIDHabboLandingView } from '@/com/sulake/iid/IIDHabboLandingView';
import { IIDHabboTalent } from '@/com/sulake/iid/IIDHabboTalent';

export class HabboFriendBar extends Component implements IHabboFriendBar {
    static { registerClassName(this, 'com.sulake.habbo.friendbar::HabboFriendBar'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        param1.attachComponent(new HabboFriendBarData(param1, 0, param3), [new IIDHabboFriendBarData()]);
        param1.attachComponent(new HabboFriendBarView(param1, 0, param3), [new IIDHabboFriendBarView()]);
        param1.attachComponent(new HabboLandingView(param1, 0, param3), [new IIDHabboLandingView()]);
        param1.attachComponent(new HabboTalent(param1, 0, param3), [new IIDHabboTalent()]);
        param1.attachComponent(new HabboEpicPopupView(param1, 0, param3), [new IIDHabboEpicPopupView()]);
        param1.attachComponent(new GroupForumController(param1, 0, param3), [new IIDHabboGroupForumController()]);
    }

    public set visible(param1: boolean) {
        let _loc2_: IHabboFriendBarView = asGuarded(this.queueInterface(new IIDHabboFriendBarView()), isIHabboFriendBarView);
        if (_loc2_ != null) {
            _loc2_.visible = param1;
            _loc2_.release(new IIDHabboFriendBarView());
        }
    }
}
