# Coding Standards

## TypeScript Standards

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use explicit return types for public methods
- Follow camelCase for variables and functions
- Use PascalCase for classes and interfaces

## File Organization

- One interface/class per file
- Group related functionality in modules
- Use barrel exports (index.ts) for clean imports
- Keep file sizes under 200 lines when possible

## Error Handling

- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors with context information
- Graceful degradation for non-critical failures

## Documentation

- JSDoc comments for all public methods
- README files for each major component
- Inline comments for complex logic
- Keep documentation up to date
