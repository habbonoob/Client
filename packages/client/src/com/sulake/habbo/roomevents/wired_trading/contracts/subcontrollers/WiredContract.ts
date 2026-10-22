import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';

export interface WiredContract {
    get window(): IWindow;
    show(param1: WiredContractContentsMessageParser): void;
    hide(): void;
    addContentsToComposer(param1: any[]): void;
    contractType(): number;
    validate(): string;
}
