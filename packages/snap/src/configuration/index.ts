import {MetamaskState, Wallet} from "../interfaces";
import {defaultConfiguration, kusamaConfiguration, westendConfiguration} from "./predefined";
import {SnapConfig} from "@chainsafe/metamask-polkadot-types";

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case "kusama":
      console.log("Kusama configuration selected");
      return kusamaConfiguration;
    case "westend":
      console.log("Westend configuration selected");
      return westendConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(wallet: Wallet): Promise<SnapConfig> {
  const state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  }) as MetamaskState;
  if (!state || !state.polkadot.config) {
    return defaultConfiguration;
  }
  return state.polkadot.config;
}