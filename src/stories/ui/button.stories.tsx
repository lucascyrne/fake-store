import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Botão',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secundário',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Excluir',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Contorno',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Fantasma',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4 mr-2" />
        Adicionar
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Pequeno',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Grande',
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Edit className="h-4 w-4" />,
    'aria-label': 'Editar',
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Próximo
        <ArrowRight className="h-4 w-4 ml-2" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Desabilitado',
    disabled: true,
  },
}; 