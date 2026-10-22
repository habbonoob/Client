import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChatBubbleSimulationEntity } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatBubbleSimulationEntity';

export class ChatFlowGravity {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.simulation::ChatFlowGravity'); }

    public static readonly INPUT_GRAVITY_COEFFICIENT: number = 60;
    public static readonly INPUT_GRAVITY_USERPOS_MARGIN: number = 15;
    public static readonly INPUT_GRAVITY_MAX_IMPULSE: number = 40;
    private readonly MAX_ATTRACTION_RANGE: number = 380;
    private readonly NORMAL_SCALING_COEFFICENT: number = 1;

    constructor() {
    }

    public getAttraction(param1: ChatBubbleSimulationEntity, param2: ChatBubbleSimulationEntity, param3: number = 1, param4: number = 100): number {
        let _loc5_: number = Number(Math.abs(param2.centerX - param1.centerX));
        if (_loc5_ > 380) {
            return 0;
        }
        if (_loc5_ < 1) {
            return 0;
        }
        let _loc6_: number = param1.centerX <= param2.centerX ? 1 : -1;
        return _loc6_ * Math.min(Math.min(_loc5_, param3 / _loc5_), param4);
    }
}
