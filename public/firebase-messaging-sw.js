// importScripts('/__/firebase/7.15.0/firebase-app.js');
// importScripts('/__/firebase/7.15.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// const messaging = firebase.messaging();



 importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');

 firebase.initializeApp({
  apiKey: "AIzaSyAa3PgO5OWu7wA9S-xBt17SymyBBFjHVeo",
  authDomain: "grocery-e3586.firebaseapp.com",
  databaseURL: "https://grocery-e3586.firebaseio.com",
  projectId: "grocery-e3586",
  storageBucket: "grocery-e3586.appspot.com",
  messagingSenderId: "505605827332",
  appId: "1:505605827332:web:fc287d55babbf9f3f0fe51"
    //measurementId: "G-HG3V9ZDDJ6"
  });

 const messaging = firebase.messaging();



// messaging.setBackgroundMessageHandler(function(payload) {

//   const notificationTitle = 'New Order';
//   const notificationOptions = {
//     body: 'Click here to view order details',
//     icon: './images/favicon.ico',
//     click_action:"http://localhost:3000"
//   };

//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
// [END background_handler]
self.addEventListener('notificationclick', function(event) {
  let url = 'http://localhost:3000';
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});
