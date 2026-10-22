import { asGuarded, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { CoreLocalizationManager } from '@/com/sulake/core/localization/CoreLocalizationManager';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { BadgeBaseAndLevel } from '@/com/sulake/habbo/localization/BadgeBaseAndLevel';
import { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { Logger } from '@/com/sulake/habbo/Logger';

const preSuperHabboLocalizationManager: ((self: HabboLocalizationManager) => void)[] = [];

export class HabboLocalizationManager extends CoreLocalizationManager implements IHabboLocalizationManager {
    static { registerClassName(this, 'com.sulake.habbo.localization::HabboLocalizationManager'); }

    declare private _localizationRequestPending: boolean;

    declare private _skipExternals: boolean;

    declare private _badgePointLimits: Map<any, any>;

    declare private _romanNumerals: any[];

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        preSuperHabboLocalizationManager.push((self: HabboLocalizationManager) => {
            self._skipExternals = (param2 & 0x10000000) > 0;
        });
        super(param1, param2, param3);
    }

    public override dispose(): void {
        super.dispose();
    }

    protected override initComponent(): void {
        super.initComponent();
        this.configureLocalizationLocations();
        if (this._skipExternals) {
            this.events.dispatchEvent(new Event("complete"));
        } else {
            this.context.events.addEventListener("HABBO_CONNECTION_EVENT_AUTHENTICATED", this.onAuthenticated);
        }
    }

    private onAuthenticated(param1: Event): void {
        this.requestLocalizationInit();
    }

    public loadDefaultEmbedLocalizations(param1: string, param2: boolean = true): boolean {
        let _loc4_: string = "default_localizations_" + param1;
        let _loc5_: IAsset = this.assets.getAssetByName(_loc4_);
        if (!_loc5_ && param1 != "en" && param2) {
            Logger.log("Could not load default localizations " + _loc4_ + " : Trying with default_localizations_en...");
            return this.loadDefaultEmbedLocalizations("en", false);
        }
        let _loc3_: IAsset = this.assets.getAssetByName("default_localizations");
        this.parseLocalizationData(asGuarded(_loc3_.content, isString));
        if (_loc5_) {
            this.parseLocalizationData(asGuarded(_loc5_.content, isString));
            return true;
        }
        Logger.log("Could not load " + _loc4_);
        return false;
    }

    public getLocalizationWithParams(param1: string, param2: string = "", ...rest: any[]): string {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (rest != null && rest.length > 0) {
            _loc4_ = rest.length / 2 | 0;
            _loc5_ = 0;
            while (_loc5_ < _loc4_) {
                this.registerParameter(param1, stringOrNull(rest[_loc5_ * 2]), stringOrNull(rest[_loc5_ * 2 + 1]));
                _loc5_++;
            }
        }
        return this.getLocalization(param1, param2);
    }

    public getLocalizationWithParamMap(param1: string, param2: string = "", param3: UtilsMap = null): string {
        if (param3 != null) {
            for (const _loc4_ of keysOf(param3)) {
                this.registerParameter(param1, stringOrNull(_loc4_), stringOrNull(param3.getValue(_loc4_)));
            }
        }
        return this.getLocalization(param1, param2);
    }

    public getExternalVariablesUrl(): string {
        return super.getGameDataResources().getExternalVariablesUrl();
    }

    public getExternalVariablesHash(): string {
        return super.getGameDataResources().getExternalVariablesHash();
    }

    public getGameDataResourceUrl(param1: string): string {
        return super.getGameDataResources().getResourceUrl(param1);
    }

    public getGameDataResourceHash(param1: string): string {
        return super.getGameDataResources().getResourceHash(param1);
    }

    public override getActiveEnvironmentId(): string {
        return super.getActiveEnvironmentId();
    }

    public override getLocalization(param1: string, param2: string = ""): string {
        let _loc3_: string = super.getLocalization(param1, param2);
        return this.interpolate(_loc3_);
    }

    public getAchievementName(param1: string): string {
        let _loc2_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        let _loc4_: string = this.getExistingKey(["badge_name_al_" + param1, "badge_name_al_" + _loc2_.base, "badge_name_" + param1, "badge_name_" + _loc2_.base]);
        this.registerParameter(_loc4_, "roman", this.getRomanNumeral(_loc2_.level));
        let _loc3_: string = this.getLocalization(_loc4_);
        return _loc3_ ?? "";
    }

    public getAchievementDesc(param1: string, param2: number): string {
        let _loc3_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        let _loc4_: string = this.getExistingKey(["badge_desc_al_" + param1, "badge_desc_al_" + _loc3_.base, "badge_desc_" + param1, "badge_desc_" + _loc3_.base]);
        this.registerParameter(_loc4_, "limit", "" + param2);
        this.registerParameter(_loc4_, "roman", this.getRomanNumeral(_loc3_.level));
        return this.getLocalization(_loc4_);
    }

    public getAchievementInstruction(param1: string): string {
        let _loc2_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        let _loc4_: string = this.getExistingKey(["badge_instruction_" + _loc2_.base]);
        this.registerParameter(_loc4_, "limit", "" + this.getBadgePointLimit(param1));
        let _loc3_: string = this.getLocalization(_loc4_);
        return _loc3_ ?? "";
    }

    public getBadgeBaseName(param1: string): string {
        let _loc2_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        return _loc2_.base;
    }

    public getBadgeName(param1: string): string {
        let _loc2_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        let _loc3_: string = this.fixBadLocalization(this.getExistingKey(["badge_name_" + param1, "badge_name_" + _loc2_.base]));
        this.registerParameter(_loc3_, "roman", this.getRomanNumeral(_loc2_.level));
        return this.getLocalization(_loc3_);
    }

    public getBadgeDesc(param1: string): string {
        let _loc3_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        let _loc4_: string = this.fixBadLocalization(this.getExistingKey(["badge_desc_" + param1, "badge_desc_" + _loc3_.base]));
        this.registerParameter(_loc4_, "limit", "" + this.getBadgePointLimit(param1));
        this.registerParameter(_loc4_, "roman", this.getRomanNumeral(_loc3_.level));
        let _loc2_: string = this.getLocalization(_loc4_);
        return _loc4_ == _loc2_ ? "" : _loc2_;
    }

    private fixBadLocalization(param1: string): string {
        let _loc2_: string = param1.replace("${", "$");
        _loc2_ = _loc2_.replace("{", "$");
        return _loc2_.replace("}", "$");
    }

    public getPreviousLevelBadgeId(param1: string): string {
        let _loc2_: BadgeBaseAndLevel = new BadgeBaseAndLevel(param1);
        _loc2_.level--;
        return _loc2_.badgeId;
    }

    public setBadgePointLimit(param1: string, param2: number): void {
        this._badgePointLimits.set(param1, param2);
    }

    private configureLocalizationLocations(): void {
        let _loc3_: string = null;
        let _loc2_: string = null;
        let _loc1_: string = null;
        let _loc5_: string = null;
        let _loc4_: number = 1;
        while (this.propertyExists("localization." + _loc4_)) {
            _loc3_ = this.getProperty("localization." + _loc4_);
            _loc2_ = this.getProperty("localization." + _loc4_ + ".code");
            _loc1_ = this.getProperty("localization." + _loc4_ + ".name");
            _loc5_ = this.getProperty("localization." + _loc4_ + ".url");
            super.registerLocalizationDefinition(_loc3_, _loc1_, _loc5_, _loc2_);
            _loc4_++;
        }
    }

    public requestLocalizationInit(): void {
        if (this._localizationRequestPending) {
            return;
        }
        this._localizationRequestPending = true;
        this.events.addEventListener("LOCALIZATION_EVENT_LOCALIZATION_LOADED", this.onLocalizationLoaded);
        this.events.addEventListener("LOCALIZATION_EVENT_LOCALIZATION_FAILED", this.onManagerLocalizationFailed);
        super.loadLocalizationFromURL(this.getProperty("gamedata.hashes.url"), this.getProperty("environment.id"));
    }

    private getBadgePointLimit(param1: string): number {
        return this._badgePointLimits.get(param1) | 0;
    }

    private getExistingKey(param1: any[]): string {
        let _loc2_: string = null;
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = this.getLocalization(stringOrNull(_loc3_));
            if (_loc2_ != "") {
                return stringOrNull(_loc3_);
            }
        }
        return stringOrNull(param1[0]);
    }

    private getRomanNumeral(param1: number): string {
        return stringOrNull(this._romanNumerals[Math.max(0, param1 - 1)]);
    }

    private parseDevelopmentLocalizations(): void {
    }

    private onManagerLocalizationFailed(param1: Event): void {
        this._localizationRequestPending = false;
        Core.crash("Failed loading gamedata hashes", 8);
    }

    private onLocalizationLoaded(param1: Event): void {
        this._localizationRequestPending = false;
        this.events.removeEventListener("LOCALIZATION_EVENT_LOCALIZATION_LOADED", this.onLocalizationLoaded);
        this.events.removeEventListener("LOCALIZATION_EVENT_LOCALIZATION_FAILED", this.onManagerLocalizationFailed);
        this.localizationsReady();
    }

    private localizationsReady(): void {
        this.events.dispatchEvent(new Event("complete"));
    }

    protected override initInstanceFields(): void {
        this.onAuthenticated = this.onAuthenticated.bind(this);
        this.onManagerLocalizationFailed = this.onManagerLocalizationFailed.bind(this);
        this.onLocalizationLoaded = this.onLocalizationLoaded.bind(this);
        this._localizationRequestPending = false;
        this._skipExternals = false;
        this._badgePointLimits = new Dictionary();
        this._romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX"];
        preSuperHabboLocalizationManager.pop()!(this);
        super.initInstanceFields();
    }

    get [IHabboLocalizationManager](): true {
        return true;
    }
}
