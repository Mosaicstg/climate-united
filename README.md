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

To add redirects and rewrites, add them to the `netlify.toml` file. For more information about redirects and rewrites,
see the [Netlify docs](https://docs.netlify.com/routing/redirects/).

### Serve your site locally

To serve your site locally in a production-like environment, run

```sh
npm run start
```

Your site will be available at [http://localhost:8888](http://localhost:8888). Note that it will not auto-reload when
you make changes.

## Deployment

There are two ways to deploy your app to Netlify, you can either link your app to your git repo and have it auto deploy
changes to Netlify, or you can deploy your app manually. If you've followed the setup instructions already, all you need
to do is run this:

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```

## Content Types

| Category  | Content Type             | Fields                                                                                                                                                             |
| --------- |--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Page      | Page                     | Title, Slug, Headline, Main Content, Featured Image, SEO                                                                                                           |
| Page      | Post                     | Title, Slug, Headline, Date, Excerpt, Main Content, Featured Image, SEO                                                                                            |
| Page      | Event                    | Title, Slug, Headline, Date/Time, Location, Excerpt, Main Content, SEO                                                                                             |
| Page      | Case Study               | Title, Slug, Headline, Partner Logo, EPA Region, Category, Location, Description, Main Image, Video, Main Content, CTA Text, CTA Url, Excerpt, Featured Image, SEO |
|           |                          |                                                                                                                                                                    |
| Template  | About Page               | Title, Slug, Sections, Case Studies Headline, Case Studies, Featured Image, SEO                                                                                    |
| Template  | Case Studies             | Title, Slug, Headline, Main Content, Featured Image, SEO                                                                                                           |
| Template  | Landing Page             | Title, Slug, Sections, SEO, Header Options                                                                                                                         |
| Template  | Team Page                | Title, Slug, Headline, Sections, Featured Image, SEO                                                                                                               |
|           |                          |                                                                                                                                                                    |
| Section   | About                    | Title, Featured Image, Main Content, Images                                                                                                                        |
| Section   | Accordions               | Title, Headline, Main Content, Accordion Items                                                                                                                     |
| Section   | Hero                     | Title, Main Content, Featured Image                                                                                                                                |
| Section   | Hero Split               | Title, Main Content, Featured Image, Image Alignment                                                                                                               |
| Section   | News + Press Releases    | Title, Headline, Posts                                                                                                                                             |
| Section   | Social Media CTA         | Title, Headline, Social Media Links                                                                                                                                |
| Section   | Stat Bucket Grid         | Title, Headline, Main Content, Buckets                                                                                                                             |
| Section   | Team                     | Title, Headline, Main Content, Team Members                                                                                                                        |
| Section   | Text + Image Split       | Title, Main Content, Featured Image, Image Alignment                                                                                                               |
|           |                          |                                                                                                                                                                    |
| Component | Accordion Item           | Title, Headline, Main Content                                                                                                                                      |
| Component | EPA Region               | Name, Slug, Description                                                                                                                                            |
| Component | Nav Item                 | Name, Linked Item, External Link, Child Nav Items                                                                                                                  |
| Component | Nav Menu                 | Name, Menu Location, Nav Items                                                                                                                                     |
| Component | Resource                 | Title, File                                                                                                                                                        |
| Component | SEO                      | Title, Excerpt, Image, Keywords                                                                                                                                    |
| Component | Stat Bucket              | Title, Headline, Subheadline, Bucket Text, Bucket Image, Link                                                                                                      |
| Component | Social Media Link        | Platform, Url                                                                                                                                                      |
| Component | Team Member              | Name, Slug, Position, Department, Main Content, Featured Image, SEO                                                                                                |
| Component | Video                    | Title, Video ID (English), Video ID (Spanish)                                                                                                                      |
|           |                          |                                                                                                                                                                    |
| Other     | Footer                   | Name, Contact Info, Main Content                                                                                                                                   |
| Other     | Newsletter               | Name, Headline, Main Content, Featured Image                                                                                                                       |
