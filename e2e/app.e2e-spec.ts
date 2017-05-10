import { MySiteSimplePage } from './app.po';

describe('my-site-simple App', () => {
  let page: MySiteSimplePage;

  beforeEach(() => {
    page = new MySiteSimplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
