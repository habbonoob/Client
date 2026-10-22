import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboAvatarEditor } from '@/com/sulake/habbo/avatar/IHabboAvatarEditor';
import type { IHabboAvatarEditorDataSaver } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorDataSaver';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarEditorMessageHandler } from '@/com/sulake/habbo/avatar/AvatarEditorMessageHandler';
import { AvatarEditorType } from '@/com/sulake/habbo/avatar/enum/AvatarEditorType';
import { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDCoreLocalizationManager } from '@/com/sulake/iid/IIDCoreLocalizationManager';
import { IIDCoreWindowManager } from '@/com/sulake/iid/IIDCoreWindowManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboRoomUI } from '@/com/sulake/iid/IIDHabboRoomUI';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboAvatarEditorManager extends Component implements IHabboAvatarEditor, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.avatar::HabboAvatarEditorManager'); }

    public static readonly _SafeStr_8081: number = 1;
    public static readonly _SafeStr_7557: number = 2;
    public static readonly _SafeStr_6118: number = 3;
    private static readonly GENERIC: string = "generic";

    declare private _windowManager: IHabboWindowManager;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _inventory: IHabboInventory;

    declare private _localization: IHabboLocalizationManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _catalog: IHabboCatalog;

    declare private _sessionData: ISessionDataManager;

    declare private _roomUI: IRoomUI;

    declare private _SafeStr_2143: AvatarEditorMessageHandler;

    declare private _editors: UtilsMap;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._editors = new UtilsMap();
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDCoreWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }, (this.flags & 3) == 0), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }, true, [{ "type": "AVATAR_RENDER_READY", "callback": this.onAvatarRendererReady }]), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }, (this.flags & 1) == 0, []), new ComponentDependency(new IIDCoreLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboConfigurationManager(), null, true, [{ "type": "complete", "callback": this.onConfigurationComplete }]), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, (this.flags & 2) == 0), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionData = param1;
         }), new ComponentDependency(new IIDHabboRoomUI(), (param1: IRoomUI): void => {
             this._roomUI = param1;
         }, false)]);
    }

    private onConfigurationComplete(param1: Event): void {
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
        if (this._communication) {
            this._SafeStr_2143 = new AvatarEditorMessageHandler(this, this._communication);
        }
    }

    public override dispose(): void {
        if (this._editors) {
            for (let _loc1_ of valuesOf(this._editors)) {
                _loc1_.dispose();
                _loc1_ = null;
            }
            this._editors = null;
        }
        if (this._SafeStr_2143 != null) {
            this._SafeStr_2143.dispose();
            this._SafeStr_2143 = null;
        }
        super.dispose();
    }

    public openEditor(param1: number, param2: IHabboAvatarEditorDataSaver, param3: any[] = null, param4: boolean = false, param5: string = null, param6: string = "generic"): IFrameWindow {
        let _loc7_: HabboAvatarEditor = this._editors.getValue(param1);
        if (!_loc7_) {
            _loc7_ = new HabboAvatarEditor(param1, this);
            this._editors.add(param1, _loc7_);
        }
        return _loc7_.openWindow(param2, param3, param4, param5, param6);
    }

    public embedEditorToContext(param1: number, param2: IWindowContainer, param3: IHabboAvatarEditorDataSaver = null, param4: any[] = null, param5: boolean = false, param6: boolean = false): boolean {
        let _loc7_: HabboAvatarEditor = this._editors.getValue(param1);
        if (_loc7_) {
            _loc7_.dispose();
        }
        _loc7_ = new HabboAvatarEditor(param1, this, param6);
        this._editors.add(param1, _loc7_);
        _loc7_.embedToContext(param2, param3, param4, param5);
        return true;
    }

    public loadAvatarInEditor(param1: number, param2: string, param3: string, param4: number = 0): void {
        let _loc5_: HabboAvatarEditor = asInstanceOf(this._editors.getValue(param1), HabboAvatarEditor);
        if (_loc5_) {
            return _loc5_.loadAvatarInEditor(param2, param3, param4);
        }
    }

    public loadOwnAvatarInEditor(param1: number): void {
        let _loc2_: HabboAvatarEditor = asInstanceOf(this._editors.getValue(param1), HabboAvatarEditor);
        if (_loc2_) {
            if (_loc2_.hasNftOutfit()) {
                return _loc2_.loadFallbackFigure();
            }
            return _loc2_.loadAvatarInEditor(this.sessionData.figure, this.sessionData.gender, this.sessionData.clubLevel);
        }
    }

    public close(param1: number): void {
        if (!this._editors) {
            return;
        }
        let _loc2_: HabboAvatarEditor = asInstanceOf(this._editors.getValue(param1), HabboAvatarEditor);
        if (!_loc2_) {
            return;
        }
        if (!AvatarEditorType.isDevelopmentEditor(param1 | 0)) {
            _loc2_.figureData.avatarEffectType = this.inventory.getLastActivatedEffect();
        }
        switch (param1 | 0) {
            case 0:
                _loc2_.hide();
                break;
            case 1:
                _loc2_.hide();
                _loc2_.dispose();
                this._editors.remove(param1);
                break;
            case 2:
                break;
            default:
                _loc2_.dispose();
                this._editors.remove(param1);
        }
    }

    public getEditor(param1: number): HabboAvatarEditor {
        return asInstanceOf(this._editors.getValue(param1), HabboAvatarEditor);
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    private onAvatarRendererReady(param1: Event = null): void {
        this.events.dispatchEvent(new Event("AVATAR_EDITOR_READY"));
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public get handler(): AvatarEditorMessageHandler {
        return this._SafeStr_2143;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get sessionData(): ISessionDataManager {
        return this._sessionData;
    }

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    public get roomDesktop(): IRoomDesktop {
        return this._roomUI.desktop;
    }

    public get linkPattern(): string {
        return "avatareditor/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc3_: any = _loc2_[1];
        if ("open" === _loc3_) {
            this.openEditor(0, null, null, true);
            this.loadOwnAvatarInEditor(0);
        }
    }

    protected override initInstanceFields(): void {
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.onAvatarRendererReady = this.onAvatarRendererReady.bind(this);
        super.initInstanceFields();
    }
}
