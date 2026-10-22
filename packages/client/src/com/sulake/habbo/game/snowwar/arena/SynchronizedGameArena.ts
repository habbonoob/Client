import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGameArenaExtension } from '@/com/sulake/habbo/game/snowwar/arena/IGameArenaExtension';
import type { ISynchronizedGameEvent } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameEvent';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { HabboGamesCom, SnowWarGameStage } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { isISynchronizedGameEvent } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameEvent';

export class SynchronizedGameArena implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.arena::SynchronizedGameArena'); }

    constructor() {
    }

    declare protected _turn: number;
    static { (this.prototype as any)._turn = 0; }

    declare private _gameEngine: SnowWarEngine;

    declare private _SafeStr_2740: any[];

    declare private _subturn: number;
    static { (this.prototype as any)._subturn = 0; }

    private _SafeStr_7533: number = 1;

    declare private _SafeStr_5377: SynchronizedGameStage;

    declare private _SafeStr_3759: IGameArenaExtension;

    declare private _checkSums: UtilsMap;

    private _disposed: boolean = false;
    private _SafeStr_5151: boolean = false;

    declare private _teamScores: any[];

    declare private _numberOfTeams: number;
    static { (this.prototype as any)._numberOfTeams = 0; }

    public get numberOfTeams(): number {
        return this._numberOfTeams;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get gameEngine(): SnowWarEngine {
        return this._gameEngine;
    }

    public get subturn(): number {
        return this._subturn;
    }

    public dispose(): void {
        this._disposed = true;
        this._gameEngine = null;
        this._SafeStr_2740 = null;
        this._SafeStr_5377 = null;
        if (this._SafeStr_3759 != null) {
            this._SafeStr_3759.dispose();
            this._SafeStr_3759 = null;
        }
        this._checkSums = null;
    }

    public initialize(param1: SnowWarEngine, param2: number): void {
        this._gameEngine = param1;
        this._SafeStr_5377 = new SnowWarGameStage();
        this._checkSums = new UtilsMap();
        this._SafeStr_2740 = [];
        this._numberOfTeams = param2;
        this._turn = 0;
        this._subturn = 0;
        this._SafeStr_2740[this._turn] = this.initEmptyEventQueue();
        this._checkSums = new UtilsMap();
        this.resetTeamScores();
    }

    public pulse(): void {
        this.gamePulse();
    }

    public gamePulse(): void {
        let _loc1_: any[] = null;
        let _loc4_: ISynchronizedGameEvent = null;
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log("Turn " + this._turn + " subturn " + (this._subturn + 1) + "/" + this.getNumberOfSubTurns());
        }
        let _loc3_: SynchronizedGameStage = this.getCurrentStage();
        let _loc2_: any[] = this._SafeStr_2740[this._turn];
        if (_loc2_) {
            _loc1_ = _loc2_[this._subturn];
            while (_loc1_.length > 0) {
                _loc4_ = asGuarded(_loc1_.shift(), isISynchronizedGameEvent);
                if (HabboGamesCom.logEnabled) {
                    HabboGamesCom.log("GameInstance::gameTurn: applying event " + _loc4_ + " turn " + this._turn + " subturn " + (this._subturn + 1) + "/" + this.getNumberOfSubTurns());
                }
                _loc4_.apply(_loc3_);
            }
        }
        if (!this._SafeStr_5151) {
            _loc3_.subturn();
        }
        if (this._subturn >= this.getNumberOfSubTurns() - 1) {
            if (this._turn % this._SafeStr_7533 == 0) {
                this._checkSums[this._turn] = this.getCurrentStage().calculateChecksum(this._turn);
            }
            this._turn = this._turn + 1;
            this._SafeStr_5151 = false;
            if (HabboGamesCom.logEnabled) {
                HabboGamesCom.log("Turn:" + this._turn);
            }
        }
        this._subturn = this._subturn + 1;
        if (this._subturn >= this.getNumberOfSubTurns()) {
            this._subturn = 0;
        }
    }

    public addGameEvent(param1: number, param2: number, param3: ISynchronizedGameEvent): void {
        let _loc4_: any[] = this._SafeStr_2740[param1];
        if (_loc4_ == null) {
            _loc4_ = this.initEmptyEventQueue();
            this._SafeStr_2740[param1] = _loc4_;
        }
        _loc4_[param2].push(param3);
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log("Add game event: " + param3 + " (subturn/turn): " + param2 + "/" + param1);
        }
    }

    public debugEventQueue(): void {
        let _loc3_: any;
        let _loc5_: number = 0;
        let _loc1_: any[] = null;
        let _loc6_: number = 0;
        let _loc4_: any[] = null;
        let _loc2_: string = "";
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_2740.length) {
            _loc1_ = this._SafeStr_2740[_loc5_];
            if (_loc1_ != null) {
                _loc6_ = 0;
                while (_loc6_ < this.getNumberOfSubTurns()) {
                    _loc4_ = _loc1_[_loc6_];
                    if (_loc4_.length != 0) {
                        _loc2_ += _loc5_ + " (" + _loc6_ + ") : ";
                        for (_loc3_ of _loc4_ ?? []) {
                            _loc2_ += _loc3_;
                        }
                        _loc2_ += "\n";
                    }
                    _loc6_++;
                }
            }
            _loc5_++;
        }
        HabboGamesCom.log(_loc2_);
    }

    public getNumberOfSubTurns(): number {
        return this.getExtension().getNumberOfSubTurns();
    }

    public getTurnNumber(): number {
        return this._turn;
    }

    public getCurrentStage(): SynchronizedGameStage {
        return this._SafeStr_5377;
    }

    public getExtension(): IGameArenaExtension {
        return this._SafeStr_3759;
    }

    public setExtension(param1: IGameArenaExtension): void {
        this._SafeStr_3759 = param1;
        param1.gameArena = this;
    }

    public getCheckSum(param1: number): number {
        return this._checkSums[param1] | 0;
    }

    public seekToTurn(param1: number, param2: number): void {
        this._turn = param1;
        this._subturn = 0;
        this._checkSums[param1] = param2;
        this._SafeStr_2740 = [];
        this._SafeStr_2740[this._turn] = this.initEmptyEventQueue();
        this._SafeStr_5151 = true;
    }

    public addTeamScore(param1: number, param2: number): void {
        if (param1 > 0 && param1 <= this._numberOfTeams) {
            let _loc3_: any = param1 - 1;
            let _loc4_: any = this._teamScores[_loc3_] + param2;
            this._teamScores[_loc3_] = _loc4_;
        }
    }

    public getTeamScores(): any[] {
        return this._teamScores;
    }

    private initEmptyEventQueue(): any[] {
        let _loc1_: number = 0;
        let _loc2_: any[] = [];
        _loc1_ = 0;
        while (_loc1_ < this.getNumberOfSubTurns()) {
            _loc2_[_loc1_] = [];
            _loc1_++;
        }
        return _loc2_;
    }

    private resetTeamScores(): void {
        let _loc1_: number = 0;
        this._teamScores = [];
        _loc1_ = 0;
        while (_loc1_ < this._numberOfTeams) {
            this._teamScores[_loc1_] = 0;
            _loc1_++;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
