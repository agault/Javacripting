const express= require('express')
const app =express()
const data= require('./const.json')

app.use(((req, res, next)) =>{
  console.log(req.path)
req.user_id ={
  email: '...'
  next()
}
})

app.get('api/contacts', (req, res, next) => {
req.user.email
  res.json['here are the contacts']
})
app.listen(3000, () => {
console.log('App is running')
})