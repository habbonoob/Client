import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboInventoryBootstrap } from '@/com/sulake/bootstrap/HabboInventoryBootstrap';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboInventoryCom_manifest_binAsset = embedBytes("inventory/HabboInventoryCom_manifest.bin");
const inventory_xml_binAsset = embedBytes("inventory/inventory_xml.bin");
const inventory_thumb_xml_binAsset = embedBytes("inventory/inventory_thumb_xml.bin");
const inventory_thumb_nft_xml_binAsset = embedBytes("inventory/inventory_thumb_nft_xml.bin");
const inventory_thumb_credits_xml_binAsset = embedBytes("inventory/inventory_thumb_credits_xml.bin");
const inventory_effects_xml_binAsset = embedBytes("inventory/inventory_effects_xml.bin");
const inventory_trading_xml_binAsset = embedBytes("inventory/inventory_trading_xml.bin");
const inventory_trading_minimized_xml_binAsset = embedBytes("inventory/inventory_trading_minimized_xml.bin");
const inventory_trading_wired_xml_binAsset = embedBytes("inventory/inventory_trading_wired_xml.bin");
const buy_marketplace_tokens_xml_binAsset = embedBytes("inventory/buy_marketplace_tokens_xml.bin");
const make_marketplace_offer_xml_binAsset = embedBytes("inventory/make_marketplace_offer_xml.bin");
const marketplace_no_credits_xml_binAsset = embedBytes("inventory/marketplace_no_credits_xml.bin");
const unseen_item_symbol_xml_binAsset = embedBytes("inventory/unseen_item_symbol_xml.bin");
const fx_icon_1_png_pngAsset = embedBitmap("inventory/fx_icon_1_png.png");
const fx_icon_2_png_pngAsset = embedBitmap("inventory/fx_icon_2_png.png");
const fx_icon_3_png_pngAsset = embedBitmap("inventory/fx_icon_3_png.png");
const fx_icon_4_png_pngAsset = embedBitmap("inventory/fx_icon_4_png.png");
const fx_icon_5_png_pngAsset = embedBitmap("inventory/fx_icon_5_png.png");
const fx_icon_6_png_pngAsset = embedBitmap("inventory/fx_icon_6_png.png");
const fx_icon_7_png_pngAsset = embedBitmap("inventory/fx_icon_7_png.png");
const fx_icon_8_png_pngAsset = embedBitmap("inventory/fx_icon_8_png.png");
const fx_icon_9_png_pngAsset = embedBitmap("inventory/fx_icon_9_png.png");
const fx_icon_10_png_pngAsset = embedBitmap("inventory/fx_icon_10_png.png");
const fx_icon_11_png_pngAsset = embedBitmap("inventory/fx_icon_11_png.png");
const fx_icon_12_png_pngAsset = embedBitmap("inventory/fx_icon_12_png.png");
const fx_icon_13_png_pngAsset = embedBitmap("inventory/fx_icon_13_png.png");
const fx_icon_14_png_pngAsset = embedBitmap("inventory/fx_icon_14_png.png");
const fx_icon_15_png_pngAsset = embedBitmap("inventory/fx_icon_15_png.png");
const fx_icon_16_png_pngAsset = embedBitmap("inventory/fx_icon_16_png.png");
const fx_icon_17_png_pngAsset = embedBitmap("inventory/fx_icon_17_png.png");
const fx_icon_18_png_pngAsset = embedBitmap("inventory/fx_icon_18_png.png");
const fx_icon_19_png_pngAsset = embedBitmap("inventory/fx_icon_19_png.png");
const fx_icon_20_png_pngAsset = embedBitmap("inventory/fx_icon_20_png.png");
const fx_icon_21_png_pngAsset = embedBitmap("inventory/fx_icon_21_png.png");
const fx_icon_22_png_pngAsset = embedBitmap("inventory/fx_icon_22_png.png");
const fx_icon_23_png_pngAsset = embedBitmap("inventory/fx_icon_23_png.png");
const fx_icon_24_png_pngAsset = embedBitmap("inventory/fx_icon_24_png.png");
const fx_icon_25_png_pngAsset = embedBitmap("inventory/fx_icon_25_png.png");
const fx_icon_26_png_pngAsset = embedBitmap("inventory/fx_icon_26_png.png");
const fx_icon_27_png_pngAsset = embedBitmap("inventory/fx_icon_27_png.png");
const fx_icon_31_png_pngAsset = embedBitmap("inventory/fx_icon_31_png.png");
const fx_icon_32_png_pngAsset = embedBitmap("inventory/fx_icon_32_png.png");
const fx_icon_44_png_pngAsset = embedBitmap("inventory/fx_icon_44_png.png");
const fx_icon_47_png_pngAsset = embedBitmap("inventory/fx_icon_47_png.png");
const fx_icon_48_png_pngAsset = embedBitmap("inventory/fx_icon_48_png.png");
const fx_icon_53_png_pngAsset = embedBitmap("inventory/fx_icon_53_png.png");
const fx_icon_54_png_pngAsset = embedBitmap("inventory/fx_icon_54_png.png");
const fx_icon_59_png_pngAsset = embedBitmap("inventory/fx_icon_59_png.png");
const fx_icon_60_png_pngAsset = embedBitmap("inventory/fx_icon_60_png.png");
const fx_icon_61_png_pngAsset = embedBitmap("inventory/fx_icon_61_png.png");
const fx_icon_62_png_pngAsset = embedBitmap("inventory/fx_icon_62_png.png");
const fx_icon_63_png_pngAsset = embedBitmap("inventory/fx_icon_63_png.png");
const fx_icon_64_png_pngAsset = embedBitmap("inventory/fx_icon_64_png.png");
const fx_icon_65_png_pngAsset = embedBitmap("inventory/fx_icon_65_png.png");
const fx_icon_66_png_pngAsset = embedBitmap("inventory/fx_icon_66_png.png");
const fx_icon_67_png_pngAsset = embedBitmap("inventory/fx_icon_67_png.png");
const fx_icon_69_png_pngAsset = embedBitmap("inventory/fx_icon_69_png.png");
const fx_icon_70_png_pngAsset = embedBitmap("inventory/fx_icon_70_png.png");
const fx_icon_71_png_pngAsset = embedBitmap("inventory/fx_icon_71_png.png");
const fx_icon_73_png_pngAsset = embedBitmap("inventory/fx_icon_73_png.png");
const fx_icon_74_png_pngAsset = embedBitmap("inventory/fx_icon_74_png.png");
const fx_icon_75_png_pngAsset = embedBitmap("inventory/fx_icon_75_png.png");
const fx_icon_76_png_pngAsset = embedBitmap("inventory/fx_icon_76_png.png");
const fx_icon_78_png_pngAsset = embedBitmap("inventory/fx_icon_78_png.png");
const fx_icon_79_png_pngAsset = embedBitmap("inventory/fx_icon_79_png.png");
const fx_icon_80_png_pngAsset = embedBitmap("inventory/fx_icon_80_png.png");
const fx_icon_81_png_pngAsset = embedBitmap("inventory/fx_icon_81_png.png");
const fx_icon_82_png_pngAsset = embedBitmap("inventory/fx_icon_82_png.png");
const fx_icon_83_png_pngAsset = embedBitmap("inventory/fx_icon_83_png.png");
const fx_icon_84_png_pngAsset = embedBitmap("inventory/fx_icon_84_png.png");
const fx_icon_85_png_pngAsset = embedBitmap("inventory/fx_icon_85_png.png");
const fx_icon_86_png_pngAsset = embedBitmap("inventory/fx_icon_86_png.png");
const fx_icon_87_png_pngAsset = embedBitmap("inventory/fx_icon_87_png.png");
const fx_icon_88_png_pngAsset = embedBitmap("inventory/fx_icon_88_png.png");
const fx_icon_89_png_pngAsset = embedBitmap("inventory/fx_icon_89_png.png");
const fx_icon_90_png_pngAsset = embedBitmap("inventory/fx_icon_90_png.png");
const fx_icon_91_png_pngAsset = embedBitmap("inventory/fx_icon_91_png.png");
const fx_icon_92_png_pngAsset = embedBitmap("inventory/fx_icon_92_png.png");
const fx_icon_93_png_pngAsset = embedBitmap("inventory/fx_icon_93_png.png");
const fx_icon_94_png_pngAsset = embedBitmap("inventory/fx_icon_94_png.png");
const fx_icon_99_png_pngAsset = embedBitmap("inventory/fx_icon_99_png.png");
const fx_icon_100_png_pngAsset = embedBitmap("inventory/fx_icon_100_png.png");
const fx_icon_101_png_pngAsset = embedBitmap("inventory/fx_icon_101_png.png");
const fx_icon_102_png_pngAsset = embedBitmap("inventory/fx_icon_102_png.png");
const fx_icon_104_png_pngAsset = embedBitmap("inventory/fx_icon_104_png.png");
const fx_icon_105_png_pngAsset = embedBitmap("inventory/fx_icon_105_png.png");
const fx_icon_106_png_pngAsset = embedBitmap("inventory/fx_icon_106_png.png");
const fx_icon_107_png_pngAsset = embedBitmap("inventory/fx_icon_107_png.png");
const fx_icon_108_png_pngAsset = embedBitmap("shared/fx_icon_108_png.png");
const fx_icon_109_png_pngAsset = embedBitmap("inventory/fx_icon_109_png.png");
const fx_icon_110_png_pngAsset = embedBitmap("inventory/fx_icon_110_png.png");
const fx_icon_111_png_pngAsset = embedBitmap("inventory/fx_icon_111_png.png");
const fx_icon_112_png_pngAsset = embedBitmap("inventory/fx_icon_112_png.png");
const fx_icon_113_png_pngAsset = embedBitmap("inventory/fx_icon_113_png.png");
const fx_icon_114_png_pngAsset = embedBitmap("inventory/fx_icon_114_png.png");
const fx_icon_115_png_pngAsset = embedBitmap("inventory/fx_icon_115_png.png");
const fx_icon_116_png_pngAsset = embedBitmap("inventory/fx_icon_116_png.png");
const fx_icon_117_png_pngAsset = embedBitmap("inventory/fx_icon_117_png.png");
const fx_icon_118_png_pngAsset = embedBitmap("inventory/fx_icon_118_png.png");
const fx_icon_119_png_pngAsset = embedBitmap("inventory/fx_icon_119_png.png");
const fx_icon_120_png_pngAsset = embedBitmap("inventory/fx_icon_120_png.png");
const fx_icon_121_png_pngAsset = embedBitmap("inventory/fx_icon_121_png.png");
const fx_icon_122_png_pngAsset = embedBitmap("inventory/fx_icon_122_png.png");
const fx_icon_123_png_pngAsset = embedBitmap("inventory/fx_icon_123_png.png");
const fx_icon_124_png_pngAsset = embedBitmap("inventory/fx_icon_124_png.png");
const fx_icon_125_png_pngAsset = embedBitmap("inventory/fx_icon_125_png.png");
const fx_icon_127_png_pngAsset = embedBitmap("inventory/fx_icon_127_png.png");
const fx_icon_132_png_pngAsset = embedBitmap("inventory/fx_icon_132_png.png");
const fx_icon_134_png_pngAsset = embedBitmap("inventory/fx_icon_134_png.png");
const fx_icon_135_png_pngAsset = embedBitmap("inventory/fx_icon_135_png.png");
const fx_icon_136_png_pngAsset = embedBitmap("inventory/fx_icon_136_png.png");
const fx_icon_137_png_pngAsset = embedBitmap("inventory/fx_icon_137_png.png");
const fx_icon_138_png_pngAsset = embedBitmap("inventory/fx_icon_138_png.png");
const fx_icon_139_png_pngAsset = embedBitmap("inventory/fx_icon_139_png.png");
const fx_icon_140_png_pngAsset = embedBitmap("inventory/fx_icon_140_png.png");
const fx_icon_141_png_pngAsset = embedBitmap("inventory/fx_icon_141_png.png");
const fx_icon_142_png_pngAsset = embedBitmap("inventory/fx_icon_142_png.png");
const fx_icon_143_png_pngAsset = embedBitmap("inventory/fx_icon_143_png.png");
const fx_icon_144_png_pngAsset = embedBitmap("inventory/fx_icon_144_png.png");
const fx_icon_145_png_pngAsset = embedBitmap("inventory/fx_icon_145_png.png");
const fx_icon_146_png_pngAsset = embedBitmap("inventory/fx_icon_146_png.png");
const fx_icon_147_png_pngAsset = embedBitmap("inventory/fx_icon_147_png.png");
const fx_icon_148_png_pngAsset = embedBitmap("inventory/fx_icon_148_png.png");
const fx_icon_149_png_pngAsset = embedBitmap("inventory/fx_icon_149_png.png");
const fx_icon_150_png_pngAsset = embedBitmap("inventory/fx_icon_150_png.png");
const fx_icon_151_png_pngAsset = embedBitmap("inventory/fx_icon_151_png.png");
const fx_icon_152_png_pngAsset = embedBitmap("inventory/fx_icon_152_png.png");
const fx_icon_153_png_pngAsset = embedBitmap("inventory/fx_icon_153_png.png");
const fx_icon_154_png_pngAsset = embedBitmap("inventory/fx_icon_154_png.png");
const fx_icon_155_png_pngAsset = embedBitmap("inventory/fx_icon_155_png.png");
const fx_icon_156_png_pngAsset = embedBitmap("inventory/fx_icon_156_png.png");
const fx_icon_157_png_pngAsset = embedBitmap("inventory/fx_icon_157_png.png");
const fx_icon_158_png_pngAsset = embedBitmap("inventory/fx_icon_158_png.png");
const fx_icon_159_png_pngAsset = embedBitmap("inventory/fx_icon_159_png.png");
const fx_icon_160_png_pngAsset = embedBitmap("inventory/fx_icon_160_png.png");
const fx_icon_161_png_pngAsset = embedBitmap("inventory/fx_icon_161_png.png");
const fx_icon_162_png_pngAsset = embedBitmap("inventory/fx_icon_162_png.png");
const fx_icon_164_png_pngAsset = embedBitmap("inventory/fx_icon_164_png.png");
const fx_icon_165_png_pngAsset = embedBitmap("inventory/fx_icon_165_png.png");
const fx_icon_166_png_pngAsset = embedBitmap("inventory/fx_icon_166_png.png");
const fx_icon_167_png_pngAsset = embedBitmap("inventory/fx_icon_167_png.png");
const fx_icon_168_png_pngAsset = embedBitmap("inventory/fx_icon_168_png.png");
const fx_icon_169_png_pngAsset = embedBitmap("inventory/fx_icon_169_png.png");
const fx_icon_170_png_pngAsset = embedBitmap("inventory/fx_icon_170_png.png");
const fx_icon_171_png_pngAsset = embedBitmap("inventory/fx_icon_171_png.png");
const fx_icon_172_png_pngAsset = embedBitmap("inventory/fx_icon_172_png.png");
const fx_icon_173_png_pngAsset = embedBitmap("inventory/fx_icon_173_png.png");
const fx_icon_174_png_pngAsset = embedBitmap("inventory/fx_icon_174_png.png");
const fx_icon_175_png_pngAsset = embedBitmap("inventory/fx_icon_175_png.png");
const fx_icon_176_png_pngAsset = embedBitmap("inventory/fx_icon_176_png.png");
const fx_icon_177_png_pngAsset = embedBitmap("inventory/fx_icon_177_png.png");
const fx_icon_178_png_pngAsset = embedBitmap("inventory/fx_icon_178_png.png");
const fx_icon_179_png_pngAsset = embedBitmap("inventory/fx_icon_179_png.png");
const fx_icon_180_png_pngAsset = embedBitmap("inventory/fx_icon_180_png.png");
const fx_icon_181_png_pngAsset = embedBitmap("inventory/fx_icon_181_png.png");
const fx_icon_182_png_pngAsset = embedBitmap("inventory/fx_icon_182_png.png");
const fx_icon_183_png_pngAsset = embedBitmap("inventory/fx_icon_183_png.png");
const fx_icon_186_png_pngAsset = embedBitmap("inventory/fx_icon_186_png.png");
const fx_icon_191_png_pngAsset = embedBitmap("inventory/fx_icon_191_png.png");
const fx_icon_192_png_pngAsset = embedBitmap("inventory/fx_icon_192_png.png");
const fx_icon_201_png_pngAsset = embedBitmap("inventory/fx_icon_201_png.png");
const fx_icon_202_png_pngAsset = embedBitmap("inventory/fx_icon_202_png.png");
const fx_icon_203_png_pngAsset = embedBitmap("inventory/fx_icon_203_png.png");
const fx_icon_204_png_pngAsset = embedBitmap("inventory/fx_icon_204_png.png");
const fx_icon_205_png_pngAsset = embedBitmap("inventory/fx_icon_205_png.png");
const fx_icon_206_png_pngAsset = embedBitmap("inventory/fx_icon_206_png.png");
const fx_icon_210_png_pngAsset = embedBitmap("inventory/fx_icon_210_png.png");
const fx_icon_211_png_pngAsset = embedBitmap("inventory/fx_icon_211_png.png");
const fx_icon_212_png_pngAsset = embedBitmap("inventory/fx_icon_212_png.png");
const fx_icon_214_png_pngAsset = embedBitmap("inventory/fx_icon_214_png.png");
const fx_icon_220_png_pngAsset = embedBitmap("inventory/fx_icon_220_png.png");
const fx_icon_222_png_pngAsset = embedBitmap("inventory/fx_icon_222_png.png");
const fx_icon_229_png_pngAsset = embedBitmap("inventory/fx_icon_229_png.png");
const fx_icon_230_png_pngAsset = embedBitmap("inventory/fx_icon_230_png.png");
const fx_icon_231_png_pngAsset = embedBitmap("inventory/fx_icon_231_png.png");
const fx_icon_232_png_pngAsset = embedBitmap("inventory/fx_icon_232_png.png");
const fx_icon_236_png_pngAsset = embedBitmap("inventory/fx_icon_236_png.png");
const fx_icon_238_png_pngAsset = embedBitmap("inventory/fx_icon_238_png.png");
const fx_icon_239_png_pngAsset = embedBitmap("inventory/fx_icon_239_png.png");
const fx_icon_240_png_pngAsset = embedBitmap("inventory/fx_icon_240_png.png");
const fx_icon_241_png_pngAsset = embedBitmap("inventory/fx_icon_241_png.png");
const item_popup_xml_binAsset = embedBytes("inventory/item_popup_xml.bin");
const popup_arrow_left_png_pngAsset = embedBitmap("shared/popup_arrow_left_png.png");
const popup_arrow_right_png_pngAsset = embedBitmap("shared/popup_arrow_right_png.png");

