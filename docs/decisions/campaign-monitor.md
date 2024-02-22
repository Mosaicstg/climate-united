# Campaign Monitor

Date: 2024-02-24

Status: accepted

## Context

[Campaign Monitor](https://www.campaignmonitor.com/) is an email marketing software where you can store lists of subscribers as well as a run email marketing campaigns. They provide a nice UI for users to wire up email blasts while also providing an API for initiating actions via code integrations.

The client's [main website](https://calvertimpact.org/contact) currently tracks, sends and subscribe's user's to their "newsletters" via Campaign Monitor.

The goal is recreate the Newsletter sign up experience on this Remix website and send end-user emails to their Campaign Montior to subscribe them to a list specific to this site.

## Decision

We use the [Campaign Monitor API](https://www.campaignmonitor.com/api/) to send end-user emails while also providing an nice UI/UX for custom validtion while also adhering to accessibility guidelines.

## Consequences

With this custom integration means that in the event there's a new account or subscription list where we need to send the end-user emails to there would need to be environment variable changes and or code changes.
