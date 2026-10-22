import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CompetitionEntrySubmitResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CompetitionEntrySubmitResultMessageEvent';
import type { CompetitionVotingInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CompetitionVotingInfoMessageEvent';
import type { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetCompetitionVotingInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetCompetitionVotingInfoMessageComposer';
import { SubmitRoomToCompetitionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/SubmitRoomToCompetitionMessageComposer';
import { VoteForRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/VoteForRoomMessageComposer';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomCompetitionController implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.quest::RoomCompetitionController'); }

    private static readonly INDENT_LEFT: number = 270;
    private static readonly INDENT_RIGHT: number = 200;
    private static readonly INDENT_TOP: number = 4;

    declare private _window: IWindowContainer;

    declare private _questEngine: HabboQuestEngine;

    declare private _goalCode: string;

    declare private _SafeStr_7433: number;
    static { (this.prototype as any)._SafeStr_7433 = 0; }

    declare private _remainingVotes: number;
    static { (this.prototype as any)._remainingVotes = 0; }

    declare private _submit: boolean;
    static { (this.prototype as any)._submit = false; }

    declare private _dontShowAgain: boolean;
    static { (this.prototype as any)._dontShowAgain = false; }

    private _hideTimer: Timer = new Timer(3000, 1);

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    private _SafeStr_3230: UtilsMap = new UtilsMap();

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        this._hideTimer.addEventListener("timer", this.onHideTimer);
    }

    public dispose(): void {
        this._questEngine = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._hideTimer) {
            this._hideTimer.removeEventListener("timer", this.onHideTimer);
            this._hideTimer.reset();
            this._hideTimer = null;
        }
        if (this._SafeStr_3230) {
            this._SafeStr_3230.dispose();
            this._SafeStr_3230 = null;
        }
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    private setText(param1: IWindow, param2: string, param3: string): void {
        let _loc5_: string = param2 + "." + param3;
        let _loc4_: string = this._questEngine.localization.getLocalization(_loc5_, "");
        if (_loc4_ == "") {
            _loc5_ = param2;
            _loc4_ = this._questEngine.localization.getLocalization(_loc5_, "");
        }
        if (_loc4_ == "") {
            param1.visible = false;
        } else {
            param1.visible = true;
            this._questEngine.localization.registerParameter(_loc5_, "competition_name", this.getCompetitionName());
            this._questEngine.localization.registerParameter(_loc5_, "votes", "" + this._remainingVotes);
            param1.caption = "${" + _loc5_ + "}";
        }
    }

    public onCompetitionVotingInfo(param1: CompetitionVotingInfoMessageEvent): void {
        this._remainingVotes = param1.getParser().votesRemaining;
        let _loc2_: boolean = param1.getParser().isVotingAllowedForUser;
        let _loc3_: number = param1.getParser().resultCode;
        this.refreshContent(param1.getParser().goalId, false, param1.getParser().goalCode, _loc3_.toString());
        this.setInfoRegionProc(_loc3_ == 1 ? this.onTalents : this.onSeeParticipants);
        this.getActionButton().procedure = this.onVote;
        this.getActionButton().visible = this._remainingVotes > 0 && _loc2_;
        this.getButtonInfoText().visible = _loc2_;
    }

    public onCompetitionEntrySubmitResult(param1: CompetitionEntrySubmitResultMessageEvent): void {
        if (param1.getParser().result == 5) {
            return;
        }
        this.refreshContent(param1.getParser().goalId, true, param1.getParser().goalCode, "" + param1.getParser().result);
        this._result = param1.getParser().result;
        if (this._result == 2) {
            this.setInfoRegionProc(null);
            this.getActionButton().procedure = this.onConfirm;
        } else if (this._result == 6) {
            this.setInfoRegionProc(this.onGoToHotelView);
            this.getActionButton().procedure = this.onAccept;
        } else if (this._result == 1) {
            this.setInfoRegionProc(this.onGoToHotelView);
            this.getActionButton().procedure = this.onSubmit;
        } else if (this._result == 3) {
            this.setInfoRegionProc(this.onCatalogLink);
            this.getActionButton().visible = false;
            this.refreshRequiredFurnis(param1);
            this.getRequiredFurnisWindow().visible = true;
        } else if (this._result == 0) {
            this.setInfoRegionProc(this.onGoToHotelView);
            this.getActionButton().procedure = this.onClose;
        } else if (this._result == 4) {
            this.setInfoRegionProc(null);
            this.getActionButton().procedure = null;
            this.getActionButton().visible = false;
        } else if (this._result == 5) {
            this.setInfoRegionProc(null);
            this.getActionButton().procedure = this.onOpenNavigator;
            this.getActionButton().visible = true;
        }
    }

    private setInfoRegionProc(param1: (...args: any[]) => any): void {
        this.getInfoRegion().procedure = param1;
        this.getInfoRegion().setParamFlag(1, param1 != null);
    }

    public refreshContent(param1: number, param2: boolean, param3: string, param4: string): void {
        this._SafeStr_7433 = param1;
        this._goalCode = param3;
        this._submit = param2;
        this.prepare();
        this.setTexts(param2 ? "submit" : "vote", param4);
        this.getActionButton().visible = true;
        this.setPromoImage();
        this.showAndPositionWindow();
        this.getRequiredFurnisWindow().visible = false;
        this._window.findChildByName("dont_show_again_container").visible = false;
        this._window.findChildByName("normal_container").visible = true;
    }

    private setPromoImage(): void {
        this.getVoteImage().visible = !this._submit;
        this.getSubmitImage().visible = this._submit;
    }

    private showAndPositionWindow(): void {
        this._window.visible = true;
        let _loc1_: Rectangle = this._window.desktop.rectangle;
        this._window.x = 270;
        this._window.y = 4;
        this._window.width = _loc1_.width - 270 - 200 | 0;
        this._window.activate();
    }

    private refreshRequiredFurnis(param1: CompetitionEntrySubmitResultMessageEvent): void {
        let _loc3_: number = 0;
        let _loc5_: string = null;
        let _loc4_: any[] = null;
        let _loc7_: string = null;
        let _loc6_: string = null;
        let _loc8_: IWindowContainer = null;
        let _loc2_: ImageResult = null;
        let _loc9_: any[] = param1.getParser().requiredFurnis;
        _loc3_ = 0;
        while (_loc3_ < _loc9_.length) {
            _loc5_ = stringOrNull(_loc9_[_loc3_]);
            _loc4_ = _loc5_.split("*");
            _loc7_ = stringOrNull(_loc4_[0]);
            _loc6_ = stringOrNull(_loc4_.length > 1 ? _loc4_[1] : "");
            _loc8_ = this.getRequiredFurniWindow(_loc3_ + 1);
            if (_loc5_ == null) {
                _loc8_.visible = false;
            } else {
                _loc8_.visible = true;
                _loc8_.findChildByName("tick_icon").visible = !param1.getParser().isMissing(_loc5_);
                _loc2_ = this._questEngine.roomEngine.getGenericRoomObjectImage(_loc7_, _loc6_, new Vector3d(180, 0, 0), 1, this);
                if (_loc2_.id != 0) {
                    this._SafeStr_3230.add(_loc2_.id, _loc3_);
                }
                this.setRequiredFurniImage(_loc3_, _loc2_.data);
            }
            _loc3_++;
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._SafeStr_3230.getValue(param1) != null) {
            this.setRequiredFurniImage(this._SafeStr_3230.getValue(param1) | 0, param2);
            this._SafeStr_3230.remove(param1);
        }
    }

    public imageFailed(param1: number): void {
    }

    private setRequiredFurniImage(param1: number, param2: BitmapData): void {
        let _loc4_: IWindowContainer = this.getRequiredFurniWindow(param1 + 1);
        let _loc5_: IBitmapWrapperWindow = castGuarded(_loc4_.findChildByName("furni_icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc3_: BitmapData = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
        if (param2 != null) {
            _loc3_.copyPixels(param2, param2.rect, new Point((_loc3_.width - param2.width) / 2, (_loc3_.height - param2.height) / 2));
            _loc5_.bitmap = _loc3_;
        }
    }

    private getCompetitionName(): string {
        let _loc1_: string = "roomcompetition." + this._goalCode + ".name";
        return this._questEngine.localization.getLocalization(_loc1_, _loc1_);
    }

    private setTexts(param1: string, param2: string): void {
        this.setText(this.getCaption(), "roomcompetition.caption." + param1, param2);
        this.setText(this.getInfoText(), "roomcompetition.info." + param1, param2);
        this.setText(this.getActionButton(), "roomcompetition.button." + param1, param2);
        this.setText(this.getButtonInfoText(), "roomcompetition.buttoninfo." + param1, param2);
        this.onResize();
    }

    private onResize(): void {
        this.getInfoRegion().y = this.getCaption().y + this.getCaption().textHeight + 5 | 0;
    }

    public onRoomExit(): void {
        this.close();
    }

    public onRoomEnter(param1: RoomEntryInfoMessageEvent): void {
        this.close();
        let _loc3_: RoomEntryInfoMessageParser = param1.getParser();
        let _loc2_: boolean = this._questEngine.getInteger("new.identity", 0) == 0 || !this._questEngine.getBoolean("new.identity.hide.ui");
        if (!this._dontShowAgain && _loc2_) {
            this._submit = _loc3_.owner;
            this._questEngine.send(new GetCompetitionVotingInfoMessageComposer());
        }
    }

    public sendRoomCompetitionInit(): void {
        this._questEngine.send(new GetCompetitionVotingInfoMessageComposer());
    }

    public onContextChanged(): void {
        if (this._window != null && Boolean(this._window.visible) && this._submit) {
            this._questEngine.send(new SubmitRoomToCompetitionMessageComposer(this._goalCode, 0));
        }
    }

    private close(): void {
        if (this._window) {
            this._window.visible = false;
        }
        this._goalCode = "";
    }

    private prepare(): void {
        let _loc1_: number = 0;
        if (this._window == null) {
            _loc1_ = 1;
            this._window = castGuarded(this._questEngine.getXmlWindow("RoomCompetition", _loc1_), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._window.findChildByName("close_region").procedure = this.onClose;
            this._questEngine.windowManager.getWindowContext(_loc1_ >>> 0).getDesktopWindow().addEventListener("WE_RESIZED", this.onDesktopResized);
            this._window.findChildByName("dont_show_again_region").procedure = this.onDontShowAgain;
        }
    }

    private onCatalogLink = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.catalog.openCatalogPage(this._questEngine.getProperty("competition." + this._goalCode + ".catalogPage"));
        }
    };

    private onOpenNavigator = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.navigator.open();
        }
    };

    private onGoToHotelView = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc3_: HabboToolbarEvent = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = new HabboToolbarEvent("HTE_TOOLBAR_CLICK");
            _loc3_.iconId = "HTIE_ICON_RECEPTION";
            this._questEngine.toolbar.events.dispatchEvent(_loc3_);
        }
    };

    private onSeeParticipants = (param1: WindowEvent, param2: IWindow = null): void => {
    };

    private onTalents = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.tracking.trackTalentTrackOpen(this._questEngine.sessionDataManager.currentTalentTrack, "roomcompetition");
            this._questEngine.send(new GetTalentTrackMessageComposer(this._questEngine.sessionDataManager.currentTalentTrack));
        }
    };

    private onAccept = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.send(new SubmitRoomToCompetitionMessageComposer(this._goalCode, 1));
        }
    };

    private onSubmit = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.send(new SubmitRoomToCompetitionMessageComposer(this._goalCode, 2));
        }
    };

    private onConfirm = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.send(new SubmitRoomToCompetitionMessageComposer(this._goalCode, 3));
        }
    };

    private onVote = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.send(new VoteForRoomMessageComposer(this._goalCode));
        }
    };

    private onClose = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc3_: string = null;
        if (param1.type == "WME_CLICK") {
            if (this._submit && this._result == 0) {
                this.close();
                return;
            }
            _loc3_ = "roomcompetition.dontshowagain.info." + (this._submit ? "submit" : "vote");
            this._window.findChildByName("dont_show_info_txt").caption = this._questEngine.localization.getLocalization(_loc3_, _loc3_);
            this._window.findChildByName("dont_show_again_container").visible = true;
            this._window.findChildByName("normal_container").visible = false;
            this._hideTimer.reset();
            this._hideTimer.start();
        }
    };

    private onDontShowAgain = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._dontShowAgain = true;
            this.close();
        }
    };

    private getInfoRegion(): IWindow {
        return this._window.findChildByName("info_region");
    }

    private getInfoText(): IWindow {
        return this._window.findChildByName("info_txt");
    }

    private getButtonInfoText(): IWindow {
        return this._window.findChildByName("button_info_txt");
    }

    private getActionButton(): IWindow {
        return this._window.findChildByName("action_button");
    }

    private getCaption(): ITextWindow {
        return castGuarded(this._window.findChildByName("caption_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
    }

    private getRequiredFurnisWindow(): IWindow {
        return this._window.findChildByName("required_furnis_itemgrid");
    }

    private getVoteImage(): IWindow {
        return this._window.findChildByName("vote_image");
    }

    private getSubmitImage(): IWindow {
        return this._window.findChildByName("submit_image");
    }

    private getRequiredFurniWindow(param1: number): IWindowContainer {
        let _loc3_: number = 0;
        let _loc4_: IItemGridWindow = castGuarded(this._window.findChildByName("required_furnis_itemgrid"), isIItemGridWindow, "com.sulake.core.window.components.IItemGridWindow");
        let _loc2_: IWindowContainer = castGuarded(_loc4_.getGridItemAt(0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc4_.numGridItems < param1) {
            _loc3_ = 0;
            while (_loc3_ < param1 - _loc4_.numGridItems) {
                _loc4_.addGridItem(_loc2_.clone());
                _loc3_++;
            }
        }
        return castGuarded(_loc4_.getGridItemAt(param1 - 1 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private onDesktopResized = (param1: WindowEvent): void => {
        if (this._window != null && Boolean(this._window.visible)) {
            this.onResize();
        }
    };

    public set dontShowAgain(param1: boolean) {
        this._dontShowAgain = param1;
    }

    private onHideTimer = (param1: TimerEvent): void => {
        this.close();
    };

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
