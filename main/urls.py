from django.urls import path, include
from main import views

urlpatterns = [
    path('login/', views.login_view, name="login"),
    path('register/', views.register, name="register"),
    path('', views.index, name="index"),
    path('logout/', views.logout_view, name="logout"),
    path('note/', views.note, name="note"),
    path('add_note/', views.add_note, name="add_note"),
    path('wipe', views.wipe, name="wipe"),
    path('delete/<int:id>', views.delete, name="delete")
]