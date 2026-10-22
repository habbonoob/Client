import type { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';

export interface VariableFxEditorStateListener {
    variableFxStateChanged(param1: VariableFxEditorState, param2?: boolean): void;
}
