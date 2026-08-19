from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random

# Temporary OTP storage (for demo). Use Redis or DB in production
otp_storage = {}

# --- Register View ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# --- Custom Login (JWT) ---
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# --- Send OTP for Forgot Password ---
@api_view(['POST'])
def send_otp(request):
    mobile = request.data.get("mobile")
    if not mobile:
        return Response({"error": "Mobile number is required"}, status=400)

    # Check if user exists
    email = f"{mobile}@hopest.com"
    if not User.objects.filter(email=email).exists():
        return Response({"error": "User not found"}, status=404)

    # Generate 6-digit OTP
    otp = str(random.randint(100000, 999999))
    otp_storage[mobile] = otp

    # In real apps, send OTP via SMS here
    print(f"OTP for {mobile} is {otp}")

    return Response({"message": "OTP sent successfully"}, status=200)


@api_view(['POST'])
def reset_password(request):
    mobile = request.data.get("mobile")
    new_password = request.data.get("new_password")
    otp = request.data.get("otp")

    if not all([mobile, new_password, otp]):
        return Response({"error": "All fields are required"}, status=400)

    # Validate OTP
    if otp_storage.get(mobile) != otp:
        return Response({"error": "Invalid OTP"}, status=400)

    email = f"{mobile}@hopest.com"
    users = User.objects.filter(email=email)

    if not users.exists():
        return Response({"error": "User not found"}, status=404)

    # If multiple users with same email, choose first OR enforce unique email
    user = users.first()  

    # Update password
    user.set_password(new_password)
    user.save()

    # Remove OTP
    del otp_storage[mobile]

    return Response({
        "message": "Password reset successful",
        "username": user.username  # <-- send username back
    }, status=200)