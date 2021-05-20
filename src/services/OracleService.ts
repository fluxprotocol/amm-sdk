import { WalletConnection } from "near-api-js";
import { SdkConfig } from "../models/SdkConfig";
import { OracleConfig } from "../models/OracleConfig";
import { queryGraph } from "./GraphQLService";
import { DataRequest } from "../models/DataRequest";

export async function getOracleConfig(sdkConfig: SdkConfig, walletConnection: WalletConnection): Promise<OracleConfig> {
    const account = walletConnection.account();
    return account.viewFunction(sdkConfig.oracleContractId, 'get_config', {});
}

export interface GetDataRequestFilters {
    tags?: string[];
    requestor?: string;
}

export async function getDataRequest(sdkConfig: SdkConfig, filters: GetDataRequestFilters): Promise<DataRequest | undefined> {
    const response = await queryGraph(sdkConfig.oracleGraphApiUrl, {
        operationName: 'DataRequest',
        query: `
            query DataRequest($tags: [String], $requestor: String) {
                drs: getDataRequests(tags: $tags, requestor: $requestor) {
                    items {
                        finalized_outcome
                        id
                        date
                        settlement_time
                    }
                }
            }
        `,
        variables: {
            tags: filters.tags,
            requestor: filters.requestor,
        }
    });

    return response.data.drs.items[0];
}
