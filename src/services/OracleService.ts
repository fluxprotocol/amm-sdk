import { WalletConnection } from "near-api-js";
import { SdkConfig } from "../models/SdkConfig";
import { OracleConfig } from "../models/OracleConfig";

export async function getOracleConfig(sdkConfig: SdkConfig, walletConnection: WalletConnection): Promise<OracleConfig> {
    const account = walletConnection.account();
    return account.viewFunction(sdkConfig.oracleContractId, 'get_config', {});
}
