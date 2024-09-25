import type { Meta, StoryObj } from '@storybook/react';

import ConfimationModal from './confimation-modal';

const meta = {
  component: ConfimationModal,
} satisfies Meta<typeof ConfimationModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAlertOpen: true,
    setIsAlertOpen: () => {},
    totalStake: 0,
    stakedAttributeCount: 0,
    stakeValues: 0,
    selectedOptions: 0,
    artworkData: {
      address: "0xdfea2b364db868b1d2601d6b833d74db4de94460",
      thumbnail: '',
      opendate: "Sep 17 2023",
      attributes: [],
      mint: {
        cost: 0,
        limit: 0,
        count: 0,
      },
    },
    balance: 0,
  },
};  