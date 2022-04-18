const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const userController  = require('../controllers/userController');
const auth = require('../middlewares/OnlyAuth');

router.post('/login', catchErrors(userController.login));
router.post('/facebook-login', catchErrors(userController.facebooklogin));
router.post('/register', catchErrors(userController.register));
router.get('/verify-email', catchErrors(userController.VerifyEmail));
router.post('/forgot-password', catchErrors(userController.forgotPassword));
router.post('/my-info', auth, catchErrors(userController.getInfo));
router.post('/update-info', auth, catchErrors(userController.updateInfo));
router.post('/change-password', auth, catchErrors(userController.updatePassword));

module.exports = router;