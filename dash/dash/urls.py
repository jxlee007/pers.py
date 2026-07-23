"""
URL configuration for dash project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core import views as core_view
from arcade_pass import views as arcade_view

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('route', views.fncname, )
    path('arcade', arcade_view.arcade, name="submit_data" ),
    # post path
    # path('submit/', arcade_view.arcade, name='submit_data'),
    # This single route handles both GET (viewing) and POST (submitting)
    path('', core_view.index, name="index" ),
    path('mini-tools',core_view.minitools, name="minitools" ),
    path('char-input', core_view.char_input, name="char-input"),
    path('numops', core_view.numops, name='numops')
]
