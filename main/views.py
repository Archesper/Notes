from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from main.models import Note
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.


@login_required(login_url='/login')
def index(request):
    return render(request, 'main/index.html')


def login_view(request):
    if request.method == "GET":
        return render(request, 'main/login.html')
    else:
        username = request.POST['username']
        password = request.POST['password']
        try:
            user = User.objects.get(username=username, password=password)
        except:
            user = None
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, 'main/login.html', {
                'message': 'Invalid credentials.'
            })


def register(request):
    if request.method == "GET":
        return render(request, 'main/register.html')
    else:
        username = request.POST['username']
        password = request.POST['password']
        password_2 = request.POST['password_2']
        if not bool(username.strip()):
            return render(request, 'main/register.html', {
                'message': 'Please provide a username.'
            })
        try:
            User.objects.get(username=username)
            return render(request, 'main/register.html', {
                'message': 'Username is already taken.'
            })
        except:
            pass
        if password != password_2:
            return render(request, 'main/register.html', {
                'message': 'Passwords do not match.'
            })
        else:
            User.objects.create(username=username, password=password)
            return HttpResponseRedirect(reverse('index'))


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))


@login_required(login_url='/login')
def note(request):
    if request.method == 'GET':
        notes = Note.objects.filter(user=request.user).order_by('-time')
        return JsonResponse([note.serialize() for note in notes], safe=False)


@login_required(login_url='/login')
@csrf_exempt
def add_note(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Note.objects.create(user=request.user, title=data.get('title'), body=data.get(
            'body'), image=data.get('image'), category=data.get('category'))
        return JsonResponse({'response': 'Note created successfully'}, status=201)
    else:
        return JsonResponse({'response': 'Method must be POST'}, status=400)

@csrf_exempt
def wipe(request):
    if request.method == 'DELETE':
        Note.objects.all().delete()
        return JsonResponse({'response': 'Notes deleted'})
    else:
        return JsonResponse({'response': 'Wrong Method.'})

@csrf_exempt
def delete(request, id):
    if request.method == 'DELETE':
        Note.objects.get(id=id).delete()
        return JsonResponse({'response': 'Note deleted'})
    else:
        return JsonResponse({'response': 'Wrong Method.'})
