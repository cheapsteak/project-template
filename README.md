## Developers
Benson Wong
Chang Wang
Vadim Namniak

## Dependencies list
[http://jam3-license.herokuapp.com/projects/success-academy/licenses](http://jam3-license.herokuapp.com/projects/success-academy/licenses)

Note: If the link is broken use http://jam3-license.herokuapp.com/projects/[repo name]/licenses ?

## PROJECT DOCUMENTATION



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

```bash
$ npm run build:production
```
