import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para verificar si el correo y la contraseña son correctos y redirigir según el tipo de usuario
async function verificarLogin(correo, contrasena) {
    try {
        // Consulta a la tabla 'usuarios' con el correo proporcionado
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('correo', correo)
            .single(); // Obtener solo un registro

        // Verificar si hubo un error en la consulta
        if (error) {
            console.error('Error en la consulta:', error.message);
            alert('Hubo un error al consultar la base de datos.');
            return;
        }

        // Verificar si se obtuvo un usuario
        if (!data) {
            console.warn('No se encontró el usuario con el correo proporcionado.');
            alert('Correo no encontrado.');
            return;
        }

        // Mostrar datos obtenidos para debug
        console.log('Datos obtenidos:', data);

        // Verificar si la contraseña coincide
        if (data.contrasena === contrasena) {
            console.log('Inicio de sesión exitoso');

            // Guardar el usuarioId y tipo_usuario en localStorage
            localStorage.setItem('usuarioId', data.id);
            localStorage.setItem('tipo_usuario', data.tipo_usuario);
            localStorage.setItem('nombre_usuario', data.nombre); // Guardar nombre del usuario

            // Verificar el tipo de usuario y redirigir
            if (data.tipo_usuario === 'Admin') {
                console.log('Usuario tipo Admin');
                window.location.href = 'home_admin.html'; // Redirige a la página de Admin
            } else if (data.tipo_usuario === 'Usuario') {
                console.log('Usuario tipo Normal');
                window.location.href = 'homeusu.html'; // Redirige a la página de Usuario Normal
            } else {
                console.warn('Tipo de usuario desconocido');
                alert('Tipo de usuario desconocido.');
            }
        } else {
            console.warn('Contraseña incorrecta.');
            alert('Contraseña incorrecta.');
        }
    } catch (e) {
        console.error('Error al intentar verificar el login:', e);
        alert('Error al intentar conectar a la base de datos.');
    }
}

// Evento para manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    // Verificar los datos con la base de datos
    verificarLogin(correo, contrasena);
});
