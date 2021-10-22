const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();


module.exports = {
    postMessage: postMessage,
	listMessages: listMessages,
	listUsers: listUsers
};

async function postMessage(req, res,next) {

	try{
		if(
			!req.headers.authorization ||
			!req.headers.authorization.startsWith('Bearer') ||
			!req.headers.authorization.split(' ')[1]
		){
			return res.status(422).json({
				message: "Please provide the token",
				error: true
			});
		}
		const theToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(theToken, process.env.JWT_SECRET);

		const [row] = await conn.execute(
			"SELECT `id`,`name`,`email` FROM `users` WHERE `id`=?",
			[decoded.id]
		);

		const [rows] = await conn.execute('INSERT INTO `messages`(`message`,`from_user_id`,`to_user_id`) VALUES(?,?,?)',[
			req.body.message,
			req.body.from_user_id,
			req.body.to_user_id
		]);

		if (rows.affectedRows === 1) {
			return res.status(201).json({
				message: "Message has been successfully inserted.",
				error:false
			});
		}
	}
	catch(err){
		next(err);
	}

};


async function listMessages(req, res,next) {

	try{
		if(
			!req.headers.authorization ||
			!req.headers.authorization.startsWith('Bearer') ||
			!req.headers.authorization.split(' ')[1]
		){
			return res.status(422).json({
				message: "Please provide the token",
				error: true
			});
		}
		const theToken = req.headers.authorization.split(' ')[1];
		console.log(theToken);
		const decoded = jwt.verify(theToken, process.env.JWT_SECRET);

		const [row] = await conn.execute(
			`SELECT fu.id as from_user_id, tu.id as to_user_id, fu.name as from_name, tu.name as to_name,m.message,m.created_on FROM messages m inner join users fu on fu.id = m.from_user_id
				   inner join users tu on tu.id = m.to_user_id WHERE from_user_id = ? order by m.id desc limit 500`,
			[req.query.from_user_id]
		);


        if(row.length > 0){
            return res.json({
				error:false,
                data:row
            });
        }

        res.json({
			error: false,
            message:"No messages found."
        });

	}
	catch(err){
		next(err);
	}

};

async function listUsers(req, res,next) {

	try{

		const [row] = await conn.execute(
			`SELECT id,name from users order by name asc limit 500`, []
		);


        if(row.length > 0){
            return res.json({
				error:false,
                data:row
            });
        }
	}
	catch(err){
		next(err);
	}

};