/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "68itg78mjasf3y2",
    "created": "2024-04-22 07:45:55.774Z",
    "updated": "2024-04-22 07:45:55.774Z",
    "name": "kauppalistat",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rbxipi6m",
        "name": "nimi",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 100,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("68itg78mjasf3y2");

  return dao.deleteCollection(collection);
})
