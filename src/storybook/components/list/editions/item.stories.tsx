import type { Meta, StoryObj } from '@storybook/react';
import Card from '../../../../components/list/editions/item';

export default {
  component: Card,
  argTypes: { // Define the args for your component
    edition: { control: 'text', defaultValue: 'Default Title' },
    volume: { control: 'text', defaultValue: 'Default Title' },
    image: { control: 'text', defaultValue: 'https://placehold.jp/200x200.png' },
    // Add more args as needed
  },
} as Meta;


const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
    edition: 'Default Title',
    volume: '100000',
    image: 'https://placehold.jp/200x200.png',
};