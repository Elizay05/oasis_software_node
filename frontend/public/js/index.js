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