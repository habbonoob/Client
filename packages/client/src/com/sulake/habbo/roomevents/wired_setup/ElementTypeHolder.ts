import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';

export interface ElementTypeHolder {
    getElementByCode(param1: number): Element;
    getKey(): string;
    acceptTriggerable(param1: Triggerable): boolean;
}
