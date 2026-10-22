import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import type { WiredTransactionSuccessContents } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessContents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { NodeOverviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/NodeOverviewPreset';
import type { HtmlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/HtmlPreset';
import type { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { RewardNotificationController } from '@/com/sulake/habbo/roomevents/wired_trading/reward_notification/RewardNotificationController';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import { HtmlTextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/HtmlTextParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { AbstractUbuntuWiredUI } from '@/com/sulake/habbo/roomevents/wired_trading/AbstractUbuntuWiredUI';

export class RewardNotificationView extends AbstractUbuntuWiredUI {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.reward_notification::RewardNotificationView'); }

    declare private _parentController: RewardNotificationController;

    declare private _contents: WiredTransactionSuccessContents;

    declare private _textPreset: TextPreset;

    declare private _SafeStr_4689: NodeOverviewPreset;

    declare private _htmlPreset: HtmlPreset;

    declare private _buttonPreset: ButtonPreset;

    declare private _viewIndex: number;

    constructor(param1: RewardNotificationController, param2: PresetManager) {
        super(param1.roomEvents, param2);
        this._parentController = param1;
        this._textPreset = param2.createText("", TextParam.DEFAULT);
        this._SafeStr_4689 = param2.createNodeOverviewPreset("${wiredrewards.title}", this.onClickNode);
        this._htmlPreset = param2.createHtml(this.localization.getLocalization("wiredrewards.earnings"), HtmlTextParam.DEFAULT_HtmlTextParam);
        castGuarded(this._htmlPreset.window, isIHTMLTextWindow, "com.sulake.core.window.components.IHTMLTextWindow").initializeLinkStyle();
        this._buttonPreset = param2.createButton("${wiredrewards.ok}", this.onClickButton);
        let _loc4_: SimpleListViewPreset = param2.createSimpleListView(true, [this._textPreset, this._SafeStr_4689, this._htmlPreset, this._buttonPreset]);
        let _loc3_: PaddedContainerPreset = param2.createPaddedContainerPreset(_loc4_, 7, 7, 7, 7);
        this.framePreset = param2.createFramePreset([_loc3_], this.onCloseClicked);
        this.framePreset.resizeToWidth(276);
        this.framePreset.title = "${wiredrewards.title}";
    }

    private static hasCreditNode(param1: TradeRequirementRule): boolean {
        for (const _loc2_ of param1.nodes ?? []) {
            if (_loc2_.type == TradeRequirementNode.TYPE_COIN) {
                return true;
            }
        }
        return false;
    }

    private onClickNode(param1: TradeRequirementNode): void {
        this._parentController.context.createLinkEvent(param1.type == TradeRequirementNode.TYPE_COIN ? "habboUI/open/vault" : "inventory/open");
    }

    private onClickButton(): void {
        this.onCloseClicked();
    }

    protected override hideFrame(): void {
        super.hideFrame();
        this._parentController.closeRewardView(this);
    }

    protected override get isBoundToParentRect(): boolean {
        return true;
    }

    public show(param1: WiredTransactionSuccessContents, param2: number, param3: number, param4: number): void {
        this._contents = param1;
        this._textPreset.text = param1.rewardText.length == 0 ? "${wiredrewards.desc_default}" : param1.rewardText;
        this._SafeStr_4689.rule = param1.rewardContents;
        let _loc5_: boolean = RewardNotificationView.hasCreditNode(param1.rewardContents);
        this._htmlPreset.visible = _loc5_;
        this.showFrame();
        this.window.x += param2;
        this.window.y += param3;
        this._viewIndex = param4;
    }

    public get viewIndex(): number {
        return this._viewIndex;
    }

    public get contents(): WiredTransactionSuccessContents {
        return this._contents;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this.isShowing()) {
            this.hide();
        }
        this._buttonPreset = null;
        this._SafeStr_4689 = null;
        this._textPreset = null;
        this._htmlPreset = null;
        this._parentController = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onClickNode = this.onClickNode.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        this._viewIndex = 0;
        super.initInstanceFields();
    }
}
