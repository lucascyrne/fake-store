import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '@/components/products/product-card';
import { withNextRouter } from '../decorators/next-router-decorator';

// Componente wrapper para fornecer o contexto necessário
const ProductCardWrapper = (args: any) => {
  // Aqui podemos injetar qualquer contexto ou mock necessário
  return <ProductCard {...args} />;
};

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [withNextRouter],
  render: (args) => <ProductCardWrapper {...args} />,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack',
      price: 109.95,
      description: 'Your perfect pack for everyday use and walks in the forest.',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120
      }
    },
  },
};

export const Featured: Story = {
  args: {
    product: {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      price: 22.3,
      description: 'Slim-fitting style, contrast raglan long sleeve.',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: {
        rate: 4.8,
        count: 259
      }
    },
  },
}; 