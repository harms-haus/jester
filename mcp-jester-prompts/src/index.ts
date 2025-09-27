#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFile, readdir, stat } from "fs/promises";
import { join, relative, extname, basename } from "path";
import { existsSync } from "fs";

// Configuration
const JESTER_ROOT = process.env.JESTER_ROOT || process.cwd();
const PROMPTS_DIR = join(JESTER_ROOT, ".jester");

// Types
interface PromptFile {
  name: string;
  path: string;
  category: string;
  content: string;
  metadata?: {
    title?: string;
    description?: string;
    icon?: string;
  };
}

interface PromptCategory {
  name: string;
  description: string;
  prompts: PromptFile[];
}

// Create MCP server
const server = new McpServer({
  name: "jester-prompts",
  version: "1.0.0"
});

// Utility functions
async function readPromptFile(filePath: string): Promise<PromptFile | null> {
  try {
    const content = await readFile(filePath, "utf-8");
    const relativePath = relative(PROMPTS_DIR, filePath);
    const category = relativePath.split("/")[0];
    const name = basename(filePath, extname(filePath));
    
    // Extract metadata from YAML frontmatter if present
    let metadata: any = {};
    if (content.startsWith("<!-- Powered by BMAD™ Core -->")) {
      // Look for YAML block after the comment
      const yamlMatch = content.match(/```yaml\n([\s\S]*?)\n```/);
      if (yamlMatch) {
        try {
          // Simple YAML parsing for basic metadata
          const yamlContent = yamlMatch[1];
          const titleMatch = yamlContent.match(/title:\s*(.+)/);
          const descriptionMatch = yamlContent.match(/description:\s*(.+)/);
          const iconMatch = yamlContent.match(/icon:\s*(.+)/);
          
          if (titleMatch) metadata.title = titleMatch[1].trim();
          if (descriptionMatch) metadata.description = descriptionMatch[1].trim();
          if (iconMatch) metadata.icon = iconMatch[1].trim();
        } catch (e) {
          // Ignore YAML parsing errors
        }
      }
    }
    
    return {
      name,
      path: relativePath,
      category,
      content,
      metadata
    };
  } catch (error) {
    console.error(`Error reading prompt file ${filePath}:`, error);
    return null;
  }
}

async function loadPromptCategories(): Promise<PromptCategory[]> {
  const categories: PromptCategory[] = [];
  
  if (!existsSync(PROMPTS_DIR)) {
    console.error(`Jester prompts directory not found: ${PROMPTS_DIR}`);
    return categories;
  }
  
  try {
    const entries = await readdir(PROMPTS_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const categoryPath = join(PROMPTS_DIR, entry.name);
        const categoryFiles = await readdir(categoryPath, { withFileTypes: true });
        
        const prompts: PromptFile[] = [];
        for (const file of categoryFiles) {
          if (file.isFile() && (file.name.endsWith('.md') || file.name.endsWith('.yaml'))) {
            const filePath = join(categoryPath, file.name);
            const prompt = await readPromptFile(filePath);
            if (prompt) {
              prompts.push(prompt);
            }
          }
        }
        
        if (prompts.length > 0) {
          categories.push({
            name: entry.name,
            description: getCategoryDescription(entry.name),
            prompts
          });
        }
      }
    }
  } catch (error) {
    console.error("Error loading prompt categories:", error);
  }
  
  return categories;
}

function getCategoryDescription(categoryName: string): string {
  const descriptions: Record<string, string> = {
    "agents": "Agent prompt definitions for different Jester roles (muse, write, edit, etc.)",
    "data": "Data prompts for context generation, story creation, and workflow guidance",
    "templates": "Template files for story structures and configurations",
    "tasks": "Task definitions and workflow instructions",
    "checklists": "Validation and quality assurance checklists",
    "workflows": "Complete workflow definitions and processes"
  };
  
  return descriptions[categoryName] || `Prompts for ${categoryName} functionality`;
}

