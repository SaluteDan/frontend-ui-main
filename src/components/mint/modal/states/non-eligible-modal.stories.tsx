import type { Meta, StoryObj } from '@storybook/react';

import NonEligibleModal from './non-eligible-modal';

const meta = {
  component: NonEligibleModal,
} satisfies Meta<typeof NonEligibleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAlertOpen: true
  }
};