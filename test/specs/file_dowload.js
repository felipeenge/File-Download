import { expect, $ } from '@wdio/globals';
import * as path from 'path';
import * as fs from 'fs';

const fileName = "Nikola_Tesla.pdf"
const tesla = 'Nikola Tesla';

describe('Download Nikola Tesla pdf', () => {
    before('create downloads folder', async () => {
        if (!fs.existsSync(global.downloadDir)) {
            fs.mkdirSync(global.downloadDir);
        }
    });

    it("It will navigate to the Nikola Tesla page on Wikipedia, download the page as a PDF, and it will be deleted after the download", async () => {

        browser.maximizeWindow()

        const mainPage = $('#firstHeading');
        expect(mainPage).toBeDisplayed();


        await $('#searchInput').setValue(tesla);
        await $('.pure-button').click();


        await $('#vector-page-tools-dropdown-checkbox').click();
        await $('#coll-download-as-rl').click();


        let fileLink = await $(`[type="submit"]`);
        await expect(fileLink).toExist();


        await fileLink.click();
        let downloadedFilePath = path.join(global.downloadDir, fileName);


        await browser.waitUntil(() => {
            return fs.existsSync(downloadedFilePath);
        },);

        expect(fs.existsSync(downloadedFilePath)).toBeTruthy();
    });

    after('delete downloads folder', async () => {
        if (fs.existsSync(global.downloadDir)) {
            fs.rmSync(global.downloadDir, { recursive: true });
        }
    });
});
