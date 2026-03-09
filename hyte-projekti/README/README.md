
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


## Kuvaus toiminnallisuuksista

Kotisivu:
Navbar. (josta pääsee muihin sivuihin.)
contact osio. (dummy infoa)
Responsiivisuus. sivujen objektit skaalautuvat eri näyttökokoihin. Kaikki buttonit ovat toiminnallisia.
Autentikointi. tietyt asiat ovat estetty ilman tokenia, kuten entry sivun lataaminen ja entrien käsittely.
## Bugit ja ongelmat
Rajapinnat sivun POST ei toimi.
## referenssit, käytetyt tutoriaalit, grafiikkakirjastot, tms.
W3Sschools oli käytetyin frontend developmentissa, muuten seurasin opettajien ohjeita frontend ja backend koodamisessa.

Miten tekoälyä hyödynnettiin. Käytin githubin tekoälyä kohdissa jossa en saanut jotain toimimaan. Tekoälyä käytettiin myös selittämään osioita, ja kertomaan miten tiettyjä asioita voidaan koodata.
