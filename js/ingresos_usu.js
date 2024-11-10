import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Función para cargar ingresos
async function loadIngresos() {
    const { data: ingresos, error } = await supabase
        .from('ingresos')
        .select('*')
        .order('fecha', { ascending: false });

    const ingresosList = document.getElementById('ingresosList');
    ingresosList.innerHTML = '';

    if (error) {
        console.error('Error al cargar ingresos:', error);
        alert('No se pudieron cargar los ingresos.');
    } else {
        ingresos.forEach(({ descripcion, monto, locatario, num_local, fecha }) => {
            const ingresoItem = document.createElement('div');
            ingresoItem.classList.add('ingreso-item');
            ingresoItem.innerHTML = `
                <p><strong>Descripción:</strong> ${descripcion}</p>
                <p><strong>Monto:</strong> $${monto}</p>
                <p><strong>Locatario:</strong> ${locatario}</p>
                <p><strong>Número de Local:</strong> ${num_local}</p>
                <p><small><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</small></p>
            `;
            ingresosList.appendChild(ingresoItem);
        });
    }
}

// Inicializar funciones
document.getElementById('logoutButton').addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', loadIngresos);
