### Javascript SDK API

By calling these methods, you will receive a promise resolving with a the result of the operation.
#### Messages
``sdk.Messages.create(message)`` creates a new message 
#### Profiles
``sdk.Profiles.get(username)`` gets a profile by username
``sdk.Profiles.list(filter)`` returns a list of users with optional filter that can be {limit: 50}. \
This is an **ADMIN** resource.
#### Conversations
``sdk.byProfile(profile)`` gets a conversation by profile
#### Posts
``sdk.Posts.create(post)`` create a new post
#### Streams
``sdk.Streams.list()`` gets a list of streams
