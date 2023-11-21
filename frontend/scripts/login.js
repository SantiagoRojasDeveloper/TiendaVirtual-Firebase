async function sendLogin(option) {
    const email = document.getElementById("email");
    const password = document.getElementById("pass");
    const btnToggleModal = document.getElementById("btnToggleModal");
    const txtModalError = document.getElementById("txtModalError");

    if (email.value == "") {
        txtModalError.textContent = "Debe ingresar un correo para continuar";
        btnToggleModal.click();
        return;
    }

    if (password.value == "") {
        txtModalError.textContent = "Debe ingresar una contraseña para continuar";
        btnToggleModal.click();
        return;
    }

    const data = {
        email: email.value,
        password: password.value
    };

    //Verificación de petición: Crear o login 
    if(option == "CREATE"){
        const res = await post("http://localhost:3000/createUser", data);
        if(res.message == "0"){
            window.location.href = "login.html";
        }else{
            txtModalError.textContent = res.message;
            btnToggleModal.click();
        }
    }else if(option == "LOGIN"){
        const res = await post("http://localhost:3000/login", data);
        if(res.message == "0"){
            window.location.href = "index.html";
        }else{
            txtModalError.textContent = res.message;
            btnToggleModal.click();
        }
    }
}

async function post(url, body) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}