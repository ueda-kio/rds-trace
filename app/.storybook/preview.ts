import { initialize, mswDecorator } from 'msw-storybook-addon';
import '../src/styles/reset.css';
import '../src/styles/common.css';
import '../src/styles/variables.css';
import { Preview } from '@storybook/react';
import { configure } from "@storybook/testing-library";

initialize({
  serviceWorker: {
    url: `${location.pathname.replace(/[^/]*$/, '')}mockServiceWorker.js`,
  },
});

configure({ asyncUtilTimeout: 5000 });

const preview: Preview = {
  parameters: {
    // 以下バグにより動作しない
    // https://github.com/storybookjs/storybook/issues/15012
    // 修正され動作が確認できたら各storiesから`onXXX`を削除可能
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        ...{
          pc: {
            name: 'PC',
            styles: {
              width: '1920px',
              height: '1080px',
            },
          },
        },
      },
      defaultViewport: 'iphone12',
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'navy', value: 'var(--color-primary-50)' },
        { name: 'gray', value: '#F3F6FF' },
        { name: 'blue', value: '#5E7BC7' },
        { name: 'none', value: undefined },
      ],
    },
    screenshot: {
      fullPage: false,
      waitFor: 'waitForStorycap',
    },
  },
  decorators: [mswDecorator],
};

export default preview;
