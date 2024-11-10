import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Función para cargar los gastos
async function loadGastos() {
    const { data: gastos, error } = await supabase
        .from('gastos') // Cambiar 'ingresos' por 'gastos'
        .select('*')
        .order('fecha', { ascending: false });

    const gastosList = document.getElementById('gastosList'); // Cambiar 'ingresosList' por 'gastosList'
    gastosList.innerHTML = '';

    if (error) {
        console.error('Error al cargar gastos:', error);
        alert('No se pudieron cargar los gastos.');
    } else {
        // Recorremos los gastos obtenidos y los mostramos
        gastos.forEach(({ descripcion, monto, locatario, numero_local, fecha }) => {
            const gastoItem = document.createElement('div');
            gastoItem.classList.add('gasto-item');
            gastoItem.innerHTML = `
                <p><strong>Descripción:</strong> ${descripcion}</p>
                <p><strong>Monto:</strong> $${monto}</p>
                <p><strong>Locatario:</strong> ${locatario}</p>
                <p><strong>Número de Local:</strong> ${numero_local}</p>
                <p><small><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</small></p>
            `;
            gastosList.appendChild(gastoItem);
        });
    }
}

// Inicializar funciones
document.getElementById('logoutButton').addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', loadGastos);
