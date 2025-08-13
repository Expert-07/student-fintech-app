const { Expand } = require('lucide-react');
const db = require('../db');

exports.searchStudents = async (req, res) => {
    const { name, department, year_of_study } = req.query;
    
    let query = "SELECT id, name, profile_pic, department, year_of_study FROM users WHERE 1=1";
    let values = [];
    let count = 1;
   
    if (name) {
        query += ` AND LOWER(name) LIKE LOWER($${count++})`;
        values.push(`%${name}%`);
    }
    if (department) {
        query += ` AND department = $${count++}`;
        values.push(department);
    }
    if (year_of_study) {
        query += ` AND year_of_study = $${count++}`;
        values.push(year_of_study);
    }

    const result = await db.query(query, values);   
    res.json(result.rows);
};
//Send connection request
exports.sendConnectionRequest = async (req, res) => {
    const { receiver_id } = req.body;
    const requester_id = req.user.id;

    await db.query(
        `INSERT INTO connections (requester_id, receiver_id, status) 
         VALUES ($1, $2, 'pending') RETURNING *`,
        [requester_id, receiver_id]
    );
    res.json({ message: 'Connection request sent successfully' });

};
exports.acceptController = async (req, res) => {
    const { request_id } = req.body;
    await db.query('UPDATE connections SET status = $1 WHERE id = $2', ['accepted', request_id]);
    res.json({ message: 'Connection request accepted' });
};

exports.rejectController = async (req, res) => {
    const { request_id } = req.body;
    await db.query('UPDATE connections SET status = $1 WHERE id = $2', ['rejected', request_id]);
    res.json({ message: 'Connection request rejected' });
};

exports.getRelevantPosts = async (req, res) => {
    const userId = req.user.id;

    const userRes = await db.query('SELECT department, year_of_study FROM users WHERE id = $1', [userId]);
    if (userRes.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }   
    const { department, year_of_study } = userRes.rows[0];

    const result = await db.query(
        `SELECT p.*, u.name, u.profile_pic FROM posts p JOIN users u ON p.user_id = u.id
        WHERE userId IN (
            SELECT CASE WHEN requester_id = $1 THEN receiver_id WHEN receiver_id = $1 THEN requester_id END 
            FROM connections WHERE (requester_id = $1 OR receiver_id = $1) AND status = 'accepted'
        ) OR (u.department = $2 AND u.year_of_study = $3) ORDER BY p.created_at DESC`,
        [userId, department, year_of_study]
    );
    res.json(result.rows);  
};

