

dbConnect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err)
            } else {
                resolve({
                    client
                });
            };
        });
    });
};

dbClose = (client) => {
    return new Promise((resolve,reject) => {
        resolve(client.close());
    })

};

dbGetPointsWithinRange = (client, latitude, longitude) => {
    return new Promise((resolve,reject) => {
        db = client.db("myFirstCollection"); //Get the "db" variable from "client"
        db.collection("myFirstCollection").find({
            location: {$geoWithin: {$centerSphere: [[latitude, longitude], 10 / 3963.2]}}
        }, (err,result) => {
            if(err){reject(err)}
            else {
                resolve({
                    id: result.ops[0]._id, //Add more variables if you want
                    client
                });
            }

        });
    });
};

open(url)
    .then((c) => {
        clientvar = c.client;
        return create(clientvar)
    }).then((i) => {
    idvar= i.id;
    console.log('New Object ID:',idvar) // Print the ID of the newly created object
    cvar = i.client
    return close(cvar)
}).catch((err) => {
    console.log(err)
})