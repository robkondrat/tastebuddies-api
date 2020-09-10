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