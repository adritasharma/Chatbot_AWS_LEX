using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.LexEvents;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace PostalAddressLambda
{
    public class Function
    {

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="lexEvent"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        /// Sample Request

// {
//  "messageVersion": "1.0",
//  "invocationSource": "DialogCodeHook",
//  "userId": "John",
//  "sessionAttributes": {},
//  "bot": {
//    "name": "MakeAppointment",
//    "alias": "$LATEST",
//    "version": "$LATEST"
//  },
//  "outputDialogMode": "Text",
//  "currentIntent": {
//    "name": "Address",
//    "slots": {
//      "Pincode": "712136"
//    },
//    "confirmationStatus": "None"
//  }
//}
    public async Task<LexResponse> FunctionHandler(LexEvent lexEvent, ILambdaContext context)
        {
            string pincode = lexEvent.CurrentIntent.Slots["Pincode"];
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
                RequestUri = new Uri("https://api.postalpincode.in/pincode/" + pincode),
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                Console.WriteLine(body);
                var result = JsonSerializer.Deserialize<List<PostalAddress>>(body);
                var postoffices = result.FirstOrDefault().PostOffice.ToList();
                if (postoffices.Count > 0)
                {
                    var postalInfo = postoffices[0];
                    countryResponse = "Post Offices : " + string.Join(", ", postoffices.Select(x => x.Name).ToList())
                        + ", " + "District : " + postalInfo.District
                        + ", " + "State : " + postalInfo.State
                        + ", " + "Country : " + postalInfo.Country
                        + ", " + "Pincode : " + postalInfo.Pincode;

                }
                else
                {
                    countryResponse = "No records found.";
                }
            }

            lexResponse.DialogAction.Message.Content = countryResponse;
            return lexResponse;
        }
    }
}
