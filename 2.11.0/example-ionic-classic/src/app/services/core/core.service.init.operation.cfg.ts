import { SdkOperationType } from "./core.service.enums";

/**
 * InitOperationConfiguration.
 * @interface
 */
export interface InitOperationConfiguration {
    /**
    * Property to select the OperationType of the client.
    * @property {SdkOperationType}
    * @since 1.0.0
    * @default: "Authentication"
    */
    type: SdkOperationType;
    /**
    * Property to select the Steps of the client.
    * @property {string[]}
    * @since 1.0.0
    * @default: []
    */
    steps?: string[];
    /**
    * Property to select the customerId of the client. It must be an unique identifier.
    * @default: ""
    * @since 1.0.0
    */
    customerId: string;
}