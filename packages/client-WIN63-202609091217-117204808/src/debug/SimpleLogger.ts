import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

/**
 * Lightweight logger that formats trace() output to look like the
 * Microsoft.Extensions.Logging / ASP.NET Core SimpleConsoleFormatter:
 *
 *   info: MyApp.Services.RoomManager[0]
 *         Room 4021 loaded with 3 users
 *
 * The 4-char level tag, category[eventId] header line, and the
 * 6-space-indented message on the following line all match the .NET default.
 *
 * Usage:
 *   var log:SimpleLogger = new SimpleLogger("MyApp.Net.Session");
 *   log.info("Connected");
 *   log.warn("Ping timeout, dropping connection", 42);
 *   log.error("Handshake failed", 0, someError);
 *
 * Or one-off static calls:
 *   SimpleLogger.write(SimpleLogger.INFORMATION, "Startup", "Application started");
 */
export class SimpleLogger {
    static { registerClassName(this, 'debug::SimpleLogger'); }

    static #staticsReady = false;

    // Log levels (values ordered like Microsoft.Extensions.Logging.LogLevel)
    public static readonly TRACE: number = 0;
    public static readonly DEBUG: number = 1;
    public static readonly INFORMATION: number = 2;
    public static readonly WARNING: number = 3;
    public static readonly ERROR: number = 4;
    public static readonly CRITICAL: number = 5;
    public static readonly NONE: number = 6;
    // 4-char tags, exactly as .NET writes them.
    private static readonly TAGS: any[] = ["trce", "dbug", "info", "warn", "fail", "crit"];

    // Messages below this level are dropped. Set once at startup.
    public static get minimumLevel(): number {
        SimpleLogger.#initStatics();
        return SimpleLogger.minimumLevel;
    }
    public static set minimumLevel(value: number) {
        SimpleLogger.#initStatics();
        SimpleLogger.minimumLevel = value;
    }

    // Prefix every header line with an ISO-ish timestamp, like the
    // "yyyy-MM-dd HH:mm:ss" you get with the timestamp formatter option.
    public static showTimestamp: boolean = false;

    declare private _category: string;

    constructor(category: string = "Default") {
        this._category = category;
    }

    public trace(msg: string, eventId: number = 0): void {
        this.log(SimpleLogger.TRACE, msg, eventId);
    }

    public debug(msg: string, eventId: number = 0): void {
        this.log(SimpleLogger.DEBUG, msg, eventId);
    }

    public info(msg: string, eventId: number = 0): void {
        this.log(SimpleLogger.INFORMATION, msg, eventId);
    }

    public warn(msg: string, eventId: number = 0): void {
        this.log(SimpleLogger.WARNING, msg, eventId);
    }

    public error(msg: string, eventId: number = 0, err: Error = null): void {
        this.log(SimpleLogger.ERROR, SimpleLogger.appendError(msg, err), eventId);
    }

    public critical(msg: string, eventId: number = 0, err: Error = null): void {
        this.log(SimpleLogger.CRITICAL, SimpleLogger.appendError(msg, err), eventId);
    }

    public log(level: number, msg: string, eventId: number = 0): void {
        SimpleLogger.write(level, this._category, msg, eventId);
    }

    /** Static entry point if you do not want to hold a SimpleLogger instance. */
    public static write(level: number, category: string, msg: string, eventId: number = 0): void {
        if (level < SimpleLogger.minimumLevel || level >= SimpleLogger.NONE)
            return;
        let header: string = SimpleLogger.TAGS[level] + ": " + category + "[" + eventId + "]";
        if (SimpleLogger.showTimestamp)
            header = SimpleLogger.timestamp() + " " + header;
        // Message gets indented so it lines up under the category text,
        // and multi-line messages keep that indent on every line.
        let indented: string = "      " + msg.split("\n").join("\n      ");
        // Native trace() is the console. Swap this for your own sink
        // (TextField, socket, file) if you route logs elsewhere.
        SimpleLogger.global_trace(header + "\n" + indented, level);
    }

    private static appendError(msg: string, err: Error): string {
        if (err == null)
            return msg;
        let out: string = msg + "\n" + err.toString();
        // getStackTrace() only returns something in a debug player.
        let st: string = err.stack;
        if (st != null && st.length > 0)
            out += "\n" + st;
        return out;
    }

    private static timestamp(): string {
        let d: Date = new Date();
        return d.getFullYear() + "-" + SimpleLogger.pad(d.getMonth() + 1 | 0) + "-" + SimpleLogger.pad(d.getDate() | 0) + " " + SimpleLogger.pad(d.getHours() | 0) + ":" + SimpleLogger.pad(d.getMinutes() | 0) + ":" + SimpleLogger.pad(d.getSeconds() | 0);
    }

    private static pad(n: number): string {
        return (n < 10 ? "0" : "") + n;
    }

    // Isolated so the real trace() is easy to find/replace with another sink.
    // The browser console has a method per level (colours, filtering, stack traces for errors).
    private static global_trace(s: string, level: number = SimpleLogger.INFORMATION): void {
        if (level >= SimpleLogger.ERROR) console.error(s);
        else if (level === SimpleLogger.WARNING) console.warn(s);
        else if (level === SimpleLogger.INFORMATION) console.info(s);
        else console.debug(s);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SimpleLogger.#staticsReady) return;
        SimpleLogger.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SimpleLogger, name, { value, writable: true, configurable: true, enumerable: true });
        set("minimumLevel", 0);
        set("minimumLevel", SimpleLogger.TRACE);
    }
}
