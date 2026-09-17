/**
 * InitSessionConfiguration.
 * @interface
 */
export interface InitSessionConfiguration 
{
    license?: string;
    licenseUrl?: string;
    licenseApiKey?: string;
    enableTracking?: boolean;
    enableDebugMode?: boolean;
    locale?: string;
    internalOptions?: Record<string, any>;
    orientation?: SdkViewOrientation;
    integrationId?: string;
    enableLocation?: boolean;
    enableLoggerBackend?: boolean;
}

export enum SdkViewOrientation {
    PORTRAIT = "PORTRAIT",
    PORTRAIT_PHONES = "PORTRAIT_PHONES",
    LANDSCAPE = "LANDSCAPE",
    FOLLOW_SYSTEM = "FOLLOW_SYSTEM"
}