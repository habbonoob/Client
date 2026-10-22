import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import { AvatarContextInfoView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';

export class UserNameView extends AvatarContextInfoView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::UserNameView'); }

    public static readonly DEFAULT_BG_COLOR: number = 4288528218;
    public static readonly DEFAULT_FADE_DELAY_MS: number = 8000;

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _isGameRoomMode: boolean;
    static { (this.prototype as any)._isGameRoomMode = false; }

    constructor(param1: AvatarInfoWidget, param2: boolean = false) {
        super(param1);
        this._isGameRoomMode = param2;
    }

    public static setup_UserNameView(param1: UserNameView, param2: number, param3: string, param4: number, param5: number, param6: number, param7: number = 4288528218, param8: number = 8000, param9: boolean = false): void {
        param1._objectId = param6;
        param1._SafeStr_5779 = param8;
        AvatarContextInfoView.setup(param1, param2, param3, param4, param5, false, param9);
        param1._window.color = param7;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get isGameRoomMode(): boolean {
        return this._isGameRoomMode;
    }

    public override get maximumBlend(): number {
        if (this._isGameRoomMode) {
            return 0.75;
        }
        return super.maximumBlend;
    }
}
