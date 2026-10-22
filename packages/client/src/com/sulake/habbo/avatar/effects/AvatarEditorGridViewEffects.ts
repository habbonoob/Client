import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorGridView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorGridView';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { AvatarEditorGridItemEffect } from '@/com/sulake/habbo/avatar/effects/AvatarEditorGridItemEffect';
import { EffectsModel__com_sulake_habbo_avatar_effects as EffectsModel } from '@/com/sulake/habbo/avatar/effects/AvatarEditorGridViewEffects.group';

export class AvatarEditorGridViewEffects implements IAvatarEditorGridView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.effects::AvatarEditorGridViewEffects'); }

    constructor(param1: IWindowContainer) {
        this._view = param1;
        this._SafeStr_2835 = asGuarded(this._view.findChildByName("thumbs"), isIItemGridWindow);
        this._notification = this._view.findChildByName("content_notification");
        this._title = this._view.findChildByName("content_title");
    }

    declare private _view: IWindowContainer;

    private _firstView: boolean = true;

    declare private _SafeStr_2134: IAvatarEditorCategoryModel;

    declare private _categoryId: string;

    declare private _SafeStr_2835: IItemGridWindow;

    declare private _effectItems: AvatarEditorGridItemEffect[];

    declare private _notification: IWindow;

    declare private _title: IWindow;

    public get window(): IWindowContainer {
        return this._view;
    }

    public get firstView(): boolean {
        return this._firstView;
    }

    public dispose(): void {
        if (this._SafeStr_2835) {
            this._SafeStr_2835.dispose();
            this._SafeStr_2835 = null;
        }
        this._SafeStr_2134 = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    public initFromList(param1: IAvatarEditorCategoryModel, param2: string): void {
        let _loc5_: AvatarEditorGridItemEffect = null;
        this._SafeStr_2134 = param1;
        this._categoryId = param2;
        this._view.visible = true;
        let _loc3_: any[] = castTo(this._SafeStr_2134, EffectsModel).effects;
        this._SafeStr_2835.removeGridItems();
        this._effectItems = [];
        if (_loc3_.length == 0) {
            this._title.visible = true;
            this._notification.visible = true;
        } else {
            this._notification.visible = false;
            this._title.visible = false;
            _loc5_ = new AvatarEditorGridItemEffect(null, this._SafeStr_2134.controller.manager.windowManager, this._SafeStr_2134.controller.manager.assets);
            this.addGridItem(_loc5_);
            for (const _loc4_ of _loc3_ ?? []) {
                _loc5_ = new AvatarEditorGridItemEffect(_loc4_, this._SafeStr_2134.controller.manager.windowManager, this._SafeStr_2134.controller.manager.assets);
                this.addGridItem(_loc5_);
            }
        }
        this.showPalettes(0);
        this._firstView = false;
    }

    public showPalettes(param1: number): void {
        let _loc3_: IWindow = this._view.findChildByName("palette0");
        let _loc2_: IWindow = this._view.findChildByName("palette1");
        _loc3_.visible = false;
        _loc2_.visible = false;
    }

    public updateSelection(param1: number, param2: boolean): void {
        if (param1 >= 0 && param1 < this._effectItems.length) {
            this._effectItems[param1].selected = param2;
        }
    }

    public getGridIndex(param1: number): number {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._effectItems.length) {
            if (this._effectItems[_loc2_].effectType == param1) {
                return _loc2_;
            }
            _loc2_++;
        }
        return -1;
    }

    private addGridItem(param1: AvatarEditorGridItemEffect): void {
        param1.window.procedure = this.partEventProc;
        this._effectItems.push(param1);
        this._SafeStr_2835.addGridItem(param1.window);
    }

    private partEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type == "WME_DOWN") {
            _loc3_ = this._SafeStr_2835.getGridItemIndex(param1.window);
            this._SafeStr_2134.selectPart(this._categoryId, _loc3_);
        }
    };
}
