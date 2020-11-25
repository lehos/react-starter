import createCache from '@emotion/cache';
import { CacheProvider, Global, css } from '@emotion/react';
import { ReactNode } from 'react';

const cache = createCache({
  key: 'my-prefix-key'
});

export const globalStyles = css`
  html {
    height: 100%;
    overflow: hidden;
  }

  body {
    font-family: Helvetica, sans-serif;
    line-height: 20px;
    font-size: 14px;
  }

  #app {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  div {
    box-sizing: border-box;
  }

  button {
    box-sizing: border-box;
    font-family: Helvetica, sans-serif;
  }
`;

type Props = {
  children: ReactNode;
};

export function StylesProvider(props: Props) {
  const { children } = props;

  return (
    <CacheProvider value={cache}>
      <Global styles={globalStyles} />
      {children}
    </CacheProvider>
  );
}
