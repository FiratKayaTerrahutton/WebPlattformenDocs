import React from 'react';

const KnownBugsPage = () => (
  <>
    <h1>Known Bugs and TODO</h1>
    
    <h2>Known Bugs</h2>
    <p>Här är en lista över kända buggar som vi arbetar på att fixa.</p>
    <ul>
      <li><strong>Synkroniseringsfel:</strong> Ibland kan datalagerstatus (visad/dold) inte synkroniseras korrekt mellan huvudmenyn och 3D-vyn. Funkar vid vissa builds, funkar ej på andra, vetee fan varför. FIXIAT FIXATTTTT</li>
      <li><strong>Läckande kamerakontroller:</strong> Kamerainställningar från en kamerapunkt (t.ex. en med <code>"onlyFirstPerson": true</code>) "läcker" till nästa kamerapunkt och skriver över dess inställningar. Detta orsakar oväntat kamerabeteende eftersom kamerakontrollerna inte återställs korrekt mellan vyer.</li>
      <p>i set     "canLook": false, in the camerapoint where     "onlyFirstPerson": true is true, and it shows as canlook is true even tho its suposed to be false, after i leave the camerapoint is that why the camera acts different after i pass that camerapoint, make it seperate, make it correct and make it functional like it suposed to and not leak weird movement on camerapoints its not suposed to be in. can look is suposed to be false and the implementation is suposeed to go through onlyfirstperson.Perhaps the onlyfirstperson bool made it true again and if thats the case i want you to have a thing where can look have that movement enabled only when onlyfirstperson is true and goes back to its standard movement look when onlyfirstperson is false, have like a if canlook is true and onlyfirstperson is true then and only then it should have the shift leftclickdrag movement pattern thingy, deepreaseracrh the codebase and find everywhere where its used. I basically main orbit movement logic so dont ruin that and fix my issue."</p>
      <li><strong>Strömmar:</strong> Har inte hittat en lösning till seperationen av children till sina kordinater till 1 glb file ännu.</li>
      <li><strong>Screenshots:</strong> när man ritar över skärmen och tar bild så fångar den inte upp det som är ritat över skärmen, det ska fångas upp och sparas som en bild. Enkel fix tror jag med z indexes layer sorting, men jag har inte testat det ännu.</li>
    </ul>
    
    <h2>TODO List</h2>
    <p>Detta är vår att-göra-lista för framtida funktioner och förbättringar.</p>
    <ul>
      <li><strong>Optimera texturer:</strong> Komprimera och optimera texturer för snabbare laddningstider.</li>
      <li><strong>Utöka dokumentationen:</strong> Lägga till fler exempel och en mer detaljerad förklaring överallt kanske vete fan.</li>
      <li><strong>UV-map för borrhål:</strong> Lägga till texturkoordinater (UV mapping) för borrhålsmodellerna. med auto switching based on value option.</li>
      <li><strong>borrhål:</strong> Har inte hittat en lösning till seperationen av children till sina kordinater till 1 glb file ännu.</li>
    </ul>
  </>
);

export default KnownBugsPage; 