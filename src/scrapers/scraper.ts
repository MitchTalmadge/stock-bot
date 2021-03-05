import * as Selenium from "selenium-webdriver";

export default abstract class Scraper {

  constructor(protected driver: Selenium.WebDriver) {
  }

  public abstract canHandleUrl(url: string): boolean;

  public abstract isInStock(url: string): Promise<boolean>;

}