/**
 * InitSessionConfiguration.
 * @interface
 */
export interface InitSessionConfiguration {
    /**
    * Property to select the license of the client. Its must be provided by Facephi.
    * @property {string}
    * @default: ""
    * @since 1.0.0
    */
    license?: string;
    /**
    * Property to select the licenseUrl of the client. Its must be provided by Facephi.
    * @property {string}
    * @default: ""
    * @since 1.0.0
    */
    licenseUrl?: string;
    /**
    * Property to select the licenseApiKey of the client. Its must be provided by Facephi.
    * @property {string}
    * @default: ""
    * @since 1.0.0
    */
    licenseApiKey?: string;
    enableTracking?: boolean;
    locale?: string;
}