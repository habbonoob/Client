import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { ButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonRowPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Clipboard } from '@habbo-pixi/runtime/desktop/Clipboard';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class ApiKeySection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections.applications::ApiKeySection'); }

    declare private _SafeStr_14361: (...args: any[]) => any;

    declare private _SafeStr_14362: (...args: any[]) => any;

    declare private _mainContainer: SimpleListViewPreset;

    declare private _buttons: ButtonRowPreset;

    declare private _SafeStr_14363: ButtonPreset;

    declare private _SafeStr_5723: ButtonPreset;

    declare private _SafeStr_14364: ButtonPreset;

    declare private _key: TextAreaPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: boolean, param5: (...args: any[]) => any, param6: (...args: any[]) => any = null) {
        super(param1, param2, param3);
        this._SafeStr_14361 = param5;
        this._SafeStr_14362 = param6;
        this._SafeStr_14363 = param2.createButton("${wiredfurni.params.web_api.generate}", param5);
        this._SafeStr_5723 = param2.createButton("${wiredfurni.params.web_api.clear}", this.onClearKey);
        this._SafeStr_14364 = param2.createButton("${wiredfurni.params.web_api.copy}", this.onCopyKey);
        this._buttons = param2.createButtonRow([this._SafeStr_14363, this._SafeStr_5723, this._SafeStr_14364]);
        let _loc7_: TextAreaParam = new TextAreaParam(30, -1, -1, -1, -1, "", null, null, false, true);
        this._key = param2.createTextArea(_loc7_);
        this._mainContainer = param2.createSimpleListView(true, [this._buttons, this._key]);
        let _loc8_: string = param4 ? "${wiredfurni.params.web_api.write.title}" : "${wiredfurni.params.web_api.read.title}";
        this.initializeSection(_loc8_, this._mainContainer);
    }

    private onClearKey = (): void => {
        this._key.text = "";
        this.onKeyTextChanged();
    };

    private onCopyKey = (): void => {
        Clipboard.generalClipboard.setData("air:text", this._key.text);
        this._roomEvents.notifications.addItem("${notification.wired.copied_api_key}", "wired");
    };

    public set key(param1: string) {
        this._key.text = param1;
        this.onKeyTextChanged();
    }

    public get key(): string {
        return this._key.text;
    }

    private onKeyTextChanged(): void {
        if (this._key.text.length > 0) {
            this._SafeStr_14363.buttonText = "${wiredfurni.params.web_api.regenerate}";
            this._SafeStr_5723.disabled = false;
            this._SafeStr_14364.disabled = false;
        } else {
            this._SafeStr_14363.buttonText = "${wiredfurni.params.web_api.generate}";
            this._SafeStr_5723.disabled = true;
            this._SafeStr_14364.disabled = true;
        }
        if (this._SafeStr_14362 != null) {
            this._SafeStr_14362(this._key.text);
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_14361 = null;
        this._mainContainer = null;
        this._buttons = null;
        this._SafeStr_14363 = null;
        this._SafeStr_5723 = null;
        this._key = null;
    }
}
