import { SelphIDCompressFormat, SelphIDDocumentSide, SelphIDDocumentType, SelphIDScanMode, SelphIDTimeout } from "./selphid.service.enums";

/**
 * SelphIDConfiguration.
 * @interface
 */
export interface SelphIDConfiguration 
{
    wizardMode?: boolean;
    /**
    * The class `SelphIDOperation`, which contains the capture modes that can be performed.
    * @property {SelphIDDocumentSide}
    * @default SelphIDDocumentSide.Front
    * @since 1.0.0
    */
    documentSide: SelphIDDocumentSide;
    /**
    * Sets the name of the resource file the widget will use for its graphical configuration. This file is customizable and can be found in the plugin in the root path.
    * @property {string}
    * @default fphi-selphid-widget-resources-sdk.zip
    * @since 1.0.0
    */
    resourcesPath: string;
    /**
    * Sets the debugging mode of the widget.
    * @property {boolean}
    * @default false
    * @since 1.0.0
    */
    debug?: boolean;
    showResultAfterCapture?: boolean;
    showTutorial?: boolean;
    tutorialOnly?: boolean;
    scanMode?: SelphIDScanMode;
    /**
    * This property allows you to define which documents will be scanned during the process, in case of declaring the scanning mode (scanMode) to GenericMode, SpecificMode or SearchMode.
    * @property {string} optional
    * @default ES|<ALL>
    * @since 1.0.0
    */
    specificData?: string;
    /**
    * Sets whether the widget will start in full screen mode, hiding the status bar.
    * @property {boolean}
    * @default true
    * @since 1.0.0
    */
    fullscreen?: number;
    /**
    * Specifies the compression quality of the tokenFaceImage.
    * @property {number}
    * @default 0.9
    * @since 1.0.0
     */
    tokenImageQuality?: number;
    /**
    * @property {SelphIDDocumentType}
    * @default SdkDocumentType.IDCard
    * @since 1.0.0
    */
    documentType?: SelphIDDocumentType;
    timeout?: SelphIDTimeout;
    tokenPrevCaptureData?: string;
    generateRawImages?: boolean;
    imageQuality?: number;
    compressFormat?: SelphIDCompressFormat;
    documentModels?: string;
    params?: any;
    showDiagnostic?: boolean;
    cameraId?: number;
    translationsContent?: string;
    viewsContent?: string;
    showPreviousTip?: boolean;
    vibrationEnabled?: boolean;
}