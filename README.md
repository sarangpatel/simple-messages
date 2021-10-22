
1: git clone repo 

2: npm install

3: Import DB files db.sql and change DB/Secret in .env

4: Endpoints


POST http://localhost:3000/register

{
"name": "qsfsfdf",
 "email": "xx@gmail.com",
 "password": "XX"
}

POST http://localhost:3000/login

{
 "email": "xx@gmail.com",
 "password": "xx"
}

POST http://localhost:3000/messages 

 {
 "from_user_id": "4",
 "to_user_id": "5",
 "message": "4 to 5 "
}


Header: Authorization: Bearer Xxxx


GET http://localhost:3000/messages?from_user_id=5

Authorization: Bearer xx

Response:

{
    "error": false,
    "data": [
        {
            "from_user_id": 4,
            "to_user_id": 5,
            "from_name": "Sarang Patel",
            "to_name": "qsfsfdf",
            "message": "4 to 5 ",
            "created_on": "2021-10-22T08:19:44.000Z"
        },
        {
            "from_user_id": 4,
            "to_user_id": 5,
            "from_name": "Sarang Patel",
            "to_name": "qsfsfdf",
            "message": "4 to 5 ",
            "created_on": "2021-10-22T08:18:16.000Z"
        },
        {
            "from_user_id": 4,
            "to_user_id": 5,
            "from_name": "Sarang Patel",
            "to_name": "qsfsfdf",
            "message": "first message",
            "created_on": "2021-10-22T08:17:46.000Z"
        },
        {
            "from_user_id": 4,
            "to_user_id": 5,
            "from_name": "Sarang Patel",
            "to_name": "qsfsfdf",
            "message": "first message",
            "created_on": "2021-10-22T08:17:44.000Z"
        },
        {
            "from_user_id": 4,
            "to_user_id": 5,
            "from_name": "Sarang Patel",
            "to_name": "qsfsfdf",
            "message": "first message",
            "created_on": "2021-10-22T08:17:43.000Z"
        }
    ]
}

### Backend

http://localhost:3000/login.html

http://localhost:3000/messages.html


