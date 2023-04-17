// Esperar a que el documento se haya cargado
$(document).ready(function () { // $(function () {

    // Verificar si el elemento con el id "result" existe en el DOM.
    if ($('#result') != null) {
        console.log('Cargar Read')
        Read();
    }

    //funcion create
    // $("#create").on('click', function () {
    $("#formCreate").on('submit', function (e) {
        e.preventDefault();

        //asignar valores a variables
        $id = $("#id").val();
        $nombre = $("#nombre").val();
        $curso = $("#curso").val();
        $nota = $("#nota").val();

        // Guardar o editar
        let $url = '/alumnos/create';
        if ($id && !isNaN($id)) { // Validar que id exista y sea diferente de null o undefined. Ademas id debe ser numerico. NaN (Not-a-Number)
            $url = '/alumnos/update/' + $id;
        }

        // Validacion
        let errores = {};
        if ($nombre.trim() == '' || $nombre == null) {
            errores['nombre'] = 'El nombre del alumno no es válido';
        }
        if ($curso.trim() == '' || $curso == null) {
            errores['curso'] = 'El nombre del curso no es válido';
        }
        if ($nota.trim() == '' || $nota == null || isNaN($nota)) {
            errores['nota'] = 'La nota no es válida. Debe ser un número';
        }
        if (parseInt($nota) < 0 || parseInt($nota) > 20) {
            errores['nota'] = 'La nota debe estar entre 0 y 20';
        }

        if (Object.keys(errores).length > 0) {
            for (let error in errores) {
                alert(errores[error]);
            }
            return false;
        } else {
            // uso de ajax
            $.ajax({
                url: $url,
                type: 'POST',
                data: {
                    nombre: $nombre,
                    curso: $curso,
                    nota: $nota,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function () {
                    Read();
                    $('#id').val('');
                    $('#nombre').val('');
                    $('#curso').val('');
                    $('#nota').val('');
                    openCloseModal();
                }
            });
        }
    });

    //funcion edit
    $(document).on('click', '.edit', function () {
        $id = $(this).attr('name');
        $.ajax({
            url: '/alumnos/edit/' + $id,
            type: 'POST',
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (response) {
                console.log(response);
                $('#id').val(response.alumnos[0]);
                $('#nombre').val(response.alumnos[1]);
                $('#curso').val(response.alumnos[2]);
                $('#nota').val(response.alumnos[3]);
                openCloseModal();
            }
        });
    });

    //funcion delete
    $(document).on('click', '.delete', function (e) {
        const confirmacion = confirm('¿Desea eliminar el registro?');
        if (!confirmacion) {
            return false;
        }

        $id = $(this).attr('name');
        $.ajax({
            url: '/alumnos/delete/' + $id,
            type: 'POST',
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function () {
                Read();
            }
        });
    });

    //funcion hidden.bs.modal
    $('#createAlumno').on('hidden.bs.modal', function () {
        // Código a ejecutar cuando el modal se cierra
        eliminarNuevo();
    });

});

//funcion read
function Read() {
    $.ajax({
        url: '/alumnos/read',
        type: 'POST',
        async: false,
        data: {
            //res: 1,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function (response) {
            $('#result').html(response);
        }
    });
}

//funcion handleopenmodal
function handleOpenModal() {
    $('#createAlumno').modal('hide');
}

//funcion handleclosemodal
function handleCloseModal() {
    $('#createAlumno').modal('show');
}

//funcion openclosemodal
function openCloseModal() {
    if ($('#createAlumno').is(':visible')) {
        $('#createAlumno').modal('hide');
    } else {
        $('#createAlumno').modal('show');
    }
}

//function eliminarnuevo
function eliminarNuevo() {
    $('#id').val('');
    $('#nombre').val('');
    $('#curso').val('');
    $('#nota').val('');
}