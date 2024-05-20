/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const collection = new Collection({
            id: 'eral7fd1tffgcco',
            created: '2024-04-22 08:24:44.500Z',
            updated: '2024-04-22 08:24:44.500Z',
            name: 'kauppalistan_asiat',
            type: 'base',
            system: false,
            schema: [
                {
                    system: false,
                    id: 'ckl6t79y',
                    name: 'lista',
                    type: 'relation',
                    required: true,
                    presentable: false,
                    unique: false,
                    options: {
                        collectionId: '68itg78mjasf3y2',
                        cascadeDelete: true,
                        minSelect: null,
                        maxSelect: 1,
                        displayFields: null,
                    },
                },
                {
                    system: false,
                    id: 'l6jmfqs1',
                    name: 'nro',
                    type: 'number',
                    required: false,
                    presentable: true,
                    unique: false,
                    options: {
                        min: null,
                        max: null,
                        noDecimal: true,
                    },
                },
                {
                    system: false,
                    id: 'pq0attkd',
                    name: 'teksti',
                    type: 'text',
                    required: true,
                    presentable: true,
                    unique: false,
                    options: {
                        min: 1,
                        max: 1000,
                        pattern: '',
                    },
                },
                {
                    system: false,
                    id: '5j8y69kg',
                    name: 'ostettu',
                    type: 'bool',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {},
                },
            ],
            indexes: [],
            listRule: '',
            viewRule: '',
            createRule: '',
            updateRule: '',
            deleteRule: '',
            options: {},
        });

        return Dao(db).saveCollection(collection);
    },
    (db) => {
        const dao = new Dao(db);
        const collection = dao.findCollectionByNameOrId('eral7fd1tffgcco');

        return dao.deleteCollection(collection);
    }
);
