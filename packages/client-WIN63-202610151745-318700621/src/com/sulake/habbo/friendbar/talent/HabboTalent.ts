import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboAvatarEditor } from '@/com/sulake/habbo/avatar/IHabboAvatarEditor';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { TalentTrackLevel } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackLevel';
import type { IHabboTalent } from '@/com/sulake/habbo/friendbar/IHabboTalent';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { CitizenshipPopupController } from '@/com/sulake/habbo/friendbar/talent/CitizenshipPopupController';
import { TalentLevelUpController } from '@/com/sulake/habbo/friendbar/talent/TalentLevelUpController';
import { TalentPromoCtrl } from '@/com/sulake/habbo/friendbar/talent/TalentPromoCtrl';
import { TalentTrackController } from '@/com/sulake/habbo/friendbar/talent/TalentTrackController';
import { AbstractView } from '@/com/sulake/habbo/friendbar/view/AbstractView';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IIDHabboAvatarEditor } from '@/com/sulake/iid/IIDHabboAvatarEditor';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';

export class HabboTalent extends AbstractView implements IHabboTalent, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.talent::HabboTalent'); }

    declare private _talentTrack: TalentTrackController;

    declare private _talentLevelUp: TalentLevelUpController;

    declare private _talentPromo: TalentPromoCtrl;

    declare private _citizenshipPopup: CitizenshipPopupController;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _habboHelp: IHabboHelp;

    declare private _navigator: IHabboNavigator;

    declare private _toolbar: IHabboToolbar;

    declare private _avatarEditor: IHabboAvatarEditor;

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get sessionManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get tracking(): IHabboTracking {
        return this._tracking;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public get navigator(): IHabboNavigator {
        return this._navigator;
    }

    public get habboTalentEnabled(): boolean {
        return this.getBoolean("talent.track.enabled");
    }

    public get citizenshipEnabled(): boolean {
        return this.getBoolean("talent.track.citizenship.enabled");
    }

    public get newUserTourEnabled(): boolean {
        return this.getBoolean("guide.help.new.user.tour.enabled");
    }

    public get newIdentity(): boolean {
        return this.getInteger("new.identity", 0) > 0;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get avatarEditor(): IHabboAvatarEditor {
        return this._avatarEditor;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._habboHelp = param1;
         }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }), new ComponentDependency(new IIDHabboAvatarEditor(), (param1: IHabboAvatarEditor): void => {
             this._avatarEditor = param1;
         })]);
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._talentLevelUp) {
                this._talentLevelUp.dispose();
                this._talentLevelUp = null;
            }
            if (this._talentTrack) {
                this._talentTrack.dispose();
                this._talentTrack = null;
            }
            if (this._talentPromo) {
                this._talentPromo.dispose();
                this._talentPromo = null;
            }
            if (this._citizenshipPopup != null) {
                this._citizenshipPopup.dispose();
                this._citizenshipPopup = null;
            }
            this.context.removeLinkEventTracker(this);
            super.dispose();
        }
    }

    protected override initComponent(): void {
        if (!this.habboTalentEnabled) {
            return;
        }
        this._talentTrack = new TalentTrackController(this);
        this._talentLevelUp = new TalentLevelUpController(this);
        this._talentPromo = new TalentPromoCtrl(this);
        if (this.citizenshipEnabled) {
            this._citizenshipPopup = new CitizenshipPopupController(this);
        }
        this.context.addLinkEventTracker(this);
        this._talentTrack.initialize();
        this._talentLevelUp.initialize();
        this._talentPromo.initialize();
    }

    public send(param1: IMessageComposer): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(param1);
        }
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        let _loc5_: IAsset = null;
        let _loc3_: XmlAsset = null;
        let _loc4_: IWindow = null;
        try {
            _loc5_ = this.assets.getAssetByName(param1 + "_xml");
            _loc3_ = castTo(_loc5_, XmlAsset);
            _loc4_ = this._windowManager.buildFromXML(XML.from(_loc3_.content), param2);
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboTalent", "Failed to build window " + param1 + "_xml, " + _loc5_ + ", " + this._windowManager + "!");
            throw e;
        }
        return _loc4_;
    }

    public getModalXmlWindow(param1: string): IModalDialog {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: IModalDialog = null;
        try {
            _loc4_ = this.assets.getAssetByName(param1 + "_xml");
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = this._windowManager.buildModalDialogFromXML(XML.from(_loc2_.content));
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboTalent", "Failed to build window " + param1 + "_xml, " + _loc4_ + ", " + this._windowManager + "!");
            throw e;
        }
        return _loc3_;
    }

    public testLevelUp(param1: string, param2: TalentTrackLevel): void {
        this._talentLevelUp.showWindow(param1, param2.level, param2.rewardPerks, param2.rewardProducts);
    }

    public get linkPattern(): string {
        return "talent/";
    }

    public linkReceived(param1: string): void {
        let _loc3_: string = null;
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc4_: any = _loc2_[1];
        if ("open" !== _loc4_) {
            Logger.log("Catalog unknown link-type receive: " + _loc2_[1]);
        } else if (_loc2_.length > 2) {
            _loc3_ = stringOrNull(_loc2_[2]);
            switch (_loc3_) {
                case "citizenship":
                    this._tracking.trackTalentTrackOpen("citizenship", "citizenshiplink");
                    this.send(new GetTalentTrackMessageComposer("citizenship"));
                    break;
                case "helper":
                    this._tracking.trackTalentTrackOpen("helper", "helperlink");
                    this.send(new GetTalentTrackMessageComposer("helper"));
            }
        }
    }
}
