import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { LoginFlow } from '@/login/LoginFlow';
import type { Button } from '@/onBoardingHcUi/Button';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { InputField } from '@/onBoardingHcUi/InputField';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

export class SsoTokenView extends Sprite {
    static { registerClassName(this, 'login::SsoTokenView'); }

    declare private _context: LoginFlow;

    declare private _SafeStr_3395: TextField;

    declare private _SafeStr_2570: ColouredButton;

    declare private _SafeStr_3902: ColouredButton;

    private _loginAreaWidth: number = 640;

    declare private _SafeStr_3107: InputField;

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    constructor(param1: LoginFlow) {
        super();
        this._context = param1;
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.init();
    }

    public dispose(): void {
        if (this._SafeStr_3107) {
            this._SafeStr_3107.removeEventListener("change", this.onInputChange);
        }
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: Timer = new Timer(20, 1);
        _loc2_.addEventListener("timerComplete", this.onAlignElements);
        _loc2_.start();
    };

    private onAlignElements = (param1: TimerEvent): void => {
        LoaderUI.alignAnchors(this._SafeStr_3107, 0, "r", this._SafeStr_2570);
        LoaderUI.alignAnchors(this._SafeStr_2570, -20 - this._SafeStr_3902.width | 0, "l", this._SafeStr_3902);
        Logger.log("(login) Buttons: " + [this._SafeStr_2570.x, this._SafeStr_2570.y, this._SafeStr_3902.x, this._SafeStr_3902.y]);
    };

    public init(): void {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this.addTitleField();
        this.addInputFields();
        this.addButtons();
    }

    private addTitleField(): void {
        if (!this._SafeStr_3395) {
            this._SafeStr_3395 = LoaderUI.createTextField("${connection.login.title}", 40, 16777215, false, true, false, false, "left");
            this._SafeStr_3395.x = 0;
            this._SafeStr_3395.y = 0;
            this._SafeStr_3395.width = 500;
            this._SafeStr_3395.multiline = false;
            this._SafeStr_3395.thickness = 50;
            this.addChild(this._SafeStr_3395);
        }
    }

    private addInputFields(): void {
        this._SafeStr_3107 = new InputField(this._context, this._loginAreaWidth, "${connection.login.code.prompt}", "", "${connection.login.useTicket}", "", true);
        this.addChild(this._SafeStr_3107);
        this._SafeStr_3107.addEventListener("change", this.onInputChange);
        this._SafeStr_3107.addEventListener("keyDown", this.onInputKeyboardEvent);
        this._SafeStr_3107.x = 0;
        this._SafeStr_3107.y = 100;
    }

    private onInputKeyboardEvent = (param1: KeyboardEvent): void => {
        if (param1.charCode == 13) {
            if (this._SafeStr_2570 && this._SafeStr_2570.active) {
                this.onLogin(null);
            }
        }
    };

    private onInputChange = (param1: Event): void => {
        let _loc2_: string[] = [];
        if (this.validateToken(_loc2_)) {
            this._context.updateEnvironment(_loc2_[0], true);
            this._SafeStr_2570.active = true;
        } else {
            this._SafeStr_2570.active = false;
        }
    };

    public addButtons(): void {
        this._SafeStr_3902 = new ColouredButton("red", "${generic.cancel}", new Rectangle(0, 300, 0, 40), true, this.onCancel, 14211288);
        this.addChild(this._SafeStr_3902);
        this._SafeStr_2570 = new ColouredButton("gfreen", "${connection.login.play}", new Rectangle(0, 300, 0, 40), true, this.onLogin, 14211288);
        this._SafeStr_2570.active = false;
        this.addChild(this._SafeStr_2570);
    }

    private onLogin = (param1: Button): void => {
        let _loc2_: string[] = [];
        if (this.validateToken(_loc2_)) {
            this._context.initLoginWithSsoToken(_loc2_[0], _loc2_[1] + "." + _loc2_[2]);
        } else {
            this._SafeStr_2570.active = false;
        }
    };

    private validateToken(param1: string[]): boolean {
        let _loc4_: string = this._SafeStr_3107.text;
        if (!_loc4_) {
            return false;
        }
        if (_loc4_.length == 0) {
            return false;
        }
        let _loc3_: any[] = _loc4_.split(".");
        if (_loc3_.length != 3 && _loc3_.length != 4) {
            return false;
        }
        let _loc2_: string = String(_loc3_[0]).replace("hh", "");
        _loc2_ = _loc2_.replace("br", "pt");
        _loc2_ = _loc2_.replace("us", "en");
        param1.push(_loc2_);
        param1.push(stringOrNull(_loc3_[1]));
        param1.push(stringOrNull(_loc3_[2]));
        return true;
    }

    private onCancel = (param1: Button): void => {
        this._context.showScreen(1);
    };

    public ready(): void {
        if ((this._SafeStr_2570 as unknown as number) != Number(false)) {
            this._SafeStr_2570.active = true;
        }
    }
}
