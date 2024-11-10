import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Función para cargar los comentarios
async function loadComentarios() {
    const { data: comentarios, error } = await supabase
        .from('comentarios')
        .select(`
            id, 
            comentario, 
            fecha, 
            usuarios (nombre)
        `)
        .order('fecha', { ascending: false });

    const comentariosList = document.getElementById('comentariosList');
    comentariosList.innerHTML = '';

    if (error) {
        console.error('Error al cargar comentarios:', error);
        alert('No se pudieron cargar los comentarios.');
    } else {
        comentarios.forEach(({ id, comentario, fecha, usuarios }) => {
            const comentarioItem = document.createElement('div');
            comentarioItem.classList.add('comentario-item');
            comentarioItem.innerHTML = `
                <h4>Comentario de: ${usuarios ? usuarios.nombre : 'Anónimo'}</h4>
                <p>${comentario}</p>
                <p><small><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</small></p>
            `;
            comentariosList.appendChild(comentarioItem);
        });
    }
}

// Inicializar funciones
document.getElementById('logoutButton').addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', loadComentarios);
