from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    title = models.CharField(max_length=256)
    body = models.CharField(max_length=5000)
    image = models.URLField(blank=True, default="")
    category = models.CharField(max_length=64)
    time = models.DateTimeField(auto_now_add=True)
    def serialize(self):
        return {
            'id': self.id,
            'title' : self.title,
            'body' : self.body,
            'image' : self.image.strip(),
            'category' : self.category,
            'time' : self.time.strftime("%b %#d %Y, %#I:%M %p"),
        }
