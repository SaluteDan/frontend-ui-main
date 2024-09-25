import type { Meta, StoryObj } from '@storybook/react';

import Item from '@/components/list/collection/item';

export default {
  component: Item,
  argTypes: { // Define the args for your component
    edition: { control: 'text', defaultValue: 'Default Title' },
    volume: { control: 'text', defaultValue: 'Default Title' },
    image: { control: 'text', defaultValue: 'https://placehold.jp/200x200.png' },
    // Add more args as needed
  },
} as Meta;


type Story = StoryObj<typeof Item>;

export const Default: Story = (args) => <Item {...args}/>;