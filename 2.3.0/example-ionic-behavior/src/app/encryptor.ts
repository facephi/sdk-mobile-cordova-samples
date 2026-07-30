const USER_ID_KEY_NAMESPACE     = "behavior-sdk-web-user-id-key-v1";
const USER_ID_VALUE_NAMESPACE   = "behavior-sdk-web-user-id-value-v1";

export class Encryptor 
{
    static async encryptUserId(raw: string): Promise<string> 
    {
        const normalized = raw.trim().toLowerCase();

        if (!normalized) {
            return "test";
        }

        const plaintext =
            `${USER_ID_VALUE_NAMESPACE}:${normalized}`;

        const key = await this.generateKey();
        const iv = await this.deterministicIv(plaintext);
        const ciphertext = await this.encryptData(
            key,
            plaintext,
            iv
        );

        return "u_" + this.toHex(ciphertext).substring(0, 32);
    }

    private static async generateKey(): Promise<CryptoKey> {

        const hash = await this.sha256(USER_ID_KEY_NAMESPACE);

        return crypto.subtle.importKey(
            "raw",
            hash,
            { name: "AES-GCM" },
            false,
            ["encrypt"]
        );
    }

    private static async deterministicIv(
        input: string
    ): Promise<Uint8Array> {

        const hash = await this.sha256(input);

        return new Uint8Array(hash.slice(0, 12));
    }

    private static async encryptData(
        key: CryptoKey,
        data: string,
        iv: Uint8Array
    ): Promise<Uint8Array> {
        const encrypted = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv as BufferSource
            },
            key,
            new TextEncoder().encode(data)
        );

        return new Uint8Array(encrypted);
    }

    private static async sha256(
        text: string
    ): Promise<ArrayBuffer> {

        return crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(text)
        );
    }

    private static toHex(bytes: Uint8Array): string {

        return [...bytes]
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }
}