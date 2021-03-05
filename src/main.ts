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
  }

  private async test() {
    await this.driver.get("https://mitchtalmadge.com/");
    const title = await this.driver.getTitle();
    console.log(title);
  }

}

new StockBot();