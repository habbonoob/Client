import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';

export interface ICoreErrorLogger {
    logCrash(param1: string): void;
    logError(param1: string): void;
}

registerTypeDescriptions({"com.sulake.core.runtime::ICoreErrorLogger":{"interface":true,"instance":[["m","logCrash","void",[],[["String",false]]],["m","logError","void",[],[["String",false]]]]}});
