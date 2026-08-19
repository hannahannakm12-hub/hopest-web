from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    ITEM_TYPES = [
        ('LOST', 'Lost'),
        ('FOUND', 'Found'),
        ('THEFT', 'Theft'),
        ('MISSING', 'Missing'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,     # ✅ ADD THIS
        blank=True     # ✅ ADD THIS
    )    
    type = models.CharField(max_length=10, choices=ITEM_TYPES, default='LOST')
    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    date = models.DateField()
    police = models.CharField(max_length=255)
    town = models.CharField(max_length=255, blank=True, null=True)
    district = models.CharField(max_length=255, blank=True, null=True)
    pin = models.CharField(max_length=10, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.type})"