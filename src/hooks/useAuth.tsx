import { useConnect, useDisconnect } from 'wagmi';

export function useAuth() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const login = (connectorId: any) => {
    const findConnector = connectors.find(
      (c) => c.id.toLowerCase() === connectorId.toLowerCase()
    );
    connect({ connector: findConnector });
  };

  const logout = () => {
    disconnect();
  };

  return {
    login,
    logout,
  };
}
