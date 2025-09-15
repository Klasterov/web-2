'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('tasks', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true 
    },
    title: {
      type: 'string',
      length: 255,
      notNull: true
    },
    description: {
      type: 'text'
    },
    completed: {
      type: 'boolean',
      defaultValue: false
    },
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'tasks_user_id_fk',
        table: 'users',
        mapping: 'id',
        rules: {
          onDelete: 'SET NULL',
          onUpdate: 'RESTRICT'
        }
      }
    },
    created_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = function(db) {
  return db.dropTable('tasks');
};

exports._meta = {
  "version": 1
};