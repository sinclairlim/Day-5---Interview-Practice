# Setting Up Gemini AI (FREE!)

Your interview practice app now supports **Google's Gemini AI** as a free alternative to OpenAI!

## Why Gemini?

- **Free tier**: Generous free quota for testing and development
- **No credit card required** to get started
- **Fast and powerful**: Uses Gemini 1.5 Flash model
- **Same features**: AI-generated questions and code evaluation

## Quick Setup (3 minutes)

### 1. Get Your Free API Key

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the API key

### 2. Add to Your App

**Option A: Add to .env file** (recommended)
```bash
# Open .env file and add:
VITE_GEMINI_API_KEY=your-actual-api-key-here
```

**Option B: Enter in the app**
- Just select "Gemini AI" mode when starting a test
- The app will prompt you to enter the API key
- It will be saved in your browser

### 3. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C) and restart:
npm run dev
```

## How to Use

1. Analyze a job description
2. When choosing question mode, select **"Gemini AI"** (the one with the ✨ icon)
3. Click "Start Practice Test"
4. If you haven't added an API key, you'll be prompted to enter one
5. Start coding!

## Gemini vs OpenAI

| Feature | Gemini | OpenAI |
|---------|--------|--------|
| **Cost** | Free tier available | Requires credits |
| **Setup** | Just Google account | Credit card required |
| **Quality** | Excellent | Excellent |
| **Speed** | Very fast | Fast |
| **Model** | Gemini 1.5 Flash | GPT-4o-mini |

## Free Tier Limits

Gemini's free tier includes:
- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day

**This is more than enough for practice tests!** Each full test (9 questions) uses:
- ~18 requests (9 questions + 9 evaluations)
- Well within the free limits

## Comparison: All Three Modes

### 1. Pre-set Questions (FREE)
- ✅ No API key needed
- ✅ Instant
- ❌ Limited question variety
- ❌ Basic code evaluation

### 2. Gemini AI (FREE)
- ✅ Free tier available
- ✅ Custom questions for each job
- ✅ AI code evaluation with detailed feedback
- ✅ No credit card required

### 3. OpenAI GPT (PAID)
- ❌ Requires API credits (~$0.20-0.30 per test)
- ✅ Custom questions for each job
- ✅ AI code evaluation with detailed feedback
- ❌ Credit card required

## Example Workflow

```bash
# 1. You paste a job description mentioning React, TypeScript, Node.js

# 2. App detects the skills

# 3. You select "Gemini AI" mode

# 4. Gemini generates 9 custom coding challenges:
   - 3 React questions (hooks, components, state)
   - 3 TypeScript questions (types, interfaces, generics)
   - 3 Node.js questions (APIs, async, middleware)

# 5. You write code for each question

# 6. Gemini evaluates your code:
   - Score: 0-100
   - Feedback: Overall assessment
   - Strengths: What you did well
   - Improvements: Specific suggestions
   - Sample solution: Reference implementation
```

## Troubleshooting

### "API key is invalid"
- Make sure you copied the full key from Google AI Studio
- Check for extra spaces at the beginning/end
- Try regenerating the key

### "Rate limit exceeded"
- You've hit the free tier limit (1,500 requests/day)
- Wait 24 hours or upgrade to paid tier
- Use pre-set questions mode in the meantime

### Questions aren't being generated
- Check browser console (F12) for errors
- Verify your API key is correct
- Make sure you have internet connection
- Try refreshing the page

## Getting Started Now

1. Get your free Gemini API key: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Add to `.env` file or enter in the app
3. Restart dev server: `npm run dev`
4. Select "Gemini AI" mode and start practicing!

## API Key Safety

- Your API key is stored **only in your browser** (localStorage)
- It's never sent to any server except Google's API
- It's not included in git (`.env` is in `.gitignore`)
- You can revoke/regenerate keys anytime at Google AI Studio

## Need Help?

If you run into issues:
1. Check the browser console (F12) for error messages
2. Verify your API key at [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
3. Try using pre-set questions mode to verify the app works
4. Make sure you have the latest version: `git pull`

---

**Ready to practice?** Get your free Gemini API key and start coding! 🚀
