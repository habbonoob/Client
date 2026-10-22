import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ProductImageConfiguration {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::ProductImageConfiguration'); }

    static #staticsReady = false;

    public static get PRODUCT_IMAGES(): Map<any, any> {
        ProductImageConfiguration.#initStatics();
        return ProductImageConfiguration.PRODUCT_IMAGES;
    }

    public static hasProductImage(param1: string): boolean {
        return ProductImageConfiguration.PRODUCT_IMAGES.get(param1) != null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ProductImageConfiguration.#staticsReady) return;
        ProductImageConfiguration.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ProductImageConfiguration, name, { value, writable: true, configurable: true, enumerable: true });
        set("PRODUCT_IMAGES", null);
        set("PRODUCT_IMAGES", new Dictionary());
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal01", "ctlg_pic_deal01");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal02", "ctlg_pic_deal02");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal03", "ctlg_pic_deal03");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal04", "ctlg_pic_deal04");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal05", "ctlg_pic_deal05");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal06", "ctlg_pic_deal06");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal07", "ctlg_pic_deal07");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal08", "ctlg_pic_deal08");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal09", "ctlg_pic_deal09");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal10", "ctlg_pic_deal10");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal97", "ctlg_pic_deal97");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal98", "ctlg_pic_deal98");
        ProductImageConfiguration.PRODUCT_IMAGES.set("deal99", "ctlg_pic_deal99");
        ProductImageConfiguration.PRODUCT_IMAGES.set("noob_set_1", "ctlg_pic_noob_set_1");
        ProductImageConfiguration.PRODUCT_IMAGES.set("noob_set_2", "ctlg_pic_noob_set_2");
        ProductImageConfiguration.PRODUCT_IMAGES.set("noob_set_3", "ctlg_pic_noob_set_3");
        ProductImageConfiguration.PRODUCT_IMAGES.set("noob_set_4", "ctlg_pic_noob_set_4");
        ProductImageConfiguration.PRODUCT_IMAGES.set("noob_set_5", "ctlg_pic_noob_set_5");
        ProductImageConfiguration.PRODUCT_IMAGES.set("noob_set_6", "ctlg_pic_noob_set_6");
        ProductImageConfiguration.PRODUCT_IMAGES.set("a0 deal100", "ctlg_pic_a0_deal100");
        ProductImageConfiguration.PRODUCT_IMAGES.set("a0 raredaffodilrug", "ctlg_pic_a0_raredaffodilrug");
        ProductImageConfiguration.PRODUCT_IMAGES.set("a2 slp", "ctlg_pic_a2_slp");
        ProductImageConfiguration.PRODUCT_IMAGES.set("A2 tlp 20", "ctlg_pic_A2_tlp_20");
        ProductImageConfiguration.PRODUCT_IMAGES.set("DEAL_HC_1", "ctlg_pic_hc_deal01");
        ProductImageConfiguration.PRODUCT_IMAGES.set("DEAL_HC_2", "ctlg_pic_hc_deal02");
        ProductImageConfiguration.PRODUCT_IMAGES.set("DEAL_HC_3", "ctlg_pic_hc_deal03");
        ProductImageConfiguration.PRODUCT_IMAGES.set("hween09_ghost", "ctlg_pic_hween09_ghost");
        ProductImageConfiguration.PRODUCT_IMAGES.set("ads_twi_mist", "ctlg_pic_ads_twi_mist");
        ProductImageConfiguration.PRODUCT_IMAGES.set("party_lights", "ctlg_pic_party_lights");
        ProductImageConfiguration.PRODUCT_IMAGES.set("xmas_snow", "ctlg_pic_xmas_snow");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal1", "ctlg_pic_deal_wired_pswdoor");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal2", "ctlg_pic_deal_wired_swtchdoor");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal3", "ctlg_pic_deal_wired_coopdoor");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal4", "ctlg_pic_deal_wired_rmtdoor");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal5", "ctlg_pic_deal_wired_wlcmmsg");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal6", "ctlg_pic_deal_wired_pswtele");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal7", "ctlg_pic_deal_wired_dircntrl");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal8", "ctlg_pic_deal_wired_mvngfurni");
        ProductImageConfiguration.PRODUCT_IMAGES.set("wf_deal9", "ctlg_pic_deal_wired_flshfires");
        ProductImageConfiguration.PRODUCT_IMAGES.set("qt_val11_heartlights", "ctlg_pic_qt_val11_heartlights");
        ProductImageConfiguration.PRODUCT_IMAGES.set("GET_SNOWWAR_TOKENS", "snowwar_tokens_10");
        ProductImageConfiguration.PRODUCT_IMAGES.set("GET_SNOWWAR_TOKENS2", "snowwar_tokens_10");
        ProductImageConfiguration.PRODUCT_IMAGES.set("GET_SNOWWAR_TOKENS3", "snowwar_tokens_10");
        ProductImageConfiguration.PRODUCT_IMAGES.set("room_ad_plus_badge", "events_confirm_purchase");
    }
}
