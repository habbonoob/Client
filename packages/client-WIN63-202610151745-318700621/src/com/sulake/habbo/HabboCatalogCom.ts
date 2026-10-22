import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboCatalogBootstrap } from '@/com/sulake/bootstrap/HabboCatalogBootstrap';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboCatalogCom_manifest_binAsset = embedBytes("catalog/HabboCatalogCom_manifest.bin");
const bot_thumb_bg_pngAsset = embedBitmap("catalog/bot_thumb_bg.png");
const bot_thumb_bg_selected_pngAsset = embedBitmap("catalog/bot_thumb_bg_selected.png");
const ctlg_clr_27x22_1_pngAsset = embedBitmap("shared/ctlg_clr_27x22_1.png");
const ctlg_clr_27x22_2_pngAsset = embedBitmap("shared/ctlg_clr_27x22_2.png");
const ctlg_clr_27x22_3_pngAsset = embedBitmap("shared/ctlg_clr_27x22_3.png");
const ctlg_clr_40x32_1_pngAsset = embedBitmap("catalog/ctlg_clr_40x32_1.png");
const ctlg_clr_40x32_2_pngAsset = embedBitmap("catalog/ctlg_clr_40x32_2.png");
const ctlg_clr_40x32_3_pngAsset = embedBitmap("catalog/ctlg_clr_40x32_3.png");
const ctlg_arrow_down_pngAsset = embedBitmap("catalog/ctlg_arrow_down.png");
const ctlg_arrow_next_pngAsset = embedBitmap("catalog/ctlg_arrow_next.png");
const ctlg_arrow_prev_pngAsset = embedBitmap("catalog/ctlg_arrow_prev.png");
const ctlg_arrow_right_pngAsset = embedBitmap("catalog/ctlg_arrow_right.png");
const ctlg_dyndeal_background_pngAsset = embedBitmap("catalog/ctlg_dyndeal_background.png");
const ctlg_icon_deal_hc_pngAsset = embedBitmap("catalog/ctlg_icon_deal_hc.png");
const ctlg_pic_deal_icon_narrow_pngAsset = embedBitmap("catalog/ctlg_pic_deal_icon_narrow.png");
const events_confirm_purchase_gifAsset = embedBitmap("catalog/events_confirm_purchase.gif");
const ctlg_recycler_slot_bg_pngAsset = embedBitmap("catalog/ctlg_recycler_slot_bg.png");
const purse_club_small_pngAsset = embedBitmap("catalog/purse_club_small.png");
const purse_coins_small_pngAsset = embedBitmap("catalog/purse_coins_small.png");
const purse_pixels_small_pngAsset = embedBitmap("catalog/purse_pixels_small.png");
const testarrow_down_pngAsset = embedBitmap("catalog/testarrow_down.png");
const testarrow_right_pngAsset = embedBitmap("catalog/testarrow_right.png");
const vip_icon_medium_gifAsset = embedBitmap("catalog/vip_icon_medium.gif");
const icon_credit_0_pngAsset = embedBitmap("shared/icon_credit_0.png");
const icon_credit_1_pngAsset = embedBitmap("shared/icon_credit_1.png");
const icon_credit_2_pngAsset = embedBitmap("shared/icon_credit_2.png");
const icon_credit_3_pngAsset = embedBitmap("shared/icon_credit_3.png");
const icon_credit_4_pngAsset = embedBitmap("shared/icon_credit_4.png");
const icon_credit_5_pngAsset = embedBitmap("shared/icon_credit_5.png");
const icon_credit_6_pngAsset = embedBitmap("shared/icon_credit_6.png");
const icon_pixel_0_pngAsset = embedBitmap("shared/icon_pixel_0.png");
const icon_shell_0_pngAsset = embedBitmap("catalog/icon_shell_0.png");
const icon_bg_img_2_pngAsset = embedBitmap("catalog/icon_bg_img_2.png");
const icon_bg_img_pngAsset = embedBitmap("catalog/icon_bg_img.png");
const icon_duck_vipwhite_pngAsset = embedBitmap("catalog/icon_duck_vipwhite.png");
const HabboCatalogCom_icon_hc_pngAsset = embedBitmap("catalog/HabboCatalogCom_icon_hc.png");
const minting_token_large_pngAsset = embedBitmap("catalog/minting_token_large.png");
const minting_token_small_pngAsset = embedBitmap("catalog/minting_token_small.png");
const thumb_bg_pngAsset = embedBitmap("shared/thumb_bg.png");
const thumb_bg_selected_pngAsset = embedBitmap("shared/thumb_bg_selected.png");
const vault_view_xml_binAsset = embedBytes("catalog/vault_view_xml.bin");
const special_items_display_xml_binAsset = embedBytes("catalog/special_items_display_xml.bin");
const cursed_dragon_adoption_xml_binAsset = embedBytes("catalog/cursed_dragon_adoption_xml.bin");
const collectible_view_xml_binAsset = embedBytes("catalog/collectible_view_xml.bin");
const collectible_reward_xml_binAsset = embedBytes("catalog/collectible_reward_xml.bin");
const habbicon_view_xml_binAsset = embedBytes("catalog/habbicon_view_xml.bin");
const habbicon_purchase_confirmation_xml_binAsset = embedBytes("catalog/habbicon_purchase_confirmation_xml.bin");
const mint_grid_item_xml_binAsset = embedBytes("catalog/mint_grid_item_xml.bin");
const club_center_xml_binAsset = embedBytes("catalog/club_center_xml.bin");
const club_center_special_info_xml_binAsset = embedBytes("catalog/club_center_special_info_xml.bin");
const club_extend_confirmation_binAsset = embedBytes("catalog/club_extend_confirmation.bin");
const club_buy_confirmation_binAsset = embedBytes("catalog/club_buy_confirmation.bin");
const club_buy_hc_item_binAsset = embedBytes("catalog/club_buy_hc_item.bin");
const club_buy_info_item_binAsset = embedBytes("catalog/club_buy_info_item.bin");
const club_buy_vip_item_binAsset = embedBytes("catalog/club_buy_vip_item.bin");
const club_buy_vip_upgrade_item_binAsset = embedBytes("catalog/club_buy_vip_upgrade_item.bin");
const club_gift_confirmation_binAsset = embedBytes("catalog/club_gift_confirmation.bin");
const club_gift_list_item_binAsset = embedBytes("catalog/club_gift_list_item.bin");
const club_gift_preview_binAsset = embedBytes("catalog/club_gift_preview.bin");
const vip_buy_item_binAsset = embedBytes("catalog/vip_buy_item.bin");
const vip_benefits_binAsset = embedBytes("catalog/vip_benefits.bin");
const touchscreen_phone_pngAsset = embedBitmap("catalog/touchscreen_phone.png");
const snowwar_tokens_10_pngAsset = embedBitmap("catalog/snowwar_tokens_10.png");
const color_chooser_cell_binAsset = embedBytes("shared/color_chooser_cell.bin");
const configuration_catalog_spaces_binAsset = embedBytes("catalog/configuration_catalog_spaces.bin");
const gridItem_binAsset = embedBytes("catalog/gridItem.bin");
const grid_item_with_price_multi_binAsset = embedBytes("catalog/grid_item_with_price_multi.bin");
const grid_item_with_price_single_binAsset = embedBytes("catalog/grid_item_with_price_single.bin");
const layout_club_buy_binAsset = embedBytes("catalog/layout_club_buy.bin");
const layout_club_gifts_binAsset = embedBytes("catalog/layout_club_gifts.bin");
const layout_default_3x3_binAsset = embedBytes("catalog/layout_default_3x3.bin");
const layout_recolorable_furniture_binAsset = embedBytes("catalog/layout_recolorable_furniture.bin");
const layout_frontpage4_binAsset = embedBytes("catalog/layout_frontpage4.bin");
const layout_frontpage_featured_binAsset = embedBytes("catalog/layout_frontpage_featured.bin");
const layout_info_rentables_binAsset = embedBytes("catalog/layout_info_rentables.bin");
const layout_info_duckets_binAsset = embedBytes("catalog/layout_info_duckets.bin");
const layout_info_loyalty_binAsset = embedBytes("catalog/layout_info_loyalty.bin");
const layout_loyalty_vip_buy_binAsset = embedBytes("catalog/layout_loyalty_vip_buy.bin");
const layout_monkey_binAsset = embedBytes("catalog/layout_monkey.bin");
const layout_marketplace_own_items_binAsset = embedBytes("catalog/layout_marketplace_own_items.bin");
const layout_marketplace_binAsset = embedBytes("catalog/layout_marketplace.bin");
const layout_petcustomization_binAsset = embedBytes("catalog/layout_petcustomization.bin");
const layout_pets2_binAsset = embedBytes("catalog/layout_pets2.bin");
const layout_pets3_binAsset = embedBytes("catalog/layout_pets3.bin");
const layout_pets_binAsset = embedBytes("catalog/layout_pets.bin");
const layout_roomads_binAsset = embedBytes("catalog/layout_roomads.bin");
const layout_recycler_info_binAsset = embedBytes("catalog/layout_recycler_info.bin");
const layout_recycler_prizes_binAsset = embedBytes("catalog/layout_recycler_prizes.bin");
const layout_recycler_binAsset = embedBytes("catalog/layout_recycler.bin");
const layout_soundmachine_binAsset = embedBytes("catalog/layout_soundmachine.bin");
const layout_spaces_new_binAsset = embedBytes("catalog/layout_spaces_new.bin");
const layout_trophies_binAsset = embedBytes("catalog/layout_trophies.bin");
const layout_vip_buy_binAsset = embedBytes("catalog/layout_vip_buy.bin");
const layout_guild_custom_furni_binAsset = embedBytes("catalog/layout_guild_custom_furni.bin");
const layout_guild_frontpage_binAsset = embedBytes("catalog/layout_guild_frontpage.bin");
const layout_guild_forum_binAsset = embedBytes("catalog/layout_guild_forum.bin");
const layout_badge_display_binAsset = embedBytes("catalog/layout_badge_display.bin");
const layout_single_bundle_binAsset = embedBytes("catalog/layout_single_bundle.bin");
const layout_builders_club_addons_binAsset = embedBytes("catalog/layout_builders_club_addons.bin");
const layout_builders_club_loyalty_binAsset = embedBytes("catalog/layout_builders_club_loyalty.bin");
const layout_builders_club_frontpage_binAsset = embedBytes("catalog/layout_builders_club_frontpage.bin");
const old_layout_club_buy_binAsset = embedBytes("catalog/old_layout_club_buy.bin");
const old_layout_club_gifts_binAsset = embedBytes("catalog/old_layout_club_gifts.bin");
const old_layout_default_3x3_binAsset = embedBytes("catalog/old_layout_default_3x3.bin");
const old_layout_frontpage4_binAsset = embedBytes("catalog/old_layout_frontpage4.bin");
const old_layout_info_rentables_binAsset = embedBytes("catalog/old_layout_info_rentables.bin");
const old_layout_info_duckets_binAsset = embedBytes("catalog/old_layout_info_duckets.bin");
const old_layout_info_loyalty_binAsset = embedBytes("catalog/old_layout_info_loyalty.bin");
const old_layout_loyalty_vip_buy_binAsset = embedBytes("catalog/old_layout_loyalty_vip_buy.bin");
const old_layout_monkey_binAsset = embedBytes("catalog/old_layout_monkey.bin");
const old_layout_marketplace_own_items_binAsset = embedBytes("catalog/old_layout_marketplace_own_items.bin");
const old_layout_marketplace_binAsset = embedBytes("catalog/old_layout_marketplace.bin");
const old_layout_petcustomization_binAsset = embedBytes("catalog/old_layout_petcustomization.bin");
const old_layout_pets2_binAsset = embedBytes("catalog/old_layout_pets2.bin");
const old_layout_pets3_binAsset = embedBytes("catalog/old_layout_pets3.bin");
const old_layout_pets_binAsset = embedBytes("catalog/old_layout_pets.bin");
const old_layout_roomads_binAsset = embedBytes("catalog/old_layout_roomads.bin");
const old_layout_recycler_info_binAsset = embedBytes("catalog/old_layout_recycler_info.bin");
const old_layout_recycler_prizes_binAsset = embedBytes("catalog/old_layout_recycler_prizes.bin");
const old_layout_recycler_binAsset = embedBytes("catalog/old_layout_recycler.bin");
const old_layout_soundmachine_binAsset = embedBytes("catalog/old_layout_soundmachine.bin");
const old_layout_spaces_new_binAsset = embedBytes("catalog/old_layout_spaces_new.bin");
const old_layout_trophies_binAsset = embedBytes("catalog/old_layout_trophies.bin");
const old_layout_vip_buy_binAsset = embedBytes("catalog/old_layout_vip_buy.bin");
const old_layout_guild_custom_furni_binAsset = embedBytes("catalog/old_layout_guild_custom_furni.bin");
const old_layout_guild_frontpage_binAsset = embedBytes("catalog/old_layout_guild_frontpage.bin");
const old_layout_badge_display_binAsset = embedBytes("catalog/old_layout_badge_display.bin");
const old_layout_single_bundle_binAsset = embedBytes("catalog/old_layout_single_bundle.bin");
const habbo_orderinfo_cantbuycredits_binAsset = embedBytes("catalog/habbo_orderinfo_cantbuycredits.bin");
const habbo_orderinfo_dialog_binAsset = embedBytes("catalog/habbo_orderinfo_dialog.bin");
const habbo_orderinfo_gift_checked_binAsset = embedBytes("catalog/habbo_orderinfo_gift_checked.bin");
const habbo_orderinfo_gift_unchecked_binAsset = embedBytes("catalog/habbo_orderinfo_gift_unchecked.bin");
const habbo_orderinfo_nocredits_binAsset = embedBytes("catalog/habbo_orderinfo_nocredits.bin");
const habbo_orderinfo_receiver_suggestion_binAsset = embedBytes("catalog/habbo_orderinfo_receiver_suggestion.bin");
const clubBuyWidget_binAsset = embedBytes("catalog/clubBuyWidget.bin");
const clubGiftWidget_binAsset = embedBytes("catalog/clubGiftWidget.bin");
const colourGridWidget_binAsset = embedBytes("catalog/colourGridWidget.bin");
const itemGridWidget_binAsset = embedBytes("catalog/itemGridWidget.bin");
const marketPlaceOwnItemsWidget_binAsset = embedBytes("catalog/marketPlaceOwnItemsWidget.bin");
const marketPlaceWidget_binAsset = embedBytes("catalog/marketPlaceWidget.bin");
const petPreviewWidget_binAsset = embedBytes("catalog/petPreviewWidget.bin");
const productViewWidget_binAsset = embedBytes("catalog/productViewWidget.bin");
const purchaseWidget_binAsset = embedBytes("catalog/purchaseWidget.bin");
const recyclerPrizesWidgetLevelItem_binAsset = embedBytes("catalog/recyclerPrizesWidgetLevelItem.bin");
const recyclerWidget_binAsset = embedBytes("catalog/recyclerWidget.bin");
const redeemItemCodeWidget_binAsset = embedBytes("catalog/redeemItemCodeWidget.bin");
const singleViewWidget_binAsset = embedBytes("catalog/singleViewWidget.bin");
const specialInfoWidget_binAsset = embedBytes("catalog/specialInfoWidget.bin");
const textInputWidget_binAsset = embedBytes("catalog/textInputWidget.bin");
const traxPreviewWidget_binAsset = embedBytes("catalog/traxPreviewWidget.bin");
const trophyWidget_binAsset = embedBytes("catalog/trophyWidget.bin");
const marketplace_offer_details_binAsset = embedBytes("catalog/marketplace_offer_details.bin");
const marketplace_purchase_confirmation_binAsset = embedBytes("catalog/marketplace_purchase_confirmation.bin");
const marketplace_search_advanced_binAsset = embedBytes("catalog/marketplace_search_advanced.bin");
const marketplace_search_simple_binAsset = embedBytes("catalog/marketplace_search_simple.bin");
const gift_palette_item_binAsset = embedBytes("catalog/gift_palette_item.bin");
const price_display_binAsset = embedBytes("catalog/price_display.bin");
const priceDisplayWidget_binAsset = embedBytes("catalog/priceDisplayWidget.bin");
const purchase_confirmation_binAsset = embedBytes("catalog/purchase_confirmation.bin");
const gift_wrapping_binAsset = embedBytes("catalog/gift_wrapping.bin");
const gift_incognito_pngAsset = embedBitmap("shared/gift_incognito.png");
const suggestion_list_item_binAsset = embedBytes("catalog/suggestion_list_item.bin");
const suggestion_list_item_new_binAsset = embedBytes("catalog/suggestion_list_item_new.bin");
const spaces_binAsset = embedBytes("catalog/spaces.bin");
const purchaseButtons_binAsset = embedBytes("catalog/purchaseButtons.bin");
const purchaseWidgetBuyVipStub_binAsset = embedBytes("catalog/purchaseWidgetBuyVipStub.bin");
const guildSelectorWidget_binAsset = embedBytes("catalog/guildSelectorWidget.bin");
const guildBadgeViewWidget_binAsset = embedBytes("catalog/guildBadgeViewWidget.bin");
const guild_selector_widget_item_binAsset = embedBytes("catalog/guild_selector_widget_item.bin");
const club_direct_buy_xml_binAsset = embedBytes("catalog/club_direct_buy_xml.bin");
const club_direct_buy_success_xml_binAsset = embedBytes("catalog/club_direct_buy_success_xml.bin");
const catalog_icon_badge_included_pngAsset = embedBitmap("catalog/catalog_icon_badge_included.png");
const catalog_icon_ninja_effect_included_pngAsset = embedBitmap("catalog/catalog_icon_ninja_effect_included.png");
const badgeDisplayWidget_binAsset = embedBytes("catalog/badgeDisplayWidget.bin");
const spinnerWidget_binAsset = embedBytes("catalog/spinnerWidget.bin");
const catalog_volter_binAsset = embedBytes("catalog/catalog_volter.bin");
const catalog_ubuntu_binAsset = embedBytes("catalog/catalog_ubuntu.bin");
const catalog_ubuntu_with_tabs_binAsset = embedBytes("catalog/catalog_ubuntu_with_tabs.bin");
const discountPromoItem_binAsset = embedBytes("catalog/discountPromoItem.bin");
const discountValueItem_binAsset = embedBytes("catalog/discountValueItem.bin");
const totalPriceWidget_binAsset = embedBytes("catalog/totalPriceWidget.bin");
const bundle_discount_star_sheet_pngAsset = embedBitmap("catalog/bundle_discount_star_sheet.png");
const thumb_up_pngAsset = embedBitmap("catalog/thumb_up.png");
const bundlesInfoItem_binAsset = embedBytes("catalog/bundlesInfoItem.bin");
const soldLtdItemsWidget_binAsset = embedBytes("catalog/soldLtdItemsWidget.bin");
const rent_confirmation_binAsset = embedBytes("catalog/rent_confirmation.bin");
const badgeGridItem_binAsset = embedBytes("catalog/badgeGridItem.bin");
const activityPointDisplayWidget_binAsset = embedBytes("catalog/activityPointDisplayWidget.bin");
const addOnBadgeViewWidget_binAsset = embedBytes("catalog/addOnBadgeViewWidget.bin");
const builderWidget_binAsset = embedBytes("catalog/builderWidget.bin");
const targeted_offer_dialog_xml_binAsset = embedBytes("catalog/targeted_offer_dialog_xml.bin");
const targeted_offer_dialog_variation_xml_binAsset = embedBytes("catalog/targeted_offer_dialog_variation_xml.bin");
const targeted_offer_minimized_xml_binAsset = embedBytes("catalog/targeted_offer_minimized_xml.bin");
const targeted_offer_purchase_confirmation_xml_binAsset = embedBytes("catalog/targeted_offer_purchase_confirmation_xml.bin");
const targeted_offer_habbomall_xml_binAsset = embedBytes("catalog/targeted_offer_habbomall_xml.bin");
const offer_center_xml_binAsset = embedBytes("catalog/offer_center_xml.bin");

