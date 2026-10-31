/**
 * A room copy as the Habbo server's room import reads it (Habbo.Domain.Rooms.Copies.RoomCopy, format 4), field for
 * field and named as its JSON is: the G-Earth copier (tools/Habbo.RoomCopier) writes the same. The relay checks it
 * against that record before saving it.
 */
export interface RoomCopy {
    Format: 4;
    /** Where it was copied from: the hotel's domain (com, fi, com.br, ...). */
    Hotel: string;
    SourceRoomId: number;
    Name: string;
    Description: string;
    /** ISO 8601. */
    CopiedAt: string;
    /** The floor plan as the client was sent it: a row per line, separated by '\r'. */
    Heightmap: string;
    DoorX: number;
    DoorY: number;
    DoorDirection: number;
    /** -1 when the client works the wall height out itself. */
    FixedWallsHeight: number;
    UseSmallScale: boolean;
    /** Habbo's thickness steps: -2 thinnest, -1 thin, 0 normal, 1 thick. */
    WallThickness: number;
    FloorThickness: number;
    WallsHidden: boolean;
    Wallpaper: string;
    Floor: string;
    Landscape: string;
    FloorItems: RoomCopyFloorItem[];
    WallItems: RoomCopyWallItem[];
    Variables: RoomCopyVariable[] | null;
}

export interface RoomCopyFloorItem {
    /** Its furnidata id (a roomitemtypes entry). */
    ClassId: number;
    ClassName: string | null;
    X: number;
    Y: number;
    Z: number;
    /** 0 to 7. */
    Direction: number;
    Data: RoomCopyItemData;
    /** Its id on the hotel it came from, which wired boxes pick it by. */
    SourceId: number;
    Wired: RoomCopyWired | null;
    /** The number Habbo sends with it: for a teleport, the SourceId of the teleport it is linked to. */
    Extra: number;
}

export interface RoomCopyWallItem {
    ClassId: number;
    ClassName: string | null;
    /** ":w=3,2 l=10,40 r" */
    Location: string;
    State: string;
    SourceId: number;
}

/** What a floor item shows, in the client's layouts: Type says which, and only that layout's fields are set. */
export interface RoomCopyItemData {
    Type: number;
    State: string | null;
    Map: Record<string, string> | null;
    Strings: string[] | null;
    Ints: number[] | null;
    VoteResult: number | null;
    ScoreType: number | null;
    ClearType: number | null;
    HighScores: { Score: number; Users: string[] }[] | null;
    Hits: number | null;
    Target: number | null;
}

export interface RoomCopyWired {
    StuffIds: number[];
    StuffIds2: number[];
    StringParam: string;
    IntParams: number[];
    VariableIds: string[];
    FurniSources: number[];
    UserSources: number[];
    DelayInPulses: number;
    Quantifier: number;
    IsFilter: boolean;
    IsInvert: boolean;
}

export interface RoomCopyVariable {
    Id: string;
    /** Made by a variable box (0), built in (1), part of another (2), smart (3). */
    Kind: number;
    Name: string;
    /** Furni (0), users (1), the room (-10), a stack's run (-20). */
    Target: number;
}
