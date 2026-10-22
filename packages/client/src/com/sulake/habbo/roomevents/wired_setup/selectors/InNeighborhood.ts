import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { FloorDrawingPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/FloorDrawingPreset';
import type { FloorEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/FloorEditorPreset';
import type { AssetButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonPreset';
import type { AssetButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonRowPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { NeighborhoodFloor } from '@/com/sulake/habbo/roomevents/wired_setup/common/NeighborhoodFloor';
import { SpiralUtils } from '@/com/sulake/habbo/roomevents/wired_setup/common/utils/SpiralUtils';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { AssetButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/AssetButtonParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';

export class InNeighborhood extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::InNeighborhood'); }

    private static _drawModes: any[] = ["add_tile", "remove_tile", "set_root_tile"];

    constructor() {
        super();
    }

    private _drawMode: string = "add_tile";

    declare private _SafeStr_2655: Point;

    declare private _floor: NeighborhoodFloor;

    declare private _SafeStr_4260: boolean;
    static { (this.prototype as any)._SafeStr_4260 = false; }

    declare private _floorEditorPreset: FloorEditorPreset;

    declare private _floorDrawingPreset: FloorDrawingPreset;

    declare private _SafeStr_4645: NamedNumberInputPreset;

    declare private _SafeStr_4590: NamedNumberInputPreset;

    declare private _drawButtonsByMode: any;

    private _preferBigMode: boolean = false;
    private _inBigMode: boolean = false;

    declare private _SafeStr_5596: AssetButtonPreset;

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override get widthModifier(): number {
        if (this._inBigMode) {
            return 1.7;
        }
        return 1;
    }

    public override onInit(param1: HabboUserDefinedRoomEvents): void {
        super.onInit(param1);
        this.setRootTileInternal(0, 0, false);
        let _loc2_: any[] = SpiralUtils.parseSpiralVector([], NeighborhoodFloor.RADIUS);
        this._floor = new NeighborhoodFloor(_loc2_, !this._preferBigMode, this.onDrawingChanged);
    }

    public override onEditStart(param1: Triggerable): void {
        this._inBigMode = this._preferBigMode;
        this._SafeStr_4260 = param1.getBoolean(0);
        this.setRootTileInternal(param1.intParams[1] | 0, param1.intParams[2] | 0, true);
        this.setMode("add_tile");
        let _loc2_: any[] = SpiralUtils.parseSpiralVector(param1.intParams.slice(3), NeighborhoodFloor.RADIUS);
        this._floor = new NeighborhoodFloor(_loc2_, !this._inBigMode, this.onDrawingChanged);
        if (!this._inBigMode && !this._floor.smallModeAllowed()) {
            this._floor.smallMode = false;
            this._inBigMode = true;
        }
        if (this._floorDrawingPreset != null) {
            this._floorDrawingPreset.setFloor(this._floor);
            this._floorDrawingPreset.setMode(this._drawMode);
        }
        this.updateResolutionButtonUI();
        this.roomEventsCtrl.resizeFrame();
    }

    public override onEditEnd(): void {
        super.onEditEnd();
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_4260 ? 1 : 0);
        _loc1_.push(this._SafeStr_2655.x);
        _loc1_.push(this._SafeStr_2655.y);
        return _loc1_.concat(SpiralUtils.createSpiralVector(this._floor.floorPlanCache, NeighborhoodFloor.RADIUS));
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.neighborhood";
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_4260 = param2 == WiredInputSourcePicker.USER_SOURCE;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_4260 ? WiredInputSourcePicker.USER_SOURCE : WiredInputSourcePicker._SafeStr_2178;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let xyRow: SimpleListViewPreset;
        let createdButtons: AssetButtonPreset[];
        let i: number = 0;
        let list: SimpleListViewPreset;
        let section: SectionPreset;
        let presetManager: PresetManager = param1;
        let wiredStyle: WiredStyle = param2;
        let builder: WiredUIBuilder = param3;
        let buttonConfigs: any[] = [new AssetButtonParam("add", "", (): void => {
                this.setMode(stringOrNull(InNeighborhood._drawModes[0]));
            }), new AssetButtonParam("remove", "", (): void => {
                this.setMode(stringOrNull(InNeighborhood._drawModes[1]));
            }, true), new AssetButtonParam("reference", "", (): void => {
                this.setMode(stringOrNull(InNeighborhood._drawModes[2]));
            }), new AssetButtonParam("enlarge_image", "", this.toggleScreenSize, false, true)];
        let buttonRow: AssetButtonRowPreset = presetManager.createAssetButtonRow(buttonConfigs);
        this._floorDrawingPreset = presetManager.createFloorDrawingPreset(this.onRootTileChangedFromPreset);
        this._floorEditorPreset = presetManager.createFloorEditorPreset(buttonRow, this._floorDrawingPreset);
        this._SafeStr_5596 = buttonRow.buttons[3];
        if (this._floor != null) {
            this._floorDrawingPreset.setFloor(this._floor);
            this._floorDrawingPreset.setRootTile(this._SafeStr_2655.x | 0, this._SafeStr_2655.y | 0);
            this._floorDrawingPreset.setMode(this._drawMode);
        }
        this._SafeStr_4645 = presetManager.createNamedNumberInput(new NumberInputParam(0, -64, 64, 20), "x:");
        this._SafeStr_4590 = presetManager.createNamedNumberInput(new NumberInputParam(0, -64, 64, 20), "y:");
        this._SafeStr_4645.onValueChange = this.onRootXChanged;
        this._SafeStr_4590.onValueChange = this.onRootYChanged;
        xyRow = presetManager.createSimpleListView(false, [this._SafeStr_4645, this._SafeStr_4590]);
        xyRow.spacing = wiredStyle.genericHorizontalSpacing;
        this._drawButtonsByMode = {};
        createdButtons = buttonRow.buttons;
        i = 0;
        while (i < InNeighborhood._drawModes.length && i < createdButtons.length) {
            this._drawButtonsByMode[InNeighborhood._drawModes[i]] = createdButtons[i];
            i = i + 1;
        }
        this.setMode(this._drawMode);
        list = presetManager.createSimpleListView(true, [this._floorEditorPreset, xyRow.alignRight()]);
        section = presetManager.createSection(this.l("neighborhood_selection"), list);
        builder.addElements(section);
    }

    private updateResolutionButtonUI(): void {
        this._SafeStr_5596.disabled = !this._floor.smallModeAllowed();
        this._SafeStr_5596.assetName = this._inBigMode ? "reduce_image" : "enlarge_image";
    }

    private setMode(param1: string): void {
        let _loc2_: AssetButtonPreset = null;
        this._drawMode = param1;
        if (this._floorDrawingPreset != null) {
            this._floorDrawingPreset.setMode(this._drawMode);
        }
        if (this._drawButtonsByMode == null) {
            return;
        }
        for (const _loc3_ of InNeighborhood._drawModes ?? []) {
            _loc2_ = this._drawButtonsByMode[_loc3_];
            if (_loc2_ != null) {
                _loc2_.selected = this._drawMode == _loc3_;
            }
        }
    }

    private updateRootInputText(): void {
        if (this._SafeStr_4645 != null) {
            this._SafeStr_4645.value = this._SafeStr_2655.x | 0;
        }
        if (this._SafeStr_4590 != null) {
            this._SafeStr_4590.value = this._SafeStr_2655.y | 0;
        }
    }

    private setRootTileInternal(param1: number, param2: number, param3: boolean): void {
        if (this._SafeStr_2655 == null) {
            this._SafeStr_2655 = new Point(param1, param2);
        } else {
            this._SafeStr_2655.x = param1;
            this._SafeStr_2655.y = param2;
        }
        this.updateRootInputText();
        if (param3 && this._floorDrawingPreset != null) {
            this._floorDrawingPreset.setRootTile(param1, param2);
        }
    }

    private onRootXChanged = (param1: number): void => {
        this.setRootTileInternal(param1, this._SafeStr_2655.y | 0, true);
    };

    private onRootYChanged = (param1: number): void => {
        this.setRootTileInternal(this._SafeStr_2655.x | 0, param1, true);
    };

    private onRootTileChangedFromPreset = (param1: number, param2: number): void => {
        this.setRootTileInternal(param1, param2, false);
    };

    private toggleScreenSize = (): void => {
        this._inBigMode = !this._inBigMode;
        this._preferBigMode = this._inBigMode;
        this._floor.smallMode = !this._inBigMode;
        this._floorDrawingPreset.setFloor(this._floor);
        this.updateResolutionButtonUI();
        this.roomEventsCtrl.resizeFrame();
    };

    private onDrawingChanged = (): void => {
        this.updateResolutionButtonUI();
    };
}
