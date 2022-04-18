const mysql = require("mysql");
const axios = require('axios');

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
const { response } = require("express");


const qpayTemplateId = "ICBC_REMAX_INVOICE";
const qpayMerchantId = "ICBC_REMAX";
const qpayClientId = "60C6A5B2-8597-8A5B-7719-8783A6B185C6";
const qpayClientSecret = "95D354F5-1C09-2BD7-108D-47286EE37A26";


const mChatApiKey = "O8v40PG9oewHKZjwMy7zFx/zX9afMkmDcglJvKgIoUM=";
const mChatAppSecret = "zDUZIQVG3Zi7IrJrgMLi3PPmhDR3kZc6FfQ1xBCKul4=";
const mChatUser = "2838905fef351734c35307524eac50b1e79eb5dc29c5cb370889335ce78c785b";
const mChatBranch = "ZMVXYW";

async function requestToFF(invoiceId) {
    let str = axios.get('https://api.hurdanhuruu.mn/api/purchase/qpay-result', {
            headers:{},
            params: {
                invoiceId
            }
        })
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.error(err);
        });
        return await str;
}
async function requestToPO(invoiceId) {
    let str = axios.get('https://api.icbc.mn/api/order/qpay-result', {
            headers:{},
            params: {
                invoiceId
            }
        })
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.error(err);
        });
        return await str;
}

async function checkQpayBill(invoice, token) {
    const data = {
        "merchant_id": qpayMerchantId,
        "bill_no": invoice
    }

    let str = axios.post('https://api.qpay.mn/v1/bill/check', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    }).then((res) => {
        return res.data;
    }).catch(error => {
        console.log(error);
    });
    
    return await str;
}

exports.qpayWebhook = async (req, res) => {
    // const { invoiceId } = req.query;
    const invoiceId  = req.params.invoiceId;

    if(invoiceId.substring(0,2) == 'FF') {        
        let responce = await requestToFF(invoiceId);
        return res.json({
            responce
        });
    } else if(invoiceId.substring(0,2) == 'PO') {        
        let responce = await requestToPO(invoiceId);
        return res.json({
            responce
        });
    } else {
        let token;
        let ch = `SELECT token, expire from tokens WHERE organization = 'qpay'`;
        db.query(ch, async (err, qt) => {
            if(err) {
                throw err;
            }
            if(qt.length > 0) {
                var expire = new Date(qt[0].expire);
                if(new Date() > expire) {
                    token = await getToken();
                } else {
                    token = qt[0].token;
                }
                let check = `SELECT user_id, total_amount, used_bonus, add_bonus, status from orders WHERE ordernumber = '${invoiceId}'`;
                db.query(check, async (err, order) => {
                    if(err) {
                        throw err;
                    }
                    if(order.length > 0) {
                        if(order[0].status == 'pending') {
                            // нэхэмжлэх олдсон үед 
                            let check = await checkQpayBill(invoiceId, token);
                            let isPaid = check.payment_info.payment_status;
                            let amount = check.goods_detail[0].unit_price;
                            if(isPaid == 'PAID') {
                                if(amount == order[0].total_amount) {
                                    let up = `UPDATE users SET bonus = (bonus + ${order[0].add_bonus}) WHERE id = ${order[0].user_id}`;
                                    db.query(up, async (err) => {
                                        if(err) {
                                            throw err;
                                        }
                                        let upOrder = `UPDATE orders SET status = 'paid' WHERE ordernumber = '${invoiceId}'`;
                                        db.query(upOrder, async (err) => {
                                            if(err) {
                                                throw err;
                                            }
                                            res.json({
                                                result: 'success',
                                                message: 'Амжилттай'
                                            });
                                        });
                                    });
                                } else {
                                    res.json({
                                        result: 'failed',
                                        message: 'Дутуу төлөлт'
                                    });
                                }
                            } else {
                                res.json({
                                    result: 'failed',
                                    message: 'Төлөгдөөгүй нэхэмжлэх'
                                });
                            }
                        } else if(order[0].status == 'expired') {
                            res.json({
                                result: 'failed',
                                message: 'Цуцлагдсан нэхэмжлэх'
                            });
                        } else {
                            res.json({
                                result: 'failed',
                                message: 'Төлөгдсөн нэхэмжлэх'
                            });
                        }
                    } else {
                        res.json({
                            result: 'fail',
                            message: 'Нэхэмжлэх олдсонгүй'
                        });
                    }
                });
            }
        });
    }
}


