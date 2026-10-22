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

    constructor(param1: HabboFreeFlowChat) {
        this._component = param1;
        this._chatStyleLibrary = new ChatStyleLibrary(this._component.assets);
        this._accountId = this._component.sessionDataManager.userId;
    }

    declare private _component: HabboFreeFlowChat;

    declare private _chatStyleLibrary: ChatStyleLibrary;

    private _avatarImageCache: UtilsMap = new UtilsMap();
    private _petImageCache: UtilsMap = new UtilsMap();
    private _avatarColorCache: UtilsMap = new UtilsMap();
    private _petImageIdToFigureString: UtilsMap = new UtilsMap();
    private _SafeStr_3504: any[] = [];
    private _SafeStr_3991: PooledChatBubble[] = new Array<PooledChatBubble>(0).fill(null);

    declare private _accountId: number;
    static { (this.prototype as any)._accountId = 0; }

    public get disposed(): boolean {
        return this._component == null;
    }

    public get chatStyleLibrary(): ChatStyleLibrary {
        return this._chatStyleLibrary;
    }

    public dispose(): void {
        this.discardOldBitmaps();
        this._SafeStr_3504 = [];
        this._chatStyleLibrary.dispose();
        this._chatStyleLibrary = null;
        this._component = null;
    }

    public getNewChatBubble(param1: ChatItem, param2: boolean = false): PooledChatBubble {
        let _loc11_: string = null;
        let _loc16_: IRoomObject = null;
        let _loc6_: string = null;
        let _loc20_: boolean = false;
        let _loc9_: number = 0;
        let _loc21_: number = 0;
        let _loc10_: string = null;
        let _loc13_: string = null;
        let _loc8_: string = null;
        let _loc15_: string = null;
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc17_: PooledChatBubble = null;
        let _loc19_: ChatStyle = castTo(this._chatStyleLibrary.getStyle(param1.style), ChatStyle);
        let _loc4_: IUserData = this._component.roomSessionManager.getSession(param1.roomId).userDataManager.getUserDataByIndex(param1.userId);
        let _loc12_: string = "";
        let _loc18_: number = 0;
        let _loc5_: BitmapData = _loc19_.iconImage;
        if (param1.forcedFigure || param1.forcedUserName) {
            if (!_loc5_) {
                _loc5_ = this.getUserImage(param1.forcedFigure);
            }
            _loc12_ = param1.forcedUserName;
        } else if (_loc4_ != null) {
            _loc12_ = _loc4_.name;
            _loc11_ = _loc4_.figure;
            _loc18_ = this._avatarColorCache.getValue(_loc11_) >>> 0;
            if (!_loc5_) {
                switch (_loc4_.type - 1) {
                    case 0:
                        _loc5_ = this.getUserImage(_loc11_);
                        break;
                    case 1:
                        _loc16_ = this._component.roomEngine.getRoomObject(param1.roomId, _loc4_.roomObjectId, 100);
                        _loc6_ = null;
                        if (_loc16_ != null) {
                            _loc6_ = _loc16_.getModel().getString("figure_posture");
                        }
                        _loc20_ = true;
                        _loc9_ = 32;
                        _loc21_ = 2;
                        _loc5_ = this.getPetImage(_loc11_, _loc21_, _loc20_, _loc9_, _loc6_);
                }
            }
        }
        if (param1.chatType == 3) {
            param1.text = !this._component.localizations ? "" : this._component.localizations.getLocalizationWithParams("widgets.chatbubble.respect", "", "username", _loc12_);
        } else if (param1.chatType == 4) {
            param1.text = !this._component.localizations ? "" : this._component.localizations.getLocalizationWithParams("widget.chatbubble.petrespect", "", "petname", _loc12_);
        } else if (param1.chatType == 6) {
            param1.text = !this._component.localizations ? "" : this._component.localizations.getLocalizationWithParams("widget.chatbubble.pettreat", "", "petname", _loc12_);
        }
        if (param1.chatType == 5) {
            _loc10_ = "widget.chatbubble.handitem";
            _loc13_ = this._component.localizations.getLocalization("handitem" + param1.extraParam, "handitem" + param1.extraParam);
            this._component.localizations.registerParameter(_loc10_, "username", _loc12_);
            this._component.localizations.registerParameter(_loc10_, "handitem", _loc13_);
            param1.text = this._component.localizations.getLocalizationRaw(_loc10_).value;
        }
        if (param1.chatType == 10) {
            _loc8_ = "widget.chatbubble.mutetime";
            _loc15_ = String(param1.extraParam % 60);
            _loc7_ = String(param1.extraParam > 0 ? Math.floor(param1.extraParam % 3600 / 60) : 0);
            _loc3_ = String(param1.extraParam > 0 ? Math.floor(param1.extraParam / 3600) : 0);
            this._component.localizations.registerParameter(_loc8_, "hours", _loc3_);
            this._component.localizations.registerParameter(_loc8_, "minutes", _loc7_);
            this._component.localizations.registerParameter(_loc8_, "seconds", _loc15_);
            param1.text = this._component.localizations.getLocalizationRaw(_loc8_).value;
        }
        if (this._SafeStr_3991.length > 0) {
            _loc17_ = this._SafeStr_3991.pop();
        } else {
            _loc17_ = new PooledChatBubble(this._component);
        }
        let _loc14_: any = _loc19_.textFormat.color;
        _loc17_.chatItem = param1;
        _loc17_.style = _loc19_;
        _loc17_.face = _loc5_;
        _loc17_.recreate(_loc12_, Number(param1.forcedColor ? param1.forcedColor : _loc18_) >>> 0, this._component.roomChatBorderLimited);
        _loc19_.textFormat.color = _loc14_;
        return _loc17_;
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
        let _loc11_: string = null;
        let _loc15_: IRoomObject = null;
        let _loc6_: string = null;
        let _loc20_: boolean = false;
        let _loc9_: number = 0;
        let _loc21_: number = 0;
        let _loc10_: string = null;
        let _loc13_: string = null;
        let _loc8_: string = null;
        let _loc14_: string = null;
        let _loc7_: string = null;
        let _loc2_: string = null;
        let _loc19_: ChatStyle = castTo(this._chatStyleLibrary.getStyle(param1.style), ChatStyle);
        let _loc3_: IUserData = this._component.roomSessionManager.getSession(param1.roomId).userDataManager.getUserDataByIndex(param1.userId);
        let _loc12_: string = "";
        let _loc18_: number = 0;
        let _loc4_: BitmapData = _loc19_.iconImage;
        let _loc5_: any = !(_loc3_ == null || _loc3_.webID == this._accountId);
        if (param1.forcedFigure || param1.forcedUserName) {
            if (!_loc4_) {
                _loc4_ = this.getUserImage(param1.forcedFigure);
            }
            _loc12_ = param1.forcedUserName;
        } else if (_loc3_ != null) {
            _loc12_ = _loc3_.name;
            _loc11_ = _loc3_.figure;
            _loc18_ = this._avatarColorCache.getValue(_loc11_) >>> 0;
            if (!_loc4_) {
                switch (_loc3_.type - 1) {
                    case 0:
                    case 2:
                    case 3:
                        _loc4_ = this.getUserImage(_loc11_);
                        break;
                    case 1:
                        _loc15_ = this._component.roomEngine.getRoomObject(param1.roomId, _loc3_.roomObjectId, 100);
                        _loc6_ = null;
                        if (_loc15_ != null) {
                            _loc6_ = _loc15_.getModel().getString("figure_posture");
                        }
                        _loc20_ = false;
                        _loc9_ = 32;
                        _loc21_ = 2;
                        _loc4_ = this.getPetImage(_loc11_, _loc21_, _loc20_, _loc9_, _loc6_);
                }
            }
        }
        if (param1.chatType == 3) {
            param1.text = this._component.localizations ? "" : this._component.localizations.getLocalizationWithParams("widgets.chatbubble.respect", "", "username", _loc12_);
            _loc5_ = false;
        } else if (param1.chatType == 4) {
            param1.text = this._component.localizations ? "" : this._component.localizations.getLocalizationWithParams("widget.chatbubble.petrespect", "", "petname", _loc12_);
            _loc5_ = false;
        } else if (param1.chatType == 6) {
            param1.text = this._component.localizations ? "" : this._component.localizations.getLocalizationWithParams("widget.chatbubble.pettreat", "", "petname", _loc12_);
            _loc5_ = false;
        }
        if (param1.chatType == 5) {
            _loc10_ = "widget.chatbubble.handitem";
            _loc13_ = this._component.localizations.getLocalizationWithParams("handitem" + param1.extraParam, "handitem" + param1.extraParam);
            param1.text = this._component.localizations.getLocalizationWithParams(_loc10_, "", "username", _loc12_, "handitem", _loc13_);
            _loc5_ = false;
        }
        if (param1.chatType == 10) {
            _loc8_ = "widget.chatbubble.mutetime";
            _loc14_ = String(param1.extraParam % 60);
            _loc7_ = String(param1.extraParam > 0 ? Math.floor(param1.extraParam % 3600 / 60) : 0);
            _loc2_ = String(param1.extraParam > 0 ? Math.floor(param1.extraParam / 3600) : 0);
            this._component.localizations.registerParameter(_loc8_, "hours", _loc2_);
            this._component.localizations.registerParameter(_loc8_, "minutes", _loc7_);
            this._component.localizations.registerParameter(_loc8_, "seconds", _loc14_);
            param1.text = this._component.localizations.getLocalizationRaw(_loc8_).value;
            _loc5_ = false;
        }
        let _loc16_: ChatBubble = new ChatBubble(param1, _loc19_, _loc4_, _loc12_, Number(param1.forcedColor ? param1.forcedColor : _loc18_) >>> 0, this._component, 1);
        let _loc17_: BitmapData = new BitmapData(_loc16_.width | 0, _loc16_.height | 0, true, 0);
        _loc16_.drawToBitmap(_loc17_);
        return new ChatHistoryEntryBitmapBubble(param1, _loc5_, _loc12_, _loc17_, _loc19_.overlap);
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

    private discardOldBitmaps(): void {
        for (const _loc1_ of this._SafeStr_3504 ?? []) {
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
    }

    get [IGetImageListener](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
