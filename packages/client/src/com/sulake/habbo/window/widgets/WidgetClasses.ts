import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AvatarImageWidget } from '@/com/sulake/habbo/window/widgets/AvatarImageWidget';
import { BadgeImageWidget } from '@/com/sulake/habbo/window/widgets/BadgeImageWidget';
import { BalloonWidget } from '@/com/sulake/habbo/window/widgets/BalloonWidget';
import { ChestItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ChestItemGridOverlayWidget';
import { CountdownWidget } from '@/com/sulake/habbo/window/widgets/CountdownWidget';
import { FurnitureImageWidget } from '@/com/sulake/habbo/window/widgets/FurnitureImageWidget';
import { HoverBitmapWidget } from '@/com/sulake/habbo/window/widgets/HoverBitmapWidget';
import { IlluminaBorderWidget } from '@/com/sulake/habbo/window/widgets/IlluminaBorderWidget';
import { IlluminaChatBubbleWidget } from '@/com/sulake/habbo/window/widgets/IlluminaChatBubbleWidget';
import { IlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IlluminaInputWidget';
import { LimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/LimitedItemGridOverlayWidget';
import { LimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/LimitedItemPreviewOverlayWidget';
import { LimitedItemSupplyLeftOverlayWidget } from '@/com/sulake/habbo/window/widgets/LimitedItemSupplyLeftOverlayWidget';
import { PetImageWidget } from '@/com/sulake/habbo/window/widgets/PetImageWidget';
import { PixelLimitWidget } from '@/com/sulake/habbo/window/widgets/PixelLimitWidget';
import { ProductIconWidget } from '@/com/sulake/habbo/window/widgets/ProductIconWidget';
import { ProductImageWidget } from '@/com/sulake/habbo/window/widgets/ProductImageWidget';
import { ProgressIndicatorWidget } from '@/com/sulake/habbo/window/widgets/ProgressIndicatorWidget';
import { RarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/RarityItemGridOverlayWidget';
import { RarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/RarityItemPreviewOverlayWidget';
import { RoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/RoomPreviewerWidget';
import { RoomThumbnailWidget } from '@/com/sulake/habbo/window/widgets/RoomThumbnailWidget';
import { RoomUserCountWidget } from '@/com/sulake/habbo/window/widgets/RoomUserCountWidget';
import { RunningNumberWidget } from '@/com/sulake/habbo/window/widgets/RunningNumberWidget';
import { SeparatorWidget } from '@/com/sulake/habbo/window/widgets/SeparatorWidget';
import { UpdatingTimeStampWidget } from '@/com/sulake/habbo/window/widgets/UpdatingTimeStampWidget';

export class WidgetClasses {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::WidgetClasses'); }

    static #staticsReady = false;

    public static get _SafeStr_2228(): Map<any, any> {
        WidgetClasses.#initStatics();
        return WidgetClasses._SafeStr_2228;
    }
    public static set _SafeStr_2228(value: Map<any, any>) {
        WidgetClasses.#initStatics();
        WidgetClasses._SafeStr_2228 = value;
    }

    public static get WIDGET_TYPES(): any[] {
        WidgetClasses.#initStatics();
        return WidgetClasses.WIDGET_TYPES;
    }
    public static set WIDGET_TYPES(value: any[]) {
        WidgetClasses.#initStatics();
        WidgetClasses.WIDGET_TYPES = value;
    }

    private static get key(): string {
        WidgetClasses.#initStatics();
        return WidgetClasses.key;
    }
    private static set key(value: string) {
        WidgetClasses.#initStatics();
        WidgetClasses.key = value;
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (WidgetClasses.#staticsReady) return;
        WidgetClasses.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(WidgetClasses, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_2228", null);
        set("WIDGET_TYPES", null);
        set("key", null);
        set("_SafeStr_2228", new Dictionary());
        set("WIDGET_TYPES", []);
        set("key", null);
        WidgetClasses._SafeStr_2228.set("avatar_image", AvatarImageWidget);
        WidgetClasses._SafeStr_2228.set("badge_image", BadgeImageWidget);
        WidgetClasses._SafeStr_2228.set("balloon", BalloonWidget);
        WidgetClasses._SafeStr_2228.set("countdown", CountdownWidget);
        WidgetClasses._SafeStr_2228.set("chest_overlay_grid", ChestItemGridOverlayWidget);
        WidgetClasses._SafeStr_2228.set("hover_bitmap", HoverBitmapWidget);
        WidgetClasses._SafeStr_2228.set("illumina_border", IlluminaBorderWidget);
        WidgetClasses._SafeStr_2228.set("illumina_chat_bubble", IlluminaChatBubbleWidget);
        WidgetClasses._SafeStr_2228.set("illumina_input", IlluminaInputWidget);
        WidgetClasses._SafeStr_2228.set("progress_indicator", ProgressIndicatorWidget);
        WidgetClasses._SafeStr_2228.set("limited_item_overlay_grid", LimitedItemGridOverlayWidget);
        WidgetClasses._SafeStr_2228.set("limited_item_overlay_preview", LimitedItemPreviewOverlayWidget);
        WidgetClasses._SafeStr_2228.set("limited_item_overlay_supply", LimitedItemSupplyLeftOverlayWidget);
        WidgetClasses._SafeStr_2228.set("product_icon", ProductIconWidget);
        WidgetClasses._SafeStr_2228.set("product_image", ProductImageWidget);
        WidgetClasses._SafeStr_2228.set("rarity_item_overlay_grid", RarityItemGridOverlayWidget);
        WidgetClasses._SafeStr_2228.set("rarity_item_overlay_preview", RarityItemPreviewOverlayWidget);
        WidgetClasses._SafeStr_2228.set("separator", SeparatorWidget);
        WidgetClasses._SafeStr_2228.set("updating_timestamp", UpdatingTimeStampWidget);
        WidgetClasses._SafeStr_2228.set("running_number", RunningNumberWidget);
        WidgetClasses._SafeStr_2228.set("pet_image", PetImageWidget);
        WidgetClasses._SafeStr_2228.set("furniture_image", FurnitureImageWidget);
        WidgetClasses._SafeStr_2228.set("room_previewer", RoomPreviewerWidget);
        WidgetClasses._SafeStr_2228.set("pixel_limit", PixelLimitWidget);
        WidgetClasses._SafeStr_2228.set("room_thumbnail", RoomThumbnailWidget);
        WidgetClasses._SafeStr_2228.set("room_user_count", RoomUserCountWidget);
        for (WidgetClasses.key of WidgetClasses._SafeStr_2228?.keys() ?? []) {
            WidgetClasses.WIDGET_TYPES.push(WidgetClasses.key);
        }
        WidgetClasses.WIDGET_TYPES.sort();
    }
}
