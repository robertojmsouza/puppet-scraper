const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://venda-imoveis.caixa.gov.br/sistema/busca-imovel.asp?sltTipoBusca=imoveis');
    await page.select("#cmb_estado", "MG");
    console.log("Selected Estado");
    await page.waitFor(3000);
    await page.select("#cmb_cidade", "4105");
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

    for (let i = 1; i <= paginacao.length; i++) {

        if (i > 1) {
            console.log("START");
            await page.$eval("#paginacao > a:nth-child("+i+")", elem => elem.click());
            console.log("END");
            await page.waitFor(3000);
        }

        console.log("Pagina: " + i);

        const lista = await page.$$("#listaimoveispaginacao ul.control-group.no-bullets");

        for (const el of lista) {
            const disputa = await el.$$("span[id]");
            console.log(disputa);
        }
    }

    /*
    await page.screenshot({
      path: "screenshot.png",
      fullPage: true
    });
    */

    await browser.close();
})();
