from rest_framework import serializers
from .models import AuditLog

class AuditLogSerializer(serializers.ModelSerializer):
    user_email = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    task_title = serializers.SerializerMethodField()
    
    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'user_email', 'user_name', 'task', 'task_title', 'action', 'changed_data', 'timestamp']
        read_only_fields = ['id', 'user', 'task', 'timestamp']
    
    def get_user_email(self, obj):
        # get user's email
        return obj.user.email if obj.user else None

    def get_user_name(self, obj):
        # Prefer first_name, then username, then email
        if not obj.user:
            return None
        if obj.user.first_name:
            return obj.user.first_name
        if getattr(obj.user, 'username', None):
            return obj.user.username
        return obj.user.email
    
    def get_task_title(self, obj):
        #Get task title, or deleted task if task no longer exists
        return obj.task.title if obj.task else 'Deleted Task'