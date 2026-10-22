import { EventDispatcher } from './EventDispatcher';

/** Receives an UncaughtErrorEvent for every error nothing else caught (see runtime/uncaught.ts). */
export class UncaughtErrorEvents extends EventDispatcher {}
