import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bjmnsaoxlbbekfhcxwhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbW5zYW94bGJiZWtmaGN4d2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMTExMjYsImV4cCI6MjA0NjY4NzEyNn0.uQbsH72NBEkZgbskqLPWz8oYtB_qAG2NOAaU41DBEDs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Función para cargar los gastos desde la tabla "gastos"
async function loadGastos() {
    const { data: gastos, error } = await supabase
        .from('gastos') // Cambiamos 'ingresos' a 'gastos'
        .select('*')
        .order('fecha', { ascending: false });

    const gastosList = document.getElementById('gastosList');
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
                <p><strong>Monto:</strong> $${monto.toFixed(2)}</p>
                <p><strong>Locatario:</strong> ${locatario}</p>
                <p><strong>Número de Local:</strong> ${numero_local}</p>
                <p><small><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</small></p>
            `;
            gastosList.appendChild(gastoItem);
        });
    }
}

// Función para agregar un nuevo gasto
async function agregarGasto(event) {
    event.preventDefault();

    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const locatario = document.getElementById('locatario').value;
    const numero_local = parseInt(document.getElementById('num_local').value);
    const usuarioId = localStorage.getItem('usuarioId'); // Obtenemos el usuario ID del localStorage

    // Verificar si hay un usuarioId guardado
    if (!usuarioId || isNaN(usuarioId)) {
        alert('No se ha encontrado el usuario. Por favor, inicie sesión nuevamente.');
        window.location.href = 'index.html';
        return;
    }

    // Insertamos el gasto en la tabla "gastos"
    const { error } = await supabase
        .from('gastos') // Cambiamos 'ingresos' a 'gastos'
        .insert([{ descripcion, monto, locatario, numero_local, usuario_id: parseInt(usuarioId) }]);

    if (error) {
        console.error('Error al agregar gasto:', error);
        alert('No se pudo agregar el gasto.');
    } else {
        alert('Gasto agregado exitosamente.');
        document.getElementById('gastoForm').reset();
        loadGastos();
    }
}

// Listeners
document.getElementById('gastoForm').addEventListener('submit', agregarGasto);
document.getElementById('logoutButton').addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', loadGastos);
