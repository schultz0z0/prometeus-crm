import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { AI_MODEL_TIERS, type AiModelTier } from 'twenty-shared/ai';
import { isDefined } from 'twenty-shared/utils';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { AiModelTierBars } from '@/ai/components/AiModelTierBars';
import { AiModelTierSlider } from '@/ai/components/AiModelTierSlider';
import { useAiModelTiers } from '@/ai/hooks/useAiModelTiers';
import { useIsWorkspaceSetupChat } from '@/ai/hooks/useIsWorkspaceSetupChat';
import { useWorkspaceAiModelTiers } from '@/ai/hooks/useWorkspaceAiModelTiers';
import { agentChatUserSelectedModelTierState } from '@/ai/states/agentChatUserSelectedModelTierState';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';

const SLIDER_DROPDOWN_WIDTH_PX = 280;

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledModelList = styled.div`
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  margin-top: ${themeCssVariables.spacing[2]};
  padding-top: ${themeCssVariables.spacing[2]};
`;

const StyledModelItem = styled.button<{ isSelected: boolean }>`
  align-items: center;
  background: ${({ isSelected }) =>
    isSelected
      ? themeCssVariables.background.transparent.secondary
      : 'transparent'};
  border: none;
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${({ isSelected }) =>
    isSelected
      ? themeCssVariables.font.color.primary
      : themeCssVariables.font.color.secondary};
  cursor: pointer;
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${({ isSelected }) =>
    isSelected
      ? themeCssVariables.font.weight.semiBold
      : themeCssVariables.font.weight.regular};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[1]} ${themeCssVariables.spacing[2]};
  text-align: left;
  width: 100%;

  &:hover {
    background: ${themeCssVariables.background.transparent.secondary};
    color: ${themeCssVariables.font.color.primary};
  }
`;

const StyledTierBadge = styled.span`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.xs};
`;

type AiModelTierDropdownProps = {
  dropdownId: string;
  disabled?: boolean;
};

export const AiModelTierDropdown = ({
  dropdownId,
  disabled = false,
}: AiModelTierDropdownProps) => {
  const { t } = useLingui();
  const tiers = useAiModelTiers();
  const { chatTier } = useWorkspaceAiModelTiers();
  const isWorkspaceSetupChat = useIsWorkspaceSetupChat();
  const [agentChatUserSelectedModelTier, setAgentChatUserSelectedModelTier] =
    useAtomState(agentChatUserSelectedModelTierState);

  // The setup chat runs on the fast tier server-side whatever the workspace
  // setting says, so the control shows what will actually answer.
  const workspaceTier: AiModelTier = isWorkspaceSetupChat ? 'fast' : chatTier;

  const selectedTier = agentChatUserSelectedModelTier ?? workspaceTier;
  const selectedResolvedTier = tiers[AI_MODEL_TIERS.indexOf(selectedTier)];

  const handleTierChange = (tier: AiModelTier) => {
    setAgentChatUserSelectedModelTier(tier === workspaceTier ? null : tier);
  };

  return (
    <Dropdown
      dropdownId={dropdownId}
      dropdownPlacement="top-end"
      dropdownOffset={{ x: 0, y: 8 }}
      clickableComponent={
        <AiModelTierBars
          selectedTier={selectedTier}
          label={
            isDefined(selectedResolvedTier.model)
              ? t`${selectedResolvedTier.label}: ${selectedResolvedTier.model.label}`
              : selectedResolvedTier.label
          }
          disabled={disabled}
        />
      }
      dropdownComponents={
        <DropdownContent widthInPixels={SLIDER_DROPDOWN_WIDTH_PX}>
          <StyledSliderContainer
            role="group"
            aria-label={t`Choose a model mode`}
          >
            <AiModelTierSlider
              selectedTier={selectedTier}
              onTierChange={handleTierChange}
              disabled={disabled}
            />
            <StyledModelList>
              {tiers.map((tItem) => {
                const isSelected = tItem.tier === selectedTier;

                return (
                  <StyledModelItem
                    key={tItem.tier}
                    isSelected={isSelected}
                    onClick={() => handleTierChange(tItem.tier)}
                    type="button"
                  >
                    <span>{tItem.model?.label ?? tItem.label}</span>
                    <StyledTierBadge>{tItem.label}</StyledTierBadge>
                  </StyledModelItem>
                );
              })}
            </StyledModelList>
          </StyledSliderContainer>
        </DropdownContent>
      }
    />
  );
};
