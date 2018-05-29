# qrapp

App de ejemplo para usar BarcodeScanner, googlemaps, inappbrowser, contacts

Editar config.xml

~~~ 
 <plugin name="cordova-plugin-googlemaps" spec="^2.3.4">    
    <variable name="API_KEY_FOR_ANDROID" value="API_KEY_FOR_ANDROID" />
    <variable name="API_KEY_FOR_IOS" value="API_KEY_FOR_IOS" />
 </plugin>
~~~

Realizar:

1. npm install
2. ionic cordova prepare
3. ejecutar ionic cordova run
   * ejemplo: ionic cordova run android --device --livereload --debug --consolelogs

 
