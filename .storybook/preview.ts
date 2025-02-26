import type { Preview } from '@storybook/react'
import { withNextRouter } from '../src/stories/decorators/next-router-decorator'
import '../src/app/globals.css' // Importe os estilos globais

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [withNextRouter],
};

export default preview;