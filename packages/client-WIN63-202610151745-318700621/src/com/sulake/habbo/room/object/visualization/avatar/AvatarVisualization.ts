import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { IAvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/IAvatarDataContainer';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';
import type { AvatarVisualizationRoomData } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualizationRoomData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarAction } from '@/com/sulake/habbo/avatar/enum/AvatarAction';
import { isIAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import { VariableFxStatusModelData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelData';
import { ExpressionAdditionFactory } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/ExpressionAdditionFactory';
import { FloatingIdleZ } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/FloatingIdleZ';
import { GameClickTarget } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/GameClickTarget';
import { GuideStatusBubble } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/GuideStatusBubble';
import { HabbiconBubble } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/HabbiconBubble';
import { MutedBubble } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/MutedBubble';
import { NumberBubble } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/NumberBubble';
import { StackedAdditions } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/StackedAdditions';
import { TypingBubble } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/TypingBubble';
import { AvatarVisualizationData } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualizationData';
import { _SafeCls_6138 } from '@/com/sulake/habbo/room/object/visualization/furniture/_SafeCls_6138';
import { _SafeCls_6139 } from '@/com/sulake/habbo/room/object/visualization/furniture/_SafeCls_6139';
import { VariableFxStackController } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStackController';
import { BitmapHelper } from '@/com/sulake/habbo/utils/BitmapHelper';
import { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';
import { RoomObjectSpriteType } from '@/com/sulake/room/object/enum/RoomObjectSpriteType';
import { IRoomObjectAdditionalSpriteProvider } from '@/com/sulake/room/object/visualization/IRoomObjectAdditionalSpriteProvider';
import { RoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/RoomObjectSpriteVisualization';

export class AvatarVisualization extends RoomObjectSpriteVisualization implements IAvatarImageListener, IAvatarEffectListener, IRoomObjectAdditionalSpriteProvider {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar::AvatarVisualization'); }

    private static readonly AVATAR_SPRITE_TAG: string = "avatar";
    private static readonly AVATAR_SPRITE_DEFAULT_DEPTH: number = -0.01;
    private static readonly AVATAR_OWN_DEPTH_ADJUST: number = 0.001;
    private static readonly AVATAR_SPRITE_LAYING_DEPTH: number = -0.409;
    private static readonly BASE_Y_SCALE: number = 1000;
    private static readonly ANIMATION_FRAME_UPDATE_INTERVAL: number = 2;
    private static readonly SNOWBOARDING_EFFECT: number = 97;
    private static readonly FREEZE_EFFECT: number = 218;
    private static readonly MAX_AVATARS_WITH_EFFECT: number = 3;
    private static readonly SPRITE_INDEX_AVATAR: number = 0;
    private static readonly _SafeStr_8161: number = 1;
    private static readonly INITIAL_RESERVED_SPRITES: number = 2;
    private static readonly ADDITION_ID_IDLE_BUBBLE: number = 1;
    private static readonly ADDITION_ID_TYPING_BUBBLE: number = 2;
    private static readonly ADDITION_ID_EXPRESSION: number = 3;
    private static readonly ADDITION_ID_NUMBER_BUBBLE: number = 4;
    private static readonly ADDITION_ID_GAME_CLICK_TARGET: number = 5;
    private static readonly ADDITION_ID_MUTED_BUBBLE: number = 6;
    private static readonly ADDITION_ID_GUIDE_STATUS_BUBBLE: number = 7;
    private static readonly ADDITION_ID_HABBICON_BUBBLE: number = 8;
    private static readonly ADDITION_ID_STACKED_ADDITIONS: number = 9;
    private static readonly DEFAULT_CANVAS_OFFSETS: any[] = [0, 0, 0];
    private static readonly VARIABLE_HOLDER_FILTER: any[] = [new ColorMatrixFilter([0.9, 0, 0, 0, 0, 0, 1, 0, 0, 40, 0, 0, 1, 0, 80, 0, 0, 0, 0.85, 0]), new GlowFilter(12318714, 1, 4, 4, 4, 1, true, false)];
    private _lastAnimationUpdateTime: number = -1000;
    private readonly _SafeStr_8514: number = 41;
    private _SafeStr_3579: AvatarVisualizationData = null;

    declare private _SafeStr_3843: AvatarVisualizationRoomData;

    declare private _avatars: UtilsMap;

    declare private _SafeStr_3138: UtilsMap;

    private _updatesUntilFrameUpdate: number = 0;

    declare private _SafeStr_2729: boolean;
    static { (this.prototype as any)._SafeStr_2729 = false; }

    declare private _figure: string;

    declare private _gender: string;

    private _forcedAnimFrames: number = 0;

    declare private _shadowAsset: BitmapDataAsset;

    declare private _forceUpdate: boolean;
    static { (this.prototype as any)._forceUpdate = false; }

    declare private _SafeStr_3929: number;
    static { (this.prototype as any)._SafeStr_3929 = 0; }

    private _headAngle: number = -1;
    private _angle: number = -1;
    private _SafeStr_5640: number = -1;
    private _SafeStr_14756: number = 0;
    private _SafeStr_5774: number = 2;

    declare private _SafeStr_2362: UtilsMap;

    private _geometryUpdateId: number = -1;
    private _SafeStr_14747: number = -1;
    private _SafeStr_14746: VariableFxStackController = new VariableFxStackController();
    private _posture: string = "";
    private _SafeStr_5030: string = "";
    private _SafeStr_5527: boolean = false;
    private _isSleeping: boolean = false;
    private _SafeStr_4442: boolean = false;
    private _expressionType: number = 0;
    private _gesture: number = 0;
    private _danceStyle: number = 0;
    private _SafeStr_5226: number = 0;
    private _SafeStr_5676: boolean = false;
    private _SafeStr_5037: boolean = false;
    private _signType: number = -1;
    private _isBlocked: boolean = false;
    private _effectType: number = 0;
    private _SafeStr_3701: number = 0;
    private _SafeStr_2981: number = 0;
    private _geometryOffset: number = 0;
    private _baseY: number = 0;
    private _SafeStr_3451: boolean = false;
    private _SafeStr_3642: boolean = false;
    private _layInside: boolean = false;
    private _SafeStr_2170: IAvatarImage = null;
    private _SafeStr_5646: boolean = false;
    private _alphaMultiplier: number = 1;
    private _SafeStr_14741: number = 1;
    private _SafeStr_14742: boolean = false;
    private _SafeStr_14743: number = 0;
    private _wiredHighlightStrength: number = 0;
    private _wiredHighlightColor: number = 16777215;
    private _wiredHighlightFilters: any[] = null;

    private _wiredHighlightFilterCache: any = {};

    private _SafeStr_14744: _SafeCls_6139 = new _SafeCls_6139();

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor() {
        super();
        this._avatars = new UtilsMap();
        this._SafeStr_3138 = new UtilsMap();
        this._SafeStr_2729 = false;
        this._SafeStr_3929 = Math.random() * 200 + 200 | 0;
    }

    private static resolveHabbiconFacingDirection(param1: number): number {
        param1 = (param1 % 8 + 8) % 8;
        if (param1 <= 2) {
            return 1;
        }
        if (param1 >= 4 && param1 <= 6) {
            return -1;
        }
        return 0;
    }

    private static normalizeDirectionAngle(param1: number): number {
        return (param1 % 360 + 360) % 360;
    }

    public override dispose(): void {
        if (this._avatars != null) {
            this.resetImages();
            this._avatars.dispose();
            this._SafeStr_3138.dispose();
            this._avatars = null;
        }
        if (this._SafeStr_14744 != null) {
            this._SafeStr_14744.dispose();
            this._SafeStr_14744 = null;
        }
        this._wiredHighlightFilters = null;
        this._wiredHighlightFilterCache = null;
        this._SafeStr_3579 = null;
        this._SafeStr_3843 = null;
        this._SafeStr_14746 = null;
        this._shadowAsset = null;
        if (this._SafeStr_2362) {
            for (const _loc1_ of valuesOf(this._SafeStr_2362)) {
                _loc1_.dispose();
            }
            this._SafeStr_2362 = null;
        }
        super.dispose();
        this._disposed = true;
    }

    public override getSpriteList(): any[] {
        let _loc17_: RoomObjectSpriteData = null;
        let _loc6_: RoomObjectSpriteData = null;
        let _loc11_: IAnimationLayerData = null;
        let _loc18_: number = 0;
        let _loc1_: number = 0;
        let _loc13_: number = 0;
        let _loc14_: number = 0;
        let _loc15_: number = 0;
        let _loc19_: number = 0;
        let _loc8_: number = 0;
        let _loc7_: string = null;
        let _loc2_: BitmapDataAsset = null;
        let _loc12_: Rectangle = null;
        let _loc5_: string = null;
        if (this._SafeStr_2170 == null) {
            return null;
        }
        let _loc3_: IRoomObjectSprite = this.getSprite(1);
        if (_loc3_) {
            _loc17_ = new RoomObjectSpriteData();
            _loc17_.alpha = _loc3_.alpha;
            _loc17_.x = _loc3_.offsetX;
            _loc17_.y = _loc3_.offsetY;
            _loc17_.name = _loc3_.assetName;
            _loc17_.width = _loc3_.width;
            _loc17_.height = _loc3_.height;
        }
        let _loc9_: any[] = this._SafeStr_2170.getServerRenderData();
        for (const _loc10_ of this._SafeStr_2170.getSprites() ?? []) {
            _loc6_ = new RoomObjectSpriteData();
            _loc11_ = this._SafeStr_2170.getLayerData(_loc10_);
            _loc18_ = 0;
            _loc1_ = this._SafeStr_2170.getDirection();
            _loc13_ = _loc10_.getDirectionOffsetX(_loc1_);
            _loc14_ = _loc10_.getDirectionOffsetY(_loc1_);
            _loc15_ = _loc10_.getDirectionOffsetZ(_loc1_);
            _loc19_ = 0;
            if (_loc10_.hasDirections) {
                _loc19_ = _loc1_;
            }
            if (_loc11_ != null) {
                _loc18_ = _loc11_.animationFrame;
                _loc13_ += _loc11_.dx;
                _loc14_ += _loc11_.dy;
                _loc19_ += _loc11_.directionOffset;
            }
            _loc8_ = 64;
            if (_loc8_ < 48) {
                _loc13_ = _loc13_ / 2 | 0;
                _loc14_ = _loc14_ / 2 | 0;
            }
            if (_loc19_ < 0) {
                _loc19_ += 8;
            } else if (_loc19_ > 7) {
                _loc19_ -= 8;
            }
            _loc7_ = this._SafeStr_2170.getScale() + "_" + _loc10_.member + "_" + _loc19_ + "_" + _loc18_;
            _loc2_ = this._SafeStr_2170.getAsset(_loc7_);
            if (_loc2_ != null) {
                _loc6_.x = -_loc2_.offset.x - _loc8_ / 2 + _loc13_ | 0;
                _loc6_.y = -_loc2_.offset.y + _loc14_ | 0;
                if (_loc10_.hasStaticY) {
                    _loc6_.y = _loc6_.y + this._baseY * _loc8_ / (2 * 1000) | 0;
                }
                if (_loc10_.ink == 33) {
                    _loc6_.blendMode = "add";
                }
                _loc6_.name = _loc7_;
                if (this._SafeStr_3642) {
                    _loc6_.z = -0.409 - 0.001 * this.spriteCount * _loc15_;
                } else {
                    _loc6_.z = -0.001 * this.spriteCount * _loc15_;
                }
                _loc12_ = _loc2_.rectangle;
                if (_loc12_ == null) {
                    _loc6_.width = 60;
                    _loc6_.height = 60;
                } else {
                    _loc6_.width = _loc12_.width | 0;
                    _loc6_.height = _loc12_.height | 0;
                }
                _loc9_.push(_loc6_);
            }
        }
        let _loc4_: IAvatarDataContainer = this._SafeStr_2170.avatarSpriteData;
        if (_loc4_ != null && _loc4_.paletteIsGrayscale) {
            _loc5_ = stringOrNull(_loc4_.reds[0].toString());
            for (const _loc16_ of _loc9_ ?? []) {
                if (_loc16_.name.indexOf("h_std_fx") == -1 && _loc16_.name.indexOf("h_std_sd") == -1) {
                    _loc16_.color = _loc5_;
                }
            }
        }
        if (_loc17_) {
            _loc9_.push(_loc17_);
        }
        return _loc9_;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get angle(): number {
        return this._angle;
    }

    public get habbiconFacingDirection(): number {
        if (this._SafeStr_2170 == null) {
            return 0;
        }
        return AvatarVisualization.resolveHabbiconFacingDirection(this._SafeStr_2170.getDirection());
    }

    public get posture(): string {
        return this._posture;
    }

    public set roomData(param1: AvatarVisualizationRoomData) {
        this._SafeStr_3843 = param1;
    }

    public get roomData(): AvatarVisualizationRoomData {
        return this._SafeStr_3843;
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        this._SafeStr_3579 = param1 instanceof AvatarVisualizationData ? param1 : null;
        this.createSprites(2);
        return true;
    }

    private updateModel(param1: IRoomObjectModel, param2: number, param3: boolean): boolean {
        let _loc10_: boolean = false;
        let _loc4_: boolean = false;
        let _loc11_: number = 0;
        let _loc14_: string = null;
        let _loc16_: number = NaN;
        let _loc7_: number = NaN;
        let _loc8_: boolean = false;
        let _loc12_: number = NaN;
        let _loc17_: IAvatarAddition = null;
        let _loc15_: number = 0;
        let _loc9_: StackedAdditions = null;
        let _loc13_: HabbiconBubble = null;
        let _loc6_: string = null;
        let _loc5_: number = this._SafeStr_3843 == null ? -1 : this._SafeStr_3843.variableFxVisualizationManager.updateId;
        if (param1.getUpdateID() != this._SafeStr_2366 || _loc5_ != this._SafeStr_14747) {
            _loc10_ = false;
            _loc4_ = false;
            _loc11_ = 0;
            _loc14_ = "";
            _loc4_ = param1.getNumber("figure_talk") > 0 && param3;
            if (_loc4_ != this._SafeStr_5527) {
                this._SafeStr_5527 = _loc4_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_expression") | 0;
            if (_loc11_ != this._expressionType) {
                this._expressionType = _loc11_;
                _loc10_ = true;
            }
            _loc4_ = param1.getNumber("figure_sleep") > 0;
            if (_loc4_ != this._isSleeping) {
                this._isSleeping = _loc4_;
                _loc10_ = true;
            }
            _loc4_ = param1.getNumber("figure_blink") > 0 && param3;
            if (_loc4_ != this._SafeStr_4442) {
                this._SafeStr_4442 = _loc4_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_gesture") | 0;
            if (_loc11_ != this._gesture) {
                this._gesture = _loc11_;
                _loc10_ = true;
            }
            _loc14_ = param1.getString("figure_posture");
            if (_loc14_ != this._posture) {
                this._posture = _loc14_;
                _loc10_ = true;
            }
            _loc14_ = param1.getString("figure_posture_parameter");
            if (_loc14_ != this._SafeStr_5030) {
                this._SafeStr_5030 = _loc14_;
                _loc10_ = true;
            }
            _loc4_ = param1.getNumber("figure_can_stand_up") > 0;
            if (_loc4_ != this._SafeStr_3451) {
                this._SafeStr_3451 = _loc4_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_vertical_offset") * 1000 | 0;
            if (_loc11_ != this._baseY) {
                this._baseY = _loc11_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_dance") | 0;
            if (_loc11_ != this._danceStyle) {
                this._danceStyle = _loc11_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_effect") | 0;
            if (_loc11_ != this._effectType) {
                this._effectType = _loc11_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_carry_object") | 0;
            if (_loc11_ != this._SafeStr_3701) {
                this._SafeStr_3701 = _loc11_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_use_object") | 0;
            if (_loc11_ != this._SafeStr_2981) {
                this._SafeStr_2981 = _loc11_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("head_direction") | 0;
            if (_loc11_ != this._headAngle) {
                this._headAngle = _loc11_;
                _loc10_ = true;
            }
            _loc16_ = param1.getNumber("furniture_wired_transparency");
            _loc7_ = isNaN(_loc16_) ? 1 : 1 - Math.max(0, Math.min(100, _loc16_)) / 100;
            _loc8_ = param1.getNumber("furniture_wired_click_through") > 0;
            if (_loc7_ != this._SafeStr_14741 || _loc8_ != this._SafeStr_14742) {
                this._SafeStr_14741 = _loc7_;
                this._SafeStr_14742 = _loc8_;
                _loc10_ = true;
            }
            _loc12_ = param1.getNumber("figure_alpha_multiplier");
            if (isNaN(_loc12_)) {
                _loc12_ = 1;
            }
            if (_loc12_ != this._alphaMultiplier) {
                this._alphaMultiplier = _loc12_;
                _loc10_ = true;
            }
            if (this._SafeStr_3701 > 0 && param1.getNumber("figure_use_object") > 0) {
                if (this._SafeStr_2981 != this._SafeStr_3701) {
                    this._SafeStr_2981 = this._SafeStr_3701;
                    _loc10_ = true;
                }
            } else if (this._SafeStr_2981 != 0) {
                this._SafeStr_2981 = 0;
                _loc10_ = true;
            }
            _loc17_ = asInstanceOf(this.getAddition(1), FloatingIdleZ);
            if (this._isSleeping) {
                if (!_loc17_) {
                    _loc17_ = this.addAddition(new FloatingIdleZ(1, this));
                }
                _loc10_ = true;
            } else if (_loc17_) {
                this.removeAddition(1);
            }
            _loc4_ = param1.getNumber("figure_is_muted") > 0;
            _loc17_ = asInstanceOf(this.getAddition(6), MutedBubble);
            if (_loc4_) {
                if (!_loc17_) {
                    _loc17_ = this.addAddition(new MutedBubble(6, this));
                }
                this.removeAddition(2);
                _loc10_ = true;
            } else {
                if (_loc17_) {
                    this.removeAddition(6);
                    _loc10_ = true;
                }
                _loc4_ = param1.getNumber("figure_is_typing") > 0;
                _loc17_ = asInstanceOf(this.getAddition(2), TypingBubble);
                if (_loc4_) {
                    if (!_loc17_) {
                        _loc17_ = this.addAddition(new TypingBubble(2, this));
                    }
                    _loc10_ = true;
                } else if (_loc17_) {
                    this.removeAddition(2);
                }
            }
            _loc11_ = param1.getNumber("figure_guide_status") | 0;
            if (_loc11_ != 0) {
                this.removeAddition(7);
                this.addAddition(new GuideStatusBubble(7, this, _loc11_));
                _loc10_ = true;
            } else if (asInstanceOf(this.getAddition(7), GuideStatusBubble) != null) {
                this.removeAddition(7);
                _loc10_ = true;
            }
            _loc4_ = param1.getNumber("figure_is_playing_game") > 0;
            _loc17_ = asInstanceOf(this.getAddition(5), GameClickTarget);
            if (_loc4_) {
                if (!_loc17_) {
                    _loc17_ = this.addAddition(new GameClickTarget(5));
                }
                _loc10_ = true;
            } else if (_loc17_) {
                this.removeAddition(5);
            }
            _loc11_ = param1.getNumber("figure_number_value") | 0;
            _loc17_ = asInstanceOf(this.getAddition(4), NumberBubble);
            if (_loc11_ > 0) {
                if (!_loc17_) {
                    _loc17_ = this.addAddition(new NumberBubble(4, _loc11_, this));
                }
                _loc10_ = true;
            } else if (_loc17_) {
                this.removeAddition(4);
            }
            _loc11_ = param1.getNumber("figure_habbicon") | 0;
            _loc15_ = param1.getNumber("figure_habbicon_trigger_sequence") | 0;
            _loc9_ = this.getStackedAdditions(_loc11_ > 0);
            _loc13_ = _loc9_ != null ? _loc9_.habbicon : null;
            if (_loc11_ > 0) {
                if (_loc13_ == null || _loc13_.habbiconId != _loc11_ || _loc13_.triggerSequence != _loc15_) {
                    _loc9_.setHabbicon(new HabbiconBubble(8, _loc11_, _loc15_, this));
                }
                _loc10_ = true;
            } else if (_loc13_ != null) {
                _loc9_.clearHabbicon();
                if (_loc9_.isEmpty) {
                    this.removeAddition(9);
                }
                _loc10_ = true;
            }
            if (this.reconcileVariableFxStatuses(asInstanceOf(param1.getObject("variable_fx_statuses"), VariableFxStatusModelData))) {
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_habbicon_spin_offset") | 0;
            if (_loc11_ != this._SafeStr_14756) {
                this._SafeStr_14756 = _loc11_;
                _loc10_ = true;
            }
            _loc11_ = param1.getNumber("figure_expression") | 0;
            _loc17_ = this.getAddition(3);
            if (_loc11_ > 0) {
                if (!_loc17_) {
                    _loc17_ = ExpressionAdditionFactory.make(3, _loc11_, this);
                    if (_loc17_) {
                        this.addAddition(_loc17_);
                    }
                }
            } else if (_loc17_) {
                this.removeAddition(3);
            }
            this.validateActions(param2);
            _loc14_ = param1.getString("gender");
            if (_loc14_ != this._gender) {
                this._gender = _loc14_;
                _loc10_ = true;
            }
            _loc6_ = param1.getString("figure");
            if (this.updateFigure(_loc6_)) {
                _loc10_ = true;
            }
            if (param1.hasNumber("figure_sign")) {
                _loc11_ = param1.getNumber("figure_sign") | 0;
                if (_loc11_ != this._signType) {
                    _loc10_ = true;
                    this._signType = _loc11_;
                }
            }
            if (param1.hasNumber("blocked")) {
                _loc4_ = param1.getNumber("blocked") > 0;
                if (this.updateBlocked(_loc4_)) {
                    _loc10_ = true;
                }
            }
            _loc4_ = param1.getNumber("figure_highlight_enable") > 0;
            if (_loc4_ != this._SafeStr_5676) {
                this._SafeStr_5676 = _loc4_;
                _loc10_ = true;
            }
            if (this._SafeStr_5676) {
                _loc11_ = param1.getNumber("figure_highlight") | 0;
                if (_loc11_ != this._SafeStr_5226) {
                    this._SafeStr_5226 = _loc11_;
                    _loc10_ = true;
                }
            }
            _loc4_ = param1.getNumber("figure_highlight_variable_holder") > 0;
            if (_loc4_ != this._SafeStr_5037) {
                this._SafeStr_5037 = _loc4_;
                _loc10_ = true;
            }
            _loc4_ = param1.getNumber("own_user") > 0;
            if (_loc4_ != this._SafeStr_5646) {
                this._SafeStr_5646 = _loc4_;
                _loc10_ = true;
            }
            this._SafeStr_2366 = param1.getUpdateID();
            this._SafeStr_14747 = _loc5_;
            return _loc10_;
        }
        return false;
    }

    private reconcileVariableFxStatuses(param1: VariableFxStatusModelData): boolean {
        let _loc2_: boolean = param1 != null && param1.statusesByConfig.length > 0 && this._SafeStr_3843 != null && this._SafeStr_3843.variableFxVisualizationManager != null;
        let _loc3_: StackedAdditions = this.getStackedAdditions(_loc2_);
        if (_loc3_ == null) {
            return false;
        }
        return this._SafeStr_14746.reconcile(param1, this._SafeStr_3843?.variableFxVisualizationManager, this._SafeStr_3843?.variableFxAssetProvider, this._SafeStr_3843?.variableFxRendererRegistry, _loc3_.stack, 0, getTimer());
    }

    private updateFigure(param1: string): boolean {
        if (this._figure != param1) {
            this._figure = param1;
            this.resetImages();
            return true;
        }
        return false;
    }

    private updateBlocked(param1: boolean): boolean {
        if (this._isBlocked != param1) {
            this._isBlocked = param1;
            this.resetImages();
            return true;
        }
        return false;
    }

    private resetImages(): void {
        let _loc2_: any = null;
        for (_loc2_ of valuesOf(this._avatars)) {
            if (_loc2_) {
                _loc2_.dispose();
            }
        }
        for (_loc2_ of valuesOf(this._SafeStr_3138)) {
            if (_loc2_) {
                _loc2_.dispose();
            }
        }
        this._avatars.reset();
        this._SafeStr_3138.reset();
        this._SafeStr_2170 = null;
        let _loc1_: IRoomObjectSprite = this.getSprite(0);
        if (_loc1_ != null) {
            _loc1_.asset = null;
            _loc1_.alpha = 255;
        }
    }

    private validateActions(param1: number): void {
        let _loc2_: number = 0;
        if (param1 < 48) {
            this._SafeStr_4442 = false;
        }
        if (this._posture == "sit" || this._posture == "lay") {
            this._geometryOffset = param1 / 2 | 0;
        } else {
            this._geometryOffset = 0;
        }
        this._layInside = false;
        this._SafeStr_3642 = false;
        if (this._posture == "lay") {
            this._SafeStr_3642 = true;
            _loc2_ = Number(this._SafeStr_5030) | 0;
            if (_loc2_ < 0) {
                this._layInside = true;
            }
        }
    }

    private getAvatarImage(param1: number, param2: number): IAvatarImage {
        let _loc4_: IAvatarImage = null;
        let _loc5_: IAvatarImage = null;
        let _loc3_: string = "avatarImage" + param1.toString();
        if (param2 == 0) {
            _loc4_ = asGuarded(this._avatars.getValue(_loc3_), isIAvatarImage);
        } else {
            _loc3_ += "-" + param2;
            _loc4_ = asGuarded(this._SafeStr_3138.getValue(_loc3_), isIAvatarImage);
            if (_loc4_) {
                _loc4_.forceActionUpdate();
            }
        }
        if (_loc4_ == null) {
            _loc4_ = this._SafeStr_3579.getAvatar(this._figure, param1, this._gender, this, this, this._isBlocked);
            if (_loc4_ != null) {
                if (param2 == 0) {
                    this._avatars.add(_loc3_, _loc4_);
                } else {
                    if (this._SafeStr_3138.length >= 3) {
                        _loc5_ = this._SafeStr_3138.remove(this._SafeStr_3138.getKey(0));
                        if (_loc5_) {
                            _loc5_.dispose();
                        }
                    }
                    this._SafeStr_3138.add(_loc3_, _loc4_);
                }
            }
        }
        return _loc4_;
    }

    public getAvatarRendererAsset(param1: string): IAsset {
        return this._SafeStr_3579 ? this._SafeStr_3579.getAvatarRendererAsset(param1) : null;
    }

    private updateObject(param1: IRoomObject, param2: IRoomGeometry, param3: boolean, param4: boolean = false): boolean {
        let _loc6_: boolean = false;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        if (param4 || this._SafeStr_3623 != param1.getUpdateID() || this._geometryUpdateId != param2.updateId) {
            _loc6_ = param3;
            _loc5_ = param1.getDirection().x - param2.direction.x | 0;
            _loc5_ = (_loc5_ % 360 + 360) % 360;
            if (this._posture == "sit" && this._SafeStr_3451) {
                _loc5_ -= _loc5_ % 90 - 45;
            }
            _loc7_ = this._headAngle;
            if (this._posture == "float") {
                _loc7_ = _loc5_;
            } else {
                _loc7_ = _loc7_ - param2.direction.x | 0;
            }
            _loc7_ = (_loc7_ % 360 + 360) % 360;
            if (this._posture == "sit" && this._SafeStr_3451 || this._posture == "swdieback" || this._posture == "swdiefront") {
                _loc7_ -= _loc7_ % 90 - 45;
            }
            if (this._SafeStr_14756 != 0) {
                _loc5_ = AvatarVisualization.normalizeDirectionAngle(_loc5_ + this._SafeStr_14756);
                _loc7_ = AvatarVisualization.normalizeDirectionAngle(_loc7_ + this._SafeStr_14756);
            }
            if (_loc5_ != this._angle || param4) {
                _loc6_ = true;
                this._angle = _loc5_;
                _loc5_ = _loc5_ - 112.5 | 0;
                _loc5_ = (_loc5_ + 360) % 360;
                this._SafeStr_2170.setDirectionAngle("full", _loc5_);
            }
            if (_loc7_ != this._SafeStr_5640 || param4) {
                _loc6_ = true;
                this._SafeStr_5640 = _loc7_;
                if (this._SafeStr_5640 != this._angle) {
                    _loc7_ = _loc7_ - 112.5 | 0;
                    _loc7_ = (_loc7_ + 360) % 360;
                    this._SafeStr_2170.setDirectionAngle("head", _loc7_);
                }
            }
            this._SafeStr_3623 = param1.getUpdateID();
            this._geometryUpdateId = param2.updateId;
            return _loc6_;
        }
        return false;
    }

    private updateShadow(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: IRoomObjectSprite = this.getSprite(1);
        _loc6_.skipMouseHandling = this._SafeStr_14742;
        this._shadowAsset = null;
        let _loc5_: boolean = this._posture == "mv" || this._posture == "std" || this._posture == "sit" && this._SafeStr_3451;
        if (this._effectType == 97 || this._effectType == 218) {
            _loc5_ = false;
        }
        if (_loc5_) {
            _loc6_.visible = true;
            if (this._shadowAsset == null || param1 != this._SafeStr_2292 || param2) {
                _loc3_ = 0;
                _loc4_ = 0;
                if (param1 < 48) {
                    _loc6_.libraryAssetName = "sh_std_sd_1_0_0";
                    this._shadowAsset = this._SafeStr_2170.getAsset(_loc6_.libraryAssetName);
                    _loc3_ = -8;
                    _loc4_ = this._SafeStr_3451 ? 6 : -3;
                } else {
                    _loc6_.libraryAssetName = "h_std_sd_1_0_0";
                    this._shadowAsset = this._SafeStr_2170.getAsset(_loc6_.libraryAssetName);
                    _loc3_ = -17;
                    _loc4_ = this._SafeStr_3451 ? 10 : -7;
                }
                if (this._shadowAsset != null) {
                    _loc6_.asset = asInstanceOf(this._shadowAsset.content, BitmapData);
                    _loc6_.offsetX = _loc3_;
                    _loc6_.offsetY = _loc4_;
                    _loc6_.alpha = 50 * this._alphaMultiplier * this._SafeStr_14741 | 0;
                    _loc6_.relativeDepth = 1;
                } else {
                    _loc6_.visible = false;
                }
            }
        } else {
            this._shadowAsset = null;
            _loc6_.visible = false;
        }
    }

    /** An avatar's own offset in the animation's steps, the same each time (its room object's instance id spread
     * over the step). */
    private static animationPhase(param1: IRoomObject): number {
        return Math.imul(param1.getInstanceId() | 0, 2654435761) >>> 0;
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        let _loc25_: any;
        let _loc5_: number = 0;
        let _loc10_: IRoomObjectSprite = null;
        let _loc40_: IRoomObjectSprite = null;
        let _loc22_: IRoomObjectSprite = null;
        let _loc18_: any[] = null;
        let _loc27_: BitmapData = null;
        let _loc37_: BitmapFilter = null;
        let _loc34_: number = 0;
        let _loc28_: number = 0;
        let _loc29_: IAnimationLayerData = null;
        let _loc13_: number = 0;
        let _loc12_: number = 0;
        let _loc16_: IAnimationLayerData = null;
        let _loc46_: number = 0;
        let _loc17_: number = 0;
        let _loc19_: number = 0;
        let _loc21_: number = 0;
        let _loc26_: number = 0;
        let _loc31_: string = null;
        let _loc6_: BitmapDataAsset = null;
        let _loc32_: number = 0;
        let _loc8_: boolean = false;
        let _loc39_: number = 0;
        let _loc38_: number = 0;
        let _loc41_: IRoomObject = this.object;
        if (_loc41_ == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_3579 == null) {
            return;
        }
        if (--this._SafeStr_3929 <= 0 && this._SafeStr_2170) {
            this._SafeStr_2170.disposeInactiveActionCache();
            this._SafeStr_3929 = 500;
        }
        let _loc15_: boolean = param2 >= this._lastAnimationUpdateTime + 41;
        if (_loc15_) {
            this._lastAnimationUpdateTime += 41;
            if (this._lastAnimationUpdateTime + 41 < param2) {
                // each avatar keeps its own place in the 41 ms step (and in the two steps of a frame), so a room
                // full of them redraws a few at a time instead of all in the one display frame: at a high frame
                // rate, every one of them in one frame is a frame missed
                const phase = AvatarVisualization.animationPhase(_loc41_);
                this._lastAnimationUpdateTime = param2 - 41 - phase % 41;
                if (this._updatesUntilFrameUpdate <= 0) {
                    this._updatesUntilFrameUpdate = 1 + phase % 2;
                }
            }
        }
        let _loc24_: IRoomObjectModel = _loc41_.getModel();
        let _loc11_: number = param1.scale;
        let _loc7_: boolean = false;
        let _loc20_: boolean = false;
        let _loc9_: boolean = false;
        let _loc36_: number = this._effectType;
        let _loc45_: boolean = false;
        let _loc35_: number = this._alphaMultiplier;
        let _loc43_: number = this._SafeStr_14741;
        let _loc42_: boolean = false;
        let _loc33_: boolean = this.updateModel(_loc24_, _loc11_, param3);
        let _loc23_: boolean = this.updateWiredHighlight(_loc24_);
        if (this._forceUpdate) {
            this.resetImages();
            this._forceUpdate = false;
        }
        if (_loc33_ || _loc11_ != this._SafeStr_2292 || this._SafeStr_2170 == null) {
            if (_loc11_ != this._SafeStr_2292) {
                _loc20_ = true;
                this.validateActions(_loc11_);
            }
            if (_loc36_ != this._effectType) {
                _loc45_ = true;
            }
            if (_loc35_ != this._alphaMultiplier || _loc43_ != this._SafeStr_14741) {
                _loc42_ = true;
            }
            if (_loc20_ || this._SafeStr_2170 == null || _loc45_ || _loc42_) {
                this._SafeStr_2170 = this.getAvatarImage(_loc11_, this._effectType);
                if (this._SafeStr_2170 == null) {
                    return;
                }
                _loc7_ = true;
                _loc10_ = this.getSprite(0);
                if (_loc10_) {
                    if (this._SafeStr_2170 && (this._SafeStr_2170.isPlaceholder() || this._SafeStr_2170.isBlocked())) {
                        _loc10_.alpha = 150 * this._alphaMultiplier * this._SafeStr_14741 | 0;
                        if (this._SafeStr_2170.isBlocked()) {
                            _loc10_.color = 6710886;
                        } else {
                            _loc10_.color = 16777215;
                        }
                    } else {
                        _loc10_.alpha = 255 * this._alphaMultiplier * this._SafeStr_14741 | 0;
                        _loc10_.color = 16777215;
                    }
                }
            }
            if (this._SafeStr_2170 == null) {
                return;
            }
            if (_loc45_ && this._SafeStr_2170.animationHasResetOnToggle) {
                this._SafeStr_2170.resetAnimationFrameCounter();
            }
            this.updateShadow(_loc11_, _loc42_);
            _loc9_ = this.updateObject(_loc41_, param1, param3, true);
            this.updateActions(this._SafeStr_2170);
            if (this._SafeStr_2362) {
                _loc5_ = this._SafeStr_5774;
                for (_loc25_ of valuesOf(this._SafeStr_2362)) {
                    _loc40_ = this.getSprite(_loc5_++);
                    _loc25_.update(_loc40_, _loc11_);
                    _loc40_.skipMouseHandling = this._SafeStr_14742;
                }
            }
            this._SafeStr_2292 = _loc11_ | 0;
        } else {
            _loc9_ = this.updateObject(_loc41_, param1, param3);
        }
        if (_loc15_ && this._SafeStr_2362) {
            _loc5_ = this._SafeStr_5774;
            for (_loc25_ of valuesOf(this._SafeStr_2362)) {
                if (_loc25_.animate(this.getSprite(_loc5_++))) {
                    this.increaseUpdateId();
                }
            }
            if (this.removeEmptyStackedAdditions()) {
                this.increaseUpdateId();
            }
        }
        let _loc44_: boolean = _loc9_ || _loc33_ || _loc20_;
        let _loc30_: boolean = (this._SafeStr_2729 || this._forcedAnimFrames > 0) && param3 && _loc15_;
        if (_loc44_) {
            this._forcedAnimFrames = 2;
        }
        if (_loc44_ || _loc30_) {
            this.increaseUpdateId();
            if (_loc15_) {
                this._forcedAnimFrames = this._forcedAnimFrames - 1;
                this._updatesUntilFrameUpdate = this._updatesUntilFrameUpdate - 1;
            }
            if (!(this._updatesUntilFrameUpdate <= 0 || _loc20_ || _loc33_ || _loc7_)) {
                if (_loc23_) {
                    this.updateWiredHighlightSprites();
                }
                return;
            }
            this._SafeStr_2170.updateAnimationByFrames(1);
            this._updatesUntilFrameUpdate = 2;
            _loc18_ = this._SafeStr_2170.getCanvasOffsets();
            if (_loc18_ == null || _loc18_.length < 3) {
                _loc18_ = AvatarVisualization.DEFAULT_CANVAS_OFFSETS;
            }
            _loc22_ = this.getSprite(0);
            if (_loc22_ != null) {
                _loc27_ = this._SafeStr_2170.getImageWithCroppedTop("full", !!(this._SafeStr_5226 || this._SafeStr_5037));
                if (_loc27_ != null) {
                    if (this._SafeStr_5226) {
                        _loc37_ = new GlowFilter(16777215, 1, 6, 6);
                        _loc27_.applyFilter(_loc27_, _loc27_.rect, new Point(0, 0), _loc37_);
                    } else if (this._SafeStr_5037) {
                        for (_loc37_ of AvatarVisualization.VARIABLE_HOLDER_FILTER ?? []) {
                            _loc27_.applyFilter(_loc27_, _loc27_.rect, new Point(0, 0), _loc37_);
                        }
                    }
                    _loc22_.asset = _loc27_;
                }
                if (_loc22_.asset) {
                    _loc22_.offsetX = -1 * _loc11_ / 2 + _loc18_[0] - (_loc22_.asset.width - _loc11_) / 2 | 0;
                    _loc22_.offsetY = -_loc22_.asset.height + _loc11_ / 4 + _loc18_[1] + this._geometryOffset | 0;
                    if (this._posture == "swdieback" || this._posture == "swdiefront") {
                        _loc22_.offsetY += 20 * _loc11_ / 32;
                    }
                }
                if (this._SafeStr_3642) {
                    if (this._layInside) {
                        _loc22_.relativeDepth = -0.5;
                    } else {
                        _loc22_.relativeDepth = Number(-0.409 + _loc18_[2]);
                    }
                } else {
                    _loc22_.relativeDepth = Number(-0.01 + _loc18_[2]);
                }
                if (this._SafeStr_5646) {
                    _loc22_.relativeDepth -= 0.001;
                    _loc22_.spriteType = RoomObjectSpriteType._SafeStr_7153;
                } else {
                    _loc22_.spriteType = RoomObjectSpriteType.AVATAR;
                }
                _loc22_.alpha = (this._SafeStr_2170.isPlaceholder() || this._SafeStr_2170.isBlocked() ? 150 : 255) * this._alphaMultiplier * this._SafeStr_14741 | 0;
                _loc22_.skipMouseHandling = this._SafeStr_14742;
            }
            _loc25_ = asInstanceOf(this.getAddition(2), TypingBubble);
            if (_loc25_) {
                if (!this._SafeStr_3642) {
                    castTo(_loc25_, TypingBubble).relativeDepth = Number(-0.01 - 0.01 + _loc18_[2]);
                } else {
                    castTo(_loc25_, TypingBubble).relativeDepth = Number(-0.409 - 0.01 + _loc18_[2]);
                }
            }
            this._SafeStr_2729 = this._SafeStr_2170.isAnimating();
            _loc34_ = 2;
            _loc28_ = this._SafeStr_2170.getDirection();
            for (const _loc14_ of this._SafeStr_2170.getSprites() ?? []) {
                if (_loc14_.id == "avatar") {
                    _loc22_ = this.getSprite(0);
                    _loc29_ = this._SafeStr_2170.getLayerData(_loc14_);
                    _loc13_ = _loc14_.getDirectionOffsetX(_loc28_);
                    _loc12_ = _loc14_.getDirectionOffsetY(_loc28_);
                    if (_loc29_ != null) {
                        _loc13_ += _loc29_.dx;
                        _loc12_ += _loc29_.dy;
                    }
                    if (_loc11_ < 48) {
                        _loc13_ = _loc13_ / 2 | 0;
                        _loc12_ = _loc12_ / 2 | 0;
                    }
                    if (!this._SafeStr_3451) {
                        _loc22_.offsetX += _loc13_;
                        _loc22_.offsetY += _loc12_;
                    }
                } else {
                    _loc22_ = this.getSprite(_loc34_++);
                    if (_loc22_ != null) {
                        _loc22_.alphaTolerance = 256;
                        _loc22_.alpha = 255 * this._alphaMultiplier * this._SafeStr_14741 | 0;
                        _loc22_.visible = true;
                        _loc16_ = this._SafeStr_2170.getLayerData(_loc14_);
                        _loc46_ = 0;
                        _loc17_ = _loc14_.getDirectionOffsetX(_loc28_);
                        _loc19_ = _loc14_.getDirectionOffsetY(_loc28_);
                        _loc21_ = _loc14_.getDirectionOffsetZ(_loc28_);
                        _loc26_ = 0;
                        if (_loc14_.hasDirections) {
                            _loc26_ = _loc28_;
                        }
                        if (_loc16_ != null) {
                            _loc46_ = _loc16_.animationFrame;
                            _loc17_ += _loc16_.dx;
                            _loc19_ += _loc16_.dy;
                            _loc26_ += _loc16_.directionOffset;
                        }
                        if (_loc11_ < 48) {
                            _loc17_ = _loc17_ / 2 | 0;
                            _loc19_ = _loc19_ / 2 | 0;
                        }
                        if (_loc26_ < 0) {
                            _loc26_ += 8;
                        } else if (_loc26_ > 7) {
                            _loc26_ -= 8;
                        }
                        _loc31_ = this._SafeStr_2170.getScale() + "_" + _loc14_.member + "_" + _loc26_ + "_" + _loc46_;
                        _loc6_ = this._SafeStr_2170.getAsset(_loc31_);
                        _loc32_ = this._SafeStr_2170.getScale() == "sh" ? 32 : 64;
                        _loc8_ = false;
                        if (_loc6_ == null) {
                            if (this._SafeStr_2170.getScale() == "sh") {
                                _loc31_ = "h_" + _loc14_.member + "_" + _loc26_ + "_" + _loc46_;
                                _loc6_ = this._SafeStr_2170.getAsset(_loc31_);
                                _loc8_ = true;
                            }
                            if (_loc6_ == null) {
                                _loc22_.asset = null;
                                _loc22_.visible = false;
                                continue;
                            }
                        }
                        _loc22_.asset = _loc8_ ? BitmapHelper.resampleBitmapData(asInstanceOf(_loc6_.content, BitmapData), 0.5) : asInstanceOf(_loc6_.content, BitmapData);
                        _loc39_ = (_loc8_ ? _loc6_.offset.x / 2 : Number(_loc6_.offset.x)) | 0;
                        _loc38_ = (_loc8_ ? _loc6_.offset.y / 2 : Number(_loc6_.offset.y)) | 0;
                        _loc22_.offsetX = -_loc39_ - _loc32_ / 2 + _loc17_ | 0;
                        _loc22_.offsetY = -_loc38_ + _loc19_;
                        if (_loc14_.hasStaticY) {
                            _loc22_.offsetY += this._baseY * _loc11_ / (2 * 1000);
                        } else {
                            _loc22_.offsetY += this._geometryOffset;
                        }
                        if (this._SafeStr_3642) {
                            _loc22_.relativeDepth = -0.409 - 0.001 * this.spriteCount * _loc21_;
                        } else {
                            _loc22_.relativeDepth = -0.01 - 0.001 * this.spriteCount * _loc21_;
                        }
                        if (_loc14_.ink == 33) {
                            _loc22_.blendMode = "add";
                        } else {
                            _loc22_.blendMode = "normal";
                        }
                    }
                }
            }
            this.updateWiredHighlightSprites();
        } else if (_loc23_) {
            this.updateWiredHighlightSprites();
            this.increaseUpdateId();
        }
    }

    private updateActions(param1: IAvatarImage): void {
        let _loc3_: string = null;
        let _loc5_: IRoomObjectSprite = null;
        if (param1 == null) {
            return;
        }
        param1.initActionAppends();
        param1.appendAction("posture", this._posture, this._SafeStr_5030);
        if (this._gesture > 0) {
            param1.appendAction("gest", AvatarAction.getGesture(this._gesture));
        }
        if (this._danceStyle > 0) {
            param1.appendAction("dance", this._danceStyle);
        }
        if (this._signType > -1) {
            param1.appendAction("sign", this._signType);
        }
        if (this._SafeStr_3701 > 0) {
            param1.appendAction("cri", this._SafeStr_3701);
        }
        if (this._SafeStr_2981 > 0) {
            param1.appendAction("usei", this._SafeStr_2981);
        }
        if (this._SafeStr_5527) {
            param1.appendAction("talk");
        }
        if (this._isSleeping || this._SafeStr_4442) {
            param1.appendAction("Sleep");
        }
        if (this._expressionType > 0) {
            _loc3_ = AvatarAction.getExpression(this._expressionType);
            if (_loc3_ != "") {
                switch (_loc3_) {
                    case "dance":
                        param1.appendAction("dance", 2);
                        break;
                    case "67":
                        param1.appendAction("dance", "sixseven");
                        break;
                    default:
                        param1.appendAction(_loc3_);
                }
            }
        }
        if (this._effectType > 0) {
            param1.appendAction("fx", this._effectType);
        }
        param1.endActionAppends();
        this._SafeStr_2729 = param1.isAnimating();
        let _loc2_: number = 2;
        for (const _loc4_ of this._SafeStr_2170.getSprites() ?? []) {
            if (_loc4_.id != "avatar") {
                _loc2_++;
            }
        }
        if (_loc2_ != this.spriteCount) {
            this.createSprites(_loc2_);
        }
        this._SafeStr_5774 = _loc2_;
        if (this._SafeStr_2362) {
            for (const _loc6_ of valuesOf(this._SafeStr_2362)) {
                _loc5_ = this.addSprite();
            }
        }
    }

    public avatarImageReady(param1: string): void {
        this._forceUpdate = true;
    }

    public avatarEffectReady(param1: number): void {
        this._forceUpdate = true;
    }

    protected get numAdditions(): number {
        return (this._SafeStr_2362 ? this._SafeStr_2362.length : 0) | 0;
    }

    public addAddition(param1: IAvatarAddition): IAvatarAddition {
        if (!this._SafeStr_2362) {
            this._SafeStr_2362 = new UtilsMap();
        }
        if (this._SafeStr_2362.hasKey(param1.id)) {
            throw new Error("Avatar addition with index " + param1.id + "already exists!");
        }
        this._SafeStr_2362.add(param1.id, param1);
        return param1;
    }

    public getAddition(param1: number): IAvatarAddition {
        return this._SafeStr_2362 ? this._SafeStr_2362[param1] : null;
    }

    public removeAddition(param1: number): void {
        let _loc2_: IAvatarAddition = this.getAddition(param1);
        if (!_loc2_) {
            return;
        }
        this._SafeStr_2362.remove(param1);
        _loc2_.dispose();
    }

    private getStackedAdditions(param1: boolean): StackedAdditions {
        let _loc2_: StackedAdditions = asInstanceOf(this.getAddition(9), StackedAdditions);
        if (_loc2_ == null && param1) {
            _loc2_ = asInstanceOf(this.addAddition(new StackedAdditions(9, this)), StackedAdditions);
        }
        return _loc2_;
    }

    private removeEmptyStackedAdditions(): boolean {
        let _loc1_: StackedAdditions = this.getStackedAdditions(false);
        if (_loc1_ == null || !_loc1_.isEmpty) {
            return false;
        }
        this.removeAddition(9);
        this._forceUpdate = true;
        return true;
    }

    private updateWiredHighlight(param1: IRoomObjectModel): boolean {
        let _loc5_: number = param1.getNumber("furniture_wired_highlight_type");
        let _loc6_: number = isNaN(_loc5_) ? 0 : _loc5_ | 0;
        let _loc3_: number = _SafeCls_6138.quantizeStrength(param1.getNumber("furniture_wired_highlight_strength"));
        let _loc4_: number = param1.getNumber("furniture_wired_highlight_color");
        let _loc2_: number = isNaN(_loc4_) ? 16777215 : (_loc4_ | 0) & 0xFFFFFF;
        if (_loc6_ == this._SafeStr_14743 && _loc3_ == this._wiredHighlightStrength && _loc2_ == this._wiredHighlightColor) {
            return false;
        }
        if (_loc6_ != this._SafeStr_14743 || _loc2_ != this._wiredHighlightColor) {
            this._wiredHighlightFilterCache = {};
        }
        this._SafeStr_14743 = _loc6_;
        this._wiredHighlightStrength = _loc3_;
        this._wiredHighlightColor = _loc2_;
        this._wiredHighlightFilters = this.getCachedWiredHighlightFilters();
        return true;
    }

    private getCachedWiredHighlightFilters(): any[] {
        if (this._wiredHighlightStrength == 0) {
            return null;
        }
        let _loc1_: string = String(this._wiredHighlightStrength);
        let _loc2_: any[] = asGuarded(this._wiredHighlightFilterCache[_loc1_], Array.isArray);
        if (_loc2_ == null) {
            _loc2_ = _SafeCls_6138.create(this._SafeStr_14743, this._wiredHighlightColor, this._wiredHighlightStrength);
            this._wiredHighlightFilterCache[_loc1_] = _loc2_;
        }
        return _loc2_;
    }

    private updateWiredHighlightSprites(): void {
        let _loc4_: number = 0;
        let _loc3_: IRoomObjectSprite = null;
        let _loc2_: boolean = _SafeCls_6138.usesCompositeSilhouette(this._SafeStr_14743);
        let _loc1_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_5774) {
            if (_loc4_ != 1) {
                _loc3_ = this.getSprite(_loc4_);
                if (_loc3_ != null) {
                    _loc3_.filters = _loc2_ || _loc3_.blendMode == "add" ? null : this._wiredHighlightFilters;
                    if (_loc3_.visible && _loc3_.asset != null && _loc3_.alpha > 0 && _loc3_.blendMode != "add") {
                        _loc1_.push(_loc3_);
                    }
                }
            }
            _loc4_++;
        }
        if (!_loc2_) {
            this._SafeStr_14744.clear(true);
            return;
        }
        let _loc5_: IRoomObjectSprite = this.getSprite(0);
        this._SafeStr_14744.update(_loc1_, this._wiredHighlightFilters, _loc5_?.alpha, this.object.getType(), this._angle, false, true);
    }

    public get additionalSpriteCount(): number {
        return this._SafeStr_14744 == null ? 0 : 1;
    }

    public getAdditionalSprite(param1: number): IRoomObjectSprite {
        return param1 == 0 && this._SafeStr_14744 != null ? this._SafeStr_14744.sprite : null;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IRoomObjectAdditionalSpriteProvider](): true {
        return true;
    }
}
