import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLibraryCollection } from '@/com/sulake/core/assets/AssetLibraryCollection';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ActionDefinition } from '@/com/sulake/habbo/avatar/actions/ActionDefinition';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';
import type { AddDataContainer } from '@/com/sulake/habbo/avatar/animation/AddDataContainer';
import type { AvatarRenderManager } from '@/com/sulake/habbo/avatar/AvatarRenderManager';
import type { GeometryBodyPart } from '@/com/sulake/habbo/avatar/geometry/GeometryBodyPart';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { AnimationActionPart } from '@/com/sulake/habbo/avatar/structure/animation/AnimationActionPart';
import type { AvatarCanvas } from '@/com/sulake/habbo/avatar/structure/AvatarCanvas';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import type { PartDefinition } from '@/com/sulake/habbo/avatar/structure/parts/PartDefinition';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { AvatarActionManager } from '@/com/sulake/habbo/avatar/actions/AvatarActionManager';
import { Animation } from '@/com/sulake/habbo/avatar/animation/Animation';
import { AnimationLayerData } from '@/com/sulake/habbo/avatar/animation/AnimationLayerData';
import { AnimationManager } from '@/com/sulake/habbo/avatar/animation/AnimationManager';
import { AvatarImagePartContainer } from '@/com/sulake/habbo/avatar/AvatarImagePartContainer';
import { AvatarDirectionAngle } from '@/com/sulake/habbo/avatar/enum/AvatarDirectionAngle';
import { AvatarModelGeometry } from '@/com/sulake/habbo/avatar/geometry/AvatarModelGeometry';
import { AnimationAction } from '@/com/sulake/habbo/avatar/structure/animation/AnimationAction';
import { AnimationData } from '@/com/sulake/habbo/avatar/structure/AnimationData';
import { FigureSetData } from '@/com/sulake/habbo/avatar/structure/FigureSetData';
import { PartSetsData } from '@/com/sulake/habbo/avatar/structure/PartSetsData';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AvatarStructure extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarStructure'); }

    static #staticsReady = false;

    private static get _log_AvatarStructure(): SimpleLogger {
        AvatarStructure.#initStatics();
        return AvatarStructure._log_AvatarStructure;
    }

    constructor(param1: AvatarRenderManager) {
        super();
        this._renderManager = param1;
        this._figureData = new FigureSetData();
        this._SafeStr_2862 = new PartSetsData();
        this._SafeStr_2337 = new AnimationData();
        this._animationManager = new AnimationManager();
        this._SafeStr_2887 = new Dictionary();
    }

    declare private _renderManager: AvatarRenderManager;

    declare private _geometry: AvatarModelGeometry;

    declare private _SafeStr_2813: AvatarActionManager;

    declare private _figureData: FigureSetData;

    declare private _SafeStr_2862: PartSetsData;

    declare private _SafeStr_2337: AnimationData;

    declare private _animationManager: AnimationManager;

    declare private _defaultAction: ActionDefinition;

    declare private _SafeStr_3621: ActionDefinition;

    declare private _SafeStr_2887: Map<any, any>;

    public get figureData(): IFigureSetData {
        return this._figureData;
    }

    public get animationManager(): AnimationManager {
        return this._animationManager;
    }

    public get renderManager(): AvatarRenderManager {
        return this._renderManager;
    }

    public override dispose(): void {
        if (!this.disposed) {
            super.dispose();
            this._renderManager = null;
            this._figureData = null;
            this._SafeStr_2862 = null;
            this._SafeStr_2337 = null;
            this._SafeStr_2887 = null;
        }
    }

    public init(): void {
        this._SafeStr_2887 = new Dictionary();
    }

    public initGeometry(param1: XML): void {
        if (!param1) {
            return;
        }
        this._geometry = new AvatarModelGeometry(param1);
    }

    public initActions(param1: IAssetLibrary, param2: XML): void {
        if (!param2) {
            return;
        }
        this._SafeStr_2813 = new AvatarActionManager(param1, param2);
        this._defaultAction = this._SafeStr_2813.getDefaultAction();
        this._SafeStr_3621 = this._SafeStr_2813.getDefaultLayAction();
    }

    public updateActions(param1: XML): void {
        this._SafeStr_2813.updateActions(param1);
        this._defaultAction = this._SafeStr_2813.getDefaultAction();
        this._SafeStr_3621 = this._SafeStr_2813.getDefaultLayAction();
    }

    public initPartSets(param1: XML): boolean {
        if (!param1) {
            return false;
        }
        if (this._SafeStr_2862.parse(param1)) {
            this._SafeStr_2862.getPartDefinition("ri").appendToFigure = true;
            this._SafeStr_2862.getPartDefinition("li").appendToFigure = true;
            return true;
        }
        return false;
    }

    public initAnimation(param1: XML): boolean {
        if (!param1) {
            return false;
        }
        return this._SafeStr_2337.parse(param1);
    }

    public initFigureData(param1: XML): boolean {
        if (!param1) {
            return false;
        }
        return this._figureData.parse(param1);
    }

    public injectFigureData(param1: XML): void {
        this._figureData.injectXML(param1);
    }

    public registerAnimations(param1: AssetLibraryCollection, param2: string = "fx", param3: number = 200): void {
        let _loc4_: XML = null;
        let _loc5_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < param3) {
            if (param1.hasAsset(param2 + _loc5_)) {
                _loc4_ = asInstanceOf(param1.getAssetByName(param2 + _loc5_).content, XML);
                this._animationManager.registerAnimation(this, _loc4_);
            }
            _loc5_++;
        }
    }

    public registerAnimation(param1: XML): void {
        this._animationManager.registerAnimation(this, param1);
    }

    public getPartColor(param1: IAvatarFigureContainer, param2: string, param3: number = 0): IPartColor {
        let _loc4_: any[] = param1.getPartColorIds(param2);
        if (!_loc4_ || _loc4_.length < param3) {
            return null;
        }
        let _loc6_: ISetType = this._figureData.getSetType(param2);
        if (_loc6_ == null) {
            return null;
        }
        let _loc5_: IPalette = this._figureData.getPalette(_loc6_.paletteID);
        if (!_loc5_) {
            return null;
        }
        return _loc5_.getColor(_loc4_[param3] | 0);
    }

    public getBodyPartData(param1: string, param2: number, param3: string): AnimationLayerData {
        return asInstanceOf(this._animationManager.getLayerData(param1, param2, param3), AnimationLayerData);
    }

    public getAnimation(param1: string): Animation {
        return asInstanceOf(this._animationManager.getAnimation(param1), Animation);
    }

    public getActionDefinition(param1: string): ActionDefinition {
        return this._SafeStr_2813.getActionDefinition(param1);
    }

    public getDefaultActionDefinition(): ActionDefinition {
        return this._defaultAction;
    }

    public getDefaultLayActionDefinition(): ActionDefinition {
        return this._SafeStr_3621;
    }

    public getActionDefinitionWithState(param1: string): ActionDefinition {
        return this._SafeStr_2813.getActionDefinitionWithState(param1);
    }

    public isMainAvatarSet(param1: string): boolean {
        return this._geometry.isMainAvatarSet(param1);
    }

    public sortActions(param1: any[]): any[] {
        return this._SafeStr_2813.sortActions(param1);
    }

    public maxFrames(param1: any[]): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = Math.max(_loc2_, this._SafeStr_2337.getFrameCount(_loc3_.definition)) | 0;
        }
        return _loc2_;
    }

    public getMandatorySetTypeIds(param1: string, param2: number): any[] {
        if (!this._SafeStr_2887.get(param1)) {
            this._SafeStr_2887.set(param1, new Dictionary());
        }
        if (this._SafeStr_2887.get(param1)[param2]) {
            return this._SafeStr_2887.get(param1)[param2];
        }
        this._SafeStr_2887.get(param1)[param2] = this._figureData.getMandatorySetTypeIds(param1, param2);
        return this._SafeStr_2887.get(param1)[param2];
    }

    public getDefaultPartSet(param1: string, param2: string): IFigurePartSet {
        return this._figureData.getDefaultPartSet(param1, param2);
    }

    public getCanvasOffsets(param1: any[], param2: string, param3: number): any[] {
        return this._SafeStr_2813.getCanvasOffsets(param1, param2, param3);
    }

    public getCanvas(param1: string, param2: string): AvatarCanvas {
        return this._geometry.getCanvas(param1, param2);
    }

    public removeDynamicItems(param1: IAvatarImage): void {
        this._geometry.removeDynamicItems(param1);
    }

    public getActiveBodyPartIds(param1: IActiveActionData, param2: IAvatarImage): any[] {
        let _loc8_: GeometryBodyPart = null;
        let _loc4_: string = null;
        let _loc9_: Animation = null;
        let _loc10_: GeometryBodyPart = null;
        let _loc16_: PartDefinition = null;
        let _loc14_: XML = null;
        let _loc11_: XML = null;
        let _loc13_: any[] = [];
        let _loc7_: any[] = [];
        let _loc15_: string = param1.definition.geometryType;
        if (param1.definition.isAnimation) {
            _loc4_ = param1.definition.state + "." + param1.actionParameter;
            _loc9_ = asInstanceOf(this._animationManager.getAnimation(_loc4_), Animation);
            if (_loc9_ != null) {
                _loc13_ = _loc9_.getAnimatedBodyPartIds(0, param1.overridingAction);
                for (const _loc5_ of _loc9_.removeData ?? []) {
                    _loc10_ = this._geometry.getBodyPartOfItem(_loc15_, stringOrNull(_loc5_), param2);
                    if (_loc10_ != null) {
                        if (_loc7_.indexOf(_loc10_.id) == -1) {
                            _loc7_.push(_loc10_.id);
                        }
                    }
                }
                if (_loc9_.hasAddData()) {
                    _loc14_ = new XML(`<item id="" x="0" y="0" z="0" radius="0.01" nx="0" ny="0" nz="-1" double="1"/>`);
                    _loc11_ = new XML(`<part/>`);
                    for (const _loc3_ of _loc9_.addData ?? []) {
                        _loc8_ = this._geometry.getBodyPart(_loc15_, stringOrNull(_loc3_.align));
                        if (_loc8_ != null) {
                            _loc14_.setAttribute("id", _loc3_.id);
                            _loc8_.addPart(_loc14_, param2);
                            _loc11_.setAttribute("set-type", _loc3_.id);
                            _loc16_ = this._SafeStr_2862.addPartDefinition(_loc11_);
                            _loc16_.appendToFigure = true;
                            if (_loc3_.base == "") {
                                _loc16_.staticId = 1;
                            }
                            if (_loc7_.indexOf(_loc8_.id) == -1) {
                                _loc7_.push(_loc8_.id);
                            }
                        }
                    }
                }
            }
            for (const _loc12_ of _loc13_ ?? []) {
                _loc8_ = this._geometry.getBodyPart(_loc15_, stringOrNull(_loc12_));
                if (_loc8_ != null) {
                    if (_loc7_.indexOf(_loc8_.id) == -1) {
                        _loc7_.push(_loc8_.id);
                    }
                }
            }
        } else {
            _loc13_ = this._SafeStr_2862.getActiveParts(param1.definition);
            for (const _loc6_ of _loc13_ ?? []) {
                _loc8_ = this._geometry.getBodyPartOfItem(_loc15_, stringOrNull(_loc6_), param2);
                if (_loc8_ != null) {
                    if (_loc7_.indexOf(_loc8_.id) == -1) {
                        _loc7_.push(_loc8_.id);
                    }
                }
            }
        }
        return _loc7_;
    }

    public getBodyPartsUnordered(param1: string): any[] {
        return this._geometry.getBodyPartIdsInAvatarSet(param1);
    }

    public getBodyParts(param1: string, param2: string, param3: number): any[] {
        let _loc4_: number = Number(AvatarDirectionAngle._SafeStr_7298[param3]);
        return this._geometry.getBodyPartsAtAngle(param1, _loc4_ >>> 0, param2);
    }

    public getFrameBodyPartOffset(param1: IActiveActionData, param2: number, param3: number, param4: string): Point {
        let _loc5_: AnimationAction = this._SafeStr_2337.getAction(param1.definition);
        if (_loc5_) {
            return _loc5_.getFrameBodyPartOffset(param2, param3, param4);
        }
        return AnimationAction.DEFAULT_OFFSET;
    }

    public getParts(param1: string, param2: IAvatarFigureContainer, param3: IActiveActionData, param4: string, param5: number, param6: any[], param7: IAvatarImage, param8: UtilsMap = null): AvatarImagePartContainer[] {
        let _loc37_: Animation = null;
        let _loc26_: any = null;
        let _loc28_: PartDefinition = null;
        let _loc27_: string = null;
        let _loc47_: any = null;
        let _loc14_: GeometryBodyPart = null;
        let _loc30_: any = null;
        let _loc41_: any = null;
        let _loc23_: AvatarImagePartContainer = null;
        let _loc21_: AnimationActionPart = null;
        let _loc45_: any = null;
        let _loc48_: number = 0;
        let _loc15_: any[] = null;
        let _loc36_: ISetType = null;
        let _loc24_: IPalette = null;
        let _loc17_: IFigurePartSet = null;
        let _loc18_: any = null;
        let _loc43_: IActionDefinition = null;
        let _loc34_: string = null;
        let _loc10_: IPartColor = null;
        let _loc29_: any = false;
        let _loc13_: any = null;
        let _loc19_: boolean = false;
        let _loc39_: IPartColor = null;
        let _loc22_: boolean = false;
        let _loc31_: string = null;
        let _loc44_: number = 0;
        let _loc32_: number = 0;
        let _loc25_: GeometryBodyPart = null;
        let _loc11_: boolean = false;
        let _loc12_: number = NaN;
        let _loc42_: string = null;
        let _loc16_: AddDataContainer = null;
        if (param3 == null) {
            return null;
        }
        let _loc9_: any[] = this._SafeStr_2862.getActiveParts(param3.definition);
        let _loc46_: any[] = [];
        let _loc35_: any[] = [0];
        let _loc38_: AnimationAction = this._SafeStr_2337.getAction(param3.definition);
        if (param3.definition.isAnimation) {
            _loc27_ = param3.definition.state + "." + param3.actionParameter;
            _loc37_ = asInstanceOf(this._animationManager.getAnimation(_loc27_), Animation);
            if (_loc37_ != null) {
                _loc35_ = this.getPopulatedArray(_loc37_.frameCount(param3.overridingAction));
                for (_loc47_ of _loc37_.getAnimatedBodyPartIds(0, param3.overridingAction) ?? []) {
                    if (_loc47_ == param1) {
                        _loc14_ = this._geometry.getBodyPart(param4, stringOrNull(_loc47_));
                        if (_loc14_ != null) {
                            for (_loc30_ of _loc14_.getDynamicParts(param7) ?? []) {
                                _loc9_.push(_loc30_.id);
                            }
                        }
                    }
                }
            }
        }
        let _loc20_: any[] = this._geometry.getParts(param4, param1, param5 >>> 0, _loc9_, param7);
        let _loc33_: any[] = param2.getPartTypeIds();
        for (_loc41_ of _loc33_ ?? []) {
            if (param8 != null) {
                if (param8[_loc41_] != null) {
                    continue;
                }
            }
            _loc48_ = param2.getPartSetId(stringOrNull(_loc41_));
            _loc15_ = param2.getPartColorIds(stringOrNull(_loc41_));
            _loc36_ = this._figureData.getSetType(stringOrNull(_loc41_));
            if (_loc36_) {
                _loc24_ = this._figureData.getPalette(_loc36_.paletteID);
                if (_loc24_) {
                    _loc17_ = _loc36_.getPartSet(_loc48_);
                    if (_loc17_) {
                        param6 = param6.concat(_loc17_.hiddenLayers);
                        for (_loc18_ of _loc17_.parts ?? []) {
                            if (_loc20_.indexOf(_loc18_.type) > -1) {
                                if (_loc38_ != null) {
                                    _loc21_ = _loc38_.getPart(stringOrNull(_loc18_.type));
                                    if (_loc21_ != null) {
                                        _loc45_ = _loc21_.frames;
                                    } else {
                                        _loc45_ = _loc35_;
                                    }
                                } else {
                                    _loc45_ = _loc35_;
                                }
                                _loc43_ = param3.definition;
                                if (_loc9_.indexOf(_loc18_.type) == -1) {
                                    _loc43_ = param3.definition.geometryType == "horizontal" ? this._SafeStr_3621 : this._defaultAction;
                                }
                                _loc28_ = this._SafeStr_2862.getPartDefinition(stringOrNull(_loc18_.type));
                                _loc34_ = stringOrNull(_loc28_ == null ? _loc18_.type : _loc28_.flippedSetType);
                                if (_loc34_ == "") {
                                    _loc34_ = stringOrNull(_loc18_.type);
                                }
                                if (_loc15_ && _loc15_.length > _loc18_.colorLayerIndex - 1) {
                                    _loc10_ = _loc24_.getColor(_loc15_[_loc18_.colorLayerIndex - 1] | 0);
                                }
                                _loc29_ = _loc18_.colorLayerIndex > 0;
                                _loc23_ = new AvatarImagePartContainer(param1, stringOrNull(_loc18_.type), stringOrNull(_loc18_.id.toString()), _loc10_, _loc45_, _loc43_, _loc29_, _loc18_.paletteMap | 0, _loc34_);
                                _loc46_.push(_loc23_);
                            }
                        }
                    }
                }
            }
        }
        let _loc40_: AvatarImagePartContainer[] = [];
        for (_loc26_ of _loc20_ ?? []) {
            _loc19_ = false;
            _loc39_ = null;
            _loc22_ = !!(param8 && param8[_loc26_]);
            for (_loc13_ of _loc46_ ?? []) {
                if (_loc13_.partType == _loc26_) {
                    if (_loc22_) {
                        _loc39_ = _loc13_.color;
                    } else {
                        _loc19_ = true;
                        if (param6.indexOf(_loc26_) == -1) {
                            _loc40_.push(_loc13_);
                        }
                    }
                }
            }
            if (!_loc19_) {
                if (_loc22_) {
                    _loc31_ = stringOrNull(param8[_loc26_]);
                    _loc44_ = 0;
                    _loc32_ = 0;
                    while (_loc32_ < _loc31_.length) {
                        _loc44_ = _loc44_ + _loc31_.charCodeAt(_loc32_) | 0;
                        _loc32_++;
                    }
                    if (_loc38_ != null) {
                        _loc21_ = _loc38_.getPart(stringOrNull(_loc26_));
                        if (_loc21_ != null) {
                            _loc45_ = _loc21_.frames;
                        } else {
                            _loc45_ = _loc35_;
                        }
                    } else {
                        _loc45_ = _loc35_;
                    }
                    _loc23_ = new AvatarImagePartContainer(param1, stringOrNull(_loc26_), _loc31_, _loc39_, _loc45_, param3.definition, _loc39_ != null, -1, stringOrNull(_loc26_), false, 1);
                    _loc40_.push(_loc23_);
                } else if (_loc9_.indexOf(_loc26_) > -1) {
                    _loc25_ = this._geometry.getBodyPartOfItem(param4, stringOrNull(_loc26_), param7);
                    if (param1 == _loc25_.id) {
                        _loc28_ = this._SafeStr_2862.getPartDefinition(stringOrNull(_loc26_));
                        _loc11_ = false;
                        _loc12_ = 1;
                        if (_loc28_.appendToFigure) {
                            _loc42_ = "1";
                            if (param3.actionParameter != "") {
                                _loc42_ = param3.actionParameter;
                            }
                            if (_loc28_.hasStaticId()) {
                                _loc42_ = _loc28_.staticId.toString();
                            }
                            if (_loc37_ != null) {
                                _loc16_ = _loc37_.getAddData(stringOrNull(_loc26_));
                                if (_loc16_ != null) {
                                    _loc11_ = _loc16_.isBlended;
                                    _loc12_ = _loc16_.blend;
                                }
                            }
                            if (_loc38_ != null) {
                                _loc21_ = _loc38_.getPart(stringOrNull(_loc26_));
                                if (_loc21_ != null) {
                                    _loc45_ = _loc21_.frames;
                                } else {
                                    _loc45_ = _loc35_;
                                }
                            } else {
                                _loc45_ = _loc35_;
                            }
                            _loc23_ = new AvatarImagePartContainer(param1, stringOrNull(_loc26_), _loc42_, null, _loc45_, param3.definition, false, -1, stringOrNull(_loc26_), _loc11_, _loc12_);
                            _loc40_.push(_loc23_);
                        }
                    }
                }
            }
        }
        return _loc40_;
    }

    public displayGeometry(param1: Stage): void {
        let _loc7_: GeometryBodyPart = null;
        let _loc11_: number = NaN;
        let _loc12_: number = NaN;
        let _loc9_: number = NaN;
        let _loc14_: Shape = null;
        let _loc4_: BitmapData = new BitmapData(960, 540, false, 4294967295);
        let _loc10_: Bitmap = new Bitmap(_loc4_);
        param1.addChild(_loc10_);
        let _loc3_: number = _loc4_.width / 2;
        let _loc2_: number = _loc4_.height / 2;
        let _loc5_: number = 200;
        let _loc13_: TextField = new TextField();
        let _loc6_: Matrix = new Matrix();
        for (const _loc8_ of this._geometry.getBodyPartIdsInAvatarSet("full") ?? []) {
            _loc7_ = this._geometry.getBodyPart("vertical", stringOrNull(_loc8_));
            AvatarStructure._log_AvatarStructure.info("Drawing bodypart : " + _loc8_);
            if (_loc7_ != null) {
                _loc11_ = _loc7_.location.x * _loc5_;
                _loc12_ = _loc7_.location.z * _loc5_;
                _loc9_ = _loc7_.radius * _loc5_;
                _loc14_ = new Shape();
                _loc14_.graphics.lineStyle(1, 4294901760, 1);
                _loc14_.graphics.drawCircle(_loc3_ + _loc11_, _loc2_ + _loc12_, _loc9_);
                _loc4_.draw(_loc14_);
                _loc13_.text = stringOrNull(_loc8_);
                _loc13_.textColor = 4294901760;
                _loc6_.identity();
                _loc6_.tx = _loc3_ + _loc11_ + _loc9_ - _loc13_.textWidth - 5;
                _loc6_.ty = _loc2_ + _loc12_ - 5;
                _loc4_.draw(_loc13_, _loc6_);
            } else {
                AvatarStructure._log_AvatarStructure.warn("Could not draw bodypart : " + _loc8_);
            }
        }
    }

    public getItemIds(): any[] {
        let _loc2_: Map<any, any> = null;
        let _loc1_: any[] = null;
        if (this._SafeStr_2813) {
            _loc2_ = this._SafeStr_2813.getActionDefinition("CarryItem").params;
            _loc1_ = [];
            for (const _loc3_ of _loc2_?.keys() ?? []) {
                _loc1_.push(_loc3_);
            }
            return _loc1_;
        }
        return [];
    }

    private getPopulatedArray(param1: number): any[] {
        let _loc3_: number = 0;
        let _loc2_: any[] = [];
        _loc3_ = 0;
        while (_loc3_ < param1) {
            _loc2_.push(_loc3_);
            _loc3_++;
        }
        return _loc2_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarStructure.#staticsReady) return;
        AvatarStructure.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarStructure, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_AvatarStructure", null);
        set("_log_AvatarStructure", new SimpleLogger("com.sulake.habbo.avatar.AvatarStructure"));
    }
}