// Register prompts
async function registerPrompts() {
  const categories = await loadPromptCategories();
  
  // Register category listing prompt
  server.registerPrompt(
    "list-categories",
    {
      title: "List Jester Prompt Categories",
      description: "Get an overview of all available Jester prompt categories",
      argsSchema: {}
    },
    () => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Here are the available Jester prompt categories:\n\n${categories.map(cat => 
            `**${cat.name}**: ${cat.description}\n- ${cat.prompts.length} prompts available`
          ).join('\n\n')}`
        }
      }]
    })
  );
  
  // Register category-specific prompts
  for (const category of categories) {
    server.registerPrompt(
      `list-${category.name}`,
      {
        title: `List ${category.name} Prompts`,
        description: `Get a list of all prompts in the ${category.name} category`,
        argsSchema: {}
      },
      () => ({
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `**${category.name} Prompts** (${category.description}):\n\n${category.prompts.map(prompt => 
              `- **${prompt.metadata?.title || prompt.name}**: ${prompt.metadata?.description || 'No description available'}`
            ).join('\n')}`
          }
        }]
      })
    );
    
    // Register individual prompts
    for (const prompt of category.prompts) {
      const promptName = `${category.name}-${prompt.name}`;
      const title = prompt.metadata?.title || `${prompt.name} (${category.name})`;
      const description = prompt.metadata?.description || `Jester ${category.name} prompt: ${prompt.name}`;
      
      server.registerPrompt(
        promptName,
        {
          title,
          description,
          argsSchema: {
            includeMetadata: z.string().optional().describe("Include YAML metadata in the prompt content (true/false)")
          }
        },
        ({ includeMetadata = "false" }) => {
          let content = prompt.content;
          const includeMeta = includeMetadata === "true";
          
          // If includeMetadata is false, try to clean up the content
          if (!includeMeta && content.includes("<!-- Powered by BMAD™ Core -->")) {
            // Remove the BMAD comment and YAML block for cleaner output
            content = content.replace(/<!-- Powered by BMAD™ Core -->\s*\n/, '');
            content = content.replace(/```yaml\n[\s\S]*?\n```\s*\n/, '');
          }
          
          return {
            messages: [{
              role: "user",
              content: {
                type: "text",
                text: `**${title}**\n\n${content}`
              }
            }]
          };
        }
      );
    }
  }
  
  // Register search prompt
  server.registerPrompt(
    "search-prompts",
    {
      title: "Search Jester Prompts",
      description: "Search for prompts by name or content across all categories",
      argsSchema: {
        query: z.string().describe("Search query to find relevant prompts"),
        category: z.string().optional().describe("Optional category to limit search to")
      }
    },
    ({ query, category }) => {
      const searchResults = categories
        .filter(cat => !category || cat.name === category)
        .flatMap(cat => 
          cat.prompts
            .filter(prompt => 
              prompt.name.toLowerCase().includes(query.toLowerCase()) ||
              prompt.content.toLowerCase().includes(query.toLowerCase()) ||
              (prompt.metadata?.title && prompt.metadata.title.toLowerCase().includes(query.toLowerCase()))
            )
            .map(prompt => ({
              category: cat.name,
              name: prompt.name,
              title: prompt.metadata?.title || prompt.name,
              description: prompt.metadata?.description || 'No description available'
            }))
        );
      
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `**Search Results for "${query}"**${category ? ` in ${category}` : ''}:\n\n${searchResults.length > 0 ? 
              searchResults.map(result => 
                `- **${result.title}** (${result.category}/${result.name}): ${result.description}`
              ).join('\n') : 
              'No prompts found matching your search criteria.'
            }`
          }
        }]
      };
    }
  );
}

// Start the server
async function startServer() {
  try {
    console.error("Loading Jester prompts...");
    await registerPrompts();
    console.error("Jester prompts loaded successfully");
    
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Jester Prompts server started");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error("Shutting down MCP Jester Prompts server...");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error("Shutting down MCP Jester Prompts server...");
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});