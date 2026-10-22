import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { BonusRarePromoWidget, CatalogPromoWidget, CatalogPromoWidgetSmall, CommunityGoalPrizesWidget, CommunityGoalVsModeWidget, CommunityGoalVsModeWidgetWithVoting, CommunityGoalWidget, DailyQuestWidget, ExpiringCatalogPageSmallWidget, ExpiringCatalogPageWidget, GenericWidget, HabboModerationPromoWidget, HabboTalentsPromoWidget, NextLimitedRareCountdownWidget, PromoArticleWidget, RoomHopperNetworkWidget, WidgetContainerWidget } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { AvatarImageWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/AvatarImageWidget';
import { CommunityGoalHallOfFameWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/CommunityGoalHallOfFameWidget';
import { HabboWayPromoWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/HabboWayPromoWidget';
import { SafetyQuizPromoWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/SafetyQuizPromoWidget';

export class LandingViewWidgetType {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout::LandingViewWidgetType'); }

    public static readonly AVATARIMAGE: string = "avatarimage";
    public static readonly EXPIRINGCATALOGPAGE: string = "expiringcatalogpage";
    public static readonly _SafeStr_8338: string = "expiringcatalogpagesmall";
    public static readonly COMMUNITYGOAL: string = "communitygoal";
    public static readonly COMMUNITYGOALVS: string = "communitygoalvsmode";
    public static readonly COMMUNITYGOALVSVOTE: string = "communitygoalvsmodevote";
    public static readonly CATALOGPROMO: string = "catalogpromo";
    public static readonly CATALOGPROMOSMALL: string = "catalogpromosmall";
    public static readonly ACHIEVEMENTCOMPETITIONHALLOFFAME: string = "achievementcompetition_hall_of_fame";
    public static readonly ACHIEVEMENTCOMPETITIONPRIZES: string = "achievementcompetition_prizes";
    public static readonly DAILYQUEST: string = "dailyquest";
    public static readonly _SafeStr_8631: string = "nextlimitedrarecountdown";
    public static readonly HABBOMODERATIONPROMO: string = "habbomoderationpromo";
    public static readonly HABBOTALENTSPROMO: string = "habbotalentspromo";
    public static readonly HABBOWAYPROMO: string = "habbowaypromo";
    public static readonly ROOMHOPPERNETWORK: string = "roomhoppernetwork";
    public static readonly SAFETYQUIZPROMO: string = "safetyquizpromo";
    public static readonly GENERIC: string = "generic";
    public static readonly WIDGETCONTAINER: string = "widgetcontainer";
    public static readonly PROMOARTICLE: string = "promoarticle";
    public static readonly BONUSRARE: string = "bonusrare";

    public static getWidgetForType(param1: string, param2: HabboLandingView): ILandingViewWidget {
        let _loc3_: ILandingViewWidget = null;
        switch (param1) {
            case "achievementcompetition_hall_of_fame":
                _loc3_ = new CommunityGoalHallOfFameWidget(param2);
                break;
            case "achievementcompetition_prizes":
                _loc3_ = new CommunityGoalPrizesWidget(param2);
                break;
            case "avatarimage":
                _loc3_ = new AvatarImageWidget(param2);
                break;
            case "communitygoal":
                _loc3_ = new CommunityGoalWidget(param2);
                break;
            case "communitygoalvsmode":
                _loc3_ = new CommunityGoalVsModeWidget(param2);
                break;
            case "communitygoalvsmodevote":
                _loc3_ = new CommunityGoalVsModeWidgetWithVoting(param2);
                break;
            case "catalogpromo":
                _loc3_ = new CatalogPromoWidget(param2);
                break;
            case "catalogpromosmall":
                _loc3_ = new CatalogPromoWidgetSmall(param2);
                break;
            case "dailyquest":
                _loc3_ = new DailyQuestWidget(param2);
                break;
            case "expiringcatalogpage":
                _loc3_ = new ExpiringCatalogPageWidget(param2);
                break;
            case "expiringcatalogpagesmall":
                _loc3_ = new ExpiringCatalogPageSmallWidget(param2);
                break;
            case "nextlimitedrarecountdown":
                _loc3_ = new NextLimitedRareCountdownWidget(param2);
                break;
            case "habbomoderationpromo":
                _loc3_ = new HabboModerationPromoWidget(param2);
                break;
            case "habbotalentspromo":
                _loc3_ = new HabboTalentsPromoWidget(param2);
                break;
            case "habbowaypromo":
                _loc3_ = new HabboWayPromoWidget(param2);
                break;
            case "roomhoppernetwork":
                _loc3_ = new RoomHopperNetworkWidget(param2);
                break;
            case "safetyquizpromo":
                _loc3_ = new SafetyQuizPromoWidget(param2);
                break;
            case "generic":
                _loc3_ = new GenericWidget(param2);
                break;
            case "widgetcontainer":
                _loc3_ = new WidgetContainerWidget(param2);
                break;
            case "promoarticle":
                _loc3_ = new PromoArticleWidget(param2);
                break;
            case "bonusrare":
                _loc3_ = new BonusRarePromoWidget(param2);
        }
        return _loc3_;
    }

    constructor() {
    }
}
