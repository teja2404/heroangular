import { TohnewPage } from './app.po';

describe('tohnew App', () => {
  let page: TohnewPage;

  beforeEach(() => {
    page = new TohnewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
