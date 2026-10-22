import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/IHabboFriendBarView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomChatInputWidget, RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget.group';
import { RoomWidgetScriptProceedMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetScriptProceedMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { HelpBubbleItem } from '@/com/sulake/habbo/ui/widget/uihelpbubbles/HelpBubbleItem';
import { UiHelpBubble } from '@/com/sulake/habbo/ui/widget/uihelpbubbles/UiHelpBubble';
import { UiHelpBubbleIconEnum } from '@/com/sulake/habbo/ui/widget/uihelpbubbles/UiHelpBubbleIconEnum';

export class UiHelpBubblesWidget extends RoomWidgetBase implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.uihelpbubbles::UiHelpBubblesWidget'); }

    declare private _component: Component;

    declare private _bubbles: UtilsMap;

    declare private _toolBar: IHabboToolbar;

    declare private _friendBar: IHabboFriendBarView;

    declare private _roomTools: RoomToolsWidget;

    declare private _chatInput: RoomChatInputWidget;

    declare private _SafeStr_2760: any[];

    private _SafeStr_4256: number = 0;

    declare private _localization: IHabboLocalizationManager;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: IHabboFriendBarView, param6: IHabboToolbar, param7: IRoomDesktop, param8: Component) {
        super(param1, param2, param3, param4);
        this._component = param8;
        this._friendBar = param5;
        this._toolBar = param6;
        this._bubbles = new UtilsMap();
        this._localization = param4;
        this._SafeStr_2760 = [];
        if (param7) {
            this._roomTools = asInstanceOf(param7.getWidget("RWE_ROOM_TOOLS"), RoomToolsWidget);
            this._chatInput = asInstanceOf(param7.getWidget("RWE_CHAT_INPUT_WIDGET"), RoomChatInputWidget);
        }
        (param2 instanceof Component ? param2 : null).context.addLinkEventTracker(this);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._bubbles) {
            for (let _loc1_ of valuesOf(this._bubbles)) {
                _loc1_.dispose();
                _loc1_ = null;
            }
            this._bubbles.dispose();
            this._bubbles = null;
            this._SafeStr_2760 = null;
        }
        super.dispose();
    }

    private checkElementPosition(param1: UiHelpBubble, param2: boolean = false): Rectangle {
        let _loc9_: Rectangle = null;
        let _loc14_: IWindowContainer = null;
        let _loc5_: IWindow = null;
        let _loc8_: any[] = null;
        let _loc3_: IWindowContainer = null;
        let _loc10_: ITextFieldWindow = null;
        let _loc13_: Rectangle = null;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        if (!param1 || !param1.getWindow()) {
            return null;
        }
        let _loc11_: string = param1.getName();
        if (_loc11_ == "" || !_loc11_) {
            return null;
        }
        let _loc15_: number = param1.getWindow().height;
        let _loc12_: number = param1.getWindow().width;
        let _loc16_: string = "down";
        let _loc17_: number = -1;
        if (this.toolBar) {
            _loc5_ = this.toolBar.getIcon(_loc11_);
            if (_loc5_) {
                _loc9_ = new Rectangle();
                _loc5_.getGlobalRectangle(_loc9_);
                param1.setCallback(_loc5_);
            }
        }
        if (this.friendBar) {
            if (!_loc9_) {
                _loc14_ = this.friendBar.getIconLocation(_loc11_);
                if (_loc14_) {
                    _loc9_ = new Rectangle();
                    _loc14_.getGlobalRectangle(_loc9_);
                    param1.setCallback(isIWindow(_loc14_) ? _loc14_ : null);
                }
            }
        }
        if (!_loc9_) {
            if (this.roomTools) {
                _loc5_ = this.roomTools.getIconLocation(_loc11_);
                if (_loc5_) {
                    _loc9_ = new Rectangle();
                    _loc5_.getGlobalRectangle(_loc9_);
                    param1.setCallback(_loc5_);
                }
            }
        }
        if (!_loc9_) {
            if (this.chatInput && _loc11_ == "chat_input") {
                _loc8_ = this.chatInput.getChatInputElements();
                if (_loc8_.length > 1) {
                    _loc3_ = asGuarded(_loc8_[0], isIWindowContainer);
                    _loc10_ = asGuarded(_loc8_[1], isITextFieldWindow);
                }
                _loc9_ = _loc3_.rectangle;
                if (_loc9_) {
                    if (param2 && _loc9_) {
                        return _loc9_;
                    }
                    _loc9_.y -= _loc15_ - 40;
                    _loc9_.x += _loc9_.width / 2 - 10;
                    param1.setChatFieldCallback(_loc10_);
                    param1.setArrowPos(_loc16_, _loc17_);
                    return _loc9_;
                }
            }
        }
        if (_loc9_) {
            if (param2) {
                return _loc9_;
            }
            _loc13_ = _loc9_.clone();
            _loc4_ = 15;
            _loc6_ = param1.getWindow().desktop.width;
            if (_loc9_.y - (_loc15_ + _loc4_) < 50) {
                _loc4_ = 0;
            }
            _loc16_ = "down";
            _loc17_ = 0;
            _loc9_.x += _loc9_.width / 2;
            _loc9_.y -= _loc15_ + _loc4_;
            _loc7_ = _loc9_.right - _loc13_.right | 0;
            if (_loc7_ >= _loc12_ / 2) {
                _loc7_ = _loc12_ / 2 - 25 | 0;
            }
            if (_loc9_.y < _loc15_) {
                _loc9_.y += _loc9_.height + _loc15_ + 10;
                _loc16_ = "up";
                if (_loc7_ <= 30) {
                    _loc7_ = _loc7_ / 3 | 0;
                }
                _loc17_ = _loc7_;
                param1.setArrowPos(_loc16_, _loc17_);
            }
            if (_loc9_.x < _loc12_ / 2) {
                _loc9_.x = 10;
                _loc17_ = _loc17_ - (_loc12_ / 2 - 30) | 0;
                param1.setArrowPos(_loc16_, _loc17_);
                return _loc9_;
            }
            if (_loc9_.x + _loc12_ / 2 > _loc6_) {
                _loc9_.x = _loc6_ - _loc12_ / 2;
                _loc17_ = _loc12_ / 4 | 0;
                param1.setArrowPos(_loc16_, _loc17_);
                return _loc9_;
            }
            param1.setArrowPos(_loc16_, _loc17_);
        }
        return _loc9_;
    }

    public addNextBubble(): void {
        let _loc5_: Point = null;
        if (!this._SafeStr_2760 || this._SafeStr_2760.length == 0 || this._SafeStr_2760.length < this._SafeStr_4256 + 1) {
            return;
        }
        let _loc3_: HelpBubbleItem = asInstanceOf(this._SafeStr_2760[this._SafeStr_4256], HelpBubbleItem);
        let _loc2_: boolean = this._SafeStr_2760.length > this._SafeStr_4256 + 1;
        let _loc6_: string = _loc3_.name;
        let _loc4_: UiHelpBubble = new UiHelpBubble(this, _loc3_, _loc2_);
        if (this._bubbles.hasKey(_loc6_)) {
            this.removeHelpBubble(_loc6_);
        }
        let _loc1_: Rectangle = this.checkElementPosition(_loc4_);
        this._SafeStr_4256 = this._SafeStr_4256 + 1;
        if (_loc1_) {
            _loc5_ = new Point(_loc1_.x, _loc1_.y);
        }
        if (_loc5_) {
            _loc4_.setPosition(_loc5_);
            _loc4_.getWindow().desktop.addEventListener("WE_RESIZED", this.onDesktopResized);
            _loc4_.setModal(this.checkElementPosition(_loc4_, true));
            this.addHelpBubble(_loc6_, _loc4_);
        } else {
            _loc4_.dispose();
            this.addNextBubble();
        }
    }

    private addHelpBubble(param1: string, param2: UiHelpBubble): void {
        if (!this._bubbles || !param2) {
            return;
        }
        this._bubbles.add(param1, param2);
    }

    public removeHelpBubble(param1: string): void {
        if (!this._bubbles) {
            return;
        }
        let _loc2_: UiHelpBubble = asInstanceOf(this._bubbles.getValue(param1), UiHelpBubble);
        if (!_loc2_) {
            return;
        }
        this._bubbles.remove(param1);
        _loc2_.dispose();
        this.addNextBubble();
    }

    private onDesktopResized = (param1: WindowEvent = null): void => {
        let _loc2_: Rectangle = null;
        let _loc4_: Point = null;
        for (const _loc3_ of valuesOf(this._bubbles)) {
            _loc2_ = this.checkElementPosition(_loc3_);
            if (_loc2_) {
                _loc4_ = new Point(_loc2_.x, _loc2_.y);
                _loc3_.setPosition(_loc4_);
                _loc3_.setModal(this.checkElementPosition(_loc3_, true));
            }
        }
    };

    public sendScriptProceedMessage(): void {
        let _loc1_: RoomWidgetMessage = new RoomWidgetScriptProceedMessage("RWPM_ANSWER");
        if (this.messageListener) {
            this.messageListener.processWidgetMessage(_loc1_);
        }
    }

    public get linkPattern(): string {
        return "helpBubble/";
    }

    public linkReceived(param1: string): void {
        let _loc8_: number = 0;
        let _loc3_: HelpBubbleItem = null;
        let _loc7_: number = 0;
        let _loc6_: string = null;
        let _loc4_: string = null;
        if (!this._bubbles) {
            this._bubbles = new UtilsMap();
        }
        if (!this._SafeStr_2760) {
            this._SafeStr_2760 = [];
        }
        let _loc2_: any[] = param1.split("/");
        let _loc5_: number = _loc2_.length | 0;
        if (_loc5_ < 3) {
            return;
        }
        if (_loc2_[1] == "add") {
            _loc8_ = 0;
            _loc7_ = 2;
            while (_loc7_ < _loc5_) {
                if (++_loc8_ == 1) {
                    _loc3_ = new HelpBubbleItem();
                    _loc6_ = stringOrNull(_loc2_[_loc7_]);
                    _loc4_ = stringOrNull(UiHelpBubbleIconEnum[_loc6_]);
                    if (!_loc4_) {
                        _loc4_ = _loc6_;
                    }
                    _loc3_.name = _loc4_;
                    _loc3_.modal = true;
                }
                if (_loc8_ == 2) {
                    _loc3_.text = this._localization.getLocalization(stringOrNull(_loc2_[_loc7_]), stringOrNull(_loc2_[_loc7_]));
                    _loc8_ = 0;
                    this._SafeStr_2760.push(_loc3_);
                }
                _loc7_++;
            }
            this.addNextBubble();
        } else if (_loc2_[1] == "remove") {
            this.removeHelpBubble(stringOrNull(_loc2_[2]));
        }
    }

    public get toolBar(): IHabboToolbar {
        return this._toolBar;
    }

    public get friendBar(): IHabboFriendBarView {
        return this._friendBar;
    }

    public get roomTools(): RoomToolsWidget {
        return this._roomTools;
    }

    public get chatInput(): RoomChatInputWidget {
        return this._chatInput;
    }
}
