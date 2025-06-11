## AI-Powered Website Chat Agent, powered by NICS AI Ecosystem

This repository contains the necessary files and configuration for an **AI-powered chat agent** designed to be easily integrated into any website. It leverages a custom webhook for backend processing, allowing for flexible and powerful conversational AI capabilities without extensive coding.

---

### Features

* **Customizable Branding:** Easily adjust the chat widget's appearance, including logo, company name, welcome text, and response time message, to match your brand's aesthetic.
* **Color Theme Control:** Full control over primary, secondary, background, and font colors to seamlessly blend with your website's design.
* **Flexible Positioning:** Choose to display the chat widget on the left or right side of your website.
* **Webhook Integration:** Connects to a custom webhook (e.g., powered by n8n, Zapier, or a custom API) for dynamic and intelligent responses.
* **Easy Deployment:** Simple script-based integration ensures quick setup on any web page.
* **Self-Hosted Script:** The core chat widget script is hosted within this repository and served via jsDelivr CDN, giving you full control over its behavior and allowing for custom modifications.

---

### How to Use

To integrate this chat agent into your website, simply add the following HTML snippet before the closing `</body>` tag on each page where you want the widget to appear.

**Important:** You can customize the `branding` and `style` settings within the `window.ChatWidgetConfig` object. **Do not modify the `script src` URL** for the chat widget script itself, as this points to the hosted version in this repository.

```html
<script>
    window.ChatWidgetConfig = {
        webhook: {
            // This is your unique webhook URL for chat communication.
            // Replace with your actual webhook endpoint.
            url: 'https://your.website/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat', 
            route: 'general'
        },
        branding: {
            logo: '<your company logo URL>', // Optional: URL to your company logo (e.g., https://yourcompany.com/logo.png)
            name: 'AI Byte Consult Ltd.', // Your company or brand name
            welcomeText: 'Hi 👋, how can we help?', // Initial welcome message shown to users
            responseTimeText: 'We typically respond right away' // Message about response time
        },
        style: {
            primaryColor: '#854fff', // Main accent color (e.g., button, header)
            secondaryColor: '#6b3fd4', // Secondary accent color
            position: 'right', // Widget position: 'right' or 'left'
            backgroundColor: '#ffffff', // Background color of the chat interface
            fontColor: '#333333' // Default text color for messages and interface elements
        }
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/AI-Byte-Consult-Ltd/nics-website-chat-agent@main/Chat%20Widget%20Script"></script>
```

---

### Customization Guide

You can easily tailor the chat widget to your specific needs by modifying the values within the `window.ChatWidgetConfig` object:

* **`webhook.url`**: **Crucial.** This is where your AI backend (e.g., n8n workflow, custom API) listens for messages. Ensure this URL is correct and secure.
* **`branding.logo`**: Replace `<your company logo URL>` with a direct link to your company's logo image (e.g., `https://example.com/images/my-logo.png`).
* **`branding.name`**: Change `'AIfelix.info'` to your actual company or brand name. This will appear at the top of the chat window.
* **`branding.welcomeText`**: Customize the greeting message users see when they open the chat.
* **`branding.responseTimeText`**: Inform users about your typical response time.
* **`style.primaryColor`**: Set the dominant color of the widget (e.g., for buttons, headers). Use a hex color code (e.g., `#FF0000` for red).
* **`style.secondaryColor`**: Define a complementary color.
* **`style.position`**: Choose `'right'` or `'left'` to decide where the chat bubble appears on the screen.
* **`style.backgroundColor`**: Set the background color of the chat message area.
* **`style.fontColor`**: Choose the text color for messages and other interface elements.

---

### Development and Contributions

If you wish to modify the core `Chat Widget Script` functionality:

1.  **Fork** this repository.
2.  **Clone** your forked repository to your local machine.
3.  Make your desired changes to the `Chat Widget Script` file.
4.  **Commit** your changes and **push** them to your forked repository.
5.  Update the `script src` URL on your website to point to your **own forked repository** on jsDelivr (e.g., `https://cdn.jsdelivr.net/gh/YourGitHubUsername/your-repo-name@main/Chat%20Widget%20Script`).

---
