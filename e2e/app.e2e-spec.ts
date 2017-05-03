import { TestTaskPage } from './app.po';

describe('test-task App', () => {
  let page: TestTaskPage;

  beforeEach(() => {
    page = new TestTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
