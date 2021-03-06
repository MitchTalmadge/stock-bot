import * as Selenium from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";
import Scraper from './scrapers/scraper';
import AMDScraper from './scrapers/amd';

class StockBot {

  private driver: Selenium.WebDriver;

  private scrapers: Scraper[] = [];

  constructor() {
    this.init().then(() => {
      console.log("Init Complete");

      this.test();
    }).catch(err => {
      console.error("Init Failed:", err);
    })
  }

  private async init() {
    this.driver = await new Selenium.Builder()
      .forBrowser("chrome")
      .setChromeOptions(new Options()
        .headless()
        .addArguments("--disable-blink-features=AutomationControlled")
        .addArguments("--disable-dev-shm-usage")
        .addArguments("--no-sandbox")
        .addArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36")
        .addArguments("--user-data-dir=/tmp/selenium-user-data")
        .addArguments("--window-position=0,0")
        .addArguments("--window-size=1920,1080")
      )
      .build()

    this.scrapers.push(new AMDScraper(this.driver))
  }

  private async test() {
    let urls = ["https://www.amd.com/en/direct-buy/5450881400/us", "https://www.amd.com/en/direct-buy/5450881600/us"];

    for (let url of urls) {
      const scraper = this.scrapers.find(s => s.canHandleUrl(url))
      if (scraper) {
        const result = await scraper.scrape(url);
        console.log(await this.driver.getTitle());
        if (result.inStock) {
          console.log(`✅ In Stock for ${result.price}: ${url}`)
        } else {
          console.log(`⛔ Not In Stock: ${url}`)
        }
      }
    }
  }

}

new StockBot();