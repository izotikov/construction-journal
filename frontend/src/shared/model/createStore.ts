import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

export function createStore<T extends object>(
  initializer: (set: any, get: any) => T,
  name?: string,
) {
  return create<T>()(subscribeWithSelector(devtools((set, get) => initializer(set, get), { name })));
}