import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';

export interface IUIContext {
    get stage(): Stage;
    get debugText(): TextField;
}
