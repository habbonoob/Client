import type { IFocusManagerService } from '@/com/sulake/core/window/services/IFocusManagerService';
import type { IGestureAgentService } from '@/com/sulake/core/window/services/IGestureAgentService';
import type { IMouseDraggingService } from '@/com/sulake/core/window/services/IMouseDraggingService';
import type { IMouseListenerService } from '@/com/sulake/core/window/services/IMouseListenerService';
import type { IMouseScalingService } from '@/com/sulake/core/window/services/IMouseScalingService';
import type { IToolTipAgentService } from '@/com/sulake/core/window/services/IToolTipAgentService';

export interface IInternalWindowServices {
    getMouseDraggingService(): IMouseDraggingService;
    getMouseScalingService(): IMouseScalingService;
    getMouseListenerService(): IMouseListenerService;
    getFocusManagerService(): IFocusManagerService;
    getToolTipAgentService(): IToolTipAgentService;
    getGestureAgentService(): IGestureAgentService;
}
