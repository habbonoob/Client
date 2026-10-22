import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CommunityGoalHallOfFame } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalHallOfFame';
import type { ILandingPageUserEntry } from '@/com/sulake/habbo/communication/messages/incoming/quest/ILandingPageUserEntry';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import { CurrentTimingCodeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CurrentTimingCodeMessageEvent';
import { CommunityGoalHallOfFameMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalHallOfFameMessageEvent';
import { HallOfFameEntryData } from '@/com/sulake/habbo/communication/messages/incoming/quest/HallOfFameEntryData';
import { ForwardToACompetitionRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/ForwardToACompetitionRoomMessageComposer';
import { GetCurrentTimingCodeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetCurrentTimingCodeMessageComposer';
import { GetCommunityGoalHallOfFameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetCommunityGoalHallOfFameMessageComposer';
import { UserListWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/UserListWidget';

export class CommunityGoalHallOfFameWidget extends UserListWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CommunityGoalHallOfFameWidget'); }

    declare private _data: CommunityGoalHallOfFame;

    declare private _schedulingStr: string;

    constructor(param1: HabboLandingView) {
        super(param1);
    }

    public override initialize(): void {
        super.initialize();
        this._schedulingStr = this.landingView.getProperty("landing.view.dynamic.slot.6.conf");
    }

    protected override registerMessageListeners(): void {
        this.landingView.communicationManager.addHabboConnectionMessageEvent(new CommunityGoalHallOfFameMessageEvent(this.onCommunityGoalHallOfFame));
        this.landingView.communicationManager.addHabboConnectionMessageEvent(new CurrentTimingCodeMessageEvent(this.onTimingCode));
    }

    public override refresh(): void {
        this.landingView.send(new GetCurrentTimingCodeMessageComposer(this._schedulingStr));
    }

    protected override get users(): any[] {
        return this._data?.hof;
    }

    protected override refreshPopup(param1: ILandingPageUserEntry, param2: IWindowContainer): void {
        let _loc4_: HallOfFameEntryData = castTo(param1, HallOfFameEntryData);
        param2.findChildByName("user_name_txt").caption = _loc4_.userName;
        let _loc3_: string = "landing.view.competition.hof.points";
        this.landingView.localizationManager.registerParameter(_loc3_, "points", "" + _loc4_.currentScore);
        param2.findChildByName("score_txt").caption = this.getText(_loc3_);
        param2.findChildByName("rank_desc_txt").caption = this.getText("landing.view.competition.hof." + this._data.goalCode + ".rankdesc.leader");
    }

    protected override getPopupXml(): string {
        return "competition_user_popup";
    }

    private onCommunityGoalHallOfFame = (param1: CommunityGoalHallOfFameMessageEvent): void => {
        this._data = param1.getParser().data;
        this.refreshContent();
    };

    protected override hasExtraLink(): boolean {
        return this.landingView.getBoolean("landing.view.communitygoalhof.hasroomlink");
    }

    protected override extraLinkClicked(param1: ILandingPageUserEntry): void {
        this.landingView.send(new ForwardToACompetitionRoomMessageComposer(this._data.goalCode, param1.userId));
    }

    private onTimingCode = (param1: CurrentTimingCodeMessageEvent): void => {
        let _loc2_: string = param1.getParser().code;
        if (param1.getParser().schedulingStr == this._schedulingStr && _loc2_ != "" && !this.disposed) {
            this.loadConfigurationOverrides(_loc2_);
            this.landingView.send(new GetCommunityGoalHallOfFameMessageComposer(param1.getParser().code));
        }
    };

    private loadConfigurationOverrides(param1: string): void {
        let _loc4_: any[] = null;
        let _loc3_: number = 0;
        let _loc6_: string = "landing.view." + param1 + ".avatarlist.yoffsets.array";
        if (this.landingView.propertyExists(_loc6_)) {
            _loc4_ = this.landingView.getProperty(_loc6_).split(",");
            _loc3_ = 0;
            while (_loc3_ < _loc4_.length) {
                _loc4_[_loc3_] = parseInt(stringOrNull(_loc4_[_loc3_]));
                _loc3_++;
            }
            this.avatarOffsetsY = _loc4_;
        }
        let _loc5_: string = "landing.view." + param1 + ".avatarlist.widths.array";
        if (this.landingView.propertyExists(_loc5_)) {
            _loc4_ = this.landingView.getProperty(_loc5_).split(",");
            _loc3_ = 0;
            while (_loc3_ < _loc4_.length) {
                _loc4_[_loc3_] = parseInt(stringOrNull(_loc4_[_loc3_]));
                _loc3_++;
            }
            this.avatarContainerWidths = _loc4_;
        }
        let _loc2_: string = "landing.view." + param1 + ".avatarlist.startoffset";
        if (this.landingView.propertyExists(_loc2_)) {
            this.startOffset = parseInt(this.landingView.getProperty(_loc2_)) | 0;
        }
    }
}
