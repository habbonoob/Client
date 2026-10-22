import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IUIContext } from '@/onBoardingHcUi/IUIContext';

export interface IBoardingContext extends IUIContext {
    get communicationManager(): IHabboCommunicationManager;
    getLocalization(param1: string, param2?: string): string;
    getProperty(param1: string, param2?: string): string;
    nameChangeCompleted(param1?: boolean): void;
    showHideButtons(param1: boolean): void;
    setNameGender(param1: string, param2: boolean): void;
    editorFinished(): void;
}
