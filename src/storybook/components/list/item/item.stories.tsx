import type { Meta, StoryObj } from '@storybook/react';


import EditionItem from '@/components/list/item/item';

const meta = {
  component: EditionItem,
//  title: 'components/list/item/Card',
} satisfies Meta<typeof EditionItem>;

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
  }
};