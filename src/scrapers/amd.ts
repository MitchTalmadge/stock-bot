import * as Selenium from 'selenium-webdriver';
import { ScraperResult } from "../models/scraper-result";
import Scraper from "./scraper";

export default class AMDScraper extends Scraper {

  public canHandleUrl(url: string): boolean {
    return url.includes("amd.com");
  }

  public async scrape(url: string): Promise<ScraperResult> {
    await this.driver.get(url);

    let inStock = false;

    try {
      const shoppingCartButton = await this.driver.findElement(Selenium.By.className('btn-shopping-cart'));
      inStock = await shoppingCartButton?.isEnabled();
    } catch (err) {
      // If no such element, it's out of stock.
      if (!(err instanceof Selenium.error.NoSuchElementError)) {
        throw err;
      }
    }

    let price = undefined;

    try {
      const priceTag = await this.driver.findElement(Selenium.By.css('.product-page-description > h4'));
      price = await priceTag?.getText();
    } catch (err) {
      if (!(err instanceof Selenium.error.NoSuchElementError)) {
        throw err;
      }
    }

    return {
      inStock,
      price
    };
  }

}