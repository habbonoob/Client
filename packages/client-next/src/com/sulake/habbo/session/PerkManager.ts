import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { Perk } from '@/com/sulake/habbo/communication/messages/parser/perk/Perk';
import type { SessionDataManager } from '@/com/sulake/habbo/session/SessionDataManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PerkAllowancesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/PerkAllowancesMessageEvent';
import { PerksUpdatedEvent } from '@/com/sulake/habbo/session/events/PerksUpdatedEvent';

export class PerkManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.session::PerkManager'); }

    private _SafeStr_3794: boolean = false;

    declare private _sessionDataManager: SessionDataManager;

    declare private _perkAllowancesMessageEvent: IMessageEvent;

    private _SafeStr_2982: Map<any, any> = new Dictionary();

    constructor(param1: SessionDataManager) {
        this._sessionDataManager = param1;
        if (this._sessionDataManager.communication) {
            this._perkAllowancesMessageEvent = this._sessionDataManager.communication.addHabboConnectionMessageEvent(new PerkAllowancesMessageEvent(this.onPerkAllowances));
        }
    }

    public get disposed(): boolean {
        return this._sessionDataManager == null;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2982) {
            for (const _loc1_ of this._SafeStr_2982?.keys() ?? []) {
                this._SafeStr_2982.delete(_loc1_);
            }
            this._SafeStr_2982 = null;
        }
        if (this._sessionDataManager.communication) {
            this._sessionDataManager.communication.removeHabboConnectionMessageEvent(this._perkAllowancesMessageEvent);
        }
        this._perkAllowancesMessageEvent = null;
        this._sessionDataManager = null;
    }

    public get isReady(): boolean {
        return this._SafeStr_3794;
    }

    public isPerkAllowed(param1: string): boolean {
        return !!(this._SafeStr_2982.has(param1) && this._SafeStr_2982.get(param1).isAllowed);
    }

    public getPerkErrorMessage(param1: string): string {
        let _loc2_: Perk = this._SafeStr_2982.get(param1);
        return _loc2_ != null ? _loc2_.errorMessage : "";
    }

    private onPerkAllowances = (param1: PerkAllowancesMessageEvent): void => {
        for (const _loc2_ of param1.getParser().getPerks() ?? []) {
            this._SafeStr_2982.set(_loc2_.code, _loc2_);
        }
        this._SafeStr_3794 = true;
        this._sessionDataManager.events.dispatchEvent(new PerksUpdatedEvent());
    };

    get [IDisposable](): true {
        return true;
    }
}
