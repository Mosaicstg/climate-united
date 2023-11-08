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

### Page

- Headline
- Rich Text
- Image

### About Page

- Rich Text
- Image

### Landing Page

- **Hero**
  - Rich Text
  - Link
  - Image
- **Mission Statement**
  - Rich Text
  - Image (x3)
- **Services**
  - Rich Text
  - Image
- **Buckets**
  - Headline
  - **Bucket (x3)**
    - Title
    - Image
  - Rich Text
- **CTA**
  - Image
  - Rich Text
- **Events/Resources**
  - Headline (x2)
  - Image
- **News/Press**
  - Headline

### Events

- Headline
- Date/Time
- Rich Text - Excerpt
- Rich Text - Full Text

### News/Press Release

- Headline
- Date
- Rich Text - Excerpt
- Rich Text - Full Text
- Image

### Resources

- Title
- File

### Team

- Name
- Position
- Department
- Image

### Case Studies?

- ???

### SEO/Metadata

### Social Media

- Platform
- URL
