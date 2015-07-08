from django.shortcuts import render
from django.http import JsonResponse
from datetime import timedelta, date
import random

# Create your views here.


def index(request):
    return render(request, 'graph/scatterplot.html')


def scatterplot(request):
    return render(request, 'graph/scatterplot.html')


def line(request):
    return render(request, 'graph/line.html')


def generatedata(request):
    allData = []

    try:
        my_min = int(request.POST['min'])
        my_max = int(request.POST['max'])
        my_series = int(request.POST['number_of_series'])

        start_date = date(2015, 1, 1)
        end_date = date(2015, 12, 31)

        for i in range(0, my_series):
            current_serie = []

            d = start_date
            delta = timedelta(days=1)
            random.seed()
            while d <= end_date:
                d += delta
                current_serie.append([d, random.uniform(my_min, my_max)])

            allData.append(current_serie)

    except (KeyError):
        return JsonResponse({'error': 1})
    else:
        return JsonResponse({'error': 0, 'data': allData})
