import { Barion3Page } from './app.po';

describe('barion3 App', () => {
  let page: Barion3Page;

  beforeEach(() => {
    page = new Barion3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
