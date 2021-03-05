import * as Selenium from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";

class StockBot {

  private driver: Selenium.WebDriver;

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
      .setChromeOptions(new Options().headless().addArguments("--no-sandbox"))
      .build()
  }

  private async test() {
    await this.driver.get("https://mitchtalmadge.com/");
    const title = await this.driver.getTitle();
    console.log(title);
  }

}

new StockBot();