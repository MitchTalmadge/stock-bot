import * as Selenium from "selenium-webdriver";
import { ScraperResult } from "../models/scraper-result";

export default abstract class Scraper {

  constructor(protected driver: Selenium.WebDriver) {
  }

  public abstract canHandleUrl(url: string): boolean;

  public abstract scrape(url: string): Promise<ScraperResult>;

}