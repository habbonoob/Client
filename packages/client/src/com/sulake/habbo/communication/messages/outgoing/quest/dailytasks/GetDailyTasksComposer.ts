import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetDailyTasksComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.quest.dailytasks::GetDailyTasksComposer'); }

    constructor() {
    }

    public getMessageArray(): any[] {
        return [];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
