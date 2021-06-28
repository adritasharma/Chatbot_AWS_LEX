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
  Count - Amazon Lex also provides built-in slot types. For example, AMAZON.NUMBER is a built-in slot type that you can use for the number of pizzas ordered
