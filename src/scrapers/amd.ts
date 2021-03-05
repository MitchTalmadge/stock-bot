import Scraper from "./scraper";

export default class AMDScraper extends Scraper {

  public canHandleUrl(url: string): boolean {
    return url.includes("amd.com");
  }

  public async isInStock(url: string): Promise<boolean> {
    await this.driver.get(url);

    return false;
  }

}