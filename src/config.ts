import Big from "big.js";
import { toToken } from "./services/TokenService";

Big.PE = 1000000;

export const DEFAULT_GRAPH_API_URL = 'https://api.flux.xyz/graphql';
export const DEFAULT_PROTOCOL_CONTRACT_ID = 'beta-amm.flux-dev';
export const DEFAULT_ORACLE_CONTRACT_ID = 'oracle.flux-dev';
export const DEFAULT_NETWORK = 'testnet';
export const NULL_CONTRACT = 'null_contract.flux-dev';
export const STORAGE_BASE = new Big('30000000000000000000000');
export const MAX_GAS = new Big('250000000000000');
export const DEFAULT_SWAP_FEE = toToken('2', 16);
export const DEFAULT_FUNGIBLE_TOKEN_CONTRACT_ID = 'wnear.flux-dev';
export const DEFAULT_SLIPPAGE = 2;
