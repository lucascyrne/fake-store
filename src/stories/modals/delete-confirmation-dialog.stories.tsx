import type { Meta, StoryObj } from '@storybook/react';
import { DeleteConfirmationDialog } from '@/components/modals/delete-confirmation-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof DeleteConfirmationDialog> = {
  title: 'Components/DeleteConfirmationDialog',
  component: DeleteConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeleteConfirmationDialog>;

// Componente wrapper para controlar o estado do diálogo
const DialogWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleConfirm = async () => {
    console.log('Produto excluído!');
    setIsOpen(false);
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setIsOpen(true)}>Abrir Diálogo</Button>
      <DeleteConfirmationDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleConfirm}
        itemName={args.itemName}
        triggerClassName={args.triggerClassName}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    itemName: 'Fjallraven - Foldsack No. 1 Backpack',
    triggerClassName: 'flex-1 flex items-center justify-center',
  },
  render: (args) => <DialogWrapper {...args} />,
}; 