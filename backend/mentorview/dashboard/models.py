from django.db import models
from django.contrib.auth.models import User



class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=20, unique=True)
    assigned_mentor = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='assigned_students')  # Foreign key to User model for mentor
    evaluation_in_progress = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Mentor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class EvaluationRoom(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)  # Foreign key to Mentor model
    is_open = models.BooleanField(default=True)  # Flag indicating an open room

    def __str__(self):
        return f"Evaluation Room (Mentor: {self.mentor})"  # Descriptive string representation

class Evaluation(models.Model):
    evaluation_room = models.ForeignKey(EvaluationRoom, on_delete=models.CASCADE)  # Foreign key to EvaluationRoom model (for association)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)  # Foreign key to Student model
    mentor = models.ForeignKey(User, on_delete=models.CASCADE)  # Foreign key to User model for flexibility (mentor can be different from room owner)
    ideation_score = models.IntegerField()
    execution_score = models.IntegerField()
    viva_score = models.IntegerField()
    is_finalized = models.BooleanField(default=False)  # Flag indicating finalized evaluation
    total_score = models.IntegerField(null=True, blank=True)  # Optional, calculated

    def save(self, *args, **kwargs):
        self.total_score = self.ideation_score + self.execution_score + self.viva_score
        super().save(*args, **kwargs)  # Calculate total score and then save

    def __str__(self):
        return f"Evaluation (Student: {self.student}, Mentor: {self.mentor}, Total Score: {self.total_score})"  # Informative representation



