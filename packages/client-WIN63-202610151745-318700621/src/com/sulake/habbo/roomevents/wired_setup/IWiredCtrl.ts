import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';

export interface IWiredCtrl {
    stuffAdded(param1: number): void;
    stuffSelected(param1: number): void;
    stuffRemoved(param1: number): void;
    getStuffIds(): any[];
    getStuffIds2(): any[];
    clearStuffPicks(): void;
    resetToDefault(): void;
    createClipboardCopy(): void;
    pasteFromClipboard(): void;
    hasCurrentElementInClipboard(): boolean;
    set activeFurniPicks(param1: number);
    get activeFurniPicks(): number;
    resizeFrame(): void;
    setMergedSourceType(param1: number, param2: number): void;
    updateSourceContainer(param1: number, param2: number): void;
    get hidePickFurniInstructions(): boolean;
    close(): void;
    prepareForUpdate(param1: Triggerable): void;
    get isUsingAdvancedSettings(): boolean;
    get wiredStyle(): WiredStyle;
    get presetManager(): PresetManager;
    getStyleByName(param1: string): WiredStyle;
    setPreferredWiredStyleByName(param1: string): void;
    onSaveFailure(): void;
    onSaveSuccess(): void;
    update(param1?: number, param2?: number): void;
    onGuildMemberships(param1: GuildMembershipsMessageEvent): void;
    clearCache(): void;
    hasUIOpen(): boolean;
    getCurrentWiredId(): number;
}
