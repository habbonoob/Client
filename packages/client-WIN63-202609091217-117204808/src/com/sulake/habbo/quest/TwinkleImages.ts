import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class TwinkleImages implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::TwinkleImages'); }

    private static readonly IMAGE_COUNT: number = 6;

    declare private _questEngine: HabboQuestEngine;

    constructor(param1: HabboQuestEngine) {
        let _loc2_: number = 0;
        this._questEngine = param1;
        _loc2_ = 1;
        while (_loc2_ <= 6) {
            this._questEngine.windowManager.resourceManager.retrieveAsset(TwinkleImages.getImageUri(_loc2_), null);
            _loc2_++;
        }
    }

    private static getImageUri(param1: number): string {
        return "${image.library.questing.url}ach_twinkle" + param1 + ".png";
    }

    public getImage(param1: number): BitmapData {
        let _loc2_: IAsset = null;
        if (this._questEngine != null) {
            _loc2_ = castTo(this._questEngine.windowManager, Component).assets.getAssetByName(this._questEngine.interpolate(TwinkleImages.getImageUri(param1)));
            if (_loc2_ != null && _loc2_ instanceof BitmapDataAsset) {
                return asInstanceOf(_loc2_.content, BitmapData);
            }
        }
        return null;
    }

    public dispose(): void {
        this._questEngine = null;
    }

    public get disposed(): boolean {
        return this._questEngine != null;
    }

    get [IDisposable](): true {
        return true;
    }
}
