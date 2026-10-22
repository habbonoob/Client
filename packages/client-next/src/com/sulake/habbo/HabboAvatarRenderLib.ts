import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { AvatarRenderManagerBootstrap } from '@/com/sulake/bootstrap/AvatarRenderManagerBootstrap';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboAvatarRenderLib_manifest_binAsset = embedBytes("avatar/HabboAvatarRenderLib_manifest.bin");
const user_typing_png_pngAsset = embedBitmap("avatar/user_typing_png.png");
const user_typing_small_png_pngAsset = embedBitmap("avatar/user_typing_small_png.png");
const user_muted_png_pngAsset = embedBitmap("avatar/user_muted_png.png");
const user_muted_small_png_pngAsset = embedBitmap("avatar/user_muted_small_png.png");
const user_blowkiss_png_pngAsset = embedBitmap("avatar/user_blowkiss_png.png");
const user_blowkiss_small_png_pngAsset = embedBitmap("avatar/user_blowkiss_small_png.png");
const user_guide_bubble_png_pngAsset = embedBitmap("avatar/user_guide_bubble_png.png");
const user_guide_requester_bubble_png_pngAsset = embedBitmap("avatar/user_guide_requester_bubble_png.png");
const user_idle_left_1_png_pngAsset = embedBitmap("avatar/user_idle_left_1_png.png");
const user_idle_left_2_png_pngAsset = embedBitmap("avatar/user_idle_left_2_png.png");
const user_idle_left_1_small_png_pngAsset = embedBitmap("avatar/user_idle_left_1_small_png.png");
const user_idle_left_2_small_png_pngAsset = embedBitmap("avatar/user_idle_left_2_small_png.png");
const user_idle_right_1_png_pngAsset = embedBitmap("avatar/user_idle_right_1_png.png");
const user_idle_right_2_png_pngAsset = embedBitmap("avatar/user_idle_right_2_png.png");
const user_idle_right_1_small_png_pngAsset = embedBitmap("avatar/user_idle_right_1_small_png.png");
const user_idle_right_2_small_png_pngAsset = embedBitmap("avatar/user_idle_right_2_small_png.png");
const number_1_png_pngAsset = embedBitmap("avatar/number_1_png.png");
const number_2_png_pngAsset = embedBitmap("avatar/number_2_png.png");
const number_3_png_pngAsset = embedBitmap("avatar/number_3_png.png");
const number_4_png_pngAsset = embedBitmap("avatar/number_4_png.png");
const number_5_png_pngAsset = embedBitmap("avatar/number_5_png.png");
const number_1_small_png_pngAsset = embedBitmap("avatar/number_1_small_png.png");
const number_2_small_png_pngAsset = embedBitmap("avatar/number_2_small_png.png");
const number_3_small_png_pngAsset = embedBitmap("avatar/number_3_small_png.png");
const number_4_small_png_pngAsset = embedBitmap("avatar/number_4_small_png.png");
const number_5_small_png_pngAsset = embedBitmap("avatar/number_5_small_png.png");
const pet_experience_bubble_png_pngAsset = embedBitmap("shared/pet_experience_bubble_png.png");
const action_offset_lay_binAsset = embedBytes("avatar/action_offset_lay.bin");
const action_offset_swim_binAsset = embedBytes("avatar/action_offset_swim.bin");
const dance_sixseven_animation_binAsset = embedBytes("avatar/dance_sixseven_animation.bin");
const HabboAvatarAnimation_binAsset = embedBytes("avatar/HabboAvatarAnimation.bin");
const HabboAvatarFigure_binAsset = embedBytes("avatar/HabboAvatarFigure.bin");
const HabboAvatarGeometry_binAsset = embedBytes("avatar/HabboAvatarGeometry.bin");
const HabboAvatarPartSets_binAsset = embedBytes("avatar/HabboAvatarPartSets.bin");
const h_std_lg_1007_2_0_pngAsset = embedBitmap("avatar/h_std_lg_1007_2_0.png");
const h_std_lg_2182_2_0_pngAsset = embedBitmap("avatar/h_std_lg_2182_2_0.png");
const h_std_sh_2178_2_0_pngAsset = embedBitmap("avatar/h_std_sh_2178_2_0.png");
const h_std_sh_8_2_0_pngAsset = embedBitmap("avatar/h_std_sh_8_2_0.png");
const h_std_ey_9_2_0_pngAsset = embedBitmap("avatar/h_std_ey_9_2_0.png");
const h_std_lg_3_2_0_pngAsset = embedBitmap("avatar/h_std_lg_3_2_0.png");
const h_std_hr_1_2_0_pngAsset = embedBitmap("avatar/h_std_hr_1_2_0.png");
const h_std_ls_1_2_0_pngAsset = embedBitmap("avatar/h_std_ls_1_2_0.png");
const h_std_lg_201_2_0_pngAsset = embedBitmap("avatar/h_std_lg_201_2_0.png");
const h_std_sh_4_2_0_pngAsset = embedBitmap("avatar/h_std_sh_4_2_0.png");
const h_std_rh_1_2_0_pngAsset = embedBitmap("avatar/h_std_rh_1_2_0.png");
const h_std_sh_7_2_0_pngAsset = embedBitmap("avatar/h_std_sh_7_2_0.png");
const h_std_ey_4_2_0_pngAsset = embedBitmap("avatar/h_std_ey_4_2_0.png");
const h_std_ch_18_2_0_pngAsset = embedBitmap("avatar/h_std_ch_18_2_0.png");
const h_std_sh_2180_2_0_pngAsset = embedBitmap("avatar/h_std_sh_2180_2_0.png");
const h_std_ey_6_2_0_pngAsset = embedBitmap("avatar/h_std_ey_6_2_0.png");
const h_std_hr_26_2_0_pngAsset = embedBitmap("avatar/h_std_hr_26_2_0.png");
const h_std_rs_1_2_0_pngAsset = embedBitmap("avatar/h_std_rs_1_2_0.png");
const h_std_hrb_26_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_26_2_0.png");
const h_std_lg_7_2_0_pngAsset = embedBitmap("avatar/h_std_lg_7_2_0.png");
const h_std_lg_2181_2_0_pngAsset = embedBitmap("avatar/h_std_lg_2181_2_0.png");
const h_std_lh_1_2_0_pngAsset = embedBitmap("avatar/h_std_lh_1_2_0.png");
const h_std_fc_1_2_0_pngAsset = embedBitmap("avatar/h_std_fc_1_2_0.png");
const h_std_sh_1_2_0_pngAsset = embedBitmap("avatar/h_std_sh_1_2_0.png");
const h_std_sh_2179_2_0_pngAsset = embedBitmap("avatar/h_std_sh_2179_2_0.png");
const h_std_hd_1_2_0_pngAsset = embedBitmap("avatar/h_std_hd_1_2_0.png");
const h_std_ey_1_2_0_pngAsset = embedBitmap("avatar/h_std_ey_1_2_0.png");
const h_std_hrb_11_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_11_2_0.png");
const h_std_ey_8_2_0_pngAsset = embedBitmap("avatar/h_std_ey_8_2_0.png");
const h_std_ch_207_2_0_pngAsset = embedBitmap("avatar/h_std_ch_207_2_0.png");
const h_std_ch_100_2_0_pngAsset = embedBitmap("avatar/h_std_ch_100_2_0.png");
const h_std_hr_4_2_0_pngAsset = embedBitmap("avatar/h_std_hr_4_2_0.png");
const h_std_hrb_4_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_4_2_0.png");
const h_std_hr_6_2_0_pngAsset = embedBitmap("avatar/h_std_hr_6_2_0.png");
const h_std_hrb_6_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_6_2_0.png");
const h_std_hrb_33_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_33_2_0.png");
const h_std_ch_4_2_0_pngAsset = embedBitmap("avatar/h_std_ch_4_2_0.png");
const h_std_hd_2_2_0_pngAsset = embedBitmap("avatar/h_std_hd_2_2_0.png");
const h_std_ch_1207_2_0_pngAsset = embedBitmap("avatar/h_std_ch_1207_2_0.png");
const h_std_lg_6_2_0_pngAsset = embedBitmap("avatar/h_std_lg_6_2_0.png");
const h_std_ch_1100_2_0_pngAsset = embedBitmap("avatar/h_std_ch_1100_2_0.png");
const h_std_lg_2_2_0_pngAsset = embedBitmap("avatar/h_std_lg_2_2_0.png");
const h_std_ey_2_2_0_pngAsset = embedBitmap("avatar/h_std_ey_2_2_0.png");
const h_std_hr_24_2_0_pngAsset = embedBitmap("avatar/h_std_hr_24_2_0.png");
const h_std_sh_6_2_0_pngAsset = embedBitmap("avatar/h_std_sh_6_2_0.png");
const h_std_hrb_24_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_24_2_0.png");
const h_std_ha_15_2_0_pngAsset = embedBitmap("avatar/h_std_ha_15_2_0.png");
const h_std_ch_101_2_0_pngAsset = embedBitmap("avatar/h_std_ch_101_2_0.png");
const h_std_rs_2_2_0_pngAsset = embedBitmap("avatar/h_std_rs_2_2_0.png");
const h_std_hr_11_2_0_pngAsset = embedBitmap("avatar/h_std_hr_11_2_0.png");
const h_std_ch_10_2_0_pngAsset = embedBitmap("avatar/h_std_ch_10_2_0.png");
const h_std_ey_7_2_0_pngAsset = embedBitmap("avatar/h_std_ey_7_2_0.png");
const h_std_lg_2183_2_0_pngAsset = embedBitmap("avatar/h_std_lg_2183_2_0.png");
const h_std_ls_2_2_0_pngAsset = embedBitmap("avatar/h_std_ls_2_2_0.png");
const h_std_ea_6_2_0_pngAsset = embedBitmap("avatar/h_std_ea_6_2_0.png");
const h_std_fa_12_2_0_pngAsset = embedBitmap("avatar/h_std_fa_12_2_0.png");
const h_std_hr_33_2_0_pngAsset = embedBitmap("avatar/h_std_hr_33_2_0.png");
const h_std_ch_1101_2_0_pngAsset = embedBitmap("avatar/h_std_ch_1101_2_0.png");
const h_std_ha_3_2_0_pngAsset = embedBitmap("avatar/h_std_ha_3_2_0.png");
const h_std_ch_1_2_0_pngAsset = embedBitmap("avatar/h_std_ch_1_2_0.png");
const h_std_bd_1_2_0_pngAsset = embedBitmap("avatar/h_std_bd_1_2_0.png");
const h_std_hrb_1_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_1_2_0.png");
const h_std_hr_36_2_0_pngAsset = embedBitmap("avatar/h_std_hr_36_2_0.png");
const h_std_hrb_36_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_36_2_0.png");
const h_std_hr_16_2_0_pngAsset = embedBitmap("avatar/h_std_hr_16_2_0.png");
const h_std_hrb_16_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_16_2_0.png");
const h_std_hr_32_2_0_pngAsset = embedBitmap("avatar/h_std_hr_32_2_0.png");
const h_std_hrb_32_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_32_2_0.png");
const h_std_hr_35_2_0_pngAsset = embedBitmap("avatar/h_std_hr_35_2_0.png");
const h_std_hrb_35_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_35_2_0.png");
const h_std_hr_200_2_0_pngAsset = embedBitmap("avatar/h_std_hr_200_2_0.png");
const h_std_hrb_200_2_0_pngAsset = embedBitmap("avatar/h_std_hrb_200_2_0.png");
const h_std_ey_5_2_0_pngAsset = embedBitmap("avatar/h_std_ey_5_2_0.png");
const h_std_ey_3_2_0_pngAsset = embedBitmap("avatar/h_std_ey_3_2_0.png");
const h_std_ch_5_2_0_pngAsset = embedBitmap("avatar/h_std_ch_5_2_0.png");
const h_std_ch_202_2_0_pngAsset = embedBitmap("avatar/h_std_ch_202_2_0.png");
const h_std_ch_1202_2_0_pngAsset = embedBitmap("avatar/h_std_ch_1202_2_0.png");
const h_std_ch_16_2_0_pngAsset = embedBitmap("avatar/h_std_ch_16_2_0.png");
const h_std_ch_15_2_0_pngAsset = embedBitmap("avatar/h_std_ch_15_2_0.png");
const h_std_ch_2_2_0_pngAsset = embedBitmap("avatar/h_std_ch_2_2_0.png");
const h_std_ch_201_2_0_pngAsset = embedBitmap("avatar/h_std_ch_201_2_0.png");
const h_std_lg_1_2_0_pngAsset = embedBitmap("avatar/h_std_lg_1_2_0.png");
const h_std_lg_4_2_0_pngAsset = embedBitmap("avatar/h_std_lg_4_2_0.png");
const h_std_lg_5_2_0_pngAsset = embedBitmap("avatar/h_std_lg_5_2_0.png");
const h_std_sh_3_2_0_pngAsset = embedBitmap("avatar/h_std_sh_3_2_0.png");
const h_std_sh_5_2_0_pngAsset = embedBitmap("avatar/h_std_sh_5_2_0.png");
const h_std_ls_2050_2_0_pngAsset = embedBitmap("avatar/h_std_ls_2050_2_0.png");
const h_std_ch_2050_2_0_pngAsset = embedBitmap("avatar/h_std_ch_2050_2_0.png");
const h_std_rs_2050_2_0_pngAsset = embedBitmap("avatar/h_std_rs_2050_2_0.png");
const h_std_ch_2165_2_0_pngAsset = embedBitmap("avatar/h_std_ch_2165_2_0.png");
const h_std_ls_2165_2_0_pngAsset = embedBitmap("avatar/h_std_ls_2165_2_0.png");
const h_std_rs_2165_2_0_pngAsset = embedBitmap("avatar/h_std_rs_2165_2_0.png");
const h_std_ch_2166_2_0_pngAsset = embedBitmap("avatar/h_std_ch_2166_2_0.png");
const h_std_ls_2166_2_0_pngAsset = embedBitmap("avatar/h_std_ls_2166_2_0.png");
const h_std_rs_2166_2_0_pngAsset = embedBitmap("avatar/h_std_rs_2166_2_0.png");
const h_std_lg_2494_2_0_pngAsset = embedBitmap("avatar/h_std_lg_2494_2_0.png");
const h_std_sh_2111_2_0_pngAsset = embedBitmap("avatar/h_std_sh_2111_2_0.png");
const h_std_sh_2112_2_0_pngAsset = embedBitmap("avatar/h_std_sh_2112_2_0.png");
const h_std_lg_2037_2_0_pngAsset = embedBitmap("avatar/h_std_lg_2037_2_0.png");

