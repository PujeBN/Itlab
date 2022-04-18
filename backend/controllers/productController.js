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
const { rmSync } = require("fs");
const e = require("express");

exports.updateBonusAll = async (req, res) => {
    const { percent } = req.body;
    console.log('===============', percent);
    db.query(`UPDATE product SET bonus_percent = '${percent}'`, async (err) => {
        if(err) {
            throw err;
        }
        res.json({
            result: 'success'
        });
    });
  }

exports.mainCategory = async (req, res) => {
    const { categoryId } = req.body;
    res.json({
        categoryId
    });
}

exports.deleteSubCategory = async (req, res) => {
    const { code } = req.body;
    let q = `SELECT p.id FROM product as p inner join category_sub as c on p.category_sub_id = c.id WHERE c.sub_category_code = '${code}'`;
    db.query(q, async (err, product) => {
        if(err) {
            throw err;
        }
        if(product.length > 0) {
            res.json({
                result: 'failed'
            });
        } else {
            let d = `DELETE from category_sub WHERE sub_category_code = '${code}'`;
            db.query(d, async err => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success'
                });
            });
        }
    });
}

exports.deleteCategory = async (req, res) => {
    const { code } = req.body;
    let q = `SELECT p.id FROM product as p inner join category as c on p.type = c.id WHERE c.category_code = '${code}'`;
    db.query(q, async (err, product) => {
        if(err) {
            throw err;
        }
        if(product.length > 0) {
            res.json({
                result: 'failed'
            });
        } else {
            let d = `DELETE from category WHERE category_code = '${code}'`;
            db.query(d, async err => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success'
                });
            });
        }
    });
}


exports.deleteBrand = async (req, res) => {
    const { code } = req.body;
    let q = `SELECT p.id FROM product as p inner join brands as b on p.brand = b.id WHERE b.id = '${code}'`;
    db.query(q, async (err, product) => {
        if(err) {
            throw err;
        }
        if(product.length > 0) {
            res.json({
                result: 'failed'
            });
        } else {
            let d = `DELETE from brands WHERE id = '${code}'`;
            db.query(d, async err => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success'
                });
            });
        }
    });
}

exports.allBrand = async (req, res) => {
    db.query(`SELECT brandname, images, id from brands ORDER BY brandname`, async (err, brands) => {
        if(err) {
            throw err;
        }
        res.json({
            brands
        });
    });
}


exports.setReview = async (req, res) => {
    const { id, message, rate } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    let ch = `SELECT id from rate WHERE product_id = ${id} AND user_id = ${payload.id}`;
    db.query(ch, async (err, check) => {
        if(err) {
            throw err;
        }
        if(check.length > 0) {
            let up = `UPDATE rate SET rate = ${rate}, message = '${message}' WHERE product_id = ${id} AND user_id = ${payload.id}`;
            db.query(up, async err => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success'
                });
            });
        } else {
            let post = {product_id: id, rate, message, user_id: payload.id}
            let ins = `INSERT INTO rate  SET ?`;
            db.query(ins, post, async err => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success'
                });
            });
        }
    });
}

exports.changeColor = async (req, res) => {
    const { id } = req.body;
    let c = `SELECT color_name, remain, sale_price, discount from product WHERE id = ${id}`;
    db.query(c, async (err, product) => {
        if(err) {
            throw err;
        }
        res.json({
            product: product[0]
        });
    });
}

exports.getCart = async (req ,res) => {
    const { products } = req.body;
    var more= ''; var district = ''; var khoroo = '';
    let p = `SELECT remain, discount, bonus_percent, id from product WHERE id in(${products})`;
    db.query(p, async (err, product) => {
        if(err) {
            throw err;
        }
        res.json({
            product
        });
    });
}

exports.getAddress = async (req, res) => {
    const { coupon } = req.body;
    
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    // let a = `SELECT name, phone, email, phone2, users.khoroo, more_address, district.district from users inner join district on users.district = district.id WHERE users.id = ${payload.id}`;
    let a = `SELECT name, phone, email, phone2, khoroo, more_address, district, bonus from users WHERE id = ${payload.id}`;
    db.query(a, async (err, address) => {
        if(err) {
            throw err;
        }
        let d = `SELECT * from district`;
        db.query(d, async (err, districts) => {
            if(err) {
                throw err;
            }
            if(coupon != null) {
                let c = `SELECT amount from coupon WHERE promo_code = '${coupon}'`;
                db.query(c, async (err, promo) => {
                    if(err) {
                        throw err;
                    }
                    if(promo.length > 0) {
                        res.json({
                            address,
                            districts,
                            coupon: promo
                        });
                    } else {
                        res.json({
                            address,
                            districts,
                            coupon: null
                        });
                    }
                });
            } else {
                res.json({
                    address,
                    districts,
                    coupon
                });
            }
        });
    });
}

exports.top20 = async (req, res) => {
    let t = `SELECT SUM(op.quantity) as qty, p.id, p.model, p.name, p.type, c.category_name, p.sale_price, p.discount, p.bonus_percent, p.image, p.description, p.total_rate from orders as o inner join order_product as op on o.ordernumber = op.ordernumber inner join product as p on op.product_id = p.id inner join category as c on p.type = c.id WHERE o.status != 'pending' AND o.status != 'expired' GROUP BY p.id ORDER BY qty DESC LIMIT 20`;
    db.query(t, async (err, top) => {
        if(err) {
            throw err;
        }
        res.json({
            top
        });
    });
}

exports.showOrder = async (req, res) => {
    const { ordernumber } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    let c = `SELECT o.created_at, o.ordernumber, o.tax, o.total_amount, o.status, o.discount, o.add_bonus, o.used_bonus, o.payment, o.payment_id, o.QRCode, o.coupon from orders as o WHERE o.ordernumber = '${ordernumber}' AND o.user_id = ${payload.id} AND o.enable_is = 1`;
    db.query(c, async (err, order) => {
        if(err) {
            throw err;
        }
        let p = `SELECT o.quantity, o.amount, p.image, p.name, p.model, p.color_name, p.id from product as p inner join order_product as o on p.id = o.product_id WHERE o.ordernumber = '${ordernumber}'`;
        db.query(p, async (err, product) => {
            if(err) {
                throw err;
            }
            if(order.length > 0) {
                let coupon = 0;
                if(order[0].coupon != null && order[0].coupon != 0) {
                    let cp = `SELECT amount from coupon WHERE id = '${order[0].coupon}'`;
                    db.query(cp, async (err, result) => {
                        if(err) {
                            throw err;
                        }
                        if(result.length > 0) {
                            res.json({
                                result: 'success',
                                order, 
                                product,
                                coupon: result[0].amount
                            });
                        } else {
                            res.json({
                                result: 'success',
                                order, 
                                product,
                                coupon
                            });
                        }
                    });
                } else {
                    res.json({
                        result: 'success',
                        order, 
                        product,
                        coupon
                    });
                }
            } else {
                res.json({
                    result: 'failed'
                });
            }
        });
    });

}

