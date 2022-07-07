const convert = require('xml-js');
const Ajv = require("ajv");
const ajv = new Ajv();


export class MviewerParser {
    constructor(file) {
        this.file = file;
        this.config;
    }


    async parse() {
      //Rename layer, group, theme into layer, groups and layers
      // Cast object to Array if necessary. Eg if there is only one layer in a theme
      const castAndRename = function (node, oldName, newName) {
        if (Array.isArray(node[oldName])) {
          node[newName] = node[oldName];
        } else {
          node[newName] = [node[oldName]];
        }
        delete node[oldName];
        return node;
      }

      //Remove "_attributes" object created by xml-js and put the properties of _attributes on parent
    const cleanAttributes = function (data) {
      if (!data) {
        return ;
      }
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (item.hasOwnProperty('_attributes')) {
            Object.entries(item._attributes).forEach(([key, value]) => {
              item[key] = value;
            })
            delete item._attributes;
          }
        })
      } else if (data.hasOwnProperty('_attributes')) {
          Object.entries(data._attributes).forEach(([key, value]) => {
            data[key] = value;
          })
          delete data._attributes;
      }

    }

        //try {
            const schema_file = await fetch('./schema.json');
            const schema = await schema_file.json();
            this.schema = schema;
            const response = await fetch(this.file);
            let config;
            //try {
              const contentType = response.headers.get("content-type");
              if(contentType && contentType.indexOf("application/json") !== -1) {
                config = await response.json();
              } else if(contentType && contentType.indexOf("application/xml") !== -1) {
                const xml = await response.text();
                config = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
                const conf =  config.config;
                Object.entries(conf).forEach(([key, data]) => {
                  cleanAttributes(data);
                  if(['baselayers', 'themes'].includes(key)) {
                    cleanAttributes(data[key.slice(0, -1)]);
                    //rename childrens theme & baselayer into items
                    castAndRename(data, key.slice(0, -1), "items");
                  }
                  if (key === 'themes') {
                    // groups
                    const themes_with_groups = data.items.filter(theme => {
                      return theme.hasOwnProperty("group");
                    });
                    themes_with_groups.forEach(theme => {
                        cleanAttributes(theme.group);
                        //rename group into groups
                        theme = castAndRename(theme, "group", "groups");
                        theme.groups.forEach(group => {
                          if (group.hasOwnProperty("layer")) {
                            cleanAttributes(group.layer);
                            //rename layer into layers
                            group = castAndRename(group, "layer", "layers");
                            group.layers.filter( layer=> {
                              return layer.hasOwnProperty("template")
                            }).forEach(layer => {
                              cleanAttributes(layer.template);
                            })
                          }

                        });

                    })
                    const themes_without_groups = data.items.filter(theme => {
                      return !theme.hasOwnProperty("group");
                    });
                    themes_without_groups.forEach(theme => {
                      if (theme.hasOwnProperty("layer")) {
                        cleanAttributes(theme.layer);
                        //rename layer into layers
                        theme = castAndRename(theme, "layer", "layers");
                        theme.layers.filter( layer=> {
                          return layer.hasOwnProperty("template")
                        }).forEach(layer => {
                          cleanAttributes(layer.template);
                        })

                      }

                    });

                    //layers
                  }
                })
                // cast data type
                conf.mapoptions.center = conf.mapoptions.center.split(",").map(n => parseFloat(n));
                conf.mapoptions.zoom = parseInt(conf.mapoptions.zoom);
                //Add new components section
                conf.components = ["navbar", "sidebar"];
                config = conf;
                console.log(conf);
              }
              //validate
              const validate = ajv.compile(this.schema);
              const validjson = validate( config);
              if (validjson) {
                this.config= config;
              } else {
                console.log(validate.errors);
              }


            /*} catch (error) {
              console.log('Erreur dans le json : ' + error);
            }*/

       /* } catch (error) {
            console.log('Erreur dans la récupération de la config : ' + error);
        }*/

        return this.config;

    }

}