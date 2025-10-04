# Entity Validation

## Purpose

Validate `entity` consistency and reference integrity to ensure stories are ready for progression

## Definitions

- an `entity` is a `character`, `location`, or `item`
- `entity files` are the individual files that define each entity
- `entity references` are wiki-style links like `[[Entity Name]]` that connect entities together
- `entity relationships` are the connections between entities such as friendships, locations visited, or items owned
- `reference integrity` means all entity links point to actual entity files with no broken or orphaned references
- `bidirectional relationships` means if entity A mentions entity B, then entity B also mentions entity A

## Workflow References

For entity operations, load from `./.jester/workflows/`:

- [Entity Change](../workflows/entity-change.md): Modify existing entity properties
- [Add Entity](../workflows/add-entity.md): Create new entity files
- [Remove Entity](../workflows/remove-entity.md): Delete entity files and clean up references
- [Rename Entity](../workflows/rename-entity.md): Change entity names across all references

## Instructions for Agent

[[LLM: INITIALIZATION INSTRUCTIONS - ENTITY VALIDATION

This checklist is for AGENTS to validate entity consistency and reference integrity before story progression

IMPORTANT: This is a comprehensive validation. Be thorough about COMPLETING each item, not just checking it off. It's better to identify entity issues now than have them cause problems during story progression

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or quality issues

The goal is ensuring entity consistency and reference integrity across all files]]

## Validation Checklist

***CRITICAL: Complete all applicable checklist items before proceeding to story progression***

1. **Entity Relationship Validation:**

   [[LLM: Check that all entity relationships are consistent and logical]]
   - [ ] All entity relationships are bidirectional where appropriate
   - [ ] Relationship types are consistent across all references
   - [ ] No circular or contradictory relationships exist
   - [ ] Relationship strength matches story context
   - [ ] Location references use consistent names and casing
   - [ ] Item ownership is logically consistent with character capabilities
   - [ ] Entity interactions align with character traits and story logic

2. **Entity Reference Integrity Validation:**

   [[LLM: Verify all entity references are intact and consistent]]
   - [ ] All `[[Entity Name]]` links have corresponding entity files
   - [ ] No orphaned references to non-existent entities
   - [ ] No broken wiki-link syntax
   - [ ] All entity references use proper formatting with consistent casing, punctuation, and spacing
   - [ ] Entity names are consistent across all references
   - [ ] Entity types match their usage context
   - [ ] No duplicate references using different names for same entity
   - [ ] Reference context is appropriate for entity type

3. **Cross-File Validation:**

   [[LLM: Ensure consistency across all files]]
   - [ ] Context file entities match story file references
   - [ ] Outline file entities match story file references
   - [ ] Entity files reference each other correctly with bidirectional links

4. **Entity Metadata Consistency Validation:**

   [[LLM: Check entity metadata is consistent and complete]]
   - [ ] All entities have required metadata fields
   - [ ] Entity metadata is consistent across all references
   - [ ] Entity properties are logical and coherent
   - [ ] Entity descriptions match their usage context
   - [ ] Entity relationships are properly documented
   - [ ] Entity versions are consistent and up-to-date

5. **Entity Content Validation:**

   [[LLM: Verify entity content is appropriate and consistent]]
   - [ ] Character descriptions are consistent across all files
   - [ ] Location descriptions match their usage in story
   - [ ] Item properties are consistent with their usage
   - [ ] Entity names follow naming conventions
   - [ ] Entity descriptions are complete and detailed
   - [ ] Entity relationships are logical and meaningful

6. **Entity File Structure Validation:**

   [[LLM: Check entity file structure and organization]]
   - [ ] Entity files follow proper template structure from `./.jester/templates/`
   - [ ] Entity files are properly organized in correct directories
   - [ ] Entity file naming conventions are followed
   - [ ] Entity files contain all required sections
   - [ ] Entity files are properly formatted and readable

7. **Entity Integration Validation:**

   [[LLM: Verify entity integration across the system]]
   - [ ] Entities are properly integrated into story content
   - [ ] Entity references enhance story quality
   - [ ] Entity relationships support story development
   - [ ] Entity descriptions add value to the narrative
   - [ ] Entity usage is consistent with story themes

8. **Entity Quality Validation:**

   [[LLM: Check entity quality and appropriateness]]
   - [ ] Entity content is age-appropriate for target audience
   - [ ] Entity descriptions are engaging and well-written
   - [ ] Entity relationships are meaningful and relevant
   - [ ] Entity usage supports story objectives
   - [ ] Entity content meets quality standards

## Final Confirmation

[[LLM: FINAL VALIDATION SUMMARY

After completing the checklist:

1. Summarize what was validated in entity consistency and references
2. List any items marked as [ ] Not Done with explanations
3. Identify any entity issues or concerns
4. Note any recommendations for improvement
5. Confirm whether entities are ready for story progression

Be thorough - it's better to identify entity issues now than have them cause problems later]]

- [ ] I, the Agent, confirm that all applicable items above have been addressed and entities are ready for story progression

