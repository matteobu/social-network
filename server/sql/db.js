const spicedPg = require("spiced-pg");
const database = "mustard-socialnetwork";

let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUserName, dbPassword } = require("../../secrets");
    db = spicedPg(
        `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
    );
}

// // USER TABLE

module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
                VALUES ($1, $2, $3, $4) RETURNING id`;

    const params = [first, last, email, password];
    return db.query(q, params);
};
module.exports.usersStarInformation = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};
module.exports.listID = (email) => {
    return db.query(`SELECT password, id FROM users WHERE email = $1`, [email]);
};
module.exports.checkEmail = (email) => {
    return db.query(`SELECT id FROM users WHERE email = $1 RETURNING id`, [
        email,
    ]);
};
module.exports.addCode = (email, code) => {
    const params = [email, code];
    const q = `
    INSERT INTO password_reset_codes
    (email, code)
    VALUES ($1, $2)
     `;
    return db.query(q, params);
};

module.exports.checkCode = (email) => {
    const params = [email];
    const q = `
    SELECT  code
    FROM password_reset_codes
    WHERE email=$1 
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY created_at DESC
    LIMIT 1
     `;
    return db.query(q, params);
};

module.exports.updateUserPsw = (email, password) => {
    const q = `UPDATE users 
            SET password = $2 
            WHERE email= $1 RETURNING id`;

    const params = [email, password];
    return db.query(q, params);
};

module.exports.updateBio = (id, bio) => {
    const q = `UPDATE users 
            SET bio = $2 
            WHERE id= $1 RETURNING id`;

    const params = [id, bio];
    return db.query(q, params);
};

// TO UPDATE ACCORDING TO THIS PROJECT , THIS IS FROM IMAGEBOARD
module.exports.uploadImages = (url, id) => {
    const q = `UPDATE users
            SET pic_url = $1 
            WHERE id = $2`;
    const params = [url, id];
    return db.query(q, params);
};

// LAST THREE USERS

module.exports.lastThreeUsers = () => {
    return db.query(
        `
        SELECT first, last, id, pic_url, bio
        FROM users
        ORDER BY id DESC
        LIMIT 3
        `
    );
};

// module.exports.allMatchUsers = (input) => {
//     const q = `SELECT first FROM users
//     WHERE first ILIKE 'a%'`;

//     const params = [input];
//     return db.query(q, params);
// };
module.exports.allMatchUsers = (input) => {
    return db.query(
        `SELECT id, first, last, pic_url FROM users WHERE first ILIKE ($1);`,
        [input + "%"]
    );
};
