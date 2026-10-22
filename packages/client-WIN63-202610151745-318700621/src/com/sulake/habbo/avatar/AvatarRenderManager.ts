import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderStruct } from '@/com/sulake/core/assets/AssetLoaderStruct';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAnimationManager } from '@/com/sulake/habbo/avatar/animation/IAnimationManager';
import type { LibraryLoadedEvent } from '@/com/sulake/habbo/avatar/events/LibraryLoadedEvent';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibraryCollection, Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AssetAliasCollection } from '@/com/sulake/habbo/avatar/alias/AssetAliasCollection';
import { AvatarAssetDownloadManager } from '@/com/sulake/habbo/avatar/AvatarAssetDownloadManager';
import { AvatarFigureContainer } from '@/com/sulake/habbo/avatar/AvatarFigureContainer';
import { AvatarImage } from '@/com/sulake/habbo/avatar/AvatarImage';
import { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import { BlockedAvatarImage } from '@/com/sulake/habbo/avatar/BlockedAvatarImage';
import { EffectAssetDownloadManager } from '@/com/sulake/habbo/avatar/EffectAssetDownloadManager';
import { isIAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import { PlaceholderAvatarImage } from '@/com/sulake/habbo/avatar/PlaceholderAvatarImage';
import { AvatarStructureDownload } from '@/com/sulake/habbo/avatar/structure/AvatarStructureDownload';
import { isIStructureData } from '@/com/sulake/habbo/avatar/structure/IStructureData';
import { FigureDataContainer } from '@/com/sulake/habbo/utils/FigureDataContainer';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';

const preSuperAvatarRenderManager: ((self: AvatarRenderManager) => void)[] = [];

export class AvatarRenderManager extends Component implements IAvatarRenderManager {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarRenderManager'); }

    private static readonly BUILT_IN_ANIMATION_ASSET_NAMES: any[] = ["dance_sixseven_animation"];

    declare private AVATAR_PLACEHOLDER_FIGURE: string;

    declare private _SafeStr_2657: AssetAliasCollection;

    declare private _SafeStr_2176: AvatarStructure;

    declare private _mode: string;

    declare private _petImageListeners: UtilsMap;

    declare private _SafeStr_2367: AvatarAssetDownloadManager;

    declare private _SafeStr_2679: EffectAssetDownloadManager;

    declare private _SafeStr_5832: AvatarFigureContainer;

    declare private _SafeStr_5785: AvatarFigureContainer;

    declare private _SafeStr_6077: boolean;

    declare private _SafeStr_6138: boolean;

    declare private _SafeStr_5999: boolean;

    declare private _isReady: boolean;

    declare private _inNuxFlow: boolean;

    declare private _SafeStr_7041: boolean;

    declare private _SafeStr_5889: boolean;

    declare private _SafeStr_3005: any[];

    declare private _activeImages: any[];

    constructor(param1: IContext, param2: number, param3: IAssetLibrary, param4: boolean = false) {
        preSuperAvatarRenderManager.push((self: AvatarRenderManager) => {
            self._inNuxFlow = param4;
        });
        param2 |= 4;
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return this._inNuxFlow ? super.dependencies : super.dependencies.concat([new ComponentDependency(new IIDHabboConfigurationManager(), null, true, [{ "type": "complete", "callback": this.onConfigurationComplete }])]);
    }

    protected override initComponent(): void {
        this._mode = "component";
        this._petImageListeners = new UtilsMap();
        let _loc1_: XML = new XML(`<actions><action  id="Default" precedence="1000" state="std" main="1" isdefault="1" geometrytype="vertical" activepartset="figure" assetpartdefinition="std"/>	<!-- baked in actions for snowwar -->
				<action  id="SnowWarRun" state="swrun" precedence="104" main="1" geometrytype="vertical" activepartset="snowwarrun" assetpartdefinition="swrun" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarDieFront" state="swdiefront" precedence="105" main="1" geometrytype="swhorizontal" activepartset="snowwardiefront" assetpartdefinition="swdie" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarDieBack" state="swdieback" precedence="106" main="1" geometrytype="swhorizontal" activepartset="snowwardieback" assetpartdefinition="swdie" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarPick" state="swpick" precedence="107" main="1" geometrytype="vertical" activepartset="snowwarpick" assetpartdefinition="swpick" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarThrow" state="swthrow" precedence="108" main="1" geometrytype="vertical" activepartset="snowwarthrow" assetpartdefinition="swthrow" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx.174,fx175,fx176,dance"/>
			</actions>`);
        this._SafeStr_2176 = new AvatarStructure(this);
        this._SafeStr_2176.initGeometry(this.assets.hasAsset("HabboAvatarGeometry") ? asInstanceOf(this.assets.getAssetByName("HabboAvatarGeometry").content, XML) : null);
        this._SafeStr_2176.initPartSets(this.assets.hasAsset("HabboAvatarPartSets") ? asInstanceOf(this.assets.getAssetByName("HabboAvatarPartSets").content, XML) : null);
        this._SafeStr_2176.initActions(this.assets, _loc1_);
        this._SafeStr_2176.initAnimation(this.assets.hasAsset("HabboAvatarAnimation") ? asInstanceOf(this.assets.getAssetByName("HabboAvatarAnimation").content, XML) : null);
        this._SafeStr_2176.initFigureData(this.assets.hasAsset("HabboAvatarFigure") ? asInstanceOf(this.assets.getAssetByName("HabboAvatarFigure").content, XML) : null);
        this._SafeStr_2657 = new AssetAliasCollection(this, asInstanceOf(this.context.assets, AssetLibraryCollection));
        this._SafeStr_2657.init();
        this.checkIfReady();
    }

    private requestActions(): void {
        let _loc3_: string = this.getProperty("flash.dynamic.avatar.download.url") + "HabboAvatarActions.xml";
        let _loc1_: URLRequest = new URLRequest(_loc3_);
        let _loc2_: AssetLoaderStruct = this.assets.loadAssetFromFile("HabboAvatarActions", _loc1_, "text/xml");
        _loc2_.addEventListener("AssetLoaderEventComplete", this.onAvatarActionsLoaded);
    }

    private onAvatarActionsLoaded(param1: Event = null): void {
        if (this._SafeStr_2176 == null) {
            return;
        }
        let _loc2_: XML = new XML(`<actions><action  id="Default" precedence="1000" state="std" main="1" isdefault="1" geometrytype="vertical" activepartset="figure" assetpartdefinition="std"/>	<!-- baked in actions for snowwar -->
				<action  id="SnowWarRun" state="swrun" precedence="104" main="1" geometrytype="vertical" activepartset="snowwarrun" assetpartdefinition="swrun" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarDieFront" state="swdiefront" precedence="105" main="1" geometrytype="swhorizontal" activepartset="snowwardiefront" assetpartdefinition="swdie" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarDieBack" state="swdieback" precedence="106" main="1" geometrytype="swhorizontal" activepartset="snowwardieback" assetpartdefinition="swdie" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarPick" state="swpick" precedence="107" main="1" geometrytype="vertical" activepartset="snowwarpick" assetpartdefinition="swpick" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx174,fx175,fx176,dance"/>
				<action  id="SnowWarThrow" state="swthrow" precedence="108" main="1" geometrytype="vertical" activepartset="snowwarthrow" assetpartdefinition="swthrow" startfromframezero="true" prevents="fx.2,fx.3,fx.6,fx.14,fx.15,fx.17,fx.18,fx.19,fx.20,fx.21,fx.22,fx.33,fx.34,fx.35,fx.36,fx.38,fx.39,fx.45,fx.46,fx.48,fx.54,fx.55,fx.56,fx.57,fx.58,fx.69,fx.71,fx.72,fx.89,fx.90,fx.91,fx.92,fx.94,fx.97,fx.100,fx.104,fx.105,fx.107,fx.108,fx.115,fx.116,fx.117,fx.118,fx.119,fx.120,fx.121,fx.122,fx.123,fx.124,fx.125,fx.127,fx.129,fx.130,fx.131,fx.132,fx.134,fx.135,fx.136,fx.137,fx.138,fx.139,fx.140,fx.141,fx.142,fx.143,fx.144,fx.145,fx.146,fx.147,fx.148,fx.149,fx.150,fx.151,fx.152,fx.153,fx.154,fx.155,fx.156,fx.157,fx.158,fx.159,fx.160,fx.161,fx.162,fx.164,fx.165,fx.166,fx167,fx168,fx169,fx170,fx171,fx172,fx173,fx.174,fx175,fx176,dance"/>
			</actions>`);
        this._SafeStr_2176.updateActions(this.assets.hasAsset("HabboAvatarActions") ? asInstanceOf(this.assets.getAssetByName("HabboAvatarActions").content, XML) : _loc2_);
        this.registerBuiltInAnimations();
        this._SafeStr_7041 = true;
        this.checkIfReady();
    }

    private registerBuiltInAnimations(): void {
        let _loc1_: any = null;
        let _loc2_: XML = null;
        for (_loc1_ of AvatarRenderManager.BUILT_IN_ANIMATION_ASSET_NAMES ?? []) {
            if (this.assets.hasAsset(stringOrNull(_loc1_))) {
                _loc2_ = asInstanceOf(this.assets.getAssetByName(stringOrNull(_loc1_)).content, XML);
                if (_loc2_ != null) {
                    this._SafeStr_2176.registerAnimation(_loc2_);
                }
            }
        }
    }

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_2176 != null) {
            this._SafeStr_2176.dispose();
            this._SafeStr_2176 = null;
        }
        if (this._SafeStr_2657 != null) {
            this._SafeStr_2657.dispose();
            this._SafeStr_2657 = null;
        }
        if (this._petImageListeners) {
            this._petImageListeners.dispose();
            this._petImageListeners = null;
        }
        if (this._SafeStr_2367) {
            this._SafeStr_2367.removeEventListener("complete", this.onAvatarAssetsDownloadManagerReady);
            this._SafeStr_2367.dispose();
            this._SafeStr_2367 = null;
        }
        if (this._SafeStr_2679) {
            this._SafeStr_2679.removeEventListener("complete", this.onAvatarAssetsDownloadManagerReady);
            this._SafeStr_2679.dispose();
            this._SafeStr_2679 = null;
        }
        this._SafeStr_3005 = null;
    }

    private onConfigurationComplete(param1: Event): void {
        let _loc5_: string = null;
        let _loc7_: string = null;
        let _loc6_: string = null;
        let _loc2_: string = null;
        let _loc4_: string = null;
        let _loc3_: AvatarStructureDownload = null;
        this.requestActions();
        if (this._SafeStr_2176 != null) {
            _loc4_ = this.getProperty("external.figurepartlist.txt");
            if (this.assets.hasAsset(_loc4_)) {
                this.assets.removeAsset(this.assets.getAssetByName(_loc4_));
            }
            _loc3_ = new AvatarStructureDownload(this.assets, _loc4_, asGuarded(this._SafeStr_2176.figureData, isIStructureData));
            _loc3_.addEventListener("AVATAR_STRUCTURE_DONE", this.onFigureDataDownloadDone);
            if (this._SafeStr_2367 == null) {
                _loc2_ = this.getProperty("flash.dynamic.avatar.download.configuration");
                _loc6_ = this.getProperty("flash.dynamic.avatar.download.url");
                _loc7_ = this.getProperty("flash.dynamic.avatar.download.name.template");
                this._SafeStr_2367 = new AvatarAssetDownloadManager(this, this.context.assets, _loc2_, _loc6_, this._SafeStr_2176, _loc7_);
                this._SafeStr_2367.addEventListener("complete", this.onAvatarAssetsDownloadManagerReady);
                this._SafeStr_2367.addEventListener("LIBRARY_LOADED", this.onAvatarAssetsLibraryReady);
            }
            if (this._SafeStr_2679 == null) {
                _loc5_ = this.getProperty("flash.dynamic.avatar.download.url") + "effectmap.xml";
                _loc6_ = this.getProperty("flash.dynamic.avatar.download.url");
                _loc7_ = this.getProperty("flash.dynamic.avatar.download.name.template");
                this._SafeStr_2679 = new EffectAssetDownloadManager(this.context.assets, _loc5_, _loc6_, this._SafeStr_2176, _loc7_);
                this._SafeStr_2679.addEventListener("complete", this.onEffectAssetsDownloadManagerReady);
                this._SafeStr_2679.addEventListener("LIBRARY_LOADED", this.onEffectAssetsLibraryReady);
            }
        }
    }

    public onMandatoryLibrariesReady(): void {
        this._SafeStr_5999 = true;
        this.checkIfReady();
    }

    private onAvatarAssetsLibraryReady(param1: LibraryLoadedEvent): void {
        this._SafeStr_2657.onAvatarAssetsLibraryReady(param1.library);
    }

    private onEffectAssetsLibraryReady(param1: LibraryLoadedEvent): void {
        this._SafeStr_2657.onAvatarAssetsLibraryReady(param1.library);
    }

    private onFigureDataDownloadDone(param1: Event = null): void {
        let _loc2_: IAsset = this.assets.getAssetByName(this.getProperty("external.figurepartlist.txt"));
        if (_loc2_) {
            this.assets.removeAsset(_loc2_).dispose();
        }
        this._SafeStr_6138 = true;
        this._SafeStr_2176.init();
        this.checkIfReady();
    }

    private onAvatarAssetsDownloadManagerReady(param1: Event = null): void {
        this._SafeStr_6077 = true;
        this.checkIfReady();
    }

    private onEffectAssetsDownloadManagerReady(param1: Event = null): void {
        this._SafeStr_5889 = true;
        this.checkIfReady();
    }

    public get effectMap(): Map<any, any> {
        if (this._SafeStr_5889) {
            return this._SafeStr_2679.map;
        }
        return null;
    }

    private checkIfReady(): void {
        if (!this._isReady) {
            if (this._SafeStr_5999 && this._SafeStr_6077 && this._SafeStr_6138 && this._SafeStr_7041 && this._SafeStr_5889) {
                this._isReady = true;
                this.events.dispatchEvent(new Event("AVATAR_RENDER_READY"));
                this.purgeInitDownloadBuffer();
            }
        }
    }

    private purgeInitDownloadBuffer(): void {
        let _loc1_: IAvatarImageListener = null;
        if (this._SafeStr_3005) {
            for (const _loc2_ of this._SafeStr_3005 ?? []) {
                _loc1_ = _loc2_[1];
                if (_loc1_ != null && !_loc1_.disposed) {
                    this._SafeStr_2367.loadFigureSetData(asGuarded(_loc2_[0], isIAvatarFigureContainer), _loc1_);
                }
            }
            this._SafeStr_3005 = [];
        }
    }

    public createFigureContainer(param1: string): IAvatarFigureContainer {
        return new AvatarFigureContainer(param1);
    }

    public isFigureReady(param1: IAvatarFigureContainer): boolean {
        if (!this._SafeStr_2367) {
            return false;
        }
        return this._SafeStr_2367.isReady(param1);
    }

    public downloadFigure(param1: IAvatarFigureContainer, param2: IAvatarImageListener): void {
        if (!this._SafeStr_2367) {
            this._SafeStr_3005.push([param1, param2]);
            return;
        }
        this._SafeStr_2367.loadFigureSetData(param1, param2);
    }

    public createAvatarImage(param1: string, param2: string, param3: string = null, param4: IAvatarImageListener = null, param5: IAvatarEffectListener = null): IAvatarImage {
        let _loc6_: AvatarImage = null;
        let _loc7_: PlaceholderAvatarImage = null;
        let _loc8_: AvatarFigureContainer = new AvatarFigureContainer(param1);
        if (this._SafeStr_2176 == null) {
            this._SafeStr_3005.push([_loc8_, param4]);
            return null;
        }
        if (!this._SafeStr_2367 && this._mode != "local_only") {
            this._SafeStr_3005.push([_loc8_, param4]);
            return null;
        }
        if (param3) {
            this.validateAvatarFigure(_loc8_, param3);
        }
        if (this._mode == "local_only" || this._SafeStr_2367.isReady(_loc8_)) {
            _loc6_ = new AvatarImage(this._SafeStr_2176, this._SafeStr_2657, _loc8_, param2, this._SafeStr_2679, param5);
            this._activeImages.push(_loc6_);
            return _loc6_;
        }
        if (!this._SafeStr_5832) {
            this._SafeStr_5832 = new AvatarFigureContainer("hd-99999-99999");
        }
        _loc7_ = new PlaceholderAvatarImage(this._SafeStr_2176, this._SafeStr_2657, this._SafeStr_5832, param2, this._SafeStr_2679);
        this._SafeStr_2367.loadFigureSetData(_loc8_, param4);
        return _loc7_;
    }

    public createBlockedAvatarImage(param1: string, param2: string): IAvatarImage {
        if (!this._SafeStr_5785) {
            this._SafeStr_5785 = new AvatarFigureContainer("hd-99999-99999");
        }
        return new BlockedAvatarImage(this._SafeStr_2176, this._SafeStr_2657, this._SafeStr_5785, param2, this._SafeStr_2679);
    }

    public unregisterImage(param1: AvatarImage): void {
        let _loc2_: number = this._activeImages.indexOf(param1);
        if (_loc2_ >= 0) {
            this._activeImages.splice(_loc2_, 1);
        }
    }

    public getFigureData(): IFigureSetData {
        if (this._SafeStr_2176) {
            return this._SafeStr_2176.figureData;
        }
        return null;
    }

    public isValidFigureSetForGender(param1: number, param2: string): boolean {
        let _loc3_: IFigureSetData = this.getFigureData();
        let _loc4_: IFigurePartSet = _loc3_.getFigurePartSet(param1);
        if (_loc4_ != null) {
            if (_loc4_.gender.toUpperCase() == "U" || _loc4_.gender.toUpperCase() == param2.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    public getFigureStringWithFigureIds(param1: string, param2: string, param3: number[]): string {
        let _loc6_: FigureDataContainer = new FigureDataContainer();
        _loc6_.loadAvatarData(param1, param2);
        let _loc4_: IFigurePartSet[] = this.resolveFigureSets(param3);
        for (const _loc5_ of _loc4_ ?? []) {
            _loc6_.savePartData(_loc5_.type, _loc5_.id, _loc6_.getColourIds(_loc5_.type));
        }
        return _loc6_.getFigureString();
    }

    private resolveFigureSets(param1: number[]): IFigurePartSet[] {
        let _loc4_: IFigurePartSet = null;
        let _loc2_: IFigureSetData = this.getFigureData();
        let _loc3_: IFigurePartSet[] = new Array<IFigurePartSet>(0).fill(null);
        for (const _loc5_ of param1 ?? []) {
            _loc4_ = _loc2_.getFigurePartSet(_loc5_);
            if (_loc4_ != null) {
                _loc3_.push(_loc4_);
            }
        }
        return _loc3_;
    }

    public getItemIds(): any[] {
        return this._SafeStr_2176.getItemIds();
    }

    public getAnimationManager(): IAnimationManager {
        if (this._SafeStr_2176) {
            return this._SafeStr_2176.animationManager;
        }
        return null;
    }

    public registerAnimation(param1: XML): void {
        if (param1 != null) {
            this._SafeStr_2176.registerAnimation(param1);
        }
    }

    public getMandatoryAvatarPartSetIds(param1: string, param2: number): any[] {
        if (this._SafeStr_2176) {
            return this._SafeStr_2176.getMandatorySetTypeIds(param1, param2);
        }
        return null;
    }

    public getAssetByName(param1: string): IAsset {
        return this._SafeStr_2657.getAssetByName(param1);
    }

    public get mode(): string {
        return this._mode;
    }

    public set mode(param1: string) {
        this._mode = param1;
    }

    public injectFigureData(param1: XML): void {
        if (this._SafeStr_2176 != null) {
            this._SafeStr_2176.injectFigureData(param1);
        }
    }

    private validateAvatarFigure(param1: AvatarFigureContainer, param2: string): boolean {
        let _loc5_: boolean = false;
        let _loc3_: IFigureSetData = null;
        let _loc7_: IFigurePartSet = null;
        let _loc11_: ISetType = null;
        let _loc4_: IFigurePartSet = null;
        let _loc9_: IFigurePartSet = null;
        if (!this._SafeStr_2176) {
            ErrorReportStorage.addDebugData("AvatarRenderManager", "validateAvatarFigure: structure is null!");
        }
        let _loc10_: number = 2;
        let _loc6_: any[] = this._SafeStr_2176.getMandatorySetTypeIds(param2, _loc10_);
        if (_loc6_) {
            _loc3_ = this._SafeStr_2176.figureData;
            if (!_loc3_) {
                ErrorReportStorage.addDebugData("AvatarRenderManager", "validateAvatarFigure: figureData is null!");
            }
            for (const _loc8_ of _loc6_ ?? []) {
                if (!param1.hasPartType(stringOrNull(_loc8_))) {
                    _loc7_ = this._SafeStr_2176.getDefaultPartSet(stringOrNull(_loc8_), param2);
                    if (_loc7_) {
                        param1.updatePart(stringOrNull(_loc8_), _loc7_.id, [0]);
                        _loc5_ = true;
                    }
                } else {
                    _loc11_ = _loc3_.getSetType(stringOrNull(_loc8_));
                    if (!_loc11_) {
                        ErrorReportStorage.addDebugData("AvatarRenderManager", "validateAvatarFigure: setType is null!");
                    }
                    if (_loc11_) {
                        _loc4_ = _loc11_.getPartSet(param1.getPartSetId(stringOrNull(_loc8_)));
                        if (!_loc4_) {
                            _loc9_ = this._SafeStr_2176.getDefaultPartSet(stringOrNull(_loc8_), param2);
                            if (_loc9_) {
                                param1.updatePart(stringOrNull(_loc8_), _loc9_.id, [0]);
                                _loc5_ = true;
                            }
                        }
                    }
                }
            }
        }
        return !_loc5_;
    }

    public resolveClubLevel(param1: IAvatarFigureContainer, param2: string, param3: any[] = null): number {
        let _loc7_: any;
        let _loc15_: any = null;
        let _loc9_: ISetType = null;
        let _loc13_: number = 0;
        let _loc12_: IFigurePartSet = null;
        let _loc14_: IPalette = null;
        let _loc11_: any[] = null;
        let _loc5_: IPartColor = null;
        let _loc6_: number = 0;
        if (!this._SafeStr_2176) {
            return 0;
        }
        let _loc10_: IFigureSetData = this._SafeStr_2176.figureData;
        let _loc4_: any[] = param1.getPartTypeIds();
        for (_loc15_ of _loc4_ ?? []) {
            _loc9_ = _loc10_.getSetType(stringOrNull(_loc15_));
            if (_loc9_) {
                _loc13_ = param1.getPartSetId(stringOrNull(_loc15_));
                _loc12_ = _loc9_.getPartSet(_loc13_);
                if (_loc12_ != null) {
                    _loc6_ = Math.max(_loc12_.clubLevel, _loc6_) | 0;
                    _loc14_ = _loc10_.getPalette(_loc9_.paletteID);
                    if (_loc14_) {
                        _loc11_ = param1.getPartColorIds(stringOrNull(_loc15_));
                        for (_loc7_ of _loc11_ ?? []) {
                            _loc5_ = _loc14_.getColor(_loc7_ | 0);
                            if (_loc5_) {
                                _loc6_ = Math.max(_loc5_.clubLevel, _loc6_) | 0;
                            }
                        }
                    }
                }
            }
        }
        if (param3 == null) {
            param3 = this._SafeStr_2176.getBodyPartsUnordered("full");
        }
        for (const _loc8_ of param3 ?? []) {
            _loc9_ = _loc10_.getSetType(stringOrNull(_loc8_));
            if (_loc4_.indexOf(_loc8_) == -1) {
                _loc6_ = Math.max(_loc9_.optionalFromClubLevel(param2), _loc6_) | 0;
            }
        }
        return _loc6_;
    }

    public resetAssetManager(): void {
        this._SafeStr_2657.reset();
    }

    public resetAllCaches(): void {
        let _loc2_: any[] = [];
        for (const _loc1_ of this._activeImages ?? []) {
            if (_loc1_ && !_loc1_.disposed) {
                _loc1_.resetCache();
                _loc2_.push(_loc1_);
            }
        }
        this._activeImages = _loc2_;
    }

    public purgeAssets(): void {
        if (this._SafeStr_2367) {
            this._SafeStr_2367.purge();
        }
    }

    public get isReady(): boolean {
        return this._isReady;
    }

    protected override initInstanceFields(): void {
        this.onAvatarActionsLoaded = this.onAvatarActionsLoaded.bind(this);
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.onAvatarAssetsLibraryReady = this.onAvatarAssetsLibraryReady.bind(this);
        this.onEffectAssetsLibraryReady = this.onEffectAssetsLibraryReady.bind(this);
        this.onFigureDataDownloadDone = this.onFigureDataDownloadDone.bind(this);
        this.onAvatarAssetsDownloadManagerReady = this.onAvatarAssetsDownloadManagerReady.bind(this);
        this.onEffectAssetsDownloadManagerReady = this.onEffectAssetsDownloadManagerReady.bind(this);
        this.AVATAR_PLACEHOLDER_FIGURE = "hd-99999-99999";
        this._SafeStr_6077 = false;
        this._SafeStr_6138 = false;
        this._SafeStr_5999 = false;
        this._isReady = false;
        this._inNuxFlow = false;
        this._SafeStr_7041 = false;
        this._SafeStr_5889 = false;
        this._SafeStr_3005 = [];
        this._activeImages = [];
        preSuperAvatarRenderManager.pop()!(this);
        super.initInstanceFields();
    }

    get [IAvatarRenderManager](): true {
        return true;
    }
}
