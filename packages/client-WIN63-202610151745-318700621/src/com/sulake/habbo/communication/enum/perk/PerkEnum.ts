import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PerkEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum.perk::PerkEnum'); }

    public static readonly USE_GUIDE_TOOL: string = "USE_GUIDE_TOOL";
    public static readonly GIVE_GUIDE_TOURS: string = "GIVE_GUIDE_TOURS";
    public static readonly JUDGE_CHAT_REVIEWS: string = "JUDGE_CHAT_REVIEWS";
    public static readonly VOTE_IN_COMPETITIONS: string = "VOTE_IN_COMPETITIONS";
    public static readonly CALL_ON_HELPERS: string = "CALL_ON_HELPERS";
    public static readonly CITIZEN: string = "CITIZEN";
    public static readonly TRADE: string = "TRADE";
    public static readonly HEIGHTMAP_EDITOR_BETA: string = "HEIGHTMAP_EDITOR_BETA";
    public static readonly BUILDER_AT_WORK: string = "BUILDER_AT_WORK";
    public static readonly NAVIGATOR_PHASE_ONE_2014: string = "NAVIGATOR_PHASE_ONE_2014";
    public static readonly CAMERA: string = "CAMERA";
    public static readonly NAVIGATOR_PHASE_TWO_2014: string = "NAVIGATOR_PHASE_TWO_2014";
    public static readonly MOUSE_ZOOM: string = "MOUSE_ZOOM";
    public static readonly NAVIGATOR_ROOM_THUMBNAIL_CAMERA: string = "NAVIGATOR_ROOM_THUMBNAIL_CAMERA";
    public static readonly HABBO_CLUB_OFFER_BETA: string = "HABBO_CLUB_OFFER_BETA";

    constructor() {
    }
}
