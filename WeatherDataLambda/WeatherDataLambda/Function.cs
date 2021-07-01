using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.LexEvents;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace WeatherDataLambda
{
    public class Function
    {
        private readonly HttpClient client = new HttpClient();
        public Function()
        {

        }

        /// <summary>
        /// A function that takes a lex event and predicts it's country
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<LexResponse> FunctionHandler(LexEvent lexEvent, ILambdaContext context)
        {

            string inputName = lexEvent.CurrentIntent.Slots["Name"];
            var countryResponse = "";
            var lexResponse = new LexResponse();
            lexResponse.DialogAction = new LexResponse.LexDialogAction
            {
                Type = "Close",
                FulfillmentState = "Fulfilled",
                Message = new LexResponse.LexMessage
                {
                    ContentType = "PlainText",
                    Content = ""
                }
            };

            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api.nationalize.io/?name="+ inputName),
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                Console.WriteLine(body);
                var result =  JsonSerializer.Deserialize<NationalityResponse>(body);
                var countries = result.country.Select(x => x.country_id).ToList();
                if (countries.Count > 0)
                {
                    countryResponse = "Probable Nationality should be : " + string.Join(", ", countries);
                }
                else
                {
                    countryResponse = "Sorry, cannot predict Nationality";
                }
            }

            lexResponse.DialogAction.Message.Content = countryResponse;
            return lexResponse;
        }
    }
}
