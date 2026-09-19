import { useCallback, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { REACT_APP_SERVER_BASE_URL } from '~/config';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background: ${({ theme }) => theme.background.secondary};
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledStatusBadge = styled.span<{ connected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ connected, theme }) =>
    connected
      ? theme.color.green10 ?? 'rgba(0, 200, 100, 0.1)'
      : theme.background.tertiary};
  color: ${({ connected, theme }) =>
    connected
      ? theme.color.green ?? '#00c864'
      : theme.font.color.tertiary};
`;

const StyledDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.secondary};
  line-height: 1.5;
`;

const StyledButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: opacity 0.2s;
  align-self: flex-start;

  background: ${({ variant, theme }) =>
    variant === 'danger'
      ? theme.color.red ?? '#ff4444'
      : theme.color.blue ?? '#1e90ff'};
  color: white;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledCodeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.border.radius.md};
  background: ${({ theme }) => theme.background.primary};
  border: 1px dashed ${({ theme }) => theme.border.color.medium};
`;

const StyledUserCode = styled.code`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 4px;
  color: ${({ theme }) => theme.font.color.primary};
  font-family: monospace;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.color.blue ?? '#1e90ff'};
  text-decoration: underline;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledSpinner = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.tertiary};
`;

const StyledEmail = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.secondary};
`;

type ConnectionStatus = {
  connected: boolean;
  email?: string;
  expiresAt?: string;
};

type DeviceCodeResponse = {
  userCode: string;
  verificationUri: string;
  deviceCode: string;
  expiresIn: number;
  interval: number;
};

export const SettingsAiOpenAiOAuth = () => {
  const [status, setStatus] = useState<ConnectionStatus>({ connected: false });
  const [deviceCode, setDeviceCode] = useState<DeviceCodeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER_BASE_URL}/rest/ai/oauth/openai/status`,
        {
          credentials: 'include',
        },
      );

      if (response.ok) {
        const data = (await response.json()) as ConnectionStatus;

        setStatus(data);
      }
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${REACT_APP_SERVER_BASE_URL}/rest/ai/oauth/openai/device-code`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to get device code');
      }

      const data = (await response.json()) as DeviceCodeResponse;

      setDeviceCode(data);
      startPolling(data.deviceCode, data.interval);
    } catch (error) {
      console.error('Failed to initiate OAuth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = (code: string, intervalSeconds: number) => {
    setIsPolling(true);

    pollingRef.current = setInterval(
      async () => {
        try {
          const response = await fetch(
            `${REACT_APP_SERVER_BASE_URL}/rest/ai/oauth/openai/exchange`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ deviceCode: code }),
            },
          );

          if (!response.ok) {
            return;
          }

          const result = (await response.json()) as {
            connected: boolean;
            pending?: boolean;
          };

          if (result.connected) {
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
            }

            setIsPolling(false);
            setDeviceCode(null);
            fetchStatus();
          }
        } catch {
          // silently ignore polling errors
        }
      },
      Math.max(intervalSeconds, 5) * 1000,
    );
  };

  const handleDisconnect = async () => {
    try {
      await fetch(
        `${REACT_APP_SERVER_BASE_URL}/rest/ai/oauth/openai/disconnect`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      setStatus({ connected: false });
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>OpenAI / ChatGPT OAuth</StyledTitle>
        <StyledStatusBadge connected={status.connected}>
          {status.connected ? '● Conectado' : '○ Desconectado'}
        </StyledStatusBadge>
      </StyledHeader>

      <StyledDescription>
        Conecte sua conta do ChatGPT para usar os modelos da OpenAI consumindo o
        limite da sua assinatura (Plus/Pro/Team), sem precisar de uma API key
        paga por token.
      </StyledDescription>

      {status.connected && (
        <>
          {status.email && (
            <StyledEmail>Conta: {status.email}</StyledEmail>
          )}
          <StyledButton variant="danger" onClick={handleDisconnect}>
            Desconectar
          </StyledButton>
        </>
      )}

      {!status.connected && !deviceCode && (
        <StyledButton onClick={handleConnect} disabled={isLoading}>
          {isLoading ? 'Iniciando...' : 'Conectar com ChatGPT'}
        </StyledButton>
      )}

      {deviceCode && isPolling && (
        <StyledCodeBox>
          <StyledDescription>
            Acesse o link abaixo e cole o código de verificação:
          </StyledDescription>
          <StyledUserCode>{deviceCode.userCode}</StyledUserCode>
          <StyledLink
            href={deviceCode.verificationUri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {deviceCode.verificationUri}
          </StyledLink>
          <StyledSpinner>Aguardando autorização...</StyledSpinner>
        </StyledCodeBox>
      )}
    </StyledContainer>
  );
};
