require('../style/plugin.css');

var jQuery  = require('jquery');
var CodeMirror = require('codemirror');

var { IMainMenu } = require ('@jupyterlab/mainmenu');
var { ILayoutRestorer} = require('@jupyterlab/application');
var { IFileBrowserFactory } = require ('@jupyterlab/filebrowser');
var { IRenderMimeRegistry } = require ('@jupyterlab/rendermime');
var { ISettingRegistry } = require ('@jupyterlab/settingregistry');
var { IDocumentManager } = require ('@jupyterlab/docmanager');
var { IStatusBar } = require ('@jupyterlab/statusbar');

var { FileDialog } = require('@jupyterlab/filebrowser');
var { NotebookActions } = require("@jupyterlab/notebook");
var { InputDialog, ReactWidget } = require('@jupyterlab/apputils');


module.exports = [{
    id: 'workspace_module',
    autoStart: true,
    requires: [
	    IMainMenu,
	    ILayoutRestorer,
	    IFileBrowserFactory,
	    IRenderMimeRegistry,
	    ISettingRegistry,
	    IDocumentManager,
	    IStatusBar
    ],
    activate: function(
    	app,
    	mainMenu,
    	layoutRestorer,
    	fileBrowserFactory,
    	renderMimeRegistry,
    	settingRegistry,
    	documentManager,
    	statusBar
    ) {
      init(
      	app,
      	mainMenu,
      	layoutRestorer,
      	fileBrowserFactory,
      	renderMimeRegistry,
      	settingRegistry,
      	documentManager,
      	statusBar
      );
    }
}];

async function init(
	app,
  	mainMenu,
  	layoutRestorer,
  	fileBrowserFactory,
  	renderMimeRegistry,
  	settingRegistry,
  	documentManager,
  	statusBar
){

    var jupyterDependencies = {
        'jQuery': jQuery,
		'codeMirror': CodeMirror,
	    'mainMenu': mainMenu,
	    'layoutRestorer': layoutRestorer,
	  	'fileBrowserFactory': fileBrowserFactory,
	  	'renderMimeRegistry': renderMimeRegistry,
	  	'settingRegistry': settingRegistry,
	  	'documentManager': documentManager,
	  	'statusBar': statusBar,
	  	'InputDialog': InputDialog,
    	'FileDialog': FileDialog,
    	'NotebookActions': NotebookActions,
    	'ReactWidget': ReactWidget
    };

	let url = document.URL;
	let labIndex = url.indexOf('/lab');
	let urlPrefix = url.substring(0, labIndex);
	let workspacePath = urlPrefix + '/tree/workspace.js';		

	await importScript(workspacePath)
    .then(async () => {
        if(window.init_workspace_module){
            try{
                await window.init_workspace_module(app, jupyterDependencies);
            } catch(exception){
               console.error("[workspace_module]: Error while calling init method 'window.init_workspace_module'", exception);
            }
            window.init_workspace_module = undefined;
        }
        loadingFinished = true;
        console.log('[workspace_module] Found "' + workspacePath + '".');
        console.log('JupyterLab extension workspace_module is activated!');
    })
    .catch(error => {
        let message = 'Could not find required file "workspace.js" for jupyter lab extension "workspace_module" at ' + workspacePath;
        console.warn(message);
    });

}

function showEventDetails(event) {
        var info = {
            targetInfo: {}
        };
        var properties = ["type", "bubbles", "cancelable", "view", "detail", "message"];
        properties.forEach(property => {
            info[property] = event[property];
        });
        if (!'detail' in info){
          info.detail = ''
        }
        if (!'message' in info){
          info.message = ''
        }

        ["tagName", "outerHTML", "src"].forEach(function(property) {
            info.targetInfo[property] = event.target[property];
        });
        info.targetInfo.srcValue = event.target.attributes.src.value;
        var jsonString= JSON.stringify(info, null, 4);
        console.log(jsonString);
    }

async function importScript(src){

    console.log('[workspace_module] Trying to load "' + src + '"');

	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.async = true;
		script.type = 'module';
		script.src = src;
		script.addEventListener('load', (event)=>{
			resolve();
		});
		script.addEventListener('error', (event) => {
      showEventDetails(event)
      const message = 'Could not load script ' + src;
      reject(message);
    });
		script.addEventListener('abort', (event) => {
      showEventDetails(event)
      const message = 'Could not load script ' + src;
      reject(message);
    });
		try{
			document.head.appendChild(script);
		} catch(error){
			reject(error);
		}

	});

}