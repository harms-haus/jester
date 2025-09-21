#!/usr/bin/env node

/**
 * jester - AI-powered bedtime story creation system
 * 
 * This is the main CLI entry point for the jester system.
 * It provides interactive commands for story creation and management.
 */

import { CommandRouter } from './agents/commandRouter.js';
import { errorHandler } from './utils/errorHandler.js';

async function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log('jester - AI-powered bedtime story creation system');
      console.log('');
      console.log('Usage: jester <command> [options]');
      console.log('');
      console.log('Commands:');
      console.log('  /muse [story-idea]     Start a new story brainstorming session');
      console.log('  /write <type>          Generate outline or story from context');
      console.log('  /edit <action>         Edit existing story elements');
      console.log('');
      console.log('Examples:');
      console.log('  jester /muse "A brave little mouse goes on an adventure"');
      console.log('  jester /write outline');
      console.log('  jester /write story');
      console.log('  jester /edit character --name="Mouse" --description="Brave and curious"');
      return;
    }

    // Join all arguments into a single command string
    const commandString = args.join(' ');
    
    // Initialize command router
    const router = new CommandRouter();
    
    // Wait for agents to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Parse and route the command
    const command = router.parseCommand(commandString);
    const result = await router.routeCommand(command);
    
    // Display result
    if (result.success) {
      console.log(result.message);
      if (result.data) {
        console.log(JSON.stringify(result.data, null, 2));
      }
    } else {
      console.error(`Error: ${result.message}`);
      if (result.error) {
        console.error(result.error);
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
