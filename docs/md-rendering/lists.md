# Lists

## Unordered

- Normal list item without emphasis
- *Note: not as important as regular list item*
- **Summary:** longer description with more information
  1. Nested numbered list items are allowed
- **Important: Something really important to know**
- ***CRITICAL: Something really dire and critical to know***
  - Nested unordered list items are allowed

## Ordered

1. Sequential list message without emphasis
   *Note: not as important as regular list item*
2. **Summary:** longer description with more information
   1. Nested numbered list items are allowed
3. **Important: Something really important to know**
4. ***CRITICAL: Something really dire and critical to know***
   - Nested unordered list items are allowed

## Context Directory

### Heading Describing the Directory (relative to `./.jester/directory/`)

- [Context Tool Name](relative-path.md): A description of what the tool does
- ALWAYS LOAD: [Context Tool Name](relative-path.yaml): A tool that always loads
- `a-child-directory/`
  - [Context Tool Name](relative-path.md): A tool in a child directory
  
## Checklist Items

These are for large long-running tasks with multiple parts. They may be broken down further into numbered groups

1. **The first major checklist group:**

   [[LLM: Check that X is not Y/Ensure that X and Y are Z/Validate that X is Y/etc.]]
   - [ ] Complete the first part of the task
   - [ ] Complete the second part of the task
   - [ ] Complete the third part of the task
   - [ ] Summarize/check/validate/etc. the above tasks
