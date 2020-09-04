const mongoose = require("mongoose");
const db = require("../models");

// This file empties the collections and inserts new collections below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/moneysaver"
);

//Income collection seed 

const incomeSeed = [
  {
    userId: "fff",
    income: [
      {
        amount: 34.00,
        description: "paycheck",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
      },
      {
        amount: 355.00,
        description: "sold my vette",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
      }
    ]
  },
  {
    userId: "aaa",
    income: [
      {
        amount: 122.00,
        description: "found money",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
      }
    ]
  }
];

db.income
  .remove({})
  .then(() => db.income.collection.insertMany(incomeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


//expense collection seed 
const expenseSeed = [
  {
    userId: "fff",
    expense: [
      {
        amount: 5.00,
        description: "food",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
      },
      {
        amount: 64.00,
        description: "gas",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
      }
    ]
  },
  {
    userId: "aaa",
    expense: [
      {
        amount: 88.00,
        description: "pay loan shark",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
      }
    ]
  }
];

db.expense
  .remove({})
  .then(() => db.expense.collection.insertMany(expenseSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });




// savings collection seed 

const savingsSeed = [
  {
    userId: "115114",
    savings:{
      goal: 453453.0,
      saved: 44.00,
      description: "Carsland",
      timestamp: '2020-08-06 15:24:05.539Z'
    }
  },
  {
    userId: "aaa",
    savings:{
      goal: 700000.00,
      saved: 8000.00,
      description: "College Fund",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 10))
    }
  }
];

db.savings
  .remove({})
  .then(() => db.savings.collection.insertMany(savingsSeed))
  .then(data => {
    console.log(data.result.n + "records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });