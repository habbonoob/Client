import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { InteractiveObject } from '@habbo-pixi/runtime/display/InteractiveObject';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BrowserInfo } from '@/com/sulake/core/utils/BrowserInfo';

export class MouseWheelEnabler {
    static { registerClassName(this, 'com.sulake.core.utils::MouseWheelEnabler'); }

    public static useRawValues: boolean = false;
    public static eventTimeout: number = 50;
    private static initialised: boolean = false;
    private static currentItem: InteractiveObject;
    private static browserMouseEvent: MouseEvent;
    private static lastEventTime: number = 0;

    public static init(param1: Stage, param2: boolean = false): void {
        if (!MouseWheelEnabler.initialised) {
            MouseWheelEnabler.initialised = true;
            MouseWheelEnabler.registerListenerForMouseMove(param1);
            MouseWheelEnabler.registerJS();
        }
        MouseWheelEnabler.useRawValues = param2;
    }

    public static handleExternalMouseEvent(param1: number, param2: number): void {
        let _loc4_: any = NaN;
        let _loc3_: number = getTimer() >>> 0;
        if (_loc3_ >= MouseWheelEnabler.eventTimeout + MouseWheelEnabler.lastEventTime) {
            if (MouseWheelEnabler.useRawValues) {
                _loc4_ = param1;
            } else {
                _loc4_ = param2;
            }
            if (MouseWheelEnabler.currentItem && MouseWheelEnabler.browserMouseEvent) {
                MouseWheelEnabler.currentItem.dispatchEvent(new MouseEvent("mouseWheel", true, false, MouseWheelEnabler.browserMouseEvent.localX, MouseWheelEnabler.browserMouseEvent.localY, MouseWheelEnabler.browserMouseEvent.relatedObject, MouseWheelEnabler.browserMouseEvent.ctrlKey, MouseWheelEnabler.browserMouseEvent.altKey, MouseWheelEnabler.browserMouseEvent.shiftKey, MouseWheelEnabler.browserMouseEvent.buttonDown, _loc4_ | 0));
            }
            MouseWheelEnabler.lastEventTime = _loc3_;
        }
    }

    public static getBrowserInfo(): BrowserInfo {
        let _loc3_: any = null;
        let _loc2_: any = null;
        let _loc1_: string = null;
        if (ExternalInterface.available) {
            _loc3_ = ExternalInterface.call("mws.getBrowserInfo");
            _loc2_ = ExternalInterface.call("mws.getPlatformInfo");
            _loc1_ = stringOrNull(ExternalInterface.call("mws.getAgentInfo"));
            return new BrowserInfo(_loc3_, _loc2_, _loc1_);
        }
        return null;
    }

    private static registerListenerForMouseMove(param1: Stage): void {
        let stage: Stage = param1;
        stage.addEventListener("mouseMove", (param1: MouseEvent): void => {
                MouseWheelEnabler.currentItem = castTo(param1.target, InteractiveObject);
                MouseWheelEnabler.browserMouseEvent = param1;
            });
    }

    private static registerJS(): void {
        let id: string;
        if (ExternalInterface.available) {
            id = "mws_" + Math.floor(Math.random() * 1000000);
            ExternalInterface.addCallback(id, (): void => {
                });
            ExternalInterface.call(MouseWheelEnabler_JavaScript.CODE?.toString() ?? null);
            ExternalInterface.call("mws.InitMouseWheelSupport", id);
            ExternalInterface.addCallback("externalMouseEvent", MouseWheelEnabler.handleExternalMouseEvent);
        }
    }

    constructor() {
    }
}

class MouseWheelEnabler_JavaScript {
    static #staticsReady = false;

