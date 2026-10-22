import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { UserRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/user/UserRegistryItem';

export class UserRegistry {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.user::UserRegistry'); }

    private static readonly MAX_USERS_TO_STORE: number = 80;
    private _registry: UtilsMap = new UtilsMap();
    private _roomName: string = "";

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    private _SafeStr_5222: any[] = [];

    constructor() {
    }

    public getRegistry(): UtilsMap {
        return this._registry;
    }

    public getEntry(param1: number): UserRegistryItem {
        return this._registry[param1];
    }

    public registerRoom(param1: number, param2: string): void {
        this._roomId = param1;
        this._roomName = param2;
        if (this._roomName != "") {
            this.addRoomNameForMissing();
        }
    }

    public registerUser(param1: number, param2: string, param3: string = ""): void {
        let _loc4_: UserRegistryItem = null;
        if (this._registry.getValue(param1) != null) {
            this._registry.remove(param1);
        }
        _loc4_ = new UserRegistryItem(param1, param2, param3, this._roomId, this._roomName);
        if (this._roomName == "") {
            this._SafeStr_5222.push(param1);
        }
        this._registry.add(param1, _loc4_);
        this.purgeUserIndex();
    }

    private purgeUserIndex(): void {
        let _loc1_: number = 0;
        while (this._registry.length > 80) {
            _loc1_ = this._registry.getKey(0) | 0;
            this._registry.remove(_loc1_);
        }
    }

    private addRoomNameForMissing(): void {
        let _loc1_: UserRegistryItem = null;
        while (this._SafeStr_5222.length > 0) {
            _loc1_ = this._registry.getValue(this._SafeStr_5222.shift());
            if (_loc1_ != null && _loc1_.roomId == this._roomId) {
                _loc1_.roomName = this._roomName;
            }
        }
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
