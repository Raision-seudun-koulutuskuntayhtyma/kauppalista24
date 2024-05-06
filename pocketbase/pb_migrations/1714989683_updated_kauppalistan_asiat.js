/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const dao = new Dao(db);
        const collection = dao.findCollectionByNameOrId('eral7fd1tffgcco');

        // update
        collection.schema.addField(
            new SchemaField({
                system: false,
                id: '5j8y69kg',
                name: 'valmis',
                type: 'bool',
                required: false,
                presentable: false,
                unique: false,
                options: {},
            })
        );

        return dao.saveCollection(collection);
    },
    (db) => {
        const dao = new Dao(db);
        const collection = dao.findCollectionByNameOrId('eral7fd1tffgcco');

        // update
        collection.schema.addField(
            new SchemaField({
                system: false,
                id: '5j8y69kg',
                name: 'ostettu',
                type: 'bool',
                required: false,
                presentable: false,
                unique: false,
                options: {},
            })
        );

        return dao.saveCollection(collection);
    }
);
