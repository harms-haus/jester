# Security Considerations

## Data Privacy

- **Local Storage**: All story content stored locally
- **No Cloud Sync**: No automatic cloud synchronization
- **LightRAG Access**: Only entity metadata, not story content
- **Git History**: Version control for local content only

## Access Control

- **File Permissions**: Standard file system permissions
- **Git Access**: Local repository access only
- **API Keys**: LightRAG API keys stored in environment variables
- **No Authentication**: Single-user system, no multi-user concerns

## Data Integrity

- **File Validation**: Regular consistency checks between local files and LightRAG
- **Git Versioning**: Complete change history for all content
- **Backup Strategy**: Manual backup through Git repositories
- **Error Recovery**: Graceful degradation with user notification
