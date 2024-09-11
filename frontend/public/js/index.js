function eliminar(id){
    $.ajax({
        url: `/api/productos/${id}`, 
        type: 'DELETE',
        success: function(result){
            console.log(result);
            window.location.href = `${result}`;
        },error: function(err){
            console.log(err);
        }
    })
}
function eliminarGaleria(id){
    $.ajax({
        url: `/api/galeria/${id}`, 
        type: 'DELETE',
        success: function(result){
            console.log(result);
            window.location.href = `${result}`;
        },error: function(err){
            console.log(err);
        }
    })
}

function eliminarEventos(id){
    $.ajax({
        url: `/api/eventos/${id}`, 
        type: 'DELETE',
        success: function(result){
            console.log(result);
            window.location.href = `${result}`;
        },error: function(err){
            console.log(err);
        }
    })
}

function eliminarCategorias(id){
    $.ajax({
        url: `/api/categorias/${id}`, 
        type: 'DELETE',
        success: function(result){
            console.log(result);
            window.location.href = `${result}`;
        },error: function(err){
            console.log(err);
        }
    })
}

function validarFormulario() {
    var nombre = document.getElementById('nombre').value.trim();
    var imagen_portada = document.getElementById('imagen_portada').value.trim();
    
    if (!nombre || !imagen_portada) {
        alert('Todos los campos son obligatorios.');
        return false; // Esto previene que el formulario se envíe
    }
    return true;
}
