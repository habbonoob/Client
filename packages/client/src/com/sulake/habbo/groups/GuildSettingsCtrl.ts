import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IGuildData } from '@/com/sulake/habbo/communication/messages/incoming/users/IGuildData';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GuildSettingsData } from '@/com/sulake/habbo/groups/GuildSettingsData';

export class GuildSettingsCtrl {
    static { registerClassName(this, 'com.sulake.habbo.groups::GuildSettingsCtrl'); }

    public static readonly TYPE_REGULAR: number = 0;
    public static readonly TYPE_EXCLUSIVE: number = 1;
    public static readonly _SafeStr_7478: number = 2;
    public static readonly TYPE_LARGE: number = 3;
    public static readonly _SafeStr_7435: number = 4;
    public static readonly RIGHTS_MEMBERS: number = 0;
    public static readonly _SafeStr_8745: number = 1;

    constructor() {
    }

    declare private _data: GuildSettingsData;

    declare private _SafeStr_3847: ISelectorWindow;

    declare private _SafeStr_5075: IRadioButtonWindow;

    declare private _SafeStr_5543: IRadioButtonWindow;

    declare private _SafeStr_5893: IRadioButtonWindow;

    declare private _SafeStr_4934: ICheckBoxWindow;

    public get guildType(): number {
        return this._data.guildType;
    }

    public get rightsLevel(): number {
        return this._data.rightsLevel;
    }

    public get isInitialized(): boolean {
        return this._data != null;
    }

    public prepare(param1: IWindowContainer): void {
        let _loc2_: IWindowContainer = asGuarded(param1.findChildByName("step_cont_5"), isIWindowContainer);
        this._SafeStr_3847 = asGuarded(_loc2_.findChildByName("group_type_selector"), isISelectorWindow);
        this._SafeStr_5075 = asGuarded(_loc2_.findChildByName("rb_type_regular"), isIRadioButtonWindow);
        this._SafeStr_5075.procedure = this.onRegularGuildType;
        this._SafeStr_5543 = asGuarded(_loc2_.findChildByName("rb_type_exclusive"), isIRadioButtonWindow);
        this._SafeStr_5543.procedure = this.onExclusiveGuildType;
        this._SafeStr_5893 = asGuarded(_loc2_.findChildByName("rb_type_private"), isIRadioButtonWindow);
        this._SafeStr_5893.procedure = this.onPrivateGuildType;
        this._SafeStr_4934 = asGuarded(_loc2_.findChildByName("cb_member_rights"), isICheckBoxWindow);
        this._SafeStr_4934.procedure = this.onMembersHaveRights;
    }

    public refresh(param1: IGuildData): void {
        this._data = new GuildSettingsData(param1);
        switch (this._data.guildType) {
            case 0:
                this._SafeStr_3847.setSelected(this._SafeStr_5075);
                break;
            case 1:
                this._SafeStr_3847.setSelected(this._SafeStr_5543);
                break;
            case 2:
                this._SafeStr_3847.setSelected(this._SafeStr_5893);
                break;
            default:
                this._SafeStr_3847.setSelected(this._SafeStr_5075);
        }
        if (this._data.rightsLevel == 0) {
            this._SafeStr_4934.select();
        } else {
            this._SafeStr_4934.unselect();
        }
        this._SafeStr_3847.invalidate();
    }

    public resetModified(): void {
        if (this._data != null && this._data.isModified) {
            this._data.resetModified();
        }
    }

    private onRegularGuildType = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECT") {
            this._data.guildType = 0;
        }
    };

    private onExclusiveGuildType = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECT") {
            this._data.guildType = 1;
        }
    };

    private onPrivateGuildType = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECT") {
            this._data.guildType = 2;
        }
    };

    private onMembersHaveRights = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECT") {
            this._data.rightsLevel = 0;
        }
        if (param1.type == "WE_UNSELECT") {
            this._data.rightsLevel = 1;
        }
    };
}
