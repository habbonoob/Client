import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IHabboWebApiListener } from '@/com/sulake/habbo/communication/IHabboWebApiListener';

export interface IHabboWebApiSession extends IDisposable {
    addListener(param1: IHabboWebApiListener): boolean;
    removeListener(param1: IHabboWebApiListener): void;
    setCaptchaToken(param1: string): boolean;
    emailChange(param1: string): void;
    passwordChange(param1: string): void;
    tosAccept(): void;
    captcha(): void;
    achievements(): void;
    achievementsForId(param1: number): void;
    activate(param1: string): void;
    login(param1: string, param2: string): void;
    facebook(param1: string): void;
    rpx(param1: string): void;
    logout(): void;
    authenticateUser(): void;
    forgotPassword(param1: string): void;
    changePassword(param1: string, param2: string, param3: string, param4: string): void;
    groups(param1: number): void;
    members(param1: number): void;
    hello(): void;
    time(): void;
    register(param1: string, param2: string, param3: number, param4: number, param5: number, param6: boolean, param7: string): void;
    popularRooms(): void;
    room(param1: number): void;
    hotlooks(): void;
    logCrash(param1: string): void;
    logError(param1: string): void;
    logLoginStep(param1: string, param2: string): void;
    clientUrl(): void;
    nameCheck(param1: string): void;
    selectUser(param1: string): void;
    selectRoom(param1: number): void;
    safetyLockStatus(): void;
    safetyLockDisable(): void;
    resetTrustedLogins(): void;
    safetyLockSave(param1: string, param2: number, param3: string, param4: number, param5: string): void;
    safetyLockQuestions(): void;
    safetyLockUnlock(param1: string, param2: string, param3: boolean): void;
    commonFriends(param1: number): void;
    preferences(): void;
    self(): void;
    ping(): void;
    saveUser(): void;
    saveVisibility(param1: boolean): void;
    campaignMessages(): void;
    campaignMessagesAll(): void;
    campaignMessagesSeen(): void;
    discussions(): void;
    creditBalance(): void;
    friendRequestsSent(): void;
    friendRequestsReceived(): void;
    saveLooks(param1: string, param2: string): void;
    avatars(): void;
    selectAvatar(param1: string): void;
    changeEmail(param1: string, param2: string): void;
    createAvatar(param1: string): void;
    profile(): void;
    ssoToken(): void;
    validateItunesIAP(param1: string, param2: string, param3: number, param4: string): void;
    validatePlaystoreIAP(param1: string, param2: string, param3: number, param4: string, param5: string): void;
    setDeviceToken(param1: string): void;
    getDeviceToken(): string;
}

export const IHabboWebApiSession = Symbol('com.sulake.habbo.communication::IHabboWebApiSession');
registerClassName(IHabboWebApiSession, 'com.sulake.habbo.communication::IHabboWebApiSession');

export function isIHabboWebApiSession(value: unknown): value is IHabboWebApiSession {
    return (value as { [IHabboWebApiSession]?: true } | null | undefined)?.[IHabboWebApiSession] === true;
}

