import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetReceiver } from '@/com/sulake/core/assets/IAssetReceiver';
import type { IResourceManager } from '@/com/sulake/core/assets/IResourceManager';
import type { BadgePartData } from '@/com/sulake/habbo/communication/messages/incoming/users/BadgePartData';
import type { BadgeLayerOptions } from '@/com/sulake/habbo/groups/badge/BadgeLayerOptions';
import type { BadgeSelectPartCtrl } from '@/com/sulake/habbo/groups/badge/BadgeSelectPartCtrl';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GuildColorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildColorData';

export class BadgeEditorPartItem implements IDisposable, IAssetReceiver {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge::BadgeEditorPartItem'); }

    public static BASE_PART: number = 0;
    public static LAYER_PART: number = 1;
    public static IMAGE_WIDTH: number = 39;
    public static IMAGE_HEIGHT: number = 39;
    public static CELL_WIDTH: number = 13;
    public static CELL_HEIGHT: number = 13;

    declare private _manager: HabboGroupsManager;

    declare private _SafeStr_2408: BadgeSelectPartCtrl;

    declare private _partIndex: number;
    static { (this.prototype as any)._partIndex = 0; }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _SafeStr_5673: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _fileName: string;

    declare private _maskFileName: string;

    declare private _image: BitmapData;

    declare private _mask: BitmapData;

    declare private _composite: BitmapData;

    private _colorTransform: ColorTransform = new ColorTransform(1, 1, 1);
    private _SafeStr_5632: boolean = false;
    private _isLoaded: boolean = false;
    private _isStatic: boolean = false;

    constructor(param1: HabboGroupsManager, param2: BadgeSelectPartCtrl, param3: number, param4: number, param5: BadgePartData = null) {
        this._partIndex = param3;
        this._manager = param1;
        this._SafeStr_2408 = param2;
        this._type = param4;
        this._SafeStr_5673 = this._manager.getProperty("image.library.badgepart.url");
        this._composite = new BitmapData(BadgeEditorPartItem.IMAGE_WIDTH | 0, BadgeEditorPartItem.IMAGE_HEIGHT | 0);
        if (param5 == null) {
            this._isLoaded = true;
            this._isStatic = true;
            this._image = this._manager.getButtonImage("badge_part_empty");
        } else {
            this._fileName = param5.fileName.replace(".gif", "").replace(".png", "");
            this._maskFileName = param5.maskFileName.replace(".gif", "").replace(".png", "");
            this._SafeStr_5632 = this._maskFileName.length > 0;
            this._composite = new BitmapData(BadgeEditorPartItem.IMAGE_WIDTH | 0, BadgeEditorPartItem.IMAGE_HEIGHT | 0);
            this._fileName = this._SafeStr_5673 + "badgepart_" + this._fileName + ".png";
            this._maskFileName = this._SafeStr_5673 + "badgepart_" + this._maskFileName + ".png";
            this._manager.windowManager.resourceManager.retrieveAsset(this._fileName, this);
            this._manager.windowManager.resourceManager.retrieveAsset(this._maskFileName, this);
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get partIndex(): number {
        return this._partIndex;
    }

    public receiveAsset(param1: IAsset, param2: string): void {
        let _loc3_: IResourceManager = this._manager.windowManager.resourceManager;
        if (_loc3_.isSameAsset(this._fileName, param2)) {
            this._image = asInstanceOf(param1.content, BitmapData);
        }
        if (_loc3_.isSameAsset(this._maskFileName, param2)) {
            this._mask = asInstanceOf(param1.content, BitmapData);
        }
        this.checkIsImageLoaded();
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._image) {
                this._image.dispose();
                this._image = null;
            }
            if (this._mask) {
                this._mask.dispose();
                this._mask = null;
            }
            if (this._composite) {
                this._composite.dispose();
                this._composite = null;
            }
            this._fileName = null;
            this._maskFileName = null;
            this._colorTransform = null;
            this._SafeStr_2408 = null;
            this._manager = null;
            this._disposed = true;
        }
    }

    private checkIsImageLoaded(): void {
        if (this._image == null) {
            return;
        }
        if (this._SafeStr_5632 && this._mask == null) {
            return;
        }
        this._isLoaded = true;
        if (this._type == BadgeEditorPartItem.BASE_PART) {
            this._SafeStr_2408.onBaseImageLoaded(this);
        } else {
            this._SafeStr_2408.onLayerImageLoaded(this);
        }
    }

    public getComposite(param1: BadgeLayerOptions): BitmapData {
        if (!this._isLoaded) {
            return null;
        }
        if (this._isStatic) {
            return this._image;
        }
        let _loc2_: GuildColorData = asInstanceOf(this._manager.guildEditorData.badgeColors[param1.colorIndex], GuildColorData);
        this._colorTransform.redMultiplier = _loc2_.red / 255;
        this._colorTransform.greenMultiplier = _loc2_.green / 255;
        this._colorTransform.blueMultiplier = _loc2_.blue / 255;
        let _loc3_: Point = this.getPosition(param1);
        this._composite.dispose();
        this._composite = new BitmapData(BadgeEditorPartItem.IMAGE_WIDTH | 0, BadgeEditorPartItem.IMAGE_HEIGHT | 0, true, 0);
        this._composite.copyPixels(this._image, this._image.rect, _loc3_);
        this._composite.colorTransform(this._composite.rect, this._colorTransform);
        if (this._SafeStr_5632) {
            this._composite.copyPixels(this._mask, this._mask.rect, _loc3_, null, null, true);
        }
        return this._composite;
    }

    private getPosition(param1: BadgeLayerOptions): Point {
        let _loc2_: number = BadgeEditorPartItem.CELL_WIDTH * param1.gridX + BadgeEditorPartItem.CELL_WIDTH / 2 - this._image.width / 2;
        let _loc3_: number = BadgeEditorPartItem.CELL_HEIGHT * param1.gridY + BadgeEditorPartItem.CELL_HEIGHT / 2 - this._image.height / 2;
        if (_loc2_ < 0) {
            _loc2_ = 0;
        }
        if (_loc2_ + this._image.width > BadgeEditorPartItem.IMAGE_WIDTH) {
            _loc2_ = BadgeEditorPartItem.IMAGE_WIDTH - this._image.width;
        }
        if (_loc3_ < 0) {
            _loc3_ = 0;
        }
        if (_loc3_ + this._image.height > BadgeEditorPartItem.IMAGE_HEIGHT) {
            _loc3_ = BadgeEditorPartItem.IMAGE_HEIGHT - this._image.height;
        }
        return new Point(Math.floor(_loc2_), Math.floor(_loc3_));
    }

    get [IDisposable](): true {
        return true;
    }
}
