import {Wallet} from "../../interfaces";
import {ApiPromise} from "@polkadot/api/";
import {getKeyPair} from "../../polkadot/account";

/**
 * Returns balance as BN
 * @param wallet
 * @param api
 * @param address
 */
export async function getBalance(wallet: Wallet, api: ApiPromise, address?: string): Promise<string> {
  if(!address) {
    address = (await getKeyPair(wallet)).address;
  }
  // eslint-disable-next-line
  const account = (await api.query.system.account(address)) as any;
  
  return account.data.free.toString();
}