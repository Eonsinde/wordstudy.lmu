from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from .models import *
from django.forms import model_to_dict
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.core.paginator import Paginator
import smtplib

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import permissions


from wordstudy.serializers import *
from wordstudy.permissions import *

# Create your views here.


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    permission_classes = (MakeChangesOrCreateBook, )

    def create(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data)

        if serializer.is_valid():
            new_book = serializer.save()

            return Response({
                'book': BookSerializer(new_book).data,
                'message': 's'  # s - for success
            })
        else:
            return Response({
                'message': 'f'  # s - for failure
            })

    def list(self, request, *args, **kwargs):
        if len(request.query_params) != 0:
            query = request.query_params.get('title')
            _serializer = BookSerializer(Book.objects.filter(title__icontains=query), many=True)
            return Response(_serializer.data)

        queryset = self.get_queryset()
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)


class ExcosViewSet(viewsets.ModelViewSet):
    queryset = Excos.objects.all()
    serializer_class = ExcosSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class PrayerBoxViewSet(viewsets.ModelViewSet):
    queryset = PrayerBox.objects.all()
    serializer_class = PrayerBoxSerializer


def index(request):
    context = {
        'events': Event.objects.all(),
        'excos': Excos.objects.all(),
        'leaders_msg': LeaderMessage.objects.all()
    }
    return render(request, 'wordstudy/index.html', context)


def explore(request):
    context = {
        'genres': Genre.objects.all()
    }
    return render(request, 'wordstudy/explore.html', context)


def details(request, category):
    needed_genre = Genre.objects.get(name__icontains=category)
    paginator = Paginator(needed_genre.book_set.all(), 9)
    page = request.GET.get('page')
    genre = paginator.get_page(page)
    return render(request, 'wordstudy/details.html', {'genre': genre, 'category': category})


def excos(request):
    return render(request, 'wordstudy/excos.html', {'excos': Excos.objects.all()})


def contact(request):
    if request.method == 'POST':
        try:
            new_contact = Contact(name=request.POST['name'], email=request.POST['email'], subject=request.POST['subject'], message=request.POST['message'])
        except BaseException:
            return JsonResponse({'response': "failure"})
        else:
            new_contact.save()
            send_mail(subject=f'We got your message',
                          message=f"Thank you for contacting us; we'll get back to you shortly {new_contact.name}",
                          from_email='chaplaincy.wordstudy@lmu.edu.ng', recipient_list=[f'{new_contact.email}'], fail_silently=False)
            return JsonResponse({"response": "success"})
    else:
        return render(request, 'wordstudy/contact.html')


def join(request):
    if request.method == 'POST':
        try:
            new_member = Member(name=request.POST['name'], department=request.POST['department'],
                                room_no=request.POST['room_no'], email=request.POST['email'],
                                date_of_birth=request.POST['date_of_birth'])
        except BaseException:
            return JsonResponse({'message': "failure"})
        else:
            new_member.save()
            try:
                send_mail(subject=f'Thank you for signing up with us {new_member.name}',
                          message="Welcome to word study; we hope to trasnform and impart your life through God's word \nPlease try to be at our next meeting: \nTuesday Fellowship Meetings; in front of chapel; 6:10pm \nThursday Family Prayer; car park; 6:30pm \nSunday Bible Study; in front of chapel; 3pm",
                          from_email='chaplaincy.wordstudy@lmu.edu.ng', recipient_list=[f'{new_member.email}'], fail_silently=False)
            except smtplib.SMTPException:
                print("Couldn't reach member")
            else:
                print("Successfully sent")

            return JsonResponse({"message": 'success'})
    else:
        context = {
            'current_date': timezone.now().date()
        }
        return render(request, 'wordstudy/join.html', context)


def search(request):
    book_title = request.GET['query']
    storer = Book.objects.filter(title__icontains=f'{book_title}')
    books = []
    for book in storer:
        book_obj = {'id': f'{book.pk}', "title": f'{book.title}', 'genre': f'{book.genre}', 'author': f'{book.author}', 'file_url': f'{book.file.url}'}
        books.append(book_obj)
    return JsonResponse(books, safe=False)


def prayerbox(request):
    if request.method == 'POST':
        try:
            new_prayer_req_instance = PrayerBox(name=request.POST['person_name'], prayer_point=request.POST['prayer_request'])
        except BaseException:
            return JsonResponse({'response': 'failure'})
        else:
            new_prayer_req_instance.save()
            send_mail(subject='Prayer box used',
                          message=f"{new_prayer_req_instance.name} dropped a prayer request in the prayer box; \nPrayer Request:\n{new_prayer_req_instance.prayer_point}",
                          from_email='chaplaincy.wordstudy@lmu.edu.ng', recipient_list=['chaplaincy.wordstudy@lmu.edu.ng'], fail_silently=False)
            return JsonResponse({'response': 'success'})
    else:
        return redirect('contact')



