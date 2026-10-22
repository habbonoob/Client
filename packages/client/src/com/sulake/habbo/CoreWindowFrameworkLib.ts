import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Classes, WindowController } from '@/com/sulake/core/window/Classes.group';
import { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import { IGraphicContextHost } from '@/com/sulake/core/window/graphics/IGraphicContextHost';
import { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import { ISkinTemplate } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplate';
import { ISkinTemplateEntity } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplateEntity';
import { WindowModel } from '@/com/sulake/core/window/WindowModel';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

export class CoreWindowFrameworkLib extends SimpleApplication {
    static { registerClassName(this, 'CoreWindowFrameworkLib'); }

    static #staticsReady = false;

    public static get ICoreWindowFrameworkLib(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.ICoreWindowFrameworkLib;
    }
    public static set ICoreWindowFrameworkLib(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.ICoreWindowFrameworkLib = value;
    }

    public static get Classes(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.Classes;
    }
    public static set Classes(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.Classes = value;
    }

    public static get WindowModel(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.WindowModel;
    }
    public static set WindowModel(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.WindowModel = value;
    }

    public static get WindowController(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.WindowController;
    }
    public static set WindowController(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.WindowController = value;
    }

    public static get IGraphicContext(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.IGraphicContext;
    }
    public static set IGraphicContext(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.IGraphicContext = value;
    }

    public static get IGraphicContextHost(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.IGraphicContextHost;
    }
    public static set IGraphicContextHost(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.IGraphicContextHost = value;
    }

    public static get ISkinLayout(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.ISkinLayout;
    }
    public static set ISkinLayout(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.ISkinLayout = value;
    }

    public static get ISkinRenderer(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.ISkinRenderer;
    }
    public static set ISkinRenderer(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.ISkinRenderer = value;
    }

    public static get ISkinTemplate(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.ISkinTemplate;
    }
    public static set ISkinTemplate(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.ISkinTemplate = value;
    }

    public static get ISkinTemplateEntity(): any {
        CoreWindowFrameworkLib.#initStatics();
        return CoreWindowFrameworkLib.ISkinTemplateEntity;
    }
    public static set ISkinTemplateEntity(value: any) {
        CoreWindowFrameworkLib.#initStatics();
        CoreWindowFrameworkLib.ISkinTemplateEntity = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CoreWindowFrameworkLib.#staticsReady) return;
        CoreWindowFrameworkLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CoreWindowFrameworkLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("ICoreWindowFrameworkLib", null);
        set("Classes", null);
        set("WindowModel", null);
        set("WindowController", null);
        set("IGraphicContext", null);
        set("IGraphicContextHost", null);
        set("ISkinLayout", null);
        set("ISkinRenderer", null);
        set("ISkinTemplate", null);
        set("ISkinTemplateEntity", null);
        set("ICoreWindowFrameworkLib", CoreWindowFrameworkLib.ICoreWindowFrameworkLib);
        set("Classes", Classes);
        set("WindowModel", WindowModel);
        set("WindowController", WindowController);
        set("IGraphicContext", IGraphicContext);
        set("IGraphicContextHost", IGraphicContextHost);
        set("ISkinLayout", ISkinLayout);
        set("ISkinRenderer", ISkinRenderer);
        set("ISkinTemplate", ISkinTemplate);
        set("ISkinTemplateEntity", ISkinTemplateEntity);
    }
}
