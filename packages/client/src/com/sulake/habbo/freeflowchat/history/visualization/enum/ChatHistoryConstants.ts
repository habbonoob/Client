import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export class ChatHistoryConstants {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization.enum::ChatHistoryConstants'); }

    public static readonly _SafeStr_8401: number = 8;
    public static readonly LEFT_MARGIN: number = 3;
    public static readonly TIMESTAMP_FIXED_WIDTH: number = 62;
    public static readonly _SafeStr_8537: number = 3;
    public static readonly TRAY_HANDLE_INLET_LEFT: number = 0;
    public static readonly TRAY_TOOLBAR_BOTTOM_MARGIN: number = 50;
    public static readonly TRAY_HANDLE_OFFSET_FROM_BOTTOM: number = 215;
    public static readonly MAX_ENTRY_WIDTH: number = 415;
    public static readonly TEXT_FORMAT_TIMESTAMP: TextFormat = new TextFormat("Ubuntu", 12, 4288716960, false, true);
    public static readonly TEXT_FORMAT: TextFormat = new TextFormat("Ubuntu", 12, 4294901760);
}
