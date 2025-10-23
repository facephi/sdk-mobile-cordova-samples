/**
 * InitFlowConfiguration.
 * @interface
 */
export interface InitFlowConfiguration {
    /**
    * Property to select the OperationType of the client.
    * @property {customerId}
    * @type string
    * @since 1.0.0
    * @default: ""
    */
    customerId: string;
    flow: string;
}