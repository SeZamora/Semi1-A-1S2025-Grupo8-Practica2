const mockUser = {
    id: 1,
    usuario: "admin",
    correo: "admin@gmail.com",
    password: "admin"
};


export const login = async (data) => {
    let respuesta = null;
    
    if (data.usuario === mockUser.usuario && data.password === mockUser.password) {
        respuesta ={
            exito: true,
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: mockUser.id,
                usuario: mockUser.usuario,
                correo: mockUser.correo
            }
        };
    } else {
        respuesta = {
            exito: false,
            mensaje: "Credenciales incorrectas"
        };
    }
        
    return respuesta;

};

