## Developers
Benson Wong
Chang Wang
Vadim Namniak

## Dependencies list
[http://jam3-license.herokuapp.com/projects/success-academy/licenses](http://jam3-license.herokuapp.com/projects/success-academy/licenses)

Note: If the link is broken use http://jam3-license.herokuapp.com/projects/[repo name]/licenses ?

## PROJECT DOCUMENTATION

Requires npm 3+

Folder Structure
```bash
build/
  # This is where the compiled files and asset files reside
src/
  assets/
    # Everything in here will be copied to the root of the build folder
    # We will not be repeatedly running an image optimization tasks here
    # Everything in here should __already be optimized__.
  common/
    components/
      # Components in here can be required via require('common/components/my-component')
    utils/
      # Modules in here can be required via require('common/utils/my-util')
  foo/
    # The component for page "foo"
    bar/
      # A component used in page "foo"
      baz/
        # A component used in component "bar"
```

## Run

```bash
$ npm start
```

## Development

- Filenames: `lower-kebab-case.everything` (including and especially assets)

- JSX: take ~6 minutes to skim over the [Khan style guide](https://github.com/Khan/style-guides/blob/master/style/react.md), pay particular attention to [html property alignment](https://github.com/Khan/style-guides/blob/master/style/react.md#align-and-sort-html-properties)  

- Javascript Style Guide: https://github.com/Jam3/Javascript-Code-Conventions

- CSS: Use dashes to seperate words in css classes/ids, do NOT use camelCase:

- Install the eslint plugin for your editor.  
  We are inheriting [airbnb's](https://github.com/airbnb/javascript) with some tweaks.
  Airbnb's rules are at times overly stringent, if you see a linting rule that should be changed from a red to a yellow or completely removed, ping Chang.

### GLOBAL VARIABLES

Always make the root path to assets (image/videos..) a variable, store it in your global settings file, in both Javascript code and CSS. When the site goes live, those assets will come from a CDN

```scss
$ASSET_PATH: 'images/'; // This variable will be changed by a script when pushing to production or other environments
.background {
    background: url('#{$ASSET_PATH}/images/background.png')
}
```

```javascript
var filePath = settings.ASSET_PATH + 'fancy/fancy-graphic.png';
```

## DEPLOYMENT

**Important note:** when deploying with `NODE_ENV=production`, assets that have the extension of `.production` will overwrite assets with the same name without the `.production` extension.

E.g. `.htaccess.production` will become `.htaccess` when deploying for production and the original `.htaccess` will be ignored.

This project uses both npm scripts and Codeship for deployment.  
The Codeship project URLS is https://codeship.com/projects/140231  

The following branches are tracked and auto deployed when pushed to:  

```bash
# Auto deploys to the internal dev/preview server at successacademy.jam3.net/middleschool/
# This is for producers and designers to keep track of progress
master
# Auto deploys to the internal qa server at successacademy.jam3.net/middleschool-qa/
# This allows us to keep the internal dev/preview server up-to-date without having
# to worry if it will interfere with QA runs, and also prevent confusions from not 
# knowing whether a bug is not reproduceable because it's already been fixed
deploy/qa
# Auto deploys to the client-preview server at successacademy.jam3.net/middleschool-preview/
# This will be a substitute for the staging server but is not an actual staging server
# as it does not reflect production environment
deploy/preview
# Auto deploys to the production server at virtualtour.successacademies.org/middleschool
deploy/production
```

We also have manual deployment tasks that we can use as a fail-safe if Codeship goes offline

```bash
npm run deploy:dev
npm run deploy:qa
npm run deploy:preview
npm run deploy:production
```