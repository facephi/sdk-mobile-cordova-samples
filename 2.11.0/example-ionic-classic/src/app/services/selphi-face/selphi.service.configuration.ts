import { SelphiCamera, SelphiCompressFormat, SelphiExtractionDuration, SelphiFaceLivenessMode } from "./selphi.service.enums";

export interface SelphiFaceConfiguration 
{
  resourcesPath: string;
  /**
  * Sets the debug mode of the widget.
  * 
  * @default: false
  * @since 1.0.0
  */
  debug?: boolean;
  /**
  * Sets the fullscreen mode of the widget.
  *
  * @default: true
  * @since 1.0.0
  */
  fullscreen?: boolean;
  /**
  * Specifies the percentage that the detected face area is enlarged to compose the returned image.
  * @default: ""
  * @since 1.0.0
  */
  cropPercent?: number;
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
  /**
  * Property to set a percentage of quality to the return image (bestImage). The value must be between 0 and 1 (float).
  * @default: ""
  * @since 1.0.0
  */
  compressFormat?: SelphiCompressFormat;
  jpgQuality?: number;
  /**
  * Sets the liveness mode of the widget. .
  * @default: ""
  * @since 1.0.0
  */
  livenessMode?: SelphiFaceLivenessMode;
  /**
  * Sets the enableGenerateTemplateRaw mode of the widget. .
  * @default: ""
  * @since 1.0.0
  */
  enableGenerateTemplateRaw?: boolean;
  showResultAfterCapture?: boolean;
  isCameraFlash?: boolean;
  translationsContent?: string;
  viewsContent?: string;
  showTutorial?: boolean;
  cameraId?: number;
  videoFilename?: string;
  params?: Record<string, string>;
  qrMode?: boolean;
  showDiagnostic?: boolean;
  logImages?: boolean;
  showPreviousTip?: boolean;
  vibrationEnabled?: boolean;
  cameraFlashEnabled?: boolean;
  extractionDuration?: SelphiExtractionDuration;
  cameraPreferred?: SelphiCamera;
  moveSuccessfulAttempts?: number;
  moveFailedAttempts?: number; 
}