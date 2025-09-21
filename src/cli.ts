#!/usr/bin/env node

/**
 * jester - AI-powered bedtime story creation system
 * 
 * This is the main CLI entry point for the jester system.
 * It provides interactive commands for story creation and management.
 */

import { errorHandler } from './utils/errorHandler.js';
import { AgentExecutor } from './agents/agentExecutor.js';

async function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      // Initialize agent system and show help
      const executor = new AgentExecutor();
      await executor.initialize();
      const help = executor.getHelp();
      console.log(help.message);
      return;
    }

    // Join all arguments into a single command string
    const commandString = args.join(' ');
    
    // Initialize agent system
    const executor = new AgentExecutor();
    await executor.initialize();
    
    // Execute the command
    const result = await executor.executeCommand(commandString);
    
    // Display result
    if (result.success) {
      console.log(result.message);
      if (result.data) {
        console.log(JSON.stringify(result.data, null, 2));
      }
      if (result.nextSteps && result.nextSteps.length > 0) {
        console.log('\nNext steps:');
        result.nextSteps.forEach(step => console.log(`- ${step}`));
      }
    } else {
      console.error(`Error: ${result.message}`);
      if (result.error) {
        console.error(result.error);
      }
      if (result.nextSteps && result.nextSteps.length > 0) {
        console.log('\nSuggestions:');
        result.nextSteps.forEach(step => console.log(`- ${step}`));
      }
      process.exit(1);
    }
    
  } catch (error) {
    errorHandler.logError('Failed to execute command', error);
    console.error('An error occurred while executing the command.');
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  errorHandler.logError('Unexpected error in main', error);
  console.error('An unexpected error occurred.');
  process.exit(1);
});
