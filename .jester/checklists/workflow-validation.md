# Workflow Validation Checklist

**Purpose**: Ensure all agents follow the correct three-stage workflow for entity creation and file management.

## Entity Creation Rules

### ✅ CORRECT Workflow
1. **Draft Phase**: Entities are created in `ready/<type>s/` directory only
2. **Published Phase**: Entities are moved to `complete/<type>s/` directory via `/edit publish` command
3. **Entity Creation**: Use `/entity create` command separately, not during outline/context generation

### ❌ INCORRECT Workflow
1. **NEVER create entities directly in `complete/` during draft phase**
2. **NEVER create entities during outline generation**
3. **NEVER create entities during context generation**

## Agent-Specific Validation

### Muse Agent (`/muse`)
- ✅ **CORRECT**: Read entities from both `ready/` and `complete/` directories
- ✅ **CORRECT**: Create only context files in `draft/` directory
- ❌ **INCORRECT**: Creating entity files directly in `complete/`
- ❌ **INCORRECT**: Creating entity files during context generation

### Write Agent (`/write`)
- ✅ **CORRECT**: Read entities from `ready/` directory only
- ✅ **CORRECT**: Create only outline and story files in `draft/` directory
- ❌ **INCORRECT**: Creating entity files during outline generation
- ❌ **INCORRECT**: Creating entity files during story generation

### Entity Agent (`/entity`)
- ✅ **CORRECT**: Create entities in `ready/<type>s/` directory only
- ✅ **CORRECT**: Read entities from both `ready/` and `complete/` directories
- ❌ **INCORRECT**: Creating entities directly in `complete/` directory

### Edit Agent (`/edit`)
- ✅ **CORRECT**: Move entities from `ready/` to `complete/` via publish command
- ✅ **CORRECT**: Read entities from appropriate directories based on workflow stage
- ❌ **INCORRECT**: Creating entities in wrong directories

## Validation Checklist

Before any agent creates or moves files, verify:

- [ ] **Entity Creation**: Only `/entity create` command creates entity files
- [ ] **Directory Location**: Entities created in `ready/<type>s/` only during draft phase
- [ ] **Workflow Stage**: Context generation only reads entities, never creates them
- [ ] **Workflow Stage**: Outline generation only reads entities, never creates them
- [ ] **Workflow Stage**: Story generation only reads entities, never creates them
- [ ] **Publishing**: Entities moved to `complete/` only via `/edit publish` command

## Error Prevention

### Common Mistakes to Avoid
1. **Creating entities in `complete/` during draft phase**
2. **Creating entities during outline generation**
3. **Creating entities during context generation**
4. **Mixing entity creation with content generation**

### Recovery Actions
1. **If entities created in wrong location**: Move to correct directory
2. **If entities created during wrong phase**: Remove and recreate with proper command
3. **If workflow violated**: Stop and redirect to proper workflow

## Success Criteria

- ✅ All entities created in `ready/` during draft phase
- ✅ All entities moved to `complete/` only via publish command
- ✅ No entity creation during outline or context generation
- ✅ Proper three-stage workflow maintained: `draft/` → `ready/` → `complete/`
