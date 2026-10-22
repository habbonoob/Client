import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomChatWidget } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { RoomChatHistoryPulldown } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatHistoryPulldown';

export class RoomChatHistoryViewer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomchat::RoomChatHistoryViewer'); }

    private static readonly CHAT_ITEM_HEIGHT: number = 18;
    private static readonly SCROLLBAR_WIDTH: number = 20;
    public static readonly MOUSE_HYSTERESIS_TOLERANCE: number = 3;

    constructor(param1: RoomChatWidget, param2: IHabboWindowManager, param3: IWindowContainer, param4: IAssetLibrary) {
        this._disposed = false;
        this._widget = param1;
        this._historyPulldown = new RoomChatHistoryPulldown(param1, param2, param3, param4);
        this._historyPulldown.state = 0;
        let _loc5_: IItemListWindow = asGuarded(param3.getChildByName("chat_contentlist"), isIItemListWindow);
        if (_loc5_ == null) {
            return;
        }
        param3.removeChild(_loc5_);
        param3.addChild(_loc5_);
        this._SafeStr_2195 = asGuarded(param2.createWindow("chatscroller", "", 131, 0, (0x10 | 0) >>> 0, new Rectangle(param3.right - 20, param3.y, 20, param3.height - 39), null, 0), isIScrollbarWindow);
        param3.addChild(this._SafeStr_2195);
        this._SafeStr_2195.visible = false;
        this._SafeStr_2195.scrollable = isIScrollableWindow(_loc5_) ? _loc5_ : null;
    }

    declare private _historyPulldown: RoomChatHistoryPulldown;

    private _historyViewerActive: boolean = false;
    private _historyViewerDragStartY: number = -1;

    declare private _SafeStr_2195: IScrollbarWindow;

    private _SafeStr_2662: number = 1;
    private _disabled: boolean = false;

    declare private _widget: RoomChatWidget;

    private _disposed: boolean = false;
    private _SafeStr_5942: boolean = false;
    private _SafeStr_5048: boolean = false;

    public set disabled(param1: boolean) {
        this._disabled = param1;
    }

    public get active(): boolean {
        return this._historyViewerActive;
    }

    public get scrollbarWidth(): number {
        return this._historyViewerActive ? 20 : 0;
    }

    public get pulldownBarHeight(): number {
        return 39;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get visible(): boolean {
        if (this._historyPulldown == null) {
            return false;
        }
        return this._historyPulldown.state == 1 || this._historyPulldown.state == 2;
    }

    public set visible(param1: boolean) {
        if (this._historyPulldown == null || this._disabled) {
            return;
        }
        this._historyPulldown.state = param1 ? 1 : 0;
    }

    public dispose(): void {
        this.hideHistoryViewer();
        if (this._SafeStr_2195 != null) {
            this._SafeStr_2195.dispose();
            this._SafeStr_2195 = null;
        }
        if (this._historyPulldown != null) {
            this._historyPulldown.dispose();
            this._historyPulldown = null;
        }
        this._disposed = true;
    }

    public update(param1: number): void {
        if (this._historyPulldown != null) {
            this._historyPulldown.update(param1);
        }
        this.moveHistoryScroll();
    }

    public toggleHistoryViewer(): void {
        if (this._historyViewerActive) {
            this.hideHistoryViewer();
        } else {
            this.showHistoryViewer();
        }
    }

    public hideHistoryViewer(): void {
        this._SafeStr_2662 = 1;
        this.cancelDrag();
        this._historyViewerActive = false;
        this.setHistoryViewerScrollbar(false);
        if (this._historyPulldown != null) {
            this._historyPulldown.state = 0;
        }
        if (this._widget != null) {
            this._widget.resetArea();
            this._widget.enableDragTooltips();
            if (this._widget.handler && this._widget.handler.container && this._widget.handler.container.toolbar && this._widget.handler.container.toolbar.extensionView) {
                this._widget.handler.container.toolbar.extensionView.extraMargin = 0;
            }
        }
    }

    public showHistoryViewer(): void {
        let _loc1_: any = null;
        let _loc3_: number = 0;
        let _loc2_: any = null;
        if (!this._historyViewerActive && !this._disabled) {
            this._historyViewerActive = true;
            this.setHistoryViewerScrollbar(true);
            this._historyPulldown.state = 1;
            if (this._widget != null) {
                this._widget.reAlignItemsToHistoryContent();
                this._widget.disableDragTooltips();
            }
        }
    }

    public containerResized(param1: Rectangle, param2: boolean = false): void {
        if (this._SafeStr_2195 != null) {
            this._SafeStr_2195.x = param1.x + param1.width - this._SafeStr_2195.width | 0;
            this._SafeStr_2195.y = param1.y | 0;
            this._SafeStr_2195.height = param1.height - 39 | 0;
            if (param2) {
                this._SafeStr_2195.scrollV = this._SafeStr_2662;
            }
        }
        if (this._historyPulldown != null) {
            this._historyPulldown.containerResized(param1);
        }
    }

    public beginDrag(param1: number, param2: boolean = false): void {
        let _loc3_: DisplayObject = null;
        let _loc4_: Stage = null;
        if (this._disabled) {
            return;
        }
        this._historyViewerDragStartY = param1;
        this._SafeStr_5942 = param2;
        this._SafeStr_5048 = true;
        if (this._SafeStr_2195 != null) {
            this._SafeStr_2662 = this._SafeStr_2195.scrollV;
        }
        if (this._SafeStr_2195 != null) {
            _loc3_ = this._SafeStr_2195.context.getDesktopWindow().getDisplayObject();
            if (_loc3_ != null) {
                _loc4_ = _loc3_.stage;
                if (_loc4_ != null) {
                    _loc4_.addEventListener("mouseMove", this.onStageMouseMove);
                    _loc4_.addEventListener("mouseUp", this.onStageMouseUp);
                }
            }
        }
    }

    public cancelDrag(): void {
        let _loc1_: DisplayObject = null;
        let _loc2_: Stage = null;
        this._historyViewerDragStartY = -1;
        if (this._SafeStr_2195 != null) {
            _loc1_ = this._SafeStr_2195.context.getDesktopWindow().getDisplayObject();
            if (_loc1_ != null) {
                _loc2_ = _loc1_.stage;
                if (_loc2_ != null) {
                    _loc2_.removeEventListener("mouseMove", this.onStageMouseMove);
                    _loc2_.removeEventListener("mouseUp", this.onStageMouseUp);
                }
            }
        }
    }

    private setHistoryViewerScrollbar(param1: boolean): void {
        if (this._SafeStr_2195 != null) {
            this._SafeStr_2195.visible = param1;
            if (param1) {
                this._SafeStr_2195.scrollV = 1;
                this._SafeStr_2662 = 1;
            } else {
                this._historyViewerActive = false;
                this._historyViewerDragStartY = -1;
            }
        }
    }

    private processDrag(param1: number, param2: boolean = false): void {
        let _loc8_: number = NaN;
        let _loc4_: number = NaN;
        let _loc5_: number = NaN;
        let _loc3_: number = 0;
        let _loc6_: boolean = false;
        let _loc7_: boolean = false;
        if (this._historyViewerDragStartY > 0 && param2) {
            if (this._SafeStr_5048) {
                if (Math.abs(param1 - this._historyViewerDragStartY) <= 3) {
                    return;
                }
                this._SafeStr_5048 = false;
            }
            if (!this._historyViewerActive) {
                this._widget.resizeContainerToLowestItem();
                this.showHistoryViewer();
                this.moveHistoryScroll();
            }
            if (this._historyViewerActive) {
                if (this._widget && this._widget.handler && this._widget.handler.container && this._widget.handler.container.toolbar && this._widget.handler.container.toolbar.extensionView) {
                    this._widget.handler.container.toolbar.extensionView.extraMargin = 20;
                }
                this.moveHistoryScroll();
                _loc4_ = this._SafeStr_2195.scrollable.scrollableRegion.height / this._SafeStr_2195.scrollable.visibleRegion.height;
                _loc5_ = (param1 - this._historyViewerDragStartY) / this._SafeStr_2195.height;
                _loc8_ = this._SafeStr_2662 - _loc5_ / _loc4_;
                _loc8_ = Math.max(0, _loc8_);
                _loc8_ = Math.min(1, _loc8_);
                _loc3_ = param1 - this._historyViewerDragStartY | 0;
                _loc6_ = true;
                _loc7_ = true;
                if (this._SafeStr_2195.scrollV < 1 - 18 / this._SafeStr_2195.scrollable.scrollableRegion.height) {
                    _loc7_ = false;
                }
                if (_loc7_ || this._SafeStr_5942) {
                    this._widget.stretchAreaBottomBy(_loc3_);
                    _loc6_ = false;
                    this._SafeStr_2662 = 1;
                    this._SafeStr_2195.scrollV = 1;
                }
                if (_loc6_) {
                    this._SafeStr_2662 = _loc8_;
                }
                this._historyViewerDragStartY = param1;
            }
        } else {
            this._historyViewerDragStartY = -1;
        }
    }

    private moveHistoryScroll(): void {
        if (!this._historyViewerActive) {
            return;
        }
        if (this._historyViewerDragStartY < 0) {
            return;
        }
        if (this._SafeStr_5942) {
            return;
        }
        let _loc1_: number = this._SafeStr_2662 - this._SafeStr_2195.scrollV;
        if (_loc1_ == 0) {
            return;
        }
        if (Math.abs(_loc1_) < 0.01) {
            this._SafeStr_2195.scrollV = this._SafeStr_2662;
        } else {
            this._SafeStr_2195.scrollV += _loc1_ / 2;
        }
    }

    private onStageMouseUp = (param1: MouseEvent): void => {
        this.cancelDrag();
        if (this._widget != null) {
            this._widget.mouseUp();
        }
    };

    private onStageMouseMove = (param1: MouseEvent): void => {
        this.processDrag(param1.stageY, param1.buttonDown);
    };

    get [IDisposable](): true {
        return true;
    }
}
