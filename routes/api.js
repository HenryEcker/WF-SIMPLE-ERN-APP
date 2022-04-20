const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * /api:
 *  /data:
 *    get:
 *      @description Get the json data stored at ../resource/data.json. Parse as JSON and send to client.
 *      On Error sends status 500 if there is an error reading the file or parsing the JSON
 */
router.get('/data', (req, res) => {
    fs.readFile(path.resolve(__dirname, '..', 'resource', 'data.json'), (errno, data) => {
        if (errno) {
            return res.sendStatus(500);
        }
        try {
            // Resolve buffer as string. Parse JSON and send to client.
            return res.json(JSON.parse(data.toString('utf-8', 0, data.length)));
        } catch {
            return res.sendStatus(500);
        }
    })
});

module.exports = router;
