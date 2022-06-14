const { browser, element } = require("protractor")


describe('login', () => {
    
    it('should be able to sign up or login', async () =>{
        browser.get('http://localhost:4200/')
        browser.manage().window().maximize()
        console.log("HEllllloooooo")
        browser.sleep(2000)

        //expect(element(by.xpath('//button[@id="submit-btn"]')).isPresent()).toBe(true);
        element(by.xpath('//button')).click();
        browser.sleep(5000)
        '//*[@id="headingText"]/span'
        browser.getAllWindowHandles().then(function(handles) {
            var count=handles.length;
            var newWindow = handles[count-1];
            browser.switchTo().window(newWindow);
           });
        await browser.waitForAngularEnabled(false);
        element(by.xpath("//*[@id=\"identifierId\"]")).click()
        element(by.xpath("//*[@id=\"identifierId\"]")).sendKeys("kntestml@gmail.com")
        browser.sleep(50000)
        
        
    })
})