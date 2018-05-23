# ModTeamHelper

Stack Overflow Teams displays each moderator's real name field as their username, not their display name. This can be confusing, so here's a userscript to turn this:

![Aurora's Real Name](https://i.imgur.com/89OaVXa.png)

into this:

![Aurora's Username and Sites](https://i.imgur.com/F084DlD.png)

By default, the original layout will be shown. Upon hovering over the username, a `(who?)` link will appear. After that is clicked, you
should see the user's network username and moderated sites.

## Troubleshooting, known issues and design faults
### I clicked (who?), but it just says "Loading..."
Please file an issue; this is a bug. Apologies for the inconvenience.

### (who?) doesn't appear on hover
Please file an issue; this is a bug. Apologies for the inconvenience.

### A scary message pops up telling me that you're about to steal all my information ("A userscript wants to access a cross-origin resource.")

Don't worry - the script just needs to request that user's network profile from stackexchange.com. As this is considered a different origin than stackoverflow.com, Tampermonkey just wants to check with you that nothing bad is happening. It's not, don't worry!
