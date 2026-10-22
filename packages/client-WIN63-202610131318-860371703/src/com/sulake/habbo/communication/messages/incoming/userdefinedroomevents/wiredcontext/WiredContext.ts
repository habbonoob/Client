import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { AllVariablesInRoom } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/AllVariablesInRoom';
import { SharedGlobalPlaceholderList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/SharedGlobalPlaceholderList';
import { SharedVariableList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/SharedVariableList';
import { TextPlaceholders } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/TextPlaceholders';
import { VariableInfoAndHolders } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableInfoAndHolders';
import { VariableInfoAndValue } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableInfoAndValue';
import { VariableLeaderboardContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardContext';
import { VariableList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableList';
import { WiredContextType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/WiredContextType';

export class WiredContext {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext::WiredContext'); }

    static #staticsReady = false;

    public static get _SafeStr_4649(): WiredContext {
        WiredContext.#initStatics();
        return WiredContext._SafeStr_4649;
    }
    public static set _SafeStr_4649(value: WiredContext) {
        WiredContext.#initStatics();
        WiredContext._SafeStr_4649 = value;
    }

    private _roomVariablesList: AllVariablesInRoom = null;
    private _furniVariableInfo: VariableInfoAndHolders = null;
    private _userVariableInfo: VariableInfoAndHolders = null;
    private _globalVariableInfo: VariableInfoAndValue = null;
    private _rulesetVariables: VariableList = null;
    private _referenceVariablesList: SharedVariableList = null;
    private _referencePlaceholderList: SharedGlobalPlaceholderList = null;
    private _SafeStr_14932: TextPlaceholders = null;
    private _SafeStr_14933: VariableLeaderboardContext = null;

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        if (param1 == null) {
            return;
        }
        let _loc4_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            _loc2_ = param1.readInteger();
            switch (_loc2_) {
                case WiredContextType._SafeStr_7555:
                    this._roomVariablesList = new AllVariablesInRoom(param1);
                    break;
                case WiredContextType._SafeStr_7440:
                    this._furniVariableInfo = new VariableInfoAndHolders(param1);
                    break;
                case WiredContextType._SafeStr_7461:
                    this._userVariableInfo = new VariableInfoAndHolders(param1);
                    break;
                case WiredContextType._SafeStr_7551:
                    this._globalVariableInfo = new VariableInfoAndValue(param1);
                    break;
                case WiredContextType._SafeStr_7569:
                    this._referenceVariablesList = new SharedVariableList(param1);
                    break;
                case WiredContextType._SafeStr_7563:
                    this._rulesetVariables = VariableList.createFromMessage(param1);
                    break;
                case WiredContextType._SafeStr_7479:
                    this._referencePlaceholderList = new SharedGlobalPlaceholderList(param1);
                    break;
                case WiredContextType._SafeStr_14934:
                    this._SafeStr_14932 = new TextPlaceholders(param1);
                    break;
                case WiredContextType.VARIABLE_LEADERBOARD:
                    this._SafeStr_14933 = new VariableLeaderboardContext(param1);
            }
            _loc3_++;
        }
    }

    public get roomVariablesList(): AllVariablesInRoom {
        return this._roomVariablesList;
    }

    public get furniVariableInfo(): VariableInfoAndHolders {
        return this._furniVariableInfo;
    }

    public get userVariableInfo(): VariableInfoAndHolders {
        return this._userVariableInfo;
    }

    public get globalVariableInfo(): VariableInfoAndValue {
        return this._globalVariableInfo;
    }

    public get referenceVariablesList(): SharedVariableList {
        return this._referenceVariablesList;
    }

    public get referencePlaceholderList(): SharedGlobalPlaceholderList {
        return this._referencePlaceholderList;
    }

    public get rulesetVariables(): VariableList {
        return this._rulesetVariables;
    }

    public get textPlaceholders(): TextPlaceholders {
        return this._SafeStr_14932;
    }

    public get variableLeaderboardContext(): VariableLeaderboardContext {
        return this._SafeStr_14933;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (WiredContext.#staticsReady) return;
        WiredContext.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(WiredContext, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_4649", null);
        set("_SafeStr_4649", new WiredContext(null));
    }
}
