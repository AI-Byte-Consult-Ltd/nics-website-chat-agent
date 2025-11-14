// NICS Chat Widget v3.1 — stable, with iPad/Safari fixes and restored gradient button
(function () {
  // --- Inject Styles ---
  const styles = `
    .n8n-chat-widget {
      --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
      --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
      --chat--color-background: var(--n8n-chat-background-color, #ffffff);
      --chat--color-font: var(--n8n-chat-font-color, #333333);
      font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .n8n-chat-widget .chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999;
      display: none;
      width: 380px;
      height: 600px;
      background: var(--chat--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
      border: 1px solid rgba(133, 79, 255, 0.2);
      overflow: hidden;
    }

    .n8n-chat-widget .chat-container.open {
      display: flex;
      flex-direction: column;
    }

    .n8n-chat-widget .brand-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(133, 79, 255, 0.1);
      position: relative;
    }

    .n8n-chat-widget .close-button {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--chat--color-font);
      cursor: pointer;
      font-size: 20px;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .n8n-chat-widget .close-button:hover {
      opacity: 1;
    }

    .n8n-chat-widget .brand-header img {
      width: 32px;
      height: 32px;
    }

    .n8n-chat-widget .brand-header span {
      font-size: 18px;
      font-weight: 500;
      color: var(--chat--color-font);
    }

    .n8n-chat-widget .new-conversation {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      text-align: center;
      width: 100%;
      max-width: 300px;
    }

    .n8n-chat-widget .welcome-text {
      font-size: 24px;
      font-weight: 600;
      color: var(--chat--color-font);
      margin-bottom: 24px;
      line-height: 1.3;
    }

    .n8n-chat-widget .new-chat-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 16px 24px;
      background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: transform 0.2s;
      margin-bottom: 12px;
    }

    .n8n-chat-widget .new-chat-btn:hover {
      transform: scale(1.03);
    }

    .n8n-chat-widget .chat-interface {
      display: none;
      flex-direction: column;
      height: 100%;
    }

    .n8n-chat-widget .chat-interface.active {
      display: flex;
    }

    .n8n-chat-widget .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: var(--chat--color-background);
      display: flex;
      flex-direction: column;
    }

    .n8n-chat-widget .chat-message {
      padding: 12px 16px;
      margin: 8px 0;
      border-radius: 12px;
      max-width: 80%;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
    }

    .n8n-chat-widget .chat-message.user {
      background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
      color: white;
      align-self: flex-end;
    }

    .n8n-chat-widget .chat-message.bot {
      background: var(--chat--color-background);
      border: 1px solid rgba(133, 79, 255, 0.2);
      color: var(--chat--color-font);
      align-self: flex-start;
    }

    .n8n-chat-widget .chat-input {
      padding: 16px;
      display: flex;
      gap: 8px;
      border-top: 1px solid rgba(133, 79, 255, 0.1);
      background: var(--chat--color-background);
    }

    .n8n-chat-widget .chat-input textarea {
      flex: 1;
      padding: 12px;
      border: 1px solid rgba(133, 79, 255, 0.2);
      border-radius: 8px;
      background: var(--chat--color-background);
      color: var(--chat--color-font);
      resize: none;
      font-size: 14px;
    }

    .n8n-chat-widget .chat-input button {
      background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0 20px;
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.2s;
    }

    .n8n-chat-widget .chat-input button:hover {
      transform: scale(1.05);
    }

    /* === FIXED GRADIENT TOGGLE BUTTON === */
    .n8n-chat-widget .chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, var(--chat--color-secondary), var(--chat--color-primary));
      background-clip: padding-box;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(133, 79, 255, 0.5);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .n8n-chat-widget .chat-toggle:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(133, 79, 255, 0.7);
    }

    .n8n-chat-widget .chat-toggle svg {
      width: 26px;
      height: 26px;
      fill: currentColor;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  const cfg = window.ChatWidgetConfig;
  if (!cfg) return;

  const widgetContainer = document.createElement("div");
  widgetContainer.className = "n8n-chat-widget";

  const chatContainer = document.createElement("div");
  chatContainer.className = "chat-container";

  chatContainer.innerHTML = `
    <div class="brand-header">
      <img src="${cfg.branding.logo}" alt="${cfg.branding.name}">
      <span>${cfg.branding.name}</span>
      <button class="close-button">×</button>
    </div>
    <div class="new-conversation">
      <h2 class="welcome-text">${cfg.branding.welcomeText}</h2>
      <button class="new-chat-btn">💬 Send us a message</button>
      <p class="response-text">${cfg.branding.responseTimeText}</p>
    </div>
    <div class="chat-interface">
      <div class="chat-messages"></div>
      <div class="chat-input">
        <textarea placeholder="Type your message..." rows="1"></textarea>
        <button type="submit">Send</button>
      </div>
    </div>
  `;

  const toggleButton = document.createElement("button");
  toggleButton.className = "chat-toggle";
  toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>`;

  widgetContainer.appendChild(chatContainer);
  widgetContainer.appendChild(toggleButton);
  document.body.appendChild(widgetContainer);

  // ✅ Delay initialization for Safari/iPad
  setTimeout(() => {
    const newChatBtn = chatContainer.querySelector(".new-chat-btn");
    const chatInterface = chatContainer.querySelector(".chat-interface");
    const chatMessages = chatContainer.querySelector(".chat-messages");
    const sendButton = chatContainer.querySelector("button[type='submit']");
    const textarea = chatContainer.querySelector("textarea");

    let currentSessionId = "";

    async function startNewConversation() {
      currentSessionId = crypto.randomUUID();
      chatContainer.querySelector(".brand-header").style.display = "none";
      chatContainer.querySelector(".new-conversation").style.display = "none";
      chatInterface.classList.add("active");

      const botDiv = document.createElement("div");
      botDiv.className = "chat-message bot";
      botDiv.textContent = "Hello 👋 How can I assist you today?";
      chatMessages.appendChild(botDiv);
    }

    async function sendMessage(msg) {
      if (!msg) return;
      const userDiv = document.createElement("div");
      userDiv.className = "chat-message user";
      userDiv.textContent = msg;
      chatMessages.appendChild(userDiv);
      textarea.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        const res = await fetch(cfg.webhook.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([{ action: "sendMessage", sessionId: currentSessionId, route: cfg.webhook.route, chatInput: msg }]),
        });
        const data = await res.json();
        const botDiv = document.createElement("div");
        botDiv.className = "chat-message bot";
        botDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (e) {
        console.error("Error:", e);
      }
    }

    // ✅ fixed event to stop inverse toggle
    newChatBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      chatContainer.classList.add("open");
      startNewConversation();
    });

    sendButton.addEventListener("click", () => sendMessage(textarea.value.trim()));
    textarea.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(textarea.value.trim());
      }
    });

    toggleButton.addEventListener("click", () => chatContainer.classList.add("open"));
    chatContainer.querySelectorAll(".close-button").forEach((b) =>
      b.addEventListener("click", () => chatContainer.classList.remove("open"))
    );
  }, 300);
})();
