const { I } = inject();
const { container } = codeceptjs;

module.exports = {
    async isVisible(loc) {
        const  playwright  = await container.helpers("Playwright");
        const elements = await Promise.all([playwright._locate(loc)]);
        const isDisplayed = (elements[0].length > 0) ? true : false;
        console.log(`${isDisplayed} -- ${JSON.stringify(loc)}`);
        return isDisplayed;
    },
    async waitForElement(loc, timeout) {
        for(let i=0; i < timeout; i++){
            try{
                await I.wait(1);
                return await this.isVisible(loc);
            }catch(e){}
        }
        return false;
    },
    async waitForUrlToUpdate(url, timeout){
        for(let i=0; i < timeout; i++) {
            const currUrl = await I.grabCurrentUrl();
            if(currUrl.includes(url)){
                return true;
            }else{
                await I.wait(1)
            }
        }
        return false;
    },
    async sleep(delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    },
    async switchToNextAvailableTab(tabNumber) {
        for (let i = 0; i < tabNumber; i++){
            let tabs = await I.grabNumberOfOpenTabs();
            if((i==1) && (tabs > tabNumber)) return;
            if (tabs != tabNumber) {
                // waiting for the next tab to open
                await I.wait(5);
            } else {
                await I.switchToNextTab();
                break;
            }
        }
    },
}