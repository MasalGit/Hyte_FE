
# Hyte project





## Tietokanta

Tietokannasta löytyy 4 osiota:
+-------------------+
| Tables_in_hyteapp |
+-------------------+
| diaryentries      |
| exercises         |
| medications       |
| users             |
+-------------------+
Näistä projektissa käytetään users, ja diaryentries.
users osiosta löytyy käyttäjät, käyttäjien tietoja kuten heidän user_id, username, password, email, created_at, ja user_level.
diaryentries osiosta taas löytyy  entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, ja created_at

## Validointisäännöt (kenttäkohtaisesti)

1) Rekisteröinti — POST `/api/users`:
- `username`: pakollinen, alfanumeerinen, 3–20 merkkiä
- `email`: pakollinen, kelvollinen sähköpostiosoite
- `password`: pakollinen, vähintään 8 merkkiä

2) Kirjautuminen — POST `/api/auth/login`:
- `username`: pakollinen
- `password`: pakollinen

3) Lisää merkintä — POST `/api/entries` (vaatii `Authorization: Bearer <token>`):
- `user_id`: yleensä otetaan tokenista; jos annetaan pyynnössä, sen tulee olla numeromuotoinen
- `entry_date`: pakollinen, validi ISO8601-päivämäärä (esim. `2026-03-08`)
- `mood`: valinnainen, max 100 merkkiä
- `weight`: valinnainen, numero välillä 0–500
- `sleep_hours`: valinnainen, kokonaisluku välillä 0–24
- `notes`: valinnainen, max 2000 merkkiä


## Kuvaus toiminnallisuuksista

Kotisivu:
Navbar. (josta pääsee muihin sivuihin.)
BMI laskuri.
Ruoka sivu, tämän sivun tarkoitus olisi ollut luoda sinulle ruoka menu viikolle joka olisi noudattanut käyttäjän asettamia asetuksia. However taito ja aika loppui kesken.
Rajapinnat, simppeli sivu jossa voi testata suuremmaksi osaksi item rajapintoja.
Kirjaudu sisään. Käyttäjä voi registeröidä, ja kirjautua sisään yhteen tietokannan käyttäjistä. Kun kirjaudut sisään localstorageen tallentuu token jota tarvitaan seuraavassa osassa.
Päiväkirja. Tarvitsee tokenin muuten ei toimi. Käyttäjä pystyy katsomaan, tekemään, päivittämään, ja poistamaan päiväkirjoja halutessaan.
"Mikä on mat" Tällä sivulla olisi löytynyt simppeliä faq tietoa mutta en nähnyt sitä tarpeeksi tarvittavaksi tällä hetkellä.
Yhteystiedot. (dummy infoa)
Responsiivisuus. sivujen objektit skaalautuvat eri näyttökokoihin. Kaikki buttonit ovat toiminnallisia.
Autentikointi. tietyt asiat ovat estetty ilman tokenia, kuten entry sivun lataaminen ja entrien käsittely.
## Bugit ja ongelmat
Rajapinnat sivun POST ei toimi.
## referenssit, käytetyt tutoriaalit, grafiikkakirjastot, tms.
W3Sschools oli käytetyin frontend developmentissa, muuten seurasin opettajien ohjeita frontend ja backend koodamisessa.

Miten tekoälyä hyödynnettiin. Käytin githubin tekoälyä kohdissa jossa en saanut jotain toimimaan. Tekoälyä käytettiin myös selittämään asioita, ja kertomaan miten tiettyjä asioita voidaan koodata.
