# Setting Up Your OpenAI API Key

Your API key is already configured in the `.env` file! Here's what you need to know:

## Current Setup

Your OpenAI API key is stored in `.env` and will be automatically used when you select "AI-Generated" mode.

## How It Works

1. The app checks for `VITE_OPENAI_API_KEY` in `.env`
2. If found, it uses that key automatically
3. If not found, it prompts you to enter one manually
4. Your key is **NEVER** exposed in the built app

## Security

✅ **Safe:**
- `.env` is in `.gitignore` (won't be committed to Git)
- Key is only in your local development environment
- Not included in the production build when deployed

⚠️ **Warning:**
- **DO NOT** commit the `.env` file to GitHub
- **DO NOT** share your API key publicly
- **DO NOT** deploy to Vercel with the key in `.env`

## For Deployment (Vercel)

When deploying to Vercel, don't use the `.env` file. Instead:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `VITE_OPENAI_API_KEY` = `your-key-here`
4. Deploy

This keeps your key secure in Vercel's encrypted environment.

## Changing Your API Key

To update your API key:

1. Open `.env`
2. Replace the value of `VITE_OPENAI_API_KEY`
3. Restart the dev server: `npm run dev`

## If You Don't Have an API Key

1. Get one free at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Copy the key (starts with `sk-...`)
3. Paste it in `.env` as `VITE_OPENAI_API_KEY=sk-...`
4. Restart dev server

## Testing

To test if your API key is working:

1. Open http://localhost:5173
2. Paste a job description and click "Analyze"
3. Select "AI-Generated" mode
4. Click "Start Practice Test"
5. You should see "Generating AI Questions..." without being prompted for a key
6. Wait 15-30 seconds for questions to generate

If it prompts for an API key, your `.env` isn't being loaded. Try:
- Restart the dev server
- Check the `.env` file exists in the root directory
- Check the key format is correct

## Cost Tracking

Monitor your usage at: [platform.openai.com/usage](https://platform.openai.com/usage)

Each test costs approximately $0.01-0.02.

## Example .env File

```bash
VITE_OPENAI_API_KEY=sk-proj-abc123...xyz789
```

That's it! Your API key is ready to use.
