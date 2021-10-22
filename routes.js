const router = require('express').Router();
const {body,validationResult} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {postMessage, listMessages, listUsers} = require('./controllers/messageController');



  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
	// Build your resulting errors however you want! String, object, whatever - it works!
	return `${location}[${param}]: ${msg}`;
};


router.post('/register', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
	 (req, res, next) => {
	  const result = validationResult(req).formatWith(errorFormatter);
	  if (!result.isEmpty()) {
		return res.json({ 'error':true, message: result.array() });
	  }
	  next();
	}
  
 ], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],(req, res, next) => {
	  const result = validationResult(req).formatWith(errorFormatter);
	  if (!result.isEmpty()) {
		return res.json({ 'error':true, message: result.array() });
	  }
	  next();
	}
,login);

router.post('/messages',[
    body('from_user_id',"From user ID is required")
    .notEmpty()
    .escape()
    .trim(),
    body('to_user_id',"To user ID is required")
    .notEmpty()
    .escape()
    .trim()
],(req, res, next) => {
	  const result = validationResult(req).formatWith(errorFormatter);
	  if (!result.isEmpty()) {
		return res.json({ 'error':true, message: result.array() });
	  }
	  next();
	}
,postMessage);


router.get('/messages',listMessages);

router.get('/users',listUsers);

module.exports = router;
