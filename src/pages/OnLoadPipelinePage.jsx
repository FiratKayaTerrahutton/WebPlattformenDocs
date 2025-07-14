import CodeBlock from '../components/CodeBlock';

const OnLoadPipelinePage = () => (
  <>
    <h1>On Load Pipeline: Från Start till Interaktiv Scen</h1>
    <p>
      Denna sida beskriver den tekniska processen för hur plattformen startar, laddar data och konfigurerar en fullständig 3D-scen. Förståelsen för denna pipeline är avgörande för utvecklare som vill felsöka, optimera eller bygga ut plattformens funktionalitet.
    </p>
    <p>
      Processen är en noggrant orkestrerad sekvens som säkerställer att alla moduler, data och grafiska tillgångar laddas och initieras i rätt ordning för en sömlös användarupplevelse.
    </p>

    <h2>Översikt av Laddningspipelinen</h2>
    <p>Laddningsprocessen kan delas in i sju huvudsakliga faser:</p>
    <ol>
      <li><strong>Applikationsstart (<code>main.js</code>)</strong>: Den initiala startpunkten.</li>
      <li><strong>Projektidentifiering (<code>DataManager</code>)</strong>: Läser <code>projectMaster.json</code> för att avgöra vilket kundprojekt som ska laddas.</li>
      <li><strong>Konfigurationsladdning (<code>DataManager</code>)</strong>: Hämtar projektets huvudkonfigurationsfil, <code>config.json</code>.</li>
      <li><strong>Parallell Dataladdning (<code>DataManager</code>)</strong>: Asynkron hämtning av all projektspecifik data (<code>models.json</code>, <code>cameraPoints.json</code>, etc.).</li>
      <li><strong>Kärnmodulernas Initialisering</strong>: <code>CesiumViewer</code>, <code>UIManager</code>, och andra centrala moduler skapas.</li>
      <li><strong>Datadistribution och Scenuppsättning</strong>: Den laddade datan distribueras till respektive manager, som i sin tur bygger upp 3D-scenen och UI-komponenter.</li>
      <li><strong>Finalisering</strong>: Laddningsskärmen döljs och applikationen blir interaktiv.</li>
    </ol>

    <hr />

    <h3>Fas 1: Applikationsstart (<code>main.js</code>)</h3>
    <p>Allt börjar i <code>src/main.js</code> med skapandet av en <code>App</code>-instans.</p>
    <CodeBlock language="javascript">{`// src/main.js

class App {
  constructor() {
    // 1. Skapa en central EventBus för kommunikation mellan moduler.
    this.eventBus = new EventBus();

    // 2. Skapa DataManager för att hantera all dataladdning.
    this.dataManager = new DataManager();
    
    // 3. Starta hela initialiseringsprocessen.
    this.initialize();
  }
  // ...
}`}</CodeBlock>
    <p>Konstruktorn i <code>App</code> sätter omedelbart igång <code>initialize()</code>-metoden, vilket startar hela kedjan.</p>

    <h3>Fas 2 &amp; 3: Projektidentifiering och Konfiguration (<code>DataManager</code>)</h3>
    <p>Det första <code>initialize()</code> gör är att anropa <code>loadProjectData()</code>, som i sin tur använder <code>DataManager</code>.</p>
    <ol>
      <li><strong>Hitta Aktivt Projekt</strong>: <code>DataManager.loadActiveProjectName()</code> anropas. Denna metod:
        <ul>
          <li>Skickar en <code>fetch</code>-förfrågan för att läsa <code>/projects/projectMaster.json</code>.</li>
          <li>Extraherar värdet från <code>"activeProject"</code> (t.ex., <code>"mogotes"</code>).</li>
          <li>Konstruerar rot-sökvägen till projektmappen, t.ex., <code>./projects/mogotes</code>.</li>
        </ul>
      </li>
      <li><strong>Ladda Huvudkonfiguration</strong>: När det aktiva projektet är känt, anropar <code>DataManager.loadProjectConfig()</code>:
        <ul>
          <li>Hämtar <code>config.json</code> från den aktiva projektmappen (t.ex., <code>./projects/mogotes/config.json</code>).</li>
          <li>Denna fil är central eftersom den innehåller sökvägarna till alla andra nödvändiga datafiler under nyckeln <code>dataFiles</code>.</li>
        </ul>
      </li>
    </ol>

    <h3>Fas 4: Parallell Dataladdning (<code>DataManager</code>)</h3>
    <p>Med <code>config.json</code> laddad, anropas <code>DataManager.loadAllData()</code>. Denna metod är designad för maximal effektivitet:</p>
    <ul>
      <li>Den itererar över objektet <code>dataFiles</code> från <code>config.json</code>.</li>
      <li>För varje fil (t.ex., <code>cameraPoints</code>, <code>models</code>, <code>decals</code>) skapas en <code>fetch</code>-promise.</li>
      <li><code>Promise.all()</code> används för att exekvera alla dessa <code>fetch</code>-anrop parallellt. Detta innebär att alla JSON-filer laddas ner samtidigt istället för en i taget, vilket dramatiskt minskar den totala laddningstiden.</li>
      <li>Resultatet är ett enda stort <code>allData</code>-objekt som innehåller all data för projektet, redo att distribueras.</li>
    </ul>

    <h3>Fas 5: Kärnmodulernas Initialisering</h3>
    <p>Tillbaka i <code>App.initialize()</code> skapas nu de centrala modulerna:</p>
    <ol>
      <li><strong><code>UIManager</code></strong>: Skapas tidigt så att den kan hantera laddningsskärmen och visa felmeddelanden om något går snett under dataladdningen.</li>
      <li><strong><code>CesiumViewer</code></strong>: Detta är den tyngsta modulen. Den skapar <code>Cesium.Viewer</code>-instansen, vilket renderar 3D-globen. Den konfigureras med inställningar från <code>projectConfig.performanceSettings</code> och <code>projectConfig.cameraDefaults</code>. Den sätter upp terräng, belysning och grundläggande kamerakontroller.</li>
      <li><strong>Övriga Managers</strong>: <code>CameraManager</code>, <code>ButtonManager</code>, <code>TopBarManager</code>, och <code>PinManager</code> skapas och får <code>eventBus</code>, <code>cesiumViewer</code>, och andra nödvändiga beroenden injicerade via sina konstruktorer.</li>
    </ol>

    <h3>Fas 6: Datadistribution och Scenuppsättning</h3>
    <p>Detta är steget där den abstrakta datan omvandlas till en levande 3D-värld. <code>distributeLoadedData()</code>-metoden i <code>App</code> skickar relevant data till varje manager:</p>
    <ul>
      <li><strong><code>CameraManager.setCameraPoints()</code></strong>: Tar emot datan från <code>cameraPoints.json</code>. Den analyserar punkterna, förbereder för navigering och börjar cacha terrängdata runt punkterna för snabbare flygningar.</li>
      <li><strong><code>ButtonManager.setButtons()</code></strong>: Tar emot datan från <code>buttons.json</code> och förbereder knapparnas tillstånd och handlingar.</li>
      <li><strong><code>TopBarManager.loadTopBarConfig()</code></strong>: Tar emot <code>topbar.json</code> och bygger dynamiskt upp hela toppmenyn med flikar och knappar.</li>
      <li><strong><code>CesiumViewer.loadEntities()</code></strong>: Tar emot datan från både <code>models.json</code> och <code>decals.json</code>. Denna metod itererar igenom varje modell och dekal:
        <ul>
            <li>För <strong>modeller</strong> (<code>.glb</code>) skapas en 3D-entitet i scenen på den specificerade positionen.</li>
            <li>För <strong>dekaler</strong> (bilder, polygoner) skapas <code>GroundPrimitive</code> eller <code>ImageryLayer</code> som draperas över terrängen.</li>
        </ul>
      </li>
      <li><strong><code>PinManager</code> &amp; <code>CameraManager</code></strong>: <code>CameraManager</code> itererar över kamerapunkterna. Om en punkt har <code>showPin: true</code>, anropas <code>PinManager.createPin()</code> för att skapa en interaktiv nål vid den angivna <code>pinPosition</code>.</li>
      <li><strong><code>CameraManager.setViewToPointById()</code></strong>: Slutligen ställs kamerans initiala position in. <code>CameraManager</code> läser <code>initialCameraPoint</code> från <code>config.json</code>, hittar motsvarande kamerapunkt och sätter kameran <em>direkt</em> till den positionen med <code>setView()</code> (inte <code>flyTo()</code>) för att undvika en onödig och lång flyganimation från rymden.</li>
    </ul>

    <h3>Fas 7: Finalisering och Interaktivitet</h3>
    <p>När alla modeller är laddade och den initiala vyn är satt:</p>
    <ol>
        <li><strong><code>UIManager.hideLoadingScreen()</code></strong>: Anropas för att tona ut laddningsskärmen och visa det färdiga användargränssnittet.</li>
        <li><strong><code>UIManager.setupNavigationButtons()</code></strong>: Navigationsknapparna (nästa/föregående punkt) aktiveras.</li>
        <li><strong>Applikationen är redo</strong>: Systemet är nu i ett vilande tillstånd och väntar på användarinteraktion. <code>EventBus</code> lyssnar efter händelser, som klick på knappar i <code>TopBarManager</code>, vilket kan publicera händelser som får <code>CesiumViewer</code> att ändra synligheten på entiteter eller <code>CameraManager</code> att flyga till en ny punkt.</li>
    </ol>

    <h3>Specialfall: Utvecklarläge (<code>DevManager</code>)</h3>
    <p>Om URL:en innehåller <code>?dev=true</code>, kommer <code>DevManager.isDevModeActive()</code> att returnera <code>true</code>. Detta aktiverar en extra modul som:</p>
    <ul>
        <li>Visar en informationspanel (<code>#dev-card</code>) med realtidsdata om kamerans position, FPS, cache-status och mer.</li>
        <li>Tillhandahåller hjälpfunktioner för att kopiera kamerapositioner och lista entiteter i konsolen, vilket förenklar utveckling och konfiguration av nya kamerapunkter och händelser.</li>
    </ul>

    <hr />

    <h2>Visuell Representation: Laddningssekvens</h2>
    <CodeBlock language="mermaid">{`sequenceDiagram
    participant User as Användare
    participant main.js as App
    participant DataManager as DataManager
    participant CesiumViewer as CesiumViewer
    participant CameraManager as CameraManager
    participant UIManager as UIManager

    User->>main.js: Öppnar webbsidan
    main.js->>DataManager: loadProjectData()
    DataManager->>DataManager: 1. Läs projectMaster.json
    DataManager->>DataManager: 2. Läs <active_project>/config.json
    DataManager->>DataManager: 3. Läs alla datafiler (Promise.all)
    DataManager-->>main.js: Returnera all projektdata

    main.js->>CesiumViewer: new CesiumViewer(config)
    main.js->>UIManager: new UIManager()
    main.js->>CameraManager: new CameraManager()
    
    main.js->>CameraManager: distributeLoadedData(cameraPoints)
    main.js->>CesiumViewer: distributeLoadedData(models, decals)
    
    CesiumViewer->>CesiumViewer: Skapa 3D-modeller och dekaler
    CameraManager->>CameraManager: Sätt initial kameraposition (setView)

    main.js->>UIManager: hideLoadingScreen()
    UIManager-->>User: Visar interaktiv 3D-scen
`}</CodeBlock>
<br />
<br />
  </>
);

export default OnLoadPipelinePage; 