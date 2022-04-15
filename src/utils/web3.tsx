import { injected } from '../provider/MetamaskProvider';
import { ETH_MAINNET_CHAIN_ID, ETH_TESTNET_CHAIN_ID } from './constants';

export async function connect(activate: any) {
  try {
    const w: any = window;

    await w.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId:
            '0x' +
            (process.env.REACT_APP_ENV === 'prod'
              ? ETH_MAINNET_CHAIN_ID
              : ETH_TESTNET_CHAIN_ID),
        },
      ],
    });

    await activate(injected);
  } catch (ex: Error | any) {
    console.log(ex);
  }
}
