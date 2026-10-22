import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { ActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionType';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import { ActionDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/ActionDefinition';
import { AdjustClock } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/AdjustClock';
import { BotChangeFigure } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotChangeFigure';
import { BotFollowAvatar } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotFollowAvatar';
import { BotGiveHandItem } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotGiveHandItem';
import { BotMove } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotMove';
import { BotTalk } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotTalk';
import { BotTalkDirectToAvatar } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotTalkDirectToAvatar';
import { BotTeleport } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/BotTeleport';
import { CallAnotherStack } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/CallAnotherStack';
import { ChangeVariable } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ChangeVariable';
import { Chase } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/Chase';
import { Chat } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/Chat';
import { CancelTransaction } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/chests/CancelTransaction';
import { GiveCurrencyFromChest } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/chests/GiveCurrencyFromChest';
import { GiveItemsFromChest } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/chests/GiveItemsFromChest';
import { InitiateTransaction } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/chests/InitiateTransaction';
import { ControlClock } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ControlClock';
import { Flee } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/Flee';
import { FreezeUser } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/FreezeUser';
import { GiveReward } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/GiveReward';
import { GiveScore } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/GiveScore';
import { GiveScoreToPredefinedTeam } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/GiveScoreToPredefinedTeam';
import { GiveVariable } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/GiveVariable';
import { JoinTeam } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/JoinTeam';
import { KickFromRoom } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/KickFromRoom';
import { LeaveTeam } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/LeaveTeam';
import { MoveFurni } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveFurni';
import { MoveFurniTo } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveFurniTo';
import { MoveFurniToFurni } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveFurniToFurni';
import { MoveFurniToUser } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveFurniToUser';
import { MoveToDirection } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveToDirection';
import { MoveUser } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveUser';
import { MoveUserToFurni } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MoveUserToFurni';
import { MuteUser } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/MuteUser';
import { RelativeFurniMove } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/RelativeFurniMove';
import { RemoveVariable } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/RemoveVariable';
import { Reset } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/Reset';
import { SendSignal } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/SendSignal';
import { SetFurniAltitude } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/SetFurniAltitude';
import { SetFurniStateTo } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/SetFurniStateTo';
import { Teleport } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/Teleport';
import { TeleportToRoom } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/TeleportToRoom';
import { ToggleFurniState } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ToggleFurniState';
import { ToggleToRandomState } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ToggleToRandomState';
import { UnfreezeUser } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/UnfreezeUser';
import { WriteToLogs } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/WriteToLogs';

export class ActionTypes implements ElementTypeHolder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ActionTypes'); }

    constructor() {
        this._types.push(new ToggleFurniState());
        this._types.push(new Reset());
        this._types.push(new SetFurniStateTo());
        this._types.push(new MoveFurni());
        this._types.push(new GiveScore());
        this._types.push(new Chat());
        this._types.push(new Teleport());
        this._types.push(new JoinTeam());
        this._types.push(new LeaveTeam());
        this._types.push(new Chase());
        this._types.push(new Flee());
        this._types.push(new MoveToDirection());
        this._types.push(new GiveScoreToPredefinedTeam());
        this._types.push(new ToggleToRandomState());
        this._types.push(new MoveFurniTo());
        this._types.push(new GiveReward());
        this._types.push(new CallAnotherStack());
        this._types.push(new KickFromRoom());
        this._types.push(new MuteUser());
        this._types.push(new BotTeleport());
        this._types.push(new BotMove());
        this._types.push(new BotTalk());
        this._types.push(new BotGiveHandItem());
        this._types.push(new BotFollowAvatar());
        this._types.push(new BotChangeFigure());
        this._types.push(new BotTalkDirectToAvatar());
        this._types.push(new ControlClock());
        this._types.push(new SetFurniAltitude());
        this._types.push(new SendSignal());
        this._types.push(new FreezeUser());
        this._types.push(new UnfreezeUser());
        this._types.push(new RelativeFurniMove());
        this._types.push(new MoveFurniToFurni());
        this._types.push(new MoveFurniToUser());
        this._types.push(new AdjustClock());
        this._types.push(new GiveVariable());
        this._types.push(new RemoveVariable());
        this._types.push(new ChangeVariable());
        this._types.push(new MoveUser());
        this._types.push(new MoveUserToFurni());
        this._types.push(new TeleportToRoom());
        this._types.push(new GiveCurrencyFromChest());
        this._types.push(new GiveItemsFromChest());
        this._types.push(new InitiateTransaction());
        this._types.push(new CancelTransaction());
        this._types.push(new WriteToLogs());
    }

    private _types: any[] = [];

    public get types(): any[] {
        return this._types;
    }

    public getByCode(param1: number): ActionType {
        for (const _loc2_ of this._types ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
            if (_loc2_.negativeCode == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getElementByCode(param1: number): Element {
        return this.getByCode(param1);
    }

    public acceptTriggerable(param1: Triggerable): boolean {
        return (param1 instanceof ActionDefinition ? param1 : null) != null;
    }

    public getKey(): string {
        return "action";
    }
}
