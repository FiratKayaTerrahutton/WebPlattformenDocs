const IntroductionPage = () => (
  <>
    <h1>Introduction to Three.js</h1>
    <p>Three.js is a powerful 3D library that helps you create and display animated 3D computer graphics in a web browser. It uses WebGL under the hood, but you don't need to know WebGL to use Three.js.</p>

    <h2>Installation</h2>
    <p>To start using Three.js in a React project, you'll want to install <code>@react-three/fiber</code> and <code>@react-three/drei</code>, which provide helpful abstractions and components.</p>

    <h2>Getting Started</h2>
    <p>Three.js is a cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL. This is a very long paragraph that should now wrap properly and expand to multiple lines as needed, pushing other content down naturally without any height restrictions. The text should flow normally like in any standard document or webpage, allowing paragraphs to be as tall as they need to be to contain all their content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    <h3>Basic Scene Setup</h3>
    <p>Creating a basic scene involves a few key components: a Scene, a Camera, a Renderer, and one or more Meshes (objects).</p>

    <h3>Lights and Shadows</h3>
    <p>To make your scene look realistic, you'll need to add lights. Different types of lights, like <code>AmbientLight</code> and <code>DirectionalLight</code>, can be used to achieve various effects. Enabling shadows can add another layer of depth.</p>

    <h3>Loading Models</h3>
    <p>You can load 3D models in various formats, such as <code>.glb</code> or <code>.gltf</code>. The <code>@react-three/drei</code> library provides the <code>useGLTF</code> hook to make this process simple and declarative.</p>

    <h2>Core Concepts</h2>

    <h3>Geometries</h3>
    <p>Geometries are the shapes of your 3D objects. Three.js provides a wide range of built-in geometries, like <code>BoxGeometry</code>, <code>SphereGeometry</code>, and <code>TorusKnotGeometry</code>.</p>

    <h3>Materials</h3>
    <p>Materials define the appearance of your objects. You can use simple materials like <code>MeshBasicMaterial</code> for flat colors or more advanced ones like <code>MeshStandardMaterial</code> or <code>MeshPhysicalMaterial</code> for realistic surfaces that react to light.</p>

    <h3>Textures</h3>
    <p>Textures are images that you can wrap around your geometries to add detail and realism. You can load textures for color, roughness, metalness, and other properties to create complex surfaces.</p>
  </>
)

export default IntroductionPage; 