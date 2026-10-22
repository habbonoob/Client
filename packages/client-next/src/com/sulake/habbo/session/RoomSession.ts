import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { RoomModerationSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomModerationSettings';
import type { IUserDataManager } from '@/com/sulake/habbo/session/IUserDataManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VisitUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/VisitUserMessageComposer';
import { Game2GameChatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/arena/Game2GameChatMessageComposer';
import { NewUserExperienceScriptProceedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nux/NewUserExperienceScriptProceedComposer';
import { PollAnswerComposer } from '@/com/sulake/habbo/communication/messages/outgoing/poll/PollAnswerComposer';
import { PollRejectComposer } from '@/com/sulake/habbo/communication/messages/outgoing/poll/PollRejectComposer';
import { PollStartComposer } from '@/com/sulake/habbo/communication/messages/outgoing/poll/PollStartComposer';
import { AmbassadorAlertMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/AmbassadorAlertMessageComposer';
import { AssignRightsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/AssignRightsMessageComposer';
import { BanUserWithDurationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/BanUserWithDurationMessageComposer';
import { KickUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/KickUserMessageComposer';
import { LetUserInMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/LetUserInMessageComposer';
import { MuteUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/MuteUserMessageComposer';
import { RemoveRightsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/RemoveRightsMessageComposer';
import { UnmuteUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/UnmuteUserMessageComposer';
import { AvatarExpressionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/AvatarExpressionMessageComposer';
import { ChangeMottoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/ChangeMottoMessageComposer';
import { ChangePostureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/ChangePostureMessageComposer';
import { DanceMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/DanceMessageComposer';
import { SignMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/SignMessageComposer';
import { CancelTypingMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/chat/CancelTypingMessageComposer';
import { ChatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/chat/ChatMessageComposer';
import { ShoutMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/chat/ShoutMessageComposer';
import { StartTypingMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/chat/StartTypingMessageComposer';
import { WhisperMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/chat/WhisperMessageComposer';
import { CompostPlantMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/CompostPlantMessageComposer';
import { GetPetCommandsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/GetPetCommandsMessageComposer';
import { HarvestPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/HarvestPetMessageComposer';
import { MountPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/MountPetMessageComposer';
import { RemovePetFromFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/RemovePetFromFlatMessageComposer';
import { RemoveSaddleFromPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/RemoveSaddleFromPetMessageComposer';
import { SetClothingChangeDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/SetClothingChangeDataMessageComposer';
import { TogglePetBreedingPermissionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/TogglePetBreedingPermissionMessageComposer';
import { TogglePetRidingPermissionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/TogglePetRidingPermissionMessageComposer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { CreditFurniRedeemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/CreditFurniRedeemMessageComposer';
import { OpenPetPackageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/OpenPetPackageMessageComposer';
import { PresentOpenMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/PresentOpenMessageComposer';
import { RoomDimmerChangeStateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/RoomDimmerChangeStateMessageComposer';
import { RoomDimmerGetPresetsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/RoomDimmerGetPresetsMessageComposer';
import { RoomDimmerSavePresetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/RoomDimmerSavePresetMessageComposer';
import { CustomizePetWithFurniComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/pets/CustomizePetWithFurniComposer';
import { ChangeQueueMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/ChangeQueueMessageComposer';
import { OpenFlatConnectionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/OpenFlatConnectionMessageComposer';
import { QuitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/QuitMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { PeerUsersClassificationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userclassification/PeerUsersClassificationMessageComposer';
import { RoomUsersClassificationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userclassification/RoomUsersClassificationMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { isIUserDataManager } from '@/com/sulake/habbo/session/IUserDataManager';
import { UserDataManager } from '@/com/sulake/habbo/session/UserDataManager';

export class RoomSession implements IRoomSession {
    static { registerClassName(this, 'com.sulake.habbo.session::RoomSession'); }

    private readonly CHAT_LAG_WARNING_LIMIT: number = 2500;

    declare private _connection: IConnection;

    private _roomId: number = 0;
    private _password: string = "";
    private _skipOpc: boolean = false;
    private _roomResources: string = "";
    private _openConnectionComposer: IMessageComposer = null;
    private _state: string = "RSE_CREATED";

    declare private _userDataManager: UserDataManager;

    private _SafeStr_6670: number = -1;
    private _isRoomOwner: boolean = false;
    private _roomControllerLevel: number = 0;
    private _playTestMode: boolean = false;
    private _tradeMode: number = 0;
    private _isGuildRoom: boolean = false;
    private _isSpectatorMode: boolean = false;
    private _SafeStr_7014: boolean = false;

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    private _SafeStr_3690: UtilsMap = new UtilsMap();
    private _SafeStr_5349: number = 0;
    private _habboTracking: IHabboTracking = null;
    private _SafeStr_6372: boolean = false;
    private _isGameSession: boolean = false;
    private _SafeStr_6111: boolean = false;
    private _roomModerationSettings: RoomModerationSettings = null;

    constructor() {
        this._userDataManager = new UserDataManager();
    }

    public set connection(param1: IConnection) {
        if (param1 == null) {
            return;
        }
        this._connection = param1;
        if (this._userDataManager != null) {
            this._userDataManager.connection = param1;
        }
    }

    public dispose(): void {
        this._connection = null;
        if (this._userDataManager != null) {
            this._userDataManager.dispose();
            this._userDataManager = null;
        }
        if (this._SafeStr_3690 != null) {
            this._SafeStr_3690.dispose();
            this._SafeStr_3690 = null;
        }
        if (this._openConnectionComposer) {
            this._openConnectionComposer.dispose();
            this._openConnectionComposer = null;
        }
        if (this._roomModerationSettings != null) {
            this._roomModerationSettings = null;
        }
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }

    public get roomPassword(): string {
        return this._password;
    }

    public set roomPassword(param1: string) {
        this._password = param1;
    }

    public get roomResources(): string {
        return this._roomResources;
    }

    public set roomResources(param1: string) {
        this._roomResources = param1;
    }

    public get openConnectionComposer(): IMessageComposer {
        return this._openConnectionComposer;
    }

    public set openConnectionComposer(param1: IMessageComposer) {
        this._openConnectionComposer = param1;
    }

    public get state(): string {
        return this._state;
    }

    public get habboTracking(): IHabboTracking {
        return this._habboTracking;
    }

    public set habboTracking(param1: IHabboTracking) {
        this._habboTracking = param1;
    }

    public get isGameSession(): boolean {
        return this._isGameSession;
    }

    public set isGameSession(param1: boolean) {
        this._isGameSession = param1;
    }

    public get roomModerationSettings(): RoomModerationSettings {
        return this._roomModerationSettings;
    }

    public set roomModerationSettings(param1: RoomModerationSettings) {
        this._roomModerationSettings = param1;
    }

    public get playTestMode(): boolean {
        return this._playTestMode;
    }

    public set playTestMode(param1: boolean) {
        this._playTestMode = param1;
    }

    public trackEventLogOncePerSession(param1: string, param2: string, param3: string): void {
        this._habboTracking.trackEventLogOncePerSession(param1, param2, param3);
    }

    public start(): boolean {
        if (this._state == "RSE_CREATED" && this._connection != null) {
            this._state = "RSE_STARTED";
            if (!this._skipOpc) {
                if (this._openConnectionComposer) {
                    return this.sendPredefinedOpenConnection();
                }
                return this.sendOpenFlatConnectionMessage();
            }
            return true;
        }
        return false;
    }

    public reset(param1: number): void {
        if (param1 != this._roomId) {
            this._roomId = param1;
            this._isRoomOwner = false;
            this._roomControllerLevel = 0;
            this._tradeMode = 0;
            this._isSpectatorMode = false;
        }
    }

    private sendOpenFlatConnectionMessage(): boolean {
        if (this._connection == null) {
            return false;
        }
        this._connection.send(new OpenFlatConnectionMessageComposer(this._roomId, this._password));
        return true;
    }

    private sendPredefinedOpenConnection(): boolean {
        if (this._connection == null) {
            return false;
        }
        this._connection.send(this._openConnectionComposer);
        this._openConnectionComposer = null;
        return true;
    }

    public sendChatMessage(param1: string, param2: number = 0): void {
        if (this._connection == null) {
            return;
        }
        if (this._isGameSession) {
            this._connection.send(new Game2GameChatMessageComposer(param1));
        } else {
            param1 = param1.replace(/&#[0-9]+;/g, "");
            this._connection.send(new ChatMessageComposer(param1, param2, this._SafeStr_5349));
            this._SafeStr_3690.add(this._SafeStr_5349, getTimer());
            this._SafeStr_5349 = this._SafeStr_5349 + 1;
        }
    }

    public sendChangeMottoMessage(param1: string): void {
        this._connection.send(new ChangeMottoMessageComposer(param1));
    }

    public receivedChatWithTrackingId(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: any = this._SafeStr_3690.remove(param1);
        if (_loc2_ != null) {
            _loc3_ = getTimer();
            if (_loc3_ - (_loc2_ | 0) > 2500) {
                if (this._habboTracking != null) {
                    this._habboTracking.chatLagDetected(_loc3_);
                }
            }
        }
    }

    public sendShoutMessage(param1: string, param2: number = 0): void {
        if (this._connection == null) {
            return;
        }
        this._connection.send(new ShoutMessageComposer(param1, param2));
    }

    public sendWhisperMessage(param1: string, param2: string, param3: number = 0): void {
        if (this._connection == null) {
            return;
        }
        this._connection.send(new WhisperMessageComposer(param1, param2, param3));
    }

    public sendChatTypingMessage(param1: boolean): void {
        if (this._connection == null) {
            return;
        }
        if (param1) {
            this._connection.send(new StartTypingMessageComposer());
        } else {
            this._connection.send(new CancelTypingMessageComposer());
        }
    }

    public sendAvatarExpressionMessage(param1: number): void {
        this._connection.send(new AvatarExpressionMessageComposer(param1));
    }

    public sendSignMessage(param1: number): void {
        if (param1 >= 0 && param1 <= 17) {
            this._connection.send(new SignMessageComposer(param1));
        }
    }

    public sendDanceMessage(param1: number): void {
        this._connection.send(new DanceMessageComposer(param1));
    }

    public sendChangePostureMessage(param1: number): void {
        this._connection.send(new ChangePostureMessageComposer(param1));
    }

    public sendCreditFurniRedeemMessage(param1: number): void {
        this._connection.send(new CreditFurniRedeemMessageComposer(param1));
    }

    public sendPresentOpenMessage(param1: number): void {
        this._connection.send(new PresentOpenMessageComposer(param1));
    }

    public sendOpenPetPackageMessage(param1: number, param2: string): void {
        this._connection.send(new OpenPetPackageMessageComposer(param1, param2));
    }

    public sendRoomDimmerGetPresetsMessage(param1: number): void {
        this._connection.send(new RoomDimmerGetPresetsMessageComposer(param1));
    }

    public sendRoomDimmerSavePresetMessage(param1: number, param2: number, param3: number, param4: number, param5: boolean, param6: number): void {
        let _loc7_: string = "000000" + param3.toString(16).toUpperCase();
        let _loc8_: string = "#" + _loc7_.substr(_loc7_.length - 6);
        this._connection.send(new RoomDimmerSavePresetMessageComposer(param1, param2, _loc8_, param4, param5, param6));
    }

    public sendRoomDimmerChangeStateMessage(param1: number): void {
        this._connection.send(new RoomDimmerChangeStateMessageComposer(param1));
    }

    public sendConversionPoint(param1: string, param2: string, param3: string, param4: string = null, param5: number = 0): void {
        this._connection.send(new EventLogMessageComposer(param1, param2, param3, param4, param5));
    }

    public sendPollStartMessage(param1: number): void {
        this._connection.send(new PollStartComposer(param1));
    }

    public sendPollRejectMessage(param1: number): void {
        this._connection.send(new PollRejectComposer(param1));
    }

    public sendPollAnswerMessage(param1: number, param2: number, param3: any[]): void {
        this._connection.send(new PollAnswerComposer(param1, param2, param3));
    }

    public sendPeerUsersClassificationMessage(param1: string): void {
        this._connection.send(new PeerUsersClassificationMessageComposer(param1));
    }

    public sendRoomUsersClassificationMessage(param1: string): void {
        this._connection.send(new RoomUsersClassificationMessageComposer(param1));
    }

    public sendVisitFlatMessage(param1: number): void {
        this._connection.send(new OpenFlatConnectionMessageComposer(param1));
    }

    public sendVisitUserMessage(param1: string): void {
        this._connection.send(new VisitUserMessageComposer(param1));
    }

    public ambassadorAlert(param1: number): void {
        this._connection.send(new AmbassadorAlertMessageComposer(param1));
    }

    public kickUser(param1: number): void {
        this._connection.send(new KickUserMessageComposer(param1));
    }

    public banUserWithDuration(param1: number, param2: string): void {
        this._connection.send(new BanUserWithDurationMessageComposer(param1, param2, this.roomId));
    }

    public muteUser(param1: number, param2: number): void {
        this._connection.send(new MuteUserMessageComposer(param1, param2, this.roomId));
    }

    public unmuteUser(param1: number): void {
        this._connection.send(new UnmuteUserMessageComposer(param1, this.roomId));
    }

    public assignRights(param1: number): void {
        this._connection.send(new AssignRightsMessageComposer(param1));
    }

    public removeRights(param1: number): void {
        let _loc3_: any[] = [];
        _loc3_.push(param1);
        let _loc2_: RemoveRightsMessageComposer = new RemoveRightsMessageComposer(_loc3_);
        this._connection.send(_loc2_);
    }

    public letUserIn(param1: string, param2: boolean): void {
        this._connection.send(new LetUserInMessageComposer(param1, param2));
    }

    public pickUpPet(param1: number): void {
        this._connection.send(new RemovePetFromFlatMessageComposer(param1));
    }

    public mountPet(param1: number): void {
        this._connection.send(new MountPetMessageComposer(param1, true));
    }

    public togglePetRidingPermission(param1: number): void {
        this._connection.send(new TogglePetRidingPermissionMessageComposer(param1));
    }

    public togglePetBreedingPermission(param1: number): void {
        this._connection.send(new TogglePetBreedingPermissionMessageComposer(param1));
    }

    public dismountPet(param1: number): void {
        this._connection.send(new MountPetMessageComposer(param1, false));
    }

    public removeSaddleFromPet(param1: number): void {
        this._connection.send(new RemoveSaddleFromPetMessageComposer(param1));
    }

    public harvestPet(param1: number): void {
        this._connection.send(new HarvestPetMessageComposer(param1));
    }

    public compostPlant(param1: number): void {
        this._connection.send(new CompostPlantMessageComposer(param1));
    }

    public requestPetCommands(param1: number): void {
        this._connection.send(new GetPetCommandsMessageComposer(param1));
    }

    public useProductForPet(param1: number, param2: number): void {
        this._connection.send(new CustomizePetWithFurniComposer(param1, param2));
    }

    public plantSeed(param1: number): void {
        this._connection.send(new UseFurnitureMessageComposer(param1));
    }

    public sendScriptProceed(): void {
        this._connection.send(new NewUserExperienceScriptProceedComposer());
    }

    public quit(): void {
        if (this._connection != null) {
            this._connection.send(new QuitMessageComposer());
        }
    }

    public changeQueue(param1: number): void {
        if (this._connection == null) {
            return;
        }
        this._connection.send(new ChangeQueueMessageComposer(param1));
    }

    public sendUpdateClothingChangeFurniture(param1: number, param2: string, param3: string): void {
        if (this._connection == null) {
            return;
        }
        let _loc4_: SetClothingChangeDataMessageComposer = new SetClothingChangeDataMessageComposer(param1, param2, param3);
        this._connection.send(_loc4_);
        _loc4_.dispose();
        _loc4_ = null;
    }

    public get userDataManager(): IUserDataManager {
        return isIUserDataManager(this._userDataManager) ? this._userDataManager : null;
    }

    public get ownUserRoomId(): number {
        return this._SafeStr_6670;
    }

    public set ownUserRoomId(param1: number) {
        this._SafeStr_6670 = param1;
    }

    public set isRoomOwner(param1: boolean) {
        this._isRoomOwner = param1;
    }

    public get isRoomOwner(): boolean {
        return this._isRoomOwner;
    }

    public set roomControllerLevel(param1: number) {
        if (param1 >= 0 && param1 <= 5) {
            this._roomControllerLevel = param1;
        } else {
            Logger.log("Invalid roomControllerLevel " + param1 + ", setting to ROOM_CONTROL_LEVEL_NONE instead");
            this._roomControllerLevel = 0;
        }
    }

    public get roomControllerLevel(): number {
        if (this._playTestMode) {
            return 0;
        }
        return this._roomControllerLevel;
    }

    public get tradeMode(): number {
        return this._tradeMode;
    }

    public get isPrivateRoom(): boolean {
        return true;
    }

    public set tradeMode(param1: number) {
        this._tradeMode = param1;
    }

    public get isGuildRoom(): boolean {
        return this._isGuildRoom;
    }

    public set isGuildRoom(param1: boolean) {
        this._isGuildRoom = param1;
    }

    public get isNoobRoom(): boolean {
        return this._doorMode == 4;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    public get doorMode(): number {
        return this._doorMode;
    }

    public get isSpectatorMode(): boolean {
        return this._isSpectatorMode;
    }

    public set isSpectatorMode(param1: boolean) {
        this._isSpectatorMode = param1;
    }

    public get arePetsAllowed(): boolean {
        return this._SafeStr_7014;
    }

    public set arePetsAllowed(param1: boolean) {
        this._SafeStr_7014 = param1;
    }

    public get areBotsAllowed(): boolean {
        return this._isRoomOwner;
    }

    public get isUserDecorating(): boolean {
        return this._SafeStr_6372;
    }

    public set isUserDecorating(param1: boolean) {
        this._SafeStr_6372 = param1;
    }

    public get isNuxNotComplete(): boolean {
        return this._SafeStr_6111;
    }

    public set isNuxNotComplete(param1: boolean) {
        this._SafeStr_6111 = param1;
    }

    public set skipOpc(param1: boolean) {
        this._skipOpc = param1;
    }

    get [IRoomSession](): true {
        return true;
    }
}
