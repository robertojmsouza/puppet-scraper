const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://venda-imoveis.caixa.gov.br/sistema/busca-imovel.asp?sltTipoBusca=imoveis');
    await page.select("#cmb_estado", "MG");
    console.log("Selected Estado");
    await page.waitFor(3000);
    await page.select("#cmb_cidade", "2803");//4105 4104 2803
    console.log("Selected Cidade");
    await page.waitFor(3000);
    await page.waitFor('#btn_next0');
    await page.click('#btn_next0')
    console.log("Click #1");
    await page.waitFor(3000);
    await page.waitFor('#btn_next1');
    await page.click('#btn_next1');
    console.log("Click #2");
    await page.waitFor(3000);

    const paginacao = await page.$$("#paginacao > a");
    await page.waitFor(2000);

    /*
    const result = await page.evaluate(() => {
        let data = []; 
        let elements = document.querySelectorAll('.product_pod');
      
        for (var element of elements){
            let title = element.childNodes[5].innerText;
            let price = element.childNodes[7].children[0].innerText;
      
            data.push({title, price});
        }
      
        return data;
    });
    */

    for (let i = 1; i <= paginacao.length; i++) {

        if (i > 1) {
            console.log("START");
            await page.$eval("#paginacao > a:nth-child("+i+")", elem => elem.click());
            console.log("END");
            await page.waitFor(3500);
        }

        console.log("Pagina: " + i);

        const lista = await page.$$("#listaimoveispaginacao ul.control-group.no-bullets");

        for (const el of lista) {
            const disputa = await el.$$("span[id]");
            console.log(disputa);
        }
    }

    await page.screenshot({
      path: "screenshot.png",
      fullPage: true
    });
    
    await browser.close();
})();