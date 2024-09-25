import type { Meta, StoryObj } from '@storybook/react';
import PageWithProvider from './PageWithProvider';

const meta: Meta<typeof PageWithProvider> = {
  component: PageWithProvider,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
