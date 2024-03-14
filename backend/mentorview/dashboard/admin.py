from django.contrib import admin
from .models import Student, Mentor , Evaluation , EvaluationRoom  # (Optional) Evaluation

admin.site.register(Student)
admin.site.register(Mentor)
admin.site.register(EvaluationRoom)
admin.site.register(Evaluation)

