import CodeBlock from '../components/CodeBlock'
const UsageGuidePage = () => (
  <>
    <h1>Hur du skall bruka den</h1>
    <h2>&lt;iframe&gt;&lt;/iframe&gt;
    </h2>
    <p>Plattformen är byggd och hostad i vercel. När du väl vill ha den i en webbsida eller app så behöver du refrensa den genom url och styla den till din egen webbsida. Den är responsive och anpassar sig till din webbsida med. Den har ingen scrolling capabilitet och håller sig inom viewport. Här är exempel på min Firatportfoliowebbplats som jag har hostat på vercel och kallat in.</p>
    <CodeBlock language="html">{`{
<iframe src="https://Firatportfolio.com" width="1000" height="600"></iframe>
}`}</CodeBlock>
<br />
<br />
    <iframe src="https://Firatportfolio.com" width="1000" height="600"></iframe>
<br />
<br />
<br />
<br />
    <h2>Generell Översikt</h2>
    <h3>UI-element</h3>
    <ul>
      <strong>Topp-vänster</strong>: Dropdown-meny för kamerapunkter och platsnamn<br/>
      <strong>Topp-höger</strong>: Kompass för orientering<br/>
      <strong>Botten-höger</strong>: Navigeringspilar mellan vyer<br/>
      <strong>Topp-meny</strong>: Huvudmeny för att styra datalager
    </ul>
    <h3>Komma igång</h3>
    <p>
      Precis som i Unity-plattformen möts du av en <code>Start</code> knapp som tar dig in i 3D vyn. När du är inne fungerar allt precis som i Unity. Du kan navigera mellan vyer med dropdown menyn eller navigationspilarna, show och hide datalager via topp menyn, och utforska 3D scenen på samma sätt som du är van vid från Unity versionen.
    </p>

    <h2>Movement</h2>
    <h3>Standard Cesium-rörelse (Default Movement)</h3>
    <p>Detta är standardläget och erbjuder full frihet. Användaren kan panorera, zooma, tilta och rotera kameran fritt i 3D-scenen. Detta läge är idealiskt för generell utforskning och analys.</p>
    <ul>
      <li><strong>Vänsterklick + dra:</strong> Panorera kameran över terrängen.</li>
      <li><strong>Högerklick + dra:</strong> Rotera kameran runt en punkt där du sätter ner musen.</li>
      <li><strong>Scrollhjul:</strong> Zooma in och ut.</li>
      <li><strong>Mittenklick + dra:</strong> Tilta kameravinkeln.</li>
    </ul>
    <br />
    <h3>Banrörelse (Orbit Movement)</h3>
    <p>I detta läge är kameran låst till att kretsa kring en fördefinierad punkt, <code>orbitPoint</code>, som är center av skärmen raycastad ner till marken. Användaren kan rotera runt punkten och zooma in/ut, men inte panorera fritt från den. Man kan sätta helt cusom movement vilkor så länge man ändrar följande värden i <code>cameraPoints.json</code></p>
    <CodeBlock language="json">{`{
  "canLook": true,
  "canPan": true,
  "canZoom": true,
  "canTilt": true,
  "allowUnderground": true
}`}</CodeBlock>
<p>Om man sätter <code>allowUnderground</code> till <code>true</code> så kan man se under marken. Alla andra movement lägen gör det namnet beskriver.</p>
    <br />
    <h3>Förstapersonsläge (First-Person Mode)</h3>
    <p>Detta läge simulerar en upplevelse där användaren "står på marken". Kameran är låst till en fast höjd över terrängen, vilket ger en mer realistisk och immersiv vy av miljön. Detta läge är användbart för att visualisera hur något skulle se ut från ett mänskligt perspektiv. Gör man genom att sätta <code>onlyFirstPerson</code> till <code>true</code> i <code>cameraPoints.json</code>.</p>
    <CodeBlock language="json">{`{
  "onlyFirstPerson": true
}`}</CodeBlock>
<p>Detta läge är användbart för att visualisera hur något skulle se ut från ett mänskligt perspektiv. Glöm inte att sätta alla andra movement lägen till false. </p>
    <br />
    <h2>Hur man skapar en ny klient (nytt projekt)</h2>
    <h3>Devmode rekommenderas starkt</h3>
    <p>
      Det är starkt rekommenderat att skapa nya projekt i DevMode eftersom det ger dig möjlighet att:
      - Kopiera exakta <code>kamerapositioner</code> i JSON-format direkt från vyn du tittar på
      - Kopiera <code>pin-positioner</code> för att placera markörer
      - Se och kopiera <code>koordinater</code> i realtid
      - Lista alla <code>entity-ID:n</code> i scenen, vilket är kritiskt för att konfigurera vilka objekt som ska visas/döljas med <code>showOnCameraEnter</code> och <code>hideOnCameraEnter</code>
      Detta gör det mycket enklare att skapa precisa konfigurationer utan att behöva gissa koordinater eller ID:n.
    </p>
    <p>Plattformens arkitektur är byggd för att enkelt kunna hantera flera olika klienter eller projekt. Varje projekt har sin egen uppsättning data, modeller och konfigurationer. Följ dessa steg för att skapa ett nytt projekt:</p>
    <ol>
        <li>
            <strong>Duplicera en befintlig projektmapp:</strong>
            Navigera till <code>/projects</code>-mappen. Kopiera en befintlig mapp (t.ex. <code>mogotes</code>) och döp om den till ditt nya projektnamn (t.ex. <code>newProject</code>).
        </li>
        <li>
            <strong>Byt ut projektets tillgångar (Assets):</strong>
            Inuti din nya <code>newProject/assets/</code>-mapp, byt ut modellfiler (<code>.glb</code>), dekaler (<code>.png</code>), logotyper och andra datafiler mot de som är relevanta för ditt nya projekt.
        </li>
        <li>
            <strong>Uppdatera konfigurationsfiler:</strong>
            Öppna och anpassa varje <code>.json</code>-fil i roten av din nya projektmapp (<code>config.json</code>, <code>cameraPoints.json</code>, <code>models.json</code>, etc.).
        </li>
        <li>
            <strong>Aktivera det nya projektet:</strong>
            Öppna filen <code>/projects/projectMaster.json</code> och ändra värdet för <code>activeProject</code> till namnet på din nya projektmapp.
        </li>
        <li>
            <strong>Starta om servern:</strong> Stoppa din utvecklingsserver (Ctrl + C) och starta den igen för att säkerställa att de nya konfigurationsfilerna laddas korrekt.
        </li>
    </ol>
    <br />
    <h2>Hur man använder DevMode</h2>
    <p>DevMode är ett kraftfullt verktyg för att felsöka, testa och finjustera upplevelsen i realtid.</p>
    <h4>Aktivering</h4>
    <p>För att aktivera DevMode, lägg till <code>?dev=true</code> i slutet av webbadressen. Exempel: <code>http://localhost:8080/?dev=true</code>. Då visas det aktivt en "Dev Card" i det nedre högra hörnet.</p>
    <h4>Funktioner i Dev Card</h4>
    <ul>
        <li><strong>Performance:</strong> Se aktuell, minsta och högsta FPS (Frames Per Second).</li>
        <li><strong>Camera Position:</strong> Få exakta koordinater (longitud, latitud, höjd) och UTM-koordinater.</li>
        <li><strong>Camera Orientation:</strong> Se kamerans exakta vinklar (Heading, Pitch, Roll).</li>
        <li><strong>Environment:</strong> Justera solens tid live med ett reglage.</li>
        <li><strong>Controls & Orbit Point:</strong> Se aktiva kamerakontroller och status för orbit-punkten.</li>
        <li><strong>Kopiera data:</strong> Med knapparna kan du enkelt kopiera den nuvarande kamera- eller orbit-positionen som en JSON-sträng, vilket är extremt användbart för att snabbt skapa nya kamerapunkter.</li>
    </ul>
    <br />
    <br />
    <br />
  </>
)

export default UsageGuidePage; 