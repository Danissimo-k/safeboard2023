migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h78fom2163f4ihs")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h78fom2163f4ihs")

  collection.createRule = null

  return dao.saveCollection(collection)
})
