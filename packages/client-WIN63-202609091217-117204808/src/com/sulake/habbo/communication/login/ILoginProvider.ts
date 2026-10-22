import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface ILoginProvider extends IEventDispatcher {
    closeCaptcha(): void;
    init(param1: IHabboCommunicationManager): void;
    loginWithCredentials(param1: string, param2: string, param3?: number): void;
    loginWithCredentialsWeb(param1: string): void;
    selectAvatar(param1: number): void;
    selectAvatarUniqueid(param1: string): void;
}
