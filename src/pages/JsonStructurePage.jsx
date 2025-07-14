import CodeBlock from '../components/CodeBlock';

const JsonStructurePage = () => {
  return (
    <div>
      <h1>JSON File Structures</h1>
      <p>Denna sida beskriver strukturen för de olika JSON filerna som används för att konfigurera varje projekt.</p>
      
      <nav>
        <ul>
          
          <li><a href="#config-json"> <code>config.json</code></a></li>
          <li><a href="#cameraPoints-json"> <code>cameraPoints.json</code></a></li>
          <li><a href="#buttons-json"> <code>buttons.json</code></a></li>
          <li><a href="#decals-json"> <code>decals.json</code></a></li>
          <li><a href="#models-json"> <code>models.json</code></a></li>
          <li><a href="#topbar-json"> <code>topbar.json</code></a></li>
          
        </ul>
      </nav>

      <section id="config-json">
        <h2>config.json</h2>
        <p>Huvudkonfigurationsfilen för ett projekt. Den definierar projektinställningar och pekar på andra datafiler. Den specificerar:</p>
        <ul>
            <li>Vad projektet heter.</li>
            <li>Vilka datafiler som innehåller specifik information (modeller, kamerapunkter, etc.).</li>
            <li>Var man hittar projektspecifika grafiska tillgångar, som logotyper.</li>
        </ul>
        <CodeBlock language="json">{`{
  // =================================================================
  // GRUNDLÄGGANDE PROJEKTINFORMATION
  // =================================================================
  "projectName": "Exempelprojekt: Guldgruvan",
  "description": "En 3D-visualisering av Guldgruvans geologiska data, inklusive borrhål, seismik och markprover.",


  // =================================================================
  // STARTVY & DATAfiler
  // Pekar ut var plattformen hittar sin data.
  // =================================================================
  "initialCameraPoint": "startvy_total",
  "dataFiles": {
    "cameraPoints": "cameraPoints.json",
    "topbar": "topbar.json",
    "buttons": "buttons.json",
    "models": "models.json",
    "decals": "decals.json"
  },


  // =================================================================
  // GRAFISKA TILLGÅNGAR (ASSETS)
  // Projekt-specifika bilder och ikoner.
  // =================================================================
  "assets": {
    "logo": "assets/sprites/logo_guldgruvan.png",
    "pinIcon": "assets/sprites/pin_guldgruvan.png"
  },


  // =================================================================
  // KAMERAINSTÄLLNINGAR
  // Styr standardbeteendet för kameran i detta projekt.
  // =================================================================
  "cameraDefaults": {
    "enableCustomOrbitControl": true,
    "enableUnderground": true
  },


  // =================================================================
  // PRESTANDA & OPTIMERING
  // Finjustera prestandan för att passa projektets komplexitet.
  // =================================================================
  "performanceSettings": {
    "description": "Inställningar för att balansera visuell kvalitet och prestanda.",
   
    // Level of Detail (LOD)
    "enableLOD": true,
    "lodDistances": {
      "close": 50000,
      "medium": 200000,
      "far": 500000
    },


    // Specifika optimeringar
    "disableShadowsOnModels": ["drill_holes"],
    "preloadInitialAssets": true,


    // Debugging
    "enablePerformanceMonitoring": false
  }
}`}</CodeBlock>
      </section>

      <section id="cameraPoints-json">
        <h2>cameraPoints.json</h2>
        <p>Definierar kamerapunkter (platser och vyer) som användaren kan navigera till. Den kan:</p>
        <ul>
            <li>Sätta ID och namn för kamerapunkten, vilket används i användargränssnittet.</li>
            <li>Sätta koordinaterna och orienteringen för var och hur kameran riktas.</li>
            <li>Sätta specifika egenskaper för kamerapunkten, som att begränsa panorering och zoom.</li>
            <li>Hantera synlighet av entiteter med <code>showOnCameraEnter</code> och <code>hideOnCameraEnter</code>.</li>
        </ul>
        <CodeBlock language="json">{`[
  {
    "id": "example_point",
    "name": "Example Camera Point",

    "showOnCameraEnter": ["entity1", "entity2"],
    "hideOnCameraEnter": ["entity3", "entity4"],

    "canLook": true,
    "canPan": true,
    "canZoom": true,
    "canTilt": true,
    "allowUnderground": false,

    "underground": true,
    "autoRotate": true,

    "movementBounds": 5000,

    "orbitpoint": true,
    "orbitPoint": {
      "longitude": -66.797179,
      "latitude": -25.298339,
      "height": 4424,
      "distance": 11695
    },

    "showPin": true,
    "pinPosition": {
      "longitude": 13.410412,
      "latitude": 52.475318,
      "height": 87.8,
      "scale": 0.5,
      "pinName": "Custom Pin Name"
    }
  }
]`}</CodeBlock>
      </section>

      <section id="buttons-json">
        <h2>buttons.json</h2>
        <p>Tillhandahåller en enkel lösning för att skapa knappar och koppla funktionalitet till dem. Används ofta för UI-element som inte passar i topbar-menyn.</p>
        <CodeBlock language="json">{`[
  {
    "id": "detailed_geological_survey",
    "name": "Detaljerad geologisk undersökning",
    "description": "Visar geofysiska 3D-modeller och framhäver relevanta avvikelser. Kräver att huvudkartan är aktiv.",
    "type": "toggle",
    "icon": "fas fa-layer-group",
    "defaultState": false,
    "isEnabled": true,
    "isVisible": true,
    "devOnly": false,
    "actions": {
      "onActivate": {
        "showEntities": ["geophysics_model_3d", "anomaly_highlight_decal"],
        "hideEntities": ["simplified_geology_map"],
        "flyToPoint": "geophysics_overview_camera",
        "publishEvent": {
          "eventName": "analytics:feature_activated",
          "payload": { "feature": "geological_survey" }
        }
      },
      "onDeactivate": {
        "showEntities": ["simplified_geology_map"],
        "hideEntities": ["geophysics_model_3d", "anomaly_highlight_decal"]
      }
    },
    "dependencies": {
      "requiresActive": ["toggle_geology_map"]
    }
  }
]`}</CodeBlock>
      </section>

      <section id="decals-json">
        <h2>decals.json</h2>
        <p>Hanterar bilder och overlays som projiceras på terrängen. Filen ansvarar för att:</p>
        <ul>
            <li>Identifiera bilden med ett unikt ID och en sökväg (<code>imageUrl</code>).</li>
            <li>Bestämma exakt position och storlek på kartan.</li>
            <li>Styra grundläggande synlighet (om den ska visas från start).</li>
            <li>Erbjuda felsökningshjälpmedel som <code>showOutline</code>.</li>
        </ul>
        <CodeBlock language="json">{`[
  {
    "id": "san_juan_borders_highres",
    "type": "image_overlay",
    "name": "San Juan Borders (High Resolution)",
    "visible": true,

    "imageUrl": "./projects/mogotes/assets/decals/SanJuanBordersHighres65.png",

    "rectangle": {
        "west": -66.825746,
        "south": -25.324213,
        "east": -66.777746,
        "north": -25.288213
    },
    
    "centerPoint": {
      "longitude": -66.801746,
      "latitude": -25.306213,
      "height": 5
    },
    "width": 0.048,
    "height": 0.036,
   
    "showOutline": false,
    "showCenterPoint": false,
    "opacity": 0.8,

    "properties": {
      "data_source": "Geological Survey Institute",
      "resolution": "1m/pixel",
      "category": "Political Borders"
    }
  }
]`}</CodeBlock>
      </section>

      <section id="models-json">
        <h2>models.json</h2>
        <p>Definierar alla 3D-modeller som ska användas i projektet. Denna fil:</p>
        <ul>
            <li>Anger sökvägen till 3D-modellfilen (<code>modelUrl</code>).</li>
            <li>Definierar modellens exakta position, storlek och rotation.</li>
            <li>Styr om modellen ska vara synlig och interaktiv från start.</li>
            <li>Kan länka modellen till en separat metadatafil för ytterligare information.</li>
            <li>Innehåller ett flexibelt <code>properties</code>-objekt för anpassad logik, som att färglägga en modell baserat på ett visst värde.</li>
        </ul>
        <CodeBlock language="json">{`[
  {
    "id": "main_drillhole_set_2024",
    "type": "drillhole_collection",
    "name": "Huvudsakliga Borrhål (2024)",
   
    "modelUrl": "./projects/mogotes/assets/models/drill_holes_main.glb",
    "metadataUrl": "./projects/mogotes/assets/models/drill_holes_metadata.json",

    "position": {
      "longitude": -66.816,
      "latitude": -25.306,
      "height": 4200
    },
    "scale": { "x": 1.0, "y": 1.0, "z": 1.0 },
    "rotation": { "x": 0, "y": 0, "z": 90 },

    "visible": false,
    "interactive": true,
   
    "showOnCameraEnter": ["drillhole_overview_point"],
    "hideOnCameraEnter": ["regional_overview_point"],

    "properties": {
      "colorBy": "grade_ag",
      "showLabels": true,
      "minGradeToShow": 0.5,
      "labelType": "id_and_grade",
      "transparency": 0.8
    }
  }
]`}</CodeBlock>
      </section>

      <section id="topbar-json">
        <h2>topbar.json</h2>
        <p>Bygger upp den primära navigationsmenyn (top bar och sub-bar). Filen:</p>
        <ul>
            <li>Definierar en lista med huvudflikar (<code>tabs</code>).</li>
            <li>Organiserar knappar (<code>subButtons</code>) under varje flik.</li>
            <li>Kopplar knappar till handlingar, som att visa/dölja modeller och dekaler.</li>
            <li>Bestämmer knapparnas utseende, typ och startläge.</li>
            <li>Tillhandahåller användarvänlig text för knappar och tooltips.</li>
        </ul>
        <CodeBlock language="json">{`{
  "tabs": [
    {
      "id": "geology_maps",
      "name": "Geology",
      "description": "Geological maps and regional overlays.",
      "subButtons": [
        {
          "id": "toggle_san_juan_borders",
          "name": "San Juan Borders",
          "type": "toggle",
          "description": "Shows the political borders for the San Juan region.",
          "showOnActivate": ["san_juan_borders_highres"],
          "hideOnActivate": [],
          "defaultState": true
        }
      ]
    },
    {
      "id": "drilling_models",
      "name": "Drilling & Models",
      "description": "3D models of drillholes and geophysical data.",
      "subButtons": [
        {
          "id": "toggle_drillholes",
          "name": "3D Drillholes",
          "type": "toggle",
          "description": "Toggles the main drillhole set.",
          "showOnActivate": ["main_drillhole_set_2024"],
          "hideOnActivate": [],
          "defaultState": false
        }
      ]
    }
  ]
}`}</CodeBlock>
      </section>
    </div>
  );
};

export default JsonStructurePage; 