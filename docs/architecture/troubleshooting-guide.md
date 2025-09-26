# Troubleshooting and Debugging Guide

This document provides comprehensive troubleshooting guidance for common issues, debugging procedures, and error recovery in the Jester system.

## Table of Contents

1. [Debug Mode and Logging](#debug-mode-and-logging)
2. [Common Issues and Solutions](#common-issues-and-solutions)
3. [Error Recovery Procedures](#error-recovery-procedures)
4. [Performance Troubleshooting](#performance-troubleshooting)
5. [File System Issues](#file-system-issues)
6. [Agent Behavior Issues](#agent-behavior-issues)
7. [Validation and Quality Issues](#validation-and-quality-issues)
8. [System Health Checks](#system-health-checks)
9. [Emergency Procedures](#emergency-procedures)

## Debug Mode and Logging

### Enabling Debug Mode
Debug mode provides detailed information about system operations, loaded context files, and error details.

```markdown
## Debug Mode Activation
To enable debug mode:
1. Use the `@jester *debug` command
2. Or set the DEBUG environment variable to true
3. Debug mode will show:
   - All loaded context files
   - File operations in detail
   - Agent command processing
   - Validation results
   - Performance metrics
```

### Debug Information Structure
```
Debug Information:
├── Context Files Loaded
│   ├── Agent files
│   ├── Template files
│   ├── Configuration files
│   └── Data files
├── Operations Performed
│   ├── File operations
│   ├── Validation checks
│   └── User interactions
├── Error Details
│   ├── Error messages
│   ├── Stack traces
│   └── Context information
└── Performance Metrics
    ├── Execution times
    ├── Memory usage
    └── Resource utilization
```

### Logging Configuration

**Log Levels**:
```yaml
logging:
  debug: "Detailed debugging information"
  info: "General information about operations"
  warn: "Warning messages for potential issues"
  error: "Error messages for failures"
```

**Log Locations**:
```markdown
## Log File Locations
- **Application Logs**: `.jester/logs/application.log`
- **Error Logs**: `.jester/logs/error.log`
- **Debug Logs**: `.jester/logs/debug.log`
- **System Logs**: OS-specific log locations
```

## Common Issues and Solutions

### 1. Agent Not Responding

**Symptoms**:
- Agent commands not working
- No response to `@agent-name` commands
- Error messages about agent not found

**Solutions**:
```markdown
## Agent Troubleshooting
1. **Check Agent File**: Ensure agent file exists in `.jester/agents/`
2. **Verify Command**: Use correct command format `@agent-name *command`
3. **Restart Cursor**: Restart Cursor to reload configuration
4. **Check Logs**: Review error logs for specific issues
5. **Validate Configuration**: Check `.jester/core-config.yaml`
```

### 2. File System Issues

**Symptoms**:
- Files not found
- Permission denied errors
- Directory structure issues

**Solutions**:
```markdown
## File System Troubleshooting
1. **Check Permissions**: Ensure proper file permissions
2. **Verify Paths**: Check file paths are correct
3. **Create Directories**: Ensure required directories exist
4. **Check Disk Space**: Verify sufficient disk space
5. **Validate Structure**: Check project structure integrity
```

### 3. Template Processing Issues

**Symptoms**:
- Templates not loading
- Variable substitution errors
- Template validation failures

**Solutions**:
```markdown
## Template Troubleshooting
1. **Check Template File**: Ensure template exists and is valid
2. **Validate YAML**: Check YAML syntax is correct
3. **Check Variables**: Verify all required variables are provided
4. **Review Logs**: Check error logs for specific issues
5. **Test Template**: Use debug mode to test template processing
```

### 4. Validation Failures

**Symptoms**:
- Content validation errors
- Quality checks failing
- Entity consistency issues

**Solutions**:
```markdown
## Validation Troubleshooting
1. **Check Content**: Review content for quality issues
2. **Validate Entities**: Ensure entity consistency
3. **Check Templates**: Verify content follows templates
4. **Review Rules**: Check validation rules are appropriate
5. **Use Debug Mode**: Enable debug mode for detailed validation info
```

## Error Recovery Procedures

### 1. File Recovery

**Problem**: Files corrupted or deleted
**Solution**:
```markdown
## File Recovery Process
1. **Check Backups**: Look for backup files
2. **Restore from Git**: Use git to restore files
3. **Recreate Files**: Recreate files from templates
4. **Validate Content**: Ensure recovered content is valid
5. **Update References**: Update any references to recovered files
```

### 2. Configuration Recovery

**Problem**: Configuration corrupted or missing
**Solution**:
```markdown
## Configuration Recovery Process
1. **Restore from Backup**: Restore configuration from backup
2. **Reset to Defaults**: Reset to default configuration
3. **Recreate Configuration**: Recreate configuration manually
4. **Validate Settings**: Ensure configuration is valid
5. **Test System**: Test system with recovered configuration
```

### 3. Data Recovery

**Problem**: Data loss or corruption
**Solution**:
```markdown
## Data Recovery Process
1. **Check Backups**: Look for data backups
2. **Restore from Git**: Use git to restore data
3. **Recreate Data**: Recreate data from scratch
4. **Validate Data**: Ensure recovered data is valid
5. **Update References**: Update any references to recovered data
```

## Performance Troubleshooting

### 1. Slow Response Times

**Symptoms**:
- Commands taking too long
- System unresponsive
- Timeout errors

**Solutions**:
```markdown
## Performance Optimization
1. **Check System Resources**: Monitor CPU, memory, disk usage
2. **Optimize Files**: Reduce file sizes, optimize content
3. **Clear Cache**: Clear temporary files and cache
4. **Check Processes**: Ensure no conflicting processes
5. **Update System**: Keep system and dependencies updated
```

### 2. Memory Issues

**Symptoms**:
- Out of memory errors
- System slowdown
- Crashes

**Solutions**:
```markdown
## Memory Troubleshooting
1. **Check Memory Usage**: Monitor memory consumption
2. **Close Unused Applications**: Free up memory
3. **Optimize Files**: Reduce file sizes
4. **Check for Leaks**: Look for memory leaks
5. **Restart System**: Restart if necessary
```

### 3. Disk Space Issues

**Symptoms**:
- Disk full errors
- File write failures
- System slowdown

**Solutions**:
```markdown
## Disk Space Troubleshooting
1. **Check Disk Usage**: Monitor disk space usage
2. **Clean Temporary Files**: Remove temporary files
3. **Archive Old Data**: Archive old stories and data
4. **Check Logs**: Clean up log files
5. **Free Up Space**: Delete unnecessary files
```

## File System Issues

### 1. Permission Issues

**Problem**: Permission denied errors
**Solution**:
```bash
# Fix file permissions
chmod -R 755 universe/
chmod -R 755 reading/
chmod -R 755 draft/
chmod -R 755 .jester/
chmod 644 .cursorrules
```

### 2. Directory Structure Issues

**Problem**: Missing directories or incorrect structure
**Solution**:
```bash
# Create required directories
mkdir -p universe/{characters,locations,items}
mkdir -p reading/{stories,contexts,outlines}
mkdir -p draft/
mkdir -p .jester/{agents,tasks,templates,data}
mkdir -p .memory/
```

### 3. File Corruption

**Problem**: Files corrupted or unreadable
**Solution**:
```markdown
## File Corruption Recovery
1. **Check File Integrity**: Verify file is readable
2. **Restore from Backup**: Restore from backup if available
3. **Recreate File**: Recreate file from template
4. **Validate Content**: Ensure content is valid
5. **Update References**: Update any references to file
```

## Agent Behavior Issues

### 1. Agent Not Loading

**Problem**: Agent not responding to commands
**Solution**:
```markdown
## Agent Loading Troubleshooting
1. **Check Agent File**: Ensure agent file exists
2. **Validate Syntax**: Check agent file syntax
3. **Check Dependencies**: Verify all dependencies are available
4. **Restart Cursor**: Restart Cursor to reload agents
5. **Check Logs**: Review error logs for specific issues
```

### 2. Command Processing Issues

**Problem**: Commands not being processed correctly
**Solution**:
```markdown
## Command Processing Troubleshooting
1. **Check Command Format**: Use correct command format
2. **Validate Parameters**: Ensure parameters are correct
3. **Check Agent State**: Verify agent is in correct state
4. **Use Debug Mode**: Enable debug mode for detailed info
5. **Check Logs**: Review logs for error details
```

### 3. Workflow Issues

**Problem**: Workflows not executing correctly
**Solution**:
```markdown
## Workflow Troubleshooting
1. **Check Workflow Definition**: Verify workflow is defined correctly
2. **Validate Steps**: Ensure all steps are valid
3. **Check Dependencies**: Verify all dependencies are available
4. **Test Individual Steps**: Test each step separately
5. **Use Debug Mode**: Enable debug mode for detailed workflow info
```

## Validation and Quality Issues

### 1. Content Validation Failures

**Problem**: Content not passing validation
**Solution**:
```markdown
## Content Validation Troubleshooting
1. **Check Content Quality**: Review content for quality issues
2. **Validate Against Templates**: Ensure content follows templates
3. **Check Entity Consistency**: Verify entity consistency
4. **Review Validation Rules**: Check validation rules are appropriate
5. **Use Debug Mode**: Enable debug mode for detailed validation info
```

### 2. Entity Consistency Issues

**Problem**: Entities not consistent across stories
**Solution**:
```markdown
## Entity Consistency Troubleshooting
1. **Check Entity Files**: Verify entity files are correct
2. **Validate References**: Check all entity references
3. **Update Entities**: Update entities to maintain consistency
4. **Check Templates**: Ensure templates are consistent
5. **Use Validation Tools**: Use validation tools to check consistency
```

### 3. Template Compliance Issues

**Problem**: Content not following templates
**Solution**:
```markdown
## Template Compliance Troubleshooting
1. **Check Template**: Verify template is correct
2. **Validate Content**: Ensure content follows template
3. **Update Content**: Update content to match template
4. **Check Variables**: Verify all required variables are provided
5. **Use Debug Mode**: Enable debug mode for detailed template info
```

## System Health Checks

### 1. Basic Health Check

**Command**: `@jester *debug`
**Purpose**: Check system status and loaded context
**Output**:
```markdown
## System Health Check
- **Agent Status**: All agents loaded and ready
- **File System**: All directories and files accessible
- **Configuration**: Configuration loaded and valid
- **Templates**: All templates loaded and valid
- **Memory**: Memory usage within normal limits
```

### 2. File System Health Check

**Command**: Check file system integrity
**Purpose**: Verify file system is healthy
**Checks**:
```markdown
## File System Health Checks
1. **Directory Structure**: All required directories exist
2. **File Permissions**: All files have correct permissions
3. **File Integrity**: All files are readable and valid
4. **Disk Space**: Sufficient disk space available
5. **Access Rights**: User has access to all required files
```

### 3. Agent Health Check

**Command**: Test each agent individually
**Purpose**: Verify all agents are working correctly
**Tests**:
```markdown
## Agent Health Checks
1. **Agent Loading**: All agents load without errors
2. **Command Processing**: All commands process correctly
3. **Template Access**: All agents can access templates
4. **File Operations**: All agents can perform file operations
5. **Error Handling**: All agents handle errors gracefully
```

## Emergency Procedures

### 1. System Recovery

**Problem**: System completely non-functional
**Solution**:
```markdown
## Emergency System Recovery
1. **Stop All Processes**: Stop all running processes
2. **Check System Status**: Verify system is stable
3. **Restore from Backup**: Restore from latest backup
4. **Validate Configuration**: Ensure configuration is correct
5. **Test Basic Functions**: Test basic system functions
6. **Gradual Restart**: Gradually restart all components
```

### 2. Data Recovery

**Problem**: Critical data lost or corrupted
**Solution**:
```markdown
## Emergency Data Recovery
1. **Stop All Operations**: Stop all data operations
2. **Assess Damage**: Determine extent of data loss
3. **Restore from Backup**: Restore from latest backup
4. **Validate Data**: Ensure recovered data is valid
5. **Update References**: Update all data references
6. **Test System**: Test system with recovered data
```

### 3. Configuration Reset

**Problem**: Configuration completely corrupted
**Solution**:
```markdown
## Emergency Configuration Reset
1. **Backup Current Config**: Save current configuration
2. **Reset to Defaults**: Reset to default configuration
3. **Validate Defaults**: Ensure default configuration works
4. **Restore User Settings**: Restore user-specific settings
5. **Test System**: Test system with reset configuration
6. **Document Changes**: Document any necessary changes
```

## Prevention and Best Practices

### 1. Regular Maintenance

**Schedule**:
```markdown
## Regular Maintenance Schedule
- **Daily**: Check system logs for errors
- **Weekly**: Clean up temporary files
- **Monthly**: Review and update configuration
- **Quarterly**: Full system health check
- **Annually**: Complete system review and update
```

### 2. Backup Strategy

**Backup Schedule**:
```markdown
## Backup Strategy
- **Daily**: Backup user data and configuration
- **Weekly**: Full system backup
- **Monthly**: Archive old backups
- **Before Changes**: Backup before major changes
- **After Changes**: Backup after successful changes
```

### 3. Monitoring

**Monitoring Strategy**:
```markdown
## Monitoring Strategy
- **Real-time**: Monitor system performance
- **Log Monitoring**: Monitor logs for errors
- **Resource Monitoring**: Monitor system resources
- **Alert System**: Set up alerts for critical issues
- **Regular Reviews**: Regular review of monitoring data
```

## Conclusion

This troubleshooting guide provides comprehensive guidance for diagnosing and resolving issues in the Jester system. By following these procedures and best practices, users can maintain a stable and reliable story creation environment.

The key to effective troubleshooting is to:
1. **Identify the Problem**: Use debug mode and logs to identify issues
2. **Follow Procedures**: Use systematic approaches to resolve issues
3. **Document Solutions**: Keep track of solutions for future reference
4. **Prevent Issues**: Implement preventive measures to avoid problems
5. **Continuous Improvement**: Regularly update procedures based on experience