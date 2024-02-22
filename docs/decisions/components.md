# Components

Date: 2024-02-05

Status: accepted

## Context

Web accessibility is often difficult (and somestimes near impossible) when wiring up custom UI elements. Certainly, if you can, you shouldn't build these custom UI elements for accessibility yourself.

Therefore, it's best to use a "headless" component library that plays wells with your styling system (is fully extendable or plays well with Tailwind) and already has accessbility in mind.

Radix UI, with the help of shadcn/ui, has become the de-facto library for extensible UI components that are also accessible.

## Decision

We use the shadcn/ui that installs sets up components that uses Radix primitives, therefore not locking us down to having to manage version updates. In our use case we'll be using it for components such as dialog/modals, select fieds, etc.

## Consequences

Any updates to the components would have to be manual. Want to change the default color of the Select component? Change the code in the file itself.
