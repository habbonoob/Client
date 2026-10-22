import { runtimeConfig } from '@habbo-pixi/runtime/runtime/config';

/** Habbo's hotels by their game servers: the domain a copy names its hotel by, and the website its game data is on. */
const HOTELS: Record<string, { domain: string; web: string }> = {
    'game-us.habbo.com': { domain: 'com', web: 'www.habbo.com' },
    'game-br.habbo.com': { domain: 'com.br', web: 'www.habbo.com.br' },
    'game-tr.habbo.com': { domain: 'com.tr', web: 'www.habbo.com.tr' },
    'game-de.habbo.com': { domain: 'de', web: 'www.habbo.de' },
    'game-es.habbo.com': { domain: 'es', web: 'www.habbo.es' },
    'game-fi.habbo.com': { domain: 'fi', web: 'www.habbo.fi' },
    'game-fr.habbo.com': { domain: 'fr', web: 'www.habbo.fr' },
    'game-it.habbo.com': { domain: 'it', web: 'www.habbo.it' },
    'game-nl.habbo.com': { domain: 'nl', web: 'www.habbo.nl' },
    'game-s2.habbo.com': { domain: 'sandbox', web: 'sandbox.habbo.com' },
};

export function hotelOf(gameHost: string): { domain: string; web: string } {
    const known = HOTELS[gameHost.toLowerCase()];
    if (known) return known;
    // another server (ours, a test hotel): named by its host
    return { domain: gameHost, web: gameHost };
}

/** The class names of the hotel's furni by their furnidata ids, which the Flash client is not sent in a room: read
 * from the hotel's own furnidata (gamedata/furnidata_json), through the page's server (it sends no CORS headers). */
export class FurniNames {
    readonly #floor = new Map<number, string>();
    readonly #wall = new Map<number, string>();

    get size(): number {
        return this.#floor.size + this.#wall.size;
    }

    floor(id: number): string | null {
        return this.#floor.get(id) ?? null;
    }

    wall(id: number): string | null {
        return this.#wall.get(id) ?? null;
    }

    static async load(webHost: string): Promise<FurniNames> {
        const response = await fetch(runtimeConfig.remoteUrl(`https://${webHost}/gamedata/furnidata_json/1`));
        if (!response.ok) throw new Error(`furnidata: HTTP ${response.status}`);
        const data = await response.json();
        const names = new FurniNames();
        for (const f of data?.roomitemtypes?.furnitype ?? []) names.#floor.set(f.id, String(f.classname ?? ''));
        for (const f of data?.wallitemtypes?.furnitype ?? []) names.#wall.set(f.id, String(f.classname ?? ''));
        return names;
    }
}
