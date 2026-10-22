import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { IChatHistoryEntryBitmap } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/IChatHistoryEntryBitmap';
import type { IChatStyleInternal } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/style/IChatStyleInternal';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import { ChatHistoryEntryBitmapBubble, ChatHistoryRoomChangeEntry, ChatStyle, ChatStyleLibrary } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { BlankStyle } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/BlankStyle';
import { ChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/ChatBubble';
import { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ChatBubbleFactory implements IGetImageListener, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer::ChatBubbleFactory'); }

    private static readonly MAX_DISPOSABLE_BITMAPS: number = 30;
    private static readonly SPECIAL_SYSTEM_TYPE_EXPRESSION_67: number = 67;

    declare private _component: HabboFreeFlowChat;

    declare private _chatStyleLibrary: ChatStyleLibrary;

    private _avatarImageCache: UtilsMap = new UtilsMap();
    private _petImageCache: UtilsMap = new UtilsMap();
    private _avatarColorCache: UtilsMap = new UtilsMap();
    private _petImageIdToFigureString: UtilsMap = new UtilsMap();
    private _SafeStr_3504: any[] = [];
    private _SafeStr_3991: PooledChatBubble[] = new Array<PooledChatBubble>(0).fill(null);

    constructor(param1: HabboFreeFlowChat) {
        this._component = param1;
        this._chatStyleLibrary = new ChatStyleLibrary(this._component.assets);
    }

    public dispose(): void {
        this.discardOldBitmaps();
        this._SafeStr_3504 = [];
        this._chatStyleLibrary.dispose();
        this._chatStyleLibrary = null;
        this._component = null;
    }

    public get disposed(): boolean {
        return this._component == null;
    }

    public getNewChatBubble(param1: ChatItem, param2: boolean = false): PooledChatBubble {
        let _loc7_: string = null;
        let _loc10_: IRoomObject = null;
        let _loc5_: string = null;
        let _loc14_: boolean = false;
        let _loc6_: number = 0;
        let _loc15_: number = 0;
        let _loc11_: PooledChatBubble = null;
        let _loc3_: IUserData = this._component.roomSessionManager.getSession(param1.roomId).userDataManager.getUserDataByIndex(param1.userId);
        let _loc8_: string = "";
        if (param1.forcedFigure || param1.forcedUserName) {
            _loc8_ = param1.forcedUserName;
        } else if (_loc3_ != null) {
            _loc8_ = _loc3_.name;
        }
        this.applySpecialChatContent(param1, _loc8_);
        let _loc13_: ChatStyle = castTo(this._chatStyleLibrary.getStyle(param1.style), ChatStyle);
        let _loc12_: number = 0;
        let _loc4_: BitmapData = _loc13_.iconImage;
        if (param1.forcedFigure || param1.forcedUserName) {
            if (!_loc4_) {
                _loc4_ = this.getUserImage(param1.forcedFigure);
            }
        } else if (_loc3_ != null) {
            _loc7_ = _loc3_.figure;
            _loc12_ = this._avatarColorCache.getValue(_loc7_) >>> 0;
            if (!_loc4_) {
                switch (_loc3_.type - 1) {
                    case 0:
                        _loc4_ = this.getUserImage(_loc7_);
                        break;
                    case 1:
                        _loc10_ = this._component.roomEngine.getRoomObject(param1.roomId, _loc3_.roomObjectId, 100);
                        _loc5_ = null;
                        if (_loc10_ != null) {
                            _loc5_ = _loc10_.getModel().getString("figure_posture");
                        }
                        _loc14_ = true;
                        _loc6_ = 32;
                        _loc15_ = 2;
                        _loc4_ = this.getPetImage(_loc7_, _loc15_, _loc14_, _loc6_, _loc5_);
                }
            }
        }
        if (this._SafeStr_3991.length > 0) {
            _loc11_ = this._SafeStr_3991.pop();
        } else {
            _loc11_ = new PooledChatBubble(this._component);
        }
        let _loc9_: any = _loc13_.textFormat.color;
        _loc11_.chatItem = param1;
        _loc11_.style = _loc13_;
        _loc11_.face = _loc4_;
        _loc11_.recreate(_loc8_, param1.forcedColor ? param1.forcedColor >>> 0 : _loc12_, this._component.roomChatBorderLimited);
        _loc13_.textFormat.color = _loc9_;
        return _loc11_;
    }

    public getNewEmptySpace(param1: number): PooledChatBubble {
        let _loc4_: PooledChatBubble = null;
        let _loc5_: IChatStyleInternal = new BlankStyle();
        let _loc2_: RoomSessionChatEvent = new RoomSessionChatEvent("RSCE_CHAT_EVENT", null, -1, "", 1);
        let _loc3_: ChatItem = new ChatItem(_loc2_, getTimer());
        if (this._SafeStr_3991.length > 0) {
            _loc4_ = this._SafeStr_3991.pop();
        } else {
            _loc4_ = new PooledChatBubble(this._component);
        }
        _loc4_.chatItem = _loc3_;
        _loc4_.style = _loc5_;
        _loc4_.face = null;
        _loc4_.recreate("", 0, false, 19);
        return _loc4_;
    }

    public getHistoryLineEntry(param1: ChatItem): IChatHistoryEntryBitmap {
        let _loc7_: string = null;
        let _loc9_: IRoomObject = null;
        let _loc5_: string = null;
        let _loc14_: boolean = false;
        let _loc6_: number = 0;
        let _loc16_: number = 0;
        let _loc2_: IUserData = this._component.roomSessionManager.getSession(param1.roomId).userDataManager.getUserDataByIndex(param1.userId);
        let _loc8_: string = "";
        let _loc15_: number = -1;
        let _loc4_: boolean = false;
        if (param1.forcedFigure || param1.forcedUserName) {
            _loc8_ = param1.forcedUserName;
        } else if (_loc2_ != null) {
            _loc8_ = _loc2_.name;
        }
        this.applySpecialChatContent(param1, _loc8_);
        let _loc13_: ChatStyle = castTo(this._chatStyleLibrary.getStyle(param1.style), ChatStyle);
        if (_loc2_ != null && !_loc13_.isNotification && _loc2_.type == 1 && _loc2_.webID > 0 && _loc2_.webID != this._component.sessionDataManager.userId) {
            _loc15_ = _loc2_.webID;
            _loc4_ = true;
        }
        if (this.isSystemNotificationChat(param1.chatType)) {
            _loc4_ = false;
        }
        let _loc12_: number = 0;
        let _loc3_: BitmapData = _loc13_.iconImage;
        if (param1.forcedFigure || param1.forcedUserName) {
            if (!_loc3_) {
                _loc3_ = this.getUserImage(param1.forcedFigure);
            }
        } else if (_loc2_ != null) {
            _loc7_ = _loc2_.figure;
            _loc12_ = this._avatarColorCache.getValue(_loc7_) >>> 0;
            if (!_loc3_) {
                switch (_loc2_.type - 1) {
                    case 0:
                    case 2:
                    case 3:
                        _loc3_ = this.getUserImage(_loc7_);
                        break;
                    case 1:
                        _loc9_ = this._component.roomEngine.getRoomObject(param1.roomId, _loc2_.roomObjectId, 100);
                        _loc5_ = null;
                        if (_loc9_ != null) {
                            _loc5_ = _loc9_.getModel().getString("figure_posture");
                        }
                        _loc14_ = false;
                        _loc6_ = 32;
                        _loc16_ = 2;
                        _loc3_ = this.getPetImage(_loc7_, _loc16_, _loc14_, _loc6_, _loc5_);
                }
            }
        }
        let _loc10_: ChatBubble = new ChatBubble(param1, _loc13_, _loc3_, _loc8_, param1.forcedColor ? param1.forcedColor >>> 0 : _loc12_, this._component, 1);
        let _loc11_: BitmapData = new BitmapData(_loc10_.width | 0, _loc10_.height | 0, true, 0);
        _loc10_.drawToBitmap(_loc11_);
        return new ChatHistoryEntryBitmapBubble(param1, _loc4_, _loc15_, _loc8_, _loc11_, _loc13_.overlap);
    }

    public getHistoryRoomChangeEntry(param1: GuestRoomData): IChatHistoryEntryBitmap {
        return new ChatHistoryRoomChangeEntry(param1, this._component);
    }

    public recycle(param1: PooledChatBubble): void {
        this._SafeStr_3991.push(param1);
    }

    public getUserImage(param1: string): BitmapData {
        let _loc5_: IAvatarImage = null;
        let _loc4_: IPartColor = null;
        let _loc3_: boolean = this._component.getBoolean("zoom.enabled");
        let _loc2_: BitmapData = asInstanceOf(this._avatarImageCache.getValue(param1), BitmapData);
        if (_loc2_ == null) {
            _loc5_ = this._component.avatarRenderManager.createAvatarImage(param1, _loc3_ ? "h" : "sh", null, this);
            if (_loc5_ != null) {
                _loc2_ = HabboFaceFocuser.focusUserFace(_loc5_, "head", 2, _loc3_ ? 0.5 : 1);
                _loc4_ = _loc5_.getPartColor("ch");
                _loc5_.dispose();
                if (_loc4_ != null) {
                    this._avatarColorCache.add(param1, _loc4_.rgb);
                }
            }
        }
        if (_loc2_ != null) {
            this._avatarImageCache.add(param1, _loc2_);
        }
        return _loc2_;
    }

    private getPetImage(param1: string, param2: number, param3: boolean, param4: number = 64, param5: string = null): BitmapData {
        let _loc6_: PetFigureData = null;
        let _loc8_: number = 0;
        let _loc7_: any = 0;
        let _loc11_: boolean = false;
        let _loc9_: ImageResult = null;
        let _loc10_: BitmapData = asInstanceOf(this._petImageCache.getValue(param1 + param5), BitmapData);
        if (_loc10_ == null) {
            _loc6_ = new PetFigureData(param1);
            _loc8_ = _loc6_.typeId;
            _loc7_ = 0;
            _loc11_ = false;
            if (35 == _loc8_) {
                _loc11_ = true;
            }
            _loc9_ = this._component.roomEngine.getPetImage(_loc8_, _loc6_.paletteId, _loc6_.color, new Vector3d(param2 * 45), param4, this, _loc11_, _loc7_ >>> 0, _loc6_.customParts, param5);
            if (_loc9_ != null) {
                _loc10_ = _loc9_.data;
                if (_loc9_.id > 0) {
                    this._petImageIdToFigureString.add(_loc9_.id, _loc6_.figureString);
                }
            }
            this._avatarColorCache.add(param1, _loc6_.color);
        }
        if (_loc10_ != null) {
            this._petImageCache.add(param1 + param5, _loc10_);
        }
        return _loc10_;
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

    private petImageReady(param1: string): void {
        let _loc2_: BitmapData = null;
        if (this._petImageCache) {
            _loc2_ = asInstanceOf(this._petImageCache.remove(param1), BitmapData);
            if (_loc2_ != null) {
                this._SafeStr_3504.push(_loc2_);
            }
        }
        if (this._SafeStr_3504.length > 30) {
            this.discardOldBitmaps();
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
        if (this._SafeStr_3504.length > 30) {
            this.discardOldBitmaps();
        }
    }

    private discardOldBitmaps(): void {
        for (const _loc1_ of this._SafeStr_3504 ?? []) {
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
    }

    public get chatStyleLibrary(): ChatStyleLibrary {
        return this._chatStyleLibrary;
    }

    private applySpecialChatContent(param1: ChatItem, param2: string): void {
        let _loc8_: string = null;
        let _loc9_: string = null;
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc6_: string = null;
        let _loc4_: string = null;
        let _loc5_: string = null;
        if (param1.chatType == 12) {
            switch (param1.extraParam - 67) {
                case 0:
                    param1.text = "<b>6666666...  77777777777777...</b>";
                    param1.style = 1;
                    return;
            }
        }
        if (!this._component.localizations) {
            return;
        }
        if (param1.chatType == 3) {
            param1.text = this._component.localizations.getLocalizationWithParams("widgets.chatbubble.respect", "", "username", param2);
            return;
        }
        if (param1.chatType == 4) {
            param1.text = this._component.localizations.getLocalizationWithParams("widget.chatbubble.petrespect", "", "petname", param2);
            return;
        }
        if (param1.chatType == 6) {
            param1.text = this._component.localizations.getLocalizationWithParams("widget.chatbubble.pettreat", "", "petname", param2);
            return;
        }
        if (param1.chatType == 11) {
            if (param1.extraParam >= 0) {
                param1.text = "Ping: " + param1.extraParam + " ms";
            } else {
                param1.text = "Ping: measuring...";
            }
            return;
        }
        if (param1.chatType == 5) {
            _loc8_ = "widget.chatbubble.handitem";
            _loc9_ = this._component.localizations.getLocalization("handitem" + param1.extraParam, "handitem" + param1.extraParam);
            this._component.localizations.registerParameter(_loc8_, "username", param2);
            this._component.localizations.registerParameter(_loc8_, "handitem", _loc9_);
            param1.text = this._component.localizations.getLocalizationRaw(_loc8_).value;
            param1.style = 1;
            return;
        }
        if (param1.chatType == 10) {
            _loc7_ = "widget.chatbubble.mutetime";
            _loc3_ = String(param1.extraParam % 60);
            _loc6_ = String(param1.extraParam > 0 ? Math.floor(param1.extraParam % 3600 / 60) : 0);
            _loc4_ = String(param1.extraParam > 0 ? Math.floor(param1.extraParam / 3600) : 0);
            this._component.localizations.registerParameter(_loc7_, "hours", _loc4_);
            this._component.localizations.registerParameter(_loc7_, "minutes", _loc6_);
            this._component.localizations.registerParameter(_loc7_, "seconds", _loc3_);
            param1.text = this._component.localizations.getLocalizationRaw(_loc7_).value;
            param1.style = 1;
            return;
        }
        if (param1.chatType == 7 || param1.chatType == 8 || param1.chatType == 9) {
            _loc5_ = "widget.chatbubble.petrevived";
            if (param1.chatType == 8) {
                _loc5_ = "widget.chatbubble.petrefertilized";
            } else if (param1.chatType == 9) {
                _loc5_ = "widget.chatbubble.petspeedfertilized";
            }
            this._component.localizations.registerParameter(_loc5_, "petName", param2);
            this._component.localizations.registerParameter(_loc5_, "userName", this.resolveRoomUserName(param1.roomId, param1.extraParam));
            param1.text = this._component.localizations.getLocalizationRaw(_loc5_).value;
            param1.style = 1;
        }
    }

    private isSystemNotificationChat(param1: number): boolean {
        switch (param1 - 3) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 9:
                return true;
            default:
                return false;
        }
    }

    private resolveRoomUserName(param1: number, param2: number): string {
        let _loc4_: IRoomObject = this._component.roomEngine.getRoomObject(param1, param2, 100);
        if (_loc4_ == null) {
            return "";
        }
        let _loc3_: IUserData = this._component.roomSessionManager.getSession(param1).userDataManager.getUserDataByIndex(_loc4_.getId());
        return _loc3_ != null ? _loc3_.name : "";
    }

    get [IGetImageListener](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
