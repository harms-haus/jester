# User Approval Workflows

## Purpose
Comprehensive user approval workflow prompts for story progression validation decisions.

## Approval Workflow Templates

### User Approval Request (8.5.1)

**Prompt Template:**
```
REQUEST USER APPROVAL FOR PROGRESSION

You are requesting user approval for draft story progression.

**PROGRESSION APPROVAL REQUEST**
================================
Draft Number: {draft-number}
Progression: draft → ready
Request Date: {timestamp}
Requested By: {agent-name}

**VALIDATION SUMMARY:**
- Content completeness: [PASS/FAIL/WARN]
- Entity consistency: [PASS/FAIL/WARN]
- Story quality: [PASS/FAIL/WARN]
- Conflict detection: [PASS/FAIL/WARN]
- Overall status: [PASS/FAIL/WARN]

**DETAILED RESULTS:**
- Total validations: {number}
- Passed validations: {number}
- Failed validations: {number}
- Warning validations: {number}

**CRITICAL ISSUES:**
{list critical issues that must be addressed}

**WARNING ISSUES:**
{list warning issues that should be reviewed}

**CONFLICTS DETECTED:**
- File conflicts: {number}
- Content conflicts: {number}
- Metadata conflicts: {number}

**RECOMMENDATIONS:**
{list specific recommendations for addressing issues}

**APPROVAL OPTIONS:**
1. **APPROVE**: Proceed with progression despite warnings
2. **APPROVE WITH FIXES**: Proceed after addressing critical issues
3. **REJECT**: Return to draft for corrections
4. **REQUEST CHANGES**: Specify required changes before approval
5. **CANCEL**: Stop progression workflow

**USER DECISION REQUIRED:**
Please select one of the approval options above and provide any additional comments or requirements.

**NEXT STEPS:**
- If approved: Proceed with draft → ready progression
- If rejected: Return to draft for corrections
- If changes requested: Implement changes and re-validate
- If cancelled: Stop progression workflow
```

### Approval Confirmation (8.5.2)

**Prompt Template:**
```
CONFIRM USER APPROVAL

You are confirming user approval for story progression.

**APPROVAL CONFIRMATION**
========================
Draft Number: {draft-number}
Approval Date: {timestamp}
Approved By: {user-name}
Approval Type: {APPROVE/APPROVE_WITH_FIXES/REJECT/REQUEST_CHANGES/CANCEL}

**APPROVAL DETAILS:**
- User decision: {selected option}
- User comments: {user comments}
- Additional requirements: {user requirements}
- Approval timestamp: {timestamp}

**CONFIRMATION ACTIONS:**
1. **If APPROVE**: Proceed with immediate progression
2. **If APPROVE WITH FIXES**: Address critical issues, then proceed
3. **If REJECT**: Return to draft, provide feedback
4. **If REQUEST CHANGES**: Implement changes, re-validate
5. **If CANCEL**: Stop workflow, clean up

**PROGRESSION STATUS:**
- Approval confirmed: [YES/NO]
- Ready to proceed: [YES/NO]
- Actions required: {list required actions}
- Estimated completion: {time estimate}

**CONFIRMATION LOG:**
- Approval recorded: {timestamp}
- User decision logged: {decision}
- Next actions scheduled: {actions}
- Status updated: {status}
```

### Rejection Handling (8.5.3)

**Prompt Template:**
```
HANDLE USER REJECTION

You are handling user rejection of story progression.

**REJECTION HANDLING**
=====================
Draft Number: {draft-number}
Rejection Date: {timestamp}
Rejected By: {user-name}
Rejection Reason: {user-provided reason}

**REJECTION ANALYSIS:**
- Primary reason: {main reason}
- Secondary concerns: {additional concerns}
- User feedback: {user feedback}
- Improvement suggestions: {user suggestions}

**REJECTION ACTIONS:**
1. **Return to Draft**: Move files back to draft/ directory
2. **Preserve Validation Results**: Keep validation data for reference
3. **Generate Improvement Plan**: Create action plan for addressing issues
4. **Schedule Re-validation**: Plan for future validation attempt
5. **Update Status**: Mark story as requiring revision

**IMPROVEMENT PLAN:**
- Critical issues to address: {list critical issues}
- Warning issues to review: {list warning issues}
- User-suggested improvements: {list user suggestions}
- Estimated effort required: {time estimate}
- Recommended next steps: {specific actions}

**REJECTION LOG:**
- Rejection recorded: {timestamp}
- Reason documented: {reason}
- Improvement plan created: {plan}
- Status updated: {status}
- Next review scheduled: {date}
```

