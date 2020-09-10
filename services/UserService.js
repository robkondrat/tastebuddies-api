export const getUserDetails = (db, name) => {
  return new Promise((resolve, reject) =>
     db.collection('user')
       .find({ 'name': name })
       .toArray((err, docs) => {
          if(docs && docs.length>0){
             resolve(docs[0]);
          }else{
             reject();
          }
     });
  });
}
export const updateUserPassword = (db, name, pwd) => {
 return db.collection('user').updateOne({'name': name }, {
   $set: {password:pwd} 
 })
 .then((r) => {
   return Promise.resolve(r.matchedCount);
 })
 .catch((err) => {
   return Promise.reject(err);
 })
}