export class HabboAvatarRenderLib extends SimpleApplication {
    static { registerClassName(this, 'HabboAvatarRenderLib'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboAvatarRenderLib.#initStatics();
        return HabboAvatarRenderLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboAvatarRenderLib.#initStatics();
        HabboAvatarRenderLib.requiredClasses = value;
    }

    public static manifest = HabboAvatarRenderLib_manifest_binAsset;

    public static user_typing_png = user_typing_png_pngAsset;

    public static user_typing_small_png = user_typing_small_png_pngAsset;

    public static user_muted_png = user_muted_png_pngAsset;

    public static user_muted_small_png = user_muted_small_png_pngAsset;

    public static user_blowkiss_png = user_blowkiss_png_pngAsset;

    public static user_blowkiss_small_png = user_blowkiss_small_png_pngAsset;

    public static user_guide_bubble_png = user_guide_bubble_png_pngAsset;

    public static user_guide_requester_bubble_png = user_guide_requester_bubble_png_pngAsset;

    public static user_idle_left_1_png = user_idle_left_1_png_pngAsset;

    public static user_idle_left_2_png = user_idle_left_2_png_pngAsset;

    public static user_idle_left_1_small_png = user_idle_left_1_small_png_pngAsset;

    public static user_idle_left_2_small_png = user_idle_left_2_small_png_pngAsset;

    public static user_idle_right_1_png = user_idle_right_1_png_pngAsset;

    public static user_idle_right_2_png = user_idle_right_2_png_pngAsset;

    public static user_idle_right_1_small_png = user_idle_right_1_small_png_pngAsset;

    public static user_idle_right_2_small_png = user_idle_right_2_small_png_pngAsset;

    public static number_1_png = number_1_png_pngAsset;

    public static number_2_png = number_2_png_pngAsset;

    public static number_3_png = number_3_png_pngAsset;

    public static number_4_png = number_4_png_pngAsset;

    public static number_5_png = number_5_png_pngAsset;

    public static number_1_small_png = number_1_small_png_pngAsset;

    public static number_2_small_png = number_2_small_png_pngAsset;

    public static number_3_small_png = number_3_small_png_pngAsset;

    public static number_4_small_png = number_4_small_png_pngAsset;

    public static number_5_small_png = number_5_small_png_pngAsset;

    public static pet_experience_bubble_png = pet_experience_bubble_png_pngAsset;

    public static action_offset_lay = action_offset_lay_binAsset;

    public static action_offset_swim = action_offset_swim_binAsset;

    public static dance_sixseven_animation = dance_sixseven_animation_binAsset;

    public static HabboAvatarAnimation = HabboAvatarAnimation_binAsset;

    public static HabboAvatarFigure = HabboAvatarFigure_binAsset;

    public static HabboAvatarGeometry = HabboAvatarGeometry_binAsset;

    public static HabboAvatarPartSets = HabboAvatarPartSets_binAsset;

    public static h_std_lg_1007_2_0 = h_std_lg_1007_2_0_pngAsset;

    public static h_std_lg_2182_2_0 = h_std_lg_2182_2_0_pngAsset;

    public static h_std_sh_2178_2_0 = h_std_sh_2178_2_0_pngAsset;

    public static h_std_sh_8_2_0 = h_std_sh_8_2_0_pngAsset;

    public static h_std_ey_9_2_0 = h_std_ey_9_2_0_pngAsset;

    public static h_std_lg_3_2_0 = h_std_lg_3_2_0_pngAsset;

    public static h_std_hr_1_2_0 = h_std_hr_1_2_0_pngAsset;

    public static h_std_ls_1_2_0 = h_std_ls_1_2_0_pngAsset;

    public static h_std_lg_201_2_0 = h_std_lg_201_2_0_pngAsset;

    public static h_std_sh_4_2_0 = h_std_sh_4_2_0_pngAsset;

    public static h_std_rh_1_2_0 = h_std_rh_1_2_0_pngAsset;

    public static h_std_sh_7_2_0 = h_std_sh_7_2_0_pngAsset;

    public static h_std_ey_4_2_0 = h_std_ey_4_2_0_pngAsset;

    public static h_std_ch_18_2_0 = h_std_ch_18_2_0_pngAsset;

    public static h_std_sh_2180_2_0 = h_std_sh_2180_2_0_pngAsset;

    public static h_std_ey_6_2_0 = h_std_ey_6_2_0_pngAsset;

    public static h_std_hr_26_2_0 = h_std_hr_26_2_0_pngAsset;

    public static h_std_rs_1_2_0 = h_std_rs_1_2_0_pngAsset;

    public static h_std_hrb_26_2_0 = h_std_hrb_26_2_0_pngAsset;

    public static h_std_lg_7_2_0 = h_std_lg_7_2_0_pngAsset;

    public static h_std_lg_2181_2_0 = h_std_lg_2181_2_0_pngAsset;

    public static h_std_lh_1_2_0 = h_std_lh_1_2_0_pngAsset;

    public static h_std_fc_1_2_0 = h_std_fc_1_2_0_pngAsset;

    public static h_std_sh_1_2_0 = h_std_sh_1_2_0_pngAsset;

    public static h_std_sh_2179_2_0 = h_std_sh_2179_2_0_pngAsset;

    public static h_std_hd_1_2_0 = h_std_hd_1_2_0_pngAsset;

    public static h_std_ey_1_2_0 = h_std_ey_1_2_0_pngAsset;

    public static h_std_hrb_11_2_0 = h_std_hrb_11_2_0_pngAsset;

    public static h_std_ey_8_2_0 = h_std_ey_8_2_0_pngAsset;

    public static h_std_ch_207_2_0 = h_std_ch_207_2_0_pngAsset;

    public static h_std_ch_100_2_0 = h_std_ch_100_2_0_pngAsset;

    public static h_std_hr_4_2_0 = h_std_hr_4_2_0_pngAsset;

    public static h_std_hrb_4_2_0 = h_std_hrb_4_2_0_pngAsset;

    public static h_std_hr_6_2_0 = h_std_hr_6_2_0_pngAsset;

    public static h_std_hrb_6_2_0 = h_std_hrb_6_2_0_pngAsset;

    public static h_std_hrb_33_2_0 = h_std_hrb_33_2_0_pngAsset;

    public static h_std_ch_4_2_0 = h_std_ch_4_2_0_pngAsset;

    public static h_std_hd_2_2_0 = h_std_hd_2_2_0_pngAsset;

    public static h_std_ch_1207_2_0 = h_std_ch_1207_2_0_pngAsset;

    public static h_std_lg_6_2_0 = h_std_lg_6_2_0_pngAsset;

    public static h_std_ch_1100_2_0 = h_std_ch_1100_2_0_pngAsset;

    public static h_std_lg_2_2_0 = h_std_lg_2_2_0_pngAsset;

    public static h_std_ey_2_2_0 = h_std_ey_2_2_0_pngAsset;

    public static h_std_hr_24_2_0 = h_std_hr_24_2_0_pngAsset;

    public static h_std_sh_6_2_0 = h_std_sh_6_2_0_pngAsset;

    public static h_std_hrb_24_2_0 = h_std_hrb_24_2_0_pngAsset;

    public static h_std_ha_15_2_0 = h_std_ha_15_2_0_pngAsset;

    public static h_std_ch_101_2_0 = h_std_ch_101_2_0_pngAsset;

    public static h_std_rs_2_2_0 = h_std_rs_2_2_0_pngAsset;

    public static h_std_hr_11_2_0 = h_std_hr_11_2_0_pngAsset;

    public static h_std_ch_10_2_0 = h_std_ch_10_2_0_pngAsset;

    public static h_std_ey_7_2_0 = h_std_ey_7_2_0_pngAsset;

    public static h_std_lg_2183_2_0 = h_std_lg_2183_2_0_pngAsset;

    public static h_std_ls_2_2_0 = h_std_ls_2_2_0_pngAsset;

    public static h_std_ea_6_2_0 = h_std_ea_6_2_0_pngAsset;

    public static h_std_fa_12_2_0 = h_std_fa_12_2_0_pngAsset;

    public static h_std_hr_33_2_0 = h_std_hr_33_2_0_pngAsset;

    public static h_std_ch_1101_2_0 = h_std_ch_1101_2_0_pngAsset;

    public static h_std_ha_3_2_0 = h_std_ha_3_2_0_pngAsset;

    public static h_std_ch_1_2_0 = h_std_ch_1_2_0_pngAsset;

    public static h_std_bd_1_2_0 = h_std_bd_1_2_0_pngAsset;

    public static h_std_hrb_1_2_0 = h_std_hrb_1_2_0_pngAsset;

    public static h_std_hr_36_2_0 = h_std_hr_36_2_0_pngAsset;

    public static h_std_hrb_36_2_0 = h_std_hrb_36_2_0_pngAsset;

    public static h_std_hr_16_2_0 = h_std_hr_16_2_0_pngAsset;

    public static h_std_hrb_16_2_0 = h_std_hrb_16_2_0_pngAsset;

    public static h_std_hr_32_2_0 = h_std_hr_32_2_0_pngAsset;

    public static h_std_hrb_32_2_0 = h_std_hrb_32_2_0_pngAsset;

    public static h_std_hr_35_2_0 = h_std_hr_35_2_0_pngAsset;

    public static h_std_hrb_35_2_0 = h_std_hrb_35_2_0_pngAsset;

    public static h_std_hr_200_2_0 = h_std_hr_200_2_0_pngAsset;

    public static h_std_hrb_200_2_0 = h_std_hrb_200_2_0_pngAsset;

    public static h_std_ey_5_2_0 = h_std_ey_5_2_0_pngAsset;

    public static h_std_ey_3_2_0 = h_std_ey_3_2_0_pngAsset;

    public static h_std_ch_5_2_0 = h_std_ch_5_2_0_pngAsset;

    public static h_std_ch_202_2_0 = h_std_ch_202_2_0_pngAsset;

    public static h_std_ch_1202_2_0 = h_std_ch_1202_2_0_pngAsset;

    public static h_std_ch_16_2_0 = h_std_ch_16_2_0_pngAsset;

    public static h_std_ch_15_2_0 = h_std_ch_15_2_0_pngAsset;

    public static h_std_ch_2_2_0 = h_std_ch_2_2_0_pngAsset;

    public static h_std_ch_201_2_0 = h_std_ch_201_2_0_pngAsset;

    public static h_std_lg_1_2_0 = h_std_lg_1_2_0_pngAsset;

    public static h_std_lg_4_2_0 = h_std_lg_4_2_0_pngAsset;

    public static h_std_lg_5_2_0 = h_std_lg_5_2_0_pngAsset;

    public static h_std_sh_3_2_0 = h_std_sh_3_2_0_pngAsset;

    public static h_std_sh_5_2_0 = h_std_sh_5_2_0_pngAsset;

    public static h_std_ls_2050_2_0 = h_std_ls_2050_2_0_pngAsset;

    public static h_std_ch_2050_2_0 = h_std_ch_2050_2_0_pngAsset;

    public static h_std_rs_2050_2_0 = h_std_rs_2050_2_0_pngAsset;

    public static h_std_ch_2165_2_0 = h_std_ch_2165_2_0_pngAsset;

    public static h_std_ls_2165_2_0 = h_std_ls_2165_2_0_pngAsset;

    public static h_std_rs_2165_2_0 = h_std_rs_2165_2_0_pngAsset;

    public static h_std_ch_2166_2_0 = h_std_ch_2166_2_0_pngAsset;

    public static h_std_ls_2166_2_0 = h_std_ls_2166_2_0_pngAsset;

    public static h_std_rs_2166_2_0 = h_std_rs_2166_2_0_pngAsset;

    public static h_std_lg_2494_2_0 = h_std_lg_2494_2_0_pngAsset;

    public static h_std_sh_2111_2_0 = h_std_sh_2111_2_0_pngAsset;

    public static h_std_sh_2112_2_0 = h_std_sh_2112_2_0_pngAsset;

    public static h_std_lg_2037_2_0 = h_std_lg_2037_2_0_pngAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboAvatarRenderLib.#staticsReady) return;
        HabboAvatarRenderLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboAvatarRenderLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [AvatarRenderManagerBootstrap, IIDAvatarRenderManager]);
    }
}
