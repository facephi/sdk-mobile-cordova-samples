/**
 * Enum for SelphIDCompressFormat values.
 * @readonly
 * @enum {string}
 */
export declare enum SelphIDCompressFormat {
    JPEG = "jpeg",
    PNG = "png"
}
/**
 * Enum for SelphIDOperation values.
 * @readonly
 * @enum {string}
 */
export enum SelphIDDocumentSide {
    Front = "Front",
    Back = "Back"
}
/**
 * Enum for SelphIDDocumentType values.
 * @readonly
 * @enum {string}
 */
export enum SelphIDDocumentType {
    IDCard = "IDCard",
    Passport = "Passport",
    DriverLicense = "DriverLicense",
    ForeignCard = "ForeignCard",
    CreditCard = "CreditCard",
    Custom = "Custom",
    Visa = "Visa"
}
/**
 * Enum for SelphIDScanMode values.
 * @readonly
 * @enum {string}
 */
export enum SelphIDScanMode {
    Generic = "Generic",
    Specific = "Specific",
    Search = "Search"
}
/**
 * Enum for SelphIDTimeout values.
 * @readonly
 * @enum {string}
 */
export enum SelphIDTimeout {
    Short = "Short",
    Medium = "Medium",
    Long = "Long",
    VeryLong = "VeryLong"
}