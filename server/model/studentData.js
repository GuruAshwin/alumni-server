let mongoose=require('mongoose')
let userSchema = new mongoose.Schema({
    "name":string,
    "registration_number":number,
    "roll_number":string,
    "gender":"M",
    "phone_number":number,
    "email":string
})