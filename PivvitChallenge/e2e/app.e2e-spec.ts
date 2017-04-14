import { PivvitChallengePage } from './app.po';

describe('pivvit-challenge App', function() {
  let page: PivvitChallengePage;

  beforeEach(() => {
    page = new PivvitChallengePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
