import { Barion2Page } from './app.po';

describe('barion2 App', () => {
  let page: Barion2Page;

  beforeEach(() => {
    page = new Barion2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
