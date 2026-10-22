import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { ChatBubbleCollisionEvent } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatBubbleCollisionEvent';
import { ChatBubbleSimulationEntity } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatBubbleSimulationEntity';
import { ChatBubbleSimulationWithLimitedWideRect } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatBubbleSimulationWithLimitedWideRect';
import { ChatFlowGravity } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatFlowGravity';

export class ChatFlowStage implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.simulation::ChatFlowStage'); }

    public static readonly MOVE_UP_AMOUNT_PIXELS: number = 19;
    private static readonly CLEANUP_TIMER_DELAY: number = 5000;
    private static readonly MOVE_UP_TIMER_DEFAULT: number = 10000;
    private static readonly MAX_ITERATIONS: number = 20;
    private static readonly MAX_COLLISION_SIDEWAYS_IMPULSE: number = 15;
    private static readonly MOVE_UP_IMPULSE_LIMIT: number = 8;
    private readonly MINIMUM_COLLIDER_WIDTH: number = 240;

    declare private _component: HabboFreeFlowChat;

    private _simulationTime: number = 0;
    private _SafeStr_5103: number = 0;
    private _SafeStr_6592: number = 0;
    private _SafeStr_4151: ChatFlowGravity = new ChatFlowGravity();
    private _bubbles: ChatBubbleSimulationEntity[] = new Array<ChatBubbleSimulationEntity>(0).fill(null);
    private _toRemove: ChatBubbleSimulationEntity[] = new Array<ChatBubbleSimulationEntity>(0).fill(null);
    private _lineByLineMode: boolean = false;
    private _SafeStr_4101: number = 10000;
    private _SafeStr_5699: boolean = true;
    private _SafeStr_7698: boolean = false;
    private _SafeStr_3397: number = 0;

    constructor(param1: HabboFreeFlowChat) {
        this._component = param1;
        this._component.registerUpdateReceiver(this, 2);
        this.refreshSettings();
    }

    public refreshSettings(): void {
        if (this._component.roomChatSettings) {
            this._lineByLineMode = this._component.roomChatSettings.mode == 1;
            this._SafeStr_5699 = !this._lineByLineMode;
            switch (this._component.roomChatSettings.scrollSpeed) {
                case 0:
                    this._SafeStr_4101 = 3000;
                    break;
                case 1:
                    this._SafeStr_4101 = 6000;
                    break;
                case 2:
                    this._SafeStr_4101 = 12000;
            }
        }
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._component) {
                this._component.removeUpdateReceiver(this);
                this._component = null;
            }
        }
    }

    public get disposed(): boolean {
        return this._component == null;
    }

    public insertBubble(param1: PooledChatBubble): Point {
        let _loc7_: any;
        let _loc11_: ChatBubbleSimulationEntity = null;
        let _loc6_: number = 0;
        let _loc3_: number = NaN;
        let _loc5_: number = NaN;
        let _loc8_: number = NaN;
        let _loc2_: ChatBubbleSimulationWithLimitedWideRect = null;
        let _loc10_: number = 0;
        if (this._SafeStr_3397 == 0) {
            this._SafeStr_3397 = this._component.chatFlowViewer.viewBottom;
        }
        let _loc4_: Point = this._component.roomEngine.getRoomCanvasScreenOffset(param1.roomId);
        param1.roomPanOffsetX = (_loc4_ != null ? _loc4_.x : 0) | 0;
        if (!this._lineByLineMode && param1.width < 240) {
            _loc11_ = new ChatBubbleSimulationWithLimitedWideRect(param1);
        } else {
            _loc11_ = new ChatBubbleSimulationEntity(param1, this._lineByLineMode);
        }
        let _loc9_: Point = new Point(param1.userScreenPos.x - _loc11_.visualRect.width / 2, this._component.chatFlowViewer.viewBottom);
        if (_loc4_ != null) {
            _loc9_.x -= _loc4_.x;
        }
        _loc9_.y -= param1.overlap ? param1.overlap.y : 0;
        _loc9_.x -= param1.overlap ? param1.overlap.x : 0;
        _loc11_.initializePosition(_loc9_.x, _loc9_.y);
        if (this._SafeStr_5699 && !this._lineByLineMode) {
            _loc6_ = 0;
            while (_loc6_ < 20 / 2) {
                _loc3_ = 0;
                for (_loc7_ of this._bubbles ?? []) {
                    _loc3_ += this._SafeStr_4151.getAttraction(_loc11_, _loc7_, 60, 40);
                }
                _loc11_.x += _loc3_;
                _loc6_++;
            }
            _loc5_ = _loc11_.x;
            _loc10_ = param1.userScreenPos.x - (_loc4_ != null ? _loc4_.x : 0) | 0;
            if (_loc11_.x > _loc10_ - 15) {
                _loc5_ = _loc10_ - 15;
                if (_loc11_.hasWideRect) {
                    _loc2_ = castTo(_loc11_, ChatBubbleSimulationWithLimitedWideRect);
                    _loc8_ = _loc11_.x - _loc5_;
                    _loc2_.wideRectOffset += _loc8_;
                    _loc2_.wideRectOffset = Math.min(0, _loc2_.wideRectOffset);
                }
            } else if (_loc11_.x + _loc11_.visualRect.width < _loc10_ + 15) {
                _loc5_ = _loc10_ - _loc11_.visualRect.width + 15;
                if (_loc11_.hasWideRect) {
                    _loc2_ = castTo(_loc11_, ChatBubbleSimulationWithLimitedWideRect);
                    _loc8_ = _loc11_.x - _loc5_;
                    _loc2_.wideRectOffset += _loc8_;
                    _loc2_.wideRectOffset = Math.max(-(_loc2_.wideRect.width - _loc2_.visualRect.width), _loc2_.wideRectOffset);
                }
            }
            _loc11_.x = _loc9_.x = _loc5_;
        }
        this._bubbles.push(_loc11_);
        _loc9_.x -= param1.overlap ? param1.overlap.x : 0;
        if (this._lineByLineMode) {
            this._SafeStr_5103 = this._simulationTime;
        }
        return _loc9_;
    }

    public update(param1: number): void {
        let _loc4_: number = 0;
        let _loc3_: ChatBubbleSimulationEntity = null;
        this._simulationTime += param1;
        for (const _loc2_ of this._bubbles ?? []) {
            if (!_loc2_.isSpacer) {
                _loc2_.syncToUserScreenPosition();
            }
        }
        this.simulate();
        if (this._SafeStr_5103 + this._SafeStr_4101 < this._simulationTime) {
            this.scrollUp();
            this._SafeStr_5103 = this._simulationTime;
        }
        _loc4_ = 0;
        while (_loc4_ < this._bubbles.length) {
            _loc3_ = this._bubbles[_loc4_];
            _loc3_.syncToVisualization();
            if (!_loc3_.isSpacer) {
                _loc3_.fullHeightCollision = false;
                if (_loc4_ > 0 && _loc3_.visualizationHasHitMargin) {
                    _loc3_.fullHeightCollision = true;
                    this._bubbles[_loc4_ - 1].fullHeightCollision = true;
                }
            }
            _loc4_++;
        }
        if (this._SafeStr_6592 + 5000 < this._simulationTime) {
            this.cleanup();
            this._SafeStr_6592 = this._simulationTime;
        }
    }

    public clear(): void {
        for (const _loc1_ of this._bubbles ?? []) {
            _loc1_.readyToRecycle = true;
        }
        this.update(0);
        this._component.chatFlowViewer.update(0);
    }

    private simulate(): void {
        let _loc7_: any = undefined;
        let _loc2_: any = null;
        let _loc5_: any = null;
        let _loc11_: any = null;
        let _loc4_: any = null;
        let _loc9_: number = 0;
        let _loc6_: number = 0;
        let _loc1_: number = NaN;
        let _loc10_: number = NaN;
        let _loc3_: number = NaN;
        let _loc8_: number = NaN;
        _loc9_ = 0;
        while (_loc9_ < 20) {
            _loc7_ = new Array<ChatBubbleCollisionEvent>(0).fill(null);
            for (_loc11_ of this._bubbles ?? []) {
                _loc11_.resetSimulationStep();
                for (_loc4_ of this._bubbles ?? []) {
                    if (_loc11_ != _loc4_ && _loc11_.intersectsWith(_loc4_)) {
                        _loc7_.push(new ChatBubbleCollisionEvent(_loc11_, _loc4_));
                    }
                }
            }
            if (_loc7_.length == 0) {
                break;
            }
            if (this._lineByLineMode) {
                for (_loc2_ of valuesOf(_loc7_)) {
                    if (!_loc2_.first.hasCollidedWith(_loc2_.second) && !_loc2_.second.hasCollidedWith(_loc2_.first)) {
                        if (_loc2_.areSameY) {
                            _loc2_.older.addVerticalImpulse(-_loc2_.older.wideRect.height);
                        } else {
                            _loc6_ = Number(_loc2_.first.visualIntertersectsWith(_loc2_.second) ? _loc2_.top.visualRect.bottom : Number(_loc2_.top.wideRect.bottom)) | 0;
                            _loc2_.top.addVerticalImpulse(-(_loc6_ - _loc2_.bottom.y + 1));
                        }
                    }
                    _loc2_.first.addCollisionHandled(_loc2_.second);
                    _loc2_.second.addCollisionHandled(_loc2_.first);
                }
            } else {
                for (_loc2_ of valuesOf(_loc7_)) {
                    if (!_loc2_.first.hasCollidedWith(_loc2_.second) && !_loc2_.second.hasCollidedWith(_loc2_.first)) {
                        _loc1_ = Number(_loc2_.left instanceof ChatBubbleSimulationWithLimitedWideRect ? castTo(_loc2_.left, ChatBubbleSimulationWithLimitedWideRect).wideRectOffset + _loc2_.left.x : _loc2_.left.x);
                        _loc10_ = Number(_loc2_.right instanceof ChatBubbleSimulationWithLimitedWideRect ? castTo(_loc2_.right, ChatBubbleSimulationWithLimitedWideRect).wideRectOffset + _loc2_.right.x : _loc2_.right.x);
                        _loc3_ = Number(_loc2_.left instanceof ChatBubbleSimulationWithLimitedWideRect ? _loc2_.left.wideRect.width : Number(_loc2_.left.visualRect.width));
                        _loc8_ = Math.abs(_loc1_ + _loc3_ - _loc10_) / 2;
                        if (_loc8_ <= 15) {
                            _loc2_.left.addHorizontalImpulse(-_loc8_);
                            _loc2_.right.addHorizontalImpulse(_loc8_ + 1);
                        } else if (_loc2_.areSameY) {
                            _loc2_.older.addVerticalImpulse(-_loc2_.older.visualRect.height);
                        } else {
                            _loc2_.top.addVerticalImpulse(-(_loc2_.top.visualRect.bottom - _loc2_.bottom.y + 1));
                        }
                        _loc2_.first.addCollisionHandled(_loc2_.second);
                        _loc2_.second.addCollisionHandled(_loc2_.first);
                    }
                }
            }
            for (_loc5_ of this._bubbles ?? []) {
                _loc5_.applyImpulseForces(8);
            }
            _loc9_++;
        }
    }

    private scrollUp(): void {
        let _loc2_: any;
        if (this._component.chatFlowViewer == null) {
            return;
        }
        for (const _loc1_ of this._bubbles ?? []) {
            if (this._SafeStr_5699) {
                for (_loc2_ of this._bubbles ?? []) {
                    if (_loc1_ != _loc2_) {
                        _loc1_.x += this._SafeStr_4151.getAttraction(_loc1_, _loc2_);
                    }
                }
            }
            _loc1_.y -= 19;
        }
        if (this._lineByLineMode) {
            this.insertBubble(this._component.chatBubbleFactory.getNewEmptySpace(19));
            this._bubbles[this._bubbles.length - 1].fullHeightCollision = true;
            this._bubbles[this._bubbles.length - 1].isSpacer = true;
        }
        this.simulate();
    }

    private cleanup(): void {
        let _loc3_: number = 0;
        for (const _loc1_ of this._bubbles ?? []) {
            if (_loc1_.visualRect.bottom < -10 || _loc1_.readyToRecycle) {
                _loc1_.readyToRecycle = true;
                if (this._toRemove.indexOf(_loc1_) == -1) {
                    this._toRemove.push(_loc1_);
                }
            }
        }
        if (this._toRemove.length > 0) {
            for (const _loc2_ of this._toRemove ?? []) {
                _loc3_ = this._bubbles.indexOf(_loc2_);
                _loc2_.dispose();
                this._bubbles.splice(_loc3_, 1);
            }
            this._toRemove = new Array<ChatBubbleSimulationEntity>(0).fill(null);
        }
    }

    public resize(param1: number, param2: number): void {
        let _loc3_: any = null;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        if (!this._component) {
            return;
        }
        if (!this._component.chatFlowViewer) {
            return;
        }
        let _loc5_: number = this._component.chatFlowViewer.viewBottom;
        if (this._SafeStr_3397 != _loc5_) {
            if (this._SafeStr_3397 < _loc5_) {
                _loc4_ = _loc5_ - this._SafeStr_3397;
                for (_loc3_ of this._bubbles ?? []) {
                    _loc3_.y += _loc4_;
                    _loc3_.syncToVisualization(true);
                }
            } else {
                _loc6_ = this._SafeStr_3397 - _loc5_;
                for (_loc3_ of this._bubbles ?? []) {
                    _loc3_.y -= _loc6_;
                    _loc3_.syncToVisualization(true);
                }
            }
        }
        this._SafeStr_3397 = _loc5_;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
