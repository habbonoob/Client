import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BadgePartData } from '@/com/sulake/habbo/communication/messages/incoming/users/BadgePartData';
import { GuildColorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildColorData';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class GuildEditorData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildEditorData'); }

    declare private _baseParts: BadgePartData[];

    declare private _layerParts: BadgePartData[];

    declare private _badgeColors: GuildColorData[];

    declare private _guildPrimaryColors: GuildColorData[];

    declare private _guildSecondaryColors: GuildColorData[];

    constructor(param1: IMessageDataWrapper = null) {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        this._baseParts = [];
        this._layerParts = [];
        this._badgeColors = [];
        this._guildPrimaryColors = [];
        this._guildSecondaryColors = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._baseParts.push(new BadgePartData(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._layerParts.push(new BadgePartData(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._badgeColors.push(new GuildColorData(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._guildPrimaryColors.push(new GuildColorData(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._guildSecondaryColors.push(new GuildColorData(param1));
            _loc3_++;
        }
    }

    public get baseParts(): BadgePartData[] {
        return this._baseParts;
    }

    public get layerParts(): BadgePartData[] {
        return this._layerParts;
    }

    public get badgeColors(): GuildColorData[] {
        return this._badgeColors;
    }

    public get guildPrimaryColors(): GuildColorData[] {
        return this._guildPrimaryColors;
    }

    public get guildSecondaryColors(): GuildColorData[] {
        return this._guildSecondaryColors;
    }

    public findMatchingPrimaryColorId(param1: number): number {
        if (param1 < 0 || this._badgeColors.length <= 0 || this._badgeColors.length < param1 || this._guildPrimaryColors.length <= 0) {
            return 0;
        }
        return this.findClosestColor(this._badgeColors[param1], this._guildPrimaryColors);
    }

    public findMatchingSecondaryColorId(param1: number): number {
        if (param1 < 0 || this._badgeColors.length <= 0 || this._badgeColors.length < param1 || this._guildSecondaryColors.length <= 0) {
            return 0;
        }
        return this.findClosestColor(this._badgeColors[param1], this._guildSecondaryColors);
    }

    private findClosestColor(param1: GuildColorData, param2: GuildColorData[]): number {
        let _loc8_: number = 0;
        let _loc5_: IVector3d = null;
        let _loc6_: number = NaN;
        let _loc4_: IVector3d = ColorConverter.rgb2CieLab(param1.color | 0);
        let _loc7_: number = 0;
        let _loc3_: number = 1.7976931348623157e+308;
        _loc8_ = 0;
        while (_loc8_ < param2.length) {
            _loc5_ = ColorConverter.rgb2CieLab(param2[_loc8_].color | 0);
            _loc6_ = Math.pow(_loc4_.x - _loc5_.x, 2) + Math.pow(_loc4_.y - _loc5_.y, 2) + Math.pow(_loc4_.z - _loc5_.z, 2);
            if (_loc6_ < _loc3_) {
                _loc3_ = _loc6_;
                _loc7_ = _loc8_;
            }
            _loc8_++;
        }
        return param2[_loc7_].id;
    }
}
