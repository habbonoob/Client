export interface IFriend {
    get id(): number;
    get name(): string;
    get gender(): number;
    get online(): boolean;
    get followingAllowed(): boolean;
    get figure(): string;
    get realName(): string;
    get persistedMessageUser(): boolean;
    get pocketHabboUser(): boolean;
    get relationshipStatus(): number;
}
