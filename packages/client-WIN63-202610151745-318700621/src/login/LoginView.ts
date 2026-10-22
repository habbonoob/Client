import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILoginContext } from '@/login/ILoginContext';
import type { Button } from '@/onBoardingHcUi/Button';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { InputField } from '@/onBoardingHcUi/InputField';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

export class LoginView extends Sprite {
    static { registerClassName(this, 'login::LoginView'); }

    declare private _context: ILoginContext;

    declare private _SafeStr_3395: TextField;

    declare private _SafeStr_2570: ColouredButton;

    declare private _SafeStr_3902: ColouredButton;

    declare private _SafeStr_3539: InputField;

    private _loginAreaWidth: number = 640;

    declare private _SafeStr_4753: InputField;

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    constructor(param1: ILoginContext) {
        super();
        this._context = param1;
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.init();
    }

    public dispose(): void {
        this._SafeStr_2570.dispose();
        this._SafeStr_3902.dispose();
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: Timer = new Timer(20, 1);
        _loc2_.addEventListener("timerComplete", this.onAlignElements);
        _loc2_.start();
    };

    private onAlignElements = (param1: TimerEvent): void => {
        LoaderUI.lineUpVertically(this._SafeStr_3539, -20, this._SafeStr_4753);
        LoaderUI.alignAnchors(this._SafeStr_3539, 0, "l", this._SafeStr_4753);
        LoaderUI.alignAnchors(this._SafeStr_3539, 0, "r", this._SafeStr_2570);
        LoaderUI.lineUpHorizontallyRevers(this._SafeStr_2570, 20, this._SafeStr_3902);
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
        this._SafeStr_3539 = new InputField(this._context, this._loginAreaWidth, "${connection.login.email}", CommunicationUtils.readSOLString("login"), "${connection.login.missing_credentials}", "");
        this.addChild(this._SafeStr_3539);
        this._SafeStr_3539.x = 0;
        this._SafeStr_3539.y = 100;
        this._SafeStr_4753 = new InputField(this._context, this._loginAreaWidth, "${connection.login.password}", CommunicationUtils.restorePassword(), "", "", true);
        this.addChild(this._SafeStr_4753);
    }

    public addButtons(): void {
        this._SafeStr_3902 = new ColouredButton("red", "${generic.cancel}", new Rectangle(0, 300, 0, 40), true, this.onCancel, 14211288);
        this.addChild(this._SafeStr_3902);
        this._SafeStr_2570 = new ColouredButton("gfreen", "${connection.login.play}", new Rectangle(0, 300, 0, 40), true, this.saveOutfit, 14211288);
        this._SafeStr_2570.active = false;
        this.addChild(this._SafeStr_2570);
    }

    private saveOutfit = (param1: Button): void => {
        this._context.initLogin(this._SafeStr_3539.text, this._SafeStr_4753.text);
    };

    private onCancel = (param1: Button): void => {
        this._context.showScreen(1);
    };

    public ready(): void {
        if ((this._SafeStr_2570 as unknown as number) != Number(false)) {
            this._SafeStr_2570.active = true;
        }
    }
}
