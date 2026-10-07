import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { WizardStep } from '@/components/personalization/WizardStep';
import { goalOptions } from '@/data';

export default function FitnessGoalScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  return (
    <WizardStep
      testID="wizard-goal"
      step={0}
      overline="Step 1 of 6"
      title="What are you training for?"
      body="Pick as many as you like. We use this to balance your plan."
      options={goalOptions}
      selected={selected}
      onToggle={toggle}
      onNext={() => router.push('/personalization/information')}
    />
  );
}