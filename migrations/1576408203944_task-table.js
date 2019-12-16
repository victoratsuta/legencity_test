/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('tasks', {
        id: 'id',
        name: {type: 'varchar(255)', notNull: true},
        priority: {type: 'integer', notNull: true},
    })
};

exports.down = pgm => {
};
