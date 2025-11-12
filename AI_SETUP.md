# AI Question Generation Setup Guide

## Overview

The app now supports **two modes**:
1. **Pre-set Questions** - Free, instant, curated question bank
2. **AI-Generated** - Custom questions tailored to your specific job description

## Getting Started with AI Mode

### Step 1: Get an OpenAI API Key

1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Click **"Create new secret key"**
4. Give it a name (e.g., "Interview Practice App")
5. Copy the key (starts with `sk-...`)

**Note:** OpenAI gives you $5 free credit when you sign up!

### Step 2: Use the App

1. Paste your job description
2. View detected skills
3. Select **"AI-Generated"** mode
4. Enter your API key when prompted
5. Wait 15-30 seconds for questions to generate
6. Start your practice test!

## Features of AI-Generated Questions

- **Tailored to the job**: Questions are generated based on the actual job description
- **Realistic scenarios**: Questions reflect what you'd actually encounter in the role
- **Fresh every time**: Different questions each time you run a test
- **Multiple choice format**: All AI questions have 4 answer choices with explanations

## Cost

- **Pre-set mode**: 100% free
- **AI mode**: ~$0.01-0.02 per test session
  - Typical test with 5 skills × 3 questions = ~$0.015
  - With $5 free credit, you can run ~300+ tests

## Privacy & Security

- Your API key is stored **only in your browser** (localStorage)
- Never sent to any server except OpenAI
- You can clear it anytime by clearing browser data
- The app runs entirely client-side

## Troubleshooting

### "Error generating AI questions"

**Possible causes:**
1. **Invalid API key**: Double-check you copied it correctly
2. **No credits**: Check your OpenAI account has credits
3. **Rate limit**: Wait a minute and try again
4. **Network issue**: Check your internet connection

**Solution**: Try pre-set questions mode instead, or verify your API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Questions seem generic

The AI tries to match the job description. For best results:
- Use complete job descriptions (not just bullet points)
- Include specific technologies and requirements
- Paste the entire job posting including responsibilities

### API key not saving

- Check browser localStorage is enabled
- Try a different browser
- Clear cache and try again

## Comparison: Pre-set vs AI

| Feature | Pre-set | AI-Generated |
|---------|---------|--------------|
| **Cost** | Free | ~$0.01-0.02/test |
| **Speed** | Instant | 15-30 seconds |
| **Customization** | Generic | Job-specific |
| **Variety** | Fixed pool | Unlimited |
| **Quality** | Curated | GPT-3.5 quality |
| **Best for** | Quick practice | Realistic prep |

## Tips for Best Results

1. **Use complete job descriptions** - More context = better questions
2. **Test both modes** - Compare generic vs tailored questions
3. **Reuse your key** - It's saved in your browser
4. **Mix it up** - Try AI mode for important interviews, pre-set for daily practice

## Example API Key Format

```
sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

If your key doesn't start with `sk-`, it's not valid.

## Managing Costs

- **Set spending limits** in OpenAI dashboard
- **Use pre-set mode** for daily practice
- **Reserve AI mode** for specific job interviews
- **Monitor usage** at [platform.openai.com/usage](https://platform.openai.com/usage)

## Support

For issues with:
- **The app**: Check browser console (F12) for errors
- **OpenAI API**: Visit [help.openai.com](https://help.openai.com)
- **API keys**: Manage at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

---

**Pro Tip**: Start with pre-set questions to get familiar with the app, then use AI mode when preparing for a specific interview!
