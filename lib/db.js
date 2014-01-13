module.exports = {
	getConnection: getConnection
};

function getDbOpts(opts) {
	opts = opts || {
		host: 'localhost',
		db: 'my-app',
		port: 27017
	};
	opts.port = opts.port || 27017;
	return opts;
}

function getConnection(opts, cb) {
	opts = getDbOpts(opts);

	var mongodb = require('mongodb');

	var connectionString = "mongodb://" +
	  (opts.user ? opts.user + ":" + opts.password + "@" : "") +
	   opts.host + ":" + opts.port + "/" + opts.db;
			
	mongodb.MongoClient.connect(connectionString, {safe: true}, function(err, db) {
		if (err) {
			return cb(err);
		}

		var collection = db.collection('migrations');
		cb(null, {
			connection: db,
			migrationCollection: collection
		});
	});
}