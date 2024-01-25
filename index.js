const http = require('http');
const fs = require('fs');

const replaceCard = (ele, tempCard) => {
	let ret = tempCard.replace(/{%IMAGE%}/g, ele.image);
	ret = ret.replace(/{%PRODUCTNAME%}/g, ele.productName);
	ret = ret.replace(/{%ID%}/g, ele.id);
	ret = ret.replace(/{%PRICE%}/g, ele.price);
	ret = ret.replace(/{%QUANTITY%}/g, ele.quantity);
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
	const url = req.url;

	if (url === '/' || url === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		let cards = contentObj.map((ele) => replaceCard(ele, tempCard)).join('');
		let cardsHtml = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards);
		
      res.end(cardsHtml);
	
   } else if (url == '/product') {
		res.end('this is products');
	
   } else if (url === '/api') {
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
