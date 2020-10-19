# Übung: BIC-Inspector

Dies ist die erste Übung im Rahmen der Vorlesung IAA. Im Rahmen der Übung soll eine kleine Webanwendung entwickelt
werden, mit der zu einer eingegebenen BIC *(Business Identifier Code)* die dazugehörigen Informationen der Bank 
abgerufen werden können. 

Hierzu wird eine HTML-Seite zur Eingabe der BIC und eine JavaScript-Implementation entwickelt, welche die Eingabe 
an einen RESTful Service leitet. Darauf folgend wird die Antwort wieder vom JavaScript entgegen genommen, verarbeitet 
und auf der HTML-Seite dem Nutzer angezeigt.

## Vorbereiten der HTML-Ansicht

Innerhalb dieses Projektes existiert eine HTML-Seite. Es hat sich durchgesetzt, die erste Seite einer Webseite, 
die der Nutzer betritt, `index.html` zu nennen. So also auch hier.

Innerhalb dieser Datei soll nun die Eingabemaske und die Ausgabe implementiert werden.

### Entwicklung der Eingabemaske

Wenn man die Datei `index.html` öffnet, sieht man, dass in der Datei bereits zwei Abschnitte mit Kommentaren 
gekennzeichnet sind: 
- `<!-- The input section-->` kennzeichnet den Abschnitt zum Lesen der Nutzereingabe.
- `<!-- The result section -->` kennzeichnet den Abschnitt zum Ausgeben der Bankinformationen.

Zur Eingabe einer BIC wird ein Eingabefeld inkl. Label, ein Button zum Abschicken und eine Headline, die die Eingabe 
optisch abgrenzt, benötigt. 

Zum Entwickeln der Eingabemaske müssen folgende Schritte durchgeführt werden:

- *1. Erstellen einer Headline mit dem Tag `<h1>` und dem Inhalte `BIC Inspector`.*
- *2. Hinzufügen eines Labels (`<label>`) mit dem Inhalt `Please enter a bank code:`.* 
- *3. Erzeugen eines Eingabefeld für die BIC (`<input>`) mit den Attributen `required` und `id="bank_code"`.* 
- *4. Damit das zuvor erstellte Label auch weiß, auf welches Eingabefeld es sich bezieht, macht es Sinn, die ID des 
Eingabefeldes im Tag von `<label>` zu referenzieren. Dazu bitte dem `<label>`-Tag das Attribut `for="bank_code"` 
hinzufügen.*

Nun fehlt nur noch Button, um die Suche abzuschicken. Der HTML-Code hierzu sieht wie folgt aus: 

`````html
<button id="submit" onclick="requestBICDetails();">Show BIC details</button>
`````

- *5. Bitte den obigen HTML-Code des Buttons in die `index.html` einfügen. Die Details (z.B. `onclick`) besprechen wir 
später.* 

### Entwickeln der Ausgabe 

Nach dem Erstellen des Eingabebereichs soll nun der Ausgabebereich implementiert werden. Der RESTful Service liefert 
die folgenden Informationen über eine BIC durch das spätere Backend: 

- Name der Bank (bank_name)
- PLZ (postal_code)
- Stadt (city)

Diese Daten sollen zusammen mit der eingegebenen BIC dem Nutzer innerhalb der HTML-Seite angezeigt werden. Dafür
sind die folgenden Schritte notwendig:

- *1. Hinzufügen einer Headline mit dem Tag `<h1>` und dem Inhalt `Details for bank code`.*

Zur übersichtlicheren Darstellung bietet es sich in der Ausgabe an, Absätze zu nutzen. Diese werden mit dem HTML-Tag
`<p>` realisiert. 

Der erste Absatz zur Darstellung der eingegebenen BIC soll wie folgt aussehen:
 
````html
    <p>
        <label>BIC:&nbsp;</label><span id="bic"></span>
    </p>
````

- *2. Bitte den obigen Absatz in die `index.html` übernehmen.* 
- *3. Einfügen der restlichen Absätze für `bank_name`, `postal_code` und `city`.*
 

## Controller-Logik in `controller.js`

Der Controller manipuliert die View (`index.html`) und stellt die Verbindung zum Backend her, um die nötigen Abfragen
zu starten. 

Das Projekt enthält bereits eine vorbereitete Datei `controller.js` im Unterverzeichnis `js`. Sie enthält zwei 
Funktionen: 

