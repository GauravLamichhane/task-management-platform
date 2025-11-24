from django.db import models
from tasks.models import Task
from django.contrib.auth.models import User

class AuditLog(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='audit_logs')
  task = models.ForeignKey(Task,on_delete=models.CASCADE,null=True,blank=True,related_name='audit_logs')
  action = models.CharField(max_length=100)
  changed_data = models.TextField(blank=True)
  timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['-timestamp']
  
  def __str__(self):
    return f"f{self.user.email}-{self.action}-{self.timestamp}"
