/**
 * SelphIDResult.
 * @interface
 */
export interface SelphIDResult 
{
    /**
    * Returns the global diagnosis of the operation
    * @since 1.0.0
    */
    finishStatus: number;
    /**
    * Returns the description of the finishStatus
    * @since 1.0.0
    */
    finishStatusDescription?: string;
    /**
    * Returns the type of error that has occurred (if there has been one, which is indicated in the `finishStatus` parameter with the value `error`)
    * @since 1.0.0
    */
    errorType: number;
    /**
    * Indicates an additional error message if needed. It is an optional value.
    * @since 1.0.0
    */
    errorMessage?: string;
    frontDocumentImage?: string;
    backDocumentImage?: string;
    faceImage?: string;
    signatureImage?: string;
    fingerprintImage?: string;
    documentData?: string;
    tokenFrontDocument?: string;
    tokenBackDocument?: string;
    tokenFaceImage?: string;
    tokenOCR?: string;
    documentCaptured?: string;
    captureProgress: number;
    matchingSidesScore: number;
    rawFrontDocument?: string;
    rawBackDocument?: string;
    tokenRawFrontDocument?: string;
    tokenRawBackDocument?: string;
    lastActionBeforeCapture?: string;
}