from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    # Email validation (mobile@hopest.com)
    def validate_email(self, value):
        mobile = value.split("@")[0]

        if not mobile.isdigit():
            raise serializers.ValidationError("Mobile must contain only numbers")

        if len(mobile) != 10:
            raise serializers.ValidationError("Mobile number must be 10 digits")

        return value

    # Password validation
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError(
                "Password length should be more than 6 characters"
            )
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user


# Custom Login Serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        data["username"] = self.user.username
        data["email"] = self.user.email

        return data