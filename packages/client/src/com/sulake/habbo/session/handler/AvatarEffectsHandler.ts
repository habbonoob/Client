import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import { AvatarEffectsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectsMessageEvent';
import { AvatarEffectsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectsMessageParser';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AvatarEffectsHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::AvatarEffectsHandler'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        AvatarEffectsHandler.#initStatics();
        return AvatarEffectsHandler._log;
    }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
        }
    }

    private onAvatarEffects(param1: IMessageEvent): void {
        let _loc3_: AvatarEffectsMessageEvent = param1 instanceof AvatarEffectsMessageEvent ? param1 : null;
        let _loc2_: AvatarEffectsMessageParser = asInstanceOf(_loc3_.getParser(), AvatarEffectsMessageParser);
        AvatarEffectsHandler._log.info("Received active avatar effects: " + _loc2_.effects);
        if (this.listener && this.listener.events) {
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarEffectsHandler.#staticsReady) return;
        AvatarEffectsHandler.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarEffectsHandler, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.session.handler.AvatarEffectsHandler"));
    }
}
