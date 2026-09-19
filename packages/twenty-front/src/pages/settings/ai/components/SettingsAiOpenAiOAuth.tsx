import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'twenty-ui/primitives/input';
import { useToast } from 'twenty-ui/primitives/feedback';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { REACT_APP_SERVER_BASE_URL } from '~/config';

const StyledContainer = styled.div`
  background: ${themeCssVariables.background.secondary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.h3`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  margin: 0;
`;

const StyledStatusBadge = styled.span`
  align-items: center;
  border-radius: 12px;
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
  gap: 6px;
  padding: 4px 10px;

  &.connected {
    background: rgba(0, 200, 100, 0.15);
    color: #00c864;
  }

  &.disconnected {
    background: ${themeCssVariables.background.tertiary};
    color: ${themeCssVariables.font.color.tertiary};
  }
`;

const StyledDescription = styled.p`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
  margin: 0;
`;

const StyledCodeBox = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border: 1px dashed ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[5]};
`;

const StyledCodeRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledUserCode = styled.code`
  background: ${themeCssVariables.background.secondary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: monospace;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 4px;
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[4]};
`;

const StyledLink = styled.a`
  color: #1e90ff;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  text-decoration: underline;
`;

const StyledSpinner = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledEmail = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
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
  const { enqueueToast } = useToast();
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
        const errorJson = await response.json().catch(() => ({}));

        throw new Error(
          errorJson.message || `Request failed with status ${response.status}`,
        );
      }

      const data = (await response.json()) as DeviceCodeResponse;

      setDeviceCode(data);
      startPolling(data.deviceCode, data.userCode, data.interval);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      enqueueToast({
        variant: 'error',
        children: t`Failed to initiate ChatGPT OAuth: ${message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = (
    code: string,
    userCode: string,
    intervalSeconds: number,
  ) => {
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
              body: JSON.stringify({ deviceCode: code, userCode }),
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
            enqueueToast({
              variant: 'success',
              children: t`ChatGPT Plus connected successfully!`,
            });
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
      enqueueToast({
        variant: 'info',
        children: t`ChatGPT disconnected`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      enqueueToast({
        variant: 'error',
        children: t`Failed to disconnect: ${message}`,
      });
    }
  };

  const handleCopyCode = () => {
    if (!deviceCode?.userCode) return;
    navigator.clipboard.writeText(deviceCode.userCode);
    enqueueToast({
      variant: 'info',
      children: t`Code copied to clipboard!`,
    });
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>OpenAI / ChatGPT Plus (OAuth)</StyledTitle>
        <StyledStatusBadge
          className={status.connected ? 'connected' : 'disconnected'}
        >
          {status.connected ? t`Connected` : t`Disconnected`}
        </StyledStatusBadge>
      </StyledHeader>

      <StyledDescription>
        {t`Connect your ChatGPT account to use OpenAI models with your Plus subscription, without requiring pay-per-token API keys.`}
      </StyledDescription>

      {status.connected && (
        <StyledActions>
          {status.email && (
            <StyledEmail>{t`Account`}: {status.email}</StyledEmail>
          )}
          <Button
            size="sm"
            variant="outline"
            color="danger"
            onClick={handleDisconnect}
          >
            {t`Disconnect`}
          </Button>
        </StyledActions>
      )}

      {!status.connected && !deviceCode && (
        <StyledActions>
          <Button
            size="sm"
            variant="solid"
            color="accent"
            onClick={handleConnect}
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? t`Connecting...` : t`Connect with ChatGPT`}
          </Button>
        </StyledActions>
      )}

      {deviceCode && isPolling && (
        <StyledCodeBox>
          <StyledDescription>
            {t`1. Open the link below and sign in with your ChatGPT Plus account:`}
          </StyledDescription>
          <StyledLink
            href={deviceCode.verificationUri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {deviceCode.verificationUri}
          </StyledLink>
          <StyledDescription>
            {t`2. Enter this 8-character confirmation code:`}
          </StyledDescription>
          <StyledCodeRow>
            <StyledUserCode>{deviceCode.userCode}</StyledUserCode>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              onClick={handleCopyCode}
            >
              {t`Copy Code`}
            </Button>
          </StyledCodeRow>
          <StyledSpinner>{t`Waiting for authorization...`}</StyledSpinner>
        </StyledCodeBox>
      )}
    </StyledContainer>
  );
};
