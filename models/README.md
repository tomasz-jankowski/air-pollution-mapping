### thesis-air-pollution-mapping
Web application used to gather measurements from previously designed mobile measuring module attachable to a drone which generates a map of air pollution concentrations represented with appropriate colors.

[![Generic badge](https://img.shields.io/badge/node-12.18.0-darkgreen.svg)](https://shields.io/)   [![Generic badge](https://img.shields.io/badge/npm-6.14.4-red.svg)](https://shields.io/) [![License](http://img.shields.io/:license-All_Rights_Reserved-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Project details
![obud](https://user-images.githubusercontent.com/48838669/85040383-0920c580-b189-11ea-9945-e6f76bc0fbe4.png)


#### Overview
The purpose of the diploma thesis was to design and build mobile measuring
module that can be attached to a drone. It would be used to monitor
concentrations of selected suspended dust particles in the air through automatic mapping of air-polluted areas.

#### Hardware
The core hardware used in this project are:
- AI-Thinker A9G Developement Board - GPS and GPRS module to obtain location coordinates and send prepared data to the web app as a POST request;
- STM32F446RET6 (Nucleo F446RE) - handles sensors and A9G;
- sensors: Sensirion SPS30, Spec-Sensors DGS SO2, WSP2110 (Grove HCHO Sensor).

#### Software (web application)
Web application to handle POST requests and render obtained data as an air pollution was developed with the use of:
- Node.js
- Express.js
- MongoDB
- Google Maps JavaScript API V3

![googlemaps](https://user-images.githubusercontent.com/48838669/85042274-4d14ca00-b18b-11ea-98ea-f91e6aeddccc.png)

## Credits
- Tomasz Jankowski - web application
- Michał Kliczkowski - STM32 development
- Wojciech Stróżecki - A9G development
- prof. dr hab. inż. Adam Dąbrowski - conceptual support and funding

## License
All Rights Reserved

Copyright (c) 2020 Tomasz Jankowski

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
