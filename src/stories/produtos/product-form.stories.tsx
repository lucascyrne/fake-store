import type { Meta, StoryObj } from '@storybook/react';
import { ProductForm } from '@/components/products/product-form';
import { userEvent, within } from '@storybook/testing-library';
import { withNextRouter } from '../decorators/next-router-decorator';

// Componente wrapper para fornecer o contexto necessário
const ProductFormWrapper = (args: any) => {
  // Aqui podemos injetar qualquer contexto ou mock necessário
  return <ProductForm {...args} />;
};

const meta: Meta<typeof ProductForm> = {
  title: 'Components/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    withNextRouter,
    (Story) => (
      <div className="max-w-3xl mx-auto">
        <Story />
      </div>
    ),
  ],
  render: (args) => <ProductFormWrapper {...args} />,
};

export default meta;
type Story = StoryObj<typeof ProductForm>;

const mockProduct = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack',
  price: 109.95,
  description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120
  }
};

const mockCategories = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery"
];

export const Default: Story = {
  args: {
    product: mockProduct,
    categories: mockCategories,
  },
};

export const WithInteraction: Story = {
  args: {
    product: mockProduct,
    categories: mockCategories,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Encontrar e interagir com o campo de título
    const titleInput = canvas.getByLabelText(/título/i);
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Novo título do produto');
    
    // Encontrar e interagir com o campo de preço
    const priceInput = canvas.getByLabelText(/preço/i);
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '199.99');
    
    // Encontrar e interagir com o campo de descrição
    const descriptionInput = canvas.getByLabelText(/descrição/i);
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Nova descrição detalhada do produto para demonstração.');
  },
}; 