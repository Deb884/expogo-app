import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { faqs, helpTopics } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

/** Copy shown under each topic when expanded. */
const TOPIC_DETAIL: Record<string, string> = {
  'getting-started':
    'Open My Goals from Profile, answer the six setup questions and DIV builds your first week. You can change any answer later without losing your history.',
  plans: 'Your plan balances each session so no muscle group is hit two days running. Swapping a session keeps the rest of the week untouched.',
  exercises: 'Open any exercise for step-by-step instructions, form cues and ways to scale the movement up or down.',
  tracking: 'Charts update as soon as a session is completed. Streaks count consecutive days with at least one finished session.',
  account: 'DIV has no servers. Everything you enter stays in the app on this device, and clearing the app removes it permanently.',
  contact: 'Send us a message from the form above. Support reads every report and replies within one business day.',
};

export default function HelpScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState(false);

  const needle = query.trim().toLowerCase();
  const visibleFaqs = faqs.filter(
    (faq) =>
      !needle ||
      faq.question.toLowerCase().includes(needle) ||
      faq.answer.toLowerCase().includes(needle)
  );
  const visibleTopics = helpTopics.filter(
    (topic) =>
      !needle ||
      topic.label.toLowerCase().includes(needle) ||
      topic.detail.toLowerCase().includes(needle)
  );

  const toggle = (
    current: string | null,
    id: string,
    set: (next: string | null) => void
  ) => set(current === id ? null : id);

  const canSend = draft.trim().length > 3;

  return (
    <Screen
      keyboardAware
      gap={spacing.lg}
      topBar={<TopAppBar title="Help & Support" onBack={() => router.back()} />}
    >
      <TextField
        label="Search help"
        value={query}
        onChangeText={setQuery}
        placeholder="Search articles and guides"
        autoCapitalize="none"
        action={
          query.length > 0 ? (
            <Feather name="x" size={20} color={colors.textSecondary} />
          ) : (
            <Feather name="search" size={20} color={colors.textSecondary} />
          )
        }
        onPressAction={() => setQuery('')}
      />

      <View style={styles.section}>
        <SectionHeader
          title="Topics"
          eyebrow="Guides"
          action={needle ? `${visibleTopics.length} found` : undefined}
        />
        <View style={styles.list}>
          {visibleTopics.map((topic) => {
            const open = openTopic === topic.id;

            return (
              <Card key={topic.id} style={styles.item}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  accessibilityLabel={topic.label}
                  onPress={() => toggle(openTopic, topic.id, setOpenTopic)}
                  style={styles.itemHead}
                  hitSlop={6}
                >
                  <View style={styles.itemIcon}>
                    <Feather name={topic.icon} size={18} color={colors.accent} />
                  </View>

                  <View style={styles.itemCopy}>
                    <Text variant="titleMd" numberOfLines={1}>
                      {topic.label}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} numberOfLines={2}>
                      {topic.detail}
                    </Text>
                  </View>

                  <Feather
                    name={open ? 'minus' : 'plus'}
                    size={18}
                    color={colors.accent}
                  />
                </Pressable>

                {open ? (
                  <Text variant="body" color={colors.textSecondary}>
                    {TOPIC_DETAIL[topic.id]}
                  </Text>
                ) : null}
              </Card>
            );
          })}

          {visibleTopics.length === 0 ? (
            <Text variant="body" color={colors.textSecondary} align="center">
              No topics match that search.
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="FAQ" eyebrow="Common questions" />
        <Card flush style={styles.group}>
          {visibleFaqs.map((faq, index) => {
            const open = openFaq === faq.id;

            return (
              <View
                key={faq.id}
                style={[styles.faq, index === 0 ? undefined : styles.divider]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  accessibilityLabel={faq.question}
                  onPress={() => toggle(openFaq, faq.id, setOpenFaq)}
                  style={styles.faqHead}
                  hitSlop={6}
                >
                  <Text variant="body" style={styles.faqQuestion}>
                    {faq.question}
                  </Text>
                  <Feather
                    name={open ? 'minus' : 'plus'}
                    size={18}
                    color={colors.accent}
                  />
                </Pressable>

                {open ? (
                  <Text variant="body" color={colors.textSecondary}>
                    {faq.answer}
                  </Text>
                ) : null}
              </View>
            );
          })}

          {visibleFaqs.length === 0 ? (
            <Text
              variant="body"
              color={colors.textSecondary}
              align="center"
              style={styles.emptyFaq}
            >
              No questions match that search.
            </Text>
          ) : null}
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Contact support" eyebrow="We reply fast" />
        <Card style={styles.contact}>
          {sent ? (
            <View style={styles.sent}>
              <View style={styles.sentIcon}>
                <Feather name="check" size={22} color={colors.onAccent} />
              </View>
              <Text variant="titleMd" align="center">
                Message sent
              </Text>
              <Text variant="caption" color={colors.textSecondary} align="center">
                Thanks for the detail. We will reply within one business day.
              </Text>
              <Button label="Send another" variant="secondary" onPress={() => setSent(false)} />
            </View>
          ) : (
            <>
              <TextField
                label="How can we help?"
                value={draft}
                onChangeText={setDraft}
                multiline
                placeholder="Describe what you were trying to do"
              />
              <Button
                label="Send Message"
                disabled={!canSend}
                onPress={() => {
                  setSent(true);
                  setDraft('');
                }}
                icon={
                  <Feather name="send" size={18} color={colors.onAccent} />
                }
                testID="help-send"
              />
            </>
          )}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  list: { gap: spacing.sm },
  item: { gap: spacing.md },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCopy: { flex: 1, gap: 2 },
  group: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  faq: { paddingVertical: 14, gap: 10 },
  divider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  faqHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestion: { flex: 1 },
  emptyFaq: { paddingVertical: spacing.md },
  contact: { gap: spacing.md },
  sent: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  sentIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
});