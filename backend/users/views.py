from rest_framework import status
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.permissions import AllowAny,IsAuthenticated 
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CheckView(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        return JsonResponse(data={"logged":not(self.request.user.is_anonymous)},safe=False,status=status.HTTP_200_OK)
