import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { LinkDataframeReceiveRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeReceiveRowPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { LinkDataframeCodec } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeCodec';
import { _SafeCls_6086 } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/_SafeCls_6086';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class LinkDataframeReceivePreset extends WiredUIPreset implements _SafeCls_6086 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::LinkDataframeReceivePreset'); }

    declare private _SafeStr_2959: LinkDataframeReceiveRowPreset[];

    declare private _SafeStr_14381: DropdownPreset;

    declare private _content: SimpleListViewPreset;

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    declare private _SafeStr_4834: boolean;
    static { (this.prototype as any)._SafeStr_4834 = false; }

    declare private _loadError: string;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: LinkDataframeReceiveRowPreset = null;
        super(param1, param2, param3);
        let _loc5_: ExpandableDropdownOption[] = [];
        _loc6_ = 0;
        while (_loc6_ <= 12) {
            _loc5_.push(new ExpandableDropdownOption(_loc6_, String(_loc6_)));
            _loc6_++;
        }
        this._SafeStr_14381 = param2.createDropdown(new DropdownParam("", _loc5_, this.onCountChanged));
        this._SafeStr_2959 = [];
        let _loc4_: any[] = [param2.createSection("${wiredfurni.params.link.row_count}", this._SafeStr_14381)];
        _loc7_ = 0;
        while (_loc7_ < 12) {
            _loc8_ = param2.createLinkDataframeReceiveRow(_loc7_, this.onRowChanged);
            _loc8_.visible = false;
            this._SafeStr_2959.push(_loc8_);
            _loc4_.push(_loc8_);
            _loc7_++;
        }
        this._content = param2.createSimpleListView(true, _loc4_);
    }

    public initialize(param1: Triggerable): void {
        let _loc4_: number = 0;
        let _loc6_: any[] = null;
        this.hideDetachedWindows();
        this._SafeStr_4834 = true;
        let _loc3_: any[] = param1.intParams;
        let _loc5_: any[] = _loc3_.length == 13 ? LinkDataframeCodec.decode(param1.stringParam, _loc3_[0] | 0) : null;
        this._loadError = _loc5_ == null || param1.variableIds.length != 12 ? "wiredfurni.error.link.invalid_dataframe" : null;
        if (this._loadError != null) {
            this._count = 0;
            this._SafeStr_14381.selectedId = 0;
            for (const _loc2_ of this._SafeStr_2959 ?? []) {
                _loc2_.visible = false;
            }
            this._SafeStr_4834 = false;
            return;
        }
        this._count = _loc3_[0] | 0;
        this._SafeStr_14381.selectedId = this._count;
        _loc4_ = 0;
        while (_loc4_ < 12) {
            _loc6_ = _loc4_ < this._count ? _loc5_[_loc4_] : ["", ""];
            this._SafeStr_2959[_loc4_].initialize(stringOrNull(_loc6_[0]), stringOrNull(_loc6_[1]), _loc3_[_loc4_ + 1] | 0, stringOrNull(param1.variableIds[_loc4_]), param1.wiredContext.roomVariablesList);
            this._SafeStr_2959[_loc4_].visible = _loc4_ < this._count;
            _loc4_++;
        }
        this._SafeStr_4834 = false;
        this._content.resize();
    }

    public get intParams(): any[] {
        let _loc1_: any[] = [this._count];
        for (const _loc2_ of this._SafeStr_2959 ?? []) {
            _loc1_.push(_loc2_.kind);
        }
        return _loc1_;
    }

    public get stringParam(): string {
        let _loc1_: number = 0;
        let _loc2_: any[] = [];
        _loc1_ = 0;
        while (_loc1_ < this._count) {
            _loc2_.push([this._SafeStr_2959[_loc1_].key, this._SafeStr_2959[_loc1_].text]);
            _loc1_++;
        }
        return JSON.stringify(_loc2_);
    }

    public get variableIds(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_2959 ?? []) {
            _loc1_.push(_loc2_.variableId);
        }
        return _loc1_;
    }

    public readVariableIds(): any[] {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._count) {
            this._SafeStr_2959[_loc1_].finalizeVariable();
            _loc1_++;
        }
        return this.variableIds;
    }

    public get validationActive(): boolean {
        return !this.disposed;
    }

    public get validationError(): string {
        let _loc4_: number = 0;
        let _loc5_: LinkDataframeReceiveRowPreset = null;
        let _loc6_: string = null;
        let _loc3_: string = null;
        if (this._loadError != null) {
            return this.localizedError(this._loadError);
        }
        let _loc1_: any[] = [];
        let _loc2_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < this._count) {
            _loc5_ = this._SafeStr_2959[_loc4_];
            _loc6_ = _loc5_.validationError;
            if (_loc6_ != null) {
                return this.localizations.getLocalizationWithParams("wiredfurni.params.link.row_error", "", "number", _loc4_ + 1, "error", this.localizedError(_loc6_));
            }
            if (_loc1_.indexOf(_loc5_.key) >= 0) {
                return this.localizedError("wiredfurni.error.variables.name_uniq");
            }
            _loc1_.push(_loc5_.key);
            _loc3_ = _loc5_.kind == 0 ? "text:" + _loc5_.text : "variable:" + _loc5_.variableId;
            if (_loc2_.indexOf(_loc3_) >= 0) {
                return this.localizedError("wiredfurni.error.link.destination_conflict");
            }
            _loc2_.push(_loc3_);
            _loc4_++;
        }
        return this.localizedError(LinkDataframeCodec.storageError(this.stringParam, this.intParams, this.variableIds));
    }

    private localizedError(param1: string): string {
        return param1 == null ? null : this.localizations.getLocalization(param1);
    }

    public hideDetachedWindows(): void {
    }

    private onCountChanged = (param1: ExpandableDropdownOption): void => {
        let _loc2_: number = 0;
        let _loc3_: LinkDataframeReceiveRowPreset = null;
        if (this._SafeStr_4834 || this._content == null || param1.id == this._count) {
            return;
        }
        this._count = param1.id;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2959.length) {
            _loc3_ = this._SafeStr_2959[_loc2_];
            _loc3_.visible = _loc2_ < this._count;
            _loc2_++;
        }
        this.onRowChanged();
    };

    private onRowChanged = (): void => {
        this._content.resize();
        this._roomEvents.wiredCtrl.resizeFrame();
    };

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._content.resizeToWidth(param1);
    }

    public override get window(): IWindow {
        return this._content.window;
    }

    protected override get childPresets(): any[] {
        return [this._content];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hideDetachedWindows();
        super.dispose();
        this._SafeStr_2959 = null;
        this._SafeStr_14381 = null;
        this._content = null;
    }

    get [_SafeCls_6086](): true {
        return true;
    }
}
