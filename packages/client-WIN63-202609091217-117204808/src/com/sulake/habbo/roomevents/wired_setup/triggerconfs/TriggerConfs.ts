import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import type { TriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConf';
import { TriggerDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/TriggerDefinition';
import { _SafeCls_1998 } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/_SafeCls_1998';
import { _SafeCls_2029 } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/_SafeCls_2029';
import { _SafeCls_2031 } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/_SafeCls_2031';
import { _SafeCls_2056 } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/_SafeCls_2056';
import { AvatarCaught } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/AvatarCaught';
import { AvatarClicksFurni } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/AvatarClicksFurni';
import { AvatarEntersRoom } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/AvatarEntersRoom';
import { AvatarLeavesRoom } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/AvatarLeavesRoom';
import { AvatarSaysSomething } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/AvatarSaysSomething';
import { BotAvatarReached } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/BotAvatarReached';
import { BotDestinationReached } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/BotDestinationReached';
import { ClockReachTime } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/ClockReachTime';
import { GameEnds } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/GameEnds';
import { GameStarts } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/GameStarts';
import { PerformAction } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/PerformAction';
import { ReceiveSignal } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/ReceiveSignal';
import { ScoreAchieved } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/ScoreAchieved';
import { StateChange } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/StateChange';
import { TransactionCompleted } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TransactionCompleted';
import { TransactionFailed } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TransactionFailed';
import { TriggerOnce } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerOnce';
import { TriggerPeriodically } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerPeriodically';
import { TriggerPeriodicLong } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerPeriodicLong';
import { TriggerPeriodicShort } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerPeriodicShort';
import { UserClicksUser } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/UserClicksUser';
import { UseStuff } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/UseStuff';
import { VariableUpdate } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/VariableUpdate';

export class TriggerConfs implements ElementTypeHolder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::TriggerConfs'); }

    private _confs: any[] = [];

    constructor() {
        this._confs.push(new AvatarSaysSomething());
        this._confs.push(new _SafeCls_2031());
        this._confs.push(new _SafeCls_2056());
        this._confs.push(new TriggerOnce());
        this._confs.push(new UseStuff());
        this._confs.push(new TriggerPeriodically());
        this._confs.push(new AvatarEntersRoom());
        this._confs.push(new GameStarts());
        this._confs.push(new GameEnds());
        this._confs.push(new ScoreAchieved());
        this._confs.push(new AvatarCaught());
        this._confs.push(new _SafeCls_2029());
        this._confs.push(new TriggerPeriodicLong());
        this._confs.push(new BotDestinationReached());
        this._confs.push(new BotAvatarReached());
        this._confs.push(new ClockReachTime());
        this._confs.push(new PerformAction());
        this._confs.push(new ReceiveSignal());
        this._confs.push(new AvatarClicksFurni());
        this._confs.push(new TriggerPeriodicShort());
        this._confs.push(new StateChange());
        this._confs.push(new _SafeCls_1998());
        this._confs.push(new VariableUpdate());
        this._confs.push(new AvatarLeavesRoom());
        this._confs.push(new UserClicksUser());
        this._confs.push(new TransactionCompleted());
        this._confs.push(new TransactionFailed());
    }

    public get confs(): any[] {
        return this._confs;
    }

    public getByCode(param1: number): TriggerConf {
        for (const _loc2_ of this._confs ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getElementByCode(param1: number): Element {
        return this.getByCode(param1);
    }

    public acceptTriggerable(param1: Triggerable): boolean {
        return (param1 instanceof TriggerDefinition ? param1 : null) != null;
    }

    public getKey(): string {
        return "trigger";
    }
}
