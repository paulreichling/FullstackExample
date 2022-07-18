const { response } = require('express');
const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table')

class DragonTable{
    static StoreDragon(dragon){
        const { birthdate, nickname, generationId } = dragon;

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO dragon(birthdate, nickname, "generationId")
                VALUES($1, $2, $3) RETURNING id`, 
                [birthdate, nickname, generationId],
                (error, response) => {
                    if (error) return reject(error);

                    const dragonId = response.rows[0].id;
                    
                    Promise.all(dragon.traits.map(({traitType, traitValue}) => { //promise.all makes sure these are resolved in order, nested promises means the
                        //store dragon promise is last
                        return DragonTraitTable.storeDragonTrait({
                            dragonId, traitType, traitValue
                        });
                    }))
                    .then(() => resolve({dragonId}))
                    .catch(error => reject(error));
                }
            )
        });
    }
    static getDragon({dragonId}){
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT birthdate, nickname, "generationId" FROM dragon WHERE dragon.id = $1',
                [dragonId],
                (error, response) => {
                    if(error) return reject(error);

                    if(response.rows.length === 0) return reject(new error('no dragon!'));

                    resolve(response.rows[0]); //just getting the 1 row since each dragon has 1 of name and gen ID, etc
                }
            )
        })
    }
}

/*
DragonTable.getDragon({dragonId: 1})
.then(dragon => console.log(dragon))
.catch(error => console.error('error', error));
*/

module.exports = DragonTable;