import { writable } from 'svelte/store';
import type { AuthData } from './models/AuthData';

export const oauthCredentialsStore = writable<OAuthCredential | null>();
export const authDataStore = writable<AuthData | null>();
