from django.shortcuts import render

# Create your views here.
#
def document(request):
    return render(request,"output.html")