exports.isPaidQpayBill = async (req, res) => {
    const { invoiceId } = req.body;
    let check = `SELECT id from orders WHERE ordernumber = '${invoiceId}' AND status = 'paid'`;
    db.query(check, async (err, result) => {
        if(err) {
            throw err;
        }
        if(result.length > 0) {
            res.json({
                result: 'success'
            });
        } else {
            res.json({
                result: 'fail'
            });
        }
    });
}

exports.mongolChatResult = async (req, res) => {
    const { type, data } = req.body;
    if(type == 'scanqr') {
        let qr = {qr: data.generated_qrcode};
        let str = axios.post('https://developer.mongolchat.com/v2/api/worker/onlineqr/status', qr, {
            headers: {
                    'Api-Key': 'O8v40PG9oewHKZjwMy7zFx/zX9afMkmDcglJvKgIoUM=', 
                    'Content-Type': 'application/json', 
                    'App-Secret': 'zDUZIQVG3Zi7IrJrgMLi3PPmhDR3kZc6FfQ1xBCKul4=', 
                    'Authorization': 'WorkerKey 2838905fef351734c35307524eac50b1e79eb5dc29c5cb370889335ce78c785b'
            }
        })
        .then((rs) => {
            // return res.data;
            if(rs.data.status == 'paid') {
                let check = `SELECT user_id, total_amount, used_bonus, add_bonus, status from orders WHERE QRCode = '${data.generated_qrcode}'`;
                db.query(check, async (err, order) => {
                    if(err) {
                        throw err;
                    }
                    if(order.length > 0) {
                        let up = `UPDATE users SET bonus = (bonus + ${order[0].add_bonus}) WHERE id = ${order[0].user_id}`;
                        db.query(up, async (err) => {
                            if(err) {
                                throw err;
                            }
                            let upOrder = `UPDATE orders SET status = 'paid' WHERE QRCode = '${data.generated_qrcode}'`;
                            db.query(upOrder, async (err) => {
                                if(err) {
                                    throw err;
                                }
                                res.json({
                                    result: 'success',
                                    message: 'Амжилттай'
                                });
                            });
                        });
                    } else {
                        res.json({
                            result: 'no data'
                        });
                    }
                });

            } else {
                res.json({
                    result: 'failed'
                });
            }
        }).catch((err) => {
            console.error(err);
        });
        // return await str;
    }
}

