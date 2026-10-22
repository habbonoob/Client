export interface IGuildData {
    get ownedRooms(): any[];
    get exists(): boolean;
    get isOwner(): boolean;
    get groupId(): number;
    get groupName(): string;
    get groupDesc(): string;
    get baseRoomId(): number;
    get primaryColorId(): number;
    get secondaryColorId(): number;
    get badgeSettings(): any[];
    get locked(): boolean;
    get url(): string;
    get guildType(): number;
    get guildRightsLevel(): number;
    get badgeCode(): string;
    get membershipCount(): number;
}