export class HabboInventoryCom extends SimpleApplication {
    static { registerClassName(this, 'HabboInventoryCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboInventoryCom.#initStatics();
        return HabboInventoryCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboInventoryCom.#initStatics();
        HabboInventoryCom.requiredClasses = value;
    }

    public static manifest = HabboInventoryCom_manifest_binAsset;

    public static inventory_xml = inventory_xml_binAsset;

    public static inventory_thumb_xml = inventory_thumb_xml_binAsset;

    public static inventory_thumb_nft_xml = inventory_thumb_nft_xml_binAsset;

    public static inventory_thumb_credits_xml = inventory_thumb_credits_xml_binAsset;

    public static inventory_effects_xml = inventory_effects_xml_binAsset;

    public static inventory_trading_xml = inventory_trading_xml_binAsset;

    public static inventory_trading_minimized_xml = inventory_trading_minimized_xml_binAsset;

    public static inventory_trading_wired_xml = inventory_trading_wired_xml_binAsset;

    public static buy_marketplace_tokens_xml = buy_marketplace_tokens_xml_binAsset;

    public static make_marketplace_offer_xml = make_marketplace_offer_xml_binAsset;

    public static marketplace_no_credits_xml = marketplace_no_credits_xml_binAsset;

    public static unseen_item_symbol_xml = unseen_item_symbol_xml_binAsset;

    public static fx_icon_1_png = fx_icon_1_png_pngAsset;

    public static fx_icon_2_png = fx_icon_2_png_pngAsset;

    public static fx_icon_3_png = fx_icon_3_png_pngAsset;

    public static fx_icon_4_png = fx_icon_4_png_pngAsset;

    public static fx_icon_5_png = fx_icon_5_png_pngAsset;

    public static fx_icon_6_png = fx_icon_6_png_pngAsset;

    public static fx_icon_7_png = fx_icon_7_png_pngAsset;

    public static fx_icon_8_png = fx_icon_8_png_pngAsset;

    public static fx_icon_9_png = fx_icon_9_png_pngAsset;

    public static fx_icon_10_png = fx_icon_10_png_pngAsset;

    public static fx_icon_11_png = fx_icon_11_png_pngAsset;

    public static fx_icon_12_png = fx_icon_12_png_pngAsset;

    public static fx_icon_13_png = fx_icon_13_png_pngAsset;

    public static fx_icon_14_png = fx_icon_14_png_pngAsset;

    public static fx_icon_15_png = fx_icon_15_png_pngAsset;

    public static fx_icon_16_png = fx_icon_16_png_pngAsset;

    public static fx_icon_17_png = fx_icon_17_png_pngAsset;

    public static fx_icon_18_png = fx_icon_18_png_pngAsset;

    public static fx_icon_19_png = fx_icon_19_png_pngAsset;

    public static fx_icon_20_png = fx_icon_20_png_pngAsset;

    public static fx_icon_21_png = fx_icon_21_png_pngAsset;

    public static fx_icon_22_png = fx_icon_22_png_pngAsset;

    public static fx_icon_23_png = fx_icon_23_png_pngAsset;

    public static fx_icon_24_png = fx_icon_24_png_pngAsset;

    public static fx_icon_25_png = fx_icon_25_png_pngAsset;

    public static fx_icon_26_png = fx_icon_26_png_pngAsset;

    public static fx_icon_27_png = fx_icon_27_png_pngAsset;

    public static fx_icon_31_png = fx_icon_31_png_pngAsset;

    public static fx_icon_32_png = fx_icon_32_png_pngAsset;

    public static fx_icon_44_png = fx_icon_44_png_pngAsset;

    public static fx_icon_47_png = fx_icon_47_png_pngAsset;

    public static fx_icon_48_png = fx_icon_48_png_pngAsset;

    public static fx_icon_53_png = fx_icon_53_png_pngAsset;

    public static fx_icon_54_png = fx_icon_54_png_pngAsset;

    public static fx_icon_59_png = fx_icon_59_png_pngAsset;

    public static fx_icon_60_png = fx_icon_60_png_pngAsset;

    public static fx_icon_61_png = fx_icon_61_png_pngAsset;

    public static fx_icon_62_png = fx_icon_62_png_pngAsset;

    public static fx_icon_63_png = fx_icon_63_png_pngAsset;

    public static fx_icon_64_png = fx_icon_64_png_pngAsset;

    public static fx_icon_65_png = fx_icon_65_png_pngAsset;

    public static fx_icon_66_png = fx_icon_66_png_pngAsset;

    public static fx_icon_67_png = fx_icon_67_png_pngAsset;

    public static fx_icon_69_png = fx_icon_69_png_pngAsset;

    public static fx_icon_70_png = fx_icon_70_png_pngAsset;

    public static fx_icon_71_png = fx_icon_71_png_pngAsset;

    public static fx_icon_72_png = fx_icon_71_png_pngAsset;

    public static fx_icon_73_png = fx_icon_73_png_pngAsset;

    public static fx_icon_74_png = fx_icon_74_png_pngAsset;

    public static fx_icon_75_png = fx_icon_75_png_pngAsset;

    public static fx_icon_76_png = fx_icon_76_png_pngAsset;

    public static fx_icon_78_png = fx_icon_78_png_pngAsset;

    public static fx_icon_79_png = fx_icon_79_png_pngAsset;

    public static fx_icon_80_png = fx_icon_80_png_pngAsset;

    public static fx_icon_81_png = fx_icon_81_png_pngAsset;

    public static fx_icon_82_png = fx_icon_82_png_pngAsset;

    public static fx_icon_83_png = fx_icon_83_png_pngAsset;

    public static fx_icon_84_png = fx_icon_84_png_pngAsset;

    public static fx_icon_85_png = fx_icon_85_png_pngAsset;

    public static fx_icon_86_png = fx_icon_86_png_pngAsset;

    public static fx_icon_87_png = fx_icon_87_png_pngAsset;

    public static fx_icon_88_png = fx_icon_88_png_pngAsset;

    public static fx_icon_89_png = fx_icon_89_png_pngAsset;

    public static fx_icon_90_png = fx_icon_90_png_pngAsset;

    public static fx_icon_91_png = fx_icon_91_png_pngAsset;

    public static fx_icon_92_png = fx_icon_92_png_pngAsset;

    public static fx_icon_93_png = fx_icon_93_png_pngAsset;

    public static fx_icon_94_png = fx_icon_94_png_pngAsset;

    public static fx_icon_99_png = fx_icon_99_png_pngAsset;

    public static fx_icon_100_png = fx_icon_100_png_pngAsset;

    public static fx_icon_101_png = fx_icon_101_png_pngAsset;

    public static fx_icon_102_png = fx_icon_102_png_pngAsset;

    public static fx_icon_104_png = fx_icon_104_png_pngAsset;

    public static fx_icon_105_png = fx_icon_105_png_pngAsset;

    public static fx_icon_106_png = fx_icon_106_png_pngAsset;

    public static fx_icon_107_png = fx_icon_107_png_pngAsset;

    public static fx_icon_108_png = fx_icon_108_png_pngAsset;

    public static fx_icon_109_png = fx_icon_109_png_pngAsset;

    public static fx_icon_110_png = fx_icon_110_png_pngAsset;

    public static fx_icon_111_png = fx_icon_111_png_pngAsset;

    public static fx_icon_112_png = fx_icon_112_png_pngAsset;

    public static fx_icon_113_png = fx_icon_113_png_pngAsset;

    public static fx_icon_114_png = fx_icon_114_png_pngAsset;

    public static fx_icon_115_png = fx_icon_115_png_pngAsset;

    public static fx_icon_116_png = fx_icon_116_png_pngAsset;

    public static fx_icon_117_png = fx_icon_117_png_pngAsset;

    public static fx_icon_118_png = fx_icon_118_png_pngAsset;

    public static fx_icon_119_png = fx_icon_119_png_pngAsset;

    public static fx_icon_120_png = fx_icon_120_png_pngAsset;

    public static fx_icon_121_png = fx_icon_121_png_pngAsset;

    public static fx_icon_122_png = fx_icon_122_png_pngAsset;

    public static fx_icon_123_png = fx_icon_123_png_pngAsset;

    public static fx_icon_124_png = fx_icon_124_png_pngAsset;

    public static fx_icon_125_png = fx_icon_125_png_pngAsset;

    public static fx_icon_126_png = fx_icon_86_png_pngAsset;

    public static fx_icon_127_png = fx_icon_127_png_pngAsset;

    public static fx_icon_128_png = fx_icon_88_png_pngAsset;

    public static fx_icon_129_png = fx_icon_89_png_pngAsset;

    public static fx_icon_130_png = fx_icon_90_png_pngAsset;

    public static fx_icon_131_png = fx_icon_91_png_pngAsset;

    public static fx_icon_132_png = fx_icon_132_png_pngAsset;

    public static fx_icon_133_png = fx_icon_93_png_pngAsset;

    public static fx_icon_134_png = fx_icon_134_png_pngAsset;

    public static fx_icon_135_png = fx_icon_135_png_pngAsset;

    public static fx_icon_136_png = fx_icon_136_png_pngAsset;

    public static fx_icon_137_png = fx_icon_137_png_pngAsset;

    public static fx_icon_138_png = fx_icon_138_png_pngAsset;

    public static fx_icon_139_png = fx_icon_139_png_pngAsset;

    public static fx_icon_140_png = fx_icon_140_png_pngAsset;

    public static fx_icon_141_png = fx_icon_141_png_pngAsset;

    public static fx_icon_142_png = fx_icon_142_png_pngAsset;

    public static fx_icon_143_png = fx_icon_143_png_pngAsset;

    public static fx_icon_144_png = fx_icon_144_png_pngAsset;

    public static fx_icon_145_png = fx_icon_145_png_pngAsset;

    public static fx_icon_146_png = fx_icon_146_png_pngAsset;

    public static fx_icon_147_png = fx_icon_147_png_pngAsset;

    public static fx_icon_148_png = fx_icon_148_png_pngAsset;

    public static fx_icon_149_png = fx_icon_149_png_pngAsset;

    public static fx_icon_150_png = fx_icon_150_png_pngAsset;

    public static fx_icon_151_png = fx_icon_151_png_pngAsset;

    public static fx_icon_152_png = fx_icon_152_png_pngAsset;

    public static fx_icon_153_png = fx_icon_153_png_pngAsset;

    public static fx_icon_154_png = fx_icon_154_png_pngAsset;

    public static fx_icon_155_png = fx_icon_155_png_pngAsset;

    public static fx_icon_156_png = fx_icon_156_png_pngAsset;

    public static fx_icon_157_png = fx_icon_157_png_pngAsset;

    public static fx_icon_158_png = fx_icon_158_png_pngAsset;

    public static fx_icon_159_png = fx_icon_159_png_pngAsset;

    public static fx_icon_160_png = fx_icon_160_png_pngAsset;

    public static fx_icon_161_png = fx_icon_161_png_pngAsset;

    public static fx_icon_162_png = fx_icon_162_png_pngAsset;

    public static fx_icon_164_png = fx_icon_164_png_pngAsset;

    public static fx_icon_165_png = fx_icon_165_png_pngAsset;

    public static fx_icon_166_png = fx_icon_166_png_pngAsset;

    public static fx_icon_167_png = fx_icon_167_png_pngAsset;

    public static fx_icon_168_png = fx_icon_168_png_pngAsset;

    public static fx_icon_169_png = fx_icon_169_png_pngAsset;

    public static fx_icon_170_png = fx_icon_170_png_pngAsset;

    public static fx_icon_171_png = fx_icon_171_png_pngAsset;

    public static fx_icon_172_png = fx_icon_172_png_pngAsset;

    public static fx_icon_173_png = fx_icon_173_png_pngAsset;

    public static fx_icon_174_png = fx_icon_174_png_pngAsset;

    public static fx_icon_175_png = fx_icon_175_png_pngAsset;

    public static fx_icon_176_png = fx_icon_176_png_pngAsset;

    public static fx_icon_177_png = fx_icon_177_png_pngAsset;

    public static fx_icon_178_png = fx_icon_178_png_pngAsset;

    public static fx_icon_179_png = fx_icon_179_png_pngAsset;

    public static fx_icon_180_png = fx_icon_180_png_pngAsset;

    public static fx_icon_181_png = fx_icon_181_png_pngAsset;

    public static fx_icon_182_png = fx_icon_182_png_pngAsset;

    public static fx_icon_183_png = fx_icon_183_png_pngAsset;

    public static fx_icon_186_png = fx_icon_186_png_pngAsset;

    public static fx_icon_191_png = fx_icon_191_png_pngAsset;

    public static fx_icon_192_png = fx_icon_192_png_pngAsset;

    public static fx_icon_201_png = fx_icon_201_png_pngAsset;

    public static fx_icon_202_png = fx_icon_202_png_pngAsset;

    public static fx_icon_203_png = fx_icon_203_png_pngAsset;

    public static fx_icon_204_png = fx_icon_204_png_pngAsset;

    public static fx_icon_205_png = fx_icon_205_png_pngAsset;

    public static fx_icon_206_png = fx_icon_206_png_pngAsset;

    public static fx_icon_210_png = fx_icon_210_png_pngAsset;

    public static fx_icon_211_png = fx_icon_211_png_pngAsset;

    public static fx_icon_212_png = fx_icon_212_png_pngAsset;

    public static fx_icon_214_png = fx_icon_214_png_pngAsset;

    public static fx_icon_220_png = fx_icon_220_png_pngAsset;

    public static fx_icon_222_png = fx_icon_222_png_pngAsset;

    public static fx_icon_229_png = fx_icon_229_png_pngAsset;

    public static fx_icon_230_png = fx_icon_230_png_pngAsset;

    public static fx_icon_231_png = fx_icon_231_png_pngAsset;

    public static fx_icon_232_png = fx_icon_232_png_pngAsset;

    public static fx_icon_236_png = fx_icon_236_png_pngAsset;

    public static fx_icon_238_png = fx_icon_238_png_pngAsset;

    public static fx_icon_239_png = fx_icon_239_png_pngAsset;

    public static fx_icon_240_png = fx_icon_240_png_pngAsset;

    public static fx_icon_241_png = fx_icon_241_png_pngAsset;

    public static item_popup_xml = item_popup_xml_binAsset;

    public static popup_arrow_left_png = popup_arrow_left_png_pngAsset;

    public static popup_arrow_right_png = popup_arrow_right_png_pngAsset;

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboInventoryCom.#staticsReady) return;
        HabboInventoryCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboInventoryCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboInventoryBootstrap, IIDHabboInventory]);
    }
}
