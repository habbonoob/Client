import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RewardRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/RewardRowPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class RewardListPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.combinations::RewardListPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: number) {
        let _loc8_: number = 0;
        let _loc9_: RewardRowPreset = null;
        super(param1, param2, param3);
        this._maxRewards = param4;
        this._container = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._container.spacing = param3.genericVerticalSpacing;
        let _loc6_: TextPreset = param2.createText("Badge?", new TextParam(0, false));
        let _loc7_: TextPreset = param2.createText("Product/Badge code", new TextParam(2, false));
        this._SafeStr_4671 = param2.createText("Probability", new TextParam(0, false));
        this._SafeStr_3960 = param2.createSimpleListView(false, [_loc6_, _loc7_, this._SafeStr_4671]);
        this._SafeStr_3398 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_3398.spacing = param3.genericVerticalSpacing;
        this._SafeStr_2959 = [];
        _loc8_ = 0;
        while (_loc8_ < this._maxRewards) {
            _loc9_ = param2.createRewardRow();
            this._SafeStr_2959.push(_loc9_);
            _loc8_++;
        }
        this._container.addListItem(this._SafeStr_3960.window);
        this._container.addListItem(this._SafeStr_3398);
        this.setDisplayedRewards(param5);
        this._displayedRewards = param5;
    }

    declare private _container: IItemListWindow;

    declare private _SafeStr_3398: IItemListWindow;

    declare private _SafeStr_3960: SimpleListViewPreset;

    declare private _SafeStr_4671: TextPreset;

    declare private _SafeStr_2959: RewardRowPreset[];

    declare private _maxRewards: number;
    static { (this.prototype as any)._maxRewards = 0; }

    private _SafeStr_6463: boolean = true;
    private _expectedWidth: number = 0;

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        let _loc1_: any[] = [this._SafeStr_3960];
        for (const _loc2_ of this._SafeStr_2959 ?? []) {
            _loc1_.push(_loc2_);
        }
        return _loc1_;
    }

    declare private _displayedRewards: number;
    static { (this.prototype as any)._displayedRewards = 0; }

    public get displayedRewards(): number {
        return this._displayedRewards;
    }

    public override resizeToWidth(param1: number): void {
        let _loc2_: number = 0;
        super.resizeToWidth(param1);
        this._expectedWidth = param1;
        this._container.width = param1;
        this._SafeStr_3960.resizeToWidth(param1);
        this._SafeStr_3398.width = param1;
        _loc2_ = 0;
        while (_loc2_ < this._displayedRewards) {
            this._SafeStr_2959[_loc2_].resizeToWidth(param1);
            _loc2_++;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_3960 = null;
        this._SafeStr_3398 = null;
        this._SafeStr_4671 = null;
        this._SafeStr_2959 = null;
    }

    public setDisplayedRewards(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: number = Math.max(0, Math.min(this._maxRewards, param1)) | 0;
        if (_loc2_ == this._displayedRewards) {
            return;
        }
        if (_loc2_ > this._displayedRewards) {
            _loc3_ = this._displayedRewards;
            while (_loc3_ < _loc2_) {
                this._SafeStr_3398.addListItem(this._SafeStr_2959[_loc3_].window);
                if (this._expectedWidth > 0) {
                    this._SafeStr_2959[_loc3_].resizeToWidth(this._expectedWidth);
                }
                _loc3_++;
            }
        } else {
            _loc3_ = this._displayedRewards - 1;
            while (_loc3_ >= _loc2_) {
                this._SafeStr_3398.removeListItem(this._SafeStr_2959[_loc3_].window);
                _loc3_--;
            }
        }
        this._displayedRewards = _loc2_;
    }

    public getRow(param1: number): RewardRowPreset {
        return this._SafeStr_2959[param1];
    }

    public setProbabilityEnabled(param1: boolean): void {
        if (this._SafeStr_6463 == param1) {
            return;
        }
        this._SafeStr_6463 = param1;
        this._SafeStr_4671.disabled = !param1;
        for (const _loc2_ of this._SafeStr_2959 ?? []) {
            _loc2_.setProbabilityVisible(param1);
        }
    }
}
