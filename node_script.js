
// Node.js server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for filtered comments
let filteredComments = [];

// Endpoint to receive comments from Python
app.post('/comments', (req, res) => {
    const comments = req.body.comments;
    
    if (!comments || !Array.isArray(comments)) {
        return res.status(400).send('Invalid comments format');
    }

    // Filter comments (example: remove comments with less than 5 characters)
    filteredComments = comments.filter(comment => comment.length >= 5);

    console.log('Filtered Comments:', filteredComments);
    res.status(200).send('Comments received and filtered');
});

// Endpoint to serve filtered comments to the frontend
app.get('/filtered-comments', (req, res) => {
    res.json(filteredComments);
});

app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
});
