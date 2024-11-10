import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para obtener y mostrar el nombre del usuario
async function loadUserName() {
    const usuarioId = localStorage.getItem('usuarioId');
    const { data, error } = await supabase
        .from('usuarios')
        .select('nombre')
        .eq('id', usuarioId)
        .single();
    if (error) {
        console.error('Error al obtener nombre del usuario:', error);
    } else {
        document.getElementById('welcomeMessage').textContent = `Bienvenido, ${data.nombre}`;
    }
}

// Función para cargar y mostrar los comentarios
async function loadComments() {
    const { data: comentarios, error } = await supabase
        .from('comentarios')
        .select('comentario, fecha');

    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';
    if (error) {
        console.error('Error al cargar comentarios:', error);
    } else {
        comentarios.forEach(({ comentario, fecha }) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<strong>${fecha}</strong>: ${comentario}`;
            commentsContainer.appendChild(commentDiv);
        });
    }
}

// Función para manejar el envío de un comentario
async function handleCommentSubmit(event) {
    event.preventDefault();
    const usuarioId = localStorage.getItem('usuarioId');
    const comentario = document.getElementById('commentInput').value;

    const { error } = await supabase
        .from('comentarios')
        .insert([{ comentario, usuario_id: usuarioId }]);

    if (error) {
        console.error('Error al enviar comentario:', error);
        alert('Error al enviar comentario.');
    } else {
        document.getElementById('commentInput').value = '';
        loadComments();
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Eventos y carga inicial
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('commentForm').addEventListener('submit', handleCommentSubmit);
document.addEventListener('DOMContentLoaded', () => {
    loadUserName();
    loadComments();
});