exports.submitOrder = async (req, res) => {
    const { payment, cart, shipping, coupon } =  req.body;
    
    const usertoken = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(usertoken, 'HS256');
    var token;
    var amount = parseInt((cart.subtotal - cart.sale) + parseInt(shipping.amount) - parseInt(coupon.amount) - parseInt(cart.useBonus));
    let c = `SELECT ordernumber, users.id, users.bonus, orders.name, users.email, users.phone, orders.comp_id from orders inner join users on orders.user_id = users.id WHERE orders.user_id = ${payload.id} AND orders.enable_is = 0`;

    db.query(c, async (err, info) => {
        if(err) {
            throw err;
        }
        if(info.length > 0) {
            if (payment == 'qpay') {
                let ch = `SELECT token, expire from tokens WHERE organization = 'qpay'`;
                db.query(ch, async (err, qt) => {
                    if(err) {
                        throw err;
                    }
                    if(qt.length > 0) {
                        var expire = new Date(qt[0].expire);
                        if(new Date() > expire) {
                            token = await getToken();
                        } else {
                            token = qt[0].token;
                        }
                        if(coupon.amount > 0) {
                            let cp = `UPDATE coupon SET status = 0 WHERE promo_code = '${coupon.code}'`;
                            let s = `SELECT id from coupon WHERE promo_code = '${coupon.code}'`;
                            db.query(cp, async err => {
                                if(err) {
                                    throw err;
                                }
                                db.query(s, async (err, rs) => {
                                    if(err) {
                                        throw err;
                                    }
                                    let up;
                                    let bill = await createQPAYBill(info[0] ,amount, token);
                                    if(rs.length > 0) {
                                        up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, coupon = '${rs[0].id}', payment = '${payment}', payment_id = '${bill.payment_id}', QRCode = '${bill.qPay_QRcode}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                                    } else {
                                        up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, payment = '${payment}', payment_id = '${bill.payment_id}', QRCode = '${bill.qPay_QRcode}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                                    }
                                    // let up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, coupon = '${coupon.code}', payment = '${payment}', payment_id = '${bill.payment_id}', QRCode = '${bill.qPay_QRcode}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                                    db.query(up, async err => {
                                        if(err) {
                                            throw err;
                                        }
                                            db.query(`UPDATE users SET bonus = (bonus - ${parseInt(cart.useBonus)}) WHERE id = ${payload.id}`, async err => {
                                                if(err) {
                                                    throw err;
                                                }
                                                var insert = 'INSERT INTO order_product (product_id, quantity, amount, ordernumber) VALUES ?'; var rows = [];
                                                cart.product.forEach(el => {
                                                    var pst = [el.id, el.qty, el.price, info[0].ordernumber];
                                                    rows.push(pst);
                                                });
                                                
                                                db.query(insert, [rows] , async err => {
                                                    if(err) {
                                                        throw err;
                                                    }
                                                    res.json({
                                                        result: 'success',
                                                        invoiceId: info[0].ordernumber,
                                                        bill
                                                    });
                                                })
                                            });
                                    });
                                });
                            })                                  
                        } else {
                            let bill = await createQPAYBill(info[0] ,amount, token);
                                    let up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, payment = '${payment}', payment_id = '${bill.payment_id}', QRCode = '${bill.qPay_QRcode}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                                    db.query(up, async err => {
                                        if(err) {
                                            throw err;
                                        }
                                            db.query(`UPDATE users SET bonus = (bonus - ${parseInt(cart.useBonus)}) WHERE id = ${payload.id}`, async err => {
                                                if(err) {
                                                    throw err;
                                                }
                                                var insert = 'INSERT INTO order_product (product_id, quantity, amount, ordernumber) VALUES ?'; var rows = [];
                                                cart.product.forEach(el => {
                                                    var pst = [el.id, el.qty, el.price, info[0].ordernumber];
                                                    rows.push(pst);
                                                });
                                                
                                                db.query(insert, [rows] , async err => {
                                                    if(err) {
                                                        throw err;
                                                    }
                                                    res.json({
                                                        result: 'success',
                                                        invoiceId: info[0].ordernumber,
                                                        bill
                                                    });
                                                })
                                            });
                                    });
                        }
                    }
                });
            } else if (payment == 'mongolchat') {
                let productList = [];
                // console.log(cart.product);
                cart.product.forEach(el => {
                    let am = 0;
                    if(el.discount > 0) {
                        am = el.price - (el.price / 100 * el.discount);
                    } else {
                        am = el.price;
                    }
                    productList.push({product_name: el.name, quantity: el.qty, price: am, tag: ""});
                });
                
                if(coupon.amount > 0) {
                    let cp = `UPDATE coupon SET status = 0 WHERE promo_code = '${coupon.code}'`;
                    let s = `SELECT id from coupon WHERE promo_code = '${coupon.code}'`;
                    db.query(cp, async err => {
                        if(err) {
                            throw err;
                        }
                        db.query(s, async (err, rs) => {
                            if(err) {
                                throw err;
                            }
                            let up;
                            let bill = await createMongolChatQr(productList, amount, info[0]);
                            if(rs.length > 0) {
                                up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, coupon = '${rs[0].id}', payment = '${payment}', payment_id = '${info[0].ordernumber}', QRCode = '${bill.qr}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                            } else {
                                up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, payment = '${payment}', payment_id = '${info[0].ordernumber}', QRCode = '${bill.qr}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                            }
                            // let up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, coupon = '${coupon.code}', payment = '${payment}', payment_id = '${bill.payment_id}', QRCode = '${bill.qPay_QRcode}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                            db.query(up, async err => {
                                if(err) {
                                    throw err;
                                }
                                    db.query(`UPDATE users SET bonus = (bonus - ${parseInt(cart.useBonus)}) WHERE id = ${payload.id}`, async err => {
                                        if(err) {
                                            throw err;
                                        }
                                        var insert = '';
                                        cart.product.forEach(element => {
                                            if(insert == '') {
                                                insert += `('','${element.id}',${element.qty},${element.price},'${info[0].ordernumber}')`;
                                            } else {
                                                insert += `, ('','${element.id}',${element.qty},${element.price},'${info[0].ordernumber}')`;
                                            }
                                        });
                                        insert = `INSERT INTO order_product VALUES ` + insert;
                                        db.query(insert , async err => {
                                            if(err) {
                                                throw err;
                                            }
                                            res.json({
                                                result: 'success',
                                                invoiceId: info[0].ordernumber,
                                                bill
                                            });
                                        })
                                    });
                            });
                        });
                    })     
                } else {
                    let bill = await createMongolChatQr(productList, amount, info[0]);
                    let up = `UPDATE orders SET total_amount = ${amount}, bonus = ${parseInt(info[0].bonus)}, discount = ${parseInt(cart.sale)}, add_bonus = ${parseInt(cart.bonus)}, used_bonus = ${parseInt(cart.useBonus)}, payment = '${payment}', payment_id = '${info[0].ordernumber}', QRCode = '${bill.qr}', enable_is = 1 WHERE ordernumber = '${info[0].ordernumber}'`;
                                    db.query(up, async err => {
                                        if(err) {
                                            throw err;
                                        }
                                            db.query(`UPDATE users SET bonus = (bonus - ${parseInt(cart.useBonus)}) WHERE id = ${payload.id}`, async err => {
                                                if(err) {
                                                    throw err;
                                                }
                                                var insert = '';
                                                cart.product.forEach(element => {
                                                    if(insert == '') {
                                                        insert += `('','${element.id}',${element.qty},${element.price},'${info[0].ordernumber}')`;
                                                    } else {
                                                        insert += `, ('','${element.id}',${element.qty},${element.price},'${info[0].ordernumber}')`;
                                                    }
                                                });
                                                insert = `INSERT INTO order_product VALUES ` + insert;
                                                db.query(insert , async err => {
                                                    if(err) {
                                                        throw err;
                                                    }
                                                    res.json({
                                                        result: 'success',
                                                        invoiceId: info[0].ordernumber,
                                                        bill
                                                    });
                                                })
                                            });
                                    });
                }
            } else {
                res.json({
                    result: 'failed',
                    data: 'Уучлаарай хөгжүүлэлт хийгдэж байна'
                });
            }
        } else {
            res.json({
                result: 'failed',
                data: 'Захиалга олдсонгүй'
            });
        }
        
    });
}

