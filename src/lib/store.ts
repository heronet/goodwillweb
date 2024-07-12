import { writable } from 'svelte/store';
import type { AuthData } from './models/AuthData';

export const facebookCredentialsStore = writable<FacebookCredential | null>();
export const authDataStore = writable<AuthData | null>();
