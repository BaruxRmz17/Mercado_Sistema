import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Función para cargar noticias
async function loadNews() {
    const { data: noticias, error } = await supabase
        .from('noticias')
        .select('titulo, contenido, fecha_publicacion, autor_id')
        .order('fecha_publicacion', { ascending: false });

    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';

    if (error) {
        console.error('Error al cargar noticias:', error);
        alert('No se pudieron cargar las noticias.');
    } else {
        noticias.forEach(({ titulo, contenido, fecha_publicacion }) => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <h3>${titulo}</h3>
                <p>${contenido}</p>
                <small>Publicado el: ${new Date(fecha_publicacion).toLocaleDateString()}</small>
            `;
            newsList.appendChild(newsItem);
        });
    }
}

// Eventos y carga inicial
document.getElementById('logoutButton').addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', loadNews);
