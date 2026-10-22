import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboToolbarEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.events::HabboToolbarEvent'); }

    public static readonly TOOLBAR_CLICK: string = "HTE_TOOLBAR_CLICK";
    public static readonly GROUP_ROOM_INFO_CLICK: string = "HTE_GROUP_ROOM_INFO_CLICK";
    public static readonly _SafeStr_7460: string = "HTIE_ICON_ZOOM";
    public static readonly RESIZED: string = "HTE_RESIZED";
    public static readonly CAMERA_TOGGLE: string = "HTE_ICON_CAMERA";
    public static readonly CAMERA_LAUNCH_ORIGIN_ROOM_TOOL: string = "roomToolsMenu";
    public static readonly CAMERA_LAUNCH_ORIGIN_CHAT: string = "chatCameraCommand";
    public static readonly CAMERA_LAUNCH_ORIGIN_EIW_MAKE_OWN: string = "imageWidgetMakeOwn";
    public static readonly CAMERA_LAUNCH_ORIGIN_TOOLBAR: string = "toolBarCameraIcon";

    declare private _iconId: string;

    declare private _iconName: string;

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }

    public set iconId(param1: string) {
        this._iconId = param1;
    }

    public get iconId(): string {
        return this._iconId;
    }

    public set iconName(param1: string) {
        this._iconName = param1;
    }

    public get iconName(): string {
        return this._iconName;
    }
}
