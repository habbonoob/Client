import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HighScoreData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::HighScoreData'); }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    private _users: any[] = [];

    constructor() {
        this._score = -1;
    }

    public get score(): number {
        return this._score;
    }

    public set score(param1: number) {
        this._score = param1;
    }

    public get users(): any[] {
        return this._users;
    }

    public set users(param1: any[]) {
        this._users = param1;
    }

    public addUser(param1: string): void {
        this._users.push(param1);
    }
}
