// The hotel view, as the client draws it when nobody is in a room: the season's sunset gradient, the farm on the
// left and the hotel tower by the water on the right. The art is Habbo's, served by our own server's asset mirror on
// this origin, at its native size: it is cropped to the frame, never scaled.

const reception = '/mirror/images.habbo.com/c_images/reception';

export function HotelScene({ height = 448, className = '' }: { height?: number; className?: string }) {
    return (
        <div aria-hidden="true" className={`relative w-full overflow-hidden ${className}`}
            style={{ height, background: `url(${reception}/background_gradient_sep26.png) center / 100% 100% no-repeat, #F7A35C` }}>
            <img className="pix absolute bottom-0 right-0 max-w-none" src={`${reception}/reception_flathotel_backdrop_right.png`} alt=""
                width={638} height={477} />
            <img className="pix absolute bottom-0 left-0 max-w-none" src={`${reception}/background_left_sep26.png`} alt=""
                width={741} height={435} />
        </div>
    );
}
