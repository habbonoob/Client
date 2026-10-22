import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';

/** One window layout of the client: its asset name, the component it belongs to, and that component's assets. */
export interface LayoutEntry {
    /** The asset name the client asks for (getAssetByName), e.g. "club_center_xml". */
    readonly name: string;
    /** The component class that owns it, e.g. "HabboCatalogCom". */
    readonly owner: string;
    /** The owner's asset library: the layout's XML, and the images and other assets it refers to. */
    readonly library: IAssetLibrary;
    /**
     * A part of a window skin (a frame's or a scrollbar's own layout, named by the skin's element description): the
     * skin builds it inside its element, so on its own it may not build.
     */
    readonly skinPart: boolean;
    /** Where the layout's file is in the client's asset pack; null when it is not a file of its own there. */
    readonly packPath: string | null;
    /** The layout as the pack has it (its file's text), or as the asset library gives it. */
    readonly source: () => string;
    /**
     * Its root draws into its parent's graphics (use_parent_graphic_context): a piece the client adds into another
     * window (an item of a list, a page's widget), never shown on its own.
     */
    readonly hosted: boolean;
    /** A layout made in the editor: not the client's, saved as layouts/<name>.xml. */
    readonly isNew?: boolean;
}
