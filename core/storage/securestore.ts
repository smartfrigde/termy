import * as SecureStore from "expo-secure-store";

export interface ReduxPersistExpoSecureStore {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}

interface CustomSecureStoreOptions extends SecureStore.SecureStoreOptions {
    replaceCharacter?: string;
    replacer?: (key: string, replaceCharacter: string) => string;
}

export default function createSecureStorage(options: CustomSecureStoreOptions = {}): ReduxPersistExpoSecureStore {
    const replaceCharacter = options.replaceCharacter || "_";
    const replacer = options.replacer || defaultReplacer;

    return {
        getItem: (key: string) => SecureStore.getItemAsync(replacer(key, replaceCharacter), options),
        setItem: (key: string, value: string) =>
            SecureStore.setItemAsync(replacer(key, replaceCharacter), value, options),
        removeItem: (key: string) => SecureStore.deleteItemAsync(replacer(key, replaceCharacter), options),
    };
}

function defaultReplacer(key: string, replaceCharacter: string): string {
    return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
