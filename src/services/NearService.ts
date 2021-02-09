import { connect, Near } from "near-api-js";
import { ConnectConfig } from "../models/ConnectConfig";
import { createNetworkConfig } from "../models/NetworkConfig";
import { SdkConfig } from "../models/SdkConfig";

/**
 * Connects with NEAR
 *
 * @export
 * @param {ConnectConfig} connectConfig
 * @param {SdkConfig} sdkConfig
 * @return {Promise<Near>}
 */
export async function connectNear(connectConfig: ConnectConfig, sdkConfig: SdkConfig): Promise<Near> {
    if (connectConfig.nearInstance) {
        return connectConfig.nearInstance;
    }

    const networkConfig = createNetworkConfig(connectConfig);

    return connect({
        ...networkConfig,
        deps: {
            keyStore: sdkConfig.keyStore
        },
    });
}