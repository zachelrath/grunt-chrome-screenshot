# grunt-chrome-screenshot

Grunt plugin for taking screenshots using headless chrome / Puppeteer

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-chrome-screenshot --save-dev
```

Once the plugin has been installed, you can load it inside your Gruntfile using

```js
grunt.loadNpmTasks('grunt-chrome-screenshot');
```

## The "chrome_screenshot" task

### Overview
In your project's Gruntfile, add a section named `chrome_screenshot` to the data object passed into `grunt.initConfig()`. Alternatively, you can use `grunt.config.set(...)` to add a configuration within your Gruntfile or Grunt task definitions.

```js
grunt.initConfig({
  chrome_screenshot: {
    desktop_shots: {
      options: {
        viewport: {
          isLandscape: true,
          width: 1024,
          height: 768,
        },
        targets: [
          {
              src: "http://localhost:4321/fixtures/main-theme.html",
              dest: "screenshots/desktop/main.png"
          },
          {
              src: "http://localhost:4321/fixtures/other-theme.html",
              dest: "screenshots/desktop/other.png",
          },
        ],
      },
    },
    mobile_shots: {
      options: {
        viewport: {
          width: 1024,
          height: 768,
          isLandscape: false,
          isMobile: true,
        },
        targets: [
          {
              src: "http://localhost:4321/fixtures/mobile-main-theme.html",
              dest: "screenshots/mobile/main.png",
          },
          {
              src: "http://localhost:4321/fixtures/mobile-new-theme.html",
              dest: "screenshots/mobile/new.png",
          },
        ],
      },
    },
  },
});
```

This plugin uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) to instrument a headless Chromium instance. To use headless Chromium in CI, you will need to follow the environment-specific [troubleshooting steps](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) in Puppeteer's documentation.

There are a few configuration parameters that you can use to configure how Chromium is invoked by Puppeteer and where a preloaded binary for Chromium is located on the host OS.

To run in Alpine, for example, you will very likely need to use the following configuration options:

```js
grunt.initConfig({
  chrome_screenshot: {
    alpine_ci_example: {
      options: {
        // Specify CLI arguments that Puppeteer should use when invoking Chromium
        chromeArgs: [
          "--disable-dev-shm-usage",
        ],
        // Specify where a preloaded Chromium binary is located
        chromeExecutable: "/usr/bin/chromium-browser",
        // Environment variables for Puppeteer to use when invoking Chromium
        env: {
          TZ: "UTC"
        },
        ...
        targets: [ ... ],
      },
    },
  },
});
```

## Contributing
ESLint is used to enforce code style - please run `npm run lint` to ensure that your changes conform to the styleguide defined by the .eslintrc.json.

There are no unit tests yet (soon, hopefully!).