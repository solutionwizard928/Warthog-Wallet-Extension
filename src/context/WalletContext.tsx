import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import * as bip39 from "bip39";
import * as elliptic from "elliptic";
import { ethers } from "ethers";
import { getKeyFromPassword, encrypt, decrypt } from "dha-encryption";
import browser from "webextension-polyfill";

interface WalletContextProps {
    seedPhrase: string | null;
    wallet: string | null;
    walletList: string[];
    nameList: string[];
    visibleWalletList: boolean[];
    selectedWalletIndex: number;
    password: string | null;
    name: string | null;
    setName: (name: string) => void;
    setSeedPhrase: (seedPhrase: string) => void;
    setWallet: (wallet: string) => void;
    setPassword: (password: string) => void;
    setWalletList: (walletList: string[]) => void;
    setNameList: (nameList: string[]) => void;
    setVisibleWalletList: (visibleWalletList: boolean[]) => void;
    setSelectedWalletIndex: (selectedWalletIndex: number) => void;
    clearWalletData: () => void;
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    newWallet: () => void;
    setWalletListState: (walletList: string[]) => void;
    setNameListState: (nameList: string[]) => void;
    setSelectedWalletIndexState: (selectedWalletIndex: number) => void;
    setVisibleWalletListState: (visibleWalletList: boolean[]) => void;
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
    const [visibleWalletList, setVisibleWalletListState] = useState<boolean[]>([]);

    const arrayBufferToHex = (buffer: ArrayBuffer): string => {
        const bytes = new Uint8Array(buffer);
        return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    const hexToArrayBuffer = (hex: string): ArrayBuffer => {
        const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
        return bytes.buffer;
    }

    const saveToBrowserStorage = async (key: string, value: string | null): Promise<void> => {
        try {
            const keyObject = await getKeyFromPassword(ENCRYPTION_KEY);
            const encryptedValue = value ? await encrypt(value, keyObject) : null;
            const hexValue = encryptedValue ? arrayBufferToHex(encryptedValue) : null;

            browser.storage.local.set({ [key]: hexValue }).then(() => {
                console.log(`${key} saved to browser storage`);
            }).catch((error: unknown) => {
                console.error(`Error saving ${key} to browser storage:`, error);
            });
        } catch (error) {
            console.error(`Error saving ${key} to browser storage:`, error);
        }
    };

    const decryptValue = async (value: string | undefined): Promise<string | null> => {
        const keyObject = await getKeyFromPassword(ENCRYPTION_KEY);
        const arrayBuffer = value ? hexToArrayBuffer(value) : null;
        const decryptedValue = arrayBuffer ? await decrypt(arrayBuffer, keyObject) : null;
        return decryptedValue;
    };

    const loadFromChromeStorage = useCallback((key: string, callback: (value: string | null) => void): void => {
        try {
            browser.storage.local.get(key).then( (result: Record<string, unknown>) => {
                console.log("***** result", result);
                decryptValue(result[key] as string | undefined).then((decryptedValue) => {
                    callback(decryptedValue);
                }).catch((error: unknown) => {
                    console.error(`Error decrypting ${key} from browser storage:`, error);
                });
            }).catch((error: unknown) => {
                console.error(`Error loading ${key} from browser storage:`, error);
            });
        } catch (error) {
            console.error(`Error loading ${key} from browser storage:`, error);
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
            setVisibleWalletList([...visibleWalletList, true]);
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
        saveToBrowserStorage("token", token);
        saveToBrowserStorage("tokenExpiration", expirationTime.toString());
    };

    const clearToken = (): void => {
        setTokenState(null);
        browser.storage.local.remove(["token", "tokenExpiration"]).then(() => {
            console.log("Token and token expiration removed");
        }).catch((error: unknown) => {
            console.error("Error removing token and token expiration:", error);
        });
    };

    const setSeedPhrase = (seedPhrase: string): void => {
        setSeedPhraseState(seedPhrase);
        saveToBrowserStorage("seedPhrase", seedPhrase);
    };

    const setWallet = (wallet: string): void => {
        setWalletState(wallet);
        saveToBrowserStorage("wallet", wallet);
    };

    const setWalletList = (walletList: string[]): void => {
        setWalletListState(walletList);
        saveToBrowserStorage("walletList", walletList.join(","));
    };

    const setNameList = (nameList: string[]): void => {
        setNameListState(nameList);
        saveToBrowserStorage("nameList", nameList.join(","));
    };

    const setSelectedWalletIndex = (selectedWalletIndex: number): void => {
        setSelectedWalletIndexState(selectedWalletIndex);
        saveToBrowserStorage("selectedWalletIndex", selectedWalletIndex.toString());
    };

    const setPassword = (password: string): void => {
        setPasswordState(password);
        saveToBrowserStorage("password", password);
    };

    const setName = (name: string): void => {
        setNameState(name);
        saveToBrowserStorage("name", name);
    };

    const setVisibleWalletList = (visibleWalletList: boolean[]): void => {
        setVisibleWalletListState(visibleWalletList);
        saveToBrowserStorage("visibleWalletList", visibleWalletList.join(","));
    };

    const clearWalletData = (): void => {
        setSeedPhraseState(null);
        setWalletState(null);
        setPasswordState(null);
        setNameState(null);
        browser.storage.local.remove(["seedPhrase", "wallet", "password", "name"]).then(() => {
            console.log("Seed phrase, wallet, password, and name removed");
        }).catch((error: unknown) => {
            console.error("Error removing seed phrase, wallet, password, and name:", error);
        });
    };

    useEffect(() => {
        loadFromChromeStorage("seedPhrase", setSeedPhraseState);
        loadFromChromeStorage("wallet", setWalletState);
        loadFromChromeStorage("walletList", (walletList) => setWalletListState(walletList ? walletList.split(",") : []));
        loadFromChromeStorage("nameList", (nameList) => setNameListState(nameList ? nameList.split(",") : []));
        loadFromChromeStorage("visibleWalletList", (visibleWalletList) => {
            const boolArray = visibleWalletList ? visibleWalletList.split(",").map(val => val === "true") : [];
            setVisibleWalletListState(boolArray);
        });
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
                walletList,
                nameList,
                visibleWalletList,
                setSeedPhrase,
                setWallet,
                setPassword,
                setName,
                setWalletList,
                setNameList,
                setVisibleWalletList,
                setSelectedWalletIndex,
                clearWalletData,
                setToken,
                clearToken,
                newWallet,
                selectedWalletIndex,
                setWalletListState,
                setNameListState,
                setSelectedWalletIndexState,
                setVisibleWalletListState,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;
