# PortfolioStrat

1 - /graph/generate/data: a POST handler that takes a min parameter, a max parameter and a number_of_series parameter and generates 1­year of random data where each date’s random value is between min and max. Data returns should be of the form {“data”: [ [ [ “2015­04­03”, 3.533], [“2015­04­04”, 3.467] ...], [[“2015­04­03”, 66.67], [“2015­04­04”, 67.89] ] ] } where the number of time series returned = number_of_series parameter.

2 - /graph/scatter­plot: this handler will display a client­side template with a form allowing the user to input min, max, and graph title. Submission of the form should call /graph/generate/data which will generate data and populate a scatter plot on the page. (Page should not reload between data generation and graph plotting).

3 - /graph/line: this handler will display a client­side template with a form allowing the user to input min, max, and graph title. Submission of the form should call /graph/generate/data which will generate data and populate a scatter plot on the page. (Page should not reload between data generation and graph plotting).

Using jQuery and highcharts.js as plotting library to create the two types of graphs

##Setup

Open downloaded files in a terminal window then run the following commands:

```html
virtualenv venv
source venv/bin/activate
pip install django-toolbelt
python manage.py migrate
python manage.py runserver
```
Point your browser to the given url ( ex: http://127.0.0.1:8000/ ) or to <your_site_url>/graph/scatterplot/

Here you can generate a scatter plot graph.

If you point to: <your_site_url>/graph/line you will be able to generate a line chart.

##TODO

1 - Still need some adjustments to page layout in order to be more user friendly.
2 - Some test cases need to be generated to check the API.
3 - Some code review and code commenting need to be done, have made this project in a hurry (couple of hours or so) so need to do some checks on it. As it was my first Django project a lot of improvements may be needed.
