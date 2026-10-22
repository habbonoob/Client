import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IOutfit } from '@/com/sulake/habbo/avatar/IOutfit';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { OutfitView } from '@/com/sulake/habbo/avatar/wardrobe/OutfitView';

export class Outfit implements IOutfit, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.avatar.wardrobe::Outfit'); }

    constructor(param1: HabboAvatarEditor, param2: string, param3: string) {
        this._controller = param1;
        this._view = new OutfitView(param1.manager.windowManager, param1.manager.assets, param2 != "");
        switch (param3) {
            case "M":
            case "m":
            case "M":
                param3 = "M";
                break;
            case "F":
            case "f":
            case "F":
                param3 = "F";
        }
        this._figure = param2;
        this._gender = param3;
        this.update();
    }

    declare private _controller: HabboAvatarEditor;

    declare private _figure: string;

    declare private _gender: string;

    declare private _view: OutfitView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }

    public get view(): OutfitView {
        return this._view;
    }

    public dispose(): void {
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._figure = null;
        this._gender = null;
        this._disposed = true;
        this._controller = null;
    }

    public update(): void {
        let _loc1_: BitmapData = null;
        let _loc3_: boolean = this._controller.manager.getBoolean("zoom.enabled");
        let _loc2_: IAvatarImage = this._controller.manager.avatarRenderManager.createAvatarImage(this.figure, _loc3_ ? "h" : "sh", this._gender, this);
        if (_loc2_) {
            _loc2_.setDirection("full", 4);
            _loc1_ = _loc2_.getImage("full", true, _loc3_ ? 0.5 : 1);
            if (this._view && _loc1_) {
                this._view.update(_loc1_);
            }
            _loc2_.dispose();
        }
    }

    public avatarImageReady(param1: string): void {
        this.update();
    }

    get [IDisposable](): true {
        return true;
    }
}
