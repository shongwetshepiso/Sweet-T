# Joke Generator API Integration

## Overview

The Sweet-T platform includes a fun **Joke Generator** feature that fetches random jokes from an external API and serves them through REST endpoints. This feature demonstrates external API integration, error handling, and proper service architecture.

## Features

✨ **Joke Generation:**
- Fetch random jokes from external API
- Support multiple joke categories
- Format jokes for display
- Batch joke retrieval

✨ **API Endpoints:**
- Single random joke
- Multiple random jokes
- Category-specific jokes
- Available categories list

✨ **Error Handling:**
- Network error recovery
- API timeout handling
- Rate limit management
- Graceful degradation

## API Endpoints

### Get Random Joke

```http
GET /api/v1/jokes/random
```

**Response:**
```json
{
  "success": true,
  "data": {
    "joke": "Why did the scarecrow win an award? He was outstanding in his field!",
    "type": "general",
    "raw": { ... }
  }
}
```

### Get Multiple Random Jokes

```http
GET /api/v1/jokes/random/:count
```

**Parameters:**
- `count` (integer, 1-100): Number of jokes to fetch

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 3,
    "jokes": [
      { "joke": "Joke 1", "type": "general" },
      { "joke": "Joke 2", "type": "programming" },
      { "joke": "Joke 3", "type": "dad" }
    ]
  }
}
```

### Get Joke by Category

```http
GET /api/v1/jokes/category/:category
```

**Parameters:**
- `category` (string): Joke category (e.g., programming, general, knock-knock, dad)

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "programming",
    "joke": "How many programmers does it take to change a light bulb?",
    "type": "programming"
  }
}
```

### Get Available Categories

```http
GET /api/v1/jokes/categories
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": ["general", "programming", "knock-knock", "dad"]
  }
}
```

## Service Architecture

### JokeService Class

Located in `src/services/jokeService.ts`:

```typescript
export class JokeService {
  // Fetch a random joke
  async getRandomJoke(): Promise<Joke>

  // Fetch jokes by category
  async getJokeByCategory(category: string): Promise<Joke>

  // Fetch multiple jokes
  async getRandomJokes(count: number): Promise<Joke[]>

  // Format joke for display
  formatJoke(joke: Joke): string

  // Get available categories
  async getJokeCategories(): Promise<string[]>
}
```

## Integration Steps

### 1. Install Dependencies

```bash
npm install axios
npm install --save-dev @types/axios
```

### 2. Configure Environment

Add to `.env`:

```bash
JOKE_API_URL=https://api.api-ninjas.com/v1
JOKE_API_KEY=your-api-key  # if required
```

### 3. Register Routes

In your main server file:

```typescript
import jokeRoutes from './api/jokes';

app.use('/api/v1/jokes', jokeRoutes);
```

### 4. Use the Service

```typescript
import JokeService from './services/jokeService';

const jokeService = new JokeService();

// Get a random joke
const joke = await jokeService.getRandomJoke();
console.log(jokeService.formatJoke(joke));

// Get programming jokes
const progJoke = await jokeService.getJokeByCategory('programming');
```

## Testing

### Run Tests

```bash
# Test the service
npm test tests/services/jokeService.test.ts

# Test the API endpoints
npm test tests/api/jokes.test.ts

# All tests
npm test
```

### Test Coverage

- ✅ Service initialization
- ✅ Single joke fetching
- ✅ Multiple joke fetching
- ✅ Category filtering
- ✅ Joke formatting
- ✅ Error handling
- ✅ API endpoint validation
- ✅ Response format validation

## Error Handling

### Network Errors

```json
{
  "success": false,
  "error": "Failed to fetch joke: Network request failed"
}
```

### Validation Errors

```json
{
  "success": false,
  "error": "Count must be a number between 1 and 100"
}
```

### Not Found Errors

```json
{
  "success": false,
  "error": "No jokes found for category: unknown"
}
```

## External API Integration

### API Ninjas Jokes API

The current implementation uses [API Ninjas](https://api-ninjas.com/api/jokes):

**Features:**
- Free tier available
- No authentication required for public endpoint
- Multiple categories supported
- Rate limiting: 100 requests/month on free tier

**Alternative APIs:**

1. **JokeAPI** (jokeapi.dev)
   ```
   GET https://v2.jokeapi.dev/joke/Any?amount=5
   ```

2. **Official Joke API** (official-joke-api.appspot.com)
   ```
   GET https://official-joke-api.appspot.com/random_joke
   ```

3. **Dad Jokes API** (icanhazdadjoke.com)
   ```
   GET https://icanhazdadjoke.com/
   ```

## Usage Examples

### React Frontend Integration

```typescript
// Example: Fetch and display a joke
const [joke, setJoke] = useState<string>('');

const fetchJoke = async () => {
  const response = await fetch('/api/v1/jokes/random');
  const data = await response.json();
  setJoke(data.data.joke);
};

return (
  <div>
    <button onClick={fetchJoke}>Get Joke</button>
    <p>{joke}</p>
  </div>
);
```

### Batch Fetch in Node.js

```typescript
const jokeService = new JokeService();

// Get 5 jokes at once
const jokes = await jokeService.getRandomJokes(5);
jokes.forEach((joke, index) => {
  console.log(`Joke ${index + 1}: ${jokeService.formatJoke(joke)}`);
});
```

### Category-Specific Jokes

```typescript
// Get a programming joke
const progJoke = await jokeService.getJokeByCategory('programming');
console.log(jokeService.formatJoke(progJoke));
```

## Performance Considerations

### Caching

For production, consider implementing caching:

```typescript
// Redis caching example
const cachedJoke = await redis.get('joke:random');
if (!cachedJoke) {
  const joke = await jokeService.getRandomJoke();
  await redis.set('joke:random', JSON.stringify(joke), 'EX', 3600);
}
```

### Rate Limiting

The service respects API rate limits:

```typescript
// Configure rate limit settings
const jokeService = new JokeService();
// Automatic retry with exponential backoff
```

### Batch Operations

For multiple jokes:

```typescript
// Efficient batch fetch
const jokes = await jokeService.getRandomJokes(10);
```

## Troubleshooting

### "No joke data received from API"

- Check API endpoint is accessible
- Verify API key if required
- Check network connectivity

### "Count must be between 1 and 100"

- Ensure count parameter is valid
- API limits batch size to 100

### Timeout Errors

- Increase timeout in `JokeService` constructor
- Check network connection
- Verify API server status

## Future Enhancements

- [ ] Implement joke caching with Redis
- [ ] Add joke ratings/feedback
- [ ] Support joke search by keywords
- [ ] Implement joke translation
- [ ] Add user joke submission
- [ ] Create joke recommendation engine
- [ ] Add webhook for new jokes
- [ ] Implement joke moderation system

## Security Considerations

✅ **Input Validation:**
- Category names validated
- Count parameter range checked
- API responses sanitized

✅ **API Key Management:**
- Use environment variables for API keys
- Never commit secrets to repository
- Rotate keys regularly

✅ **Rate Limiting:**
- Respect external API limits
- Implement local rate limiting
- Cache responses appropriately

## Additional Resources

- [API Ninjas Documentation](https://api-ninjas.com/api/jokes)
- [JokeAPI Documentation](https://jokeapi.dev/)
- [Axios Documentation](https://axios-http.com/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)

## Support

For issues or questions about the Joke Generator:
1. Check test files for usage examples
2. Review error handling in JokeService
3. Open an issue on GitHub
