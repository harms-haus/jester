# Architecture Decision Records (ADRs)

This document contains the key architectural decisions made for the Jester project, including the rationale, alternatives considered, and consequences of each decision.

## ADR-001: Prompt-Based Agent Architecture

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to create a system that can be implemented by external LLM agents without requiring custom code execution.

### Decision
Use a prompt-based agent architecture where all system behavior is defined through markdown prompt rule files that external LLM agents follow, rather than executable code.

### Rationale
- **BMAD Pattern Compliance**: Follows established BMAD (Business Model Architecture Design) principles
- **LLM Agent Compatibility**: Enables any LLM capable of following prompts to implement the system
- **Maintainability**: Changes to system behavior only require prompt engineering, not code changes
- **Accessibility**: Non-programmers can modify and extend the system through prompt editing
- **Flexibility**: Easy to adapt to different LLM capabilities and limitations

### Alternatives Considered
1. **Traditional Code-Based Architecture**: Rejected due to complexity and maintenance overhead
2. **Hybrid Approach**: Rejected due to inconsistency and complexity
3. **Configuration-Only Approach**: Rejected due to limited expressiveness

### Consequences
- **Positive**: High flexibility, easy maintenance, LLM agent compatibility
- **Negative**: Relies on LLM compliance, requires careful prompt engineering
- **Risk**: LLM agents may not follow prompts consistently

## ADR-002: Local-First Storage Strategy

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to ensure user privacy and control over personal story content.

### Decision
Implement a local-first storage strategy where all user content is stored locally with optional cloud sync, rather than cloud-first or hybrid approaches.

### Rationale
- **Privacy**: Complete control over personal story content
- **Offline Operation**: System works without internet connectivity
- **No Vendor Lock-in**: Users own their data completely
- **Family-Focused**: Aligns with privacy-conscious family values
- **Performance**: Fast local file operations

### Alternatives Considered
1. **Cloud-First**: Rejected due to privacy concerns and vendor lock-in
2. **Hybrid Cloud/Local**: Rejected due to complexity and privacy risks
3. **Database-Based**: Rejected due to complexity and maintenance overhead

### Consequences
- **Positive**: Privacy, offline operation, user control, performance
- **Negative**: No automatic backup, requires manual sync management
- **Risk**: Data loss if local storage fails

## ADR-003: LightRAG Integration via MCP Client

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to integrate with LightRAG knowledge graph for entity relationship discovery while maintaining prompt-based architecture.

### Decision
Use a TypeScript MCP (Model Context Protocol) client as the only executable code in the system, with all other functionality implemented through prompt-based agents.

### Rationale
- **Reliable API Communication**: TypeScript provides robust HTTP client capabilities
- **Exception to Prompt Rule**: Only external service integration requires executable code
- **Maintains Architecture**: All other functionality remains prompt-based
- **Performance**: Efficient API communication for knowledge graph queries
- **Error Handling**: Robust error handling for external service failures

### Alternatives Considered
1. **Prompt-Only API Calls**: Rejected due to unreliable LLM API handling
2. **Full TypeScript Implementation**: Rejected due to complexity and maintenance overhead
3. **Python/Other Language Client**: Rejected due to additional complexity

### Consequences
- **Positive**: Reliable API communication, maintains prompt-based architecture
- **Negative**: Single point of executable code, requires TypeScript maintenance
- **Risk**: MCP client becomes a bottleneck or failure point

## ADR-004: Hierarchical Command Structure

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to provide clear, organized command interface that reduces cognitive load and provides contextual guidance.

### Decision
Implement a hierarchical command structure with slash commands (`/jester`, `/write`, `/muse`, `/edit`, etc.) that provide contextual guidance and reduce cognitive load.

### Rationale
- **User Experience**: Clear, organized interface that's easy to understand
- **Contextual Guidance**: Commands provide relevant help and suggestions
- **Reduced Cognitive Load**: Users don't need to remember complex command syntax
- **Extensibility**: Easy to add new commands and functionality
- **Consistency**: Uniform command structure across all agents

### Alternatives Considered
1. **Flat Command Structure**: Rejected due to complexity and poor UX
2. **GUI Interface**: Rejected due to complexity and maintenance overhead
3. **Natural Language Only**: Rejected due to ambiguity and inconsistency

### Consequences
- **Positive**: Better UX, contextual guidance, easy to extend
- **Negative**: Command hierarchy complexity, requires careful design
- **Risk**: Command structure becomes too complex or confusing

## ADR-005: File-Based Pipeline Communication

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need a communication mechanism between LLM agents that's human-readable and debuggable.

### Decision
Use a file-based pipeline where LLM agents communicate through structured files (YAML for context, Markdown for outlines and stories) rather than direct API calls or shared memory.

### Rationale
- **Human Readable**: Intermediate results are visible and editable by humans
- **Debuggable**: Easy to inspect and debug the pipeline at any stage
- **Version Control**: All intermediate results can be tracked with Git
- **LLM Compatible**: LLM agents can easily read and write files
- **Flexibility**: Easy to modify or skip pipeline stages

### Alternatives Considered
1. **Direct API Communication**: Rejected due to complexity and LLM limitations
2. **Shared Database**: Rejected due to complexity and maintenance overhead
3. **Message Queues**: Rejected due to complexity and LLM limitations

