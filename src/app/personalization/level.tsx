import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { WizardStep } from '@/components/personalization/WizardStep';
import { levelOptions } from '@/data';

const LEVEL_DETAIL: Record<string, string> = {
  beginner: 'New to structured training, or returning after a long break.',
  intermediate: 'Training regularly for a few months with solid form.',
  advanced: 'Comfortable with heavy loads and structured programming.',
};

export default function FitnessLevelScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  return (
    <WizardStep
      testID="wizard-level"
      step={2}
      overline="Step 3 of 6"
      title="What is your fitness level?"
      body="This sets how hard we push and how much we rest between sets."
      options={levelOptions.map((option) => ({
        id: option.id,
        label: option.label,
        detail: LEVEL_DETAIL[option.id],
      }))}
      selected={selected}
      onToggle={toggle}
      onBack={() => router.back()}
      onNext={() => router.push('/personalization/preference')}
    />
  );
}