- `requestBICDetails()`: Wird ausgelöst bei dem Klick auf den Button
- `handleBICDetails(bankCode, details)` Wird aufgerufen, wenn Informationen vom Server zurückgekommen sind und 
auf der HTML-Seite angezeigt werden sollen (Callback). 

### Implementieren der `requestBICDetails()` 

Klickt der Nutzer auf den Button in der HTML-Seite, soll die Suche nach den Informationen zur eigegebenen BIC gestartet 
werden. Der logische Programmverlauf kann den Kommentaren innerhalb der JavaScript-Datei bereits entnommen werden. 

Noch eine Kleinigkeit: Während der Suche soll der Ergebnisbereich ausgeblendet werden. Das kann man durch 
ein Verstecken des Ausgabebereichs durch Setzen des Attributs `hidden` auf dem HTML-Tag erreichen.

Bitte die folgenden Schritte durchführen:

- *1. Setzen des `hidden`-Attributes auf dem `result`-Abschnitt mit:*

```javascript
document.getElementById("result").hidden = true;
``` 

- *2. Speichern des eingegeben Wertes in eine Variable `bankCode`.* 

Eine Variable lässt sich mit `let bankCode` erstellen. Das Auslesen des Wertes kann mit `.value` auf dem 
`input`-HTML-Tag erfolgen. 

- *3. Überprüfen, ob etwas in der Variablen steht.*
 
Ob eine Variable einen Inhalt hat, kann innerhalb von JavaScript beispielsweise wie folgt getestet werden: 
````javascript
if (anyVariable) {
    //Do something if variable is not empty
} else {
    //Do something if variable is empty
}
````  

- *4. Aufrufen unseres BICInspectors.*

Der BICInspector ist noch nicht implementiert, man wird ihn später aber wie folgt aufrufen können:
`bicInspector.resolveBICDetails(bankCode, handleBICDetails);` 

Bevor die Zeile in die JavaScript-Datei kopiert wird, bitte einmal überlegen, welchen Inhalt die übergebenen Parameter 
wohl haben.

- *5. Sollte der Nutzer auf den Button geklickt haben, ohne das er zuvor eine BIC eingegeben hat, soll dies als 
Fehlermeldung  ausgeben. Dies ist in JavaScript mit `alert("This is an error message")` möglich.*


### Implementieren der `handleBICDetails()`-Funktion

Diese Funktion wird dem BICInspector als sogenanntes `callback` mitgegeben, damit er, wenn er ein Ergebnis für die 
Suchanfrage hat, die Antwort über diese Methode zurückgeben kann. 

Die übergebenen Parameter beinhalten dabei:

- `bankCode`: Den BIC-Code der Suchanfrage. 
- `details`: Die Informationen zur Bank in Form von `details.bic`, `details.bank_name`, `details.postal_code` und 
`details.city`.

Die Vorgehensweise ist wie in der vorherigen Methode. Informationen sollen nur dargestellt werden, wenn der Parameter 
`details` Daten enthält. 

- *1. Erzeugen einer If-Abfrage, um zu überprüfen, ob `details` Daten enthält.*

Wenn `details` Daten enthält, dann kann wie folgt vorgegangen werden:

- *2. Das `hidden`-Attribut auf `false` setzen, um den Abschnitt mit id `result` wieder anzuzeigen.*
- *3. Setzen der Daten aus `details` als Inhalt in den jeweiligen Abschnitten.*

Dies sieht für die BIC beispielsweise so aus:
 
````javascript 
document.getElementById("bic").innerHTML = details.bic;
````

Sollte `details` dagegen keinen Inhalt haben, hat der Server zwar geantwortet, aber offensichtlich gibt es zur Eingabe 
keine  Informationen. 

- *4. Anzeigen einer Fehlermeldung, wenn die `details` keinen Inhalt haben. 
(bspw. `Unknown bank code [' + bankCode + ']`).*


## Der BICInspector 

Der BICInspector ist sozusagen die Verbindung zum RESTful Service, bei dem die Informationen zu einer Bank erfragt
werden können. Auch hier ist schon eine Javascript-Datei `bicinspector.js` vorbereitet.

Beim Öffnen fällt auf, dass diese JavaScript-Datei etwas anders strukturiert ist. Die Art der Implementation
ist speziell und ermöglicht das Erzeugen eines BICInspector-Objektes.

