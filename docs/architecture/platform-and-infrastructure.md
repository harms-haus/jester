# Platform and Infrastructure

## Deployment Strategy

**Option 1: Local-First with Optional Cloud Integration** ✅ **SELECTED**

**Rationale**: 
- Maintains complete control over personal story content
- Enables offline operation for bedtime story generation
- Provides flexibility for future cloud features without vendor lock-in
- Aligns with family-focused, privacy-conscious approach

**Infrastructure Requirements**:
- Local development environment (Node.js, Git)
- LightRAG service (local or cloud-hosted)
- File system with Git versioning
- Optional: Cloud storage for backup/sync

## Technology Stack

**Core Runtime**: Node.js with TypeScript  
**Agent Framework**: Prompt-based (no custom agent code)  
**Knowledge Graph**: LightRAG with OpenAPI integration  
**File Management**: Node.js file system + Git  
**Configuration**: YAML files  
**Templates**: YAML with prompt injection  

**Dependencies**:
- `@types/node` - TypeScript definitions
- `axios` - HTTP client for LightRAG API
- `yaml` - YAML parsing and generation
- `fs-extra` - Enhanced file system operations
- `git-js` - Git operations for analytics
