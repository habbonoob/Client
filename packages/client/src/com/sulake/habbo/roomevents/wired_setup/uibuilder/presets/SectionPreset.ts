import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CollapseExpandSectionButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CollapseExpandSectionButtonPreset';
import type { SplitterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SplitterPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class SectionPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::SectionPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: WiredUIPreset, param6: SectionParam = null) {
        let _loc8_: SourceTypeSelectorPreset = null;
        let _loc9_: CollapseExpandSectionButtonPreset = null;
        super(param1, param2, param3);
        if (param6 == null) {
            param6 = SectionParam.DEFAULT;
        }
        this._container = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_3101 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._container.spacing = param3.sectionSpacing;
        this._SafeStr_3101.spacing = param3.sectionSpacing;
        this._SafeStr_3101.x = param3.sectionLeftRightMargin;
        this._headerOptionsRight = [];
        this._headerContainer = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._headerLeft = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._headerLeft.spacing = param3.genericHorizontalSpacing;
        this._headerOptionsRightList = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._headerOptionsRightList.spacing = param3.genericHorizontalSpacing;
        this._splitter = param2.createSplitter();
        this._SafeStr_2702 = param5;
        this._headerOptionLeft = param6 != null ? param6.headerOptionLeft : null;
        let _loc7_: TextParam = new TextParam(this._headerOptionLeft == null ? 1 : 0, true);
        this._title = param2.createText(param4, _loc7_);
        if (param6 != null && param6.titleYOffset > 0) {
            this._title.window.y = param6.titleYOffset;
        }
        this._headerLeft.addListItem(this._title.window);
        if (this._headerOptionLeft != null) {
            this._headerLeft.addListItem(this._headerOptionLeft.window);
        }
        this._headerContainer.addChild(this._headerLeft);
        this._headerContainer.addChild(this._headerOptionsRightList);
        this._container.addListItem(this._splitter.window);
        this._SafeStr_3101.addListItem(this._headerContainer);
        if (param6.expandMode != SectionParam._SafeStr_7511) {
            this._SafeStr_3101.addListItem(this._SafeStr_2702.window);
        }
        this._container.addListItem(this._SafeStr_3101);
        for (const _loc10_ of param6.miscHeaderOptions ?? []) {
            this.addHeaderOption(_loc10_);
        }
        if (param6.sourceTypeSelectorParam != null) {
            _loc8_ = param2.createSourceTypeSelector(param6.sourceTypeSelectorParam);
            this.addHeaderOption(_loc8_);
        }
        if (param6.expandMode != SectionParam._SafeStr_7491) {
            _loc9_ = param2.createCollapseExpandSectionButton(this.onExpandCollapseClicked, param6.expandMode == SectionParam._SafeStr_7507);
            this.addHeaderOption(_loc9_);
        }
    }

    declare private _container: IItemListWindow;

    declare private _SafeStr_3101: IItemListWindow;

    declare private _headerContainer: IWindowContainer;

    declare private _headerOptionsRightList: IItemListWindow;

    declare private _headerLeft: IItemListWindow;

    declare private _expectedWidth: number;
    static { (this.prototype as any)._expectedWidth = 0; }

    declare private _splitter: SplitterPreset;

    declare private _title: TextPreset;

    declare private _headerOptionsRight: WiredUIPreset[];

    declare private _SafeStr_2702: WiredUIPreset;

    declare private _headerOptionLeft: WiredUIPreset;

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        let _loc1_: any[] = [this._splitter, this._title, this._SafeStr_2702];
        if (this._headerOptionLeft != null) {
            _loc1_.push(this._headerOptionLeft);
        }
        if (this._headerOptionsRight != null) {
            return _loc1_.concat(WiredUIPreset.toArray(this._headerOptionsRight));
        }
        return _loc1_;
    }

    public set titleText(param1: string) {
        this._title.text = param1;
    }

    public set splitterVisible(param1: boolean) {
        this._splitter.visible = param1;
    }

    public override resizeToWidth(param1: number): void {
        if (this.disposed || this._container == null) {
            return;
        }
        super.resizeToWidth(param1);
        this._expectedWidth = param1;
        let _loc4_: number = param1 - 2 * this._SafeStr_2144.sectionLeftRightMargin;
        this._splitter.resizeToWidth(param1);
        this._SafeStr_2702.resizeToWidth(_loc4_);
        let _loc3_: number = 0;
        for (const _loc5_ of this._headerOptionsRight ?? []) {
            _loc5_.resizeToWidth(_loc5_.staticWidth);
            if (_loc5_.window.bottom > _loc3_) {
                _loc3_ = _loc5_.window.bottom;
            }
        }
        this._headerOptionsRightList.x = _loc4_ - this._headerOptionsRightList.width;
        this._headerOptionsRightList.height = _loc3_;
        let _loc2_: number = this._title.window.height;
        if (this._headerOptionLeft != null) {
            this._headerOptionLeft.resizeToWidth(this._headerOptionLeft.staticWidth);
            this._title.resizeToWidth(this._title.staticWidth);
            if (this._headerOptionLeft.window.height > _loc2_) {
                _loc2_ = this._headerOptionLeft.window.height;
            }
        } else {
            this._title.resizeToWidth(_loc4_ - this._headerOptionsRightList.width - this._SafeStr_2144.genericHorizontalSpacing);
            _loc2_ = this._title.window.height;
        }
        this._headerLeft.height = _loc2_;
        this._headerContainer.width = _loc4_;
        this._headerContainer.height = Math.max(_loc3_, _loc2_) | 0;
        this._container.width = param1;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_3101 = null;
        this._headerContainer = null;
        this._headerOptionsRightList = null;
        this._splitter = null;
        this._title = null;
        this._SafeStr_2702 = null;
        this._headerLeft = null;
        this._headerOptionLeft = null;
    }

    public addHeaderOption(param1: WiredUIPreset): void {
        this._headerOptionsRightList.addListItem(param1.window);
        this._headerOptionsRight.push(param1);
    }

    public onExpandCollapseClicked = (param1: boolean): void => {
        if (param1) {
            this._SafeStr_3101.addListItem(this._SafeStr_2702.window);
        } else {
            this._SafeStr_3101.removeListItem(this._SafeStr_2702.window);
        }
    };

    public getSourceTypeSelector(): SourceTypeSelectorPreset {
        for (const _loc1_ of this._headerOptionsRight ?? []) {
            if (_loc1_ instanceof SourceTypeSelectorPreset) {
                return _loc1_ instanceof SourceTypeSelectorPreset ? _loc1_ : null;
            }
        }
        return null;
    }

    public refreshAlignments(): void {
        this.resizeToWidth(this._expectedWidth);
    }
}
