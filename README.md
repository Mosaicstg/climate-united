# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)
- [Netlify Functions Overview](https://docs.netlify.com/functions/overview)

## Netlify Setup

1. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```sh
npm i -g netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
npm i -g netlify-cli@latest
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

3. Create a new site:

```sh
netlify init
```

## Development

Ensure all packages are installed by running:

```sh
npm install
```

Run

```sh
netlify dev
```

Open up [http://localhost:3000](http://localhost:3000), and you're ready to go!

### Adding Redirects and Rewrites

To add redirects and rewrites, add them to the `netlify.toml` file. For more information about redirects and rewrites, see the [Netlify docs](https://docs.netlify.com/routing/redirects/).

### Serve your site locally

To serve your site locally in a production-like environment, run

```sh
npm run start
```

Your site will be available at [http://localhost:8888](http://localhost:8888). Note that it will not auto-reload when you make changes.

## Deployment

There are two ways to deploy your app to Netlify, you can either link your app to your git repo and have it auto deploy changes to Netlify, or you can deploy your app manually. If you've followed the setup instructions already, all you need to do is run this:

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```

## Content Types

### Templates

#### Page
- Title
- Headline
- Rich Text
- Featured Image

___

#### About
- Title
- Sections

___

#### Landing Page
- Title
- Sections

___

#### Event
- Title
- Headline
- Date/Time
- Rich Text - Excerpt
- Rich Text - Full Text

___

#### Post
- Title
- Headline
- Date
- Rich Text - Excerpt
- Rich Text - Full Text
- Featured Image

___
___

### Sections

#### Hero
- Title
- Rich Text
- Featured Image

___

#### Text + Multi-Image Split
- Title
- Rich Text
- Images

___

#### Text + Image Split
- Title
- Rich Text
- Featured Image

___

#### Bucket Grid
- Title
- Headline
- Rich Text
- Buckets

___

#### Text + Image
- Title
- Rich Text
- Featured Image

___

#### Events + Resources
- Title
- Events Headline
- Events
- Resources Headline
- Resources
- Featured Image

___

#### News/Press
- Title
- Headline

___
___

### Components

#### Bucket
- Info Bucket
  - Rich Text
  - Featured Image
  
- Team Bucket
  - Name
  - Position
  - Department
  - Featured Image

___

#### Resource
- Title
- File

___

#### Team Member
- Name
- Position
- Department
- Featured Image

___
___

### Other

#### SEO

___

#### Nav Menu
- Name
- Menu Location
- Nav Items

#### Nav Item
- Name
- Linked Item

#### Social Media
- Platform
- URL
