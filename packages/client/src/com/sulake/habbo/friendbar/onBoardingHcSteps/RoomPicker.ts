import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SelectInitialRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/nux/SelectInitialRoomMessageParser';
import type { OnBoardingHcFlow } from '@/com/sulake/habbo/friendbar/onBoardingHc/OnBoardingHcFlow';
import type { Button } from '@/onBoardingHcUi/Button';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SelectInitialRoomEvent } from '@/com/sulake/habbo/communication/messages/incoming/nux/SelectInitialRoomEvent';
import { UpdateHomeRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/UpdateHomeRoomMessageComposer';
import { SelectInitialRoomComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nux/SelectInitialRoomComposer';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

const room_image_border_png_pngAsset = embedBitmap("friendbar/room_image_border_png.png");
const room_selected_icon_png_pngAsset = embedBitmap("friendbar/room_selected_icon_png.png");

export class RoomPicker implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.onBoardingHcSteps::RoomPicker'); }

    private static readonly room_image_border_png = room_image_border_png_pngAsset;

    private static readonly room_selected_icon_png = room_selected_icon_png_pngAsset;

    private static get galleryUrl(): string {
        return "https://images.habbo.com/c_images/nux/";
    }

    constructor(param1: OnBoardingHcFlow, param2: Sprite) {
        this._newUserFlow = param1;
        this._container = param2;
        this._SafeStr_6554 = param1.communicationManager.addHabboConnectionMessageEvent(new SelectInitialRoomEvent(this.onSelectInitialRoomResponse));
    }

    private _roomImages: any[] = [];

    declare private _numOfRooms: number;
    static { (this.prototype as any)._numOfRooms = 0; }

    declare private _newUserFlow: OnBoardingHcFlow;

    declare private _container: Sprite;

    declare private _SafeStr_3724: Sprite;

    private _SafeStr_3985: number = 1;

    declare private _roomTypes: any[];

    declare private _SafeStr_3715: TextField;

    declare private _roomName: TextField;

    declare private _SafeStr_5288: Button;

    private _roomImageContainers: any[] = [];

    declare private _SafeStr_3773: Bitmap;

    private _SafeStr_4041: number = 0;
    private _spaceBetweenImages: number = 30;

    declare private _SafeStr_6554: IMessageEvent;

    public get disposed(): boolean {
        return this._newUserFlow == null;
    }

    public fetchThumbnails(): void {
        let _loc3_: number = 0;
        let _loc1_: Loader = null;
        let _loc2_: URLRequest = null;
        this._roomTypes = this._newUserFlow.getProperty("new.user.flow.roomTypes", "10,11,12").split(",");
        this._numOfRooms = this._roomTypes.length | 0;
        _loc3_ = 0;
        while (_loc3_ < this._numOfRooms) {
            _loc1_ = new Loader();
            _loc2_ = new URLRequest(RoomPicker.galleryUrl + "nux_room_" + this._roomTypes[_loc3_] + "_round.png");
            _loc1_.load(_loc2_);
            _loc1_.contentLoaderInfo.addEventListener("complete", this.roomImageLoadCompleteHandler);
            this._roomImages.push(_loc1_);
            _loc3_++;
        }
    }

    public init(): void {
        if (this._roomTypes == null) {
            this.fetchThumbnails();
        }
    }

    public initView(): void {
        let _loc6_: number = 0;
        let _loc3_: Sprite = null;
        let _loc1_: Loader = null;
        let _loc2_: number = 0;
        let _loc5_: TextField = LoaderUI.createTextField("headerText", 24, 8309486, false, true, false, false);
        _loc5_.width = 500;
        _loc5_.thickness = 50;
        this._container.addChild(_loc5_);
        _loc5_.htmlText = this._newUserFlow.getLocalization("onboarding.room.information", "Choose your first room. This room gets you started. You can create more free rooms later, if you like.");
        _loc5_.multiline = true;
        _loc5_.x = 25;
        _loc5_.y = -70;
        _loc6_ = 0;
        while (_loc6_ < this._numOfRooms) {
            _loc3_ = new Sprite();
            _loc1_ = asInstanceOf(this._roomImages[_loc6_], Loader);
            if (_loc1_ != null) {
                _loc3_.addChild(_loc1_);
            }
            this._container.addChild(_loc3_);
            this._roomImageContainers.push(_loc3_);
            _loc3_.name = String(_loc6_ + 1);
            _loc3_.addEventListener("click", this.onRoomClick);
            _loc2_ = (_loc6_ + 1) * this._spaceBetweenImages + _loc6_ * 280;
            _loc3_.x = _loc2_;
            _loc3_.y = 10;
            _loc6_++;
        }
        this._SafeStr_3724 = new Sprite();
        this._container.addChild(this._SafeStr_3724);
        this._SafeStr_5288 = new ColouredButton("gfreen", this._newUserFlow.getLocalization("room.select", "Select"), new Rectangle(0, 0, 0, 40), true, this.onButtonSelect);
        let _loc7_: Bitmap = LoaderUI.createBalloon(640, 100, 0, false, 995918, "none");
        this._SafeStr_3724.addChild(_loc7_);
        _loc7_.x = this._spaceBetweenImages;
        LoaderUI.lineUpVertically(_loc3_, 20, _loc7_);
        let _loc4_: Sprite = new Sprite();
        _loc4_.addChild(this._SafeStr_5288);
        this._container.addChild(_loc4_);
        _loc4_.x = 725;
        _loc4_.y = 360;
        if (!this._SafeStr_3715) {
            this._SafeStr_3715 = LoaderUI.createTextField(this._newUserFlow.getLocalization("receptionist.start.title", "Hiya!"), 18, 8309486, false);
            this._roomName = LoaderUI.createTextField(this._newUserFlow.getLocalization("onboarding.hint.hc", "Room name"), 20, 16777215, false, true, false, false);
            this._roomName.width = 260;
            this._roomName.x = 50;
            this._SafeStr_3715.x = 50;
            this._SafeStr_3715.width = 260;
            LoaderUI.lineUpVertically(_loc3_, 30, this._roomName);
            LoaderUI.lineUpVertically(_loc3_, 55, this._SafeStr_3715);
            this._SafeStr_3724.addChild(this._SafeStr_3715);
            this._SafeStr_3724.addChild(this._roomName);
        }
        this._SafeStr_3985 = 1;
        if (!this._SafeStr_3773) {
            this._SafeStr_3773 = castTo(new RoomPicker.room_selected_icon_png(), Bitmap);
            this._SafeStr_3724.addChild(this._SafeStr_3773);
        }
        this._SafeStr_3724.visible = this._SafeStr_4041 == this._numOfRooms;
        this._SafeStr_5288.visible = this._SafeStr_4041 == this._numOfRooms;
        this.chooseRoom();
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._newUserFlow.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_6554);
        if (this._container) {
            while (this._container.numChildren > 0) {
                this._container.removeChildAt(0);
            }
        }
        this._container = null;
        this._roomImages = null;
        this._newUserFlow = null;
    }

    private onSelectInitialRoomResponse = (param1: SelectInitialRoomEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: SelectInitialRoomMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.roomId > 0) {
            this._newUserFlow.communicationManager.connection.send(new UpdateHomeRoomMessageComposer(_loc2_.roomId));
        }
        this._newUserFlow.roomPickingCompleted();
    };

    private getRoomDescription(): void {
        let _loc1_: string = stringOrNull(this._roomTypes[this._SafeStr_3985 - 1]);
        this._roomName.text = this._newUserFlow.getLocalization("room.name." + _loc1_, "Room " + _loc1_);
        this._SafeStr_3715.text = this._newUserFlow.getLocalization("room.description." + _loc1_, "\nTwo-line description");
    }

    private onButtonSelect = (param1: DisplayObject): void => {
        let _loc2_: string = stringOrNull(this._roomTypes[this._SafeStr_3985 - 1]);
        this._newUserFlow.communicationManager.connection.send(new SelectInitialRoomComposer(_loc2_));
    };

    private chooseRoom(): void {
        let _loc1_: Sprite = this._roomImageContainers[this._SafeStr_3985 - 1];
        if (_loc1_ == null) {
            return;
        }
        this._SafeStr_3773.x = _loc1_.x;
        this._SafeStr_3773.y = _loc1_.y + _loc1_.height - this._SafeStr_3773.height;
        this._SafeStr_3773.visible = true;
        this._SafeStr_5288.visible = this._SafeStr_4041 == this._numOfRooms;
        this.getRoomDescription();
    }

    private onRoomClick = (param1: Event): void => {
        this._SafeStr_3985 = param1.currentTarget.name | 0;
        this.chooseRoom();
    };

    private roomImageLoadCompleteHandler = (param1: Event): void => {
        this._SafeStr_4041 = this._SafeStr_4041 + 1;
        if (this._SafeStr_4041 == this._numOfRooms) {
            this.initView();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
