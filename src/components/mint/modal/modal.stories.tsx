import type { Meta, StoryObj } from '@storybook/react';


import ConfirmationModal from './states/confimation-modal';

const meta = {
  component: ConfirmationModal,
} satisfies Meta<typeof ConfirmationModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAlertOpen: true,
    setIsAlertOpen: () => {},
    totalStake: 100,
    stakedAttributeCount: 100,
    stakeValues: 100,
    selectedOptions: 100,
    artworkData: {
      thumbnail: 'https://loremflickr.com/220/220',
      attributes: [],
      collection: 'Collection',
      artist: 'Artist',
      mint: {
        cost: 100,
        count: 100,
        limit: 100,
      },
    },
    balance: 100,
  },
};