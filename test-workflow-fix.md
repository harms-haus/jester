# Workflow Fix Test

## Test Scenario: Verify Entity Creation Bug is Fixed

### Test Steps

1. **Create a new story context** using `/muse` command
   - Should NOT create any entity files in `/complete` directory
   - Should only create context file in `/draft` directory

2. **Create an outline** using `/write outline` command  
   - Should NOT create any entity files in `/complete` directory
   - Should only create outline file in `/draft` directory

3. **Create entities** using `/entity create` command
   - Should create entity files in `/ready` directory only
   - Should NOT create entity files in `/complete` directory

4. **Publish story** using `/edit publish` command
   - Should move entities from `/ready` to `/complete` directory
   - Should maintain proper three-stage workflow

### Expected Results

✅ **PASS**: No entities created in `/universe` during draft phase
✅ **PASS**: Entities only created in `/reading/{NNN} - Story Title/` during draft phase  
✅ **PASS**: Entities moved to `/universe` only via publish command
✅ **PASS**: Three-stage workflow maintained: `draft/` → `reading/` → `universe/`

### Test Commands

```bash
# Test 1: Create context (should NOT create entities in universe/)
/muse "A test story about a brave mouse"

# Test 2: Create outline (should NOT create entities in universe/)  
/write outline

# Test 3: Create entities (should create in reading/{NNN} - Story Title/ only)
/entity create character "TestMouse"
/entity create location "TestForest"

# Test 4: Publish (should move entities to universe/)
/edit publish "Test Story"
```

### Validation

After each step, check:
- [ ] No new files in `/universe/characters/` during steps 1-2
- [ ] New files created in `/reading/{NNN} - Story Title/characters/` during step 3
- [ ] Files moved from `/reading/{NNN} - Story Title/` to `/universe/` during step 4
