const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/test', (req, res) =>{
    res.send("Server working!");
});

app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});

