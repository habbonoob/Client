/** The hotel server's website API (Habbo.Web), on the website's own origin: the session is a cookie it sets. */

export interface Account {
    username: string;
    figure: string;
    gender: 'M' | 'F';
    motto: string;
    credits: number;
    createdAt: string;
    lastLoginAt: string | null;
    canManageInvites: boolean;
    /** May import rooms copied with the room copier (the room.import permission). */
    canImportRooms: boolean;
}

export interface NewsArticle {
    id: number;
    title: string;
    body: string;
    image: string;
}

export interface Invite {
    code: string;
    note: string;
    createdAt: string;
    usedBy: string | null;
    usedAt: string | null;
}

/** A room copy as the room copier writes it (Habbo.Domain's RoomCopy); only what the page shows is typed. */
export interface RoomCopy {
    Format: number;
    Hotel: string;
    Name: string;
    FloorItems: unknown[];
    WallItems: unknown[];
}

/** What an import built (RoomImportResult): the room, or the floor plan's problems when it built nothing. */
export interface RoomImportResult {
    roomId: number | null;
    name: string;
    floorItems: number;
    wallItems: number;
    /** The furni this hotel lacks, by class name (or "floor:<id>"), with how many were left out. */
    missing: Record<string, number>;
    errors: string[];
    /** The wired boxes set up as they were (copied with :copy wired). */
    wiredBoxes: number;
    /** The teleports linked as they were there. */
    linkedTeleports: number;
    /** The teleports that lead nowhere: their partner stood in another room, or the copy is older than format 4. */
    unlinkedTeleports: number;
}

/** What a refused registration says went wrong (RegisterError on the server). */
export type RegisterError =
    | 'password' | 'email' | 'name_too_short' | 'name_too_long' | 'name_invalid' | 'name_taken' | 'invite_code';

/** A request the server answered with an error status; `error` is its `{ error }` code, when it sent one. */
export class ApiError extends Error {
    readonly status: number;
    readonly error?: string;
    /** The answer's body as sent, for the errors that carry more than a code. */
    readonly body?: unknown;

    constructor(status: number, error?: string, body?: unknown) {
        super(error ?? `HTTP ${status}`);
        this.status = status;
        this.error = error;
        this.body = body;
    }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const response = await fetch(path, {
        method,
        credentials: 'same-origin',
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!response.ok) {
        const payload = await response.json().catch(() => undefined) as { error?: string } | undefined;
        throw new ApiError(response.status, payload?.error, payload);
    }
    return response.status === 204 ? undefined as T : await response.json() as T;
}

export const api = {
    /** The logged-in account, or null when nobody is. */
    me: async (): Promise<Account | null> => {
        try {
            return await request<Account>('GET', '/api/me');
        } catch (e) {
            if (e instanceof ApiError && e.status === 401) return null;
            throw e;
        }
    },
    login: (username: string, password: string) => request<Account>('POST', '/api/auth/login', { username, password }),
    register: (form: { username: string; password: string; email: string; inviteCode: string }) =>
        request<Account>('POST', '/api/auth/register', form),
    logout: () => request<void>('POST', '/api/auth/logout'),
    hotelTicket: () => request<{ ssoTicket: string; expiresAt: string }>('POST', '/api/hotel/ticket'),
    news: () => request<NewsArticle[]>('GET', '/api/news'),
    invites: () => request<Invite[]>('GET', '/api/admin/invites'),
    createInvite: (note: string) => request<Invite>('POST', '/api/admin/invites', { note }),
    withdrawInvite: (code: string) => request<void>('DELETE', `/api/admin/invites/${encodeURIComponent(code)}`),
    /** Builds a copied room; a plan the hotel refuses comes back as a result with its errors, not as a failure. */
    importRoom: async (copy: RoomCopy): Promise<RoomImportResult> => {
        try {
            return await request<RoomImportResult>('POST', '/api/rooms/import', copy);
        } catch (e) {
            if (e instanceof ApiError && e.status === 422) return e.body as RoomImportResult;
            throw e;
        }
    },
};
