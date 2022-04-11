import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
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
    !window.ethereum._state.initialized
  ) {
    while (!window.ethereum._state.initialized) {
      await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
      window?.location.reload();
    }
  }
};

function MetamaskProvider({ children }: { children: JSX.Element }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized: boolean) => {
        alert(isAuthorized);
        alert(networkActive);
        alert(networkError);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  }, [activateNetwork, networkActive, networkError]);

  if (isError)
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        There is an issue connecting to Metamask provider. Please try reloading
        page
      </div>
    );
  return children;
}

export default MetamaskProvider;
