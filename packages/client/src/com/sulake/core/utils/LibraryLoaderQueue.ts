import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import { EventDispatcherWrapper, LibraryLoader } from '@/com/sulake/core/runtime/Component.group';

export class LibraryLoaderQueue extends EventDispatcherWrapper implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils::LibraryLoaderQueue'); }

    protected static readonly MAX_SIMULTANEOUS_DOWNLOADS: number = 4;

    constructor(param1: boolean = false) {
        super();
        this._debug = param1;
    }

    private _debug: boolean = false;
    private _SafeStr_2906: any[] = [];
    private _loaders: any[] = [];

    public get length(): number {
        return this._SafeStr_2906.length + this._loaders.length;
    }

    public override dispose(): void {
        let _loc1_: any = null;
        if (!this.disposed) {
            for (_loc1_ of this._loaders ?? []) {
                _loc1_.dispose();
            }
            for (_loc1_ of this._SafeStr_2906 ?? []) {
                _loc1_.dispose();
            }
            this._loaders = null;
            this._SafeStr_2906 = null;
            super.dispose();
        }
    }

    public push(param1: LibraryLoader): void {
        if (!this.disposed && !this.isUrlInQueue(param1.url) && !this.findLibraryLoaderByURL(param1.url)) {
            if (param1.paused) {
                this._SafeStr_2906.push(param1);
            } else {
                this._loaders.push(param1);
            }
            param1.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.libraryLoadedHandler);
            param1.addEventListener("LIBRARY_LOADER_EVENT_PROGRESS", this.loadProgressHandler);
            param1.addEventListener("LIBRARY_LOADER_EVENT_DISPOSE", this.loaderDisposeHandler);
            param1.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadErrorHandler);
            this.next();
        }
    }

    public findLibraryLoaderByURL(param1: string, param2: boolean = true): LibraryLoader {
        if (!this.disposed) {
            if (param2 && param1.indexOf("?") > -1) {
                param1 = param1.slice(0, param1.indexOf("?"));
            }
            for (const _loc3_ of this._loaders ?? []) {
                if (param2) {
                    if (_loc3_.url.indexOf(param1) == 0) {
                        return _loc3_;
                    }
                } else if (_loc3_.url == param1) {
                    return _loc3_;
                }
            }
        }
        return null;
    }

    private next(): void {
        let _loc1_: LibraryLoader = null;
        if (!this.disposed) {
            while (this._loaders.length < 4 && this._SafeStr_2906.length > 0) {
                _loc1_ = this._SafeStr_2906.shift();
                this._loaders.push(_loc1_);
                _loc1_.resume();
            }
        }
    }

    private removeLoader(param1: LibraryLoader): void {
        let _loc2_: number = 0;
        param1.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.libraryLoadedHandler);
        param1.removeEventListener("LIBRARY_LOADER_EVENT_PROGRESS", this.loadProgressHandler);
        param1.removeEventListener("LIBRARY_LOADER_EVENT_DISPOSE", this.loaderDisposeHandler);
        param1.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadErrorHandler);
        try {
            _loc2_ = this._SafeStr_2906.indexOf(param1);
            if (_loc2_ > -1) {
                this._SafeStr_2906.splice(_loc2_, 1);
            }
            _loc2_ = this._loaders.indexOf(param1);
            if (_loc2_ > -1) {
                this._loaders.splice(_loc2_, 1);
            }
        } catch (e) {
        }
    }

    private isUrlInQueue(param1: string, param2: boolean = true): boolean {
        if (!this.disposed) {
            if (param2 && param1.indexOf("?") > -1) {
                param1 = param1.slice(0, param1.indexOf("?"));
            }
            for (const _loc3_ of this._SafeStr_2906 ?? []) {
                if (param2) {
                    if (_loc3_.url.indexOf(param1) == 0) {
                        return true;
                    }
                } else if (_loc3_.url == param1) {
                    return true;
                }
            }
        }
        return false;
    }

    private libraryLoadedHandler = (param1: LibraryLoaderEvent): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        if (_loc2_) {
            this.removeLoader(_loc2_);
        }
        this.next();
    };

    private loadProgressHandler = (param1: LibraryLoaderEvent): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
    };

    private loaderDisposeHandler = (param1: LibraryLoaderEvent): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        this.removeLoader(_loc2_);
        this.next();
    };

    private loadErrorHandler = (param1: LibraryLoaderEvent): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        if (_loc2_) {
            this.removeLoader(_loc2_);
        }
        this.next();
    };
}
