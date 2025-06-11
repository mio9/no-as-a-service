# ❌ No-as-a-Service

<p align="center">
  <img src="https://raw.githubusercontent.com/hotheadhacker/no-as-a-service/main/assets/imgs/naas-with-no-logo-bunny.png" width="800" alt="No-as-a-Service Banner" width="70%"/>
</p>


Ever needed a graceful way to say “no”?  
This **overengineered** API returns random, generic, creative, and sometimes hilarious rejection reasons — perfectly suited for any scenario: personal, professional, student life, dev life, or just because.

Built for humans, excuses, and humor. 

Now comes with endless mode powered by Ollama AI ✨

---

## 🚀 API Usage

**Base URL**
```
https://naas.isalman.dev/no
```

**Method:** `GET`  
**Rate Limit:** `120 requests per minute per IP`

### 🔄 Example Request
```http
GET /no
GET /no?endless=true&wild=2
```

### 🔍 Available Query
- `endless` (optional): Set to `true` to enable AI generated reasons
- `wild` (optional): Set to a number between `-1` and `2` to control the creativity (and abstractness) level of the rejection reason.

`wild` will only be considered when `endless` is set to `true`.

### ✅ Example Response
```json
{
    "reason": "I wouldst decline thy offer, for mine eyes have beheld the dance of shadows on yonder wall, whispering tales of untold mysteries that doth call me hence."
}
```

Use it in apps, bots, landing pages, Slack integrations, rejection letters, or wherever you need a polite (or witty) no.

---

## 🛠️ Self-Hosting

Want to run it yourself? It’s lightweight and simple.

### 1. Clone this repository
```bash
git clone https://github.com/mio9/no-as-a-service.git
cd no-as-a-service
```

### 2. Install dependencies
```bash
bun install
```

### 3. Configure environment variables
Copy the `.env.example` file to `.env` and fill change the necessary values:
```env
PORT=3300 # or any other port you prefer
TRUST_PROXY=true # set to true if your app is behind a proxy (e.g., Nginx)
OLLAMA_URL=http://your-ollama-server:port/ # URL to your Ollama server, e.g. http://localhost:11434 (no trailing slash)
OLLAMA_MODEL=your-model-name # The model you want to use from Ollama, e.g. gemma3:4b
```

### 4. Start the dev server
```bash
bun start #, or use
bun dev # for development with hot-reloading
```

The API will be live at:
```
http://localhost:3000/no
```

You can also change the port using an environment variable:
```bash
PORT=5000 bun start
```

---

## 📁 Project Structure

```
no-as-service/
├── .env.example   # Environment file to be copied
├── README.md
├── package.json
├── reasons.json    # The manual list of reasons from original project
├── tsconfig.json          # Root TypeScript config
├── assets/
│   └── imgs/             # Image assets
├── benchmark/
│   └── script.js         # Benchmark script
└── src/
    ├── env.d.ts            # TypeScript environment declarations
    ├── index.ts            # Main application entry point
    └── ollama.ts           # Ollama-related utilities
```

---

## ⚓ Devcontainer

If you open this repo in Github Codespaces, it will automatically use `.devcontainer.json` to set up your environment.  If you open it in VSCode, it will ask you if you want to reopen it in a container.

---
## Projects Using No-as-a-Service

Here are some projects and websites that creatively integrate [no-as-a-service](https://naas.isalman.dev/no) to deliver humorous or programmatic "no" responses:

1. **[no-as-a-service-rust](https://github.com/ZAZPRO/no-as-a-service-rust)**  
   Rust implementation of this project.

2. **[CSG Admins](https://csg-admins.de)**  
   A system administration and gaming service hub using no-as-a-service to provide playful negative responses across some admin panels and commands.

3. **[FunnyAnswers - /no endpoint](https://www.funnyanswers.lol/no)**  
   A humor-focused API playground that includes a mirror or wrapper for no-as-a-service, perfect for developers exploring fun HTTP-based responses.

4. **[Your Project Here?](https://github.com/YOUR_REPO)**  
   If you're using no-as-a-service in your project, open a pull request to be featured here!

---

> Want to use no-as-a-service in your own project? Check out the usage section in this README and start returning **"no"** like a pro.
---

## 👤 Author

Created with creative stubbornness by [hotheadhacker](https://github.com/hotheadhacker)
Overengineered and AI injected with no care by [mio9](https://github.com/mio9)

---

## 📄 License

MIT — do whatever, just don’t say yes when you should say no.
