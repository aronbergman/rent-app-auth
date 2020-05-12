module.exports = function (db) {
    const IntervalRent = db.intervalRent;
    const Rent = db.rent


    IntervalRent.findAll({limit: 100})
        .then(response => {
            let posts = response

            if (posts.length) {
                const random = {
                    randNumOld: 0,
                    getRandomInt: function (min, max) {
                        const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
                        if (randNum === random.randNumOld) return random.getRandomInt(min, max);
                        random.randNumOld = randNum;
                        return randNum;
                    }
                };
                setInterval(() => {
                    const rand = random.getRandomInt(0, posts.length - 1)
                    const {title, name, username, email, typeOfApplicant, typeOfObject, sizeOfObject, metroStations, distanceMetro, description, price, floor, infrastructure, deposit, renovation, city, images, secret, userId, active} = posts[rand]

                    Rent.create({
                        title,
                        name,
                        username,
                        email,
                        typeOfApplicant,
                        typeOfObject,
                        sizeOfObject,
                        metroStations,
                        images,
                        infrastructure,
                        distanceMetro,
                        description,
                        price,
                        floor,
                        deposit,
                        renovation,
                        userId,
                        city,
                        secret: 'interval',
                        active
                    }).then(() => {
                        console.log(`Cоздано объявление в разделе Аренда от ID: ${posts[rand].id}`)
                    }).catch(err => console.log(err));
                }, 1000000)
            }
        }).catch(err => console.log(err));
}