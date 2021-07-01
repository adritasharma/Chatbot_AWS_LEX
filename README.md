# Chatbot_AWS_LEX
A Basic chatbot using AWS Lex

### Terminologies

- **Intent** – An intent represents an action that the user wants to perform. You create a bot to support one or more related intents. For example, you might create a bot that orders pizza. We have to provice a descriptive name for the intent called **Intent name**. For example, OrderPizza. Intent names must be unique within your account.

- **Sample utterances** – How a user might convey the intent. For example, a user might say "Can I order a pizza please" or "I want to order a pizza".

- **Fulfillment** – How you want to fulfill the intent after the user provides the necessary information (for example, place order with a local pizza shop). We recommend that you create a Lambda function to fulfill the intent.

- **Slot** – An intent can require zero or more slots or parameters. For example, the OrderPizza intent requires slots such as pizza size, crust type, and number of pizzas.
 For example, you might create and use the following slot types for the OrderPizza intent:
 
  Size – With enumeration values Small, Medium, and Large. </br>
  Crust – With enumeration values Thick and Thin.  </br>
  Count - Amazon Lex also provides built-in slot types. For example, AMAZON.NUMBER is a built-in slot type that you can use for the number of pizzas ordered.
  
  
The project has 3 steps :
  
  
## Step 2: Create Lambda function 

This function is used to fetch postal addresses baed on a Pincode

This is a AWS Lambda (Serverless Functions). AWS Lambda can be plugged into Amzon Lex Intent to  act on it.

To create Lamda project,  AWS Toolkit for Visual Studio is  and  Lambda Project (.NET Core) is created .It is like Class Library .NET Core Project. AWS Nuget Packages Amazon.Lambda.Core, Amazon.Lambda.LexEvents and Amazon.Lambda.Serialization.Json have been used for Lambda functionality.

        public async Task<LexResponse> FunctionHandler(LexEvent lexEvent, ILambdaContext context)
        {
            string pincode = lexEvent.CurrentIntent.Slots["Pincode"];
            var responseContent = "";
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
                    responseContent = "Post Offices : " + string.Join(", ", postoffices.Select(x => x.Name).ToList())
                        + ", " + "District : " + postalInfo.District
                        + ", " + "State : " + postalInfo.State
                        + ", " + "Country : " + postalInfo.Country
                        + ", " + "Pincode : " + postalInfo.Pincode;

                }
                else
                {
                    responseContent = "No records found.";
                }
            }

            lexResponse.DialogAction.Message.Content = responseContent;
            return lexResponse;
        }
