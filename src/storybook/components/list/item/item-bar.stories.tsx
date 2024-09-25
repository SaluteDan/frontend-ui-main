import type { Meta, StoryObj } from '@storybook/react';

import EditionBar from '@/components/list/item/item-bar';

const meta = {
  component: EditionBar,
  argTypes: {

  }
} satisfies Meta<typeof EditionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    editionData: {
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
    collectionData: {
      royalty: 5,
      mint: {
        count: 1000,
      }
    }
  }
};  