import type { Meta, Story } from '@storybook/react';
import Carousel from '@/components/carousel/carousel';

export default {
  component: Carousel,
  title: 'components/carousel', // Add a title for your component
  argTypes: { // Define the args for your component
    title: { control: 'text' },
    artist: { control: 'text' },
    image: { control: 'text' },
    attributes: { control: 'text' },
    option: { control: 'text' },
    itemcount: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
        step: 1,
      }
    },
    // Add more args as needed
  },
} as Meta;

const Template: Story<CarouselProps> = (args) => <Carousel {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Default Title',
  artist: 'Default Artist',
  image: 'https://placehold.jp/200x200.png',
  attributes: 'Default Attributes',
  option: 'Default Option',
  itemcount: 4,
};
