# Entity Validation Checklist

## Instructions for Validate Agent

Before proceeding with story progression, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - ENTITY VALIDATION

This checklist is for VALIDATE AGENTS to validate entity consistency and reference integrity before story progression.

IMPORTANT: This is a comprehensive validation. Be thorough about checking each item. It's better to identify entity issues now than have them cause problems during story progression.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or quality issues

The goal is ensuring entity consistency and reference integrity across all files.]]

## Checklist Items

1. **Entity Relationship Validation:**

   [[LLM: Check that all entity relationships are consistent and logical]]
   - [ ] All entity relationships are bidirectional (if A mentions B, then B mentions A)
   - [ ] Relationship types are consistent (friend/enemy/family relationships match across all references)
   - [ ] No circular or contradictory relationships (no A→B→A loops or conflicting relationship types)
   - [ ] Relationship strength is appropriate (relationship intensity matches story context)
   - [ ] Location references are consistent across entity files (all location mentions use same name/casing)
   - [ ] Item ownership is logically consistent (item ownership matches story context and character capabilities)
   - [ ] Entity interactions make sense (interactions align with character traits and story logic)

2. **Entity Reference Integrity Validation:**

   [[LLM: Verify all entity references are intact and consistent]]
   - [ ] All [[Entity Name with Proper Casing, Punctuation and Spacing]] links have corresponding entity files (each link resolves to existing file)
   - [ ] No orphaned references (no links point to non-existent entities)
   - [ ] No broken wiki-link syntax (all links use correct `[[Entity Name]]` format)
   - [ ] All entity references are properly formatted (consistent casing, punctuation, spacing)
   - [ ] Entity names are consistent across all references (same entity uses same name everywhere)
   - [ ] Entity types match their usage context (character/location/item references match their type)
   - [ ] No duplicate references with different names (no same entity referenced with different names)
   - [ ] Reference context is appropriate (entity references make sense in their context)

3. **Cross-File Validation:**

   [[LLM: Ensure consistency across all files]]
   - [ ] Context file entities match story file references (all context entities appear in story with same details)
   - [ ] Outline file entities match story file references (outline entity references match story implementation)
   - [ ] Entity files reference each other correctly (entity cross-references are accurate and bidirectional)

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
   - [ ] Entity files follow proper template structure
   - [ ] Entity files are properly organized and accessible
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

[[LLM: FINAL ENTITY VALIDATION SUMMARY

After completing the checklist:

1. Summarize what was validated in entity consistency and references
2. List any items marked as [ ] Not Done with explanations
3. Identify any entity issues or concerns
4. Note any recommendations for improvement
5. Confirm whether entities are ready for story progression

Be thorough - it's better to identify entity issues now than have them cause problems later.]]

- [ ] I, the Validate Agent, confirm that all applicable items above have been addressed and entities are consistent and ready for story progression.
