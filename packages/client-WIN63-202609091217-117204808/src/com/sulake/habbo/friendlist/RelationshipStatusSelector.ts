import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';

export class RelationshipStatusSelector implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::RelationshipStatusSelector'); }

    declare private _friendList: HabboFriendList;

    declare private _window: IBorderWindow;

    declare private _friendId: number;
    static { (this.prototype as any)._friendId = 0; }

    private _disposed: boolean = false;

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
        this.createWindow();
    }

    public dispose(): void {
        if (!this._disposed) {
            this.destroyWindow();
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public appearAt(param1: IWindow, param2: IWindow): void {
        let _loc3_: Point = new Point();
        param1.getGlobalPosition(_loc3_);
        this._window.x = _loc3_.x | 0;
        this._window.y = _loc3_.y | 0;
        this._window.visible = true;
        this._window.activate();
    }

    public disappear(): void {
        this._window.visible = false;
    }

    public set friendId(param1: number) {
        this._friendId = param1;
    }

    private createWindow(): void {
        this._window = castGuarded(this._friendList.windowManager.buildFromXML(XML.from(this._friendList.assets.getAssetByName("relationship_chooser_xml").content)), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        this._window.procedure = this.onWindowEvent;
        this._window.visible = false;
    }

    private destroyWindow(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "item_none":
                    this._friendList.setRelationshipStatus(this._friendId, 0);
                    break;
                case "item_heart":
                    this._friendList.setRelationshipStatus(this._friendId, 1);
                    break;
                case "item_smile":
                    this._friendList.setRelationshipStatus(this._friendId, 2);
                    break;
                case "item_bobba":
                    this._friendList.setRelationshipStatus(this._friendId, 3);
            }
            this._window.visible = false;
        }
        if (param1.type == "WE_UNFOCUSED") {
            this._window.visible = false;
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
