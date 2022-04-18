const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'localhost',
  database: 'itlab',
  user: 'root',
  password: ''
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     database: 'admin_itlab',
//     user: 'otgoo1995',
//     port: 3306,
//     password: 'Password1994@'
// });

const sha256 = require("js-sha256");
const jwt = require('jwt-then');

exports.brands = async (req, res) => {
    let brands = `SELECT images, brandname from brands ORDER BY RAND() LIMIT 10`;
    db.query(brands, async (err, brand) => {
        if(err) {
            throw err;
        }
        
        let category = `SELECT id, category_name from category`;
        db.query(category, async (err, categories) => {
            if(err) {
                throw err;
            }
            let featured = `SELECT p.model, p.name, c.category_name, p.image, p.sale_price, p.discount, p.id, p.type, p.remain, p.bonus_percent from featured as f inner join product as p on f.product_id = p.id inner join category as c on c.id = p.type WHERE p.remain > 0 ORDER BY RAND() DESC LIMIT 3`
            let discount = `SELECT p.model, p.name, c.category_name, p.image, p.sale_price, p.discount, p.type, p.id, p.remain, p.discount_end_time, p.bonus_percent from product as p inner join category as c on p.type = c.id WHERE discount_over = false AND discount > 0 ORDER BY RAND() DESC LIMIT 3`;
            let topRated = `SELECT p.id, p.type, c.category_name, p.model, p.name, p.sale_price, p.image, p.total_rate, p.discount, p.bonus_percent from product as p inner join category as c on p.type = c.id ORDER BY RAND() DESC LIMIT 3`
            db.query(featured, async (err, feature) => {
                if(err) {
                    throw err;
                }
                db.query(discount, async (err, d) => {
                    if(err) {
                        throw err;
                    } 
                    db.query(topRated, async (err, top) => {
                        if(err) {
                            throw err;
                        }
                        res.json({
                            brand,
                            categories,
                            featured: feature,
                            discount: d,
                            top
                        });

                    });
                });
            });
        });                                       
    });
}

