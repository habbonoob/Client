import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';

export interface INameChangeUI {
    get localization(): IHabboLocalizationManager;
    get assets(): IAssetLibrary;
    get myName(): string;
    buildXmlWindow(param1: string, param2?: number): IWindow;
    checkName(param1: string): void;
    changeName(param1: string): void;
    showView(): void;
    hideView(): void;
}
