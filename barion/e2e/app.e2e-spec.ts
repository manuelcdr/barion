import { BarionPage } from './app.po';

describe('barion App', () => {
  let page: BarionPage;

  beforeEach(() => {
    page = new BarionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
