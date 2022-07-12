# MVIEWER .next

###lib utilisées

 * avj: 6.12.6 (validation config json avec un schema)
 * xml-js: 1.6.11 (Conversion xml 2 json)
 * Bootstrap: 5.1.3
 * ol: 6.14.1


### Principes de développement

* config file en json, validé avec un schéma dédié (schema.json)
* les config files xml sont lisibles (tout ce qui est repris dans schema.json) => module parser.js
* mviewer utilise un bus d'évènement => module event.js
    pour dispatcher :

    ```javascript
    mviewer.events.dispatchEvent('mon-event', { data });
    ```

    pour écouter :

    ```javascript
    mviewer.events.on('mon-event', lister);
    ```

 * à l'exeption de la carte, tout les éléments sont des web components qu'il est possible d'activer via la config. Avec mviewer, il est ainsi possible de créer une simple carte Openlayers comme une application riche avec barre de navigation, slider...
 A noter que pour créer un nouveau component, il faut faire un extend de la classe MviewerComponent (base-component.js)

 * le bundler utilisé est parcel
 * le dev s'appuie sur des modules javascripts

### installation

testé avec npm 7.5.2

```shell
git clone https://github.com/spelhate/mviewer-next
cd mviewer-next
npm install
npm start
```

### build

```shell
npx parcel build
```


### Usage

4 ways to init mviewer web component

```html
<body>
      <mviewer-app config_file="config.json"></mviewer-app>
      <script src="./index.js"></script>
  </body>
  ```
Or

```html
<body>
      <mviewer-app"></mviewer-app>
      <script src="./index.js"></script>
      <script>
        const config_file = 'config.json';
        const mviewer = document.querySelector("mviewer-app");
        mviewer.events.on("loaded", function(e) {console.log("mviewer is loaded", e.target);});
        mviewer.config_file(config_file);
      </script>
  </body>
  ```

Or

```html
<body>
      <mviewer-app"></mviewer-app>
      <script src="./index.js"></script>
      <script>
        const config = '{"application":{"title":"mviewer bt4"},"mapoptions":{"center":[-280683.49531344074,6112461.814273552],"zoom":8},"components":[{"id":"navbar"},{"id":"map"},{"id":"sidebar"}]}'
        const mviewer = document.querySelector("mviewer-app");
        mviewer.events.on("loaded", function(e) {console.log("mviewer is loaded", e.target);});
        mviewer.config = config;
      </script>
  </body>
  ```

Or
```html
<body>
      <mviewer-app config="{&quot;application&quot;:{&quot;title&quot;:&quot;mviewer bt4&quot;},&quot;mapoptions&quot;:{&quot;center&quot;:[-280683.49531344074,6112461.814273552],&quot;zoom&quot;:8},&quot;components&quot;:[{&quot;id&quot;:&quot;navbar&quot;},{&quot;id&quot;:&quot;map&quot;},{&quot;id&quot;:&quot;sidebar&quot;,&quot;components&quot;:{&quot;id&quot;:&quot;treelayer&quot;}}]}"></mviewer-app>
      <script src="./index.js"></script>
  </body>
  ```