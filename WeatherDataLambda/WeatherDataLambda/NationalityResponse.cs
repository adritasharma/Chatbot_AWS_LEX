using System;
using System.Collections.Generic;
using System.Text;

namespace WeatherDataLambda
{
    public class NationalityResponse
    {
        public string name { get; set; }
        public List<Country> country { get; set; }

    }
    public class Country
    {
        public string country_id { get; set; }
    }
}
