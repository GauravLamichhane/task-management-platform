from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from tasks.models import Task
from .models import AuditLog
import json


#triggered when a Task is created,updated
@receiver(post_save,sender = Task)
def log_task_save(sender,instance,created,**kwargs):
  if created:
    action = "Task Created"
    changed_data = json.dumps({
      "title":instance.title,
      "description":instance.description,
      "status":instance.status,
      "priority":instance.priority,
    })
  else:
    action = "Task Updated"
    changed_data = json.dumps({
            "title": instance.title,
            "status": instance.status,
            "priority": instance.priority,
        })
  AuditLog.objects.create(
        user=instance.owner,
        task=instance,
        action=action,
        changed_data=changed_data
    )

#runs just before a DB row is deleted
@receiver(pre_delete, sender=Task)
def log_task_delete(sender, instance, **kwargs):
    """
    Log task deletion
    """
    AuditLog.objects.create(
        user=instance.owner,
        #task is none because if we keep a reference in the db i.e FK it will cause erros
        task=None,
        action="Task Deleted",
        changed_data=json.dumps({
            "title": instance.title,
            "id": instance.id,
        })
    )