# eslint-plugin-alexsereb666-plugin

plugin for test project

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-alexsereb666-plugin`:

```sh
npm install eslint-plugin-alexsereb666-plugin --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-alexsereb666-plugin` and add `alexsereb666-plugin` to the `plugins` key:

```js
import alexsereb666-plugin from "eslint-plugin-alexsereb666-plugin";

export default [
    {
        plugins: {
            alexsereb666-plugin
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import alexsereb666-plugin from "eslint-plugin-alexsereb666-plugin";

export default [
    {
        plugins: {
            alexsereb666-plugin
        },
        rules: {
            "alexsereb666-plugin/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


