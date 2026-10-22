import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboAvatarEditorManager } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { HabboAvatarEditorCom } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';

export class AvatarEditorNameSuggestionListRenderer {
    static { registerClassName(this, 'com.sulake.habbo.avatar.view::AvatarEditorNameSuggestionListRenderer'); }

    private readonly MARGIN_X: number = 5;
    private readonly MARGIN_Y: number = 5;

    declare private _manager: HabboAvatarEditorManager;

    declare private _offsetX: number;
    static { (this.prototype as any)._offsetX = 0; }

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    private _SafeStr_7364: number = 0;
    private _SafeStr_4345: Rectangle = null;

    constructor(param1: HabboAvatarEditorManager) {
        this._manager = param1;
    }

    public dispose(): void {
        this._manager = null;
    }

    public render(param1: any[], param2: IWindowContainer): number {
        let _loc7_: IWindow = null;
        let _loc4_: ITextWindow = null;
        let _loc5_: number = 0;
        while (param2.numChildren > 0) {
            _loc7_ = param2.removeChildAt(0);
            _loc7_.dispose();
        }
        param2.parent.invalidate();
        this._SafeStr_7364 = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._SafeStr_4345 = param2.rectangle;
        this._SafeStr_4345.height = 150;
        _loc5_ = 0;
        while (_loc5_ < param1.length) {
            _loc4_ = this.createItem(asGuarded(param1[_loc5_], isString));
            if (this.fit(_loc4_)) {
                param2.addChild(_loc4_);
            } else {
                _loc4_.dispose();
            }
            _loc5_++;
        }
        let _loc6_: number = param2.numChildren;
        if (_loc6_ == 0) {
            return 0;
        }
        let _loc3_: IWindow = param2.getChildAt(param2.numChildren - 1);
        return _loc3_.bottom;
    }

    private fit(param1: IWindow): boolean {
        if (param1.width > this._SafeStr_4345.width || param1.width < 2) {
            return false;
        }
        if (this._offsetY + param1.height > this._SafeStr_4345.height) {
            return false;
        }
        if (this._offsetX + param1.width > this._SafeStr_4345.width) {
            this._offsetX = 0;
            this._offsetY += param1.height + 5;
            return this.fit(param1);
        }
        param1.x += this._offsetX;
        param1.y += this._offsetY;
        this._offsetX += param1.width + 5;
        return true;
    }

    private createItem(param1: string): ITextWindow {
        let _loc2_: ITextWindow = asGuarded(this._manager.windowManager.buildFromXML(XML.from(HabboAvatarEditorCom.avatar_editor_name_change_item)), isITextWindow);
        if (_loc2_ == null) {
            return null;
        }
        _loc2_.text = param1;
        return _loc2_;
    }
}
