import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';

export interface ITrophyFurniWidget {
    get assets(): IAssetLibrary;
    get name(): string;
    get date(): string;
    get color(): number;
    get windowManager(): IHabboWindowManager;
    get message(): string;
}
