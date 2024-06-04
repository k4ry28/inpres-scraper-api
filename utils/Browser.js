import puppeteer from 'puppeteer';

class Browser {
    constructor() {        
        this.browser = null;
        // For debugging try these Puppeteer Params: 
        // headless: true
        // executablePath: PathToCustomChromiumInstall 
        // devtools: true
        // slowMo: 2000
        
        // Starting the async Init flow  
        (async () => {
            const headless = process.env.NODE_ENV === 'dev' ? false : true;
            const slowDown = 0;
            const devTools = false;

            await this.Init(headless, slowDown, devTools);
        })();
    }

    async GetBrowserInstance() {
        if (this.browser === null) {
            throw new Error('Browser is not initialized yet.');
        }
        return this.browser;
    }

    async CreatePage(URL, options = { waitUntil: 'domcontentloaded' }) {
        const browser = await this.GetBrowserInstance();
        const page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.setJavaScriptEnabled(true);
        
        //skips css fonts and images for performance and efficiency
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == 'stylesheet' ){
                req.abort();
            }
            else {
                req.continue();
            }
        });

        page.on('pageerror', (err) => {
            console.error(`Page error emitted: "${err.message}"`);
        });

        page.on('response', (res) => {
            if (!res.ok()) {
                console.error(`[${res.status()}]: "${res.url()}"`);
            }
        });

        try {           
            await page.goto(URL, options);
        } catch (err) {
            await page.close();
            throw err;
        }

        return page;
    }

    async Init(HeadLess = true, SlowDown = 0, DevTools = false) {
        if (this.browser) {
            await this.ReleaseBrowser();
        }
        this.browser = await this.StartBrowser(HeadLess, SlowDown, DevTools);

        // Listen to Disconnect event, and restart.
        this.browser.on('disconnected', async () => {
            console.error('Browser Disconnected, Restarting...');
            await this.ReleaseBrowser();

            if (this.browser && this.browser.process() != null) 
                this.browser.process().kill('SIGINT');

            await this.Init();
        });
    };

    async ReleaseBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    async StartBrowser(HeadLess, SlowDown, DevTools) {
        return await puppeteer.launch({
            headless: HeadLess,
            devtools: DevTools,
            ignoreHTTPSErrors: true,
            slowMo: SlowDown,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });
    }
}

const browser = new Browser();

export default browser;
