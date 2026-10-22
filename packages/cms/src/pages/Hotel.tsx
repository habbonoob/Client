import { Navigate } from 'react-router';
import { useHotel } from '@/hotel';

/** The hotel itself: the client's frame (HotelProvider) covers the page here. With no client loaded (a reload of
 * /hotel: tickets are good once) there is nothing to show, so the way in is the player's page. */
export function Hotel() {
    return useHotel().open ? null : <Navigate to="/me" replace />;
}
