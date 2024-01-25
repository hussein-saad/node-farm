const http = require('http');
const fs = require('fs');

const replaceTemp = (ele, tempCard) => {
	let ret = tempCard.replace(/{%IMAGE%}/g, ele.image);
	ret = ret.replace(/{%PRODUCTNAME%}/g, ele.productName);
	ret = ret.replace(/{%ID%}/g, ele.id);
	ret = ret.replace(/{%PRICE%}/g, ele.price);
	ret = ret.replace(/{%QUANTITY%}/g, ele.quantity);
	ret = ret.replace(/{%FROM%}/g, ele.form);
	ret = ret.replace(/{%NUTRIENTS%}/g, ele.nutrients);
	ret = ret.replace(/{%DESCRIPTION%}/g, ele.description);

	if (!ele.organic) ret = ret.replace('{%NOT_ORGANIC%}', 'not-organic');
	return ret;
};

const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8',
);
const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8',
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8',
);
const fileContent = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const contentObj = JSON.parse(fileContent);

const server = http.createServer((req, res) => {
	const myURL = new URL(req.url, `http://${req.headers.host}`);
	const pathname = myURL.pathname;
	const query = myURL.searchParams;

	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		let cards = contentObj.map((ele) => replaceTemp(ele, tempCard)).join('');
		let cardsHtml = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards);

		res.end(cardsHtml);
	} else if (pathname == '/product') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		const product = contentObj[query.get('id')];

		const productHtml = replaceTemp(product, tempProduct);
	
		res.end(productHtml);
	
   } else if (pathname === '/api') {
		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		res.end(fileContent);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
		});

		res.end('<h1>Page not found<h1>');
	}
});

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
