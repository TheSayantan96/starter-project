import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./questionnaire"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Questionnaire,
  tags: ["ai-generated"],
} satisfies Meta<typeof Questionnaire>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <Questionnaire
      className="max-w-md"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What is your role?</QuestionnaireTitle>
        <QuestionnaireDescription>
          This helps us tailor your experience.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="engineer">Engineer</QuestionnaireChoice>
          <QuestionnaireChoice value="designer">Designer</QuestionnaireChoice>
          <QuestionnaireChoice value="other">Other</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
        </QuestionnaireActions>
      </QuestionnaireItem>
      <QuestionnaireItem name="name" required>
        <QuestionnaireTitle>What&apos;s your name?</QuestionnaireTitle>
        <QuestionnaireInput placeholder="Jane Doe" />
        <QuestionnaireError />
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
        </QuestionnaireActions>
      </QuestionnaireItem>
      <QuestionnaireItem name="feedback">
        <QuestionnaireTitle>Any other feedback?</QuestionnaireTitle>
        <QuestionnaireInput placeholder="Optional" />
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </QuestionnaireItem>
    </Questionnaire>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("What is your role?")).toBeVisible()
    await expect(canvas.getByText("Question 1 of 3")).toBeVisible()
  },
}
