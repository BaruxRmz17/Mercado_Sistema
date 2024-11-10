import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

const usuarioId = localStorage.getItem('usuarioId');

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Función para manejar la publicación de noticias
async function handleNewsSubmit(event) {
    event.preventDefault();
    const titulo = document.getElementById('newsTitle').value;
    const contenido = document.getElementById('newsContent').value;

    const { error } = await supabase
        .from('noticias')
        .insert([{ titulo, contenido, autor_id: usuarioId }]);

    if (error) {
        console.error('Error al publicar la noticia:', error);
        alert('Error al publicar la noticia.');
    } else {
        document.getElementById('newsTitle').value = '';
        document.getElementById('newsContent').value = '';
        loadNews();
    }
}

// Función para cargar noticias
async function loadNews() {
    const { data: noticias, error } = await supabase
        .from('noticias')
        .select('titulo, contenido, fecha_publicacion')
        .order('fecha_publicacion', { ascending: false });

    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    if (error) {
        console.error('Error al cargar noticias:', error);
    } else {
        noticias.forEach(({ titulo, contenido, fecha_publicacion }) => {
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('news-item');
            newsDiv.innerHTML = `<h3>${titulo}</h3><p>${contenido}</p><small>${fecha_publicacion}</small>`;
            newsContainer.appendChild(newsDiv);
        });
    }
}

// Eventos y carga inicial
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('newsForm').addEventListener('submit', handleNewsSubmit);
document.addEventListener('DOMContentLoaded', loadNews);