export class HabboCatalogCom extends SimpleApplication {
    static { registerClassName(this, 'HabboCatalogCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboCatalogCom.#initStatics();
        return HabboCatalogCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboCatalogCom.#initStatics();
        HabboCatalogCom.requiredClasses = value;
    }

    public static manifest = HabboCatalogCom_manifest_binAsset;

    public static readonly bot_thumb_bg = bot_thumb_bg_pngAsset;

    public static readonly bot_thumb_bg_selected = bot_thumb_bg_selected_pngAsset;

    public static readonly ctlg_clr_27x22_1 = ctlg_clr_27x22_1_pngAsset;

    public static readonly ctlg_clr_27x22_2 = ctlg_clr_27x22_2_pngAsset;

    public static readonly ctlg_clr_27x22_3 = ctlg_clr_27x22_3_pngAsset;

    public static readonly ctlg_clr_40x32_1 = ctlg_clr_40x32_1_pngAsset;

    public static readonly ctlg_clr_40x32_2 = ctlg_clr_40x32_2_pngAsset;

    public static readonly ctlg_clr_40x32_3 = ctlg_clr_40x32_3_pngAsset;

    public static readonly ctlg_arrow_down = ctlg_arrow_down_pngAsset;

    public static readonly ctlg_arrow_next = ctlg_arrow_next_pngAsset;

    public static readonly ctlg_arrow_prev = ctlg_arrow_prev_pngAsset;

    public static readonly ctlg_arrow_right = ctlg_arrow_right_pngAsset;

    public static readonly ctlg_dyndeal_background = ctlg_dyndeal_background_pngAsset;

    public static readonly ctlg_icon_deal_hc = ctlg_icon_deal_hc_pngAsset;

    public static readonly ctlg_pic_deal_icon_narrow = ctlg_pic_deal_icon_narrow_pngAsset;

    public static readonly events_confirm_purchase = events_confirm_purchase_gifAsset;

    public static readonly ctlg_recycler_slot_bg = ctlg_recycler_slot_bg_pngAsset;

    public static readonly purse_club_small = purse_club_small_pngAsset;

    public static readonly purse_coins_small = purse_coins_small_pngAsset;

    public static readonly purse_pixels_small = purse_pixels_small_pngAsset;

    public static readonly testarrow_down = testarrow_down_pngAsset;

    public static readonly testarrow_right = testarrow_right_pngAsset;

    public static readonly vip_icon_medium = vip_icon_medium_gifAsset;

    public static readonly icon_credit_0 = icon_credit_0_pngAsset;

    public static readonly icon_credit_1 = icon_credit_1_pngAsset;

    public static readonly icon_credit_2 = icon_credit_2_pngAsset;

    public static readonly icon_credit_3 = icon_credit_3_pngAsset;

    public static readonly icon_credit_4 = icon_credit_4_pngAsset;

    public static readonly icon_credit_5 = icon_credit_5_pngAsset;

    public static readonly icon_credit_6 = icon_credit_6_pngAsset;

    public static readonly icon_pixel_0 = icon_pixel_0_pngAsset;

    public static readonly icon_shell_0 = icon_shell_0_pngAsset;

    public static readonly icon_bg_img_2 = icon_bg_img_2_pngAsset;

    public static readonly icon_bg_img = icon_bg_img_pngAsset;

    public static readonly icon_duck_vipwhite = icon_duck_vipwhite_pngAsset;

    public static readonly icon_hc = HabboCatalogCom_icon_hc_pngAsset;

    public static readonly minting_token_large = minting_token_large_pngAsset;

    public static readonly minting_token_small = minting_token_small_pngAsset;

    public static readonly thumb_bg = thumb_bg_pngAsset;

    public static readonly thumb_bg_selected = thumb_bg_selected_pngAsset;

    public static vault_view_xml = vault_view_xml_binAsset;

    public static special_items_display_xml = special_items_display_xml_binAsset;

    public static cursed_dragon_adoption_xml = cursed_dragon_adoption_xml_binAsset;

    public static collectible_view_xml = collectible_view_xml_binAsset;

    public static collectible_reward_xml = collectible_reward_xml_binAsset;

    public static habbicon_view_xml = habbicon_view_xml_binAsset;

    public static habbicon_purchase_confirmation_xml = habbicon_purchase_confirmation_xml_binAsset;

    public static readonly mint_grid_item_xml = mint_grid_item_xml_binAsset;

    public static club_center_xml = club_center_xml_binAsset;

    public static club_center_special_info_xml = club_center_special_info_xml_binAsset;

    public static readonly club_extend_confirmation = club_extend_confirmation_binAsset;

    public static readonly club_buy_confirmation = club_buy_confirmation_binAsset;

    public static readonly club_buy_hc_item = club_buy_hc_item_binAsset;

    public static readonly club_buy_info_item = club_buy_info_item_binAsset;

    public static readonly club_buy_vip_item = club_buy_vip_item_binAsset;

    public static readonly club_buy_vip_upgrade_item = club_buy_vip_upgrade_item_binAsset;

    public static readonly club_gift_confirmation = club_gift_confirmation_binAsset;

    public static readonly club_gift_list_item = club_gift_list_item_binAsset;

    public static readonly club_gift_preview = club_gift_preview_binAsset;

    public static readonly vip_buy_item = vip_buy_item_binAsset;

    public static readonly vip_benefits = vip_benefits_binAsset;

    public static readonly touchscreen_phone = touchscreen_phone_pngAsset;

    public static readonly snowwar_tokens_10 = snowwar_tokens_10_pngAsset;

    public static readonly color_chooser_cell = color_chooser_cell_binAsset;

    public static readonly configuration_catalog_spaces = configuration_catalog_spaces_binAsset;

    public static readonly gridItem = gridItem_binAsset;

    public static readonly grid_item_with_price_multi = grid_item_with_price_multi_binAsset;

    public static readonly grid_item_with_price_single = grid_item_with_price_single_binAsset;

    public static readonly layout_club_buy = layout_club_buy_binAsset;

    public static readonly layout_club_gifts = layout_club_gifts_binAsset;

    public static readonly layout_default_3x3 = layout_default_3x3_binAsset;

    public static readonly layout_recolorable_furniture = layout_recolorable_furniture_binAsset;

    public static readonly layout_frontpage4 = layout_frontpage4_binAsset;

    public static readonly layout_frontpage_featured = layout_frontpage_featured_binAsset;

    public static readonly layout_info_rentables = layout_info_rentables_binAsset;

    public static readonly layout_info_duckets = layout_info_duckets_binAsset;

    public static readonly layout_info_loyalty = layout_info_loyalty_binAsset;

    public static readonly layout_loyalty_vip_buy = layout_loyalty_vip_buy_binAsset;

    public static readonly layout_monkey = layout_monkey_binAsset;

    public static readonly layout_marketplace_own_items = layout_marketplace_own_items_binAsset;

    public static readonly layout_marketplace = layout_marketplace_binAsset;

    public static readonly layout_petcustomization = layout_petcustomization_binAsset;

    public static readonly layout_pets2 = layout_pets2_binAsset;

    public static readonly layout_pets3 = layout_pets3_binAsset;

    public static readonly layout_pets = layout_pets_binAsset;

    public static readonly layout_roomads = layout_roomads_binAsset;

    public static readonly layout_recycler_info = layout_recycler_info_binAsset;

    public static readonly layout_recycler_prizes = layout_recycler_prizes_binAsset;

    public static readonly layout_recycler = layout_recycler_binAsset;

    public static readonly layout_soundmachine = layout_soundmachine_binAsset;

    public static readonly layout_spaces_new = layout_spaces_new_binAsset;

    public static readonly layout_trophies = layout_trophies_binAsset;

    public static readonly layout_vip_buy = layout_vip_buy_binAsset;

    public static readonly layout_guild_custom_furni = layout_guild_custom_furni_binAsset;

    public static readonly layout_guild_frontpage = layout_guild_frontpage_binAsset;

    public static readonly layout_guild_forum = layout_guild_forum_binAsset;

    public static readonly layout_badge_display = layout_badge_display_binAsset;

    public static readonly layout_single_bundle = layout_single_bundle_binAsset;

    public static readonly layout_builders_club_addons = layout_builders_club_addons_binAsset;

    public static readonly layout_builders_club_loyalty = layout_builders_club_loyalty_binAsset;

    public static readonly layout_builders_club_frontpage = layout_builders_club_frontpage_binAsset;

    public static readonly old_layout_club_buy = old_layout_club_buy_binAsset;

    public static readonly old_layout_club_gifts = old_layout_club_gifts_binAsset;

    public static readonly old_layout_default_3x3 = old_layout_default_3x3_binAsset;

    public static readonly old_layout_frontpage4 = old_layout_frontpage4_binAsset;

    public static readonly old_layout_info_rentables = old_layout_info_rentables_binAsset;

    public static readonly old_layout_info_duckets = old_layout_info_duckets_binAsset;

    public static readonly old_layout_info_loyalty = old_layout_info_loyalty_binAsset;

    public static readonly old_layout_loyalty_vip_buy = old_layout_loyalty_vip_buy_binAsset;

    public static readonly old_layout_monkey = old_layout_monkey_binAsset;

    public static readonly old_layout_marketplace_own_items = old_layout_marketplace_own_items_binAsset;

    public static readonly old_layout_marketplace = old_layout_marketplace_binAsset;

    public static readonly old_layout_petcustomization = old_layout_petcustomization_binAsset;

    public static readonly old_layout_pets2 = old_layout_pets2_binAsset;

    public static readonly old_layout_pets3 = old_layout_pets3_binAsset;

    public static readonly old_layout_pets = old_layout_pets_binAsset;

    public static readonly old_layout_roomads = old_layout_roomads_binAsset;

    public static readonly old_layout_recycler_info = old_layout_recycler_info_binAsset;

    public static readonly old_layout_recycler_prizes = old_layout_recycler_prizes_binAsset;

    public static readonly old_layout_recycler = old_layout_recycler_binAsset;

    public static readonly old_layout_soundmachine = old_layout_soundmachine_binAsset;

    public static readonly old_layout_spaces_new = old_layout_spaces_new_binAsset;

    public static readonly old_layout_trophies = old_layout_trophies_binAsset;

    public static readonly old_layout_vip_buy = old_layout_vip_buy_binAsset;

    public static readonly old_layout_guild_custom_furni = old_layout_guild_custom_furni_binAsset;

    public static readonly old_layout_guild_frontpage = old_layout_guild_frontpage_binAsset;

    public static readonly old_layout_badge_display = old_layout_badge_display_binAsset;

    public static readonly old_layout_single_bundle = old_layout_single_bundle_binAsset;

    public static readonly habbo_orderinfo_cantbuycredits = habbo_orderinfo_cantbuycredits_binAsset;

    public static readonly habbo_orderinfo_dialog = habbo_orderinfo_dialog_binAsset;

    public static readonly habbo_orderinfo_gift_checked = habbo_orderinfo_gift_checked_binAsset;

    public static readonly habbo_orderinfo_gift_unchecked = habbo_orderinfo_gift_unchecked_binAsset;

    public static readonly habbo_orderinfo_nocredits = habbo_orderinfo_nocredits_binAsset;

    public static readonly habbo_orderinfo_receiver_suggestion = habbo_orderinfo_receiver_suggestion_binAsset;

    public static readonly clubBuyWidget = clubBuyWidget_binAsset;

    public static readonly clubGiftWidget = clubGiftWidget_binAsset;

    public static readonly colourGridWidget = colourGridWidget_binAsset;

    public static readonly itemGridWidget = itemGridWidget_binAsset;

    public static readonly marketPlaceOwnItemsWidget = marketPlaceOwnItemsWidget_binAsset;

    public static readonly marketPlaceWidget = marketPlaceWidget_binAsset;

    public static readonly petPreviewWidget = petPreviewWidget_binAsset;

    public static readonly productViewWidget = productViewWidget_binAsset;

    public static readonly purchaseWidget = purchaseWidget_binAsset;

    public static readonly recyclerPrizesWidgetLevelItem = recyclerPrizesWidgetLevelItem_binAsset;

    public static readonly recyclerWidget = recyclerWidget_binAsset;

    public static readonly redeemItemCodeWidget = redeemItemCodeWidget_binAsset;

    public static readonly singleViewWidget = singleViewWidget_binAsset;

    public static readonly specialInfoWidget = specialInfoWidget_binAsset;

    public static readonly textInputWidget = textInputWidget_binAsset;

    public static readonly traxPreviewWidget = traxPreviewWidget_binAsset;

    public static readonly trophyWidget = trophyWidget_binAsset;

    public static readonly marketplace_offer_details = marketplace_offer_details_binAsset;

    public static readonly marketplace_purchase_confirmation = marketplace_purchase_confirmation_binAsset;

    public static readonly marketplace_search_advanced = marketplace_search_advanced_binAsset;

    public static readonly marketplace_search_simple = marketplace_search_simple_binAsset;

    public static readonly gift_palette_item = gift_palette_item_binAsset;

    public static readonly price_display = price_display_binAsset;

    public static readonly priceDisplayWidget = priceDisplayWidget_binAsset;

    public static readonly purchase_confirmation = purchase_confirmation_binAsset;

    public static readonly gift_wrapping = gift_wrapping_binAsset;

    public static readonly gift_incognito = gift_incognito_pngAsset;

    public static readonly suggestion_list_item = suggestion_list_item_binAsset;

    public static readonly suggestion_list_item_new = suggestion_list_item_new_binAsset;

    public static readonly spaces = spaces_binAsset;

    public static readonly purchaseButtons = purchaseButtons_binAsset;

    public static readonly purchaseWidgetBuyVipStub = purchaseWidgetBuyVipStub_binAsset;

    public static readonly guildSelectorWidget = guildSelectorWidget_binAsset;

    public static readonly guildBadgeViewWidget = guildBadgeViewWidget_binAsset;

    public static readonly guild_selector_widget_item = guild_selector_widget_item_binAsset;

    public static readonly club_direct_buy_xml = club_direct_buy_xml_binAsset;

    public static readonly club_direct_buy_success_xml = club_direct_buy_success_xml_binAsset;

    public static readonly catalog_icon_badge_included = catalog_icon_badge_included_pngAsset;

    public static readonly catalog_icon_ninja_effect_included = catalog_icon_ninja_effect_included_pngAsset;

    public static readonly badgeDisplayWidget = badgeDisplayWidget_binAsset;

    public static readonly spinnerWidget = spinnerWidget_binAsset;

    public static readonly catalog_volter = catalog_volter_binAsset;

    public static readonly catalog_ubuntu = catalog_ubuntu_binAsset;

    public static readonly catalog_ubuntu_with_tabs = catalog_ubuntu_with_tabs_binAsset;

    public static readonly discountPromoItem = discountPromoItem_binAsset;

    public static readonly discountValueItem = discountValueItem_binAsset;

    public static readonly totalPriceWidget = totalPriceWidget_binAsset;

    public static readonly bundle_discount_star_sheet = bundle_discount_star_sheet_pngAsset;

    public static readonly thumb_up = thumb_up_pngAsset;

    public static readonly bundlesInfoItem = bundlesInfoItem_binAsset;

    public static readonly soldLtdItemsWidget = soldLtdItemsWidget_binAsset;

    public static rent_confirmation = rent_confirmation_binAsset;

    public static readonly badgeGridItem = badgeGridItem_binAsset;

    public static readonly activityPointDisplayWidget = activityPointDisplayWidget_binAsset;

    public static readonly addOnBadgeViewWidget = addOnBadgeViewWidget_binAsset;

    public static readonly builderWidget = builderWidget_binAsset;

    public static readonly targeted_offer_dialog_xml = targeted_offer_dialog_xml_binAsset;

    public static readonly targeted_offer_dialog_variation_xml = targeted_offer_dialog_variation_xml_binAsset;

    public static readonly targeted_offer_minimized_xml = targeted_offer_minimized_xml_binAsset;

    public static readonly targeted_offer_purchase_confirmation_xml = targeted_offer_purchase_confirmation_xml_binAsset;

    public static readonly targeted_offer_habbomall_xml = targeted_offer_habbomall_xml_binAsset;

    public static offer_center_xml = offer_center_xml_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboCatalogCom.#staticsReady) return;
        HabboCatalogCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboCatalogCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboCatalogBootstrap, IIDHabboCatalog]);
    }
}
