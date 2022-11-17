
// db.categories.insertMany([
//     {
//         name: 'Books'
//     },
//     {
//         name: 'Movies'
//     },
//     {
//         name: 'Games'
//     }
// ]);

// const booksID = db.categories.findOne({name: 'Books'})._id
// const moviesID = db.categories.findOne({name: 'Movies'})._id
// const gamesID = db.categories.findOne({name: 'Games'})._id

// db.products.insertMany([
//     {
//         name: "Potop",
//         description: "Klasyka polskiej literatury",
//         price: 24,
//         weight: 3,
//         category: booksID
//     },
//     {
//         name: "Tomb Raider",
//         description: "Baba biega po dżungli",
//         price: 60,
//         weight: 1,
//         category: gamesID
//     },
//     {
//         name: "Rok 1984",
//         description: "Dystopijna opowieść o urzędniku",
//         price: 40,
//         weight: 2,
//         category: booksID
//     },
//     {
//         name: "Matrix",
//         description: "Neo robi fikołki w przód i w tył",
//         price: 34,
//         weight: .5,
//         category: moviesID
//     },
//     {
//         name: "Doom",
//         description: "Strzelanie do diabłów nigdy się nie nudzi",
//         price: 10,
//         weight: .1,
//         category: gamesID
//     },
//     {
//         name: "Zemsta faraona",
//         description: "Średnio śmieszne ale za to tanie",
//         price: 3,
//         weight: .4,
//         category: moviesID
//     }
// ])

// db.orders.insertMany([
//     {
//         products: [
//             {
//                 product: db.products.findOne({name: 'Matrix'})?._id,
//                 ammount: 10
//             },
//             {
//                 product: db.products.findOne({name: 'Potop'})?._id,
//                 ammount: 3
//             }
//         ],
//         status: "ZATWIERDZONE",
//         email: "m.nowicki@wp.pl",
//         name: "Mariusz Nowicki",
//         phone: "+48 333 777 111",
//         date: "2022-11-25"
//     },
//     {
//         products: [
//             {
//                 product: db.products.findOne({name: 'Doom'})?._id,
//                 ammount: 10
//             },
//             {
//                 product: db.products.findOne({name: 'Tomb Raider'})?._id,
//                 ammount: 3
//             }
//         ],
//         status: "ZREALIZOWANE",
//         email: "a.malysz@gmail.com",
//         name: "Adam Małysz",
//         phone: "+48 125 841 055",
//         date: "2021-03-01"
//     }
// ])