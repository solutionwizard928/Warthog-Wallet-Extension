import React, { createContext, useState, useEffect, ReactNode } from "react";
import CryptoJS from "crypto-js";

declare const chrome: {
    storage: {
        local: {
            set: (
                items: Record<string, unknown>,
                callback?: () => void
            ) => void;
            get: (
                keys: string | string[],
                callback: (items: Record<string, unknown>) => void
            ) => void;
            clear: (callback?: () => void) => void;
        };
    };
};

interface WalletContextProps {
    seedPhrase: string | null;
    wallet: string | null;
    password: string | null;
    name: string | null;
    setName: (name: string) => void;
    setSeedPhrase: (seedPhrase: string) => void;
    setWallet: (wallet: string) => void;
    setPassword: (password: string) => void;
    clearWalletData: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "";

const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

const decryptData = (ciphertext: string): string | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [seedPhrase, setSeedPhraseState] = useState<string | null>(null);
    const [wallet, setWalletState] = useState<string | null>(null);
    const [password, setPasswordState] = useState<string | null>(null);
    const [name, setNameState] = useState<string | null>(null);

    const saveToChromeStorage = (key: string, value: string | null): void => {
        try {
            const encryptedValue = value ? encryptData(value) : null;
            chrome.storage.local.set({ [key]: encryptedValue });
        } catch (error) {
            console.error(`Error saving ${key} to Chrome storage:`, error);
        }
    };

    const loadFromChromeStorage = (key: string, callback: (value: string | null) => void): void => {
        try {
            chrome.storage.local.get(key, (result) => {
                const encryptedValue = result[key] as string;
                const decryptedValue = encryptedValue ? decryptData(encryptedValue) : null;
                callback(decryptedValue);
            });
        } catch (error) {
            console.error(`Error loading ${key} from Chrome storage:`, error);
        }
    };

    const setSeedPhrase = (seedPhrase: string): void => {
        setSeedPhraseState(seedPhrase);
        saveToChromeStorage("seedPhrase", seedPhrase);
    };

    const setWallet = (wallet: string): void => {
        setWalletState(wallet);
        saveToChromeStorage("wallet", wallet);
    };

    const setPassword = (password: string): void => {
        setPasswordState(password);
        saveToChromeStorage("password", password);
    };

    const setName = (name: string): void => {
        setNameState(name);
        saveToChromeStorage("name", name);
    };

    const clearWalletData = (): void => {
        setSeedPhraseState(null);
        setWalletState(null);
        setPasswordState(null);
        setNameState(null);
        try {
            chrome.storage.local.clear();
        } catch (error) {
            console.error("Error clearing Chrome storage:", error);
        }
    };

    useEffect(() => {
        loadFromChromeStorage("seedPhrase", setSeedPhraseState);
        loadFromChromeStorage("wallet", setWalletState);
        loadFromChromeStorage("password", setPasswordState);
        loadFromChromeStorage("name", setNameState);
    }, []);

    return (
        <WalletContext.Provider
            value={{
                seedPhrase,
                wallet,
                password,
                name,
                setSeedPhrase,
                setWallet,
                setPassword,
                setName,
                clearWalletData,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;