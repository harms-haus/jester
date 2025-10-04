
# Saving & Restoring Sessions

## Sessions

`Sessions` are the context history of a jester agent conversation with a human
A `Session` is ONLY ever a discussion about editing or writing a `Story`
A `Session` is ONLY ever about 1 `Story`, nevermore
A `Session` must store the loaded jester files to restore the agent's being

## Saving Sessions

### Procedure

- **Template:** ALWAYS write the session using this template: `./.jester/templates/session.sesh`
- **Jester agents:** Record which agents have been loaded this session
- **Jester contexts:** Record which data, templates, validation, and workflows files have been loaded this session
- **Other context:** Record any other context data that may be required for reloading your current state later
- **Chat history:** Save the WHOLE session's chat history with timestamps and subject clearly marked

### Storage

- Store the session files here: `./.memory/sessions/{NNN}_{iso_datetimestamp}.sesh`

## Restoring Sessions

- **Read the WHOLE file**
- **Load jester:** ALWAYS load ALL of the agent files ONE AT A TIME
- **Load context:** ALWAYS load the data, templates, validation, workflows, and "other" context files
- **Load chat:** ALWAYS load the chat history
