import type { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import type { IUIContext } from '@/onBoardingHcUi/IUIContext';

export interface ILoginContext extends IUIContext {
    initLogin(param1: string, param2: string): void;
    initLoginWithSsoToken(param1: string, param2: string): void;
    loginWithAvatar(param1: AvatarData): void;
    showScreen(param1: number): void;
}
