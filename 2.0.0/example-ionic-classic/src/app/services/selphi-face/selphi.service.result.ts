export interface SelphiFaceResult {
    /**
    * Returns the global diagnosis of the operation
    *
    * @since 1.0.0
    */
    finishStatus: number;
    /**
    * Returns the description of the finishStatus
    * ation
    *
    * @since 1.0.0
    */
    finishStatusDescription?: string;
    /**
    * Returns the type of error that has occurred (if there has been one, which is indicated in the `finishStatus` parameter with the value `error`)
    *
    * @since 1.0.0
    */
    errorType: string;
    /**
    * Indicates an additional error message if needed. It is an optional value.
    *
    * @since 1.0.0
    */
    errorMessage?: string;
    /**
    * Returns the user template that is generated after the extraction process.
    *
    * @since 1.0.0
    */
    template?: string;
    /**
    * Returns the raw template that is generated after the extraction process.
    *
    * @since 1.0.0
    */
    templateRaw?: string;
    /**
    * Returns the score of the probability that the user wears glasses.
    *
    * @since 1.0.0
    */
    eyeGlassesScore?: number;
    /**
    * Returns the quality score of the template.
    *
    * @since 1.0.0
    */
    templateScore?: number;
    /**
    * Devuelve los datos del código QR capturado.
    *
    * @since 1.0.0
    */
    qrData?: string;
    /**
    * If the `logImages` flag was activated in the configuration, it returns the images that are obtained during the extraction process. The images are returned sorted by the time instant in which they were obtained.
    *
    * @since 1.0.0
    */
    images?: [string];
    /**
    * Returns the best image extracted from the registration or authentication process. This image is the original size image extracted from the camera.
    *
    * @since 1.0.0
    */
    bestImage?: string;
    /**
    * Returns a cropped image centered on the user's face. This image is obtained from the "bestImage". This is the image that should be used as the characteristic image of the user who performed the registration or authentication process as 'avatar'.
    *
    * @since 1.0.0
    */
    bestImageCropped?: string;
    livenessDiagnostic?: string;
}