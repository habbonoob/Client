import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { AchievementResolutionCompletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/AchievementResolutionCompletedMessageParser';
import type { AchievementResolutionProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/AchievementResolutionProgressMessageParser';
import type { AchievementResolutionsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/AchievementResolutionsMessageParser';
import type { IsFirstLoginOfDayParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/IsFirstLoginOfDayParser';
import type { HabboAchievementNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboAchievementNotificationMessageParser';
import type { QuestCancelledMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestCancelledMessageParser';
import type { QuestCompletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestCompletedMessageParser';
import type { QuestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestMessageParser';
import type { QuestsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestsMessageParser';
import type { SeasonalQuestsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/SeasonalQuestsMessageParser';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { CompetitionEntrySubmitResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CompetitionEntrySubmitResultMessageEvent';
import { CompetitionVotingInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CompetitionVotingInfoMessageEvent';
import { AchievementResolutionCompletedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/lobby/AchievementResolutionCompletedMessageEvent';
import { AchievementResolutionProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/lobby/AchievementResolutionProgressMessageEvent';
import { AchievementResolutionsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/lobby/AchievementResolutionsMessageEvent';
import { IsFirstLoginOfDayEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/IsFirstLoginOfDayEvent';
import { AchievementEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementEvent';
import { AchievementsEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementsEvent';
import { AchievementsScoreEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementsScoreEvent';
import { ActivityPointsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/ActivityPointsMessageEvent';
import { HabboAchievementNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboAchievementNotificationMessageEvent';
import { HabboActivityPointNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboActivityPointNotificationMessageEvent';
import { QuestCancelledMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestCancelledMessageEvent';
import { QuestCompletedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestCompletedMessageEvent';
import { QuestMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageEvent';
import { QuestsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestsMessageEvent';
import { SeasonalQuestsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/SeasonalQuestsMessageEvent';
import { ObjectAddMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectAddMessageEvent';
import { ObjectRemoveMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectRemoveMessageEvent';
import { ObjectRemoveMultipleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectRemoveMultipleMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { RoomSettingsSavedEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsSavedEvent';
import { ScrSendUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendUserInfoEvent';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { AchievementMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementMessageParser';
import { AchievementsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementsMessageParser';
import { AchievementsScoreMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementsScoreMessageParser';
import { QuestCompletedEvent } from '@/com/sulake/habbo/quest/events/QuestCompletedEvent';
import { QuestsListEvent } from '@/com/sulake/habbo/quest/events/QuestsListEvent';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class IncomingMessages implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::IncomingMessages'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        IncomingMessages.#initStatics();
        return IncomingMessages._log;
    }

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        let _loc2_: IHabboCommunicationManager = this._questEngine.communication;
        _loc2_.addHabboConnectionMessageEvent(new HabboActivityPointNotificationMessageEvent(this.onActivityPointsNotification));
        _loc2_.addHabboConnectionMessageEvent(new QuestCancelledMessageEvent(this.onQuestCancelled));
        _loc2_.addHabboConnectionMessageEvent(new AchievementsEvent(this.onAchievements));
        _loc2_.addHabboConnectionMessageEvent(new ActivityPointsMessageEvent(this.onActivityPoints));
        _loc2_.addHabboConnectionMessageEvent(new AchievementResolutionCompletedMessageEvent(this.onAchievementResolutionCompleted));
        _loc2_.addHabboConnectionMessageEvent(new CompetitionEntrySubmitResultMessageEvent(this.onCompetitionEntrySubmitResult));
        _loc2_.addHabboConnectionMessageEvent(new CloseConnectionMessageEvent(this.onRoomExit));
        _loc2_.addHabboConnectionMessageEvent(new AchievementResolutionProgressMessageEvent(this.onAchievementResolutionProgress));
        _loc2_.addHabboConnectionMessageEvent(new ObjectAddMessageEvent(this.onFurnisChanged));
        _loc2_.addHabboConnectionMessageEvent(new QuestCompletedMessageEvent(this.onQuestCompleted));
        _loc2_.addHabboConnectionMessageEvent(new RoomSettingsSavedEvent(this.onRoomSettingsSaved));
        _loc2_.addHabboConnectionMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        _loc2_.addHabboConnectionMessageEvent(new ObjectRemoveMultipleMessageEvent(this.onFurnisChanged));
        _loc2_.addHabboConnectionMessageEvent(new ObjectRemoveMessageEvent(this.onFurnisChanged));
        _loc2_.addHabboConnectionMessageEvent(new QuestMessageEvent(this.onQuest));
        _loc2_.addHabboConnectionMessageEvent(new CompetitionVotingInfoMessageEvent(this.onCompetitionVotingInfo));
        _loc2_.addHabboConnectionMessageEvent(new QuestsMessageEvent(this.onQuests));
        _loc2_.addHabboConnectionMessageEvent(new AchievementEvent(this.onAchievement));
        _loc2_.addHabboConnectionMessageEvent(new SeasonalQuestsMessageEvent(this.onSeasonalQuests));
        _loc2_.addHabboConnectionMessageEvent(new HabboAchievementNotificationMessageEvent(this.onLevelUp));
        _loc2_.addHabboConnectionMessageEvent(new AchievementsScoreEvent(this.onAchievementsScore));
        _loc2_.addHabboConnectionMessageEvent(new IsFirstLoginOfDayEvent(this.onIsFirstLoginOfDay));
        _loc2_.addHabboConnectionMessageEvent(new AchievementResolutionsMessageEvent(this.onAchievementResolutions));
        _loc2_.addHabboConnectionMessageEvent(new ScrSendUserInfoEvent(this.onSubscriptionUserInfoEvent));
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _SafeStr_5859: IAlertDialog;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._SafeStr_5859) {
            this._SafeStr_5859.dispose();
            this._SafeStr_5859 = null;
        }
        this._disposed = true;
    }

    private onQuestCompleted = (param1: IMessageEvent): void => {
        let _loc2_: QuestCompletedMessageParser = (param1 instanceof QuestCompletedMessageEvent ? param1 : null).getParser();
        IncomingMessages._log.info("Quest Completed: " + _loc2_.questData.campaignCode + " quest: " + _loc2_.questData.id);
        this._questEngine.questController.onQuestCompleted(_loc2_.questData, _loc2_.showDialog);
        if (this._questEngine.isSeasonalQuest(_loc2_.questData)) {
            this._questEngine.events.dispatchEvent(new QuestCompletedEvent("qce_seasonal", _loc2_.questData));
        }
    };

    private onQuestCancelled = (param1: IMessageEvent): void => {
        let _loc2_: QuestCancelledMessageParser = castTo(param1, QuestCancelledMessageEvent).getParser();
        IncomingMessages._log.info("Quest Cancelled: " + _loc2_.quest.id);
        this._questEngine.questController.onQuestCancelled(_loc2_.quest.campaignChainCode);
        if (_loc2_.expired) {
            this._questEngine.windowManager.alert("${quests.expired.title}", "${quests.expired.body}", 0, null);
        }
    };

    private onQuests = (param1: IMessageEvent): void => {
        let _loc2_: QuestsMessageParser = (param1 instanceof QuestsMessageEvent ? param1 : null).getParser();
        IncomingMessages._log.info("Got Quests: " + _loc2_.quests + ", " + _loc2_.openWindow);
        this._questEngine.events.dispatchEvent(new QuestsListEvent("qu_quests", _loc2_.quests, _loc2_.openWindow));
    };

    private onSeasonalQuests = (param1: IMessageEvent): void => {
        let _loc2_: SeasonalQuestsMessageParser = (param1 instanceof SeasonalQuestsMessageEvent ? param1 : null).getParser();
        IncomingMessages._log.info("Got seasonal Quests: " + _loc2_.quests);
        this._questEngine.events.dispatchEvent(new QuestsListEvent("qe_quests_seasonal", _loc2_.quests, true));
    };

    private onQuest = (param1: IMessageEvent): void => {
        let _loc2_: QuestMessageParser = (param1 instanceof QuestMessageEvent ? param1 : null).getParser();
        IncomingMessages._log.info("Got Quest: " + _loc2_.quest);
        this._questEngine.questController.onQuest(_loc2_.quest);
    };

    private onRoomEnter = (param1: RoomEntryInfoMessageEvent): void => {
        this._questEngine.roomCompetitionController.onRoomEnter(param1);
        this._questEngine.currentlyInRoom = true;
    };

    private onRoomExit = (param1: IMessageEvent): void => {
        this._questEngine.questController.onRoomExit();
        this._questEngine.achievementController.onRoomExit();
        this._questEngine.roomCompetitionController.onRoomExit();
        this._questEngine.currentlyInRoom = false;
    };

    private onFurnisChanged = (param1: IMessageEvent): void => {
        this._questEngine.roomCompetitionController.onContextChanged();
    };

    private onRoomSettingsSaved = (param1: IMessageEvent): void => {
        this._questEngine.roomCompetitionController.onContextChanged();
    };

    private onAchievements = (param1: IMessageEvent): void => {
        let _loc2_: AchievementsEvent = param1 instanceof AchievementsEvent ? param1 : null;
        let _loc3_: AchievementsMessageParser = asInstanceOf(_loc2_.getParser(), AchievementsMessageParser);
        this._questEngine.achievementController.onAchievements(_loc3_.achievements, _loc3_.defaultCategory);
    };

    private onAchievementResolutions = (param1: AchievementResolutionsMessageEvent): void => {
        let _loc2_: AchievementResolutionsMessageParser = param1.getParser();
        this._questEngine.achievementsResolutionController.onResolutionAchievements(_loc2_.stuffId, _loc2_.achievements, _loc2_.endTime);
    };

    private onAchievementResolutionProgress = (param1: AchievementResolutionProgressMessageEvent): void => {
        let _loc2_: AchievementResolutionProgressMessageParser = param1.getParser();
        this._questEngine.achievementsResolutionController.onResolutionProgress(_loc2_.stuffId, _loc2_.achievementId, _loc2_.requiredLevelBadgeCode, _loc2_.userProgress, _loc2_.totalProgress, _loc2_.endTime);
    };

    private onAchievementResolutionCompleted = (param1: AchievementResolutionCompletedMessageEvent): void => {
        let _loc2_: AchievementResolutionCompletedMessageParser = param1.getParser();
        this._questEngine.achievementsResolutionController.onResolutionCompleted(_loc2_.badgeCode, _loc2_.stuffCode);
    };

    private onAchievement = (param1: IMessageEvent): void => {
        let _loc2_: AchievementEvent = param1 instanceof AchievementEvent ? param1 : null;
        let _loc3_: AchievementMessageParser = asInstanceOf(_loc2_.getParser(), AchievementMessageParser);
        this._questEngine.achievementController.onAchievement(_loc3_.achievement);
        this._questEngine.achievementsResolutionController.onAchievement(_loc3_.achievement);
    };

    private onAchievementsScore = (param1: IMessageEvent): void => {
        let _loc2_: AchievementsScoreEvent = param1 instanceof AchievementsScoreEvent ? param1 : null;
        let _loc3_: AchievementsScoreMessageParser = asInstanceOf(_loc2_.getParser(), AchievementsScoreMessageParser);
        this._questEngine.localization.registerParameter("achievements.categories.score", "score", _loc3_.score.toString());
    };

    private onLevelUp = (param1: IMessageEvent): void => {
        let _loc2_: HabboAchievementNotificationMessageEvent = param1 instanceof HabboAchievementNotificationMessageEvent ? param1 : null;
        let _loc3_: HabboAchievementNotificationMessageParser = _loc2_.getParser();
        let _loc4_: string = this._questEngine.localization.getBadgeBaseName(_loc3_.data.badgeCode);
        this._questEngine.send(new EventLogMessageComposer("Achievements", _loc4_, "Leveled", "", _loc3_.data.level));
        this._questEngine.achievementsResolutionController.onLevelUp(_loc3_.data);
    };

    private onIsFirstLoginOfDay = (param1: IMessageEvent): void => {
        let _loc2_: IsFirstLoginOfDayParser = (param1 instanceof IsFirstLoginOfDayEvent ? param1 : null).getParser();
        this._questEngine.setIsFirstLoginOfDay(_loc2_.isFirstLoginOfDay);
    };

    private onCompetitionEntrySubmitResult = (param1: CompetitionEntrySubmitResultMessageEvent): void => {
        this._questEngine.roomCompetitionController.onCompetitionEntrySubmitResult(param1);
    };

    private onCompetitionVotingInfo = (param1: CompetitionVotingInfoMessageEvent): void => {
        this._questEngine.roomCompetitionController.onCompetitionVotingInfo(param1);
    };

    private onSubscriptionUserInfoEvent = (param1: ScrSendUserInfoEvent): void => {
        if (param1.getParser().isVIP && param1.getParser().responseType == 2) {
            this._questEngine.roomCompetitionController.sendRoomCompetitionInit();
        }
    };

    private onActivityPoints = (param1: IMessageEvent): void => {
        let _loc3_: Map<any, any> = castTo(param1, ActivityPointsMessageEvent).points;
        for (const _loc4_ of ActivityPointTypeEnum.values() ?? []) {
            this._questEngine.questController.onActivityPoints(_loc4_ | 0, 0);
        }
        for (const _loc2_ of _loc3_?.keys() ?? []) {
            this._questEngine.questController.onActivityPoints(_loc2_ | 0, _loc3_.get(_loc2_) | 0);
        }
    };

    private onActivityPointsNotification = (param1: HabboActivityPointNotificationMessageEvent): void => {
        this._questEngine.questController.onActivityPoints(param1.type, param1.amount);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (IncomingMessages.#staticsReady) return;
        IncomingMessages.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(IncomingMessages, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.quest.IncomingMessages"));
    }

    get [IDisposable](): true {
        return true;
    }
}
