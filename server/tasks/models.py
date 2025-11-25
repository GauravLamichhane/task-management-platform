from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):

  STATUS_CHOICES = [
    ('Pending','Pending'),#1st element actual value set on model 2nd human readable name
    ('Completed','Completed')
  ]

  PRIORITY_CHOICES = [
    ('Low','Low'),
    ('Medium','Medium'),
    ('High','High'),
  ]

  title = models.CharField(max_length=100)
  description = models.TextField()
  status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='Pending')
  priority = models.CharField(max_length=20,choices=PRIORITY_CHOICES,default="Medium")
  #related_name is used for reverse name relationship
  #without it: user.task_set.all()
  #with it: user.tasks.all()
  owner = models.ForeignKey(User,on_delete=models.CASCADE, related_name='tasks')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    ordering = ['-created_at']

    def __str__(self):
      return self.title