async function createMongolChatQr(products, amount, info ) {
    const data = {
        amount,
        // amount: "500",
        branch_id: mChatBranch, 
        products,
        title: "Itlab.mn",
        sub_title: "Онлайн худалдааны сайт",
        bill_id: info.ordernumber,
        noat: amount - (amount / 1.1),
        // noat: "200",
        nhat: "0",
        ttd: "5489288",
        dynamic_link: false, 
        dynamic_link_callback: "nope",
        tag: "",
        reference_number: info.ordernumber,
        expire_time: "4400"
    }

    let str = axios.post('https://developer.mongolchat.com/v2/api/worker/onlineqr/generate', data, {
            headers: {
                    'Api-Key': 'O8v40PG9oewHKZjwMy7zFx/zX9afMkmDcglJvKgIoUM=', 
                    'Content-Type': 'application/json', 
                    'App-Secret': 'zDUZIQVG3Zi7IrJrgMLi3PPmhDR3kZc6FfQ1xBCKul4=', 
                    'Authorization': 'WorkerKey 2838905fef351734c35307524eac50b1e79eb5dc29c5cb370889335ce78c785b'
            }
        })
        .then((res) => {
            return res.data;
            // console.log(res.data);
        }).catch((err) => {
            console.error(err);
        });
        return await str;
}

async function createQPAYBill(info, amount, token) {
    const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const data = {
        template_id: qpayTemplateId,
        merchant_id: qpayMerchantId,
        branch_id: "1",
        pos_id: "1",
        receiver: {
            id: String(info.id),
            register_no: String(info.comp_id),
            name: info.name,
            email: info.email,
            phone_number: info.phone,
            note: info.name
        },
        bill_no: info.ordernumber,
        date: datetime,
        description: 'ITLAB.mn сайтын нэхэмжлэх',
        amount: amount,
        btuk_code: "",
        vat_flag: "0"
    }

    let str = axios.post('https://api.qpay.mn/v1/bill/create', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.error(err);
        });
    return await str;
}

async function getToken() {
    const data = {
        "client_id": qpayClientId,
        "client_secret": qpayClientSecret,
        "grant_type":"client",
        "refresh_token":""
    };

    let str = axios.post('https://api.qpay.mn/v1/auth/token', data)
        .then((res) => {
            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            var dt = new Date().addDays(res.data.expires_in / 3600 /24).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            
            let up = `UPDATE tokens SET token = '${res.data.access_token}', expire = '${dt}' WHERE organization = 'qpay'`;
            db.query(up, async err=> {
                if(err) {
                    throw err;
                }
            });
            return res.data.access_token;
        }).catch((err) => {
            console.error(err.message);
        });

    return await str;
}