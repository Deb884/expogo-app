import { useSyncExternalStore } from 'react';

/**
 * Saved-workout state (spec §15 — real interactions, local state only).
 *
 * A minimal external store so a save toggled on Workout Detail is immediately
 * reflected in Saved Workouts. Snapshots are replaced (never mutated in place)
 * so `useSyncExternalStore` sees a new reference and re-renders.
 */

/** Seeded so Saved Workouts has content on first launch. */
const seed = ['full-body-power', 'hiit-burner'];

let set: ReadonlySet<string> = new Set(seed);
let ids: readonly string[] = [...seed];

const listeners = new Set<() => void>();

function publish(next: ReadonlySet<string>) {
  set = next;
  ids = [...next];
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSet = () => set;
const getIds = () => ids;

export function toggleSaved(id: string) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  publish(next);
}

export function savedIds(): readonly string[] {
  return ids;
}

/** `true` when the id is saved, plus a toggle. */
export function useSaved(id: string): [boolean, () => void] {
  const saved = useSyncExternalStore(subscribe, getSet, getSet).has(id);
  return [saved, () => toggleSaved(id)];
}

/** Every saved workout id — re-renders the caller whenever a save changes. */
export function useSavedIds(): readonly string[] {
  return useSyncExternalStore(subscribe, getIds, getIds);
}