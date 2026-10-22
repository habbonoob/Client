import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

/**
 * Sends every packet the client sends and receives, decoded, to the relay (the Habbo server repository's
 * tools/Habbo.Relay), which writes them as its packet logger writes captures. On when the page is opened with
 * ?capture=<relay port> (or a relay URL); the traffic itself is encrypted, so only the client can record it.
 *
 * Packets are batched and posted a few times a second, and what is left when the page goes away is sent with it.
 */
export class PacketCapture {
    static { registerClassName(this, 'debug::PacketCapture'); }

    /** How often the batch is posted. */
    private static readonly INTERVAL_MS: number = 250;

    /** Where the relay's capture API is; null when capturing is off. */
    public static readonly url: string = PacketCapture.relayUrl();

    private static _queue: { dir: string; id: number; name: string; hex: string; time: number }[] = [];
    private static _timer: ReturnType<typeof setTimeout> = null;

    public static get enabled(): boolean {
        return PacketCapture.url != null;
    }

    public static record(direction: 'in' | 'out', id: number, name: string, body: Uint8Array): void {
        if (PacketCapture.url == null)
            return;
        let hex: string = "";
        for (let i = 0; i < body.length; i++)
            hex += (body[i] < 16 ? "0" : "") + body[i].toString(16);
        PacketCapture._queue.push({ dir: direction, id: id, name: name, hex: hex, time: Date.now() });
        PacketCapture._timer ??= setTimeout(() => PacketCapture.flush(), PacketCapture.INTERVAL_MS);
    }

    private static flush(): void {
        PacketCapture._timer = null;
        if (PacketCapture._queue.length == 0)
            return;
        const batch = PacketCapture._queue;
        PacketCapture._queue = [];
        fetch(PacketCapture.url + "/capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(batch), keepalive: true })
            .catch(e => console.warn("[PacketCapture] the relay did not take " + batch.length + " packets: " + String(e)));
    }

    /** ?capture=8791 (a port on this machine) or ?capture=http://host:port. */
    private static relayUrl(): string {
        const value = typeof location === "undefined" ? null : new URLSearchParams(location.search).get("capture");
        if (value == null || value == "" || value == "0")
            return null;
        const url = /^\d+$/.test(value) ? "http://localhost:" + value : value.replace(/\/+$/, "");
        if (typeof window !== "undefined")
            window.addEventListener("pagehide", () => PacketCapture.flush());
        console.info("[PacketCapture] recording packets to " + url);
        return url;
    }
}
