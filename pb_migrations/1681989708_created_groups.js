migrate((db) => {
  const collection = new Collection({
    "id": "h78fom2163f4ihs",
    "created": "2023-04-20 11:21:48.768Z",
    "updated": "2023-04-20 11:21:48.768Z",
    "name": "groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "brhq50gk",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("h78fom2163f4ihs");

  return dao.deleteCollection(collection);
})
