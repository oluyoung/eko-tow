const mongoose = require('mongoose');

const {
    MONGOOSE_USER,
    MONGOOSE_PASSWORD,
    MONGOOSE_DB_NAME,
    MONGOOSE_HOST
} = process.env;


const getMongoUrl = (user, password, dbName, host) => {
    if (user && password && dbName && host) {
        return `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`
    } else {
        return 'mongodb://localhost/test'
    }
}

const connectMongoose = (() => {
    let isConnected = false;
    // const url = getMongoUrl(
    //     MONGOOSE_USER,
    //     MONGOOSE_PASSWORD,
    //     MONGOOSE_DB_NAME,
    //     MONGOOSE_HOST
    // );

    const url = "mongodb+srv://trvr:kVU7zc3OVfQ1HIF3@cluster0-te4sk.mongodb.net/test?retryWrites=true&w=majority";

    return {
        connect() {
            return new Promise((resolve, reject) => {
                if (!isConnected) {
                    try {
                        mongoose.connect( url, {
                          useCreateIndex: true,
                          useNewUrlParser: true,
                          useUnifiedTopology: true
                        }).catch(e => {
                          console.log('connection error: ', e);
                          reject();
                        });

                        const db = mongoose.connection;
                        db.on('error', (e) => {
                            console.log('connection error: ', e);
                            isConnected = false;
                            reject();
                        });
                        db.once('open', function() {
                            console.log('Database connection successful!!!');
                            isConnected = true;
                            resolve();
                        });
                    } catch(e) {
                        console.log(e);
                        reject()
                    }
                } else {
                    console.log('Mongoose already connected');
                    resolve();
                }
            })
        },
        getMongoUrl: () => url,
        initializeHelpers: async () => {
            String.prototype.isObjectId = function(str) {
                return mongoose.Types.ObjectId.isValid(str)
            }
        }
    }
})()

module.exports = {
    mongoose: connectMongoose
}
