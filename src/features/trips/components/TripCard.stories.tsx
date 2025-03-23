import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TripCard from './TripCard';

const meta = {
  title: 'Features/Trips/TripCard',
  component: TripCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof TripCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTrip = {
  id: '1',
  origin: 'São Paulo',
  destination: 'Rio de Janeiro',
  departureDate: '2024-03-25T10:00:00',
  price: 150,
  company: 'Express Bus',
  duration: '6h',
  availableSeats: 45
};

export const Default: Story = {
  args: {
    trip: mockTrip,
    onAddToCart: () => console.log('Add to cart clicked')
  },
}; 