### Consequences
- **Positive**: Human readable, debuggable, version controllable
- **Negative**: Relies on LLM file operations, potential consistency issues
- **Risk**: File operations may fail or be inconsistent

## ADR-006: Wiki-Style Entity Linking

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to maintain entity relationships and consistency across stories while keeping the system simple and maintainable.

### Decision
Use wiki-style `[[entity]]` linking for entity references in all files, with bidirectional link maintenance and validation.

### Rationale
- **Simplicity**: Easy to understand and implement
- **Obsidian Compatibility**: Works with popular note-taking tools
- **Bidirectional Links**: Automatic relationship maintenance
- **Human Readable**: Links are visible and editable
- **Validation**: Easy to detect broken or missing links

### Alternatives Considered
1. **Database Relationships**: Rejected due to complexity and maintenance overhead
2. **JSON References**: Rejected due to poor human readability
3. **Custom Link Syntax**: Rejected due to lack of tool compatibility

### Consequences
- **Positive**: Simple, human readable, tool compatible
- **Negative**: Requires link validation and maintenance
- **Risk**: Broken links may cause inconsistencies

## ADR-007: Three-Stage Workflow Organization

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to organize story projects in a way that supports the three-stage workflow (context → outline → story) while maintaining clear project boundaries.

### Decision
Organize files in a three-stage workflow with story-project-based organization: `draft/{NNN}/`, `reading/{NNN} - Story Title/`, and `universe/` directories.

### Rationale
- **Clear Progression**: Obvious workflow from draft to reading to universe
- **Project Isolation**: Each story project is self-contained
- **Easy Navigation**: Clear directory structure for finding content
- **Version Control**: Easy to track changes and rollbacks
- **User Understanding**: Intuitive organization that users can understand

### Alternatives Considered
1. **Flat Directory Structure**: Rejected due to poor organization and navigation
2. **Date-Based Organization**: Rejected due to poor project isolation
3. **Single Directory**: Rejected due to poor organization and confusion

### Consequences
- **Positive**: Clear organization, easy navigation, project isolation
- **Negative**: Directory structure complexity, requires careful management
- **Risk**: Directory structure becomes too complex or confusing

## ADR-008: Persona System Implementation

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to enhance user experience through engaging AI personas while preserving core functionality.

### Decision
Implement a persona system that selects random personas at startup and applies them to user interactions while never affecting tool output or core functionality.

### Rationale
- **Enhanced UX**: Makes story creation more fun and engaging
- **Preserved Functionality**: Core story generation remains unchanged
- **User Control**: Users can change or disable personas
- **Consistency**: Persona persists throughout session
- **Non-Intrusive**: Doesn't affect technical operations

### Alternatives Considered
1. **No Personas**: Rejected due to poor user experience
2. **Personas Affect Tool Output**: Rejected due to functionality concerns
3. **Fixed Persona**: Rejected due to lack of variety and user choice

### Consequences
- **Positive**: Enhanced UX, user engagement, preserved functionality
- **Negative**: Additional complexity, potential confusion
- **Risk**: Personas may interfere with core functionality

## ADR-009: Target Audience Management System

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to support multiple target audience members with different ages and preferences for story generation.

### Decision
Implement a target audience management system that stores named profiles with birthday information and affects story generation parameters.

### Rationale
- **Personalization**: Stories tailored to specific children
- **Age Appropriateness**: Automatic age calculation and content adjustment
- **Multiple Children**: Support for families with multiple children
- **Consistency**: Maintains character and story consistency across children
- **Flexibility**: Easy to add or modify target audience profiles

### Alternatives Considered
1. **Single Target Audience**: Rejected due to limited personalization
2. **Age-Only System**: Rejected due to lack of personalization
3. **Complex Profile System**: Rejected due to complexity and maintenance overhead

### Consequences
- **Positive**: Personalization, age appropriateness, multiple children support
- **Negative**: Additional complexity, profile management overhead
- **Risk**: Profile management becomes too complex or confusing

## ADR-010: Validation Framework Implementation

**Status**: Accepted  
**Date**: 2024-12-19  
**Context**: Need to ensure content quality and prevent data loss during story progression between stages.

### Decision
Implement a comprehensive validation framework with automated checks, user approval workflows, and conflict detection during story progression.

### Rationale
- **Quality Assurance**: Ensures content completeness and consistency
- **Data Protection**: Prevents data loss during progression
- **User Control**: Users can override validation when appropriate
- **Conflict Resolution**: Handles file conflicts and overwrites gracefully
- **Automation**: Reduces manual validation overhead

### Alternatives Considered
1. **No Validation**: Rejected due to quality and data loss risks
2. **Manual Validation Only**: Rejected due to overhead and inconsistency
3. **Strict Validation**: Rejected due to user frustration and inflexibility

### Consequences
- **Positive**: Quality assurance, data protection, user control
- **Negative**: Additional complexity, potential user frustration
- **Risk**: Validation becomes too strict or too lenient

## Decision Record Template

For future decisions, use this template:

```markdown
## ADR-XXX: [Decision Title]

**Status**: [Proposed | Accepted | Rejected | Deprecated]  
**Date**: [YYYY-MM-DD]  
**Context**: [Brief description of the context and problem]

### Decision
[The decision that was made]

### Rationale
[Why this decision was made, including benefits and considerations]

### Alternatives Considered
[Other options that were considered and why they were rejected]

### Consequences
[Positive and negative consequences of this decision, including risks]
```
