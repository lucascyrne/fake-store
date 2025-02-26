import type { Meta, StoryObj } from '@storybook/react';
import { ProductList } from '@/components/products/product-list';
import { withNextRouter } from '../decorators/next-router-decorator';

// Componente wrapper para fornecer o contexto necessário
const ProductListWrapper = (args: any) => {
  // Aqui podemos injetar qualquer contexto ou mock necessário
  return <ProductList {...args} />;
};

const meta: Meta<typeof ProductList> = {
  title: 'Components/ProductList',
  component: ProductList,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [withNextRouter],
  render: (args) => <ProductListWrapper {...args} />,
};

export default meta;
type Story = StoryObj<typeof ProductList>;

const mockProducts = [
  {
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
  {
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
  {
    id: 3,
    title: 'Womens Cotton Jacket',
    price: 55.99,
    description: '100% Cotton, Machine wash, 100% Cotton.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    rating: {
      rate: 4.7,
      count: 500
    }
  }
];

export const Default: Story = {
  args: {
    products: mockProducts,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    products: [],
    loading: false,
  },
}; 