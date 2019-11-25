import detectBrowser from 'browser-detect';

const usableBrowsers = ['chrome', 'safari']; // sadly, only 2 browsers are usable at this point

export const isWebBrowserUsable = () => {
  const browser = detectBrowser();
  return usableBrowsers.includes(browser.name);
};
