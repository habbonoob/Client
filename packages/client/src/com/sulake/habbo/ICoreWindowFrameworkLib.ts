import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { ICaptionWindow } from '@/com/sulake/core/window/components/ICaptionWindow';
import { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { IDragBarWindow } from '@/com/sulake/core/window/components/IDragBarWindow';
import { IDropListItemWindow } from '@/com/sulake/core/window/components/IDropListItemWindow';
import { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { IHeaderWindow } from '@/com/sulake/core/window/components/IHeaderWindow';
import { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { INotifyWindow } from '@/com/sulake/core/window/components/INotifyWindow';
import { IPasswordFieldWindow } from '@/com/sulake/core/window/components/IPasswordFieldWindow';
import { IRadioButtonSelectionWindow } from '@/com/sulake/core/window/components/IRadioButtonSelectionWindow';
import { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { IScalerWindow } from '@/com/sulake/core/window/components/IScalerWindow';
import { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { ISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import { ITabContentWindow } from '@/com/sulake/core/window/components/ITabContentWindow';
import { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { IToolBarWindow } from '@/com/sulake/core/window/components/IToolBarWindow';
import { _SafeCls_1826 } from '@/com/sulake/core/window/enum/_SafeCls_1826';
import { WindowParam } from '@/com/sulake/core/window/enum/WindowParam';
import { WindowState } from '@/com/sulake/core/window/enum/WindowState';
import { WindowStyle } from '@/com/sulake/core/window/enum/WindowStyle';
import { WindowType } from '@/com/sulake/core/window/enum/WindowType';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { WindowMessage } from '@/com/sulake/core/window/events/WindowMessage';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { ICoreWindowManager } from '@/com/sulake/core/window/ICoreWindowManager';
import { IWindow } from '@/com/sulake/core/window/IWindow';
import { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import { IMargins } from '@/com/sulake/core/window/utils/IMargins';
import { IIDCoreWindowManager } from '@/com/sulake/iid/IIDCoreWindowManager';

export class ICoreWindowFrameworkLib {
    static { registerClassName(this, 'ICoreWindowFrameworkLib'); }

    static #staticsReady = false;

    public static get IIDCoreWindowManager(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IIDCoreWindowManager;
    }
    public static set IIDCoreWindowManager(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IIDCoreWindowManager = value;
    }

    public static get ICoreWindowManager(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ICoreWindowManager;
    }
    public static set ICoreWindowManager(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ICoreWindowManager = value;
    }

    public static get IWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IWindow;
    }
    public static set IWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IWindow = value;
    }

    public static get IWindowContainer(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IWindowContainer;
    }
    public static set IWindowContainer(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IWindowContainer = value;
    }

    public static get IWindowContext(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IWindowContext;
    }
    public static set IWindowContext(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IWindowContext = value;
    }

    public static get IBackgroundWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IBackgroundWindow;
    }
    public static set IBackgroundWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IBackgroundWindow = value;
    }

    public static get IBitmapWrapperWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IBitmapWrapperWindow;
    }
    public static set IBitmapWrapperWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IBitmapWrapperWindow = value;
    }

    public static get IBorderWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IBorderWindow;
    }
    public static set IBorderWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IBorderWindow = value;
    }

    public static get IButtonWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IButtonWindow;
    }
    public static set IButtonWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IButtonWindow = value;
    }

    public static get ICaptionWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ICaptionWindow;
    }
    public static set ICaptionWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ICaptionWindow = value;
    }

    public static get ICheckBoxWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ICheckBoxWindow;
    }
    public static set ICheckBoxWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ICheckBoxWindow = value;
    }

    public static get IContainerButtonWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IContainerButtonWindow;
    }
    public static set IContainerButtonWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IContainerButtonWindow = value;
    }

    public static get IDesktopWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IDesktopWindow;
    }
    public static set IDesktopWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IDesktopWindow = value;
    }

    public static get IDisplayObjectWrapper(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IDisplayObjectWrapper;
    }
    public static set IDisplayObjectWrapper(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IDisplayObjectWrapper = value;
    }

    public static get IDragBarWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IDragBarWindow;
    }
    public static set IDragBarWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IDragBarWindow = value;
    }

    public static get _SafeStr_7409(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib._SafeStr_7409;
    }
    public static set _SafeStr_7409(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib._SafeStr_7409 = value;
    }

    public static get IDropMenuWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IDropMenuWindow;
    }
    public static set IDropMenuWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IDropMenuWindow = value;
    }

    public static get IFrameWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IFrameWindow;
    }
    public static set IFrameWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IFrameWindow = value;
    }

    public static get IHeaderWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IHeaderWindow;
    }
    public static set IHeaderWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IHeaderWindow = value;
    }

    public static get IIconWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IIconWindow;
    }
    public static set IIconWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IIconWindow = value;
    }

    public static get IInteractiveWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IInteractiveWindow;
    }
    public static set IInteractiveWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IInteractiveWindow = value;
    }

    public static get IItemGridWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IItemGridWindow;
    }
    public static set IItemGridWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IItemGridWindow = value;
    }

    public static get IItemListWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IItemListWindow;
    }
    public static set IItemListWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IItemListWindow = value;
    }

    public static get INotifyWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.INotifyWindow;
    }
    public static set INotifyWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.INotifyWindow = value;
    }

    public static get IPasswordFieldWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IPasswordFieldWindow;
    }
    public static set IPasswordFieldWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IPasswordFieldWindow = value;
    }

    public static get IRadioButtonSelectionWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IRadioButtonSelectionWindow;
    }
    public static set IRadioButtonSelectionWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IRadioButtonSelectionWindow = value;
    }

    public static get IRadioButtonWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IRadioButtonWindow;
    }
    public static set IRadioButtonWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IRadioButtonWindow = value;
    }

    public static get IRegionWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IRegionWindow;
    }
    public static set IRegionWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IRegionWindow = value;
    }

    public static get IScalerWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IScalerWindow;
    }
    public static set IScalerWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IScalerWindow = value;
    }

    public static get IScrollableWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IScrollableWindow;
    }
    public static set IScrollableWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IScrollableWindow = value;
    }

    public static get IScrollbarWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IScrollbarWindow;
    }
    public static set IScrollbarWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IScrollbarWindow = value;
    }

    public static get ISelectableWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ISelectableWindow;
    }
    public static set ISelectableWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ISelectableWindow = value;
    }

    public static get ISelectorWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ISelectorWindow;
    }
    public static set ISelectorWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ISelectorWindow = value;
    }

    public static get ITabButtonWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ITabButtonWindow;
    }
    public static set ITabButtonWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ITabButtonWindow = value;
    }

    public static get ITabContentWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ITabContentWindow;
    }
    public static set ITabContentWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ITabContentWindow = value;
    }

    public static get ITabContextWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ITabContextWindow;
    }
    public static set ITabContextWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ITabContextWindow = value;
    }

    public static get ISelectorListWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ISelectorListWindow;
    }
    public static set ISelectorListWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ISelectorListWindow = value;
    }

    public static get ITextFieldWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ITextFieldWindow;
    }
    public static set ITextFieldWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ITextFieldWindow = value;
    }

    public static get ITextWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.ITextWindow;
    }
    public static set ITextWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.ITextWindow = value;
    }

    public static get IToolBarWindow(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IToolBarWindow;
    }
    public static set IToolBarWindow(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IToolBarWindow = value;
    }

    public static get _SafeCls_1826(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib._SafeCls_1826;
    }
    public static set _SafeCls_1826(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib._SafeCls_1826 = value;
    }

    public static get WindowParam(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowParam;
    }
    public static set WindowParam(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowParam = value;
    }

    public static get WindowState(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowState;
    }
    public static set WindowState(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowState = value;
    }

    public static get WindowStyle(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowStyle;
    }
    public static set WindowStyle(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowStyle = value;
    }

    public static get WindowType(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowType;
    }
    public static set WindowType(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowType = value;
    }

    public static get WindowEvent(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowEvent;
    }
    public static set WindowEvent(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowEvent = value;
    }

    public static get WindowKeyboardEvent(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowKeyboardEvent;
    }
    public static set WindowKeyboardEvent(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowKeyboardEvent = value;
    }

    public static get WindowMessage(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowMessage;
    }
    public static set WindowMessage(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowMessage = value;
    }

    public static get WindowMouseEvent(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.WindowMouseEvent;
    }
    public static set WindowMouseEvent(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.WindowMouseEvent = value;
    }

    public static get IMargins(): any {
        ICoreWindowFrameworkLib.#initStatics();
        return ICoreWindowFrameworkLib.IMargins;
    }
    public static set IMargins(value: any) {
        ICoreWindowFrameworkLib.#initStatics();
        ICoreWindowFrameworkLib.IMargins = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ICoreWindowFrameworkLib.#staticsReady) return;
        ICoreWindowFrameworkLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ICoreWindowFrameworkLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("IIDCoreWindowManager", null);
        set("ICoreWindowManager", null);
        set("IWindow", null);
        set("IWindowContainer", null);
        set("IWindowContext", null);
        set("IBackgroundWindow", null);
        set("IBitmapWrapperWindow", null);
        set("IBorderWindow", null);
        set("IButtonWindow", null);
        set("ICaptionWindow", null);
        set("ICheckBoxWindow", null);
        set("IContainerButtonWindow", null);
        set("IDesktopWindow", null);
        set("IDisplayObjectWrapper", null);
        set("IDragBarWindow", null);
        set("_SafeStr_7409", null);
        set("IDropMenuWindow", null);
        set("IFrameWindow", null);
        set("IHeaderWindow", null);
        set("IIconWindow", null);
        set("IInteractiveWindow", null);
        set("IItemGridWindow", null);
        set("IItemListWindow", null);
        set("INotifyWindow", null);
        set("IPasswordFieldWindow", null);
        set("IRadioButtonSelectionWindow", null);
        set("IRadioButtonWindow", null);
        set("IRegionWindow", null);
        set("IScalerWindow", null);
        set("IScrollableWindow", null);
        set("IScrollbarWindow", null);
        set("ISelectableWindow", null);
        set("ISelectorWindow", null);
        set("ITabButtonWindow", null);
        set("ITabContentWindow", null);
        set("ITabContextWindow", null);
        set("ISelectorListWindow", null);
        set("ITextFieldWindow", null);
        set("ITextWindow", null);
        set("IToolBarWindow", null);
        set("_SafeCls_1826", null);
        set("WindowParam", null);
        set("WindowState", null);
        set("WindowStyle", null);
        set("WindowType", null);
        set("WindowEvent", null);
        set("WindowKeyboardEvent", null);
        set("WindowMessage", null);
        set("WindowMouseEvent", null);
        set("IMargins", null);
        set("IIDCoreWindowManager", IIDCoreWindowManager);
        set("ICoreWindowManager", ICoreWindowManager);
        set("IWindow", IWindow);
        set("IWindowContainer", IWindowContainer);
        set("IWindowContext", IWindowContext);
        set("IBackgroundWindow", IBackgroundWindow);
        set("IBitmapWrapperWindow", IBitmapWrapperWindow);
        set("IBorderWindow", IBorderWindow);
        set("IButtonWindow", IButtonWindow);
        set("ICaptionWindow", ICaptionWindow);
        set("ICheckBoxWindow", ICheckBoxWindow);
        set("IContainerButtonWindow", IContainerButtonWindow);
        set("IDesktopWindow", IDesktopWindow);
        set("IDisplayObjectWrapper", IDisplayObjectWrapper);
        set("IDragBarWindow", IDragBarWindow);
        set("_SafeStr_7409", IDropListItemWindow);
        set("IDropMenuWindow", IDropMenuWindow);
        set("IFrameWindow", IFrameWindow);
        set("IHeaderWindow", IHeaderWindow);
        set("IIconWindow", IIconWindow);
        set("IInteractiveWindow", IInteractiveWindow);
        set("IItemGridWindow", IItemGridWindow);
        set("IItemListWindow", IItemListWindow);
        set("INotifyWindow", INotifyWindow);
        set("IPasswordFieldWindow", IPasswordFieldWindow);
        set("IRadioButtonSelectionWindow", IRadioButtonSelectionWindow);
        set("IRadioButtonWindow", IRadioButtonWindow);
        set("IRegionWindow", IRegionWindow);
        set("IScalerWindow", IScalerWindow);
        set("IScrollableWindow", IScrollableWindow);
        set("IScrollbarWindow", IScrollbarWindow);
        set("ISelectableWindow", ISelectableWindow);
        set("ISelectorWindow", ISelectorWindow);
        set("ITabButtonWindow", ITabButtonWindow);
        set("ITabContentWindow", ITabContentWindow);
        set("ITabContextWindow", ITabContextWindow);
        set("ISelectorListWindow", ISelectorListWindow);
        set("ITextFieldWindow", ITextFieldWindow);
        set("ITextWindow", ITextWindow);
        set("IToolBarWindow", IToolBarWindow);
        set("_SafeCls_1826", _SafeCls_1826);
        set("WindowParam", WindowParam);
        set("WindowState", WindowState);
        set("WindowStyle", WindowStyle);
        set("WindowType", WindowType);
        set("WindowEvent", WindowEvent);
        set("WindowKeyboardEvent", WindowKeyboardEvent);
        set("WindowMessage", WindowMessage);
        set("WindowMouseEvent", WindowMouseEvent);
        set("IMargins", IMargins);
    }
}
