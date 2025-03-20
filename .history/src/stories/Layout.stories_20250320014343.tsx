import type { Meta, StoryObj } from '@storybook/react';
import Layout from '../components/Layout';

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="p-4">Main content goes here</div>,
  },
};

export const WithAuthenticatedUser: Story = {
  args: {
    children: <div className="p-4">Main content goes here</div>,
  },
  parameters: {
    mockData: {
      isAuthenticated: true,
    },
  },
}; 