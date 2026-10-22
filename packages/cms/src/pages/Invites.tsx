import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FormEvent, useState } from 'react';
import { Navigate } from 'react-router';
import { api, type Invite } from '@/api';
import { useAccount } from '@/session';
import { Button, Notice, Pixel, Tag, useToast } from '@/ui';

const invitesKey = ['invites'] as const;

/** The link that registers with a code, so the friend needn't type it. */
const inviteLink = (code: string) => `${location.origin}/register?code=${encodeURIComponent(code)}`;

const day = (when: string) => new Date(when).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

/** Staff's invite codes: make one for someone, copy its link, withdraw it while unused. */
export function Invites() {
    const account = useAccount();
    const queries = useQueryClient();
    const toast = useToast();
    const invites = useQuery({ queryKey: invitesKey, queryFn: api.invites, enabled: !!account?.canManageInvites });
    const [note, setNote] = useState('');
    const create = useMutation({
        mutationFn: () => api.createInvite(note.trim()),
        onSuccess: invite => {
            queries.setQueryData<Invite[]>(invitesKey, list => [invite, ...(list ?? [])]);
            setNote('');
        },
    });
    const withdraw = useMutation({
        mutationFn: api.withdrawInvite,
        onSuccess: (_, code) => queries.setQueryData<Invite[]>(invitesKey, list => list?.filter(i => i.code !== code)),
    });

    if (account === undefined) return null;
    if (!account?.canManageInvites) return <Navigate to="/" replace />;

    const copy = async (code: string) => {
        await navigator.clipboard.writeText(inviteLink(code));
        toast(`Link for ${code} copied`);
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();
        create.mutate();
    };
    const list = invites.data ?? [];
    const open = list.filter(i => !i.usedBy).length;

    return (
        <main className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 pb-24 pt-10 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2.5">
                        <Pixel name="staff" size={31} />
                        <Tag tone="staff">Staff desk</Tag>
                    </span>
                    <h1 className="m-0 font-display text-[44px] leading-[48px] font-bold tracking-[-0.02em]">Invites</h1>
                    <p className="m-0 max-w-[560px] text-ink-2">Each code lets one friend register. Add a note so you remember who it's for.</p>
                </div>
                <div className="flex gap-2.5">
                    <Tag tone="warm" className="px-3 py-1.5 text-[13px]">{open} open</Tag>
                    <Tag className="px-3 py-1.5 text-[13px] text-ink-2">{list.length - open} used</Tag>
                </div>
            </div>

            <form onSubmit={submit} className="flex flex-wrap items-end gap-x-4 gap-y-3 rounded-[20px] border border-line bg-surface px-[22px] py-5">
                <Pixel name="invite" width={32} height={30} className="self-center" />
                <div className="flex flex-[1_1_320px] flex-col gap-1.5">
                    <label htmlFor="inv-note" className="text-[14px] font-bold">
                        Who is it for? <span className="font-normal text-ink-3">(optional)</span>
                    </label>
                    <input id="inv-note" className="input" type="text" maxLength={128} placeholder="e.g. Ana, from the climbing gym"
                        value={note} onChange={e => setNote(e.target.value)} />
                </div>
                <Button type="submit" busy={create.isPending} className="min-h-12">Create invite</Button>
            </form>

            {create.error && <Notice title="The invite couldn't be made.">Try again in a moment.</Notice>}
            {create.data && !create.isPending && (
                <div role="status" className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[14px] bg-ok-soft px-4 py-3.5 text-ok">
                    <span>
                        <strong>Invite created:</strong>{' '}
                        <span className="mono font-bold tracking-[.04em] text-ink">{create.data.code}</span>
                    </span>
                    <Button variant="secondary" small className="ml-auto" onClick={() => copy(create.data.code)}>Copy link</Button>
                </div>
            )}

            <div className="overflow-x-auto rounded-[20px] border border-line bg-surface">
                <div role="table" aria-label="Invite codes" className="min-w-[960px]">
                    <div role="row" className="grid min-h-11 grid-cols-[190px_minmax(0,1fr)_120px_150px_120px_190px] items-center gap-3 bg-surface-2 px-5 text-[13px] font-bold text-ink-3">
                        <span role="columnheader">Code</span>
                        <span role="columnheader">Note</span>
                        <span role="columnheader">Created</span>
                        <span role="columnheader">Used by</span>
                        <span role="columnheader">Used at</span>
                        <span role="columnheader" className="text-right">Actions</span>
                    </div>
                    {invites.data && list.length === 0 && (
                        <div role="row" className="px-5 py-8 text-center text-ink-2"><span role="cell">No codes yet. Make the first one above.</span></div>
                    )}
                    {list.map(invite => (
                        <InviteRow key={invite.code} invite={invite} onCopy={() => copy(invite.code)}
                            onWithdraw={() => withdraw.mutate(invite.code)} />
                    ))}
                </div>
            </div>
        </main>
    );
}

function InviteRow({ invite, onCopy, onWithdraw }: { invite: Invite; onCopy: () => void; onWithdraw: () => void }) {
    const [confirming, setConfirming] = useState(false);

    if (confirming) {
        return (
            <div role="row" className="flex min-h-[60px] flex-wrap items-center gap-x-4 gap-y-3 border-b border-line bg-err-soft px-5 py-3 last:border-b-0">
                <span role="cell" className="flex-[1_1_420px] text-ink">
                    <strong className="text-err">Withdraw <span className="mono">{invite.code}</span>?</strong>{' '}
                    It stops working right away, and whoever has it won't be able to register.
                </span>
                <span role="cell" className="flex gap-2">
                    <Button variant="secondary" small onClick={() => setConfirming(false)}>Keep it</Button>
                    <Button variant="danger" small onClick={onWithdraw}>Withdraw code</Button>
                </span>
            </div>
        );
    }
    return (
        <div role="row" className="grid min-h-[60px] grid-cols-[190px_minmax(0,1fr)_120px_150px_120px_190px] items-center gap-3 border-b border-line px-5 last:border-b-0">
            <span role="cell" className={`mono font-bold tracking-[.04em] ${invite.usedBy ? 'text-ink-3' : 'text-ink'}`}>{invite.code}</span>
            <span role="cell" className={`truncate ${invite.note ? '' : 'text-ink-3'}`}>{invite.note || 'No note'}</span>
            <span role="cell" className="text-[15px] text-ink-2">{day(invite.createdAt)}</span>
            <span role="cell">
                {invite.usedBy ? <span className="font-semibold">{invite.usedBy}</span> : <Tag tone="staff">Open</Tag>}
            </span>
            <span role="cell" className="text-[15px] text-ink-2">{invite.usedAt ? day(invite.usedAt) : '—'}</span>
            <span role="cell" className="flex justify-end gap-1">
                {!invite.usedBy && (
                    <>
                        <Button variant="ghost" small onClick={onCopy} aria-label={`Copy the link for ${invite.code}`}>Copy</Button>
                        <Button variant="quiet-danger" small onClick={() => setConfirming(true)} aria-label={`Withdraw ${invite.code}`}>Withdraw</Button>
                    </>
                )}
            </span>
        </div>
    );
}
