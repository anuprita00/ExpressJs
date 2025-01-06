const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path:'admin/add-product',
        activeProduct: true,
        productCSS: true,
        formCSS:true

    })
};

exports.postAddProduct = (req, res) => {
    products.push({title: req.body.title}),
    res.redirect('/')
};

exports.getProducts = (req, res, next) => {
    // const products = adminData.products;
    res.render('shop',
        {prods: products, 
        pageTitle:'Shop', path:'/', 
        hasProduct: products.length > 0,
        activeShop: true,
    });
    
}
