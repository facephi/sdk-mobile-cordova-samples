export interface CoreResult {
    /**
    * Returns the global diagnosis of the operation
    * @since 1.0.0
    */
    finishStatus: number;
    /**
    * Returns the description of the finishStatus
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
    * Indicates an additional error message if needed. It is an optional value.
    *
    * @since 1.0.0
    */
    data?: string;
}