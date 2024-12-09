import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as bip39 from "bip39";
import * as elliptic from "elliptic";
import CryptoJS from "crypto-js";
import Ripemd160 from "ripemd160";

declare const chrome: {
    storage: {
        local: {
            remove(arg0: string[], arg1: () => void): unknown;
            set: (
                items: Record<string, unknown>,
                callback?: () => void
            ) => void;
            get: (
                keys: string | string[],
                callback: (items: Record<string, unknown>) => void
            ) => void;
            clear: (keys: string | string[], callback?: () => void) => void;
        };
    };
};

interface WalletContextProps {
    seedPhrase: string | null;
    wallet: string | null;
    walletList: string[];
    nameList: string[];
    selectedWalletIndex: number;
    password: string | null;
    name: string | null;
    setName: (name: string) => void;
    setSeedPhrase: (seedPhrase: string) => void;
    setWallet: (wallet: string) => void;
    setPassword: (password: string) => void;
    clearWalletData: () => void;
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    newWallet: () => void;
    setWalletListState: (walletList: string[]) => void;
    setNameListState: (nameList: string[]) => void;
    setSelectedWalletIndexState: (selectedWalletIndex: number) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

const ENCRYPTION_KEY = import.meta.env.VITE_APP_ENCRYPTION_KEY || "";

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
    const [walletList, setWalletListState] = useState<string[]>([]);
    const [selectedWalletIndex, setSelectedWalletIndexState] = useState<number>(0);
    const [nameList, setNameListState] = useState<string[]>([]);
    const [token, setTokenState] = useState<string | null>(null);

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
                const encryptedValue = result[key] as string | undefined;
                const decryptedValue = encryptedValue ? decryptData(encryptedValue) : null;
                callback(decryptedValue);
            });
        } catch (error) {
            console.error(`Error loading ${key} from Chrome storage:`, error);
        }
    };

    const newWallet = async (): Promise<void> => {
        try {
            console.log("-------------- newWallet --------------");
            // mnemonic 12 words
            const mnemonic = bip39.generateMnemonic();
            console.log("***** mnemonic", mnemonic);

            const ec = new elliptic.ec("secp256k1");
            const key = ec.genKeyPair({ entropy: bip39.mnemonicToSeedSync(mnemonic) });

            const privateKey = key.getPrivate().toString("hex");
            const publicKey = key.getPublic().encode("hex", true);
            console.log("***** privateKey", privateKey);
            console.log("***** publicKey", publicKey);

            const sha = await window.crypto.subtle.digest('SHA-256', Buffer.from(publicKey, "hex"));
            const shaHex = Array.from(new Uint8Array(sha)).map(b => b.toString(16).padStart(2, '0')).join('');
            console.log("***** sha", shaHex);
            // const tmp = new Ripemd160();
            // const ripemd160 = tmp.update('42').digest("hex");
            // console.log("***** ripemd160", ripemd160);
            // const ripemd160Hex = Array.from(new Uint8Array(ripemd160)).map(b => b.toString(16).padStart(2, '0')).join('');
            // console.log("***** ripemd160", ripemd160Hex);
            // const checksum = await window.crypto.subtle.digest('SHA-256', ripemd160);
            // const checksumHex = Array.from(new Uint8Array(checksum)).map(b => b.toString(16).padStart(2, '0')).join('');
            // console.log("***** checksum", checksumHex);
            // const address = ripemd160Hex + checksumHex.slice(0, 8);
            // // const address = Buffer.concat([ripemd160, checksum.slice(0, 4)]);

            // console.log("***** address", address);

            // save to chrome storage
            // setSeedPhrase(mnemonic);
            console.log("-------------- End of newWallet --------------");

        } catch (error) {
            console.log("Error creating new wallet:", error);
        }
    };

    const setToken = (token: string): void => {
        setTokenState(token);
        const expirationTime = Date.now() + 3600 * 1000; // 1 hour
        saveToChromeStorage("token", token);
        saveToChromeStorage("tokenExpiration", expirationTime.toString());
    };

    const clearToken = (): void => {
        setTokenState(null);
        chrome.storage.local.remove(["token", "tokenExpiration"], () => {
            console.log("Token and token expiration removed");
        });
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

        const token = CryptoJS.SHA256(password + Date.now().toString()).toString();
        setToken(token);
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
        chrome.storage.local.remove(["seedPhrase", "wallet", "password", "name"], () => {
            console.log("Seed phrase, wallet, password, and name removed");
        });
    };

    useEffect(() => {
        loadFromChromeStorage("seedPhrase", setSeedPhraseState);
        loadFromChromeStorage("wallet", setWalletState);
        loadFromChromeStorage("password", setPasswordState);
        loadFromChromeStorage("name", setNameState);
        loadFromChromeStorage("token", setTokenState);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            loadFromChromeStorage("tokenExpiration", (expiration) => {
                const expirationTime = expiration ? parseInt(expiration, 10) : 0;
                if (Date.now() >= expirationTime) {
                    clearToken();
                }
            });
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <WalletContext.Provider
            value={{
                seedPhrase,
                wallet,
                password,
                name,
                token,
                setSeedPhrase,
                setWallet,
                setPassword,
                setName,
                clearWalletData,
                setToken,
                clearToken,
                newWallet,
                walletList,
                nameList,
                selectedWalletIndex,
                setWalletListState,
                setNameListState,
                setSelectedWalletIndexState
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;
