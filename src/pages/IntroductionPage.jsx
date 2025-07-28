import CodeBlock from '../components/CodeBlock'

const IntroductionPage = () => (
  <>
    <h1>Introduction till WebPlatformen</h1>
    <p>Projektet är lösningen till att ha terrahutton platformen på webben, den använder sig av i princip samma logic som i unity projektet men reverse enginerd av Firat. 
    </p>

    <p>Den är modulär och använder av en samling data och vyer per kund som är specefik till Kunden. Datan är enkel att ändra vilket i samband med eventbus on start load systemet, gör det allt väldrigt enkelt att starta upp ett helt nytt project och ha den färdig för en ny kund inom kort. 
    </p>

    <p>Kort för att beskriva hur allt funkar, det finns en <code>/Projects</code> folder i root vilket inehåler kataloger som <code>/abrasilver</code> och <code>/mogotes</code> samt en <code>projectMaster.json</code>. I <code>projectMaster.json</code> skriver man vilken kund project plattformen ska köra. I <code>projectMaster.json</code> ser det ur såhär…
</p>
    <h2>Exempel på projectMaster.json</h2>
    <CodeBlock language="json">{`{
  "activeProject": "abrasilver"
}`}</CodeBlock>
    <p><br />Om jag väljer att ändra activeProject till <code>"mogotes"</code> och plattformen hittar katalogen <code>/Projects/mogotes/</code>, samt att i config.json finns en <code>"projectName": "mogotes"</code>, kommer plattformen att köra mogotes konfigurationen istället. Detta sker vid applikationsstart   <code>Main.js</code> startar, läser <code>projectMaster.json</code>, upptäcker att activeProject är satt till <code>"mogotes"</code>, och läser sedan igenom mogotes katalogen. Plattformen startas sedan upp enligt den katalogens specifika konfiguration genom att ladda in alla filer och sätta upp projektet enligt dessa inställningar.</p>
    <p>
      Ett annat sätt att välja projekt är genom URL-parametern <code>?project=</code>. Till exempel, genom att använda <code>http://localhost:8080/?project=mogotes</code> kommer plattformen att ladda Mogotes-projektet. Detta är huvudmetoden för att bädda in specifika kundprojekt via iframe på externa webbplatser. URL-parametern har högre prioritet än inställningen i <code>projectMaster.json</code> under projektinitialisering, vilket betyder att url är högre upp i prioritet än json filen.
      <br />
    </p>
    <p>
     Kortsagt kan man säga att det är antingen activeproject eller url parametern som bestämmer vilket projekt som ska köras. Körningen sker i <code>Main.js</code> filen genom att <code>Main.js</code> läser in coresponding katalog i projects.
    </p>

    <h2>Kärnkoncept, enkel modulär plattform</h2>
    <p>
      Grundtanken med arkitekturen är att detta inte är en serie separata project, utan en enda, enhetlig plattform. Plattformen är designad för att dynamiskt kunna konfigurera och presentera ett oändligt antal unika kundprojekt från en och samma kodbas.
    </p>
    <p>
      Tack vare denna arkitektur behöver en utvecklare inte skriva någon ny kod för att lägga till ett nytt kundprojekt. Processen är helt datadriven: man skapar en ny projektmapp, lägger till de unika 3D-modellerna och bilderna, och definierar projektets alla egenskaper i JSON-konfigurationsfilerna. Dessa definitioner kan vara allt från camerapunkter, vad och hur clientens förmåga ska bete sig vid varje respektive camerapunkt, punkten på vart dekaler ska ligga, topbar button events och så vidare. Plattformen läser sedan denna nya konfiguration och renderar kundvyn dynamiskt. Ifall det är mogotes projektet öppnar den mogotes genom all den inmattade json datan i katalogen och om det är abrasilver så läser den json filerna i den katalogen.
    </p>

    <h2>Kundkatalogen: Projektets DNA</h2>
    <p>
      Varje kundvy på plattformen styrs av en samling konfigurationsfiler i dess egen mapp under <code>/projects/</code>. Dessa filer är hjärtat i den datadrivna arkitekturen. De talar om för plattformen vilka 3D-modeller som ska laddas, var de ska placeras, hur kameran ska bete sig, och hur användargränssnittet ska se ut och fungera. De huvudsakliga filerna är:
    </p>
    <ul>
        <li><code>config.json</code>: Huvudreceptet för projektet.</li>
        <li><code>models.json</code>: Definitioner för alla 3D-modeller.</li>
        <li><code>decals.json</code>: Bilder och overlays som projiceras på terrängen.</li>
        <li><code>cameraPoints.json</code>: Fördefinierade kamerapositioner och vyer.</li>
        <li><code>buttons.json</code> & <code>topbar.json</code>: Styr all funktionalitet i användargränssnittet.</li>
    </ul>
    <p>
      Var och en av dessa filer har en dedikerad dokumentationssida som beskriver deras struktur och alla tillgängliga egenskaper i detalj. <br /> <br /> <br /> 
    </p>


  </>
)

export default IntroductionPage; 