registerTypeDescriptions({"com.sulake.habbo.communication::IHabboWebApiSession":{"interface":true,"impls":["com.sulake.core.runtime::IDisposable"],"instance":[["m","addListener","Boolean",[],[["com.sulake.habbo.communication::IHabboWebApiListener",false]]],["m","removeListener","void",[],[["com.sulake.habbo.communication::IHabboWebApiListener",false]]],["m","setCaptchaToken","Boolean",[],[["String",false]]],["m","emailChange","void",[["HabboWebApiRoute",[["uri","/api/force/email-change"],["method","POST"]]]],[["String",false]]],["m","passwordChange","void",[["HabboWebApiRoute",[["uri","/api/force/password-change"],["method","POST"]]]],[["String",false]]],["m","tosAccept","void",[["HabboWebApiRoute",[["uri","/api/force/tos-accept"],["method","POST"]]]],[]],["m","captcha","void",[["HabboWebApiRoute",[["uri","/api/public/captcha"],["method","GET"]]]],[]],["m","achievements","void",[["HabboWebApiRoute",[["uri","/api/public/achievements"],["method","GET"]]]],[]],["m","achievementsForId","void",[["HabboWebApiRoute",[["uri","/api/public/achievements/:id"],["method","GET"]]]],[["int",false]]],["m","activate","void",[["HabboWebApiRoute",[["uri","/api/public/registration/activate"],["method","POST"]]]],[["String",false]]],["m","login","void",[["HabboWebApiRoute",[["uri","/api/public/authentication/login"],["method","POST"]]]],[["String",false],["String",false]]],["m","facebook","void",[["HabboWebApiRoute",[["uri","/api/public/authentication/facebook"],["method","POST"]]]],[["String",false]]],["m","rpx","void",[["HabboWebApiRoute",[["uri","/api/public/authentication/rpx"],["method","POST"]]]],[["String",false]]],["m","logout","void",[["HabboWebApiRoute",[["uri","/api/public/authentication/logout"],["method","POST"]]]],[]],["m","authenticateUser","void",[["HabboWebApiRoute",[["uri","/api/public/authentication/user"],["method","GET"]]]],[]],["m","forgotPassword","void",[["HabboWebApiRoute",[["uri","/api/public/forgotPassword/send"],["method","POST"]]]],[["String",false]]],["m","changePassword","void",[["HabboWebApiRoute",[["uri","/api/public/forgotPassword/changePassword"],["method","POST"]]]],[["String",false],["String",false],["String",false],["String",false]]],["m","groups","void",[["HabboWebApiRoute",[["uri","/api/public/groups/:id"],["method","GET"]]]],[["int",false]]],["m","members","void",[["HabboWebApiRoute",[["uri","/api/public/groups/:id/members"],["method","GET"]]]],[["int",false]]],["m","hello","void",[["HabboWebApiRoute",[["uri","/api/public/info/hello"],["method","GET"]]]],[]],["m","time","void",[["HabboWebApiRoute",[["uri","/api/public/info/time"],["method","GET"]]]],[]],["m","register","void",[["HabboWebApiRoute",[["uri","/api/public/registration/new"],["method","POST"]]]],[["String",false],["String",false],["int",false],["int",false],["int",false],["Boolean",false],["String",false]]],["m","popularRooms","void",[["HabboWebApiRoute",[["uri","/api/public/rooms/popular"],["method","GET"]]]],[]],["m","room","void",[["HabboWebApiRoute",[["uri","/api/public/rooms/:roomId"],["method","GET"]]]],[["int",false]]],["m","hotlooks","void",[["HabboWebApiRoute",[["uri","/api/public/lists/hotlooks"],["method","GET"]]]],[]],["m","logCrash","void",[["HabboWebApiRoute",[["uri","/api/log/crash"],["method","POST"]]]],[["String",false]]],["m","logError","void",[["HabboWebApiRoute",[["uri","/api/log/error"],["method","POST"]]]],[["String",false]]],["m","logLoginStep","void",[["HabboWebApiRoute",[["uri","/api/log/loginstep"],["method","POST"]]]],[["String",false],["String",false]]],["m","clientUrl","void",[["HabboWebApiRoute",[["uri","/api/client/clienturl"],["method","GET"]]]],[]],["m","nameCheck","void",[["HabboWebApiRoute",[["uri","/api/newuser/name/check"],["method","POST"]]]],[["String",false]]],["m","selectUser","void",[["HabboWebApiRoute",[["uri","/api/newuser/name/select"],["method","POST"]]]],[["String",false]]],["m","selectRoom","void",[["HabboWebApiRoute",[["uri","/api/newuser/room/select"],["method","POST"]]]],[["int",false]]],["m","safetyLockStatus","void",[["HabboWebApiRoute",[["uri","/api/safetylock/featureStatus"],["method","GET"]]]],[]],["m","safetyLockDisable","void",[["HabboWebApiRoute",[["uri","/api/safetylock/disable"],["method","GET"]]]],[]],["m","resetTrustedLogins","void",[["HabboWebApiRoute",[["uri","/api/safetylock/resetTrustedLogins"],["method","GET"]]]],[]],["m","safetyLockSave","void",[["HabboWebApiRoute",[["uri","/api/safetylock/save"],["method","POST"]]]],[["String",false],["int",false],["String",false],["int",false],["String",false]]],["m","safetyLockQuestions","void",[["HabboWebApiRoute",[["uri","/api/safetylock/questions"],["method","GET"]]]],[]],["m","safetyLockUnlock","void",[["HabboWebApiRoute",[["uri","/api/safetylock/unlock"],["method","POST"]]]],[["String",false],["String",false],["Boolean",false]]],["m","commonFriends","void",[["HabboWebApiRoute",[["uri","/api/user/:id/common_friends"],["method","GET"]]]],[["int",false]]],["m","preferences","void",[["HabboWebApiRoute",[["uri","/api/user/preferences"],["method","GET"]]]],[]],["m","self","void",[["HabboWebApiRoute",[["uri","/api/user/self"],["method","GET"]]]],[]],["m","ping","void",[["HabboWebApiRoute",[["uri","/api/user/ping"],["method","GET"]]]],[]],["m","saveUser","void",[["HabboWebApiRoute",[["uri","/api/user/preferences/save"],["method","POST"]]]],[]],["m","saveVisibility","void",[["HabboWebApiRoute",[["uri","/api/user/preferences/save/visibility"],["method","POST"]]]],[["Boolean",false]]],["m","campaignMessages","void",[["HabboWebApiRoute",[["uri","/api/user/campaign_messages"],["method","GET"]]]],[]],["m","campaignMessagesAll","void",[["HabboWebApiRoute",[["uri","/api/user/campaign_messages/all"],["method","GET"]]]],[]],["m","campaignMessagesSeen","void",[["HabboWebApiRoute",[["uri","/api/user/campaign_messages/seen"],["method","GET"]]]],[]],["m","discussions","void",[["HabboWebApiRoute",[["uri","/api/user/discussions"],["method","GET"]]]],[]],["m","creditBalance","void",[["HabboWebApiRoute",[["uri","/api/user/credit_balance"],["method","GET"]]]],[]],["m","friendRequestsSent","void",[["HabboWebApiRoute",[["uri","/api/user/friendrequests/sent"],["method","GET"]]]],[]],["m","friendRequestsReceived","void",[["HabboWebApiRoute",[["uri","/api/user/friendrequests/received"],["method","GET"]]]],[]],["m","saveLooks","void",[["HabboWebApiRoute",[["uri","/api/user/look/save"],["method","POST"]]]],[["String",false],["String",false]]],["m","avatars","void",[["HabboWebApiRoute",[["uri","/api/user/avatars"],["method","GET"]]]],[]],["m","selectAvatar","void",[["HabboWebApiRoute",[["uri","/api/user/avatars/select"],["method","POST"]]]],[["String",false]]],["m","changeEmail","void",[["HabboWebApiRoute",[["uri","/api/user/email/change"],["method","POST"]]]],[["String",false],["String",false]]],["m","createAvatar","void",[["HabboWebApiRoute",[["uri","/api/user/avatars"],["method","POST"]]]],[["String",false]]],["m","profile","void",[["HabboWebApiRoute",[["uri","/api/user/profile"],["method","GET"]]]],[]],["m","ssoToken","void",[["HabboWebApiRoute",[["uri","/api/ssotoken"],["method","GET"]]]],[]],["m","validateItunesIAP","void",[["HabboWebApiRoute",[["uri","/shopapi/iap/itunes/validate"],["method","POST"]]]],[["String",false],["String",false],["int",false],["String",false]]],["m","validatePlaystoreIAP","void",[["HabboWebApiRoute",[["uri","/shopapi/iap/playstore/validate"],["method","POST"]]]],[["String",false],["String",false],["int",false],["String",false],["String",false]]],["m","setDeviceToken","void",[["HabboWebApiRoute",[["uri","/api/pushwoosh/devicetoken"],["method","POST"]]]],[["String",false]]],["m","getDeviceToken","String",[],[]]]}});
