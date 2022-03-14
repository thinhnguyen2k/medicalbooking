const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const bcrypt = require('bcrypt');
// const { restart } = require('nodemon');

//Erorr

router.post('/add', async (req, res) => {
    const {name, email, password, address, gender, idRole, phoneNumber, image, active} = req.body;
    const hashPassword = await bcrypt.hashSync(password, 10);

    let query = `select email from staffs`
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        
        //Check email 
        await result.forEach((item) => {
            if(item.email === email) return res.status(200).json({success: true, message:"Email already exist"});
        })

        let query1 = `insert into staffs(name, email, password, address, gender, idRole, phoneNumber, image, active) values('${name}', '${email}', '${hashPassword}', '${address}', ${gender}, '${idRole}', '${phoneNumber}', '${image}', ${active})`;
        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
        
            return res.status(200).json({success: true, message: "Add staff success", name, email, address, gender, idRole, phoneNumber, image, active});
        })
    })
})

router.get('/getAll', (req, res) => {
    let query = `select * from staffs`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result.length > 0) return res.status(200).json({success: true, message: "Get staff success", result});
        return res.status(200).json({success: true, message: "Staff empty"});
    })
})

router.post('/getSingle', (req, res) => {
    const id = req.body.idStaff;

    let query = `select * from staffs where idStaff='${id}'`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result.length > 0) return res.status(200).json({success: true, message: "get staff success", result});
        return res.status(200).json({success: true, message: "Staff empty"});
    })
})


router.patch('/edit', (req, res) => {

    const {idStaff, name, email, address, gender, idRole, phoneNumber, image} = req.body;

    let query = `select * from staffs where idStaff=${idStaff}`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr1"});
        let oldName = result[0].name;
        let oldEmail = result[0].email;
        let oldAddress = result[0].address;
        let oldGender = result[0].gender;
        let oldIdRole = result[0].idRole;
        let oldPhoneNumber = result[0].phoneNumber;
        let oldImage = result[0].image;
        

        let names ,emails ,addresss ,genders,idRoles,phoneNumbers,images;
        
        if(name === '') {names=oldName} else {names = name};
        if(email === '') {emails=oldEmail} else {emails = email};
        if(address === '') {addresss=oldAddress} else {addresss = address};
        if(gender === '') {genders=oldGender} else {genders = gender};
        if(idRole === '') {idRoles=oldIdRole} else {idRoles = idRole};
        if(phoneNumber === '') {phoneNumbers=oldPhoneNumber} else {phoneNumbers = phoneNumber};
        if(image === '') {images=oldImage} else {images = image};
        
        
        let query1 = `update staffs set name = '${names}', email = '${emails}', address = '${addresss}', gender = ${genders}, idRole = '${idRoles}', phoneNumber = '${phoneNumbers}', image = '${images}' where idStaff='${idStaff}'`

        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr2"});

            return res.status(200).json({success: true, message: "Update Success"});
        })
    })
})

router.post('/delete', (req, res) => {
    const idStaff = req.body.idStaff;
    let query = `select * from staffs where idStaff=${idStaff}`;
    

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});

        if(result[0].active ==! 0) return res.status(200).json({success: true, message: "User has been deleted"})

        let query1 = `update staffs set  active = 1 where idStaff='${idStaff}'`;
      
        connection.query(query1, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
            return res.status(200).json({success: true, message: "Delete staff success"});
        })
        
    })
})


module.exports = router;