import { asGuarded, asInstanceOf, isClass } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';

const splashBgClass_pngAsset = embedBitmap("splash/splashBgClass.png");
const splashTopClass_pngAsset = embedBitmap("splash/splashTopClass.png");
const splashImg1_pngAsset = embedBitmap("splash/splashImg1.png");
const splashImg2_pngAsset = embedBitmap("splash/splashImg2.png");
const splashImg3_pngAsset = embedBitmap("splash/splashImg3.png");
const splashImg4_pngAsset = embedBitmap("splash/splashImg4.png");
const splashImg5_pngAsset = embedBitmap("splash/splashImg5.png");
const splashImg6_pngAsset = embedBitmap("splash/splashImg6.png");
const splashImg7_pngAsset = embedBitmap("splash/splashImg7.png");
const splashImg8_pngAsset = embedBitmap("splash/splashImg8.png");
const splashImg9_pngAsset = embedBitmap("splash/splashImg9.png");
const splashImg10_pngAsset = embedBitmap("splash/splashImg10.png");
const splashImg11_pngAsset = embedBitmap("splash/splashImg11.png");
const splashImg12_pngAsset = embedBitmap("splash/splashImg12.png");
const splashImg13_pngAsset = embedBitmap("splash/splashImg13.png");
const splashImg14_pngAsset = embedBitmap("splash/splashImg14.png");
const splashImg15_pngAsset = embedBitmap("splash/splashImg15.png");
const splashImg16_pngAsset = embedBitmap("splash/splashImg16.png");
const splashImg17_pngAsset = embedBitmap("splash/splashImg17.png");
const splashImg18_pngAsset = embedBitmap("splash/splashImg18.png");
const splashImg19_pngAsset = embedBitmap("splash/splashImg19.png");
const splashImg20_pngAsset = embedBitmap("splash/splashImg20.png");
const splashImg21_pngAsset = embedBitmap("splash/splashImg21.png");
const splashImg22_pngAsset = embedBitmap("splash/splashImg22.png");
const splashImg23_pngAsset = embedBitmap("splash/splashImg23.png");
const splashImg24_pngAsset = embedBitmap("splash/splashImg24.png");
const splashImg25_pngAsset = embedBitmap("splash/splashImg25.png");
const splashImg26_pngAsset = embedBitmap("splash/splashImg26.png");
const splashImg27_pngAsset = embedBitmap("splash/splashImg27.png");
const splashImg28_pngAsset = embedBitmap("splash/splashImg28.png");
const splashImg29_pngAsset = embedBitmap("splash/splashImg29.png");
const splashImg30_pngAsset = embedBitmap("splash/splashImg30.png");

export class PhotoSplashScreen extends Sprite {
    static { registerClassName(this, 'splash::PhotoSplashScreen'); }

    private splashBgClass = splashBgClass_pngAsset;

    private splashTopClass = splashTopClass_pngAsset;

    private splashImg1 = splashImg1_pngAsset;

    private splashImg2 = splashImg2_pngAsset;

    private splashImg3 = splashImg3_pngAsset;

    private splashImg4 = splashImg4_pngAsset;

    private splashImg5 = splashImg5_pngAsset;

    private splashImg6 = splashImg6_pngAsset;

    private splashImg7 = splashImg7_pngAsset;

    private splashImg8 = splashImg8_pngAsset;

    private splashImg9 = splashImg9_pngAsset;

    private splashImg10 = splashImg10_pngAsset;

    private splashImg11 = splashImg11_pngAsset;

    private splashImg12 = splashImg12_pngAsset;

    private splashImg13 = splashImg13_pngAsset;

    private splashImg14 = splashImg14_pngAsset;

    private splashImg15 = splashImg15_pngAsset;

    private splashImg16 = splashImg16_pngAsset;

    private splashImg17 = splashImg17_pngAsset;

    private splashImg18 = splashImg18_pngAsset;

    private splashImg19 = splashImg19_pngAsset;

    private splashImg20 = splashImg20_pngAsset;

    private splashImg21 = splashImg21_pngAsset;

    private splashImg22 = splashImg22_pngAsset;

    private splashImg23 = splashImg23_pngAsset;

    private splashImg24 = splashImg24_pngAsset;

    private splashImg25 = splashImg25_pngAsset;

    private splashImg26 = splashImg26_pngAsset;

    private splashImg27 = splashImg27_pngAsset;

    private splashImg28 = splashImg28_pngAsset;

    private splashImg29 = splashImg29_pngAsset;

    private splashImg30 = splashImg30_pngAsset;

    constructor(param1: DisplayObjectContainer) {
        let _loc3_: Bitmap = null;
        super();
        let _loc2_: Bitmap[] = new Array<Bitmap>(0).fill(null);
        _loc3_ = asInstanceOf(new this.splashBgClass(), Bitmap);
        _loc2_.push(_loc3_);
        let _loc4_: any = asGuarded(this["splashImg" + (1 + Math.floor(Math.random() * 30) | 0)], isClass);
        if (_loc4_ != null) {
            _loc3_ = new _loc4_();
            _loc3_.x = 96;
            _loc3_.y = 51;
            _loc2_.push(_loc3_);
        }
        _loc3_ = asInstanceOf(new this.splashTopClass(), Bitmap);
        _loc2_.push(_loc3_);
        for (_loc3_ of _loc2_ ?? []) {
            this.addChild(_loc3_);
        }
    }
}
