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

```shell
git clone https://github.com/spelhate/mviewer-next
cd mviewer-next
npm install
npm start
```