exports.home = async (req, res) => {
    // var dt = new Date();
    // var d = new Date(dt.setDate(dt.getDate() - 20));
    // console.log(d.toISOString());
    let randCat = `SELECT id, category_name, image from category ORDER BY RAND() LIMIT 7`;
    let hBanner = `SELECT h.id, h.product_id, title_1, title_2, title_3, h.image, p.sale_price, p.discount, p.model from home_banner as h inner join product as p on h.product_id = p.id`;
    let cat = `SELECT id, category_name, image, icon from category ORDER BY category_name ASC`;
    let subCat = `SELECT categoryID, id, sub_category_name, specs from category_sub ORDER BY sub_category_name ASC`;
    let quick = `SELECT s.id, s.sub_category_name, q.image from category_sub as s inner join quick_category as q on s.id = q.sub_id ORDER BY RAND() LIMIT 4`;
    let featured = `SELECT p.model, p.name, p.color_name, c.category_name, p.image, p.sale_price, p.discount, p.id, p.type, p.remain, p.bonus_percent from featured as f inner join product as p on f.product_id = p.id inner join category as c on c.id = p.type WHERE p.remain > 0 ORDER BY RAND() LIMIT 8`
    let discount = `SELECT p.model, p.name, p.color_name, c.category_name, p.image, p.sale_price, p.discount, p.type, p.id, p.remain, p.discount_end_time, p.bonus_percent from product as p inner join category as c on p.type = c.id WHERE discount_over = false AND discount > 0 ORDER BY RAND() LIMIT 8`;
    let topRated = `SELECT p.id, p.type, p.color_name, c.category_name, p.model, p.name, p.sale_price, p.image, p.total_rate, p.discount, p.bonus_percent from product as p inner join category as c on p.type = c.id WHERE p.remain > 0 ORDER BY RAND() DESC LIMIT 8`
    let special = `SELECT id, image, sale_price, remain, discount, discount_end_time, bonus_percent, name, model, color_name from product WHERE id = 1`;
    let bnns = `SELECT id, title, description, image, subId from banners`;
    let ev = `SELECT id, event_name, image from events`;
    let cId = [];
    db.query(randCat, async (err, randomCategory) => {
        if(err) {
            throw err;
        }
        randomCategory.forEach(element => {
            cId.push(element.id);
        });
        
        db.query(hBanner, async (err, homeBanner) => {
            if(err) {
                throw err;
            }
            db.query(cat, async (err, category) => {
                if(err) {
                    throw err;
                }
                db.query(subCat, async (err, subCategory) => {
                    if(err) {
                        throw err;
                    }
                    db.query(quick, async (err, quickCategory) => {
                        if(err) {
                            throw err;
                        }
                        db.query(featured, async(err, featuredProduct) => {
                            if(err) {
                                throw err;
                            }
                            db.query(discount, async (err, discountProduct) => {
                                if(err) {
                                    throw err;
                                }
                                db.query(topRated, async (err, topRatedProduct) => {
                                    if (err) {
                                        throw err;
                                    }
                                    db.query(special, async (err, specialProduct) => {
                                        if(err) {
                                            throw err;
                                        }
                                        let rand = `SELECT p.type, p.id, p.name, p.model, p.color_name, p.remain, p.sale_price, p.discount, p.image, p.bonus_percent, i.big_image1, i.big_image2, i.big_image3, i.big_image4 from images as i inner join product as p on p.image_id = i.id WHERE p.remain > 0 AND p.type in (${cId}) ORDER BY RAND()`;
                                        db.query(rand, async (err, random) => {
                                            if(err) {
                                                throw err;
                                            }
                                            
                                            
                                            var topBid = [];
                                            let topBrand = `SELECT b.brandname, b.id, SUM(o.quantity) as totalQty from  order_product o inner join product as p on o.product_id = p.id inner join brands as b on p.brand = b.id GROUP BY b.id ORDER BY totalQty DESC LIMIT 3`;
                                            
                                            db.query(topBrand, async (err, topBrand) => {
                                                if(err) {
                                                    throw err;
                                                }
                                                topBrand.forEach(element => {
                                                    topBid.push(element.id);
                                                });
                                                let topProduct = `SELECT type, product.id, name, model, sale_price, discount, product.color_name, product.remain, product.image, bonus_percent, category_name from product inner join category on product.type = category.id WHERE brand in (${topBid}) ORDER BY RAND() LIMIT 24`;
                                                db.query(topProduct, async (err, topP) => {
                                                    if(err) {
                                                        throw err;
                                                    }
                                                    db.query(bnns, async (err, banners) => {
                                                        if(err) {
                                                            throw err;
                                                        }
                                                        db.query(ev, async (err, events) => {
                                                            if(err) {
                                                                throw err;
                                                            }
                                                            res.json({
                                                                category,
                                                                subCategory,
                                                                randomCategory,
                                                                homeBanner,
                                                                quickCategory,
                                                                featuredProduct,
                                                                discountProduct,
                                                                topRatedProduct,
                                                                specialProduct,
                                                                random,
                                                                topBrand,
                                                                topProduct: topP,
                                                                banners,
                                                                events
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        })
                    });
                });
            });
        });
    });
}

exports.categories = async (req, res) => {
    let cat = `SELECT id, category_name, image, icon from category ORDER BY category_name ASC`;
    let subCat = `SELECT categoryID, id, sub_category_name, specs from category_sub ORDER BY sub_category_name ASC`;
    let ev = `SELECT id, event_name, image from events`;
    db.query(cat, async (err, category) => {
        if(err) {
            throw err;
        }
        db.query(subCat, async (err, subCategory) => {
            if(err) {
                throw err;
            }
            db.query(ev, async (err, events) => {
                res.json({
                    category,
                    subCategory,
                    events
                });
            });
        });
    });    
}