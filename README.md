# 🚀 **Monoliths** - Interactive 3D Portfolio

## An immersive portfolio experience

**Monoliths** transforms my project portfolio into a 3D game environment, allowing visitors to explore and interact with my achievements in a unique and memorable way.

[https://georgibdev.github.io/Portfolio/]

---

## 🎮 How It Works

This portfolio utilizes **react-three-fiber** to render a 3D scene directly in the browser. The player (represented by an avatar) navigates a stylized map where each **isometric structure** (a "Monolith" or "Portal") represents one of my projects.

### **Navigation**

|            Key            |                  Action                   |
| :-----------------------: | :---------------------------------------: |
| **W A S D** or **Arrows** | Movement (Forward, Left, Backward, Right) |
|         **Space**         |                   Jump                    |

### **Exploration**

1.  **Navigate** to a Monolith/Portal.
2.  **Approach** the portal.
3.  The portal will open, revealing the **details of the associated project**.

---

## ✨ Key Features

- **Immersive Aesthetic:** Design inspired by geometric architecture games, featuring dynamic lighting and a _synthwave_-style celestial environment.
- **Physics-Based Navigation:** Movement logic (jump, gravity, collision) implemented directly in React using Hooks and **THREE.js** logic (without a complex 3D physics library, for a minimal footprint).
- **Modular Structure:** Projects are injected from the `projects.js` file, allowing for easy scalability of the portfolio.
- **Custom Loader:** A stylized 3D loader that keeps the user engaged during the initial scene loading.
- **Dynamic Camera:** The camera follows the player, providing a dynamic _third-person_ perspective.

---

## 🛠 Technologies Used

- **React:** The main UI library.
- **React Three Fiber (`@react-three/fiber`):** The library for rendering and managing THREE.js scenes within React.
- **Drei (`@react-three/drei`):** A collection of useful helpers and abstractions for `R3F`.
- **THREE.js:** The underlying 3D graphics engine.
- **Tailwind CSS:** For fast and efficient styling of 2D UI components.
- **JavaScript/TypeScript:** Game logic (collisions, movement, interactions) implemented using React Hooks.

---

## ⚙️ Installation and Local Setup

To run this portfolio on your local machine:

1.  **Clone the Repository:**

    ```bash
    git clone
    cd monoliths-portfolio
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the Application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will be available at `https://georgibdev.github.io/Portfolio/`.

---

## 📝 Code Structure

- **`GameWorld.tsx`:** Handles player state, movement logic, and renders the core 3D scene.
- **`Player.tsx`:** The 3D player model.
- **`ProjectPortal.tsx`:** Renders the 3D structures for each project.
- **`CanvasLoader.tsx`:** The stylized loading component.
- **`data/projects.ts`:** Defines the positions and details of each portfolio project.
- **`data/colliders.ts`:** (If used) Defines static collision structures.

---

## 👤 Contact

This project serves as my personal portfolio.

- [georgianabaldev@gmail.com]
- [https://www.linkedin.com/in/georgiana-balea-533b34192/]