Wichtig ist für die kommenden Schritte die Methode `resolveBICDetails(bankCode, callback)`. Die Funktion enthält
bereits die URL des RESTful Service. Sie wird automatisch mit der übergebenen BIC 
zusammengebaut. Ein Beispiel für die Comdirect Bank wäre `https://fintechtoolbox.com/bankcodes/COBADEHDXXX.json`. 

- *1. Bitte testweise diese URL in einem Browser der Wahl aufrufen, um zu schauen, was zurückkommt.* 

Um diese Abfrage im Hintergrund zu starten und auszuwerten, sind allerdings ein paar Zeilen Code nötig. Um eine URL 
programmatisch abzufragen, gibt es in JavaScript einen `XMLHttpRequest`. 

- *2. Bitte eine neue Variable mit dem Namen `request` einfügen.*
- *3. Initialisierung diese Variable mit `new XMLHttpRequest();`.*

### Implementieren der `processRequest` Methode

Diese Methode enthält die Logik, die JavaScript ausführen soll, wenn der HTTP-Request abgesendet wurde. 
Hier gehört bspw. das Überprüfen des Verbindungsstatus sowie das Parsen der Antwort hinein.

- *1. Bitte erstmal den nachfolgenden Programm-Code in die anonyme Methode `processRequest` kopieren:* 

````javascript
 /*
 XML Http supports the following ready states:
 0: request not initialized                           
 1: server connection established
 2: request received
 3: processing request
 4: request finished and response is ready
 */

// We react only on state ...?... as the request is processed completely then
if (request.readyState === ?????) {
    // Checks whether the result is valid
    if (request.status === ?????) {
        // Parses the result
        
        // Calls the callback function
        callback(bankCode, response.bank_code);
    }
    else {
        // Something went wrong because the status was not as expected 
    }
}
```` 

Es gibt mehrere Möglichkeiten/Zeitpunkte, in eine Anfrage an das Backend einzugreifen. Es interessiert
in diesem Beispiel nur der Zustand, bei dem die Anfrage vollständig beantwortet und bereit zur Verarbeitung ist. 

- *2. Bitte das ersten Fragezeichen mit dem korrekten Status (Zahl aus dem darüber liegenden Kommentar) ersetzen.* 

Nun ist die Anfrage also vom Backend beantwortet worden. Das bedeutet allerdings nicht, dass die Anfrage auf der Seite 
des Backends fehlerfrei verarbeitet werden konnte. Ob und wie die Anfrage auf der "anderen Seite" verarbeitet wurde, 
signalisiert der Status. 

- *3. Bitte mit Hilfe von `request.status` überprüfen, ob das Backend mit HTTP `OK` geantwortet hat.* 

Tipp: Es wird wieder eine Zahl benötigt. Jeder HTTP-Status entspricht einem Integer-Wert. Bitte zur Not in die Folien
schauen oder eine Suchmaschine nutzen. 

Ist der `readyState` und der `status` so wie erwartet, können die Daten verarbeitet werden. Intern soll hierbei
mit JSON-formatierten Daten gearbeitet werden. 

- *4. Zum Parsen der Daten bitte folgende Zeile einfügen: `var response = JSON.parse(request.responseText);`*

Was nun aber, wenn die Anfrage fehlgeschlagen ist?

- *5. Bitte im `else`-Pfad noch ein `alert()` mit einer einsprechenden Nachricht einfügen.*
                                                          `     
### Abschicken der Anfrage

Die Implementation der `process`-Methode ist vollständig. Nun muss die Anfrage nur noch an den Server abgeschickt 
werden: 

- *1. Öffnen der Verbindung durch den folgenden Aufruf: `request.open("GET", url, true);`*
- *2. Senden die Anfrage ab mit `request.send(null);`*

Noch eine wichtige Frage: Warum muss hier `null` zum Backend gesendet werden?


# Testen...

Ist alles korrekt implementiert, können nun durch Aufruf der `index.html` im Browser Bankinformationen zu einer BIC
abgerufen werden:

- *1. Öffnen der `index.html` in einem Browser. Das geht schnell auch dadurch, dass bei geöffneter `index.html`in 
IntelliJ mit der Maus auf eines der Browser-Symbole in der rechten oberen Ecke geklickt wird.* 

 

 
   















