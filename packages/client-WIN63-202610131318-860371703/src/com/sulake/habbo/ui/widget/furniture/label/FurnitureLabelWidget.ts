import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetFurnitureLabelUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFurnitureLabelUpdateEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import { _SafeCls_6113 } from '@/com/sulake/habbo/ui/handler/_SafeCls_6113';
import { FurnitureLabelSettingsView } from '@/com/sulake/habbo/ui/widget/furniture/label/FurnitureLabelSettingsView';
import { FurnitureLabelView } from '@/com/sulake/habbo/ui/widget/furniture/label/FurnitureLabelView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class FurnitureLabelWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.label::FurnitureLabelWidget'); }

    declare private _SafeStr_14601: _SafeCls_6113;

    declare private _root: IWindowContainer;

    declare private _SafeStr_2424: UtilsMap;

    declare private _SafeStr_14602: FurnitureLabelSettingsView;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
        this._SafeStr_2424 = new UtilsMap();
        this._root = asGuarded(param2.createWindow("room_widget_furniture_label_background_container", "", 4, 0, 16, new Rectangle(0, 0, 10, 10)), isIWindowContainer);
        this._root.desktop.addChild(this._root);
        this.resizeRootToDesktop();
        this._root.addEventListener("WE_ACTIVATE", this.onRootActivate);
        this._root.addEventListener("WE_PARENT_RESIZED", this.resizeRootToDesktop);
        this._SafeStr_14601 = castTo(param1, _SafeCls_6113);
        this._SafeStr_14601.widget = this;
    }

    public override get mainWindow(): IWindow {
        return this._root;
    }

    public toggleLabel(param1: number, param2: number): void {
        let _loc4_: FurnitureLabelData = this.getLabelData(param1, param2);
        if (!this.canView(_loc4_)) {
            this.removeLabel(param2);
            return;
        }
        let _loc3_: FurnitureLabelView = asInstanceOf(this._SafeStr_2424.getValue(param2), FurnitureLabelView);
        if (_loc3_ != null && _loc3_.isOpen) {
            _loc3_.setOpen(false);
            return;
        }
        if (_loc3_ == null) {
            _loc3_ = this.createView(param1, param2);
            _loc3_.applyData(_loc4_, this._SafeStr_14601.canModify);
        }
        _loc3_.setOpen(true);
    }

    public hoverLabel(param1: number, param2: number, param3: boolean): void {
        let _loc4_: FurnitureLabelView = asInstanceOf(this._SafeStr_2424.getValue(param2), FurnitureLabelView);
        if (!param3) {
            if (_loc4_ != null) {
                _loc4_.setHovered(false);
            }
            return;
        }
        let _loc5_: FurnitureLabelData = this.getLabelData(param1, param2);
        if (!this.canView(_loc5_)) {
            this.removeLabel(param2);
            return;
        }
        if (_loc4_ == null) {
            _loc4_ = this.createView(param1, param2);
            _loc4_.applyData(_loc5_, this._SafeStr_14601.canModify);
        }
        _loc4_.setHovered(true);
    }

    public refreshLabel(param1: number, param2: number): void {
        let _loc4_: FurnitureLabelData = this.getLabelData(param1, param2);
        if (!this.canView(_loc4_)) {
            this.removeLabel(param2);
            return;
        }
        let _loc3_: FurnitureLabelView = asInstanceOf(this._SafeStr_2424.getValue(param2), FurnitureLabelView);
        if (_loc3_ == null) {
            if (!_loc4_.alwaysOpen) {
                return;
            }
            _loc3_ = this.createView(param1, param2);
        }
        _loc3_.applyData(_loc4_, this._SafeStr_14601.canModify);
    }

    public removeLabel(param1: number): void {
        let _loc2_: FurnitureLabelView = asInstanceOf(this._SafeStr_2424.remove(param1), FurnitureLabelView);
        if (_loc2_ != null) {
            _loc2_.dispose();
        }
    }

    public permissionsChanged(param1: boolean, param2: boolean): void {
        let _loc4_: FurnitureLabelView = null;
        let _loc5_: FurnitureLabelData = null;
        if (!param2 && this._SafeStr_14602 != null) {
            this._SafeStr_14602.close();
        }
        let _loc3_: any[] = this._SafeStr_2424.getKeys();
        for (const _loc6_ of _loc3_ ?? []) {
            _loc4_ = asInstanceOf(this._SafeStr_2424.getValue(_loc6_), FurnitureLabelView);
            _loc5_ = this.getLabelData(_loc4_.roomId, _loc6_ | 0);
            if (!this.canView(_loc5_)) {
                this.removeLabel(_loc6_ | 0);
            } else {
                _loc4_.applyData(_loc5_, param2);
            }
        }
    }

    public updatePositions(): void {
        for (const _loc1_ of this._SafeStr_2424.getValues() ?? []) {
            if (_loc1_.needsPositionUpdate) {
                _loc1_.updatePosition(this._SafeStr_14601.container.roomEngine, this._SafeStr_14601.container.getFirstCanvasId(), this._SafeStr_14601.container.getRoomViewRect());
            }
        }
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWROUE_OBJECT_SELECTED", this.onRoomObjectUpdate);
        param1.addEventListener("RWROUE_OBJECT_ROLL_OVER", this.onRoomObjectUpdate);
        param1.addEventListener("RWROUE_OBJECT_ROLL_OUT", this.onRoomObjectUpdate);
        param1.addEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectUpdate);
        param1.addEventListener("RWFLE_FURNITURE_LABEL_UPDATED", this.onFurnitureLabelUpdate);
        param1.addEventListener("RWFLE_FURNITURE_LABEL_SETTINGS_OPEN", this.onSettingsOpen);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWROUE_OBJECT_SELECTED", this.onRoomObjectUpdate);
        param1.removeEventListener("RWROUE_OBJECT_ROLL_OVER", this.onRoomObjectUpdate);
        param1.removeEventListener("RWROUE_OBJECT_ROLL_OUT", this.onRoomObjectUpdate);
        param1.removeEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectUpdate);
        param1.removeEventListener("RWFLE_FURNITURE_LABEL_UPDATED", this.onFurnitureLabelUpdate);
        param1.removeEventListener("RWFLE_FURNITURE_LABEL_SETTINGS_OPEN", this.onSettingsOpen);
        super.unregisterUpdateEvents(param1);
    }

    private onRoomObjectUpdate = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        if (param1.category != 10) {
            return;
        }
        switch (param1.type) {
            case "RWROUE_OBJECT_SELECTED":
                if (!param1.modifierKey) {
                    this.toggleLabel(param1.roomId, param1.id);
                }
                break;
            case "RWROUE_OBJECT_ROLL_OVER":
                this.hoverLabel(param1.roomId, param1.id, true);
                break;
            case "RWROUE_OBJECT_ROLL_OUT":
                this.hoverLabel(param1.roomId, param1.id, false);
                break;
            case "RWROUE_FURNI_REMOVED":
                this.removeLabel(param1.id);
        }
    };

    private onFurnitureLabelUpdate = (param1: RoomWidgetFurnitureLabelUpdateEvent): void => {
        this.refreshLabel(param1.roomId, param1.furnitureId);
    };

    private onSettingsOpen = (param1: RoomWidgetFurnitureLabelUpdateEvent): void => {
        if (!this._SafeStr_14601.canModify) {
            return;
        }
        let _loc2_: FurnitureLabelData = this.getLabelData(param1.roomId, param1.furnitureId);
        if (_loc2_ == null || _loc2_.type != 0) {
            return;
        }
        if (this._SafeStr_14602 == null) {
            this._SafeStr_14602 = new FurnitureLabelSettingsView(this, this._SafeStr_14601);
        }
        this._SafeStr_14602.open(param1.furnitureId, _loc2_);
    };

    private createView(param1: number, param2: number): FurnitureLabelView {
        let _loc3_: FurnitureLabelView = new FurnitureLabelView(this, this._SafeStr_14601, this._root, param1, param2);
        this._SafeStr_2424.add(param2, _loc3_);
        return _loc3_;
    }

    private getLabelData(param1: number, param2: number): FurnitureLabelData {
        let _loc3_: IRoomObject = this._SafeStr_14601.container.roomEngine.getRoomObject(param1, param2, 10);
        if (_loc3_ == null) {
            return null;
        }
        return asInstanceOf(_loc3_.getModel().getObject("furniture_label_data"), FurnitureLabelData);
    }

    private canView(param1: FurnitureLabelData): boolean {
        if (param1 == null) {
            return false;
        }
        return param1.type == 0 ? param1.visibility == 0 || this._SafeStr_14601.canRead : this._SafeStr_14601.canRead;
    }

    private disposeViews(): void {
        for (const _loc1_ of this._SafeStr_2424.getValues() ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_2424.reset();
    }

    private onRootActivate = (param1: WindowEvent): void => {
        param1.stopPropagation();
    };

    private resizeRootToDesktop = (param1: WindowEvent = null): void => {
        this._root.width = this._root.desktop.width;
        this._root.height = this._root.desktop.height;
    };

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_14601.widget = null;
        if (this._SafeStr_14602 != null) {
            this._SafeStr_14602.dispose();
            this._SafeStr_14602 = null;
        }
        this.disposeViews();
        this._SafeStr_2424.dispose();
        this._SafeStr_2424 = null;
        this._root.removeEventListener("WE_ACTIVATE", this.onRootActivate);
        this._root.removeEventListener("WE_PARENT_RESIZED", this.resizeRootToDesktop);
        this._root.dispose();
        this._root = null;
        this._SafeStr_14601 = null;
        super.dispose();
    }
}
