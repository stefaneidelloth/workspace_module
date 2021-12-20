# workspace_module

Looks for a JavaScript file 'workspace.js' in the workspace folder (=notebook-dir) and
tries to load it as ES6 module. You can adapt the content of 'workspace.js' to your needs.


## Prerequisites

* JupyterLab

## Installation

To install using pip:

```bash
jupyter labextension install @treezjs/workspace_module
```

If jupyter can not be found please make sure to include it in your system PATH variable.

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
# Clone the repo to your local environment
# Move to workspace_module directory
# Install dependencies
npm install
# Install your development version of the extension
jupyter labextension install .
```

If jupyter can not be found please make sure to include it in your system PATH variable.

You can run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild.

```bash
# Run jupyterlab in watch mode
jupyter lab --watch
```

Now every change will be built locally and bundled into JupyterLab.
Be sure to refresh your browser page after saving file changes to reload the extension
(note: you'll need to wait for webpack to finish, which can take 10s+ at times).

### Uninstall

```bash
jupyter labextension uninstall @treezjs/workspace_module
```

### nmp

In order to publish this jupyterlab extension on npm run:
```bash
npm login   
npm publish
```

(User treezjs)
