import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboQuestEngineBootstrap } from '@/com/sulake/bootstrap/HabboQuestEngineBootstrap';
import { IIDHabboQuestEngine } from '@/com/sulake/iid/IIDHabboQuestEngine';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboQuestEngineCom_manifest_binAsset = embedBytes("quest/HabboQuestEngineCom_manifest.bin");
const icon_quest_hidden_pngAsset = embedBitmap("quest/icon_quest_hidden.png");
const Campaign_binAsset = embedBytes("quest/Campaign.bin");
const CampaignCompleted_binAsset = embedBytes("quest/CampaignCompleted.bin");
const EntryArrows_binAsset = embedBytes("quest/EntryArrows.bin");
const QuestEntry_binAsset = embedBytes("quest/QuestEntry.bin");
const Quest_binAsset = embedBytes("quest/Quest.bin");
const QuestDetails_binAsset = embedBytes("quest/QuestDetails.bin");
const Quests_binAsset = embedBytes("quest/Quests.bin");
const QuestTracker_binAsset = embedBytes("quest/QuestTracker.bin");
const QuestCompletedDialog_binAsset = embedBytes("quest/QuestCompletedDialog.bin");
const QuestHelp_binAsset = embedBytes("quest/QuestHelp.bin");
const AchievementCategory_binAsset = embedBytes("quest/AchievementCategory.bin");
const Achievements_binAsset = embedBytes("quest/Achievements.bin");
const AchievementsResolutions_binAsset = embedBytes("quest/AchievementsResolutions.bin");
const AchievementResolutionProgress_binAsset = embedBytes("quest/AchievementResolutionProgress.bin");
const AchievementResolutionCompleted_binAsset = embedBytes("quest/AchievementResolutionCompleted.bin");
const Achievement_binAsset = embedBytes("quest/Achievement.bin");
const AchievementSimple_binAsset = embedBytes("quest/AchievementSimple.bin");
const ProgressBar_binAsset = embedBytes("quest/ProgressBar.bin");
const NextQuestTimer_binAsset = embedBytes("quest/NextQuestTimer.bin");
const SeasonalCalendar_binAsset = embedBytes("quest/SeasonalCalendar.bin");
const RoomCompetition_binAsset = embedBytes("quest/RoomCompetition.bin");
const calendar_quest_complete_pngAsset = embedBitmap("quest/calendar_quest_complete.png");
const arrow_back_active_pngAsset = embedBitmap("quest/arrow_back_active.png");
const arrow_back_inactive_pngAsset = embedBitmap("quest/arrow_back_inactive.png");
const arrow_back_hilite_pngAsset = embedBitmap("quest/arrow_back_hilite.png");
const arrow_next_active_pngAsset = embedBitmap("quest/arrow_next_active.png");
const arrow_next_inactive_pngAsset = embedBitmap("quest/arrow_next_inactive.png");
const arrow_next_hilite_pngAsset = embedBitmap("quest/arrow_next_hilite.png");
const stripe_mask_L_pngAsset = embedBitmap("quest/stripe_mask_L.png");
const stripe_mask_R_pngAsset = embedBitmap("quest/stripe_mask_R.png");
const icon_hourglass_png_pngAsset = embedBitmap("quest/icon_hourglass_png.png");
const daily_tasks_xml_binAsset = embedBytes("quest/daily_tasks_xml.bin");
const dailytasks_unclaimed_xml_binAsset = embedBytes("quest/dailytasks_unclaimed_xml.bin");
const reward_track_main_xml_binAsset = embedBytes("quest/reward_track_main_xml.bin");
const reward_track_premium_purchase_confirmation_xml_binAsset = embedBytes("quest/reward_track_premium_purchase_confirmation_xml.bin");

export class HabboQuestEngineCom extends SimpleApplication {
    static { registerClassName(this, 'HabboQuestEngineCom'); }

    static #staticsReady = false;

    public static manifest = HabboQuestEngineCom_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboQuestEngineCom.#initStatics();
        return HabboQuestEngineCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboQuestEngineCom.#initStatics();
        HabboQuestEngineCom.requiredClasses = value;
    }

    public static readonly icon_quest_hidden = icon_quest_hidden_pngAsset;

    public static readonly Campaign = Campaign_binAsset;

    public static readonly CampaignCompleted = CampaignCompleted_binAsset;

    public static readonly EntryArrows = EntryArrows_binAsset;

    public static readonly QuestEntry = QuestEntry_binAsset;

    public static readonly Quest = Quest_binAsset;

    public static readonly QuestDetails = QuestDetails_binAsset;

    public static readonly Quests = Quests_binAsset;

    public static readonly QuestTracker = QuestTracker_binAsset;

    public static readonly QuestCompletedDialog = QuestCompletedDialog_binAsset;

    public static readonly QuestHelp = QuestHelp_binAsset;

    public static readonly AchievementCategory = AchievementCategory_binAsset;

    public static readonly Achievements = Achievements_binAsset;

    public static readonly AchievementsResolutions = AchievementsResolutions_binAsset;

    public static readonly AchievementResolutionProgress = AchievementResolutionProgress_binAsset;

    public static readonly AchievementResolutionCompleted = AchievementResolutionCompleted_binAsset;

    public static readonly Achievement = Achievement_binAsset;

    public static readonly AchievementSimple = AchievementSimple_binAsset;

    public static readonly ProgressBar = ProgressBar_binAsset;

    public static readonly NextQuestTimer = NextQuestTimer_binAsset;

    public static readonly SeasonalCalendar = SeasonalCalendar_binAsset;

    public static readonly RoomCompetition = RoomCompetition_binAsset;

    public static readonly calendar_quest_complete = calendar_quest_complete_pngAsset;

    public static readonly arrow_back_active = arrow_back_active_pngAsset;

    public static readonly arrow_back_inactive = arrow_back_inactive_pngAsset;

    public static readonly arrow_back_hilite = arrow_back_hilite_pngAsset;

    public static readonly arrow_next_active = arrow_next_active_pngAsset;

    public static readonly arrow_next_inactive = arrow_next_inactive_pngAsset;

    public static readonly arrow_next_hilite = arrow_next_hilite_pngAsset;

    public static readonly stripe_mask_L = stripe_mask_L_pngAsset;

    public static readonly stripe_mask_R = stripe_mask_R_pngAsset;

    public static icon_hourglass_png = icon_hourglass_png_pngAsset;

    public static readonly daily_tasks_xml = daily_tasks_xml_binAsset;

    public static readonly dailytasks_unclaimed_xml = dailytasks_unclaimed_xml_binAsset;

    public static readonly reward_track_main_xml = reward_track_main_xml_binAsset;

    public static readonly reward_track_premium_purchase_confirmation_xml = reward_track_premium_purchase_confirmation_xml_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboQuestEngineCom.#staticsReady) return;
        HabboQuestEngineCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboQuestEngineCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboQuestEngineBootstrap, IIDHabboQuestEngine]);
    }
}
