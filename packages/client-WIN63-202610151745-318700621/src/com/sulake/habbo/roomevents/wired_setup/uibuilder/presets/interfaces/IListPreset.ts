import type { IWiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/IWiredUIPreset';

export interface IListPreset extends IWiredUIPreset {
    get spacing(): number;
    set spacing(param1: number);
    set backgroundColor(param1: number);
}
