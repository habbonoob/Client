import { Event } from './Event';

/** Navigation in a StageWebView. */
export class LocationChangeEvent extends Event {
    static readonly LOCATION_CHANGE: string = 'locationChange';
    static readonly LOCATION_CHANGING: string = 'locationChanging';

    location: string;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, location: string = null) {
        super(type, bubbles, cancelable);
        this.location = location;
    }

    override clone(): Event {
        return new LocationChangeEvent(this.type, this.bubbles, this.cancelable, this.location);
    }
}
