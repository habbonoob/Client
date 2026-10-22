import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NotificationType {
    static { registerClassName(this, 'com.sulake.habbo.notifications::NotificationType'); }

    public static readonly FRIEND_OFFLINE: string = "friendoffline";
    public static readonly FRIEND_ONLINE: string = "friendonline";
    public static readonly NFT_OPENING: string = "nft_opening";
    public static readonly TREASURE_HUNT: string = "treasure_hunt";
    public static readonly THIRDPARTY_FRIEND_OFFLINE: string = "thirdpartyfriendoffline";
    public static readonly THIRDPARTY_FRIEND_ONLINE: string = "thirdpartyfriendonline";
    public static readonly ACHIEVEMENT_RECEIVED: string = "achievement";
    public static readonly BADGE_RECEIVED: string = "badge_received";
    public static readonly _SafeStr_14985: string = "habbicon_received";
    public static readonly INFO: string = "info";
    public static readonly RECYCLER_FINISHED: string = "recyclerok";
    public static readonly RESPECT: string = "respect";
    public static readonly _SafeStr_7456: string = "club";
    public static readonly SOUND_MACHINE: string = "soundmachine";
    public static readonly PETLEVEL: string = "petlevel";
    public static readonly CLUBGIFT: string = "clubgift";
    public static readonly _SafeStr_8380: string = "buyfurni";
    public static readonly VIP: string = "vip";
    public static readonly ROOM_MESSAGES_POSTED: string = "roommessagesposted";
    public static readonly _SafeStr_8755: string = "wired";
    public static readonly LTD: string = "ltd";
    public static readonly EARNING: string = "earning";

    constructor() {
    }
}
