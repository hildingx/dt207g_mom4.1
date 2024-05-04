# REST-Webbtjänst för Autentisering
***Av Alexander Hilding***

## Arbetsgång
* Skapat MongoDB-databas via MongoDB Atlas.
* Anslutit till databasen med MongoDB Compass för bättre översikt av data.
* Initierat npm-projekt.
* Installerat paket:
    * **express**, webbappram för att skapa server som kan ta emot och hantera http-förfrågningar.
    * **mongoose**, paket för anslutning till MongoDB-databas.
    * **dotenv**, paket för att hantera miljövariabler.
    * **cors**, paket som tillhandahåller en connect/express middleware för att aktivera CORS.
    * **jsonwebtoken**, för att skapa och verifiera tokens.
    * **bcrypt**, för att hasha och jämföra lösenord.
    * **nodemon** --save-dev, verktyg för att automatiskt starta om applikationen vid upptäckt av filändring.
    * **xss**, för att sanera input och skydda mot XSS-attacker.
    * **router**, ett express-liknande router-paket för att hantera rutter.
* Använt Thunder Client som plug-in i VSCode för att testa API-anrop.
* Satt upp ett git-repo och initierat server.js med grundläggande server-setup och API-rutter.
* Skapat ett Mongoose-schema och modell för användare.
* Implementerat autentiseringslogik inklusive registrering och inloggning.
* Testat API med Thunder Client.
* Publicerat webbtjänsten på Render.

### Projektets komponeter
* **authRoutes.js** - Definierar autentiseringsrelaterade rutter såsom registrering, inloggning och åtkomst till skyddade resurser. Hanterar routing-logiken separat från huvudserverfilen för bättre modularitet.
* **user.js (Användarmodell)** - Innehåller Mongoose-schema och modellen för användare. Definierar användarstruktur, valideringslogik och lösenordshashning.
* **Register-routen** - Tillåter nya användare att registrera sig genom att ange användarnamn, lösenord, förnamn och efternamn. Validerar inmatningen och sparar den hashade lösenorden i databasen.
* **Login-routen** - Möjliggör inloggning för befintliga användare genom att ta emot ett användarnamn och lösenord. Validerar användaruppgifter och skapar en JWT-token vid framgångsrik autentisering.
* **Userdata-routen** - Använder ett användarnamn från en dekoderad JWT-token för att hämta specifik användardata som förnamn och efternamn från databasen.
* **authenticateToken-funktionen** - Ett middleware som verifierar JWT-token från inkommande begäranden. Extraherar användarnamnet från den dekoderade token för vidare användning i andra rutter.

## Länk
API'et finns tillgängligt på https://dt207g-mom4-1.onrender.com/api/

## Användning
Såhär når du API'et:
| Metod | Ändpunkt  | Beskrivning |
|--|--|--|
| POST | /api/register | Registrerar en ny användare. |
| POST | /api/login | Loggar in en användare och returnerar en JWT. |
| GET | /api/protected | Hämtar skyddad data, endast tillgänglig med giltig JWT. |

### Exempel på JSON-objekt för användarregistrering:

`{
    "username": "alexander",
    "password": "SuperSäkert123!",
    "firstname": "Alexander",
    "lastname": "Hilding"
}`
