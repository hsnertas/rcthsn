const router = require("express").Router();
const db = require("../../models");


/*
{
    "id":1,
    "savings":{
        "goal":100,
        "saved":10,
        "description": "mysavings"
    }
}
*/
//  /api/budget/user/add
router.route("/user/add").post(function(req, resp){
  db.moneysaver.create({
    userId:req.body.id,
    inc_exp: [],
    savings:req.body.savings
  }).then (dbModel => resp.json(dbModel))

})

// /api/budget/:id
router.route("/:id").get (function(req, resp){
  db.moneysaver
  .findOne({userId:req.params.id})
  .then(dbModel => resp.json(dbModel))
})

/*
{
    "amount":20,
    "description": "payday3"
}
*/

// /api/budget/:id/incexp
router.route("/:id/incexp").post(function(req, resp){
  db.moneysaver
  .findOneAndUpdate({userId:req.params.id},{$push: {inc_exp:req.body}},{returnNewDocument:true})
  .then(dbModel=>resp.json(dbModel))

})

// {
//   "goal": 1756,
//   "saved": 10,
//   "description": "Hawaii"
// }

// /api/budget/:id/goal
router.route("/:id/goal").put(function(req, resp){
  db.moneysaver
  .findOneAndUpdate({userId:req.params.id},{$set: {savings:req.body}},{returnNewDocument:true})
  .then(dbModel=>resp.json(req.body))
});

// /api/budget/:userId/incexp/:entryId
router.route("/:userId/incexp/:entryId").delete(function(req, resp){
  db.moneysaver.update({userId:req.params.userId},{$pull: {inc_exp: {_id:req.params.entryId}}})
  .then(dbModel=>resp.json(`entry with id ${req.params.entryId} deleted`))
})


module.exports = router;
