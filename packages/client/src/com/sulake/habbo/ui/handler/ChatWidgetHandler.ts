import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { RoomChatWidget } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatWidget';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { GameChatEvent } from '@/com/sulake/habbo/game/events/GameChatEvent';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetChatUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChatUpdateEvent';
import { RoomWidgetRoomViewUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomViewUpdateEvent';
import { PointMath } from '@/com/sulake/room/utils/PointMath';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ChatWidgetHandler implements IRoomWidgetHandler, IAvatarImageListener, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::ChatWidgetHandler'); }

    constructor() {
        this._avatarImageCache = new UtilsMap();
        this._petImageCache = new UtilsMap();
        this._avatarColorCache = new UtilsMap();
        this._petImageIdToFigureString = new UtilsMap();
    }

    private _disposed: boolean = false;
    private _avatarImageCache: UtilsMap = null;
    private _petImageCache: UtilsMap = null;
    private _avatarColorCache: UtilsMap = null;
    private _petImageIdToFigureString: UtilsMap = null;
    private _SafeStr_3504: any[] = [];
    private _connection: IConnection = null;
    private _SafeStr_4175: number = 0;
    private _SafeStr_3221: Point = null;
    private _SafeStr_3205: Vector3d = new Vector3d();

    declare private _widget: RoomChatWidget;

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set widget(param1: RoomChatWidget) {
        this._widget = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_CHAT_WIDGET";
    }

    public set connection(param1: IConnection) {
        this._connection = param1;
    }

    public dispose(): void {
        let _loc3_: number = 0;
        let _loc1_: BitmapData = null;
        this._disposed = true;
        this._container = null;
        this._SafeStr_3221 = null;
        if (this._avatarImageCache != null) {
            _loc3_ = 0;
            while (_loc3_ < this._avatarImageCache.length) {
                _loc1_ = asInstanceOf(this._avatarImageCache.getWithIndex(_loc3_), BitmapData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc3_++;
            }
            this._avatarImageCache.dispose();
            this._avatarImageCache = null;
        }
        if (this._petImageCache != null) {
            _loc3_ = 0;
            while (_loc3_ < this._petImageCache.length) {
                _loc1_ = asInstanceOf(this._petImageCache.getWithIndex(_loc3_), BitmapData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc3_++;
            }
            this._petImageCache.dispose();
            this._petImageCache = null;
        }
        for (const _loc2_ of this._SafeStr_3504 ?? []) {
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
        }
        this._SafeStr_3504 = [];
        if (this._avatarColorCache != null) {
            this._avatarColorCache.dispose();
            this._avatarColorCache = null;
        }
    }

    public getWidgetMessages(): any[] {
        return new Array(0);
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        param1.type;
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RSCE_CHAT_EVENT", "gce_game_chat"];
    }

    public getUserImage(param1: string): BitmapData {
        let _loc4_: IAvatarImage = null;
        let _loc3_: IPartColor = null;
        let _loc2_: BitmapData = asInstanceOf(this._avatarImageCache.getValue(param1), BitmapData);
        if (_loc2_ == null) {
            _loc4_ = this._container.avatarRenderManager.createAvatarImage(param1, "h", null, this);
            if (_loc4_ != null) {
                _loc2_ = _loc4_.getCroppedImage("head", 0.5);
                _loc3_ = _loc4_.getPartColor("ch");
                _loc4_.dispose();
                if (_loc3_ != null) {
                    this._avatarColorCache.add(param1, _loc3_.rgb);
                }
            }
        }
        if (_loc2_ != null) {
            this._avatarImageCache.add(param1, _loc2_);
        }
        return _loc2_;
    }

    public update(): void {
        this.updateWidgetPosition();
    }

    public petImageReady(param1: string): void {
        let _loc2_: BitmapData = null;
        if (this._petImageCache) {
            _loc2_ = asInstanceOf(this._petImageCache.remove(param1), BitmapData);
            if (_loc2_ != null) {
                this._SafeStr_3504.push(_loc2_);
            }
        }
    }

    public avatarImageReady(param1: string): void {
        let _loc2_: BitmapData = null;
        if (this._avatarImageCache) {
            _loc2_ = asInstanceOf(this._avatarImageCache.remove(param1), BitmapData);
            if (_loc2_ != null) {
                this._SafeStr_3504.push(_loc2_);
            }
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc3_: string = stringOrNull(this._petImageIdToFigureString.remove(param1));
        if (_loc3_ != null) {
            this.petImageReady(_loc3_);
            if (this._petImageCache) {
                this._petImageCache.add(_loc3_, param2);
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    private getRoomUserObject(param1: number): IRoomObject {
        return this.container.roomEngine.getRoomObject(this.container.roomEngine.activeRoomId, param1, 100);
    }

    private updateWidgetPosition(): void {
        let _loc3_: number = NaN;
        let _loc7_: string = null;
        let _loc8_: RoomWidgetRoomViewUpdateEvent = null;
        let _loc1_: Point = null;
        let _loc4_: Point = null;
        let _loc5_: Point = null;
        if (this._container == null || this._container.roomSession == null || this._container.roomEngine == null || this._container.events == null) {
            return;
        }
        let _loc2_: number = this._container.getFirstCanvasId();
        let _loc9_: number = this._container.roomSession.roomId;
        let _loc6_: RoomGeometry = asInstanceOf(this._container.roomEngine.getRoomCanvasGeometry(_loc9_, _loc2_), RoomGeometry);
        if (_loc6_ != null) {
            _loc3_ = 1;
            if (this._SafeStr_4175 > 0) {
                _loc3_ = _loc6_.scale / this._SafeStr_4175;
            }
            if (this._SafeStr_3221 == null) {
                this._SafeStr_3205.x = 0;
                this._SafeStr_3205.y = 0;
                this._SafeStr_3205.z = 0;
                this._SafeStr_3221 = _loc6_.getScreenPoint(this._SafeStr_3205);
                this._SafeStr_4175 = _loc6_.scale - 10;
            }
            _loc7_ = "";
            _loc8_ = null;
            this._SafeStr_3205.x = 0;
            this._SafeStr_3205.y = 0;
            this._SafeStr_3205.z = 0;
            _loc1_ = _loc6_.getScreenPoint(this._SafeStr_3205);
            if (_loc1_ != null) {
                _loc4_ = this._container.roomEngine.getRoomCanvasScreenOffset(_loc9_, _loc2_);
                if (_loc4_ != null) {
                    _loc1_.offset(_loc4_.x, _loc4_.y);
                }
                if (_loc1_.x != this._SafeStr_3221.x || _loc1_.y != this._SafeStr_3221.y) {
                    _loc5_ = PointMath.sub(_loc1_, PointMath.mul(this._SafeStr_3221, _loc3_));
                    if (_loc5_.x != 0 || _loc5_.y != 0) {
                        _loc7_ = "RWRVUE_ROOM_VIEW_POSITION_CHANGED";
                        _loc8_ = new RoomWidgetRoomViewUpdateEvent(_loc7_, null, _loc5_);
                        this._container.events.dispatchEvent(_loc8_);
                    }
                    this._SafeStr_3221 = _loc1_;
                }
            }
            if (_loc6_.scale != this._SafeStr_4175) {
                _loc7_ = "RWRVUE_ROOM_VIEW_SCALE_CHANGED";
                _loc8_ = new RoomWidgetRoomViewUpdateEvent(_loc7_, null, null, _loc6_.scale);
                this._container.events.dispatchEvent(_loc8_);
                this._SafeStr_4175 = _loc6_.scale;
            }
        }
    }

    private getPetImage(param1: string, param2: number, param3: boolean, param4: number = 64, param5: string = null): BitmapData {
        let _loc6_: PetFigureData = null;
        let _loc8_: number = 0;
        let _loc7_: any = 0;
        let _loc11_: any = false;
        let _loc9_: ImageResult = null;
        let _loc10_: BitmapData = asInstanceOf(this._petImageCache.getValue(param1 + param5), BitmapData);
        if (_loc10_ == null) {
            _loc6_ = new PetFigureData(param1);
            _loc8_ = _loc6_.typeId;
            _loc7_ = 0;
            _loc11_ = _loc8_ != 15;
            _loc9_ = this._container.roomEngine.getPetImage(_loc8_, _loc6_.paletteId, _loc6_.color, new Vector3d(param2 * 45), param4, this, _loc11_, _loc7_ >>> 0, _loc6_.customParts, param5);
            if (_loc9_ != null) {
                _loc10_ = _loc9_.data;
                if (_loc9_.id > 0) {
                    this._petImageIdToFigureString.add(_loc9_.id, _loc6_.figureString);
                }
            }
        }
        if (_loc10_ != null) {
            this._petImageCache.add(param1 + param5, _loc10_);
        }
        return _loc10_;
    }

    public processEvent(param1: Event): void {
        let _loc2_: RoomSessionChatEvent = null;
        let _loc20_: IRoomObject = null;
        let _loc34_: IRoomGeometry = null;
        let _loc32_: number = NaN;
        let _loc33_: number = NaN;
        let _loc3_: IVector3d = null;
        let _loc13_: Point = null;
        let _loc6_: Point = null;
        let _loc5_: IUserData = null;
        let _loc26_: string = null;
        let _loc29_: any = 0;
        let _loc11_: BitmapData = null;
        let _loc8_: number = 0;
        let _loc17_: number = 0;
        let _loc15_: boolean = false;
        let _loc21_: string = null;
        let _loc18_: number = 0;
        let _loc16_: number = 0;
        let _loc36_: number = 0;
        let _loc23_: number = 0;
        let _loc25_: string = null;
        let _loc12_: IRoomObject = null;
        let _loc14_: string = null;
        let _loc24_: string = null;
        let _loc27_: string = null;
        let _loc7_: string = null;
        let _loc10_: string = null;
        let _loc22_: string = null;
        let _loc19_: string = null;
        let _loc4_: string = null;
        let _loc28_: string = null;
        let _loc30_: IRoomObject = null;
        let _loc31_: IUserData = null;
        let _loc9_: string = null;
        if (this._container.freeFlowChat && !this._container.freeFlowChat.isDisabledInPreferences) {
            return;
        }
        let _loc35_: Event = null;
        switch (param1.type) {
            case "RSCE_CHAT_EVENT":
                _loc2_ = param1 instanceof RoomSessionChatEvent ? param1 : null;
                if (_loc2_ != null) {
                    _loc20_ = this._container.roomEngine.getRoomObject(_loc2_.session.roomId, _loc2_.userId, 100);
                    if (_loc20_ != null) {
                        _loc34_ = this._container.roomEngine.getRoomCanvasGeometry(_loc2_.session.roomId, this._container.getFirstCanvasId());
                        if (_loc34_ != null) {
                            this.updateWidgetPosition();
                            _loc32_ = 0;
                            _loc33_ = 0;
                            _loc3_ = _loc20_.getLocation();
                            _loc13_ = _loc34_.getScreenPoint(_loc3_);
                            if (_loc13_ != null) {
                                _loc32_ = _loc13_.x;
                                _loc33_ = _loc13_.y;
                                _loc6_ = this._container.roomEngine.getRoomCanvasScreenOffset(_loc2_.session.roomId, this._container.getFirstCanvasId());
                                if (_loc6_ != null) {
                                    _loc32_ += _loc6_.x;
                                    _loc33_ += _loc6_.y;
                                }
                            }
                            _loc5_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc2_.userId);
                            _loc26_ = "";
                            _loc29_ = 0;
                            _loc11_ = null;
                            _loc8_ = 32;
                            _loc17_ = 2;
                            _loc15_ = true;
                            _loc21_ = null;
                            _loc18_ = _loc2_.chatType;
                            _loc16_ = _loc2_.style;
                            _loc36_ = 0;
                            _loc23_ = -1;
                            if (_loc5_ != null) {
                                _loc36_ = _loc5_.type;
                                _loc25_ = _loc5_.figure;
                                switch (_loc36_ - 1) {
                                    case 0:
                                        _loc11_ = this.getUserImage(_loc25_);
                                        break;
                                    case 1:
                                        _loc12_ = this.getRoomUserObject(_loc5_.roomObjectId);
                                        if (_loc12_ != null) {
                                            _loc21_ = _loc12_.getModel().getString("figure_posture");
                                        }
                                        _loc11_ = this.getPetImage(_loc25_, _loc17_, _loc15_, _loc8_, _loc21_);
                                        _loc23_ = new PetFigureData(_loc25_).typeId;
                                        break;
                                    case 2:
                                    case 3:
                                        _loc16_ = 2;
                                }
                                _loc29_ = this._avatarColorCache.getValue(_loc25_);
                                _loc26_ = _loc5_.name;
                            }
                            _loc14_ = _loc2_.text;
                            if (_loc18_ == 5) {
                                _loc24_ = "widget.chatbubble.handitem";
                                _loc27_ = this._container.localization.getLocalization("handitem" + _loc2_.extraParam, "handitem" + _loc2_.extraParam);
                                this._container.localization.registerParameter(_loc24_, "username", _loc26_);
                                this._container.localization.registerParameter(_loc24_, "handitem", _loc27_);
                                _loc14_ = this._container.localization.getLocalizationRaw(_loc24_).value;
                                _loc16_ = 1;
                            }
                            if (_loc18_ == 10) {
                                _loc7_ = "widget.chatbubble.mutetime";
                                _loc10_ = String(_loc2_.extraParam % 60);
                                _loc22_ = String(_loc2_.extraParam > 0 ? Math.floor(_loc2_.extraParam % 3600 / 60) : 0);
                                _loc19_ = String(_loc2_.extraParam > 0 ? Math.floor(_loc2_.extraParam / 3600) : 0);
                                this._container.localization.registerParameter(_loc7_, "hours", _loc19_);
                                this._container.localization.registerParameter(_loc7_, "minutes", _loc22_);
                                this._container.localization.registerParameter(_loc7_, "seconds", _loc10_);
                                _loc14_ = this._container.localization.getLocalizationRaw(_loc7_).value;
                                _loc16_ = 1;
                            }
                            if (_loc18_ == 7 || _loc18_ == 8 || _loc18_ == 9) {
                                _loc4_ = "widget.chatbubble.petrevived";
                                if (_loc18_ == 8) {
                                    _loc4_ = "widget.chatbubble.petrefertilized";
                                } else if (_loc18_ == 9) {
                                    _loc4_ = "widget.chatbubble.petspeedfertilized";
                                }
                                _loc28_ = "";
                                _loc30_ = this.getRoomUserObject(_loc2_.extraParam);
                                if (_loc30_ != null) {
                                    _loc31_ = _loc2_.session.userDataManager.getUserDataByIndex(_loc30_.getId());
                                    if (_loc31_ != null) {
                                        _loc28_ = _loc31_.name;
                                    }
                                }
                                this._container.localization.registerParameter(_loc4_, "petName", _loc26_);
                                this._container.localization.registerParameter(_loc4_, "userName", _loc28_);
                                _loc14_ = this._container.localization.getLocalizationRaw(_loc4_).value;
                                _loc16_ = 1;
                            }
                            _loc9_ = "RWCUE_EVENT_CHAT";
                            _loc35_ = new RoomWidgetChatUpdateEvent(_loc9_, _loc2_.userId, _loc14_, _loc26_, 100, _loc36_, _loc23_, _loc32_, _loc33_, _loc11_, _loc29_ >>> 0, _loc2_.session.roomId, _loc18_, _loc16_, _loc2_.links);
                        }
                    }
                }
                break;
            case "gce_game_chat":
                this.gameChatEventHandler(param1 instanceof GameChatEvent ? param1 : null);
        }
        if (this._container != null && this._container.events != null && _loc35_ != null) {
            this._container.events.dispatchEvent(_loc35_);
        }
    }

    private gameChatEventHandler(param1: GameChatEvent): void {
        this._widget.addChatMessage(param1.message, param1.name, param1.locX, this.getUserImage(param1.figure), param1.color, param1.notify);
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
