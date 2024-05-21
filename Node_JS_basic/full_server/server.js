const express = require('express');
const router = require('./routes/index');

const app = express();
app.use('/', router);

const PORT = 1245;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
