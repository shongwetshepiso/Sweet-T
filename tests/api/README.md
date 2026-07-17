# API Testing Guide

## Overview

This directory contains comprehensive API endpoint tests for the Sweet-T platform, organized by feature area:

- **auth.test.ts** - Authentication and authorization endpoints
- **video.test.ts** - Video upload, streaming, and management endpoints
- **user.test.ts** - User profile, watchlist, history, and preferences
- **responses.test.ts** - Error handling and response format standards

## Running API Tests

```bash
# Run all API tests
npm test tests/api

# Run specific test file
npm test tests/api/auth.test.ts

# Run with coverage
npm run test:coverage tests/api

# Watch mode
npm run test:watch tests/api
```

## Test Structure

Each test file follows this pattern:

```typescript
describe('Feature Name', () => {
  describe('Endpoint Name', () => {
    it('should test specific behavior', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Authentication Tests

### Endpoints Covered

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

### Key Test Cases

- Valid/invalid credentials
- Password strength validation
- Email format validation
- Token generation and validation
- Rate limiting on failed attempts
- COPPA compliance for children

## Video API Tests

### Endpoints Covered

- `POST /api/v1/videos/upload` - Video upload
- `GET /api/v1/videos` - List videos
- `GET /api/v1/videos/:videoId` - Get video details
- `PUT /api/v1/videos/:videoId` - Update video
- `DELETE /api/v1/videos/:videoId` - Delete video
- `GET /api/v1/videos/:videoId/stream` - Stream video

### Key Test Cases

- File format validation
- File size validation
- Quality level selection
- Age rating enforcement
- HLS streaming manifest generation
- Parental controls enforcement
- Access control validation

## User Profile & Content Tests

### Endpoints Covered

- `GET /api/v1/user/profile` - Get profile
- `PUT /api/v1/user/profile` - Update profile
- `POST /api/v1/user/watchlist` - Add to watchlist
- `DELETE /api/v1/user/watchlist/:videoId` - Remove from watchlist
- `GET /api/v1/user/history` - Get viewing history
- `PUT /api/v1/user/preferences` - Update preferences
- `PUT /api/v1/user/parental-controls` - Update parental controls

### Key Test Cases

- Profile validation
- Watchlist management
- Viewing history tracking
- Watch progress calculation
- Preference storage and validation
- Parental control enforcement
- Daily watch time limits

## Response Format Tests

### Standards Covered

- Error response format
- HTTP status codes
- Content-Type headers
- Cache control headers
- Rate limiting headers
- Request validation
- Input sanitization

## Test Data & Mocks

### Helper Functions

Mock helpers are defined in `tests/setup.ts`:

```typescript
// Create mock user
const user = createMockUser({ email: 'custom@example.com' });

// Create mock video
const video = createMockVideo({ title: 'Custom Title' });

// Create mock token
const token = createMockToken();
```

### Authentication

All protected endpoints use:

```typescript
const authToken = 'Bearer valid-jwt-token';
```

## Expected Coverage

- **Lines**: 80%+
- **Functions**: 80%+
- **Branches**: 80%+
- **Statements**: 80%+

## Common Assertions

```typescript
// Status codes
expect(response.status).toBe(200);

// Response structure
expect(response.data).toHaveProperty('videoId');

// Data validation
expect(response.data.title).toBeDefined();
expect(response.data.quality).toContain('4k');

// Error cases
expect(response.success).toBe(false);
expect(response.error).toBe('User not found');
```

## Debugging Tests

```bash
# Run single test with verbose output
npm test tests/api/auth.test.ts -- --reporter=verbose

# Debug mode
node --inspect-brk node_modules/.bin/vitest tests/api/auth.test.ts
```

## Adding New Tests

When adding API tests for new endpoints:

1. Create test file in `tests/api/`
2. Follow existing naming conventions
3. Include all happy path and error scenarios
4. Add validation tests
5. Test access control
6. Update this guide

## CI/CD Integration

Tests are automatically run on:

- Every push to `main` or `develop`
- Every pull request
- Before deployment

See `.github/workflows/test.yml` for CI configuration.
