import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { WizardStep } from '@/components/personalization/WizardStep';
import { preferenceOptions } from '@/data';

const PREFERENCE_DETAIL: Record<string, string> = {
  gym: 'Full equipment access, barbell and machines.',
  home: 'Minimal or no equipment — a room and a mat is enough.',
  outdoor: 'Parks, streets and anything else that is already outside.',
};

export default function WorkoutPreferenceScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  return (
    <WizardStep
      testID="wizard-preference"
      step={3}
      overline="Step 4 of 6"
      title="Where do you train?"
      body="We will only build sessions you can actually finish where you are."
      options={preferenceOptions.map((option) => ({
        id: option.id,
        label: option.label,
        detail: PREFERENCE_DETAIL[option.id],
      }))}
      selected={selected}
      onToggle={toggle}
      onBack={() => router.back()}
      onNext={() => router.push('/personalization/equipment')}
    />
  );
}