const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Đọc tất cả file trong thư mục routes (trừ index.js)
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js' && file.endsWith('.js')) {
        const route = require(path.join(__dirname, file));
        router.use(`/${file.replace('.router.js', '')}`, route);
    }
});

module.exports = router;