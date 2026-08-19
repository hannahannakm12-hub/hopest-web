from django.urls import path
from .views import RegisterView, CustomLoginView, reset_password, send_otp

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", CustomLoginView.as_view()),
    path("send-otp/", send_otp),
    path("reset-password/", reset_password),
]