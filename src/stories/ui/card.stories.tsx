import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Título do Card</CardTitle>
          <CardDescription>Descrição do card com informações adicionais</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo principal do card. Aqui você pode adicionar qualquer tipo de conteúdo, como texto, imagens ou outros componentes.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    className: 'w-[350px] p-6',
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Card Simples</h3>
        <p className="text-sm text-muted-foreground">Um exemplo de card sem os componentes de cabeçalho, conteúdo e rodapé.</p>
        <Button className="w-full">Ação</Button>
      </div>
    ),
  },
}; 