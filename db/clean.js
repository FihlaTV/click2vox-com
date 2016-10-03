// START STEP 1
// Removes unused accounts and free their assigned did/didIds

//finds the unused accounts
var cursor = db.accounts.find({ password: { $exists: false } });

//iterate over each unusued account
while (cursor.hasNext()) {
  var record = cursor.next();

  //copy them to a separate collection
  db.accounts_not_used.save(record);

  // recover unused did/didId pair from unused account
  var did_to_recover = db.dids.findOneAndUpdate({ didId: record.didId, did: record.did }, { $set:{ assigned: false } }, { upsert: true });
}

// Deletes the unused accounts
db.accounts.remove({ password: { $exists: false } });

// END STEP 1

// ----- //

// START STEP 2
// fix dids collection

var cursor_dids = db.dids.find({ did: { $exists: false }, DID: { $exists: true } });
while (cursor_dids.hasNext()) {
  var record = cursor_dids.next();
  var did_to_fix = db.dids.remove(record);

  record.did = record.DID;
  delete(record.DID);
  record.assigned = false;

  var did_updated = db.dids.save(record);
  var did_fixed = db.dids_fixed.save(record);
}

//Fixing dids
db.dids.update(
  // query
  {
      assigned: { $exists: false }
  },
  // update
  {
      $set:{ assigned: false }
  },
  // options
  {
      "multi" : true
  }
);

// END STEP 2

// ----- //

// START STEP 3
// Removing old widgets
var newest_widgets_per_account = db.widgets.group({
  "key": {
      "_account": true
  },
  "initial": {},
  "reduce": function(obj, prev) {
      prev.maximumvaluecreated_at = isNaN(prev.maximumvaluecreated_at) ? obj.created_at : Math.max(prev.maximumvaluecreated_at, obj.created_at);
      prev.max_id= obj._id;
  }
});

var list_of_newest_widgets_per_account = [];
newest_widgets_per_account.forEach(function(max_widget) {
  list_of_newest_widgets_per_account.push(max_widget.max_id);
});

//Removing old widgets
db.widgets.remove({_id: { $nin: list_of_newest_widgets_per_account }});

// END STEP 3
