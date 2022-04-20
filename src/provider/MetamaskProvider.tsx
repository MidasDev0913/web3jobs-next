import { InjectedConnector } from '@web3-react/injected-connector';

declare global {
  interface windows {
    ethereum: any;
  }
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 80001],
});

// Fixes Error: "unchecked runtime.lasterror: could not establish connection. receiving end does not exist."
// that occurs on the initial page load when Metamask is installed
export const maybeFixMetamaskConnection = async () => {
  // Reloads the page after n seconds if Metamask is installed but not initialized
  const waitSeconds = 10;
  if (
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    !window?.ethereum?._state?.initialized
  ) {
    while (!window?.ethereum?._state?.initialized) {
      await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
      window?.location.reload();
    }
  }
};
