import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_1953 {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::_SafeCls_1953'); }

    static #staticsReady = false;

    public static get PRODUCT_IMAGES(): Map<any, any> {
        _SafeCls_1953.#initStatics();
        return _SafeCls_1953.PRODUCT_IMAGES;
    }

    constructor() {
    }

    public static hasProductImage(param1: string): boolean {
        return _SafeCls_1953.PRODUCT_IMAGES.get(param1) != null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (_SafeCls_1953.#staticsReady) return;
        _SafeCls_1953.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(_SafeCls_1953, name, { value, writable: true, configurable: true, enumerable: true });
        set("PRODUCT_IMAGES", null);
        set("PRODUCT_IMAGES", new Dictionary());
        _SafeCls_1953.PRODUCT_IMAGES.set("deal01", "ctlg_pic_deal01");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal02", "ctlg_pic_deal02");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal03", "ctlg_pic_deal03");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal04", "ctlg_pic_deal04");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal05", "ctlg_pic_deal05");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal06", "ctlg_pic_deal06");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal07", "ctlg_pic_deal07");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal08", "ctlg_pic_deal08");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal09", "ctlg_pic_deal09");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal10", "ctlg_pic_deal10");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal97", "ctlg_pic_deal97");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal98", "ctlg_pic_deal98");
        _SafeCls_1953.PRODUCT_IMAGES.set("deal99", "ctlg_pic_deal99");
        _SafeCls_1953.PRODUCT_IMAGES.set("noob_set_1", "ctlg_pic_noob_set_1");
        _SafeCls_1953.PRODUCT_IMAGES.set("noob_set_2", "ctlg_pic_noob_set_2");
        _SafeCls_1953.PRODUCT_IMAGES.set("noob_set_3", "ctlg_pic_noob_set_3");
        _SafeCls_1953.PRODUCT_IMAGES.set("noob_set_4", "ctlg_pic_noob_set_4");
        _SafeCls_1953.PRODUCT_IMAGES.set("noob_set_5", "ctlg_pic_noob_set_5");
        _SafeCls_1953.PRODUCT_IMAGES.set("noob_set_6", "ctlg_pic_noob_set_6");
        _SafeCls_1953.PRODUCT_IMAGES.set("a0 deal100", "ctlg_pic_a0_deal100");
        _SafeCls_1953.PRODUCT_IMAGES.set("a0 raredaffodilrug", "ctlg_pic_a0_raredaffodilrug");
        _SafeCls_1953.PRODUCT_IMAGES.set("a2 slp", "ctlg_pic_a2_slp");
        _SafeCls_1953.PRODUCT_IMAGES.set("A2 tlp 20", "ctlg_pic_A2_tlp_20");
        _SafeCls_1953.PRODUCT_IMAGES.set("DEAL_HC_1", "ctlg_pic_hc_deal01");
        _SafeCls_1953.PRODUCT_IMAGES.set("DEAL_HC_2", "ctlg_pic_hc_deal02");
        _SafeCls_1953.PRODUCT_IMAGES.set("DEAL_HC_3", "ctlg_pic_hc_deal03");
        _SafeCls_1953.PRODUCT_IMAGES.set("hween09_ghost", "ctlg_pic_hween09_ghost");
        _SafeCls_1953.PRODUCT_IMAGES.set("ads_twi_mist", "ctlg_pic_ads_twi_mist");
        _SafeCls_1953.PRODUCT_IMAGES.set("party_lights", "ctlg_pic_party_lights");
        _SafeCls_1953.PRODUCT_IMAGES.set("xmas_snow", "ctlg_pic_xmas_snow");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal1", "ctlg_pic_deal_wired_pswdoor");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal2", "ctlg_pic_deal_wired_swtchdoor");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal3", "ctlg_pic_deal_wired_coopdoor");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal4", "ctlg_pic_deal_wired_rmtdoor");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal5", "ctlg_pic_deal_wired_wlcmmsg");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal6", "ctlg_pic_deal_wired_pswtele");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal7", "ctlg_pic_deal_wired_dircntrl");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal8", "ctlg_pic_deal_wired_mvngfurni");
        _SafeCls_1953.PRODUCT_IMAGES.set("wf_deal9", "ctlg_pic_deal_wired_flshfires");
        _SafeCls_1953.PRODUCT_IMAGES.set("qt_val11_heartlights", "ctlg_pic_qt_val11_heartlights");
        _SafeCls_1953.PRODUCT_IMAGES.set("GET_SNOWWAR_TOKENS", "snowwar_tokens_10");
        _SafeCls_1953.PRODUCT_IMAGES.set("GET_SNOWWAR_TOKENS2", "snowwar_tokens_10");
        _SafeCls_1953.PRODUCT_IMAGES.set("GET_SNOWWAR_TOKENS3", "snowwar_tokens_10");
        _SafeCls_1953.PRODUCT_IMAGES.set("room_ad_plus_badge", "events_confirm_purchase");
    }
}
