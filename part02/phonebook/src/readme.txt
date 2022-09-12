*** exercice 2.7
I Could've used JSON.stringify method to convert the objects to strings and then compare them with ===,
but I figured the order in which the properties are defined within the objects shouldn't matter. So lodash it is.

*** exercise 2.8
I didn't write any safeguards on the app (empty name, empty number etc...). Since there were no specific requirements
other than not having the same name multiple times, I thought the user should be able to enter blank entries.
Another thing to keep in mind, with this implementation, the user is able to make several entries with the same name,
but different phone numbers (and vice versa althought this is arguably wrong since there shouldn't be multiple individuals
using the same number except for non-mobile phones which tend to disapear nowadays haha), which should be fine in the case 
of multiple sim cards for example. 
Also I could've used the phone number as the key instead of the name, because the number is indeed unique.
