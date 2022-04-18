const mysql = require("mysql");
const nodemailer = require("nodemailer");
const passprot = require("passport");
const strategy = require("passport-facebook");
const fs = require('fs');


const db = mysql.createConnection({
  host: 'localhost',
  database: 'itlab',
  user: 'root',
  password: ''
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   database: 'admin_itlab',
//   user: 'otgoo1995',
//   port: 3306,
//   password: 'Password1994@'
// });

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.mn',
    port: 465,
    secure: true,
    auth: {
      user: 'support@itlab.mn',
      pass: 'Itl@b2020'
    }
  });

const sha256 = require("js-sha256");
const jwt = require('jwt-then');



async function SentNewPassword(email, password) {
    let mailOptions = {
      from: '\'ITLAB.mn\' support@itlab.mn',
      to: `${email}`,
      subject: 'Нууц үг сэргээх хүсэлт',
      html: `<table style="width: 100%;" cellspacing="0" cellpadding="0">
      <tr><td colspan="3" style="height: 50px; background-color: #f1f0f6;"></td></tr>
      <tr>
      <td width="25%" style="background-color: #f1f0f6;"></td>
      <td width="50%" style="background-color: #ffffff; border-radius: 30px;">
      
        <div style="margin-bottom: 20px; margin-top: 50px;" align="center">
          <img src="https://api.itlab.mn/images/logo/itlab.png" style="width: 150px; height: auto;">
        </div>
      
        <div align="center" style="margin-bottom: 20px; font-weight: 700;">
          Нууц үг сэргээх
        </div>
      
        <div style="margin-bottom: 10px; padding-left: 50px;">
          Сайн байна уу?
        </div>
      
        <div style="margin-bottom: 10px; padding-left: 50px;">
          Манай сайтыг ашигласан танд баярлалаа. 
        </div>
      
        <div style="margin-bottom: 50px; padding-left: 50px;">
          Таны шинэчлэгдсэн нууц үг: <b>${[password]}</b>
        </div>
      
      </td>
      <td width="25%" style="background-color: #f1f0f6;"></td>
      </tr>
      <tr><td colspan="3" style="height: 50px; background-color: #f1f0f6;">
      
      
      <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>ITLAB</strong></a> - Бүх эрх хуулиар хамгаалагдсан</div>
      
      </td></tr>
      </table>`
    }
  
    transporter.sendMail(mailOptions,  function(err, info) {
      if(err) {
        console.log(err);
      } else {
        console.log('email sent', info);
      }
    });
  }

  async function SentEmail(token, email) {

    let mailOptions = {
      from: '\'ITLAB.mn\' support@itlab.mn',
      to: `${email}`,
      subject: 'Бүртгэл баталгаажуулалт',
      html: `<table style="width: 100%; padding-left: 20px; padding-right: 20px;" cellspacing="0" cellpadding="0">
      <tr>
        <td colspan="3" style="height: 50px; background-color: #f1f0f6;"></td>
      </tr>
      <tr>
        <td width="25%" style="background-color: #f1f0f6;"></td>
        <td width="50%" style="background-color: #ffffff; border-radius: 30px;">
          <div style="margin-bottom: 20px; margin-top: 50px;" align="center">
            <img src="https://api.itlab.mn/images/logo/itlab.png" style="width: 150px; height: auto;">
          </div>
          <div align="center" style="margin-bottom: 20px; font-weight: 700;">Бүртгэл баталгаажуулах</div>
          <div style="margin-bottom: 10px; padding-left: 50px;">Сайн байна уу?</div>
          <div style="margin-bottom: 10px; padding-left: 50px;">Манай сайтад бүртгүүлсэн танд баярлалаа. </div>
          <div style="margin-bottom: 50px; padding-left: 50px;">Хэрвээ та бүртгэлээ баталгаажуулахыг хүсвэл доорх товч дээр дарна уу.</div>
          <div align="center" style="margin-bottom: 50px;">
            <a href="https://api.itlab.mn/api/user/verify-email?token=${token}" style="background-color:#393d3e; border:1px solid #393d3e; border-radius: 8px; color:#fff; width: 250px; display:block; font-family:sans-serif;font-size:16px; line-height:44px; text-align:center; text-decoration:none; -webkit-text-size-adjust:none; mso-hide:all; padding-left: 20px; padding-right: 20px; font-weight: 700;"> Баталгаажуулах </a>
          </div>
        </td>
        <td width="25%" style="background-color: #f1f0f6;"></td>
      </tr>
      <tr>
        <td colspan="3" style="height: 50px; background-color: #f1f0f6;">
          <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>ITLAB</strong></a> - Бүх эрх хуулиар хамгаалагдсан</div>
        </td>
      </tr>
      </table>`
    }
    
  
    transporter.sendMail(mailOptions,  function(err, info) {
      if(err) {
        console.log(err);
      } else {
        console.log('email sent', info);
      }
    });
  
  }

