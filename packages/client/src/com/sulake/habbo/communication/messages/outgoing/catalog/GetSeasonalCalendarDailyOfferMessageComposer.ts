import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetSeasonalCalendarDailyOfferMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::GetSeasonalCalendarDailyOfferMessageComposer'); }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
