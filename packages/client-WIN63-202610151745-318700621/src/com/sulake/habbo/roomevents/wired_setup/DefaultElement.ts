import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { IWiredCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/IWiredCtrl';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { WrappedSourceTypeListener } from '@/com/sulake/habbo/roomevents/wired_setup/WrappedSourceTypeListener';

export class DefaultElement implements Element {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::DefaultElement'); }

    public static INPUTS_TYPE_NONE: number = 0;
    public static INPUTS_TYPE_UI_BUILDER: number = 1;

    declare private _cont: IWindowContainer;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    private _initialized: boolean = false;

    constructor() {
    }

    public get code(): number {
        return -1;
    }

    public get negativeCode(): number {
        return -1;
    }

    public get hasStateSnapshot(): boolean {
        return false;
    }

    public readIntParamsFromForm(): any[] {
        return [];
    }

    public readVariableIdsFromForm(): any[] {
        return [];
    }

    public readStringParamFromForm(): string {
        return "";
    }

    public setRoomEvents(param1: HabboUserDefinedRoomEvents): void {
        this._roomEvents = param1;
    }

    public onInit(param1: HabboUserDefinedRoomEvents): void {
        this._roomEvents = param1;
        this._initialized = true;
    }

    public onEditStart(param1: Triggerable): void {
    }

    public onEditInitialized(): void {
    }

    public onEditEnd(): void {
    }

    public validate(): string {
        return null;
    }

    public onGuildMemberships(param1: GuildMembershipsMessageEvent): void {
    }

    public furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title";
    }

    public userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title";
    }

    public get forceFurniSelection(): boolean {
        return this.hasStateSnapshot;
    }

    public mergedSelections(): any[] {
        return [];
    }

    public mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title";
    }

    public setMergedType(param1: number, param2: number): void {
    }

    public getMergedType(param1: number): number {
        return 0;
    }

    public isInputSourceDisabled(param1: number, param2: number): boolean {
        return false;
    }

    public getCustomSourcesForMergedType(param1: number): any[] {
        return [];
    }

    public get forceHidePickFurniInstructions(): boolean {
        return false;
    }

    public advancedAlwaysVisible(): boolean {
        return false;
    }

    public get usingCustomAdvancedSettings(): boolean {
        return false;
    }

    public get requireConfirmation(): any {
        return null;
    }

    public buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
    }

    public get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_NONE;
    }

    public mergedSourceOptions(param1: number): any[] {
        let _loc3_: any[] = [WiredInputSourcePicker._SafeStr_2178, WiredInputSourcePicker.USER_SOURCE];
        for (const _loc2_ of this.getCustomSourcesForMergedType(param1) ?? []) {
            if (!(!this._roomEvents.getBoolean("wired.variables.context_visible") && _loc2_ == VariableExtraSourceTypes.CONTEXT_SOURCE && this.getMergedType(param1) != VariableExtraSourceTypes.CONTEXT_SOURCE)) {
                _loc3_.push(_loc2_);
            }
        }
        return _loc3_;
    }

    public hasCustomTypePicker(param1: number): boolean {
        return false;
    }

    protected createSourceTypeListener(param1: number): SourceTypePickedListener {
        return new WrappedSourceTypeListener(this, param1);
    }

    protected get cont(): IWindowContainer {
        return this._cont;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    protected get roomEventsCtrl(): IWiredCtrl {
        return this._roomEvents.wiredCtrl;
    }

    protected loc(param1: string): string {
        return this._roomEvents.localization.getLocalization(param1, param1);
    }

    protected l(param1: string): string {
        return "${wiredfurni.params." + param1 + "}";
    }

    public get widthModifier(): number {
        return 1;
    }

    public get allowScrolling(): boolean {
        return false;
    }
}
