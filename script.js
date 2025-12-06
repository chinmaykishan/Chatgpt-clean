const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_KEY = "sk-abcd1234abcd1234abcd1234abcd1234abcd1234";

function addMessage(text, sender) {
    let msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getReply(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

sendBtn.addEventListener("click", async () => {
    let text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    addMessage("...", "bot");
    const temp = chatBox.lastChild;

    let reply = await getReply(text);

    temp.remove();
    addMessage(reply, "bot");
});
