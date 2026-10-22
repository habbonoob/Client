import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { HtmlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/HtmlPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { HtmlTextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/HtmlTextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class LevelXpPreviewPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::LevelXpPreviewPreset'); }

    private static _SafeStr_7519: number = 9223372036854776000;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[]) {
        let _loc8_: HtmlPreset = null;
        super(param1, param2, param3);
        this._previewLevels = param4;
        this._SafeStr_4578 = [];
        let _loc5_: any[] = [];
        let _loc6_: HtmlTextParam = new HtmlTextParam(0);
        for (const _loc7_ of this._previewLevels ?? []) {
            _loc8_ = param2.createHtml(this.getText(_loc7_ | 0, "0"), _loc6_);
            this._SafeStr_4578.push(_loc8_);
            _loc5_.push(_loc8_);
        }
        this._listPreset = param2.createSimpleListView(true, _loc5_);
        this._listPreset.spacing = 1;
        this._SafeStr_2133 = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._SafeStr_2133.addChild(this._listPreset.window);
    }

    declare private _listPreset: SimpleListViewPreset;

    declare private _SafeStr_2133: IWindowContainer;

    declare private _SafeStr_4578: HtmlPreset[];

    public override get window(): IWindow {
        return this._SafeStr_2133;
    }

    protected override get childPresets(): any[] {
        return [this._listPreset];
    }

    declare private _previewLevels: any[];

    public get previewLevels(): any[] {
        return this._previewLevels;
    }

    private get yellowColorHex(): string {
        return Util.uintToHexColor(this._SafeStr_2144.yellowTextColor);
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
        this._previewLevels = null;
        this._SafeStr_4578 = null;
    }

    public setPreviewXps(param1: any[]): void {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc4_: number = NaN;
        _loc3_ = 0;
        while (_loc3_ < this._previewLevels.length) {
            _loc2_ = this._previewLevels[_loc3_] | 0;
            _loc5_ = "Unreachable level";
            if (_loc3_ < param1.length) {
                _loc4_ = Number(param1[_loc3_]);
                if (_loc4_ > LevelXpPreviewPreset._SafeStr_7519) {
                    _loc5_ = "Out of bounds";
                } else {
                    _loc5_ = Math.round(Number(param1[_loc3_])).toString();
                }
            }
            this._SafeStr_4578[_loc3_].text = this.getText(_loc2_, _loc5_);
            _loc3_++;
        }
    }

    private getText(param1: number, param2: string): string {
        return this._roomEvents.localization.getLocalizationWithParams("wiredfurni.params.levelup.preview.entry", "", "lvl", "<font color=\"" + this.yellowColorHex + "\">" + param1 + "</font>", "xp", "<font color=\"" + this.yellowColorHex + "\">" + param2 + "</font>");
    }
}
