# Flights



<p>This application shows information about available flights, taking into account the point of departure, the point of arrival and the date of departure of the aircraft.</p>
<p>Using the Vue.js framework, components were created to display a progress bar, blocks with information about flights and errors.</p>
<p>The application used Object Storage and Cloud Functions in Yandex Cloud for simple calculations on the cloud side.</p>
<p>It also uses the MySQL database from Clever Cloud service, which stores information about each successful application request. The information stored includes: date of departure, names of the starting and ending cities, IATA codes of the starting and ending cities, as well as the number of available flights.</p>

## Built With

* [![Vue][Vue.js]][Vue-url]
* [![Vuetify][Vuetify.js]][Vuetify-url]
* [![Rapid API][RapidAPI]][RapidAPI-url]
* [![Yandex Cloud][Yandex.cloud]][Yandex.cloud-url]
* [![Clever Cloud][Clever.cloud]][Clever.cloud-url]


## Usage

Main page of app

![Main page of app](https://github.com/Evgen-kun/Flights/assets/91155525/cbc525c6-2d1f-4c1d-afce-275c376e6c06)

Main page with query result

![image](https://github.com/Evgen-kun/Flights/assets/91155525/45f9bd3c-6868-490a-ad54-6e71d736010b)

<p>When you click on the “find” button, three requests to the API (<a href="https://support.travelpayouts.com/hc/ru/articles/203955773-Как-определить-IATA-код-города-из-поисковой-фразы">Travelpayouts Data</a> and <a href="https://rapidapi.com/apidojo/api/travel-advisor">Travel Advisor</a>) are made in sequence, during which a progress bar is displayed on the page. If successful, the page displays information about flights. In case of failure, information about the reasons for the error is displayed.</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Vuetify.js]: https://img.shields.io/badge/Vuetify-0078D4?style=for-the-badge&logo=vuetify&logoColor=white
[Vuetify-url]: https://vuetifyjs.com/
[RapidAPI]: https://img.shields.io/badge/Rapid%20Api-0055ff?style=for-the-badge
[RapidAPI-url]: https://rapidapi.com/
[Yandex.cloud]: https://img.shields.io/badge/Yandex%20Cloud-84D3FF?style=for-the-badge
[Yandex.cloud-url]: https://cloud.yandex
[Clever.cloud]: https://img.shields.io/badge/Clever%20cloud-FF4E4E?style=for-the-badge
[Clever.cloud-url]: https://www.clever-cloud.com/
