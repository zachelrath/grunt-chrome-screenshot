
"use strict";

const puppeteer = require("puppeteer");

module.exports = function(grunt) {

  async function init(options, done) {

    const browser = await puppeteer.launch({
      args: options.chromeArgs || [],
      executablePath: options.chromeExecutable,
      env: options.env,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const targets = options.targets;

    try {
      await Promise.all(targets.map(({
        dest,
        src,
      }) => {
        return screenshotFile(src, dest, browser, options);
      }));
    } catch (err) {
      grunt.log.error("Failed to capture screenshots of all files: ", err);
      done(false);
    }

    await browser.close();
    done();
  }

  async function screenshotFile(srcUrl, path, browser, options) {
    const page = await browser.newPage();
    const {
      type,
    } = options;

    const screenshotOptions = {
      fullPage: options.fullPage,
      omitBackground: options.omitBackground,
      path,
      type,
    };

    // Quality is only supported for jpeg
    if (type === "jpeg") {
      screenshotOptions.quality = options.quality;
    }

    await page.setViewport(options.viewport);

    grunt.verbose.writeln(`Capturing ${type} screenshot of ${srcUrl}`);

    try {
      await page.goto(srcUrl, {
        timeout: options.timeout,
        waitUntil: options.waitUntil,
      });
      await page.screenshot(screenshotOptions);
      grunt.verbose.writeln(`Wrote ${type} screenshot to ${path}`);
    } catch (err) {
      grunt.log.error(`Failed to capture screenshot at ${srcUrl}: ${err.message}`);
      return Promise.reject(`Failed to capture screenshot at ${srcUrl}: ${err.message}`);
    }
  }

  grunt.registerMultiTask("chrome_screenshot", "QUnit task for taking screenshots with headless Chrome", function() {

    const done = this.async();

    const opts = this.options({
      fullPage: false,
      omitBackground: false,
      quality: 100,
      type: "png", // jpeg, png
      viewport: {
        width: 800,
        height: 600,
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: true,
        isMobile: false,
      },
      waitUntil: "networkidle0",
    });

    if (!opts.targets.length) {
      grunt.fail.fatal("You must provide at least one screenshot target.");
      return;
    }

    init(opts, done);

  });
};