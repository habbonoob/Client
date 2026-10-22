import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class RewardRowPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.combinations::RewardRowPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._badgeCheckbox = param3.createCheckboxView();
        this._SafeStr_4181 = param2.createTextInput(new TextInputParam("", 100, null, -1, null, true, "Product code or badge code"));
        this._SafeStr_3320 = param2.createTextInput(new TextInputParam("", 3, null, 50, "0-9", true, "Chance to get this reward. Value should be a number between 1 and 100"));
        this._spacing = param3.genericHorizontalSpacing;
        this._SafeStr_3320.disabled = !this._SafeStr_5651;
        this._listPreset = param2.createSimpleListView(false, [this.wrapWindow(this._badgeCheckbox, true), this._SafeStr_4181, this._SafeStr_3320]);
        this._listPreset.spacing = this._spacing;
        this._SafeStr_2133 = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._SafeStr_2133.addChild(this._listPreset.window);
    }

    declare private _listPreset: SimpleListViewPreset;

    declare private _SafeStr_2133: IWindowContainer;

    declare private _badgeCheckbox: ICheckBoxWindow;

    declare private _SafeStr_4181: TextInputPreset;

    declare private _SafeStr_3320: TextInputPreset;

    declare private _spacing: number;
    static { (this.prototype as any)._spacing = 0; }

    private _SafeStr_5651: boolean = true;

    public override get window(): IWindow {
        return this._SafeStr_2133;
    }

    protected override get childPresets(): any[] {
        return [this._listPreset];
    }

    public get code(): string {
        return this._SafeStr_4181.text;
    }

    public set code(param1: string) {
        this._SafeStr_4181.text = param1 == null ? "" : param1;
    }

    public get probabilityText(): string {
        return this._SafeStr_3320.text;
    }

    public set probabilityText(param1: string) {
        this._SafeStr_3320.text = param1 == null ? "" : param1;
    }

    public get isBadge(): boolean {
        return this._badgeCheckbox.isSelected;
    }

    public set isBadge(param1: boolean) {
        Util.select(this._badgeCheckbox, param1);
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2133.width = param1;
        this._listPreset.resizeToWidth(param1);
        this._SafeStr_2133.height = this._listPreset.window.height;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2133.dispose();
        this._SafeStr_2133 = null;
        this._listPreset = null;
        this._badgeCheckbox = null;
        this._SafeStr_4181 = null;
        this._SafeStr_3320 = null;
    }

    public clear(): void {
        this.code = "";
        this.probabilityText = "";
        this.isBadge = false;
    }

    public setProbabilityVisible(param1: boolean): void {
        this._SafeStr_5651 = param1;
        this._SafeStr_3320.disabled = !this._SafeStr_5651;
    }
}
