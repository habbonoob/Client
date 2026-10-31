import { useMutation } from '@tanstack/react-query';
import { type ChangeEvent, useState } from 'react';
import { Navigate } from 'react-router';
import { api, type RoomCopy, type RoomImportResult } from '@/api';
import { useAccount } from '@/session';
import { Button, Notice, Pixel, Tag } from '@/ui';

/** The floor plan editor's failures (the server answers with their keys), as the editor words them. */
const planErrors: Record<string, string> = {
    too_large_width: 'The floor plan is wider than the hotel allows.',
    too_large_height: 'The floor plan is longer than the hotel allows.',
    too_large_area: 'The floor plan has more tiles than the hotel allows.',
    effective_width_is_0: 'The floor plan has no tiles.',
    effective_height_is_0: 'The floor plan has no tiles.',
    entry_tile_outside_map: 'The door is outside the floor plan.',
    entry_not_on_tile: 'The door isn\'t on a tile.',
    invalid_entry_tile_direction: 'The door faces a way it can\'t.',
    invalid_door_setup: 'The door can\'t be reached.',
    invalid_wall_thickness: 'The wall thickness isn\'t one the hotel knows.',
    invalid_floor_thickness: 'The floor thickness isn\'t one the hotel knows.',
    invalid_walls_fixed_height: 'The wall height isn\'t one the hotel allows.',
    general: 'The floor plan has tiles the hotel can\'t read.',
};

/** What the server calls the furni that stood outside the floor plan. */
const offThePlan = '(off the floor plan)';

/** Staff's room import: a room copied on another hotel with the room copier (a G-Earth extension) built here as a
 * room of their own, with its floor plan, walls and furni. */
export function ImportRoom() {
    const account = useAccount();
    const [copy, setCopy] = useState<RoomCopy | null>(null);
    const [unreadable, setUnreadable] = useState<string | null>(null);
    const importRoom = useMutation({ mutationFn: api.importRoom });

    if (account === undefined) return null;
    if (!account?.canImportRooms) return <Navigate to="/" replace />;

    const choose = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        importRoom.reset();
        setCopy(null);
        setUnreadable(null);
        if (!file) return;
        try {
            const read = JSON.parse(await file.text()) as RoomCopy;
            if (typeof read.Format !== 'number' || !Array.isArray(read.FloorItems) || !Array.isArray(read.WallItems))
                throw new Error('not a room copy');
            setCopy(read);
        } catch {
            setUnreadable(file.name);
        }
    };

    return (
        <main className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 pb-24 pt-10 sm:px-6">
            <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2.5">
                    <Pixel name="staff" size={31} />
                    <Tag tone="staff">Staff desk</Tag>
                </span>
                <h1 className="m-0 font-display text-[44px] leading-[48px] font-bold tracking-[-0.02em]">Import a room</h1>
                <p className="m-0 max-w-[640px] text-ink-2">
                    Copy a room on another hotel with the room copier in G-Earth (say <span className="mono">:copy</span> in
                    the room, or <span className="mono">:copy wired</span> for its wired settings too), then bring the file
                    here. It becomes a room of yours, with its floor plan, walls, furni and wired.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[20px] border border-line bg-surface px-[22px] py-5">
                <Pixel name="rooms" size={32} className="self-center" />
                <div className="flex flex-[1_1_320px] flex-col gap-1">
                    <strong>{copy ? copy.Name : 'Choose a room copy'}</strong>
                    <span className="text-[14px] text-ink-2">
                        {copy
                            ? `${copy.FloorItems.length} floor and ${copy.WallItems.length} wall items, copied on habbo.${copy.Hotel || 'com'}`
                            : 'A .json file the room copier saved.'}
                    </span>
                </div>
                <label className="btn btn-secondary min-h-12 cursor-pointer">
                    {copy ? 'Choose another' : 'Choose file'}
                    <input type="file" accept=".json,application/json" className="sr-only" onChange={choose} />
                </label>
                {copy && (
                    <Button className="min-h-12" busy={importRoom.isPending} disabled={!!importRoom.data?.roomId}
                        onClick={() => importRoom.mutate(copy)}>
                        Import room
                    </Button>
                )}
            </div>

            {unreadable && (
                <Notice title={`${unreadable} isn't a room copy.`}>Choose a file the room copier saved.</Notice>
            )}
            {importRoom.error && (
                <Notice title="The room couldn't be imported.">
                    {importRoom.error.message.startsWith('This is a format')
                        ? importRoom.error.message
                        : 'Try again in a moment.'}
                </Notice>
            )}
            {importRoom.data && <Result result={importRoom.data} />}
        </main>
    );
}

function Result({ result }: { result: RoomImportResult }) {
    if (result.roomId === null) {
        return (
            <Notice title={`${result.name} wasn't built: its floor plan won't do here.`}>
                <ul className="m-0 mt-1 pl-5">
                    {result.errors.map(error => <li key={error}>{planErrors[error] ?? error}</li>)}
                </ul>
            </Notice>
        );
    }

    const missing = Object.entries(result.missing).sort(([, a], [, b]) => b - a);
    const left = missing.reduce((sum, [, count]) => sum + count, 0);
    return (
        <div className="flex flex-col gap-4">
            <div role="status" className="flex flex-col gap-1 rounded-[14px] bg-ok-soft px-4 py-3.5 text-ok">
                <strong>{result.name} is yours.</strong>
                <span className="text-ink">
                    {result.floorItems} floor and {result.wallItems} wall items are in it
                    {result.wiredBoxes > 0 ? `, ${result.wiredBoxes} wired boxes set up as they were` : ''}
                    {result.linkedTeleports > 0 ? `, ${result.linkedTeleports / 2} teleport pairs linked` : ''}. Find it in
                    the hotel's navigator, under My World.
                </span>
                {result.unlinkedTeleports > 0 && (
                    <span className="text-ink-2">
                        {result.unlinkedTeleports === 1
                            ? '1 teleport leads nowhere: its partner stood in another room.'
                            : `${result.unlinkedTeleports} teleports lead nowhere: their partners stood in other rooms.`}
                    </span>
                )}
            </div>
            {left > 0 && (
                <div className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface px-[22px] py-5">
                    <strong>{left} furni left out</strong>
                    <span className="text-[14px] text-ink-2">The hotel doesn't have these yet, or they stood outside the floor plan.</span>
                    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-1.5 p-0">
                        {missing.map(([name, count]) => (
                            <li key={name} className="flex justify-between gap-3">
                                <span className={name === offThePlan ? 'text-ink-2' : 'mono truncate'}>{name}</span>
                                <span className="font-bold">{count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
