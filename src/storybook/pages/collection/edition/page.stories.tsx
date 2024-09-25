import type { Meta, StoryObj } from '@storybook/react';

import Page from '../../../../app/archive/[collection]/[edition]/page';

const meta = {
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      collection: "Collection Name",
      artist: 'Artist Name',
      edition: 9999999,
      address: "0x14142525",
      description: 'This is a description of the edition item.',
      mediaURL: 'https://placehold.co/400',
      mint: {
        cost: 10,
        tier: 1,
        account: 12345,
        membership: 636043636,
        transaction: "0x14142525",
      },
      attributes: {
        attribute1: {
          name: 'Attribute Name',
          cost: 5,
          selected: 'Selected Value',
          won: true,
        },
      },
    },
    collectData: {
      royalty: 5,
      mint: {
        count: 1000,
      }
    }
  }
};

// Loading state story
export const Loading: Story = {
  args: {
    // Set the props or context to simulate a loading state
    loading: true, // Assuming `loading` is a prop your component uses
  },
};

// Error state story
export const Error: Story = {
  args: {
    // Set the props or context to simulate an error state
    error: true, // Assuming `error` is a prop your component uses
    errorMessage: 'Something went wrong.', // Example of an error message prop
  },
};