# Story Validation

## Purpose

Validate `story` files to ensure that they're ready for approval

## Definitions

- a `story` is the full story text
- a `story` is the core product of jester
- a `context` is the story's "bones" without the "meat"
- an `outline` is a detailed outline of the story
- an `entity` is a `character`, `location`, or `item`

## Instructions for Agent

[[LLM: INITIALIZATION INSTRUCTIONS - STORY VALIDATION

This checklist is for AGENTS to validate story files before approval

IMPORTANT: This is a comprehensive validation. Be thorough about COMPLETING each item, not just checking it off. It's better to identify issues now than have them cause problems during approval

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or quality issues

The goal is ensuring story quality and readiness for approval]]

## Validation Checklist

***CRITICAL: Complete all applicable checklist items before proceeding to approval***

1. **Content Quality Validation:**

   [[LLM: Check that the story content meets quality standards]]
   - [ ] Story is engaging and age-appropriate for target age range from context file
   - [ ] Language complexity matches target reading level with appropriate sentence length and vocabulary
   - [ ] Narrative flow is smooth with logical scene transitions
   - [ ] Dialogue is natural and character-appropriate with character voice consistency

2. **Length and Pacing Validation:**

   [[LLM: Ensure story length and pacing are appropriate]]
   - [ ] Word count is within target range matching context file specifications
   - [ ] Pacing maintains reader engagement with scene length and action balance
   - [ ] Scene transitions are smooth and logical

3. **Consistency Validation:**

   [[LLM: Verify consistency with context and outline]]
   - [ ] Character descriptions match context file specifications for names, traits, and relationships
   - [ ] Location details are consistent with context file for setting descriptions and atmosphere
   - [ ] Item properties match context file definitions for object characteristics and usage
   - [ ] Plot events follow outline structure for scene progression and plot points

4. **Audience Appropriateness Validation:**

   [[LLM: Ensure content is suitable for target audience]]
   - [ ] Content is suitable for target age range using `./.jester/data/audience-appropriateness.md`
   - [ ] Themes are appropriate and meaningful for target audience
   - [ ] Moral lessons are clear and positive with theme integration from context file

5. **Technical Quality Validation:**

   [[LLM: Check technical aspects of the story]]
   - [ ] Grammar and spelling are correct with spell-check and grammar validation
   - [ ] Sentence structure is varied and engaging with sentence length variety
   - [ ] Paragraph flow is logical with paragraph transitions and structure
   - [ ] Overall readability is high with reading level matching target audience

6. **Completeness Validation:**

   [[LLM: Verify story is complete and ready]]
   - [ ] Story has clear beginning, middle, and end with three-act structure
   - [ ] All plot threads are resolved matching outline plot points
   - [ ] Character arcs are complete with character development from context file
   - [ ] Story meets all requirements from context file specifications and outline structure

## Final Confirmation

[[LLM: FINAL STORY VALIDATION SUMMARY

After completing the checklist:

1. Summarize what was validated in this story
2. List any items marked as [ ] Not Done with explanations
3. Identify any quality issues or concerns
4. Note any recommendations for improvement
5. Confirm whether the story is ready for approval

Be thorough - it's better to identify issues now than have them cause problems later]]

- [ ] I, the Agent, confirm that all applicable items above have been addressed and the story is ready for approval