### Approval Workflow State Management (8.5.4)

**Prompt Template:**
```
MANAGE APPROVAL WORKFLOW STATE

You are managing the approval workflow state for story progression.

**WORKFLOW STATE MANAGEMENT**
============================
Draft Number: {draft-number}
Current State: {PENDING_APPROVAL/APPROVED/REJECTED/CANCELLED/IN_PROGRESS}
State Date: {timestamp}
State Manager: {agent-name}

**STATE TRANSITIONS:**
1. **PENDING_APPROVAL** → **APPROVED**: User approves progression
2. **PENDING_APPROVAL** → **REJECTED**: User rejects progression
3. **PENDING_APPROVAL** → **CANCELLED**: User cancels workflow
4. **APPROVED** → **IN_PROGRESS**: Begin progression execution
5. **REJECTED** → **PENDING_APPROVAL**: Re-submit for approval
6. **CANCELLED** → **TERMINATED**: End workflow

**CURRENT STATE DETAILS:**
- State: {current state}
- Duration in state: {time duration}
- State history: {list previous states}
- Pending actions: {list pending actions}
- Blocking issues: {list blocking issues}

**STATE VALIDATION:**
- State is valid: [YES/NO]
- Transitions are allowed: [YES/NO]
- No blocking issues: [YES/NO]
- Ready for next action: [YES/NO]

**NEXT ACTIONS:**
- If APPROVED: Execute progression workflow
- If REJECTED: Handle rejection, return to draft
- If CANCELLED: Clean up, terminate workflow
- If IN_PROGRESS: Continue execution
- If PENDING_APPROVAL: Wait for user decision

**STATE LOG:**
- State change recorded: {timestamp}
- Previous state: {previous state}
- New state: {new state}
- Reason for change: {reason}
- Actions taken: {actions}
```

## Workflow State Machine

### State Definitions

```yaml
workflow_states:
  PENDING_APPROVAL:
    description: "Waiting for user approval decision"
    allowed_transitions: [APPROVED, REJECTED, CANCELLED]
    actions: [request_approval, wait_for_user]
  
  APPROVED:
    description: "User has approved progression"
    allowed_transitions: [IN_PROGRESS, CANCELLED]
    actions: [confirm_approval, begin_progression]
  
  REJECTED:
    description: "User has rejected progression"
    allowed_transitions: [PENDING_APPROVAL, CANCELLED]
    actions: [handle_rejection, return_to_draft]
  
  CANCELLED:
    description: "Workflow has been cancelled"
    allowed_transitions: [TERMINATED]
    actions: [cleanup, terminate_workflow]
  
  IN_PROGRESS:
    description: "Progression is being executed"
    allowed_transitions: [COMPLETED, FAILED, CANCELLED]
    actions: [execute_progression, monitor_progress]
  
  COMPLETED:
    description: "Progression completed successfully"
    allowed_transitions: [TERMINATED]
    actions: [finalize, cleanup]
  
  FAILED:
    description: "Progression failed"
    allowed_transitions: [PENDING_APPROVAL, CANCELLED]
    actions: [handle_failure, retry_or_abort]
  
  TERMINATED:
    description: "Workflow has ended"
    allowed_transitions: []
    actions: [cleanup, archive]
```

## Integration Points

- Integrates with validation-workflow.md
- Uses existing conflict-detection.md
- Follows existing prompt-based agent architecture
- Provides comprehensive approval management

## Usage Instructions

1. **Request**: Run user approval request
2. **Confirm**: Process user decision and confirm approval
3. **Handle**: Manage rejection or cancellation
4. **Manage**: Track workflow state and transitions
5. **Execute**: Proceed with approved actions
