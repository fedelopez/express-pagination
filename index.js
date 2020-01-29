const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.static('public'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
});

app.get('/api/movies/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(`SELECT * FROM MOVIES WHERE ID=${req.params.id}`);
        res.send({...result.rows[0]});
    } catch (error) {
        console.error(`Could not retrieve movie with id ${req.params.id} from db`, error);
        res.send({});
    }
    client.release();
});

app.get('/api/movies', async (req, res) => {
    const client = await pool.connect();
    try {
        const count = await client.query('SELECT COUNT(1) as total from MOVIES');
        const result = await client.query(`SELECT id, movie_title, imdb_score FROM MOVIES order by imdb_score desc LIMIT 25 OFFSET ${req.query.offset}`);
        res.send({count: count.rows[0].total, rows: result.rows});
    } catch (error) {
        console.error('Could not retrieve movies from db', error);
        res.send({count: 0, rows: []});
    }
    client.release();
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});