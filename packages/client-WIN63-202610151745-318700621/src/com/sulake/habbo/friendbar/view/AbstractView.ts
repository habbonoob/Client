import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class AbstractView extends Component {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view::AbstractView'); }

    declare protected _windowManager: IHabboWindowManager;

    declare protected _avatarManager: IAvatarRenderManager;

    declare protected _localizationManager: IHabboLocalizationManager;

    declare protected _sessionDataManager: ISessionDataManager;

    declare protected _tracking: IHabboTracking;

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._tracking = param1;
         })]);
    }
}
