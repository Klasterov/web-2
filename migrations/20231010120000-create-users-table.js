'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    name: {
      type: 'string',
      length: 255,
      notNull: true,
      unique: true
    },
    email: {
      type: 'string',
      length: 255,
      notNull: true,
      unique: true
    },
    created_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, function(err) {
    if (err) return callback(err);
    
    db.addIndex('users', 'users_email_index', ['email'], true, function(err) {
      if (err) return callback(err);
      db.addIndex('users', 'users_name_index', ['name'], true, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};