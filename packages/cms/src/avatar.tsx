// The player's avatar, drawn by the hotel server's imager (/habbo-imaging/avatarimage, Habbo's own parameters) as their
// figure is now, at whole-number scales.

/** The imager's address for a player, by name. */
function avatarImage(username: string, query: string): string {
    return `/habbo-imaging/avatarimage?user=${encodeURIComponent(username)}&${query}`;
}

/** The player's head, turned towards the viewer, in the small tile beside their name in the header. */
export function AvatarThumb({ username }: { username: string }) {
    return (
        <span className="flex h-9 w-9 items-end justify-center overflow-hidden rounded-[10px] bg-surface-2">
            {/* the head is cut to what is drawn of it, so its size is the figure's (a hat makes it bigger): shown at its own
                size, never squeezed, and cropped by the tile */}
            <img className="pix max-w-none shrink-0" src={avatarImage(username, 'direction=2&head_direction=3&headonly=1&size=m')} alt="" />
        </span>
    );
}

/** The avatar standing on its tile, at twice its room size, in the frame on the player's page. */
export function AvatarStand({ name }: { name: string }) {
    return (
        <div className="relative h-[248px] w-[176px] shrink-0 overflow-hidden rounded-[24px] bg-cream/8 shadow-[inset_0_0_0_1px_rgb(255_244_230/.14)]">
            <div className="absolute inset-x-[18px] bottom-3 h-[52px] bg-sun/18 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
            {/* the imager's canvas is 180 by 260 at this size, the feet about 230 down: they stand on the tile */}
            <img className="pix absolute -left-0.5 -top-5 max-w-none" src={avatarImage(name, 'direction=2&head_direction=2&size=l')}
                alt={`${name}'s avatar`} width={180} height={260} />
        </div>
    );
}
