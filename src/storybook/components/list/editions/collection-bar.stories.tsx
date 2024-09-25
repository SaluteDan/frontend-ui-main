import type { Meta, StoryObj } from '@storybook/react';

import CollectionBar from '../../../../components/list/editions/collection-bar';



const meta = {
  component: CollectionBar,
  argTypes: {
      collection: { control: 'text', defaultValue: 'Default Title' },
      address: { control: 'text', defaultValue: 'Default Title' },
      mint: {
        account: { control: 'number', defaultValue: 1000 },
        count: { control: 'number', defaultValue: 1000 },
        limit: { control: 'number', defaultValue: 1000 },
      },
      royalty: { control: 'number', defaultValue: 1000 },
    }
} satisfies Meta<typeof CollectionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collectionData: {
      collection: 'Default Collection',
      address: 'Default Address',
      mint: {
        account: 1000,
        count: 1000,
        limit: 1000,
      },
      royalty: 1000,
    },
  },
};