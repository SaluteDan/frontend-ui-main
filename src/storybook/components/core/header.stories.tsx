import type { Meta, StoryObj } from "@storybook/react";

import Header from "@/components/core/header";

export default {
  component: Header,
  argTypes: {
    walletAddress: { control: "text" },
    tokenId: { control: "text" },
    tokentier: { control: "text" },
    tokendiscount: { control: "text" },
    balance: { control: "text" },
    pointstaked: { control: "text" },
    pointsfarmed: { control: "text" },
    votecount: { control: "text" },
    networkName: { control: "text" },
    blockchainNetwork: { control: "text" },
  },
} as Meta

const Template: StoryObj<EnvironmentProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  walletAddress: process.env.NEXT_PUBLIC_ADDRESS,
  tokenId: process.env.NEXT_PUBLIC_TOKEN_ID,
  tokentier: process.env.NEXT_PUBLIC_TOKEN_TIER,
  tokendiscount: process.env.NEXT_PUBLIC_TOKEN_DISCOUNT,
  balance: process.env.NEXT_PUBLIC_ATTR_BALANCE,
  pointstaked: process.env.NEXT_PUBLIC_POINTS_STAKED,
  pointsfarmed: process.env.NEXT_PUBLIC_POINTS_MINED,
  votecount: process.env.NEXT_PUBLIC_VOTE_COUNT,
  networkName: process.env.NEXT_PUBLIC_NETWORK_NAME,
  blockchainNetwork: process.env.NEXT_PUBLIC_CHAIN,
};
