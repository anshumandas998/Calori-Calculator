# TODO - AI key integration

- [x] Implement OpenAI-backed AI responses for:
  - [x] POST /api/ai/tip
  - [x] POST /api/ai/meal-plan
  - [x] POST /api/ai/recommendations
- [x] Add safe environment variable handling:
  - [x] Read `process.env.openai_API_KEY`
  - [x] Return 500 with a clear error if missing
- [x] Add `.env.example` documenting required variables (without real secrets)
- [ ] Update package.json dependencies if required (OpenAI SDK)
- [ ] Create a git branch `blackboxai/*`, commit changes, and push to GitHub repository