exports.register = async (req, res) => {
  const { user } = req.body;
  console.log(user);
  let c = `SELECT id from users WHERE email = '${user.email}'`;
  db.query(c, async (err, check) => {
    if(err) {
      throw err;
    }
    if(check.length > 0) {
      res.json({
        result: 'failed'
      });
    } else {
      const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      let img = req.protocol + '://' + req.get('host') + '/images/user/default.png';
      let pst = {name: user.name, phone: user.phone, email: user.email, permission: 2, password: sha256(user.password + process.env.SALT), created_at: datetime, updated_at: datetime, img, verified: 'false', bonus: 2020}
      let i = `INSERT INTO users SET ?`;
      db.query(i, pst, async err => {
        if(err) {
          throw err;
        }
        db.query(c, async (err, ch) => {
          if(err) {
            throw err;
          }
          if(ch.length > 0) {
            const token  = await  jwt.sign({
              id: ch[0].id
            }, 
            'HS256');
            await SentEmail(token, user.email);
            res.json({
              result: 'success'
            });
          } else {
            res.json({
              result: 'somewrong'
            });
          }
        });
      })
    }
  });
}

exports.getInfo = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  let me = `SELECT * from users WHERE id = ${payload.id}`;
  db.query(me, async (err, result) => {
    if(err) {
      throw err;
    }
    let saved = `SELECT p.image, p.name, p.model, p.color_name, p.sale_price, p.id from favourite as f inner join product as p on f.product_id = p.id WHERE f.user_id = ${payload.id}`;
    let orders = `SELECT * from orders WHERE user_id = ${payload.id} ORDER BY created_at DESC LIMIT 5`;
    db.query(saved, async (err, save) => {
      if (err) {
        throw err;
      } 
      db.query(orders, async (err,order) => {
        if(err) {
          throw err;
        }
        res.json({
          info: result,
          save,
          order
        });
      });
    });
  });
}

