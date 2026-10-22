import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class ProductIconUtil {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::ProductIconUtil'); }

    public static categoryMapping(param1: string, param2: number): number {
        if (param1 == "S") {
            return 1;
        }
        if (param1 == "I") {
            if (param2 == 3001) {
                return 2;
            }
            if (param2 == 3002) {
                return 3;
            }
            if (param2 == 4057) {
                return 4;
            }
            return 1;
        }
        return 1;
    }

    public static createChatItemPreview(param1: HabboWindowManagerComponent, param2: number, param3: string = null): BitmapData {
        if (param3 == null) {
            param3 = param1.sessionDataManager.userName;
        }
        return param1.freeFlowChat.createPreviewBitmap(param3, param2);
    }
}
