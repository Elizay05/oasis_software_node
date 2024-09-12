function eliminar(ruta,id){
    $.ajax({
        url: `/api/${ruta}/${id}`,
        type: 'DELETE',
        success: function(result){
            console.log(result);
            window.location.href = `${result}`;
        },error: function(err){
            console.log(err);
        }
    })
}