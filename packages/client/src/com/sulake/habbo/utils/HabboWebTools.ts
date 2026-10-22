import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboWebTools {
    static { registerClassName(this, 'com.sulake.habbo.utils::HabboWebTools'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboWebTools.#initStatics();
        return HabboWebTools._log;
    }

    public static readonly _SafeStr_8352: string = "advertisement";
    public static readonly _SafeStr_8169: string = "_self";
    public static readonly WINDOW_HABBO_MAIN: string = "habboMain";
    public static readonly OPEN_INTERNAL_LINK_FROM_WEB_CALLBACK: string = "openlink";
    public static readonly GOTO_ROOM_FROM_WEB_CALLBACK: string = "openroom";
    public static readonly HABBLET_AVATARS: string = "avatars";
    public static readonly HABBLET_PRIVACY: string = "privacy";
    public static readonly HABBLET_MINI_MAIL: string = "minimail";
    public static readonly HABBLET_ROOM_ENTER_AD: string = "roomenterad";
    public static readonly HABBLET_NEWS: string = "news";
    private static _isSpaWeb: boolean = false;
    private static _baseUrl: string;

    public static set isSpaWeb(param1: boolean) {
        HabboWebTools._isSpaWeb = param1;
    }

    public static set baseUrl(param1: string) {
        HabboWebTools._baseUrl = param1;
    }

    public static logEventLog(param1: string): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.logEventLog", param1);
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working, failed to log event log.");
        }
    }

    public static openWebPage(param1: string, param2: string = ""): void {
        let _loc3_: string = null;
        if (param2 == null || param2 == "") {
            param2 = "habboMain";
        }
        if (!param1) {
            return;
        }
        if (!ExternalInterface.available) {
            if (param1.indexOf("http") == 0) {
                HabboWebTools.navigateToURL(param1, param2);
            } else {
                HabboWebTools.navigateToURL(HabboWebTools._baseUrl + "/" + param1, param2);
            }
        } else {
            try {
                _loc3_ = stringOrNull(ExternalInterface.call("function() {return navigator.userAgent;}").toLowerCase());
                if (_loc3_.indexOf("firefox") >= 0) {
                    ExternalInterface.call("window.open", param1, param2);
                } else if (_loc3_.indexOf("msie") >= 0) {
                    ExternalInterface.call("function setWMWindow() {window.open(\'" + param1 + "\', \'" + param2 + "\');}");
                } else {
                    HabboWebTools.navigateToURL(param1, param2);
                }
            } catch (e) {
                HabboWebTools._log.warn("External interface not working, failed to open web page.");
            }
        }
    }

    public static openPage(param1: string): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.openPage", param1);
            } else {
                if (param1.indexOf("http") == 0) {
                    HabboWebTools.navigateToURL(param1, "habboMain");
                } else {
                    HabboWebTools.navigateToURL(HabboWebTools._baseUrl + "/" + param1, "habboMain");
                }
                HabboWebTools._log.warn("External interface not available, openPage failed.");
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to open web page " + param1);
        }
    }

    public static sendHeartBeat(): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.heartBeat");
            }
        } catch (e) {
        }
    }

    public static openWebPageAndMinimizeClient(param1: string): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    HabboWebTools.openPage(param1);
                    return;
                }
            }
            if (param1.indexOf("http") == 0) {
                HabboWebTools.navigateToURL(param1, "habboMain");
            } else {
                HabboWebTools.navigateToURL(HabboWebTools._baseUrl + "/" + param1, "habboMain");
            }
            ExternalInterface.call("FlashExternalInterface.openWebPageAndMinimizeClient", param1);
        } catch (e) {
            HabboWebTools._log.warn("Failed to open web page " + param1);
        }
    }

    public static closeWebPageAndRestoreClient(): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.closeWebPageAndRestoreClient");
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to close web page and restore client!");
        }
    }

    public static openWebHabblet(param1: string, param2: string = null): void {
        let _loc3_: string = null;
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.openHabblet", param1, param2);
            } else {
                _loc3_ = "";
                switch (param1) {
                    case "avatars":
                        _loc3_ = HabboWebTools._baseUrl + "/settings/avatars";
                        break;
                    case "privacy":
                        _loc3_ = HabboWebTools._baseUrl + "/settings/privacy";
                        break;
                    case "news":
                        _loc3_ = HabboWebTools._baseUrl + "/community/category/all/1/";
                        break;
                    default:
                        HabboWebTools._log.warn("Unknown habblet: " + param1);
                }
                if (_loc3_.length > 0) {
                    HabboWebTools.navigateToURL(_loc3_, "habboMain");
                }
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to open Habblet " + param1);
        }
    }

    public static closeWebHabblet(param1: string, param2: string = null): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.closeHabblet", param1, param2);
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to close Habblet " + param1);
        }
    }

    public static sendDisconnectToWeb(param1: number, param2: string): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.disconnect", param1, param2);
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to close send ");
        }
    }

    public static showGame(param1: string): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalGameInterface.showGame", param1);
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to open game: " + e);
        }
    }

    public static hideGame(): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalGameInterface.hideGame");
            }
        } catch (e) {
            HabboWebTools._log.warn("Failed to hide game");
        }
    }

    public static navigateToURL(param1: string, param2: string = null): void {
        if (!param1 || param1.length == 0) {
            HabboWebTools._log.warn("Can not navigate to empty url");
            return;
        }
        let _loc3_: URLRequest = new URLRequest(param1);
        navigateToURL(_loc3_, param2);
    }

    public static openExternalLinkWarning(param1: string): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.openExternalLink", escape(param1));
            } else {
                HabboWebTools.navigateToURL(param1, "habboMain");
                HabboWebTools._log.warn("External interface not available. Could not request to open: " + param1);
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not request to open: " + param1);
        }
    }

    public static roomVisited(param1: number): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.roomVisited", param1);
            } else {
                HabboWebTools._log.warn("External interface not available. Could not store last room visit.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not store last room visit.");
        }
    }

    public static openMinimail(param1: string): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    ExternalInterface.call("FlashExternalInterface.openMinimail", param1);
                } else {
                    HabboWebTools.openWebHabblet("minimail", param1);
                }
            } else {
                HabboWebTools.openWebHabblet("minimail", param1);
                HabboWebTools._log.warn("External interface not available. Could not open minimail.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not open minimail.");
        }
    }

    public static openNews(): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    ExternalInterface.call("FlashExternalInterface.openNews");
                } else {
                    HabboWebTools.openWebHabblet("news");
                }
            } else {
                HabboWebTools.openWebHabblet("news");
                HabboWebTools._log.warn("External interface not available. Could not open news.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not open news.");
        }
    }

    public static closeNews(): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    ExternalInterface.call("FlashExternalInterface.closeNews");
                } else {
                    HabboWebTools.closeWebHabblet("news");
                }
            } else {
                HabboWebTools.closeWebHabblet("news");
                HabboWebTools._log.warn("External interface not available. Could not close news.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not close news.");
        }
    }

    public static openAvatars(): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    ExternalInterface.call("FlashExternalInterface.openAvatars");
                } else {
                    HabboWebTools.openWebHabblet("avatars");
                }
            } else {
                HabboWebTools.openWebHabblet("avatars");
                HabboWebTools._log.warn("External interface not available. Could not open avatars.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not open avatars.");
        }
    }

    public static openPrivacy(): void {
        HabboWebTools.openWebHabblet("privacy");
    }

    public static openRoomEnterAd(): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    ExternalInterface.call("FlashExternalInterface.openRoomEnterAd");
                } else {
                    HabboWebTools.openWebHabblet("roomenterad", "");
                }
            } else {
                HabboWebTools.openWebHabblet("roomenterad", "");
                HabboWebTools._log.warn("External interface not available. Could not open roomenterad.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not open roomenterad.");
        }
    }

    public static updateFigure(param1: string): void {
        try {
            if (ExternalInterface.available) {
                if (HabboWebTools._isSpaWeb) {
                    ExternalInterface.call("FlashExternalInterface.updateFigure", param1);
                }
            } else {
                HabboWebTools._log.warn("External interface not available. Could not update figure.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not update figure.");
        }
    }

    public static logOut(): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.logout");
            } else {
                HabboWebTools._log.warn("External interface not available. Could not logout.");
            }
        } catch (e) {
            HabboWebTools._log.warn("External interface not working. Could not logout.");
        }
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboWebTools.#staticsReady) return;
        HabboWebTools.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboWebTools, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.utils.HabboWebTools"));
    }
}
