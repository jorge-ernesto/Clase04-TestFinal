from django.urls import path
from . import views

app_name = 'alumnos'

urlpatterns = [
    path(''                       , views.index , name="index"),
    path('alumnos/'               , views.index , name="alumnos"),
    path('alumnos/read'           , views.read  , name="read"),
    path('alumnos/create'         , views.create, name="create"),
    path('alumnos/edit/<int:id>'  , views.edit  , name="edit"),
    path('alumnos/update/<int:id>', views.update, name="update"),
    path('alumnos/delete/<int:id>', views.delete, name="delete"),
]
