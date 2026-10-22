import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IRoomWidgetFactory } from '@/com/sulake/habbo/ui/IRoomWidgetFactory';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';
import type { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { CameraWidget } from '@/com/sulake/habbo/ui/widget/camera/CameraWidget';
import { RoomThumbnailCameraWidget } from '@/com/sulake/habbo/ui/widget/camera/RoomThumbnailCameraWidget';
import { RoomChatInputWidget, RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget.group';
import { FurniChooserWidget } from '@/com/sulake/habbo/ui/widget/chooser/furni/FurniChooserWidget';
import { UsersChooserWidget } from '@/com/sulake/habbo/ui/widget/chooser/users/UsersChooserWidget';
import { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import { DoorbellWidget } from '@/com/sulake/habbo/ui/widget/doorbell/DoorbellWidget';
import { EffectsWidget } from '@/com/sulake/habbo/ui/widget/effects/EffectsWidget';
import { FriendRequestWidget } from '@/com/sulake/habbo/ui/widget/friendrequest/FriendRequestWidget';
import { AreaHideFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/areahide/AreaHideFurniWidget';
import { BackgroundColorFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/backgroundcolor/BackgroundColorFurniWidget';
import { ClothingChangeFurnitureWidget } from '@/com/sulake/habbo/ui/widget/furniture/clothingchange/ClothingChangeFurnitureWidget';
import { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget.group';
import { CreditFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/credit/CreditFurniWidget';
import { CustomStackHeightWidget } from '@/com/sulake/habbo/ui/widget/furniture/CustomStackHeightWidget';
import { DimmerFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerFurniWidget';
import { EcotronBoxFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/ecotronbox/EcotronBoxFurniWidget';
import { ExternalImageWidget } from '@/com/sulake/habbo/ui/widget/furniture/externalimage/ExternalImageWidget';
import { FriendFurniConfirmWidget } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniConfirmWidget';
import { FriendFurniEngravingWidget } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniEngravingWidget';
import { HighScoreDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/highscore/HighScoreDisplayWidget';
import { FurnitureLabelWidget } from '@/com/sulake/habbo/ui/widget/furniture/label/FurnitureLabelWidget';
import { MannequinWidget } from '@/com/sulake/habbo/ui/widget/furniture/mannequin/MannequinWidget';
import { PetPackageFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/petpackage/PetPackageFurniWidget';
import { PlaceholderWidget } from '@/com/sulake/habbo/ui/widget/furniture/placeholder/PlaceholderWidget';
import { PresentFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/present/PresentFurniWidget';
import { RentableSpaceDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/rentablespace/RentableSpaceDisplayWidget';
import { CustomUserNotificationWidget } from '@/com/sulake/habbo/ui/widget/furniture/requirementsmissing/CustomUserNotificationWidget';
import { FurnitureRoomLinkWidget } from '@/com/sulake/habbo/ui/widget/furniture/roomlink/FurnitureRoomLinkWidget';
import { SpamWallPostItFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/stickie/SpamWallPostItFurniWidget';
import { StickieFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/stickie/StickieFurniWidget';
import { AchievementResolutionTrophyFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/trophy/AchievementResolutionTrophyFurniWidget';
import { TrophyFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyFurniWidget';
import { VimeoDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/video/VimeoDisplayWidget';
import { YoutubeDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/video/YoutubeDisplayWidget';
import { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import { LoadingBarWidget } from '@/com/sulake/habbo/ui/widget/loadingbar/LoadingBarWidget';
import { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import { PollWidget } from '@/com/sulake/habbo/ui/widget/poll/PollWidget';
import { RoomQueueWidget } from '@/com/sulake/habbo/ui/widget/roomqueue/RoomQueueWidget';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { UiHelpBubblesWidget } from '@/com/sulake/habbo/ui/widget/uihelpbubbles/UiHelpBubblesWidget';
import { WordQuizWidget } from '@/com/sulake/habbo/ui/widget/wordquiz/WordQuizWidget';

export class RoomWidgetFactory implements IRoomWidgetFactory {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget::RoomWidgetFactory'); }

    declare private _roomUI: RoomUI;

    constructor(param1: RoomUI) {
        this._roomUI = param1;
    }

    public dispose(): void {
        this._roomUI = null;
    }

    public createWidget(param1: string, param2: IRoomWidgetHandler): IRoomWidget {
        if (this._roomUI == null || this._roomUI.windowManager == null) {
            return null;
        }
        let _loc3_: IAssetLibrary = this._roomUI.assets;
        let _loc4_: IHabboWindowManager = this._roomUI.windowManager;
        switch (param1) {
            case "RWE_CHAT_INPUT_WIDGET":
                return new RoomChatInputWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI, this._roomUI.desktop);
            case "RWE_INFOSTAND":
                return new InfoStandWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI, this._roomUI.catalog);
            case "RWE_ME_MENU":
                return new MeMenuWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI);
            case "RWE_FURNI_PLACEHOLDER":
                return new PlaceholderWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FURNI_CREDIT_WIDGET":
                return new CreditFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FURNI_STICKIE_WIDGET":
                return new StickieFurniWidget(param2, _loc4_, _loc3_);
            case "RWE_FURNI_PRESENT_WIDGET":
                return new PresentFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI, this._roomUI.catalog, this._roomUI.inventory, this._roomUI.roomEngine);
            case "RWE_FURNI_TROPHY_WIDGET":
                return new TrophyFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI);
            case "RWE_FURNI_ACHIEVEMENT_RESOLUTION_ENGRAVING":
                return new AchievementResolutionTrophyFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI);
            case "RWE_FURNI_ECOTRONBOX_WIDGET":
                return new EcotronBoxFurniWidget(param2, _loc4_, _loc3_);
            case "RWE_FURNITURE_LABEL":
                return new FurnitureLabelWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FURNI_PET_PACKAGE_WIDGET":
                return new PetPackageFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_DOORBELL":
                return new DoorbellWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_LOADINGBAR":
                return new LoadingBarWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI);
            case "RWE_ROOM_QUEUE":
                return new RoomQueueWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI);
            case "RWE_ROOM_POLL":
                return new PollWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_USER_CHOOSER":
                return new UsersChooserWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FURNI_CHOOSER":
                return new FurniChooserWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_ROOM_DIMMER":
                return new DimmerFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FRIEND_REQUEST":
                return new FriendRequestWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI);
            case "RWE_CLOTHING_CHANGE":
                return new ClothingChangeFurnitureWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_CONVERSION_TRACKING":
                return new RoomWidgetBase(param2, _loc4_);
            case "RWE_AVATAR_INFO":
                return new AvatarInfoWidget(param2, _loc4_, _loc3_, this._roomUI, this._roomUI.localization, this._roomUI, this._roomUI.catalog, this._roomUI.userDefinedRoomEvents);
            case "RWE_PLAYLIST_EDITOR_WIDGET":
                return new PlayListEditorWidget(param2, _loc4_, this._roomUI.soundManager, _loc3_, this._roomUI.localization, this._roomUI, this._roomUI.catalog);
            case "RWE_SPAMWALL_POSTIT_WIDGET":
                return new SpamWallPostItFurniWidget(param2, _loc4_, _loc3_);
            case "RWE_EFFECTS":
                return new EffectsWidget(param2, _loc4_, _loc3_);
            case "RWE_MANNEQUIN":
                return new MannequinWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FURNITURE_CONTEXT_MENU":
                return new FurnitureContextMenuWidget(param2, _loc4_, _loc3_, this._roomUI, this._roomUI.localization, this._roomUI, this._roomUI.habboGroupsManager, this._roomUI.catalog);
            case "RWE_CAMERA":
                return new CameraWidget(param2, _loc4_, _loc3_, this._roomUI, this._roomUI.localization, this._roomUI);
            case "RWE_ROOM_BACKGROUND_COLOR":
                return new BackgroundColorFurniWidget(param2, _loc4_, _loc3_);
            case "RWE_AREA_HIDE":
                return new AreaHideFurniWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI.roomEngine);
            case "RWE_CUSTOM_USER_NOTIFICATION":
                return new CustomUserNotificationWidget(param2, _loc4_, _loc3_);
            case "RWE_FRIEND_FURNI_CONFIRM":
                return new FriendFurniConfirmWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_FRIEND_FURNI_ENGRAVING":
                return new FriendFurniEngravingWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_HIGH_SCORE_DISPLAY":
                return new HighScoreDisplayWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_CUSTOM_STACK_HEIGHT":
                return new CustomStackHeightWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_YOUTUBE":
                return new YoutubeDisplayWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI.habboTracking);
            case "RWE_RENTABLESPACE":
                return new RentableSpaceDisplayWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_VIMEO":
                return new VimeoDisplayWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_ROOM_TOOLS":
                return new RoomToolsWidget(param2, _loc4_, _loc3_, this._roomUI);
            case "RWE_EXTERNAL_IMAGE":
                return new ExternalImageWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI.inventory, this._roomUI.habboHelp, this._roomUI.roomEngine, this._roomUI);
            case "RWE_WORD_QUIZZ":
                return new WordQuizWidget(param2, _loc4_, _loc3_, this._roomUI.localization);
            case "RWE_UI_HELP_BUBBLE":
                return new UiHelpBubblesWidget(param2, _loc4_, _loc3_, this._roomUI.localization, this._roomUI.friendBarView, this._roomUI.toolbar, this._roomUI.desktop, this._roomUI);
            case "RWE_ROOM_THUMBNAIL_CAMERA":
                return new RoomThumbnailCameraWidget(param2, _loc4_, _loc3_, this._roomUI, this._roomUI.localization, this._roomUI);
            case "RWE_ROOM_LINK":
                return new FurnitureRoomLinkWidget(param2, _loc4_);
            case "RWE_CRAFTING":
                return new CraftingWidget(param2, _loc4_, this._roomUI);
            default:
                return null;
        }
    }

    public get disposed(): boolean {
        return this._roomUI == null;
    }

    get [IDisposable](): true {
        return true;
    }
}
