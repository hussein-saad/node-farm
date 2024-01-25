module.exports = (ele, tempCard) => {
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
