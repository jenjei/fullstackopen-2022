# Uusi muistiinpano -sekvenssikaavio

Mitä tapahtuu selaimessa ja palvelimessa, kun käyttäjä luo uuden muistiinpanon ollessaan sivulla (kirjoittaa tekstikenttään ja painaa 'tallenna')?

Mene osoitteeseen https://www.websequencediagrams.com/

Ja liitä sivulle seuraava nähdäksesi sekvenssikaavion:

```
selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
palvelin-->selain: status code 302

note over palvelin:
palvelimen uudelleenohjauspyyntö
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
palvelin-->selain: HTML-koodi
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin-->selain: main.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin-->selain: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note
```

# Single Page App -sekvenssikaavio

Mitä tapahtuu selaimessa ja palvelimessa, kun käyttäjä avaa muistiinpanojen spa:n (single page appin)?

Mene osoitteeseen https://www.websequencediagrams.com/

Ja liitä sivulle seuraava nähdäksesi sekvenssikaavion:

```
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
palvelin-->selain: HTML-koodi
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
palvelin-->selain: spa.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin-->selain: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note
```

Eli ei juuri merkittävää eroa "vanhanaikaisiin" web-sivuihin. Erona spa.js -tiedosto.

# Uusi muistiinpano Single Page App:ssa

Mitä tapahtuu selaimessa ja palvelimessa, kun käyttäjä luo uuden muistiinpanon spa:ssa?

Mene osoitteeseen https://www.websequencediagrams.com/

Ja liitä sivulle seuraava nähdäksesi sekvenssikaavion:

```
selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
palvelin-->selain: status code 201 'created'

note over selain:
javascript hoitaa lomakkeen tietojen
lähettämisen, eli palvelimen ei 
tarvitse lähettää uudelleenohjauspyyntöä
end note
```

