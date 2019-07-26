import { AwesomeWeatherPage } from './app.po';

describe('awesome-weather App', function() {
  let page: AwesomeWeatherPage;

  beforeEach(() => {
    page = new AwesomeWeatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
