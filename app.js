const express = require('express');
const firebaseAdmin = require('firebase-admin');
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express();
app.use(express.json());

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const serviceAccount = require('./firebaseKey/serviceAccountKey.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(1);
        const loginRef = db.collection('Login');
        console.log(1);

        const query = await loginRef.where('email', '==', email).get();
        console.log(1);

        console.log(query);
        if (query.empty) {
            return res.status(401).json({ message: 'Email incorrecto' });
        }

        const userDoc = query.docs[0];
        const userData = userDoc.data();

        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({ message: '0' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
});


app.post('/createUser', async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailExists = await db.collection('Login').where('email', '==', email).get();

        if (!emailExists.empty) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection('Login').add({
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: '0'});
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
