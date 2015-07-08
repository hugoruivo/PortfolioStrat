from django.conf.urls import url

from . import views

# /graph/generate/data:

urlpatterns = [
    # /graph/
    url(r'^$', views.index, name='index'),
    # /graph/generate/data/
    url(r'^generate/data/$', views.generatedata, name='generatedata'),
    # /graph/scatterplot:
    url(r'^scatterplot/$', views.scatterplot, name='scatterplot'),
    # /graph/line:
    url(r'^line/$', views.line, name='line'),
]
