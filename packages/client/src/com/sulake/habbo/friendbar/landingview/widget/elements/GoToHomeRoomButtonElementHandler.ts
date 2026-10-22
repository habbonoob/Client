import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class GoToHomeRoomButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::GoToHomeRoomButtonElementHandler'); }

    protected override onClick(): void {
        this.landingView.questEngine.reenableRoomCompetitionWindow();
        this.landingView.navigator.goToHomeRoom();
        this.landingView.tracking.trackGoogle("landingView", "click_gotohomeroom");
    }
}
