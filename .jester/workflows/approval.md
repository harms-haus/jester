
# Approval Workflow

## Purpose

Validate and approve `Draft Stories` for progression to the `Reading Stage`, including validation, user approval, and `Entity File` creation.

## Definitions

- a `story` is a complete narrative that has been reviewed and approved for publication
- `publishing` is the process of moving stories and related entities from draft status to published status
- a `universe` is the permanent storage area for published stories and entities
- `patches` are updates to existing entities that need to be applied during publishing
- `core files` are the essential story files that must be published
- `entity files` are the individual files that define characters, locations, and items
- `publishing readiness` refers to the state where all requirements for publishing have been met

## Sequential Tasks

***CRITICAL: Do not proceed to the next task until the current task is complete***

### 1. Draft Identification

- **Draft location:** Identify the directory of the `Draft` to be approved
- **File verification:** Verify that the 3 main draft files exist and are accessible:
  - `context-{NNN}.yaml`
  - `outline-{NNN}.md`
  - `story-{NNN}.md`
- **Status check:** Read each core file's metadata yaml (at end of file)
  - ***CRITICAL: All core files MUST have status "APPROVED"***
  - If ANY file status is NOT "APPROVED", HALT IMMEDIATELY and prompt user to override this block, then change it to APPROVED
  - If user declines override, TERMINATE workflow and revert any changes

### 2. New Entity File Creation

- **New entity extraction:** Extract entity information from `context-{NNN}.yaml`
- **Entity file creation:** For each new entity, create a new entity file using templates from `./.jester/templates/`:
  - [Character Template](character.md): For character entities
  - [Location Template](location.md): For location entities  
  - [Item Template](item.md): For item entities
- **File naming:** Use filename `{Entity Name}.md`
- **File organization:** Store in appropriate directories:
  - `./reading/../characters/`
  - `./reading/../locations/`
  - `./reading/../items/`

### 3. Changed Entity Patch Creation

- **Changed entity extraction:** Extract entity information from `context-{NNN}.md`
- **Patch file creation:** Create patch files for entities that exist in universe but have changed in this story
- **Patch templates:** Use template `./.jester/templates/entity.patch.md` to create a new entity patch file
- **File naming:** Use format `{Entity Name}.patch.md`
- **Update information:** with new details, don't remove information unless it's redundant
- **Ensure brevity:** with details about stories, as the stories themselves have the details
- **File organization:** Store in appropriate directories:
  - `./reading/../characters/`
  - `./reading/../locations/`
  - `./reading/../items/`

### 4. File Management

**File relocation:** COPY approved core files to project reading directory:
- Source: `./draft/{NNN}/`
- Destination: `./reading/{NNN}-{Story Title}/`
- New Files:
  - `{Story Title}-context.yaml`
  - `{Story Title}-outline.md`
  - `{Story Title}-story.md`
- **Metadata update:** Update metadata yaml block in each copied file:
  - **Version:** Increase major version by 1
  - **Last edit:** Update to current timestamp
  - **Status:** Set to "APPROVED"
- **Directory structure:** Ensure proper directory structure exists
- **Accessibility verification:** Verify all files are accessible in new location

### 5. Clean Up

- **Delete draft files:** Delete the core files in `./draft/{NNN}/` and the directory

### 6. Approval Report

Generate a structured approval workflow report:

#### Approval Summary

- Story title and status
- Approval completion status
- Files moved
- Entities files created

#### Pre-Approval Validation

- File presence check
- File organization check

#### Entity File Creation

- New Entities created
- Entity patches created
- Relationships established

#### Story Approval

- Files moved to reading
- File placement verification
- Accessibility verification

#### Cleanup Operations

- Draft files deleted

#### Final Assessment

- **SUCCESS**: Approval completed successfully
- **PARTIAL**: Approval completed with minor issues
- **FAILED**: Approval failed, manual intervention required
- **System Status**: System integrity maintained/compromised


