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
import { LocalizationEvent } from '@/com/sulake/core/localization/enum/LocalizationEvent';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { HabboCommunicationEvent } from '@/com/sulake/habbo/communication/enum/HabboCommunicationEvent';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { BadgeBaseAndLevel } from '@/com/sulake/habbo/localization/BadgeBaseAndLevel';
import { HabboLocalizationFlags } from '@/com/sulake/habbo/localization/enum/HabboLocalizationFlags';
import { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { SimpleLogger } from '@/debug/SimpleLogger';

const preSuperHabboLocalizationManager: ((self: HabboLocalizationManager) => void)[] = [];

export class HabboLocalizationManager extends CoreLocalizationManager implements IHabboLocalizationManager {
    static { registerClassName(this, 'com.sulake.habbo.localization::HabboLocalizationManager'); }

    static #staticsReady = false;

    private static get _log_HabboLocalizationManager(): SimpleLogger {
        HabboLocalizationManager.#initStatics();
        return HabboLocalizationManager._log_HabboLocalizationManager;
    }

    private static readonly DEFAULT_LOCALIZATIONS_ASSET: string = "default_localizations";
    private static readonly DEFAULT_LANGUAGE: string = "en";
    private static readonly GAMEDATA_HASHES_URL: string = "gamedata.hashes.url";
    private static readonly LOCALIZATION_PROPERTY_PREFIX: string = "localization.";

    declare private _localizationRequestPending: boolean;

    declare private _skipExternals: boolean;

    declare private _badgePointLimits: Map<any, any>;

    declare private _romanNumerals: any[];

    constructor(context: IContext, flags: number = 0, assetLibrary: IAssetLibrary = null) {
        preSuperHabboLocalizationManager.push((self: HabboLocalizationManager) => {
            // Must precede super(): this component declares no dependencies, so Component's
            // constructor calls initComponent() synchronously, and that reads _skipExternals.
            self._skipExternals = (flags & HabboLocalizationFlags.SKIP_EXTERNAL_LOCALIZATIONS) > 0;
        });
        super(context, flags, assetLibrary);
    }

    protected override initComponent(): void {
        super.initComponent();
        this.configureLocalizationLocations();
        if (this._skipExternals) {
            this.events.dispatchEvent(new Event(Event.COMPLETE));
        } else {
            this.context.events.addEventListener(HabboCommunicationEvent.AUTHENTICATED, this.onAuthenticated);
        }
    }

    public override getLocalization(key: string, defaultValue: string = ""): string {
        let value: string = super.getLocalization(key, defaultValue);
        return this.interpolate(value);
    }

    public loadDefaultEmbedLocalizations(environmentId: string, retryWithEnglish: boolean = true): boolean {
        let environmentAssetName: string = HabboLocalizationManager.DEFAULT_LOCALIZATIONS_ASSET + "_" + environmentId;
        let environmentAsset: IAsset = this.assets.getAssetByName(environmentAssetName);
        if (!environmentAsset && environmentId != HabboLocalizationManager.DEFAULT_LANGUAGE && retryWithEnglish) {
            HabboLocalizationManager._log_HabboLocalizationManager.warn("Could not load default localizations " + environmentAssetName + " : Trying with " + HabboLocalizationManager.DEFAULT_LOCALIZATIONS_ASSET + "_" + HabboLocalizationManager.DEFAULT_LANGUAGE + "...");
            return this.loadDefaultEmbedLocalizations(HabboLocalizationManager.DEFAULT_LANGUAGE, false);
        }
        let defaultAsset: IAsset = this.assets.getAssetByName(HabboLocalizationManager.DEFAULT_LOCALIZATIONS_ASSET);
        this.parseLocalizationData(asGuarded(defaultAsset.content, isString));
        if (environmentAsset) {
            this.parseLocalizationData(asGuarded(environmentAsset.content, isString));
            return true;
        }
        HabboLocalizationManager._log_HabboLocalizationManager.warn("Could not load " + environmentAssetName);
        return false;
    }

    public getLocalizationWithParams(key: string, defaultValue: string = "", ...rest: any[]): string {
        let pairCount: number = 0;
        if (rest != null && rest.length > 0) {
            pairCount = rest.length / 2 | 0;
            for (let pair: number = 0; pair < pairCount; pair++) {
                this.registerParameter(key, stringOrNull(rest[pair * 2]), stringOrNull(rest[pair * 2 + 1]));
            }
        }
        return this.getLocalization(key, defaultValue);
    }

    public getLocalizationWithParamMap(key: string, defaultValue: string = "", params: UtilsMap = null): string {
        if (params != null) {
            for (const paramName of keysOf(params)) {
                this.registerParameter(key, paramName, stringOrNull(params.getValue(paramName)));
            }
        }
        return this.getLocalization(key, defaultValue);
    }

    public getExternalVariablesUrl(): string {
        return super.getGameDataResources().getExternalVariablesUrl();
    }

    public getExternalVariablesHash(): string {
        return super.getGameDataResources().getExternalVariablesHash();
    }

    public getAchievementName(badgeId: string): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        let key: string = this.getExistingKey(["badge_name_al_" + badgeId, "badge_name_al_" + badge.base, "badge_name_" + badgeId, "badge_name_" + badge.base]);
        this.registerParameter(key, "roman", this.getRomanNumeral(badge.level));
        let name: string = this.getLocalization(key);
        return name != null ? name : "";
    }

    public getAchievementDesc(badgeId: string, limit: number): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        let key: string = this.getExistingKey(["badge_desc_al_" + badgeId, "badge_desc_al_" + badge.base, "badge_desc_" + badgeId, "badge_desc_" + badge.base]);
        this.registerParameter(key, "limit", "" + limit);
        this.registerParameter(key, "roman", this.getRomanNumeral(badge.level));
        return this.getLocalization(key);
    }

    public getAchievementInstruction(badgeId: string): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        let key: string = this.getExistingKey(["badge_instruction_" + badge.base]);
        this.registerParameter(key, "limit", "" + this.getBadgePointLimit(badgeId));
        let instruction: string = this.getLocalization(key);
        return instruction != null ? instruction : "";
    }

    public getBadgeBaseName(badgeId: string): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        return badge.base;
    }

    public getBadgeName(badgeId: string): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        let key: string = this.fixBadLocalization(this.getExistingKey(["badge_name_" + badgeId, "badge_name_" + badge.base]));
        this.registerParameter(key, "roman", this.getRomanNumeral(badge.level));
        return this.getLocalization(key);
    }

    public getBadgeDesc(badgeId: string): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        let key: string = this.fixBadLocalization(this.getExistingKey(["badge_desc_" + badgeId, "badge_desc_" + badge.base]));
        this.registerParameter(key, "limit", "" + this.getBadgePointLimit(badgeId));
        this.registerParameter(key, "roman", this.getRomanNumeral(badge.level));
        let description: string = this.getLocalization(key);
        return key == description ? "" : description;
    }

    public getPreviousLevelBadgeId(badgeId: string): string {
        let badge: BadgeBaseAndLevel = new BadgeBaseAndLevel(badgeId);
        badge.level--;
        return badge.badgeId;
    }

    public setBadgePointLimit(badgeId: string, limit: number): void {
        this._badgePointLimits.set(badgeId, limit);
    }

    public requestLocalizationInit(): void {
        if (this._localizationRequestPending) {
            return;
        }
        this._localizationRequestPending = true;
        this.events.addEventListener(LocalizationEvent.LOCALIZATION_LOADED, this.onLocalizationLoaded);
        this.events.addEventListener(LocalizationEvent.LOCALIZATION_FAILED, this.onManagerLocalizationFailed);
        super.loadLocalizationFromURL(this.getProperty(HabboLocalizationManager.GAMEDATA_HASHES_URL), this.getProperty(HabboProperty.ENVIRONMENT_ID));
    }

    private fixBadLocalization(key: string): string {
        let fixed: string = key.replace("${", "$");
        fixed = fixed.replace("{", "$");
        return fixed.replace("}", "$");
    }

    private configureLocalizationLocations(): void {
        let id: string = null;
        let code: string = null;
        let name: string = null;
        let url: string = null;
        let index: number = 1;
        while (this.propertyExists(HabboLocalizationManager.LOCALIZATION_PROPERTY_PREFIX + index)) {
            id = this.getProperty(HabboLocalizationManager.LOCALIZATION_PROPERTY_PREFIX + index);
            code = this.getProperty(HabboLocalizationManager.LOCALIZATION_PROPERTY_PREFIX + index + ".code");
            name = this.getProperty(HabboLocalizationManager.LOCALIZATION_PROPERTY_PREFIX + index + ".name");
            url = this.getProperty(HabboLocalizationManager.LOCALIZATION_PROPERTY_PREFIX + index + ".url");
            super.registerLocalizationDefinition(id, name, url, code);
            index++;
        }
    }

    private getBadgePointLimit(badgeId: string): number {
        return this._badgePointLimits.get(badgeId) | 0;
    }

    private getExistingKey(candidates: any[]): string {
        let value: string = null;
        for (const candidate of candidates ?? []) {
            value = this.getLocalization(candidate);
            if (value != "") {
                return candidate;
            }
        }
        return stringOrNull(candidates[0]);
    }

    private getRomanNumeral(level: number): string {
        return stringOrNull(this._romanNumerals[Math.max(0, level - 1)]);
    }

    private parseDevelopmentLocalizations(): void {
    }

    private localizationsReady(): void {
        this.events.dispatchEvent(new Event(Event.COMPLETE));
    }

    private onAuthenticated(event: Event): void {
        this.requestLocalizationInit();
    }

    private onManagerLocalizationFailed(event: Event): void {
        this._localizationRequestPending = false;
        Core.crash("Failed loading gamedata hashes", 8);
    }

    private onLocalizationLoaded(event: Event): void {
        this._localizationRequestPending = false;
        this.events.removeEventListener(LocalizationEvent.LOCALIZATION_LOADED, this.onLocalizationLoaded);
        this.events.removeEventListener(LocalizationEvent.LOCALIZATION_FAILED, this.onManagerLocalizationFailed);
        this.localizationsReady();
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

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboLocalizationManager.#staticsReady) return;
        HabboLocalizationManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboLocalizationManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_HabboLocalizationManager", null);
        set("_log_HabboLocalizationManager", new SimpleLogger("com.sulake.habbo.localization.HabboLocalizationManager"));
    }

    get [IHabboLocalizationManager](): true {
        return true;
    }
}
