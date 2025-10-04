
# Outline Validation

## Purpose

Validate an `outline` to ensure that it's ready for story generation

## Definitions

- an `outline` is a detailed scene-by-scene breakdown of a story
- an `outline` is generated from a `context` file
- an `outline` must match the `./.jester/templates/outline.md` template structure
- an `entity` is a `character`, `location`, or `item`

## Instructions for Validate Agent

[[LLM: INITIALIZATION INSTRUCTIONS - OUTLINE VALIDATION

This checklist is for AGENTS to validate outline files before story generation

IMPORTANT: This is a comprehensive validation. Be thorough about COMPLETING each item, not just checking it off. It's better to identify issues now than have them cause problems during story generation

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or quality issues

The goal is ensuring outline quality and readiness for story generation]]

## Validation Checklist

***CRITICAL: Complete all applicable checklist items before proceeding to story generation***

1. **Structure Validation:**

   [[LLM: Check that outline structure follows template and is logical]]
   - [ ] Plot structure follows chosen template from `./.jester/templates/outline.md`
   - [ ] Scene progression is logical and engaging
   - [ ] Character arcs are complete and meaningful according to context file specifications
   - [ ] Pacing is appropriate for target length with scene count and word estimates matching context

2. **Consistency Validation:**

   [[LLM: Verify consistency with context file]]
   - [ ] Character descriptions match context with names, traits, and relationships consistent
   - [ ] Location details are consistent with names and descriptions from context file
   - [ ] Item properties are accurate with names and purposes from context file
   - [ ] Plot logic is sound and coherent following logical sequence and character motivations

3. **Length Validation:**

   [[LLM: Ensure length estimates are realistic and appropriate]]
   - [ ] Estimated word count is realistic within target range from context file
   - [ ] Scene count appropriate for length allowing adequate development within word limit
   - [ ] Character development suitable for length with arcs completable within estimated length
   - [ ] Plot complexity matches target length appropriate for target word count

4. **Internal Consistency Validation:**

   [[LLM: Check internal logic and flow of the outline]]
   - [ ] Story events follow logical sequence
   - [ ] Character actions are consistent
   - [ ] Location transitions are believable
   - [ ] Plot points connect smoothly

5. **External Consistency Validation:**

   [[LLM: Verify consistency with universe rules and constraints]]
   - [ ] Characters match universe descriptions
   - [ ] Locations align with universe settings
   - [ ] Items fit universe rules
   - [ ] Events respect universe constraints

6. **Template Compliance Validation:**

   [[LLM: Ensure outline follows required template structure]]
   - [ ] Outline follows markdown template structure from `./.jester/templates/outline.md`
   - [ ] All required sections are present with template sections filled with content
   - [ ] Formatting is consistent and correct with proper heading structure and markdown formatting
   - [ ] All required fields are populated with template placeholders replaced with content

## Final Confirmation

[[LLM: FINAL OUTLINE VALIDATION SUMMARY

After completing the checklist:

1. Summarize what was validated in this outline
2. List any items marked as [ ] Not Done with explanations
3. Identify any quality issues or concerns
4. Note any recommendations for improvement
5. Confirm whether the outline is ready for story generation

Be thorough - it's better to identify issues now than have them cause problems later.]]

- [ ] I, the Agent, confirm that all applicable items above have been addressed and the outline is ready for story generation
