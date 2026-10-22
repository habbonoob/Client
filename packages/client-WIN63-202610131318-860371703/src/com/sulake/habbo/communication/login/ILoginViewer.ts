import type { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import type { ICaptchaView } from '@/com/sulake/habbo/communication/login/ICaptchaView';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface ILoginViewer {
    getProperty(param1: string, param2?: Map<any, any>): string;
    showLoginScreen(): void;
    showRegistrationError(param1: any): void;
    showInvalidLoginError(param1: any): void;
    nameCheckResponse(param1: any, param2: boolean): void;
    showAccountError(param1: any): void;
    showLoadingScreen(): void;
    saveLooksError(param1: any): void;
    showTOS(): void;
    environmentReady(): void;
    populateCharacterList(param1: AvatarData[]): void;
    showSelectAvatar(param1: any): void;
    showPromoHabbos(param1: XML): void;
    showSelectRoom(): void;
    showCaptchaError(): void;
    createCaptchaView(): ICaptchaView;
    captchaReady(): void;
}
