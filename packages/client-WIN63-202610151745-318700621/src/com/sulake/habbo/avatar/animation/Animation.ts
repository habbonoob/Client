import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { ISpriteDataContainer } from '@/com/sulake/habbo/avatar/animation/ISpriteDataContainer';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AddDataContainer } from '@/com/sulake/habbo/avatar/animation/AddDataContainer';
import { AnimationLayerData } from '@/com/sulake/habbo/avatar/animation/AnimationLayerData';
import { AvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/AvatarDataContainer';
import { DirectionDataContainer } from '@/com/sulake/habbo/avatar/animation/DirectionDataContainer';
import { IAnimation, isIAnimation } from '@/com/sulake/habbo/avatar/animation/IAnimation';
import { SpriteDataContainer } from '@/com/sulake/habbo/avatar/animation/SpriteDataContainer';

export class Animation implements IAnimation {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::Animation'); }

    private static readonly _SafeStr_5572: any[] = [];

    declare private _id: string;

    declare private _description: string;

    declare private _frames: any[];

    declare private _SafeStr_14825: any[];

    declare private _spriteData: ISpriteDataContainer[];

    declare private _avatarData: AvatarDataContainer;

    declare private _directionData: DirectionDataContainer;

    declare private _SafeStr_4940: any[];

    declare private _SafeStr_3016: any[];

    declare private _overriddenActions: UtilsMap;

    declare private _overrideFrames: UtilsMap;

    declare private _overrideFrameDirections: UtilsMap;

    declare private _SafeStr_14826: boolean;
    static { (this.prototype as any)._SafeStr_14826 = false; }

    declare private _resetOnToggle: boolean;
    static { (this.prototype as any)._resetOnToggle = false; }

    constructor(param1: AvatarStructure, param2: XML) {
        let _loc6_: string = null;
        let _loc8_: string = null;
        let _loc3_: any[] = null;
        let _loc5_: any[] = null;
        this._frames = [];
        this._SafeStr_14825 = [];
        this._id = String(param2.attribute("name"));
        if (param2.hasOwnProperty("@desc")) {
            this._description = String(param2.attribute("desc"));
        } else {
            this._description = this._id;
        }
        if (param2.hasOwnProperty("@resetOnToggle")) {
            this._resetOnToggle = Boolean(param2.attribute("resetOnToggle"));
        } else {
            this._resetOnToggle = false;
        }
        if (param2.hasOwnProperty("sprite")) {
            this._spriteData = [];
            for (const _loc7_ of param2.child("sprite") ?? []) {
                this._spriteData.push(new SpriteDataContainer(isIAnimation(this) ? this : null, _loc7_));
            }
        }
        if (param2.hasOwnProperty("avatar")) {
            this._avatarData = new AvatarDataContainer(param2.child("avatar").item(0));
        }
        if (param2.hasOwnProperty("direction")) {
            this._directionData = new DirectionDataContainer(param2.child("direction").item(0));
        }
        if (param2.hasOwnProperty("remove")) {
            this._SafeStr_4940 = [];
            for (const _loc9_ of param2.child("remove") ?? []) {
                this._SafeStr_4940.push(String(_loc9_.attribute("id")));
            }
        }
        if (param2.hasOwnProperty("add")) {
            this._SafeStr_3016 = [];
            for (const _loc10_ of param2.child("add") ?? []) {
                this._SafeStr_3016.push(new AddDataContainer(_loc10_));
            }
        }
        if (param2.hasOwnProperty("override")) {
            this._overrideFrames = new UtilsMap();
            this._overrideFrameDirections = new UtilsMap();
            this._overriddenActions = new UtilsMap();
            for (const _loc4_ of param2.child("_SafeStr_7705") ?? []) {
                _loc6_ = _loc4_.attribute("name").toString();
                _loc8_ = _loc4_.attribute("_SafeStr_7705").toString();
                this._overriddenActions.add(_loc8_, _loc6_);
                _loc3_ = [];
                _loc5_ = [];
                this.parseFrames(_loc3_, _loc5_, _loc4_.child("frame"), param1);
                this._overrideFrames.add(_loc6_, _loc3_);
                this._overrideFrameDirections.add(_loc6_, _loc5_);
            }
        }
        this.parseFrames(this._frames, this._SafeStr_14825, param2.child("frame"), param1);
    }

    private parseFrames(param1: any[], param2: any[], param3: XMLList, param4: AvatarStructure): void {
        let _loc9_: any;
        let _loc8_: any;
        let _loc6_: any[] = null;
        let _loc14_: IActionDefinition = null;
        let _loc7_: number = 0;
        let _loc11_: DirectionDataContainer = null;
        let _loc5_: number = 0;
        let _loc12_: AnimationLayerData = null;
        let _loc13_: AnimationLayerData = null;
        for (const _loc10_ of param3 ?? []) {
            _loc7_ = 1;
            _loc11_ = null;
            if (_loc10_.hasOwnProperty("direction")) {
                _loc11_ = new DirectionDataContainer(_loc10_.child("direction").item(0));
                this._SafeStr_14826 = true;
            }
            if (Number(_loc10_.attribute("repeats")) > 1) {
                _loc7_ = Number(_loc10_.attribute("repeats")) | 0;
            }
            _loc5_ = 0;
            while (_loc5_ < _loc7_) {
                _loc6_ = [];
                for (_loc9_ of _loc10_.child("bodypart") ?? []) {
                    _loc14_ = param4.getActionDefinition(String(_loc9_.attribute("action")));
                    _loc12_ = new AnimationLayerData(_loc9_, "bodypart", _loc14_);
                    _loc6_.push(_loc12_);
                }
                for (_loc8_ of _loc10_.child("fx") ?? []) {
                    _loc14_ = param4.getActionDefinition(String(_loc8_.attribute("action")));
                    _loc13_ = new AnimationLayerData(_loc8_, "fx", _loc14_);
                    _loc6_.push(_loc13_);
                    if (_loc14_ != null) {
                    }
                }
                param1.push(_loc6_);
                param2.push(_loc11_);
                _loc5_++;
            }
        }
    }

    public frameCount(param1: string = null): number {
        let _loc2_: any[] = null;
        if (!param1) {
            return this._frames.length | 0;
        }
        if (this._overrideFrames) {
            _loc2_ = this._overrideFrames.getValue(param1);
            if (_loc2_) {
                return _loc2_.length | 0;
            }
        }
        return 0;
    }

    public hasOverriddenActions(): boolean {
        if (!this._overriddenActions) {
            return false;
        }
        return this._overriddenActions.length > 0;
    }

    public overriddenActionNames(): any[] {
        if (!this._overriddenActions) {
            return null;
        }
        return this._overriddenActions.getKeys();
    }

    public overridingAction(param1: string): string {
        if (!this._overriddenActions) {
            return null;
        }
        return stringOrNull(this._overriddenActions.getValue(param1));
    }

    private getFrame(param1: number, param2: string = null): any[] {
        let _loc3_: any[] = null;
        let _loc4_: any[] = [];
        if (!param2) {
            if (this._frames.length > 0) {
                _loc4_ = this._frames[param1 % this._frames.length];
            }
        } else {
            _loc3_ = asGuarded(this._overrideFrames.getValue(param2), Array.isArray);
            if (_loc3_ && _loc3_.length > 0) {
                _loc4_ = _loc3_[param1 % _loc3_.length];
            }
        }
        return _loc4_;
    }

    public getAnimatedBodyPartIds(param1: number, param2: string = null): any[] {
        let _loc5_: any;
        let _loc4_: any[] = [];
        for (const _loc3_ of this.getFrame(param1, param2) ?? []) {
            if (_loc3_.type == "bodypart") {
                _loc4_.push(_loc3_.id);
            } else if (_loc3_.type == "fx") {
                if (this._SafeStr_3016) {
                    for (_loc5_ of this._SafeStr_3016 ?? []) {
                        if (_loc5_.id == _loc3_.id) {
                            _loc4_.push(_loc5_.align);
                        }
                    }
                }
            }
        }
        return _loc4_;
    }

    public getLayerData(param1: number, param2: string, param3: string = null): AnimationLayerData {
        let _loc5_: any;
        for (const _loc4_ of this.getFrame(param1, param3) ?? []) {
            if (_loc4_.id == param2) {
                return _loc4_ instanceof AnimationLayerData ? _loc4_ : null;
            }
            if (_loc4_.type == "fx") {
                for (_loc5_ of this._SafeStr_3016 ?? []) {
                    if (_loc5_.align == param2 && _loc5_.id == _loc4_.id) {
                        return _loc4_ instanceof AnimationLayerData ? _loc4_ : null;
                    }
                }
            }
        }
        return null;
    }

    public getDirectionOffset(param1: number, param2: string = null): number {
        let _loc3_: number = 0;
        let _loc5_: DirectionDataContainer = null;
        let _loc4_: any[] = this._SafeStr_14825;
        if (param2 && this._overrideFrameDirections) {
            _loc4_ = asGuarded(this._overrideFrameDirections.getValue(param2), Array.isArray);
        }
        if (_loc4_ && _loc4_.length > 0) {
            _loc3_ = (param1 % _loc4_.length + _loc4_.length) % _loc4_.length;
            _loc5_ = asInstanceOf(_loc4_[_loc3_], DirectionDataContainer);
            if (_loc5_ != null) {
                return _loc5_.offset;
            }
        }
        return this._directionData != null ? this._directionData.offset : 0;
    }

    public hasAvatarData(): boolean {
        return this._avatarData != null;
    }

    public hasDirectionData(): boolean {
        return this._directionData != null || this._SafeStr_14826;
    }

    public hasAddData(): boolean {
        return this._SafeStr_3016 != null;
    }

    public getAddData(param1: string): AddDataContainer {
        if (this._SafeStr_3016) {
            for (const _loc2_ of this._SafeStr_3016 ?? []) {
                if (_loc2_.id == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public get id(): string {
        return this._id;
    }

    public get spriteData(): ISpriteDataContainer[] {
        return this._spriteData;
    }

    public get avatarData(): AvatarDataContainer {
        return this._avatarData;
    }

    public get directionData(): DirectionDataContainer {
        return this._directionData;
    }

    public get removeData(): any[] {
        return this._SafeStr_4940 ? this._SafeStr_4940 : Animation._SafeStr_5572;
    }

    public get addData(): any[] {
        return this._SafeStr_3016 ? this._SafeStr_3016 : Animation._SafeStr_5572;
    }

    public toString(): string {
        return this._description;
    }

    public get resetOnToggle(): boolean {
        return this._resetOnToggle;
    }

    get [IAnimation](): true {
        return true;
    }
}
