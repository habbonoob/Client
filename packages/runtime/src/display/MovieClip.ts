import type { FrameLabel } from './FrameLabel';
import { Sprite } from './Sprite';

/**
 * A sprite with a timeline. The client's movie clips (the application and its component
 * libraries) are code-built and have a single frame, so the timeline is that one frame: always
 * frame 1, no labels, and nothing playing.
 */
export class MovieClip extends Sprite {
    get currentFrame(): number {
        return 1;
    }

    get totalFrames(): number {
        return 1;
    }

    get framesLoaded(): number {
        return 1;
    }

    get currentLabel(): string | null {
        return null;
    }

    get currentFrameLabel(): string | null {
        return null;
    }

    get currentLabels(): FrameLabel[] {
        return [];
    }

    get isPlaying(): boolean {
        return false;
    }

    /** One frame: there is no playback to stop or start. */
    stop(): void {}

    play(): void {}

    gotoAndStop(frame: unknown, scene: string = null): void {
        void frame;
        void scene;
    }

    gotoAndPlay(frame: unknown, scene: string = null): void {
        void frame;
        void scene;
    }
}
