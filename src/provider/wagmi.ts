import { createClient, configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { rinkeby } from 'wagmi/chains';

export const CHAINS_STARGATE_TESTNET = [rinkeby];

export interface Config {
  title: string;
  connectorId: string;
  priority: number | (() => number);
  href?: string;
}

export const connectors: Config[] = [
  {
    title: 'Metamask',
    connectorId: 'Injected',
    priority: 1,
    href: `https://metamask.app.link/dapp/${
      process.env.NEXT_PUBLIC_ENV === 'prod' ? '' : 'staging.'
    }web3.jobs/`,
  },
];

export const { provider, chains } = configureChains(
  [...CHAINS_STARGATE_TESTNET],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

export const injectedConnector = new InjectedConnector({
  chains,
});

export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [injectedConnector],
});
