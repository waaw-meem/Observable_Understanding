## Understand Observable

# What is Observable?

Observable: This is an object that holds some data or state and notifies other objects (called Observers) when its state changes. The Observable is responsible for managing the list of observers and notifying them when necessary. It provides methods for observers to subscribe (or register) themselves to receive notifications, as well as methods to notify observers when the state changes.

Observer: This is an object that wants to be notified when the state of an Observable changes. Observers subscribe to an Observable to receive notifications, and they implement a specific interface or callback method that the Observable calls when it needs to notify the Observer of a change in state.

# Building a Custom Observer

<code>
const customObservable = new Observable<number>(observer => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete()
        }
        if(count > 3){
          observer.error(new Error('Error found'));
        }
        count++;
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });

    this.firstObSubs = customObservable.subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('An error occurred:', error);
      },
      () => {
        console.log('Observable completed');
      }
    );
    }
</code>

Explaination of the above code

Observable Creation:

const customObservable = new Observable<number>(observer => {...});: Here, we create a new Observable called customObservable using the Observable class constructor. We specify that this Observable emits values of type number.
Inside the constructor of Observable, we provide a function that takes an observer as a parameter. This function represents the execution logic of the Observable.
Emitting Values:

let count = 0;: We initialize a variable count to keep track of the emitted values.
const intervalId = setInterval(() => {...}, 1000);: We set up an interval using setInterval() that executes the provided arrow function every 1000 milliseconds (1 second).
observer.next(count);: Inside the interval function, we emit the current value of count using the next() method of the observer. This sends the value to any subscribed observers.
count++;: We increment the value of count to prepare for the next emission.
Cleanup Logic:

return () => {...};: We return a function that performs cleanup logic when the Observable is unsubscribed.
clearInterval(intervalId);: Inside the cleanup function, we clear the interval using clearInterval() to stop the emission of values when the Observable is unsubscribed.
Subscription:

this.firstObSubs = customObservable.subscribe(...);: We subscribe to the customObservable by calling the subscribe() method. This method takes three optional callback functions as arguments: one for handling emitted values (data => {...}), one for handling errors (error => {...}), and one for handling completion (() => {...}).
In this example, we log each emitted value to the console using console.log(data). We also define error handling and completion handling functions, although they are optional in this case.


# Understanding the Operators

In RxJS, operators are functions that are used to transform, filter, combine, or perform other operations on Observables. They allow you to manipulate the data emitted by Observables in various ways, enabling you to create complex data processing pipelines in a declarative and composable manner.

<strong>Every Observable contain pipe method</strong>

Data Transformation: Operators can transform the data emitted by Observables into different formats or structures. For example, you can use the map operator to transform each emitted value using a projection function.

Filtering: Operators like filter allow you to selectively emit values from an Observable based on certain criteria. This is useful for filtering out unwanted data from the Observable stream.

Combination: Operators such as merge, concat, zip, and combineLatest enable you to combine multiple Observables into a single Observable stream. This is useful for scenarios where you need to work with data from multiple sources.

Error Handling: RxJS provides operators like catchError and retry for handling errors that occur during the execution of an Observable stream. These operators allow you to gracefully handle errors and recover from them.

Concurrency Control: Operators like debounceTime, throttleTime, and bufferTime help you control the rate at which data is emitted by an Observable, which can be useful for managing asynchronous events and preventing performance issues.

State Management: RxJS provides operators like scan and reduce for aggregating values emitted by an Observable over time. These operators allow you to maintain and update state based on the incoming data.

Composition: Operators can be composed together to create complex data processing pipelines. This allows you to break down complex operations into smaller, reusable pieces and compose them together as needed.

# Subjects

In Angular, a Subject is a special type of Observable that allows values to be multicasted to many Observers. While a regular Observable is unicast (each subscribed Observer owns an independent execution of the Observable), a Subject is multicast. This means that a Subject can be subscribed to by multiple Observers, and when the Subject emits a value, all subscribed Observers will receive that same value.

Subject is part of the RxJS library, which is widely used in Angular for handling asynchronous operations and data streams.

Here's why and when you might use a Subject in Angular:

Event Handling: You can use a Subject to represent an event stream. Components can subscribe to this Subject to listen for and react to events emitted by other parts of the application.

State Management: Subject can be used for managing application state. You can use it to store and update the current state of your application, and components can subscribe to this Subject to receive updates whenever the state changes.

Inter-component Communication: Subject can facilitate communication between different components in your application. Components can emit values through a Subject, and other components can subscribe to this Subject to receive those values. This allows for loosely coupled communication between components.

Service Communication: Subject can be used to facilitate communication between services and components. Services can expose Subject instances, allowing components to subscribe to them to receive updates or send data to the service.

In your code example, this.userService.activatedEmitter appears to be an instance of a Subject or a similar type of multicasting Observable. It allows components to subscribe to it to receive updates when the activation status changes. This is a common use case for Subject in Angular applications, where you need to broadcast events or state changes to multiple parts of the application.