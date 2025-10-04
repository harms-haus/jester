# Content Validation Checklist

## Instructions for Approve Agent

Before proceeding with approval, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - CONTENT VALIDATION

This checklist is for APPROVE AGENTS to validate content completeness and quality before approval.

IMPORTANT: This is a comprehensive validation. Be thorough about checking each item. It's better to identify issues now than have them cause problems during approval.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or quality issues

The goal is ensuring all content is complete, high-quality, and ready for approval.]]

## Checklist Items

1. **File Structure Validation:**

   [[LLM: Verify all required files exist and are properly formatted]]
   - [ ] Context file exists and is properly formatted (`context-{NNN}.yaml` exists and follows `./.jester/templates/context.yaml`)
   - [ ] Outline file exists and follows template structure (`outline-{NNN}.md` exists and follows `./.jester/templates/outline.md`)
   - [ ] Story file exists and meets quality standards (`story-{NNN}.md` exists and follows `./.jester/templates/story.md`)
   - [ ] All required metadata is present (metadata section contains all required fields per `./.jester/data/metadata-propagation.md`)

2. **Context File Completeness:**

   [[LLM: Verify context file has all required elements]]
   - [ ] Story title and description present (non-empty title and 2+ sentence description)
   - [ ] Target audience and age range specified (age range and reading level defined)
   - [ ] Character profiles complete with motivations (each character has name, role, motivation, and 2+ traits)
   - [ ] Location descriptions detailed and immersive (each location has description and atmosphere details)
   - [ ] Plot structure and themes defined (plot template selected and themes/morals specified)
   - [ ] All required metadata populated (metadata section contains all required fields per `./.jester/data/metadata-propagation.md`)

3. **Outline File Completeness:**

   [[LLM: Check outline file structure and content]]
   - [ ] Clear three-act structure present (Act 1, 2, 3 sections with plot points)
   - [ ] All plot points detailed and logical (each plot point has title, description, characters, location)
   - [ ] Character arcs defined and consistent (character motivations and growth paths match context file)
   - [ ] Scene descriptions complete (each scene has description, estimated words, and key elements)
   - [ ] Word count estimates provided (estimated word count matches target range from context)
   - [ ] Reading time calculated (reading time calculation based on word count)

4. **Story File Completeness:**

   [[LLM: Verify story file is complete and ready]]
   - [ ] Complete narrative structure present (story follows outline structure with all required sections)
   - [ ] All characters properly introduced and developed (character introductions match context file)
   - [ ] Settings described with appropriate detail (location descriptions match context file)
   - [ ] Dialogue natural and age-appropriate (dialogue matches character voices and target age)
   - [ ] Themes and morals clearly conveyed (theme integration from context file)
   - [ ] Target length requirements met (word count within target range from context file)

5. **Content Quality Validation:**

   [[LLM: Check content quality and completeness]]
   - [ ] Character development is consistent (character arcs match context file specifications)
   - [ ] Plot progression is logical and engaging (plot follows outline structure)
   - [ ] Target audience appropriateness verified (check against `./.jester/checklists/age-appropriateness-validation.md`)
   - [ ] Word count meets requirements (word count is within target range from context file)
   - [ ] Content quality meets established standards (check against `./.jester/checklists/story-validation.md`)
   - [ ] No obvious errors or inconsistencies (grammar, spelling, and logical consistency)

6. **Entity Integration Validation:**

   [[LLM: Verify entity references and consistency]]
   - [ ] All referenced characters exist in entity files (all character references in story match context file character list)
   - [ ] All referenced locations exist in entity files (all location references in story match context file location list)
   - [ ] All referenced items exist in entity files (all item references in story match context file item list)
   - [ ] Entity descriptions are consistent across files (entity details match between context file and story implementation)

7. **Template Compliance Validation:**

   [[LLM: Ensure all files follow required templates]]
   - [ ] Context file follows YAML template structure (structure matches `./.jester/templates/context.yaml`)
   - [ ] Outline file follows markdown template structure (structure matches `./.jester/templates/outline.md`)
   - [ ] Story file follows markdown template structure (structure matches `./.jester/templates/story.md`)
   - [ ] All required fields are populated (all template placeholders are filled with actual content)

8. **Link Integrity Validation:**

   [[LLM: Check all links and references are valid]]
   - [ ] All internal links are valid and functional (all `[[Entity Name]]` links resolve to existing files)
   - [ ] Entity references are properly formatted (all entity references use correct wiki-link syntax)
   - [ ] Cross-references between files are consistent (entity references match across context, outline, and story files)
   - [ ] No broken or orphaned links (no links point to non-existent files or entities)

9. **File Organization Completeness:**

   [[LLM: Check file organization and structure]]
   - [ ] All required files present in correct locations (context, outline, and story files in `draft/{NNN}/` directory)
   - [ ] File naming conventions followed (files follow naming pattern: `context-NNN.yaml`, `outline-NNN.md`, `story-NNN.md`)
   - [ ] Directory structure is correct (files are in proper `draft/{NNN}/` subdirectory)
   - [ ] No missing or orphaned files (all referenced files exist and are accessible)

10. **Final Quality Standards:**

    [[LLM: Verify content meets final quality standards]]
    - [ ] All requirements from context are addressed (all context file requirements are implemented in story)
    - [ ] Content is appropriate for target audience (check against `./.jester/checklists/age-appropriateness-validation.md`)
    - [ ] Story has clear beginning, middle, and end (three-act structure)
    - [ ] All plot threads are resolved (matches outline plot points)
    - [ ] Character arcs are complete (character development from context file)

## Final Confirmation

[[LLM: FINAL CONTENT VALIDATION SUMMARY

After completing the checklist:

1. Summarize what was validated in this content
2. List any items marked as [ ] Not Done with explanations
3. Identify any quality issues or concerns
4. Note any recommendations for improvement
5. Confirm whether the content is ready for approval

Be thorough - it's better to identify issues now than have them cause problems later.]]

- [ ] I, the Approve Agent, confirm that all applicable items above have been addressed and the content is complete and ready for approval.