exports.search = async (req, res) => {
    const { search, page, brand, color, price, sub, specs } = req.body;

    Date.prototype.subDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    const first = (page - 1) * 30;
    const last = page * 30;    
    var dt = new Date().subDays(20).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var p;
    var amount;
    if(price[1] > 0) {
        amount = `p.sale_price > ${price[0]} AND p.sale_price <= ${price[1]} AND `;
    } else {
        amount = `p.sale_price > ${price[0]} AND `;
    }
    if(brand.length > 0 && color.length) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand in (${brand}) AND p.color_name in (${col}) AND (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else if(brand.length > 0) {
        
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand in (${brand}) AND (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else if(color.length > 0) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.color_name in (${col}) AND (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else {
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    }

    if(sub.length > 0) {
        p += `AND category_sub_id in (${sub})`
    }

    if(specs != '') {
        var allId = [];
        var spQuery = `SELECT product_id from specs WHERE ${specs}`;
        db.query(spQuery, async (err, specId) => {
            if(err) {
                throw err;
            }
            specId.forEach(element => {
                allId.push(element.product_id)
            });

            if(allId.length > 0) {
                p += ` AND p.id in (${allId})`;
            } else {
                p += ` AND p.id in (0)`;
            }
            db.query(p, async (err, product) => {
                if(err) {
                    throw err;
                }
                if(product.length > 0) {
                    let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product as p inner join brands on p.brand = brands.id WHERE (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY brands.id ORDER BY brands.brandname`;
                    db.query(b, async (err, brand) => {
                        if(err) {
                            throw err;
                        }
                        let c = `SELECT color_name, COUNT(*) as total from product as p where (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                        db.query(c, async (err, color) => {
                            if(err) {
                                throw err;
                            }
                            let m = `SELECT MAX(sale_price) as max from product as p WHERE (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (remain > 0 OR updated_at > '${dt}')`;
                            db.query(m, async (err, max) => {
                                if(err) {
                                    throw err;
                                }
                                let sc = product.length % 30;
                                let f = parseInt(product.length / 30);
                                if(sc > 0) {
                                    f += 1;
                                }
        
                                let cate = `SELECT c.sub_category_name, c.id, COUNT(*) as total from category_sub as c inner join product as p on c.id = p.category_sub_id WHERE (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY c.id ORDER BY c.sub_category_name`;
                                
                                db.query(cate, async (err, sub) => {
                                    if(err) {
                                        throw err;
                                    }
                                    var subId = [];
                                    sub.forEach(el => {
                                        subId.push(el.id);
                                    });
        
                                    db.query(`SELECT specs, sub.id from category_sub as sub inner join category as c on sub.categoryID = c.id WHERE sub.id in (${subId})`, async ( err, sp ) => {
                                        if(err) {
                                            throw err;
                                        }
                                        var spcs = [], cateId = [];
                                        sp.forEach(el => {
                                            if(el.specs != null && el.specs != '') {
                                                cateId.push(el.id);
                                                el.specs.split('#').forEach(e => {
                                                    if(!spcs.includes(e)) {
                                                        spcs.push(e);
                                                    }
                                                });
                                            }
                                        });
                                        if(spcs != []) {
                                            let s = `select ${spcs} from specs as s inner join product as p on s.product_id = p.id inner join category_sub as c on p.category_sub_id = c.id WHERE c.id in (${cateId}) AND (p.remain > 0 OR p.updated_at > '${dt}')`
                                            db.query(s, async (err, specs) => {
                                                if(err) {
                                                    throw err;
                                                }
        
                                                res.json({
                                                    result: 'success',
                                                    max: max[0].max,
                                                    color,
                                                    spcs,
                                                    specs,
                                                    brand,
                                                    sub,
                                                    product: product.slice(first, last),
                                                    pagination: f
                                                });
                                            });
                                        } else {
                                            res.json({
                                                result: 'success',
                                                max: max[0].max,
                                                color,
                                                spcs,
                                                specs: [],
                                                brand,
                                                sub,
                                                product: product.slice(first, last),
                                                pagination: f
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });
                } else {
                    res.json({
                        result: 'failed'
                    });
                }
            });
        });
    } else {
        db.query(p, async (err, product) => {
            if(err) {
                throw err;
            }
            if(product.length > 0) {
                let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product as p inner join brands on p.brand = brands.id WHERE (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY brands.id ORDER BY brands.brandname`;
                db.query(b, async (err, brand) => {
                    if(err) {
                        throw err;
                    }
                    let c = `SELECT color_name, COUNT(*) as total from product as p where (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                    db.query(c, async (err, color) => {
                        if(err) {
                            throw err;
                        }
                        let m = `SELECT MAX(sale_price) as max from product as p WHERE (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (remain > 0 OR updated_at > '${dt}')`;
                        db.query(m, async (err, max) => {
                            if(err) {
                                throw err;
                            }
                            let sc = product.length % 30;
                            let f = parseInt(product.length / 30);
                            if(sc > 0) {
                                f += 1;
                            }
    
                            let cate = `SELECT c.sub_category_name, c.id, COUNT(*) as total from category_sub as c inner join product as p on c.id = p.category_sub_id WHERE (p.name LIKE '%${search}%' OR p.model LIKE '%${search}%' OR p.description LIKE '%${search}%') AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY c.id ORDER BY c.sub_category_name`;
                            
                            db.query(cate, async (err, sub) => {
                                if(err) {
                                    throw err;
                                }
                                var subId = [];
                                sub.forEach(el => {
                                    subId.push(el.id);
                                });
    
                                db.query(`SELECT specs, sub.id from category_sub as sub inner join category as c on sub.categoryID = c.id WHERE sub.id in (${subId})`, async ( err, sp ) => {
                                    if(err) {
                                        throw err;
                                    }
                                    var spcs = [], cateId = [];
                                    sp.forEach(el => {
                                        if(el.specs != null && el.specs != '') {
                                            cateId.push(el.id);
                                            el.specs.split('#').forEach(e => {
                                                if(!spcs.includes(e)) {
                                                    spcs.push(e);
                                                }
                                            });
                                        }
                                    });
                                    if(spcs != []) {
                                        let s = `select ${spcs} from specs as s inner join product as p on s.product_id = p.id inner join category_sub as c on p.category_sub_id = c.id WHERE c.id in (${cateId}) AND (p.remain > 0 OR p.updated_at > '${dt}')`
                                        db.query(s, async (err, specs) => {
                                            if(err) {
                                                throw err;
                                            }
    
                                            res.json({
                                                result: 'success',
                                                max: max[0].max,
                                                color,
                                                spcs,
                                                specs,
                                                brand,
                                                sub,
                                                product: product.slice(first, last),
                                                pagination: f
                                            });
                                        });
                                    } else {
                                        res.json({
                                            result: 'success',
                                            max: max[0].max,
                                            color,
                                            spcs,
                                            specs: [],
                                            brand,
                                            sub,
                                            product: product.slice(first, last),
                                            pagination: f
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
            } else {
                res.json({
                    result: 'failed'
                });
            }
        });
    }
    
}

exports.newArrival = async (req, res) => {
    const { page, brand, color } = req.body;
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    const first = (page - 1) * 30;
    const last = page * 30;    
    var p;
    var amount;
    var dt = new Date().addDays(40).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    // p = `SELECT p.name, p.model, p.remain, p.image, p.type, c.category_name, p.discount, p.bonus_percent, p.color_name, p.sale_price, p.id FROM product as p inner join category as c on p.type = c.id WHERE p.created_at > '${dt}'`;
    if(brand.length > 0 && color.length) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE p.brand in (${brand}) AND p.color_name in (${col}) AND p.created_at > '${dt}' AND p.remain > 0`;
    } else if(brand.length > 0) {
        
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE  p.brand in (${brand}) AND p.created_at > '${dt}' AND p.remain > 0`;
    } else if(color.length > 0) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE p.color_name in (${col}) AND p.created_at > '${dt}' AND p.remain > 0`;
    } else {
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE p.created_at > '${dt}' AND p.remain > 0`;
    }
    db.query(p, async (err, product) => {
        if(err) {
            throw err;
        }
        if(product.length > 0) {
            let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product as p inner join brands on p.brand = brands.id WHERE p.created_at > '${dt}' AND p.remain > 0 GROUP BY brands.id ORDER BY brands.brandname`;
            db.query(b, async (err, brand) => {
                if(err) {
                    throw err;
                }
                let c = `SELECT color_name, COUNT(*) as total from product as p where p.created_at > '${dt}' AND color_name != '' AND p.remain > 0 GROUP BY color_name ORDER BY color_name`;
                db.query(c, async (err, color) => {
                    if(err) {
                        throw err;
                    }
                    let m = `SELECT MAX(sale_price) as max from product as p WHERE p.created_at > '${dt}' AND p.remain > 0`;
                    db.query(m, async (err, max) => {
                        if(err) {
                            throw err;
                        }
                        let sc = product.length % 30;
                        let f = parseInt(product.length / 30);
                        if(sc > 0) {
                            f += 1;
                        }

                        res.json({
                            result: 'success',
                            color,
                            brand,
                            product: product.slice(first, last),
                            pagination: f
                        });
                    });
                });
            });
        } else {
            res.json({
                result: 'failed'
            });
        }
    });
    
}

exports.createOrder = async (req, res) => {
    const { shipping } = req.body;
    
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    var personalOrComp = 'personal';
    db.query(`SELECT id from users WHERE email = '${shipping.user.email}' AND id != ${payload.id}`, async (err, c) => {
        if(err) {
            throw err;
        }
        if(c.length > 0) {
            res.json({
                result: 'failed'
            });
        } else {
            let up_user = `UPDATE users SET phone='${shipping.user.phone}', phone2 = '${shipping.user.phone2}', email = '${shipping.user.email}', district = '${shipping.user.district}', khoroo = ${shipping.user.khoroo}, more_address = '${shipping.user.more}' WHERE id = ${payload.id}`;
            db.query(up_user, async err => {
                if(err) {
                    throw err;
                }
                let ch = `SELECT ordernumber from orders WHERE user_id = ${payload.id} AND enable_is = 0`;
                db.query(ch, async (err, check) => {
                    if(err) {
                        throw err;
                    }
                    Date.prototype.addDays = function(days) {
                        var date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    }
                    var dt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    var end_dt = new Date().addDays(3).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    
                    if(shipping.user.personal != true) {
                        personalOrComp = 'company';
                    }

                    if(check.length > 0) {
                        let up = `UPDATE orders SET created_at = '${dt}', end_at = '${end_dt}', tax = ${shipping.amount}, status = 'pending', w3w = '${shipping.w3w}', receiver = '${personalOrComp}', comp_id = '${shipping.user.register}', lat = '${shipping.lat}', lon = '${shipping.long}', name = '${shipping.user.name}' WHERE ordernumber = '${check[0].ordernumber}'`;
                        db.query(up, async err => {
                            if(err) {
                                throw err;
                            }
                            res.json({
                                result: 'success'
                            });
                        });
                    } else {
                        const invoiceId = 'PI' + Date.now() + payload.id;

                        let post = {
                            ordernumber: invoiceId, 
                            user_id: payload.id,
                            created_at: dt, 
                            end_at: end_dt,
                            tax: parseInt(shipping.amount), 
                            total_amount: 0, 
                            status: 'pending', 
                            discount: 0, 
                            add_bonus: 0, 
                            used_bonus: 0, 
                            coupon: 0, 
                            w3w: shipping.w3w,
                            payment: '', 
                            receiver: personalOrComp, 
                            comp_id: shipping.user.register, 
                            lat: shipping.lat, 
                            lon: shipping.long, 
                            enable_is: 0, 
                            name: shipping.user.name,
                            QRCode: '',
                            payment_id: '',
                            bonus: 0,
                            shipping_emp: 0
                        };

                        let i = `INSERT INTO orders SET ?`;
                        
                        db.query(i, post, async err => {
                            if(err) {
                                throw err.message;
                            }
                            res.json({
                                result: 'success'
                            });
                        });
                    }
                });
            });
        }
    });
}

exports.useCoupon = async (req , res) => {
    const { coupon } = req.body;
    let cpn = `SELECT amount from coupon WHERE promo_code = '${coupon}' AND status = 1`;
    db.query(cpn, async (err, promo) => {
        if(err) {
            throw err;
        }
        if(promo.length > 0) {
            res.json({
                result: 'success',
                promo
            });
        } else {
            res.json({
                result: 'failed'
            });
        }
    });
}

exports.subCategory = async (req, res) => {
    const { id, page, brand, color, price, spec, prms } = req.body;
    
    Date.prototype.subDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    
    const first = (page - 1) * 30;
    const last = page * 30;    
    var dt = new Date().subDays(20).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var p;
    var amount;
    if(price[1] > 0) {
        amount = `p.sale_price > ${price[0]} AND p.sale_price <= ${price[1]} AND `;
    } else {
        amount = `p.sale_price > ${price[0]} AND `;
    }
    
    if(brand.length > 0 && color.length) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.model, p.color_name, b.brandname, c.category_name, p.sale_price, p.image, p.discount, p.remain, p.description, p.category_sub_id, p.type, p.total_rate, p.bonus_percent from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand in (${brand}) AND p.color_name in (${col}) AND p.category_sub_id = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else if(brand.length > 0) {
        
        p = `SELECT p.id, p.name, p.model, p.color_name, b.brandname, c.category_name, p.sale_price, p.image, p.discount, p.remain, p.description, p.category_sub_id, p.type, p.total_rate, p.bonus_percent from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand in (${brand}) AND p.category_sub_id = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else if(color.length > 0) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `"${element}"`;
            } else {
                col = col + `, "${element}"`;
            }
        });
        p = `SELECT p.id, p.name, p.model, p.color_name, b.brandname, c.category_name, p.sale_price, p.image, p.discount, p.remain, p.description, p.category_sub_id, p.type, p.total_rate, p.bonus_percent from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.color_name in (${col}) AND p.category_sub_id = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else {
        p = `SELECT p.id, p.name, p.model, p.color_name, b.brandname, c.category_name, p.sale_price, p.image, p.discount, p.remain, p.description, p.category_sub_id, p.type, p.total_rate, p.bonus_percent from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.category_sub_id = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    }


    if(spec != '') {
        var allId = [];
        var spQuery = `SELECT product_id from specs WHERE ${spec}`;
        db.query(spQuery, async (err, specId) => {
            if(err) {
                throw err;
            }
            specId.forEach(element => {
                allId.push(element.product_id)
            });

            if(allId.length > 0) {
                p += ` AND p.id in (${allId})`;
            } else {
                p += ` AND p.id in (0)`;
            }

            db.query(p, async (err, product) => {
                if(err) {
                    throw err;
                }
                
                let c = `SELECT category.id, sub_category_name, specs, category_name from category_sub inner join category on category_sub.categoryID = category.id WHERE category_sub.id = ${id}`;
                db.query(c, async (err, ct) => {
                    if(err) {
                        throw err;
                    }
                    if(ct.length > 0) {
                        let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product inner join brands on product.brand = brands.id WHERE product.category_sub_id = ${id} AND (product.remain > 0 OR product.updated_at > '${dt}') GROUP BY brands.id ORDER BY brands.brandname`;
                        db.query(b, async (err, brand) => {
                            if(err) {
                                throw err;
                            }
                            let c = `SELECT color_name, COUNT(*) as total from product where category_sub_id = ${id} AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                            db.query(c, async (err, color) => {
                                if(err) {
                                    throw err;
                                }
                                let m = `SELECT MAX(sale_price) as max from product WHERE category_sub_id = ${id} AND (remain > 0 OR updated_at > '${dt}')`;
                                db.query(m, async (err, max) => {
                                    if(err) {
                                        throw err;
                                    }
                                    let sc = product.length % 30;
                                    let f = parseInt(product.length / 30);
                                    if(sc > 0) {
                                        f += 1;
                                    }
        
                                    if(ct[0].specs != null) {
                                        var spcs = ct[0].specs.split('#'); var changedSpecs = [];
                                        spcs.forEach((el, index) => {
                                            changedSpecs.push(el);
                                        });

                                        let s = `select ${changedSpecs} from specs as s inner join product as p on s.product_id = p.id inner join category_sub as c on p.category_sub_id = c.id WHERE c.id = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`
                                        db.query(s, async (err, specs) => {
                                            if(err) {
                                                throw err;
                                            }
                                            res.json({
                                                result: 'success',
                                                max: max[0].max,
                                                color,
                                                spcs,
                                                brand,
                                                specs,
                                                product: product.slice(first, last),
                                                pagination: f,
                                                category: ct[0]
                                            });
                                        });
                                    } else {
                                        res.json({
                                            result: 'success',
                                            max: max[0].max,
                                            color,
                                            brand,
                                            spcs: [],
                                            product: product.slice(first, last),
                                            pagination: f,
                                            category: ct[0]
                                        });
                                    }
                                });
                            });
                        });
                        
                    } else {
                        res.json({
                            result: 'failed'
                        });
                    }
                });
            });
        });
    } else {
        db.query(p, async (err, product) => {
            if(err) {
                throw err;
            }
            
            let c = `SELECT category.id, sub_category_name, specs, category_name from category_sub inner join category on category_sub.categoryID = category.id WHERE category_sub.id = ${id}`;
            db.query(c, async (err, ct) => {
                if(err) {
                    throw err;
                }
                if(ct.length > 0) {
                    let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product inner join brands on product.brand = brands.id WHERE product.category_sub_id = ${id} AND (product.remain > 0 OR product.updated_at > '${dt}') GROUP BY brands.id ORDER BY brands.brandname`;
                    db.query(b, async (err, brand) => {
                        if(err) {
                            throw err;
                        }
                        let c = `SELECT color_name, COUNT(*) as total from product where category_sub_id = ${id} AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                        db.query(c, async (err, color) => {
                            if(err) {
                                throw err;
                            }
                            let m = `SELECT MAX(sale_price) as max from product WHERE category_sub_id = ${id} AND (remain > 0 OR updated_at > '${dt}')`;
                            db.query(m, async (err, max) => {
                                if(err) {
                                    throw err;
                                }
                                let sc = product.length % 30;
                                let f = parseInt(product.length / 30);
                                if(sc > 0) {
                                    f += 1;
                                }
    
                                if(ct[0].specs != null) {
                                    var spcs = ct[0].specs.split('#'); var changedSpecs = [];
                                    spcs.forEach((el, index) => {
                                        changedSpecs.push(el);
                                    });
                                    
                                    let s = `select ${changedSpecs} from specs as s inner join product as p on s.product_id = p.id inner join category_sub as c on p.category_sub_id = c.id WHERE c.id = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`
                                    db.query(s, async (err, specs) => {
                                        if(err) {
                                            throw err;
                                        }
                                        res.json({
                                            result: 'success',
                                            max: max[0].max,
                                            color,
                                            spcs,
                                            brand,
                                            specs,
                                            product: product.slice(first, last),
                                            pagination: f,
                                            category: ct[0]
                                        });
                                    });
                                } else {
                                    res.json({
                                        result: 'success',
                                        max: max[0].max,
                                        color,
                                        brand,
                                        spcs: [],
                                        product: product.slice(first, last),
                                        pagination: f,
                                        category: ct[0]
                                    });
                                }
                            });
                        });
                    });
                    
                } else {
                    res.json({
                        result: 'failed'
                    });
                }
            });
        });
    }
}



exports.removeFavourite = async (req, res) => {
    const { id } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    let p = `DELETE from favourite WHERE product_id = ${id} AND user_id = ${payload.id}`;
    db.query(p, async (err) => {
        if(err) {
            throw err;
        }
        res.json({
            result: 'success'
        });
    });
}

exports.addFavourites = async (req, res) => {
    const { id } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    let ch = `SELECT COUNT(*) as total FROM favourite WHERE user_id = ${payload.id}`;
    db.query(ch, async (err, check) => {
        if(err) {
            throw err;
        }
        console.log(check);
        if(check[0].total < 5) {
            let c2 = `SELECT id from favourite WHERE product_id = ${id}`;
            db.query(c2, async (err, check2) => {
                if(err) {
                    throw err;
                }
                if(check2.length > 0) {
                    res.json({
                        result: 'success',
                    });
                } else {
                    let post = {product_id: id, user_id: payload.id}
                    let i = `INSERT INTO favourite SET ?`;
                    db.query(i, post, async err => {
                        if(err) {
                            throw err;
                        }
                        res.json({
                            result: 'success'
                        });
                    });
                }
            })
        } else {
            res.json({
                result: 'failed'
            });
        }
    });
}

exports.getProductImage = async (req, res) => {
    db.query(`SELECT p.enc_model, p.image, i.big_image1, i.big_image2, i.big_image3, i.big_image4 from product as p inner join images as i on p.image_id = i.id`, async (err, product) => {
        if(err) {
            throw err;
        }
        res.json({
            result: 'success',
            product
        });
    });
}

exports.compare = async (req, res) => {
    const { id } = req.body;
    let specs = [];
    let p = `SELECT p.color_name, p.sale_price, p.discount, p.bonus_percent, p.remain, b.brandname, p.model, p.image, p.total_rate, p.name, p.id from product as p inner join brands as b on p.brand = b.id WHERE p.id in(${id})`;
    db.query(p, async (err, product) => {
        if(err) {
            throw err;
        }
        let s = `SELECT specs from product inner join category_sub on product.category_sub_id = category_sub.id WHERE product.id in (${id})`;
        db.query(s, async (err, spec) => {
            if(err) {
                throw err;
            }
            spec.forEach(element => {
                if(element.specs != null) {
                    let col = element.specs.split('#');
                    col.forEach(el => {
                        let ex = specs.some(function(field) {
                            return field == el
                        });
                        if(!ex) {
                            specs.push(el);
                        }
                    });
                }
            });
            if(specs != '') {
                let sp = `SELECT ${specs}, product_id from specs where product_id in (${id})`;
                db.query(sp, async (err, result) => {
                    if(err) {
                        throw err;
                    }
                    res.json({
                        product,
                        specs,
                        sp: result
                    });
                });
            } else {
                res.json({
                    product,
                    specs,
                    sp: []
                });
            }
            
            
            // db.query(sp, async (err, result) => {
            //     if(err) {
            //         throw err;
            //     }
            //     res.json({
            //         product,
            //         specs,
            //         sp: result
            //     });
            // });
        });
    });
}

exports.trend = async (req, res) => {
    let c = `SELECT c.id, c.sub_category_name, SUM(op.quantity) as qty from order_product as op inner join product as p on op.product_id = p.id inner join category_sub as c on c.id = p.category_sub_id GROUP BY c.id ORDER BY qty DESC LIMIT 3`;
    db.query(c, async (err, category) => {
        if(err) {
            throw err;
        }
        let ids = []; q = '';
        category.forEach(element => {
            if(q == '') {
                q += `(SELECT p.id, p.name, p.model, p.category_sub_id, p.sale_price, c.category_name, p.type, p.image, p.discount, p.bonus_percent, p.color_name, p.remain, SUM(op.quantity) as qty FROM order_product as op inner join product as p on op.product_id = p.id inner join category as c on p.type = c.id WHERE p.category_sub_id = ${element.id} GROUP BY p.id ORDER BY qty DESC LIMIT 10)`
            } else {
                q += ` UNION (SELECT p.id, p.name, p.model, p.category_sub_id, p.sale_price, c.category_name, p.type, p.image, p.discount, p.bonus_percent, p.color_name, p.remain, SUM(op.quantity) as qty FROM order_product as op inner join product as p on op.product_id = p.id inner join category as c on p.type = c.id WHERE p.category_sub_id = ${element.id} GROUP BY p.id ORDER BY qty DESC LIMIT 10)`
            }
        });
        db.query(q, async (err, product) => {
            if (err) {
                throw err;
            }
            res.json({
                category,
                product
            })
        });
    });
}


exports.Brands = async (req, res) => {
    const { id, page, color, price, type } = req.body;
    Date.prototype.subDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }

    const first = (page - 1) * 30;
    const last = page * 30;    
    var dt = new Date().subDays(20).toISOString().replace(/T/, ' ').replace(/\..+/, '');

    var p;
    var amount;
    var t = ''; 
    

    if(price[1] > 0) {
        amount = `p.sale_price > ${price[0]} AND p.sale_price <= ${price[1]} AND `;
    } else {
        amount = `p.sale_price > ${price[0]} AND `;
    }

    if(type.length > 0) {
        t = `AND p.category_sub_id in (${type})`;
    }

    if(color.length > 0) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.color_name in (${col}) AND p.brand = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}') ${t}`;
    } else {
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}') ${t}`;
    }


    db.query(p, async (err, product) => {
        if(err) {
            throw err;
        }
        let b = `SELECT id, brandname, images, bg from brands WHERE id = ${id}`;
        db.query(b, async (err, brs) => {
            if(err) {
                throw err;
            }
            if(brs.length > 0) {
                let c = `SELECT color_name, COUNT(*) as total from product as p where brand = ${id} AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                    db.query(c, async (err, color) => {
                        if(err) {
                            throw err;
                        }
                        let m = `SELECT MAX(sale_price) as max from product as p WHERE brand = ${id} AND (remain > 0 OR updated_at > '${dt}') ${t}`;
                        
                        db.query(m, async (err, max) => {
                            if(err) {
                                throw err;
                            }

                            let cate = `SELECT c.id, c.sub_category_name, COUNT(*) as total from product as p inner join category_sub as c on p.category_sub_id = c.id WHERE p.brand = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY c.id ORDER BY c.sub_category_name`;
                            db.query(cate, async (err, category) => {
                                if(err) {
                                    throw err;
                                }
                                let sc = product.length % 30;
                                let f = parseInt(product.length / 30);
                                if(sc > 0) {
                                    f += 1;
                                }
                                
                                res.json({
                                    result: 'success',
                                    max: max[0].max,
                                    color,
                                    product: product.slice(first, last),
                                    pagination: f,
                                    brand: brs[0],
                                    category
                                });
                            });
                            
                        });
                    });
            } else {
                res.json({
                    result: 'failed'
                });
            }
        });
    });
}

exports.Event = async (req, res) => {
    const { id,  page, brand, color, price } = req.body;
    const first = (page - 1) * 30;
    const last = page * 30;
    var p;
    var amount;

    let ch = `SELECT productId from event_product WHERE eventId = ${id}`;
    db.query(ch, async (err, Ids) => {
        if(err) {
            throw err;
        }
        if(price[1] > 0) {
            amount = `p.sale_price > ${price[0]} AND p.sale_price <= ${price[1]} `;
        } else {
            amount = `p.sale_price > ${price[0]} `;
        }
        if(Ids.length > 0) {
            var pIds = [];
            Ids.forEach(element => {
                pIds.push(element.productId);
            });
            
            if(brand.length > 0 && color.length) {
                var col = '';
                color.forEach(element => {
                    if(col == '') {
                        col = `'${element}'`;
                    } else {
                        col = col + `, '${element}'`;
                    }
                });
                p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} AND p.brand in (${brand}) AND p.color_name in (${col}) AND p.id in (${pIds})`;
            } else if(brand.length > 0) {
                p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} AND p.id in (${pIds}) AND p.brand in (${brand})`;
            } else if(color.length > 0) {
                var col = '';
                color.forEach(element => {
                    if(col == '') {
                        col = `'${element}'`;
                    } else {
                        col = col + `, '${element}'`;
                    }
                });
                p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} AND p.color_name in (${col}) AND p.id in (${pIds})`;
            } else {
                p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} AND p.id in (${pIds})`;
            }

            db.query(p, async (err, product) => {
                if(err) {
                    throw err;
                }
                let c = `SELECT id, event_name, image from events WHERE id = ${id}`;
                db.query(c, async (err, ct) => {
                    if(err) {
                        throw err;
                    }
                    if(ct.length > 0) {
                        let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product inner join brands on product.brand = brands.id WHERE product.id in (${pIds}) GROUP BY brands.id ORDER BY brands.brandname`;
                        db.query(b, async (err, brand) => {
                            if(err) {
                                throw err;
                            }
                            let c = `SELECT color_name, COUNT(*) as total from product where id in (${pIds}) AND color_name != '' GROUP BY color_name ORDER BY color_name`;
                            db.query(c, async (err, color) => {
                                if(err) {
                                    throw err;
                                }
                                let m = `SELECT MAX(sale_price) as max from product WHERE id in (${pIds})`;
                                db.query(m, async (err, max) => {
                                    if(err) {
                                        throw err;
                                    }
                                    let sc = product.length % 30;
                                    let f = parseInt(product.length / 30);
                                    if(sc > 0) {
                                        f += 1;
                                    }
            
                                    res.json({
                                        result: 'success',
                                        max: max[0].max,
                                        color,
                                        brand,
                                        product: product.slice(first, last),
                                        pagination: f,
                                        event: ct[0]
                                    });
                                });
                            });
                        });
                        
                    } else {
                        res.json({
                            result: 'failed'
                        });
                    }
                });
            });
        } else {
            res.json({
                result: 'failed'
            });
        }

    });
}


exports.Category = async (req, res) => {
    const { id, page, brand, color, price, sub, specs } = req.body;
    
    Date.prototype.subDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    const first = (page - 1) * 30;
    const last = page * 30;    
    var dt = new Date().subDays(20).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var p;
    var amount;
    if(price[1] > 0) {
        amount = `p.sale_price > ${price[0]} AND p.sale_price <= ${price[1]} AND `;
    } else {
        amount = `p.sale_price > ${price[0]} AND `;
    }
    
    if(brand.length > 0 && color.length) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, sub.specs, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand in (${brand}) AND p.color_name in (${col}) AND p.type = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else if(brand.length > 0) {
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, sub.specs, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.brand in (${brand}) AND p.type = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else if(color.length > 0) {
        var col = '';
        color.forEach(element => {
            if(col == '') {
                col = `'${element}'`;
            } else {
                col = col + `, '${element}'`;
            }
        });
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.color_name in (${col}) AND p.type = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    } else {
        p = `SELECT p.id, p.name, p.category_sub_id, p.model, p.color_name, b.brandname, sub.sub_category_name, p.sale_price, p.image, p.discount, p.description, p.type, p.total_rate, p.bonus_percent, p.remain from brands as b inner join product as p on b.id = p.brand inner join category_sub as sub on p.category_sub_id = sub.id inner join category as c on sub.categoryID = c.id WHERE ${amount} p.type = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}')`;
    }

    if(sub.length > 0) {
        p += ` AND category_sub_id in (${sub})`
    }

    if(specs != '') {
        var allId = [];
        var spQuery = `SELECT product_id from specs WHERE ${specs}`;
        db.query(spQuery, async (err, specId) => {
            if(err) {
                throw err;
            }
            specId.forEach(element => {
                allId.push(element.product_id)
            });

            if(allId.length > 0) {
                p += ` AND p.id in (${allId})`;
            } else {
                p += ` AND p.id in (0)`;
            }

            db.query(p, async (err, product) => {
                if(err) {
                    throw err;
                }
                let c = `SELECT id, category_name from category WHERE id = ${id}`;
                db.query(c, async (err, ct) => {
                    if(err) {
                        throw err;
                    }
                    if(ct.length > 0) {
                        let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product inner join brands on product.brand = brands.id WHERE product.type = ${id} AND (product.remain > 0 OR product.updated_at > '${dt}') GROUP BY brands.id ORDER BY brands.brandname`;
                        db.query(b, async (err, brand) => {
                            if(err) {
                                throw err;
                            }
                            let c = `SELECT color_name, COUNT(*) as total from product where type = ${id} AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                            db.query(c, async (err, color) => {
                                if(err) {
                                    throw err;
                                }
                                let m = `SELECT MAX(sale_price) as max from product WHERE type = ${id} AND (remain > 0 OR updated_at > '${dt}')`;
                                db.query(m, async (err, max) => {
                                    if(err) {
                                        throw err;
                                    }
                                    let sc = product.length % 30;
                                    let f = parseInt(product.length / 30);
                                    if(sc > 0) {
                                        f += 1;
                                    }
                                    
                                    db.query(`SELECT c.sub_category_name, c.id, COUNT(*) as total from category_sub as c inner join product as p on c.id = p.category_sub_id WHERE c.categoryID = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY c.id ORDER BY c.sub_category_name`, async (err, sub) => {
                                        if(err) {
                                            throw err;
                                        }
        
                                        db.query(`SELECT specs, sub.id from category_sub as sub inner join category as c on sub.categoryID = c.id WHERE c.id = ${id}`, async ( err, sp ) => {
                                            if(err) {
                                                throw err;
                                            }
                                            var spcs = [], cateId = [];
                                            sp.forEach(el => {
                                                if(el.specs != null && el.specs != '') {
                                                    cateId.push(el.id);
                                                    el.specs.split('#').forEach(e => {
                                                        if(!spcs.includes(e)) {
                                                            spcs.push(e);
                                                        }
                                                    });
                                                }
                                            });
                                            if(spcs != []) {
                                                let s = `select ${spcs} from specs as s inner join product as p on s.product_id = p.id inner join category_sub as c on p.category_sub_id = c.id WHERE c.id in (${cateId}) AND (p.remain > 0 OR p.updated_at > '${dt}')`
                                                db.query(s, async (err, specs) => {
                                                    if(err) {
                                                        throw err;
                                                    }
                                                    res.json({
                                                        result: 'success',
                                                        max: max[0].max,
                                                        color,
                                                        spcs,
                                                        specs,
                                                        sub,
                                                        brand,
                                                        product: product.slice(first, last),
                                                        pagination: f,
                                                        category: ct[0].category_name
                                                    });
                                                });
                                            } else {
                                                res.json({
                                                    result: 'success',
                                                    max: max[0].max,
                                                    color,
                                                    spcs,
                                                    specs: [],
                                                    sub,
                                                    brand,
                                                    product: product.slice(first, last),
                                                    pagination: f,
                                                    category: ct[0].category_name
                                                });
                                            }
                                        });
                                    });
            
                                });
                            });
                        });
                        
                    } else {
                        res.json({
                            result: 'failed'
                        });
                    }
                });
            });
            
        });
    } else {
        db.query(p, async (err, product) => {
            if(err) {
                throw err;
            }
            let c = `SELECT id, category_name from category WHERE id = ${id}`;
            db.query(c, async (err, ct) => {
                if(err) {
                    throw err;
                }
                if(ct.length > 0) {
                    let b = `SELECT brands.id, brands.brandname, COUNT(*) as total from product inner join brands on product.brand = brands.id WHERE product.type = ${id} AND (product.remain > 0 OR product.updated_at > '${dt}') GROUP BY brands.id ORDER BY brands.brandname`;
                    db.query(b, async (err, brand) => {
                        if(err) {
                            throw err;
                        }
                        let c = `SELECT color_name, COUNT(*) as total from product where type = ${id} AND color_name != '' AND (remain > 0 OR updated_at > '${dt}') GROUP BY color_name ORDER BY color_name`;
                        db.query(c, async (err, color) => {
                            if(err) {
                                throw err;
                            }
                            let m = `SELECT MAX(sale_price) as max from product WHERE type = ${id} AND (remain > 0 OR updated_at > '${dt}')`;
                            db.query(m, async (err, max) => {
                                if(err) {
                                    throw err;
                                }
                                let sc = product.length % 30;
                                let f = parseInt(product.length / 30);
                                if(sc > 0) {
                                    f += 1;
                                }
                                
                                db.query(`SELECT c.sub_category_name, c.id, COUNT(*) as total from category_sub as c inner join product as p on c.id = p.category_sub_id WHERE c.categoryID = ${id} AND (p.remain > 0 OR p.updated_at > '${dt}') GROUP BY c.id ORDER BY c.sub_category_name`, async (err, sub) => {
                                    if(err) {
                                        throw err;
                                    }
    
                                    db.query(`SELECT specs, sub.id from category_sub as sub inner join category as c on sub.categoryID = c.id WHERE c.id = ${id}`, async ( err, sp ) => {
                                        if(err) {
                                            throw err;
                                        }
                                        var spcs = [], cateId = [];
                                        sp.forEach(el => {
                                            if(el.specs != null && el.specs != '') {
                                                cateId.push(el.id);
                                                el.specs.split('#').forEach(e => {
                                                    if(!spcs.includes(e)) {
                                                        spcs.push(e);
                                                    }
                                                });
                                            }
                                        });
                                        if(spcs != []) {
                                            let s = `select ${spcs} from specs as s inner join product as p on s.product_id = p.id inner join category_sub as c on p.category_sub_id = c.id WHERE c.id in (${cateId}) AND (p.remain > 0 OR p.updated_at > '${dt}')`
                                            db.query(s, async (err, specs) => {
                                                if(err) {
                                                    throw err;
                                                }
                                                res.json({
                                                    result: 'success',
                                                    max: max[0].max,
                                                    color,
                                                    spcs,
                                                    specs,
                                                    sub,
                                                    brand,
                                                    product: product.slice(first, last),
                                                    pagination: f,
                                                    category: ct[0].category_name
                                                });
                                            });
                                        } else {
                                            res.json({
                                                result: 'success',
                                                max: max[0].max,
                                                color,
                                                spcs,
                                                specs: [],
                                                sub,
                                                brand,
                                                product: product.slice(first, last),
                                                pagination: f,
                                                category: ct[0].category_name
                                            });
                                        }
                                    });
                                });
        
                            });
                        });
                    });
                    
                } else {
                    res.json({
                        result: 'failed'
                    });
                }
            });
        });
    }
}

exports.SingleProduct = async (req, res) => {
    const { id } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token == 'null');
    // const payload = await jwt.verify(token, 'HS256');

    if(id == 1) {
        var my_review = 0;
        let singleQuery = `SELECT p.name, sub.sub_category_name, c.category_name, p.sale_price, p.id, p.model, p.discount, p.type, p.category_sub_id, p.remain, p.total_rate, p.color_name, b.brandname, b.images, p.image, sub.specs, p.bonus_percent from 
                    brands as b inner join product as p on b.id = p.brand 
                    inner join category_sub as sub on p.category_sub_id = sub.id
                    inner join category as c on sub.categoryID = c.id WHERE p.id = ${id} AND discount_end_time > NOW()`;
        db.query(singleQuery, async (err, single) => {
            if(err) {
                throw err;
            }
            
            if(single.length > 0) {
                let img = `SELECT big_image1, big_image2, big_image3, big_image4, title1, title2, title3, title4, title5, title6, desc1, desc2, desc3, desc4, desc5, desc6 from product inner join images on product.image_id = images.id WHERE product.id = ${id}`;
                db.query(img, async (err, images) => {
                    if(err) {
                        throw err;
                    }
                    let other = `SELECT color_name, id, image from product WHERE id != ${single[0].id} AND model = '${single[0].model}'`;
                    db.query(other, async (err, others) => {
                        if(err) {
                            throw err;
                        }
                        let rel = `SELECT model, name, discount, image, id, sale_price, bonus_percent, remain, color_name from product WHERE category_sub_id = ${single[0].category_sub_id} AND remain > 0 ORDER BY RAND() LIMIT 6`;
                        db.query(rel, async (err, related) => {
                            if(err) {
                                throw err;
                            }
                            let reviews = `SELECT u.name, r.message, r.rate, user_id, r.created_at from rate as r inner join users u on r.user_id = u.id WHERE product_id = ${id} ORDER BY RAND()`;
                            db.query(reviews, async (err, review) => {
                                if(err) {
                                    throw err;
                                }
                                if(token == 'null') {
                                    if(single[0].specs != null) {
                                        let spec = `SELECT ${single[0].specs.split('#')} from specs WHERE product_id = ${id}`;
                                        db.query(spec, async (err, specs) => {
                                            if(err) {
                                                throw err;
                                            }
                                            res.json({
                                                result: 'success',
                                                single,
                                                images,
                                                others,
                                                specs,
                                                review,
                                                my_review,
                                                related
                                            });
                                        });
                                    } else {
                                        res.json({
                                            result: 'success',
                                            single,
                                            images,
                                            others,
                                            specs: null,
                                            review,
                                            my_review,
                                            related
                                        });
                                    }
                                } else {
                                    const payload = await jwt.verify(token, 'HS256');
                                    let sel = `SELECT rate from rate WHERE user_id = ${payload.id} AND product_id = ${id}`;
                                    db.query(sel, async (err, r) => {
                                        if(err) {
                                            throw err;
                                        }
                                        if(r.length > 0) {
                                            my_review = r[0].rate;
                                        }

                                        if(single[0].specs != null) {
                                            let spec = `SELECT ${single[0].specs.split('#')} from specs WHERE product_id = ${id}`;
                                            db.query(spec, async (err, specs) => {
                                                res.json({
                                                    result: 'success',
                                                    single,
                                                    images,
                                                    others,
                                                    specs,
                                                    review,
                                                    my_review,
                                                    related
                                                });
                                            });
                                        } else {
                                            res.json({
                                                result: 'success',
                                                single,
                                                images,
                                                others,
                                                specs: null,
                                                review,
                                                my_review,
                                                related
                                            });
                                        }
                                    });
                                }
                            });
                        })
                    });
                });
            } else {
                res.json({
                    result: 'failed'
                });
            }
        });
    } else {
        var my_review = 0;
        let singleQuery = `SELECT p.name, sub.sub_category_name, c.category_name, p.sale_price, p.id, p.model, p.discount, p.type, p.category_sub_id, p.remain, p.total_rate, p.color_name, b.brandname, b.images, p.image, sub.specs, p.bonus_percent from 
                    brands as b inner join product as p on b.id = p.brand 
                    inner join category_sub as sub on p.category_sub_id = sub.id
                    inner join category as c on sub.categoryID = c.id WHERE p.id = ${id}`;
        db.query(singleQuery, async (err, single) => {
            if(err) {
                throw err;
            }
            
            if(single.length > 0) {
                let img = `SELECT big_image1, big_image2, big_image3, big_image4, title1, title2, title3, title4, title5, title6, desc1, desc2, desc3, desc4, desc5, desc6 from product inner join images on product.image_id = images.id WHERE product.id = ${id}`;
                db.query(img, async (err, images) => {
                    if(err) {
                        throw err;
                    }
                    let other = `SELECT color_name, id, image from product WHERE id != ${single[0].id} AND model = '${single[0].model}'`;
                    db.query(other, async (err, others) => {
                        if(err) {
                            throw err;
                        }
                        let rel = `SELECT model, name, discount, image, id, sale_price, bonus_percent, remain, color_name from product WHERE category_sub_id = ${single[0].category_sub_id} AND remain > 0 ORDER BY RAND() LIMIT 6`;
                        db.query(rel, async (err, related) => {
                            if(err) {
                                throw err;
                            }
                            let reviews = `SELECT u.name, r.message, r.rate, user_id, r.created_at from rate as r inner join users u on r.user_id = u.id WHERE product_id = ${id} ORDER BY RAND()`;
                            db.query(reviews, async (err, review) => {
                                if(err) {
                                    throw err;
                                }
                                if(token == 'null') {
                                    if(single[0].specs != null) {
                                        let spec = `SELECT ${single[0].specs.split('#')} from specs WHERE product_id = ${id}`;
                                        db.query(spec, async (err, specs) => {
                                            if(err) {
                                                throw err;
                                            }
                                            res.json({
                                                result: 'success',
                                                single,
                                                images,
                                                others,
                                                specs,
                                                review,
                                                my_review,
                                                related
                                            });
                                        });
                                    } else {
                                        res.json({
                                            result: 'success',
                                            single,
                                            images,
                                            others,
                                            specs: null,
                                            review,
                                            my_review,
                                            related
                                        });
                                    }
                                } else {
                                    const payload = await jwt.verify(token, 'HS256');
                                    let sel = `SELECT rate from rate WHERE user_id = ${payload.id} AND product_id = ${id}`;
                                    db.query(sel, async (err, r) => {
                                        if(err) {
                                            throw err;
                                        }
                                        if(r.length > 0) {
                                            my_review = r[0].rate;
                                        }

                                        if(single[0].specs != null) {
                                            let spec = `SELECT ${single[0].specs.split('#')} from specs WHERE product_id = ${id}`;
                                            db.query(spec, async (err, specs) => {
                                                res.json({
                                                    result: 'success',
                                                    single,
                                                    images,
                                                    others,
                                                    specs,
                                                    review,
                                                    my_review,
                                                    related
                                                });
                                            });
                                        } else {
                                            res.json({
                                                result: 'success',
                                                single,
                                                images,
                                                others,
                                                specs: null,
                                                review,
                                                my_review,
                                                related
                                            });
                                        }
                                    });
                                }
                            });
                        })
                    });
                });
            } else {
                res.json({
                    result: 'failed'
                });
            }
        });
    }
} 