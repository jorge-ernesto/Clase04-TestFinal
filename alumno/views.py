from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Alumno

# Create your views here.

def index(request):
    return render(request, "alumno/index.html")

def read(request):
    alumnos = Alumno.objects.all()
    print('alumnos', alumnos)
    return render(request, 'alumno/result.html', {"alumnos":alumnos})

def create(request):
    # crear objeto alumno de la clase alumno
    alumno = Alumno(nombre = request.POST["nombre"],
                    curso = request.POST["curso"],
                    nota = request.POST["nota"],
                    estado = getEstado(request))
    # grabar empleado en la BD
    alumno.save()
    return redirect('/')

def edit(request, id):
    alumno = Alumno.objects.get(id = id)
    arregloAlumno = [alumno.id, alumno.nombre, alumno.curso, alumno.nota]
    data = {'message': "Success", 'alumnos': arregloAlumno}
    return JsonResponse(data)

def update(request, id):
    alumno = Alumno.objects.get(id = id)
    # actualizar datos
    alumno.nombre = request.POST["nombre"]
    alumno.curso = request.POST["curso"]
    alumno.nota = request.POST["nota"]
    alumno.estado = getEstado(request)
    # graba alumno actualizado
    alumno.save()
    return redirect('/')

def delete(request, id):
    alumno = Alumno.objects.get(id = id)
    alumno.delete()
    return redirect('/')

def getEstado(request):
    nota = int(request.POST["nota"])
    if nota >= 14:
        return "APROBADO"
    else:
        return "DESAPROBADO"