    public static get CODE(): XML {
        MouseWheelEnabler_JavaScript.#initStatics();
        return MouseWheelEnabler_JavaScript.CODE;
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MouseWheelEnabler_JavaScript.#staticsReady) return;
        MouseWheelEnabler_JavaScript.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MouseWheelEnabler_JavaScript, name, { value, writable: true, configurable: true, enumerable: true });
        set("CODE", null);
        set("CODE", new XML(`<script><![CDATA[
		function()
        {
            // create unique namespace
            if(typeof mws == "undefined" || !mws)
            {
                mws = {};
            }

            var userAgent = navigator.userAgent.toLowerCase();
            mws.agent = userAgent;
            mws.platform =
            {
                win:/win/.test(userAgent),
                mac:/mac/.test(userAgent),
                other:!/win/.test(userAgent) && !/mac/.test(userAgent)
            };

            mws.vars = {};

            mws.browser =
            {
                version: (userAgent.match(/.+(?:rv|it|ra|ie)[\\/: ]([\\d.]+)/) || [])[1],
                safari: /webkit/.test(userAgent) && !/chrome/.test(userAgent),
                opera: /opera/.test(userAgent),
                msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
                mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
                chrome: /chrome/.test(userAgent)
            };

            // find the function we added
            mws.findSwf = function(id)
            {
                var objects = document.getElementsByTagName("object");
                for(var i = 0; i < objects.length; i++)
                {
                    if(typeof objects[i][id] != "undefined")
                    {
                        return objects[i];
                    }
                }

                var embeds = document.getElementsByTagName("embed");

                for(var j = 0; j < embeds.length; j++)
                {
                    if(typeof embeds[j][id] != "undefined")
                    {
                        return embeds[j];
                    }
                }

                return null;
            }

            mws.usingWmode = function( swf )
            {
                if( typeof swf.getAttribute == "undefined" )
                {
                    return false;
                }

                var wmode = swf.getAttribute( "wmode" );
                if( typeof wmode == "undefined" )
                {
                    return false;
                }

                return true;
            }

            //Debug logging
            mws.log = function( message )
            {
                if( typeof console != "undefined" )
                {
                    console.log( message );
                }
                else
                {
                    //alert( message );
                }
            }

            mws.shouldAddHandler = function( swf )
            {
                if( !swf )
                {
                    return false;
                }

                return true;
            }

            mws.getBrowserInfo = function()
            {//getBrowserObj
                return mws.browser;
            }//getBrowserObj

            mws.getAgentInfo = function()
            {//getAgentInfo
                return mws.agent;
            }//getAgentInfo

            mws.getPlatformInfo = function()
            {//getPlatformInfo
                return mws.platform;
            }//getPlatformInfo

            mws.addScrollListeners = function()
            {//addScrollListeners

                // install mouse listeners
                if(typeof window.addEventListener != 'undefined')
                {
                    window.addEventListener('DOMMouseScroll', _mousewheel, false);
                }

                window.onmousewheel = document.onmousewheel = _mousewheel;

            }//addScrollListeners

            mws.removeScrollListeners = function()
            {//removeScrollListeners
                // install mouse listeners
                if(typeof window.removeEventListener != 'undefined')
                {
                    window.removeEventListener('DOMMouseScroll', _mousewheel, false);
                }

                window.onmousewheel = document.onmousewheel = null;
            }//removeScrollListeners

            mws.InitMouseWheelSupport = function(id)
            {//InitMouseWheelSupport
                //grab reference to the swf
                var swf = mws.findSwf(id);

                //see if we can add the mouse listeners
                var shouldAdd = mws.shouldAddHandler( swf );

                if( shouldAdd )
                {
                    /// Mousewheel support
                    _mousewheel = function(event)
                    {//Mouse Wheel

                        //Cover for IE
                        if (!event) event = window.event;

                        var rawDelta = 0;
                        var divisor = 1;
                        var scaledDelta = 0;

                        //Handle scaling the delta.
                        //This is becoming less and less useful as more browser/hardware combos emerge.
                        if(event.wheelDelta)
                        {//normal event
                            rawDelta = event.wheelDelta;

                            if(mws.browser.opera)
                            {
                                divisor = 12;
                            }
                            else if(mws.browser.safari && mws.browser.version.split(".")[0] >= 528)
                            {
                                divisor = 12;
                            }
                            else
                            {
                                divisor = 120;
                            }
                        }//normal event
                        else if(event.detail)
                        {//special event
                            rawDelta = -event.detail;
                        }//special event
                        else
                        {//odd event
                            //Unhandled event type (future browser graceful fail)
                            rawDelta = 0;
                            scaledDelta = 0;

                            //alert('Odd Event');
                        }//odd event

                        if(Math.abs(rawDelta) >= divisor)
                        {//divide
                            scaledDelta = rawDelta/divisor;
                        }//divide
                        else
                        {//don't scale
                            scaledDelta = rawDelta;
                        }//don't scale

                        //Call into the swf to fire a mouse event
                        swf.externalMouseEvent(rawDelta, scaledDelta);

                        if(event.preventDefault)
                        {//Stop default action
                            event.preventDefault();
                        }//Stop default action
                        else
                        {//stop default action (IE)
                            return false;
                        }//stop default action (IE)

                        return true;
                    }//MouseWheel

                    //set up listeners
                    swf.onmouseover = mws.addScrollListeners;
                    swf.onmouseout = mws.removeScrollListeners;
                }//Should Add

            }//InitMouseWheelSupport

        }
	]]></script>`));
    }
}
