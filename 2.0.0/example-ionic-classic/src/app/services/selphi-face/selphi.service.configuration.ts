import { SelphiCamera, SelphiCompressFormat, SelphiExtractionDuration, SelphiFaceLivenessMode } from "./selphi.service.enums";

export interface SelphiFaceConfiguration {
    /**
    * The path to the compressed file with all the plugin resources.
    * @since 1.0.0
    * @default: ""
    */
    resourcesPath: string;
    /**
    * Sets the debug mode of the widget.
    *
    * @default: false
    * @since 1.0.0
    */
    debug?: boolean;
    /**
    * Specifies the percentage that the detected face area is enlarged to compose the returned image.
    * @default: ""
    * @since 1.0.0
    */
    cropPercent?: boolean;
    /**
    * Property that allows the stabilization mode to be enabled or disabled prior to the face detection process. If enabled it will give some guidelines to know if it is correctly located or not.
    * @default: ""
    * @since 1.0.0
    */
    stabilizationMode?: boolean;
    /**
    * Indicates if the template raw must be optimized.
    * @default: ""
    * @since 1.0.0
    */
    templateRawOptimized?: boolean;
    compressFormat?: SelphiCompressFormat;
    /**
    * Property to set a percentage of quality to the return image (bestImage). The value must be between 0 and 1 (float).
    * @default: ""
    * @since 1.0.0
    */
    jpgQuality?: number;
    /**
    * Indicates whether the widget returns to the application the images used during extraction or not. It should be noted that returning images may result in a considerable increase in the use of device resources.
    * @default: ""
    * @since 1.0.0
    */
    logImages?: boolean;
    /**
    * Sets the liveness mode of the widget. .
    * @default: ""
    * @since 1.0.0
    */
    livenessMode?: SelphiFaceLivenessMode;
    /**
    * Sets the enableWidgetEventListener mode of the widget. .
    * @default: ""
    * @since 1.0.0
    */
    enableGenerateTemplateRaw?: boolean;
    showDiagnostic?: boolean;
    showTutorial?: boolean;
    showResultAfterCapture?: boolean;
    fullscreen?: boolean;
    locale?: string;
    qrMode?: boolean;
    translationsContent?: string;
    viewsContent?: string;
    cameraId?: number;
    params?: any;
    cameraFlashEnabled?: boolean;
    showPreviousTip?: boolean;
    extractionDuration?: SelphiExtractionDuration;
    cameraPreferred?: SelphiCamera;
    vibrationEnabled?: boolean;
    moveSuccessfulAttempts?: number;
    moveFailedAttempts?: number;   
}