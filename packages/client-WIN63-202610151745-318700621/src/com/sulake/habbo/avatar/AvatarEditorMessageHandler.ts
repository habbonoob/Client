import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { HabboAvatarEditorManager } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager';
import type { IOutfit } from '@/com/sulake/habbo/avatar/IOutfit';
import type { AvatarEditorNameChangeView } from '@/com/sulake/habbo/avatar/view/AvatarEditorNameChangeView';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { CheckUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/CheckUserNameResultMessageParser';
import { ChangeUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/ChangeUserNameResultMessageEvent';
import { CheckUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/CheckUserNameResultMessageEvent';
import { WardrobeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/WardrobeMessageEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { AvatarEffectActivatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectActivatedMessageEvent';
import { AvatarEffectAddedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectAddedMessageEvent';
import { AvatarEffectExpiredMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectExpiredMessageEvent';
import { AvatarEffectSelectedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectSelectedMessageEvent';
import { AvatarEffectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/AvatarEffectMessageEvent';
import { CheckUserNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/CheckUserNameMessageComposer';
import { GetWardrobeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/GetWardrobeMessageComposer';
import { SaveWardrobeOutfitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/SaveWardrobeOutfitMessageComposer';

export class AvatarEditorMessageHandler {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarEditorMessageHandler'); }

    declare private _communication: IHabboCommunicationManager;

    declare private _controller: HabboAvatarEditorManager;

    constructor(param1: HabboAvatarEditorManager, param2: IHabboCommunicationManager) {
        this._controller = param1;
        this._communication = param2;
        this._communication.addHabboConnectionMessageEvent(new AvatarEffectExpiredMessageEvent(this.onAvatarEffectExpired));
        this._communication.addHabboConnectionMessageEvent(new WardrobeMessageEvent(this.onWardrobe));
        this._communication.addHabboConnectionMessageEvent(new CheckUserNameResultMessageEvent(this.onCheckUserNameResult));
        this._communication.addHabboConnectionMessageEvent(new AvatarEffectMessageEvent(this.onRoomAvatarEffects));
        this._communication.addHabboConnectionMessageEvent(new AvatarEffectSelectedMessageEvent(this.onAvatarEffectSelected));
        this._communication.addHabboConnectionMessageEvent(new AvatarEffectAddedMessageEvent(this.onAvatarEffectAdded));
        this._communication.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this.onUserRights));
        this._communication.addHabboConnectionMessageEvent(new AvatarEffectActivatedMessageEvent(this.onAvatarEffectActivated));
    }

    public dispose(): void {
        this._communication = null;
        this._controller = null;
    }

    public saveWardrobeOutfit(param1: number, param2: IOutfit): void {
        if (this._communication == null) {
            return;
        }
        let _loc3_: SaveWardrobeOutfitMessageComposer = new SaveWardrobeOutfitMessageComposer(param1, param2.figure, param2.gender);
        this._communication.connection.send(_loc3_);
        _loc3_.dispose();
        _loc3_ = null;
    }

    public checkName(param1: string): void {
        if (this._communication == null) {
            return;
        }
        this._communication.connection.send(new CheckUserNameMessageComposer(param1));
    }

    private onCheckUserNameResult = (param1: CheckUserNameResultMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc3_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: AvatarEditorNameChangeView = _loc3_.view.avatarEditorNameChangeView;
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: CheckUserNameResultMessageParser = param1.getParser();
        if (_loc4_.resultCode == ChangeUserNameResultMessageEvent._SafeStr_4064) {
            _loc2_.checkedName = _loc4_.name;
        } else {
            _loc2_.setNameNotAvailableView(_loc4_.resultCode, _loc4_.name, _loc4_.nameSuggestions);
        }
    };

    public getWardrobe(): void {
        if (this._communication == null) {
            return;
        }
        let _loc1_: GetWardrobeMessageComposer = new GetWardrobeMessageComposer();
        this._communication.connection.send(_loc1_);
        _loc1_.dispose();
        _loc1_ = null;
    }

    private onWardrobe = (param1: WardrobeMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_) {
            _loc2_.wardrobe.updateSlots(param1.state, param1.outfits);
        }
    };

    private onUserRights = (param1: UserRightsMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_) {
            _loc2_.clubMemberLevel = param1.clubLevel != 0 ? 2 : 0;
            _loc2_.update();
        }
    };

    private onAvatarEffectAdded = (param1: IMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_) {
            _loc2_.effects.reset();
        }
    };

    private onAvatarEffectActivated = (param1: AvatarEffectActivatedMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_) {
            _loc2_.effects.reset();
            _loc2_.figureData.avatarEffectType = param1.getParser().type;
            _loc2_.figureData.updateView();
        }
    };

    private onAvatarEffectExpired = (param1: AvatarEffectExpiredMessageEvent): void => {
        let _loc3_: number = 0;
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_) {
            _loc2_.effects.reset();
            _loc3_ = param1.getParser().type;
            if (_loc2_.figureData.avatarEffectType == _loc3_) {
                _loc2_.figureData.avatarEffectType = -1;
                _loc2_.figureData.updateView();
            }
        }
    };

    private onRoomAvatarEffects = (param1: AvatarEffectMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_ && this._controller.roomDesktop != null && param1.getParser().userId == this._controller.roomDesktop.roomSession.ownUserRoomId) {
            _loc2_.figureData.avatarEffectType = param1.getParser().effectId;
            _loc2_.figureData.updateView();
        }
    };

    private onAvatarEffectSelected = (param1: AvatarEffectExpiredMessageEvent): void => {
        if (param1 == null || !this._controller) {
            return;
        }
        let _loc2_: HabboAvatarEditor = this._controller.getEditor(0);
        if (_loc2_) {
            _loc2_.figureData.avatarEffectType = param1.getParser().type;
            _loc2_.figureData.updateView();
        }
    };
}