exports.updatePassword = async (req, res) => {
  const { password } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');

  let up = `UPDATE users set password = '${sha256(password + process.env.SALT)}' WHERE id = ${payload.id}`;
  db.query(up, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.VerifyEmail = async (req, res) => {
  const token  = req.query.token;
  if(!token) {
    return res.redirect('https://www.itlab.mn/404');
  }

  try {
    const payload = await jwt.verify(token, 'HS256');

    let sql = `UPDATE users SET verified = 'true' WHERE id = ${payload.id}`;
    db.query(sql, err => {
      if(err) {
        throw err;
      }
      return res.redirect('https://www.itlab.mn/login?sms=1');
    });
    
  } catch (err) {
    console.log(err);
    return res.redirect('https://www.itlab.mn/404');
  }
}

exports.updateInfo = async (req, res) => {
  const { info } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');

  let up = `UPDATE users SET email = '${info.email}', name = '${info.name}', phone = '${info.phone}', phone2 = '${info.phone2}' WHERE id = ${payload.id}`;
  db.query(up, async (err) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.forgotPassword = async (req, res) => {
        const { email } =  req.body;
        
        let qry = `SELECT id from users WHERE email = '${email}'`;
        db.query(qry, async (err, result) => {
          if(err) {
            throw err;
          }
          if(result.length === 0) {
            return res.json({
              result: 'failed',
              data: 'Уучлаарай. Энэ и-мэйл хаяг нь бүртгэлгүй байна',
            });
          } 
      
          var password = Math.random().toString(36).slice(-8);
      
          let updt = `UPDATE users set password = '${sha256(password + process.env.SALT)}' WHERE email = '${email}'`;
          db.query(updt, async (err, result) => {
            if(err) {
              throw err;
            }
            await SentNewPassword(email, password);
            res.json({
              result: 'success',
              data: 'Нууц үг амжилттай шинэчлэгдлээ. И-мэйл хаягаа шалгана уу'
            });
          });
        });
}

exports.facebooklogin = async (req, res) => {
  const { user } = req.body;
  let c = `SELECT * from users WHERE social_id = '${user.id}'`;
  db.query(c, async (err, check) => {
    if(err) {
      throw err;
    }
    if(check.length > 0) {
      const token  = await  jwt.sign({
        id: check[0].id
      }, 
      'HS256');

      let up = `UPDATE users SET img = '${user.picture.data.url}' WHERE id = ${check[0].id}`;
      db.query(up, async err => {
        if(err) {
          throw err;
        }
        db.query(c, async (err, u) => {
          if(err) {
            throw err;
          }
          return res.status(200).json({
            result: 'success',
            data: u[0],
            token,
            status: 200
          })
        });
      });
    } else {
      if(user.email != undefined) {
        let qry = `SELECT * from users WHERE email = '${user.email}'`;
        db.query(qry, async (err, check) => {
          if(err) {
            throw err;
          }
          if(check.length > 0) {
            let updateUser = `UPDATE users SET social_id = '${user.id}' WHERE email = '${user.email}'`;
            db.query(updateUser, async err => {
              if(err) {
                throw err;
              }

              const token  = await  jwt.sign({
                id: check[0].id
              }, 
                'HS256');
              
              return res.status(200).json({
                  result: 'success',
                  data: check[0],
                  token,
                  status: 200
              })
              
            })
          } else {
            const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var password = Math.random().toString(36).slice(-8);
            let pst = {name: user.name, email: user.email, password: sha256(password + process.env.SALT), img: user.picture.data.url, permission: 2, created_at: datetime, updated_at: datetime, bonus: 2020, social_id: user.id, verified: 'true'}
            let i = `INSERT INTO users SET ?`
            db.query(i, pst, err => {
              if(err) {
                throw err;
              }
              db.query(c, async (err, check) => {
                if(err) {
                  throw err;
                }
                const token  = await  jwt.sign({
                  id: check[0].id
                }, 
                  'HS256');
                
                return res.status(200).json({
                    result: 'success',
                    data: check[0],
                    token,
                    status: 200
                })
              })
            });
          }
        });
      } else {
        const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var password = Math.random().toString(36).slice(-8);
            let pst = {name: user.name, password: sha256(password + process.env.SALT), img: user.picture.data.url, permission: 2, created_at: datetime, updated_at: datetime, bonus: 2020, social_id: user.id, verified: 'true'}
            let i = `INSERT INTO users SET ?`
            db.query(i, pst, err => {
              if(err) {
                throw err;
              }
              db.query(c, async (err, check) => {
                if(err) {
                  throw err;
                }
                const token  = await  jwt.sign({
                  id: check[0].id
                }, 
                  'HS256');
                
                return res.status(200).json({
                    result: 'success',
                    data: check[0],
                    token,
                    status: 200
                })
              })
          });
      }
    }
  });
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    // const user = await User.findOne({email, password: sha256(password + process.env.SALT)});
    let qry = `SELECT * from users WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;
    console.log(qry);
     db.query(qry, async (err, result) => {
  
      if(err) {
        throw err;
      }
  
      if(result.length === 0) {
        return res.status(200).json({
          result: 'fail',
          data: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу',
          status: 400
        })
      }
  
      if(result[0].verified == 'false') {

        const token  = await  jwt.sign({
            id: result[0].id
          }, 
          'HS256');

        await SentEmail(token, email);
  
        return res.status(200).json({
          result: 'fail',
          data: 'Баталгаажуулаагүй хаяг байна. И-Мэйл хаягаа шалгана уу!',
          status: 400
        })
      } 
  
      const token  = await  jwt.sign({
        id: result[0].id
      }, 
        'HS256');
      
      return res.status(200).json({
          result: 'success',
          data: result[0],
          token,
          status: 200
      })
    });
  }