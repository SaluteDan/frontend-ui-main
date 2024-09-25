import type { Meta, StoryObj } from '@storybook/react';

import PageWithProvider from './PageWithProvider';

const meta = {
  component: PageWithProvider,
} satisfies Meta<typeof PageWithProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['/', 'loading']],
      },
    },
  },
};


