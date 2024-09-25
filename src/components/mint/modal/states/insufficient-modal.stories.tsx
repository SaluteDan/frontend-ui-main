import type { Meta, StoryObj } from '@storybook/react';

import InsufficientModal from '@/components/mint/modal/states/insufficient-modal';

const meta = {
  component: InsufficientModal,
} satisfies Meta<typeof InsufficientModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAlertOpen: true,
    setIsAlertOpen: () => {},
  },
}; 