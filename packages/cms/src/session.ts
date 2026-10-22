import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type Account } from '@/api';

const meKey = ['me'] as const;

/** Asking the server who is logged in. It fails only when the server can't be reached or answers with an error: the
 * hotel is down. */
export function useAccountQuery() {
    return useQuery({ queryKey: meKey, queryFn: api.me });
}

/** The logged-in account: undefined while asking, null for nobody. */
export function useAccount(): Account | null | undefined {
    return useAccountQuery().data;
}

/** Remembers who logged in (or out) without asking the server again. */
export function useSetAccount(): (account: Account | null) => void {
    const queries = useQueryClient();
    return account => queries.setQueryData(meKey, account);
}

export function useLogout() {
    const setAccount = useSetAccount();
    return useMutation({ mutationFn: api.logout, onSuccess: () => setAccount(null) });
}

export const hotelName: string = import.meta.env.VITE_HOTEL_NAME ?? 'Hotel';
