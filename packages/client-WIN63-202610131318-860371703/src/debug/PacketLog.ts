import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PacketRecorder } from '@/debug/PacketRecorder';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { SimpleLogger } from '@/debug/SimpleLogger';
import { PacketCapture } from '@/debug/PacketCapture';
import { byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import { EvaWireFormat } from '@/com/sulake/core/communication/wireformat/EvaWireFormat';

/**
 * Logs every packet the client sends and receives, through SimpleLogger ("Packets"), when the client is
 * started with the packets argument (?packets=1 in the browser). Off by default; nothing is formatted then.
 *
 * Values are written as G-Earth writes them: {i:1}{s:"text"}{b:true}. Outgoing ones are the composer's
 * values, incoming ones what the parser read (PacketRecorder), so a field the parser skips does not show.
 *
 *     [info] Packets
 *            → 2735 ClientHelloMessageComposer {s:"WIN63-..."}{s:"FLASH29"}{i:6}{i:4}
 *            ← 2491 AuthenticationOKMessageEvent {i:0}{i:3}
 *
 * tools/fixes/packet_log.py calls it from SocketConnection and reads the argument in HabboAir.
 */
export class PacketLog {
    static { registerClassName(this, 'debug::PacketLog'); }

    private static _console: boolean = false;

    /** Whether packets are looked at: written to the console (the packets launch argument, "1" or "true"), or sent to
     * the relay (PacketCapture, ?capture=). */
    public static get enabled(): boolean {
        return PacketLog._console || PacketCapture.enabled;
    }

    /** Set from the packets launch argument: the console log. */
    public static set enabled(value: boolean) {
        PacketLog._console = value;
    }

    private static _wire: EvaWireFormat = null;
    /** A packet's values past this many characters are cut (a room's heightmap, a catalog page). */
    public static maxLength: number = 4000;
    private static _log: SimpleLogger;

    private static get log(): SimpleLogger {
        if (PacketLog._log == null)
            PacketLog._log = new SimpleLogger("Packets");
        return PacketLog._log;
    }

    /** The launch argument's value: whether it turns the log on. */
    public static isOn(value: string): boolean {
        return value == "1" || value == "true" || value == "";
    }

    public static outgoing(id: number, composer: any, values: any[]): void {
        if (PacketCapture.enabled) {
            // the body as the connection encodes it (its length and header cut off)
            PacketLog._wire ??= new EvaWireFormat();
            PacketCapture.record("out", id, PacketLog.shortName(composer), byteArrayAccess.view(PacketLog._wire.encode(id, values)).slice(6));
        }
        if (!PacketLog._console)
            return;
        let text: string = "";
        for (const value of values ?? [])
            text += PacketLog.format(value);
        PacketLog.log.info("\u2192 " + id + " " + PacketLog.shortName(composer) + " " + PacketLog.cut(text));
    }

    public static incoming(id: number, events: any[], recorder: PacketRecorder): void {
        let name: string = events != null && events.length > 0 ? PacketLog.shortName(events[0]) : "(no event)";
        if (PacketCapture.enabled && recorder != null)
            PacketCapture.record("in", id, name, recorder.body);
        if (!PacketLog._console)
            return;
        let left: string = recorder != null && recorder.bytesAvailable > 0 ? " +" + recorder.bytesAvailable + " bytes unread" : "";
        PacketLog.log.info("\u2190 " + id + " " + name + " " + PacketLog.cut(recorder != null ? recorder.text : "") + left);
    }

    /** A value as G-Earth writes it. */
    public static format(value: any): string {
        if (typeof value === "boolean")
            return "{b:" + value + "}";
        if (typeof value === "number" && (value | 0) === value || typeof value === "number" && value >>> 0 === value)
            return "{i:" + value + "}";
        if (typeof value === "number")
            return Math.floor(Number(value)) == value ? "{i:" + value + "}" : "{d:" + value + "}";
        if (typeof value === "string")
            return "{s:\"" + value + "\"}";
        if (value == null)
            return "{null}";
        return "{" + getQualifiedClassName(value) + "}";
    }

    private static cut(text: string): string {
        return text.length > PacketLog.maxLength ? text.substr(0, PacketLog.maxLength) + "\u2026 (" + text.length + " characters)" : text;
    }

    private static shortName(o: any): string {
        let name: string = getQualifiedClassName(o);
        let at: number = name.lastIndexOf("::");
        return at >= 0 ? name.substr(at + 2) : name;
    }
}
