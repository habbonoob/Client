import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { TitleElementHandler } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { BuyVipButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/BuyVipButtonElementHandler';
import { CatalogButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/CatalogButtonElementHandler';
import { CommunityGoalScoreCounterElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/CommunityGoalScoreCounterElementHandler';
import { CommunityGoalTimerElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/CommunityGoalTimerElementHandler';
import { ConcurrentUsersInfoElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/ConcurrentUsersInfoElementHandler';
import { ConcurrentUsersMeterElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/ConcurrentUsersMeterElementHandler';
import { CreditHabbletButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/CreditHabbletButtonElementHandler';
import { CustomTimerElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/CustomTimerElementHandler';
import { DailyQuestElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/DailyQuestElementHandler';
import { GoToCompetitionRoomButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/GoToCompetitionRoomButtonElementHandler';
import { GoToHomeRoomButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/GoToHomeRoomButtonElementHandler';
import { GoToRoomButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/GoToRoomButtonElementHandler';
import { ImageElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/ImageElementHandler';
import { InternalLinkButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/InternalLinkButtonElementHandler';
import { LinkElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/LinkElementHandler';
import { PromotedRoomButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/PromotedRoomButtonElementHandler';
import { RequestBadgeButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/RequestBadgeButtonElementHandler';
import { RewardBadgeElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/RewardBadgeElementHandler';
import { SpacingElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/SpacingElementHandler';
import { SubmitCompetitionRoomElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/SubmitCompetitionRoomElementHandler';
import { TextElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/TextElementHandler';

export class LandingViewElementType {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::LandingViewElementType'); }

    public static readonly CAPTION: string = "caption";
    public static readonly TITLE: string = "title";
    public static readonly _SafeStr_8410: string = "subcaption";
    public static readonly BODYTEXT: string = "bodytext";
    public static readonly SPACING: string = "spacing";
    public static readonly CATALOGBUTTON: string = "catalogbutton";
    public static readonly PROMOTEDROOMBUTTON: string = "promotedroombutton";
    public static readonly LINK: string = "link";
    public static readonly _SafeStr_8004: string = "gotoroombutton";
    public static readonly REQUESTBADGEBUTTON: string = "requestbadgebutton";
    public static readonly REQUESTBADGEBUTTONSECOND: string = "requestbadgebuttonsecond";
    public static readonly REQUESTBADGEBUTTONTHIRD: string = "requestbadgebuttonthird";
    public static readonly REQUESTBADGEBUTTONFOURTH: string = "requestbadgebuttonfourth";
    public static readonly REQUESTBADGEBUTTONFIFTH: string = "requestbadgebuttonfifth";
    public static readonly CREDITHABBLETBUTTON: string = "credithabbletbutton";
    public static readonly COMMUNITYGOALTIMER: string = "communitygoaltimer";
    public static readonly CUSTOMTIMER: string = "customtimer";
    public static readonly _SafeStr_8702: string = "gotohomeroombutton";
    public static readonly _SafeStr_8397: string = "gotocompetitionroombutton";
    public static readonly REWARDBADGE: string = "rewardbadge";
    public static readonly IMAGE: string = "image";
    public static readonly SUBMITCOMPETITIONROOM: string = "submitcompetitionroom";
    public static readonly CONCURRENTUSERSMETER: string = "concurrentusersmeter";
    public static readonly CONCURRENTUSERSINFO: string = "concurrentusersinfo";
    public static readonly DAILYQUEST: string = "dailyquest";
    public static readonly _SafeStr_8349: string = "buyvipbutton";
    public static readonly COMMUNITYGOALSCORE: string = "communitygoalscore";
    public static readonly INTERNAL_LINK_BUTTON: string = "internallinkbutton";

    public static createHandler(param1: string): IElementHandler {
        switch (param1) {
            case "caption":
            case "subcaption":
            case "bodytext":
                return new TextElementHandler();
            case "title":
                return new TitleElementHandler();
            case "spacing":
                return new SpacingElementHandler();
            case "catalogbutton":
                return new CatalogButtonElementHandler();
            case "promotedroombutton":
                return new PromotedRoomButtonElementHandler();
            case "link":
                return new LinkElementHandler();
            case "gotoroombutton":
                return new GoToRoomButtonElementHandler();
            case "requestbadgebutton":
            case "requestbadgebuttonsecond":
            case "requestbadgebuttonthird":
            case "requestbadgebuttonfourth":
            case "requestbadgebuttonfifth":
                break;
            case "credithabbletbutton":
                return new CreditHabbletButtonElementHandler();
            case "communitygoaltimer":
                return new CommunityGoalTimerElementHandler();
            case "customtimer":
                return new CustomTimerElementHandler();
            case "gotohomeroombutton":
                return new GoToHomeRoomButtonElementHandler();
            case "gotocompetitionroombutton":
                return new GoToCompetitionRoomButtonElementHandler();
            case "rewardbadge":
                return new RewardBadgeElementHandler();
            case "image":
                return new ImageElementHandler();
            case "submitcompetitionroom":
                return new SubmitCompetitionRoomElementHandler();
            case "concurrentusersmeter":
                return new ConcurrentUsersMeterElementHandler();
            case "concurrentusersinfo":
                return new ConcurrentUsersInfoElementHandler();
            case "dailyquest":
                return new DailyQuestElementHandler();
            case "buyvipbutton":
                return new BuyVipButtonElementHandler();
            case "communitygoalscore":
                return new CommunityGoalScoreCounterElementHandler();
            case "internallinkbutton":
                return new InternalLinkButtonElementHandler();
            default:
                return null;
        }
        return new RequestBadgeButtonElementHandler();
    }
}
