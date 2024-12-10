import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import * as bip39 from "bip39";
import * as elliptic from "elliptic";
import { ethers } from "ethers";
import { getKeyFromPassword, encrypt, decrypt } from "dha-encryption";

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
    setWalletList: (walletList: string[]) => void;
    setNameList: (nameList: string[]) => void;
    setSelectedWalletIndex: (selectedWalletIndex: number) => void;
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

const ENCRYPTION_KEY = import.meta.env.VITE_APP_ENCRYPTION_KEY || "encryption_key";

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [seedPhrase, setSeedPhraseState] = useState<string | null>(null);
    const [wallet, setWalletState] = useState<string | null>(null);
    const [password, setPasswordState] = useState<string | null>(null);
    const [name, setNameState] = useState<string | null>(null);
    const [walletList, setWalletListState] = useState<string[]>([]);
    const [selectedWalletIndex, setSelectedWalletIndexState] = useState<number>(0);
    const [nameList, setNameListState] = useState<string[]>([]);
    const [token, setTokenState] = useState<string | null>(null);

    const arrayBufferToHex = (buffer: ArrayBuffer): string => {
        const bytes = new Uint8Array(buffer);
        return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    const hexToArrayBuffer = (hex: string): ArrayBuffer => {
        const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
        return bytes.buffer;
    }

    const saveToChromeStorage = async (key: string, value: string | null): Promise<void> => {
        try {
            const keyObject = await getKeyFromPassword(ENCRYPTION_KEY);
            const encryptedValue = value ? await encrypt(value, keyObject) : null;
            const hexValue = encryptedValue ? arrayBufferToHex(encryptedValue) : null;
            chrome.storage.local.set({ [key]: hexValue });
        } catch (error) {
            console.error(`Error saving ${key} to Chrome storage:`, error);
        }
    };

    const loadFromChromeStorage = useCallback((key: string, callback: (value: string | null) => void): void => {
        try {
            chrome.storage.local.get(key, async (result) => {
                const keyObject = await getKeyFromPassword(ENCRYPTION_KEY);
                const encryptedValue = result[key] as string | undefined;
                const arrayBuffer = encryptedValue ? hexToArrayBuffer(encryptedValue) : null;
                const decryptedValue = arrayBuffer ? await decrypt(arrayBuffer, keyObject) : null;
                callback(decryptedValue);
            });
        } catch (error) {
            console.error(`Error loading ${key} from Chrome storage:`, error);
        }
    }, []);

    const newWallet = async (): Promise<void> => {
        try {
            console.log("-------------- newWallet --------------");
            // mnemonic 12 words
            const mnemonic = bip39.generateMnemonic();

            // generate key pair
            const ec = new elliptic.ec("secp256k1");
            const key = ec.genKeyPair({ entropy: bip39.mnemonicToSeedSync(mnemonic, "account0") });

            // generate address
            const publicKey = key.getPublic().encode("hex", true);
            const sha256 = ethers.sha256("0x" + publicKey).slice(2);
            const ripemd160 = ethers.ripemd160("0x" + sha256).slice(2);
            const checksum = ethers.sha256("0x" + ripemd160).slice(2, 10);
            const address = ripemd160 + checksum;
            console.log("***** address", address);

            // save to storage
            setSeedPhrase(mnemonic);
            setWallet(address);
            setWalletList([...walletList, address]);
            setNameList([...nameList, "Account 0"]);
            setSelectedWalletIndex(walletList.length);
            setName("Account 0");
            console.log("***** walletList length", walletList.length);

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

    const setWalletList = (walletList: string[]): void => {
        setWalletListState(walletList);
        saveToChromeStorage("walletList", walletList.join(","));
    };

    const setNameList = (nameList: string[]): void => {
        setNameListState(nameList);
        saveToChromeStorage("nameList", nameList.join(","));
    };

    const setSelectedWalletIndex = (selectedWalletIndex: number): void => {
        setSelectedWalletIndexState(selectedWalletIndex);
        saveToChromeStorage("selectedWalletIndex", selectedWalletIndex.toString());
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
        loadFromChromeStorage("walletList", (walletList) => setWalletListState(walletList ? walletList.split(",") : []));
        loadFromChromeStorage("nameList", (nameList) => setNameListState(nameList ? nameList.split(",") : []));
        loadFromChromeStorage("selectedWalletIndex", (selectedWalletIndex) => setSelectedWalletIndexState(selectedWalletIndex ? parseInt(selectedWalletIndex, 10) : 0));
        loadFromChromeStorage("password", setPasswordState);
        loadFromChromeStorage("name", setNameState);
        loadFromChromeStorage("token", setTokenState);
    }, [loadFromChromeStorage]);

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
    }, [loadFromChromeStorage]);

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
                setWalletList,
                setNameList,
                setSelectedWalletIndex,
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
