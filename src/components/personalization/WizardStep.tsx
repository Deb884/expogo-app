import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text, Overline } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressDots } from '@/components/ui/Progress';
import { colors, spacing } from '@/constants/theme';

export type WizardOption = {
  id: string;
  label: string;
  detail?: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
};

type Props = {
  /** Wizard step index (0-based) shown as progress dots. */
  step: number;
  totalSteps?: number;
  overline: string;
  title: string;
  body?: string;
  options: readonly WizardOption[];
  selected: string[];
  /** Replaces the default tick when a card needs a different affordance. */
  renderLeading?: (option: WizardOption, selected: boolean) => React.ReactNode;
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  /** Marks the final step so the CTA can read "Finish" or "Generate plan". */
  isLast?: boolean;
  /**
   * Extra CTA guard. The continue button is disabled whenever nothing is
   * selected, so steps with a second requirement (a matching day count, say)
   * pass this to block it too.
   */
  nextDisabled?: boolean;
  /** Renders above the CTA (e.g. multi-select helper text). */
  footer?: React.ReactNode;
  testID?: string;
};

/**
 * Shared anatomy for the six Personalization wizard frames: a scroll viewport of
 * selectable option cards, progress dots, a pinned back/continue action pair.
 * Each wizard screen supplies only its own copy and option list.
 */
export function WizardStep({
  step,
  totalSteps = 6,
  overline,
  title,
  body,
  options,
  selected,
  renderLeading,
  onToggle,
  onNext,
  onBack,
  nextLabel = 'Continue',
  isLast = false,
  nextDisabled = false,
  footer,
  testID,
}: Props) {
  return (
    <Screen
      keyboardAware
      gap={spacing.lg}
      testID={testID}
      topBar={
        <View style={styles.header}>
          <ProgressDots total={totalSteps} index={step} />
        </View>
      }
      bottom={
        <View style={styles.actions}>
          {onBack ? (
            <Button
              label="Back"
              variant="secondary"
              width="half"
              onPress={onBack}
              testID="wizard-back"
            />
          ) : null}
          <Button
            label={isLast ? 'Finish' : nextLabel}
            width={onBack ? 'half' : 'block'}
            disabled={selected.length === 0 || nextDisabled}
            onPress={onNext}
            icon={
              isLast ? (
                <Feather name="check" size={18} color={colors.onAccent} />
              ) : null
            }
            testID="wizard-next"
          />
        </View>
      }
    >
      <View style={styles.copy}>
        <Overline>{overline}</Overline>
        <Text variant="h1">{title}</Text>
        {body ? (
          <Text variant="body" color={colors.textSecondary}>
            {body}
          </Text>
        ) : null}
      </View>

      <View style={styles.options}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <Card
              key={option.id}
              variant="selectable"
              selected={isSelected}
              onPress={() => onToggle(option.id)}
              style={styles.option}
              accessibilityLabel={option.label}
              testID={`wizard-${option.id}`}
            >
              {renderLeading ? (
                renderLeading(option, isSelected)
              ) : (
                <>
                  {option.icon ? (
                    <View
                      style={[styles.icon, isSelected && styles.iconSelected]}
                    >
                      <Feather
                        name={option.icon}
                        size={20}
                        color={isSelected ? colors.onAccent : colors.textSecondary}
                      />
                    </View>
                  ) : null}

                  <View style={styles.optionCopy}>
                    <Text variant="titleMd">{option.label}</Text>
                    {option.detail ? (
                      <Text variant="caption" color={colors.textSecondary}>
                        {option.detail}
                      </Text>
                    ) : null}
                  </View>

                  {isSelected ? (
                    <Feather name="check-circle" size={20} color={colors.accent} />
                  ) : null}
                </>
              )}
            </Card>
          );
        })}
      </View>

      {footer}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  copy: { gap: spacing.sm },
  options: { gap: spacing.sm },
  option: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSelected: { backgroundColor: colors.accent },
  optionCopy: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', gap: spacing.sm },
});