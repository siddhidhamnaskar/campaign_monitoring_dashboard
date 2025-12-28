# TODO: Implement Error & Rate-Limit Handling

## Tasks
- [ ] Update `handleApiError` in `app/lib/api.ts` to provide user-friendly messages for 400, 429, and 500+ errors
- [ ] Ensure error messages are clear and actionable for users
- [ ] Test error handling in components that use API calls

## Details
- 400: Invalid request - Message: "Please check your input and try again."
- 429: Rate limit exceeded - Message: "Too many requests. Please wait a moment and try again."
- 500+: Server errors - Message: "Something went wrong on our end. Please try again later."
