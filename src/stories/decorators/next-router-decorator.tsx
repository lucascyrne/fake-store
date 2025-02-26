import React from 'react';
import { Decorator } from '@storybook/react';

// Mock do useRouter do Next.js
const mockRouter = {
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  back: () => {},
  forward: () => {},
  refresh: () => {},
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
};

// Mock do usePathname do Next.js
const mockPathname = '/';

// Contexto para o router
export const RouterContext = React.createContext({
  router: mockRouter,
  pathname: mockPathname,
});

// Hook personalizado para usar no lugar de useRouter
export const useRouter = () => {
  const { router } = React.useContext(RouterContext);
  return router;
};

// Hook personalizado para usar no lugar de usePathname
export const usePathname = () => {
  const { pathname } = React.useContext(RouterContext);
  return pathname;
};

// Decorator para envolver os componentes com o contexto do router
export const withNextRouter: Decorator = (Story) => {
  return (
    <RouterContext.Provider value={{ router: mockRouter, pathname: mockPathname }}>
      <Story />
    </RouterContext.Provider>
  );
}; 