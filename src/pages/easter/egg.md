---
# inline handlers! this isn't recommended to do unless for simple things
# make sure to wrap the inline handler with quotes to make it a string
# leaving the rest of the file empty will make it a handler-only route,
# meaning the view wont change/reload (unless the handler does)
# since the rest of the file is empty it wont compile as markdown to make it faster.
# refer to Pinecone Router for handlers documentation
handlers: ["(ctx) => ctx.redirect('/hello/easter egg!')"]
---