const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("RED EYE SERVER RUNNING");
});

app.post("/chat", async (req, res) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.OPENROUTER_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "arcee-ai/trinity-large-preview:free",
                messages: [
                    { role: "user", content: req.body.message }
                ]
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
