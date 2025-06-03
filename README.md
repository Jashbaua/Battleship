<body>
  <h1>Battleship Game</h1>
  <p>
    This is a JavaScript implementation of the classic “Battleship” game. It follows a Test-Driven Development (TDD) approach using Jest for all core game logic. The goal was to separate game functionality from DOM manipulation, and then layer in a simple UI on top of the game engine.
  </p>

  <h2>Live Demo</h2>
  <img src="https://github.com/user-attachments/assets/a30527d3-2fb1-4c01-a22a-95ab677efa44" width="600"/>
  <p>
    Check out the live version of the game <a href="https://Jashbaua.github.io/Battleship/" target="_blank" rel="noopener">here</a>.
  </p>

  <h2>Overview</h2>
  <p>
    In this project, you’ll find three main modules (each implemented as a class or factory):
  </p>
  <ul>
    <li>
      <strong>Ship</strong>: Represents a single ship. Tracks its length, how many times it’s been hit, and whether it’s sunk. Public methods include <code>hit()</code> and <code>isSunk()</code>.
    </li>
    <li>
      <strong>Gameboard</strong>: Manages a 10×10 grid of coordinates. You can place ships at specific locations and record attacks. When an attack comes in, <code>receiveAttack()</code> will either register a hit on the correct ship or record a miss. It also reports when all ships have been sunk.
    </li>
    <li>
      <strong>Player</strong>: Each player (human or computer) owns a Gameboard. The computer player makes random—but legal—moves (it will never “shoot” the same spot twice). A human player clicks on an opponent’s grid to fire.
    </li>
  </ul>
  <p>
    After implementing and testing all game logic, a simple UI layer was added. It renders two 10×10 grids: one for the user’s ships and one for the computer’s ships. When you click on a square in the enemy’s grid, it sends an attack to their Gameboard, updates hits/misses, and rerenders both boards. Turns alternate until one side’s ships are all sunk.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Full TDD coverage for Ship, Gameboard, and Player logic (using Jest).</li>
    <li>Ships of varying lengths (carrier, battleship, cruiser, submarine, destroyer).</li>
    <li>Tracks hits and misses separately; displays them on the UI.</li>
    <li>Computer opponent that plays legal, random moves.</li>
    <li>Game-over detection when all ships of one side are sunk.</li>
    <li>Simple UI: click-to-attack, re-renders boards after each move.</li>
  </ul>

  <h2>Getting Started</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (v14 or newer)</li>
    <li>npm (v6 or newer)</li>
  </ul>

  <h3>Installation</h3>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/Jashbaua/Battleship.git
cd Battleship</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
  </ol>

  <h3>Running Tests</h3>
  <p>All core game logic is tested with Jest. To run the test suite:</p>
  <pre><code>npm test</code></pre>

  <h3>Launching the Game</h3>
  <p>
    Since this project separates logic from the DOM, no bundler is required—just open <code>index.html</code> in your browser. The HTML file includes <code>script</code> tags that pull in your compiled JavaScript files (via a simple <code>type="module"</code> import). To get a local server:
  </p>
  <ul>
    <li>Option 1: Open <code>index.html</code> directly in your browser (works in most modern browsers).</li>
    <li>Option 2: Run a simple HTTP server from the project root:
      <pre><code>npx http-server .</code></pre>
      Then navigate to <code>http://localhost:8080</code> (or whatever port <code>http-server</code> reports).
    </li>
  </ul>

  <h2>How to Play</h2>
  <ol>
    <li>Place your ships on the left grid (if manual placement is enabled). Otherwise, ships will be placed randomly.</li>
    <li>Your ships remain hidden from the opponent’s view.</li>
    <li>Click on a square in the right grid (opponent’s board) to launch an attack.</li>
    <li>Hits turn the square red; misses turn the square gray.</li>
    <li>After your move, the computer fires back. Its move is shown on your board.</li>
    <li>First player to sink all five of the opponent’s ships wins.</li>
  </ol>

  <h2>Implemented Improvements</h2>
  <ul>
    <li>Drag-and-drop placement of ships.</li>
    <li>Two-player “pass-and-play” mode with a screen that hides the boards when passing the device.</li>
    <li>Responsive design and improved CSS animations.</li>
  </ul>
</body>
