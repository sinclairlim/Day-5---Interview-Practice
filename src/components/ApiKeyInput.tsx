import { useState } from 'react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  provider?: 'openai' | 'gemini';
}

export function ApiKeyInput({ onApiKeySubmit, provider = 'openai' }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  const isGemini = provider === 'gemini';

  return (
    <div className="api-key-modal">
      <div className="api-key-content">
        <h3>{isGemini ? 'Gemini' : 'OpenAI'} API Key Required</h3>
        <p>To generate AI-powered questions, please enter your {isGemini ? 'Gemini' : 'OpenAI'} API key.</p>

        <div className="info-box">
          <h4>How to get an API key:</h4>
          {isGemini ? (
            <ol>
              <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">aistudio.google.com/app/apikey</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API key"</li>
              <li>Copy the key and paste it below</li>
            </ol>
          ) : (
            <ol>
              <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a></li>
              <li>Sign up or log in</li>
              <li>Click "Create new secret key"</li>
              <li>Copy the key and paste it below</li>
            </ol>
          )}
          <p className="note">
            <strong>Note:</strong> Your API key is stored only in your browser and never sent to our servers.
            {isGemini
              ? ' Gemini has a generous free tier for testing!'
              : ' Generating questions costs approximately $0.01-0.02 per test.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="api-key-input"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="btn-secondary btn-small"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={!apiKey.trim()}>
            Save API Key & Continue
          </button>
        </form>

        <p className="skip-text">
          Don't have an API key? You can still use pre-generated questions instead.
        </p>
      </div>
    </div>
  );
}
