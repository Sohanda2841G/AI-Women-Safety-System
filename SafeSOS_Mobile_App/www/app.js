const app = document.getElementById("app");
const state = {
    role: null,
    page: "home",
    emergency: false,
    status: "ACTIVE",
    responder: "Searching...",
    battery: "42%",
    location: "Available",
    network:
        navigator.onLine
            ? "Connected"
            : "Offline"
};

function showLogin() {
    app.innerHTML = `
        <div class="login">
            <div class="loginbox">
                <div class="loginlogo">
                    🛡 <span>Safe</span>SOS
                </div>
                <p class="muted">
                    Emergency safety & responder coordination
                </p>
                <h3>LOGIN</h3>
                <div class="roles">
                    <button
                        id="userRole"
                        class="role selected"
                        onclick="selectRole('user')">
                        👤
                        <b>
                            USER
                        </b>
                        <small class="muted">
                            Safety & emergency help
                        </small>
                    </button>
                    <button
                        id="responderRole"
                        class="role"
                        onclick="selectRole('responder')">
                        🚑
                        <b>
                            RESPONDER
                        </b>
                        <small class="muted">
                            Authority case dashboard
                        </small>
                    </button>
                </div>
                <button
                    class="continue"
                    onclick="enterApp()">
                    Continue →
                </button>
            </div>
        </div>
    `;
    state.role = "user";
}

function selectRole(role) {
    state.role = role;
    document
        .getElementById("userRole")
        .classList
        .toggle(
            "selected",
            role === "user"
        );
    document
        .getElementById("responderRole")
        .classList
        .toggle(
            "selected",
            role === "responder"
        );
}

function enterApp() {
    state.page = "home";
    render();
}

function nav(page) {
    state.page = page;
    closeMenu();
    render();
}

function logout() {
    state.role = null;
    state.emergency = false;
    closeMenu();
    showLogin();
}

function toggleMenu() {
    const menu =
        document.getElementById("mobileMenu");
    if (!menu) return;
    menu.classList.toggle("show");
}

function closeMenu() {
    const menu =
        document.getElementById("mobileMenu");
    if (!menu) return;
    menu.classList.remove("show");
}

function shell(content) {
    let menuItems = "";
    if (state.role === "user") {
        menuItems = `
            <button
                onclick="nav('home')">
                🏠 Home
            </button>
            <button
                onclick="nav('safety')">
                🛡️ Safety
            </button>
            <button
                onclick="nav('history')">
                📋 History
            </button>
            <button
                onclick="nav('profile')">
                👤 Profile
            </button>
        `;
    }

    else {
        menuItems = `
            <button
                onclick="nav('home')">
                🗺️ Map
            </button>
            <button
                onclick="nav('cases')">
                📋 Cases
            </button>
            <button
                onclick="nav('profile')">
                👤 Profile
            </button>
        `;
    }
    return `
        <div class="top">
            <div class="logo">
                🛡 <span>Safe</span>SOS
            </div>
            <div class="top-right">
                <div class="account">
                    ${
                        state.role === "user"
                            ? "User"
                            : "Responder"
                    }
                    <div class="avatar">
                        ${
                            state.role === "user"
                                ? "U"
                                : "R"
                        }
                    </div>
                </div>
                <!-- THREE DOT -->
                <button
                    class="menu-button"
                    onclick="toggleMenu()">
                    ⋮
                </button>
                <!-- MENU -->
                <div
                    id="mobileMenu"
                    class="mobile-menu">
                    ${menuItems}
                    <button
                        onclick="logout()">
                        ↪ Logout
                    </button>
                </div>
            </div>
        </div>
        <div class="layout">
            <!-- Desktop sidebar -->
            <aside class="side">
                ${
                    state.role === "user"
                        ? `

                            <button
                                class="nav ${
                                    state.page === "home"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('home')">
                                🏠 Home
                            </button>
                            <button
                                class="nav ${
                                    state.page === "safety"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('safety')">
                                🛡️ Safety
                            </button>
                            <button
                                class="nav ${
                                    state.page === "history"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('history')">
                                📋 History
                            </button>
                            <button
                                class="nav ${
                                    state.page === "profile"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('profile')">
                                👤 Profile
                            </button>
                        `
                        : `
                            <button
                                class="nav ${
                                    state.page === "home"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('home')">
                                🗺️ Map
                            </button>
                            <button
                                class="nav ${
                                    state.page === "cases"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('cases')">
                                📋 Cases
                            </button>
                            <button
                                class="nav ${
                                    state.page === "profile"
                                        ? "active"
                                        : ""
                                }"
                                onclick="nav('profile')">
                                👤 Profile
                            </button>
                        `
                }

                <button
                    class="nav logout"
                    onclick="logout()">
                    ↪ Logout
                </button>
            </aside>
            <main class="main">
                ${content}
            </main>
        </div>
    `;
}

function userHome() {
    if (state.emergency) {
        return emergencyScreen();
    }

    return `
        <div class="head">
            <div>
                <h1>
                    Welcome back
                </h1>
                <p class="muted">
                    Your personal safety dashboard
                </p>
            </div>
            <span class="safe">
                SAFE
            </span>
        </div>
        <div class="grid">
            <!-- SYSTEM STATUS -->
            <div class="card">
                <h3>
                    System Status
                </h3>
                <div class="status">
                    Location
                    <b class="green">
                        ${state.location}

                    </b>
                </div>
                <div class="status">
                    Network
                    <b class="${
                        state.network === "Connected"
                            ? "green"
                            : "danger-text"
                    }">
                        ${state.network}
                    </b>
                </div>
            </div>
            <!-- DEVICE -->
            <div class="card">
                <h3>
                    Device
                </h3>
                <div class="status">
                    Battery
                    <b>
                        ${state.battery}
                    </b>
                </div>
                <div class="status">
                    Safety Mode
                    <b class="green">
                        ON
                    </b>
                </div>
            </div>
            <!-- SOS -->
            <div class="card sos-wrap span2">
                <h2>
                    Need immediate help?
                </h2>
                <p class="muted">
                    Press and hold for 1.5 seconds
                    to activate SOS.
                </p>
                <div
                    class="sos"
                    id="sosButton">
                    <div class="icon">
                        🚨
                    </div>
                    <b>
                        SOS
                    </b>
                    <small>
                        HOLD TO ACTIVATE
                    </small>
                </div>
                <div class="quick">
                    <button
                        class="secondary"
                        onclick="nav('safety')">
                        🛡️ Safety Monitor
                    </button>
                    <button
                        class="secondary"
                        onclick="nav('history')">
                        📋 History
                    </button>
                </div>
            </div>
            <!-- QUICK SETTINGS -->
            <div class="card">
                <h3>
                    Quick Settings
                </h3>
                <div class="status">
                    Location sharing
                    <b>
                        ON
                    </b>
                </div>
                <div class="status">
                    Audio evidence
                    <b>
                        ON
                    </b>
                </div>
                <div class="status">
                    Video evidence
                    <b>
                        ON
                    </b>
                </div>
            </div>
        </div>
    `;
}

function emergencyScreen() {
    return `
        <div class="head">
            <div>
                <h1>
                    EMERGENCY ACTIVE
                </h1>
                <p class="muted">
                    Emergency response
                    is being coordinated.
                </p>
            </div>
            <span class="safe high-risk">
                HIGH RISK
            </span>
        </div>
        <div class="grid">
            <div class="card emergency span2">
                <h2>
                    Emergency services
                </h2>
                <div class="checks">
                    <div class="check">
                        <b>
                            Location sharing
                        </b>
                        <br>
                        <span class="green">
                            ACTIVE
                        </span>
                    </div>
                    <div class="check">
                        <b>
                            Server connection
                        </b>
                        <br>
                        <span class="green">
                            ACTIVE
                        </span>
                    </div>
                    <div class="check">
                        <b>
                            Audio evidence
                        </b>
                        <br>
                        <span class="green">
                            ACTIVE
                        </span>
                    </div>
                    <div class="check">
                        <b>
                            Video evidence
                        </b>
                        <br>
                        <span class="green">
                            ACTIVE
                        </span>
                    </div>
                </div>
                <p>
                    Emergency contacts:
                    <b>
                        Notified
                    </b>
                </p>
                <p>
                    Responder:
                    <b>
                        ${state.responder}
                    </b>
                </p>
                <button
                    class="danger"
                    onclick="cancelSOS()">
                    CANCEL EMERGENCY
                </button>
            </div>
            <div class="card">
                <h3>
                    Emergency details
                </h3>
                <div class="status">
                    SOS
                    <b>
                        #1042
                    </b>
                </div>
                <div class="status">
                    Status
                    <b>
                        ${state.status}
                    </b>
                </div>
                <div class="status">
                    Battery
                    <b>
                        ${state.battery}
                    </b>
                </div>
                <div class="status">
                    Network
                    <b>
                        ${state.network}
                    </b>
                </div>
            </div>
            <div class="card span2">
                <h3>
                    Live location
                </h3>
                <div class="map">
                    <div class="pin">
                        📍
                    </div>
                </div>
            </div>
        </div>
    `;
}

function caseCard() {
    return `
        <div class="case">
            <div class="casehead">
                <b>
                    SOS #1042
                </b>
                <span class="risk">
                    RISK: HIGH
                </span>
            </div>
            <hr>
            <p>
                <b>Status:</b>
                ${state.status}
            </p>
            <p>
                <b>Trigger:</b>
                MANUAL + FALL
            </p>
            <p>
                Live location
                &nbsp;·&nbsp;
                Battery:
                ${state.battery}
                &nbsp;·&nbsp;
                Network:
                ${state.network}
            </p>
            <p>
                <b>
                    AI Signals:
                </b>
                <br>
                Abnormal movement
                <br>
                ✓ Fall detected
                <br>
                Distress audio flag
            </p>
            <div class="actions">
                <button
                    class="accept"
                    onclick="acceptCase()">
                    ACCEPT CASE
                </button>
                <button
                    class="respond"
                    onclick="markResponding()">
                    MARK RESPONDING
                </button
            </div>

        </div>
    `;
}

function responderHome() {
    return `
        <div class="head">
            <div>
                <h1>
                    Responder Command Center
                </h1>
                <p class="muted">
                    Monitor active emergencies
                    and dispatch response.
                </p>
            </div>
            <span class="safe">
                ● ONLINE
            </span>
        </div>
        <div class="grid">
            <div class="card">
                <h3>
                    Active cases
                </h3>
                <strong
                    style="
                        font-size:38px;
                        color:#d72e2e;
                    ">
                    1
                </strong>
                <p class="muted">
                    High-risk emergency
                </p>
            </div>
            <div class="card">
                <h3>
                    Current status
                </h3>
                <div class="status">
                    Case
                    <b>
                        #1042
                    </b>
                </div>
                <div class="status">
                    Status
                    <b>
                        ${state.status}
                    </b>
                </div>
            </div>
            <div class="card">
                <h3>
                    System
                </h3>
                <div class="status">
                    Network
                    <b class="green">

                        ${state.network}
                    </b>
                </div>
                <div class="status">
                    Server
                    <b class="green">
                        Active
                    </b>
                </div>
            </div>
            <div class="card span2">
                <h3>
                    Priority Case
                </h3>
                ${caseCard()}

            </div>
            <div class="card span2">
                <h3>
                    Incident Map
                </h3>
                <div class="map">
                    <div class="pin">
                        📍
                    </div>
                </div>
            </div>
        </div>
    `;
}

function safetyPage() {
    return `
        <div class="head">
            <div>
                <h1>
                    Safety Monitor
                </h1>
                <p class="muted">
                    Protection services are running.
                </p>
            </div>
        </div>
        <div class="grid">
            <div class="card">
                <h3>
                    🛡️ Safety Mode
                </h3>
                <p>
                    Automatic protection is
                    <b>
                        ON
                    </b>.
                </p>
            </div>
            <div class="card">
                <h3>
                    📍 Location
                </h3>
                <p>
                    Sharing is
                    <b>
                        ACTIVE
                    </b>.
                </p>
            </div>
            <div class="card">
                <h3>
                     Evidence
                </h3>
                <p>
                    Audio/video evidence is
                    <b>
                        READY
                    </b>.
                </p>
            </div>
        </div>
    `;
}

function historyPage() {
    return `
        <div class="head">
            <div>
                <h1>
                    Emergency History
                </h1>
                <p class="muted">
                    Previous safety events
                </p>
            </div>
        </div>
        <div class="card">
            <div class="status">
                <b>
                    SOS #1038
                </b>
                <span>
                    Manual · Medium · Resolved
                </span>
            </div>
            <div class="status">
                <b>
                    SOS #1021
                </b>
                <span>
                    Fall · High · Resolved
                </span>
            </div>
        </div>
    `;
}

function profilePage() {
    const role =
        state.role === "user"
            ? "User"
            : "Responder";

    return `
        <div class="head">
            <div>
                <h1>
                    Profile
                </h1>
                <p class="muted">
                    Account information
                </p>
            </div>
        </div>
        <div class="card">
            <h3>
                ${role}
            </h3>
            <div class="status">
                Role
                <b>
                    ${role}
                </b>
            </div>
            <div class="status">
                Account
                <b class="green">
                    Verified
                </b>
            </div>
            <div class="status">
                Notifications
                <b>
                    Enabled
                </b>
            </div>
        </div>
    `;
}

function casesPage() {
    return `
        <div class="head">
            <div>
                <h1>
                    Emergency Cases
                </h1>
                <p class="muted">
                    Review and respond to SOS alerts.
                </p>
            </div>
        </div>
        <div class="card">
            ${caseCard()}
        </div>
    `;
}

function setupSOS() {
    const button =
        document.getElementById("sosButton");
    if (!button) return;
    let timer;
    function start(event) {
        if (event) {
            event.preventDefault();
        }

        button.classList.add("pressing");
        timer =
            setTimeout(
                activateSOS,
                1500
            );
    }

    function stop() {
        clearTimeout(timer);
        button.classList.remove("pressing");
    }

    button.addEventListener(
        "mousedown",
        start
    );

    button.addEventListener(
        "mouseup",
        stop
    );

    button.addEventListener(
        "mouseleave",
        stop
    );

    button.addEventListener(
        "touchstart",
        start,
        {
            passive: false
        }
    );

    button.addEventListener(
        "touchend",
        stop
    );

    button.addEventListener(
        "touchcancel",
        stop
    );
}

function activateSOS() {
    state.emergency = true;
    state.status = "ACTIVE";
    state.responder = "Searching...";
    toast(
        "🚨 SOS activated"
    );

    render();
    setTimeout(
        function() {
            if (state.emergency) {
                state.responder =
                    "Responder found";

                render();
            }
        },
        1200
    );
}

function cancelSOS() {
    if (
        confirm(
            "Cancel this emergency?"
        )
    ) {
        state.emergency = false;
        state.status = "CANCELLED";
        toast(
            "Emergency cancelled"
        );
        render();
    }
}

function acceptCase() {
    state.status = "ACCEPTED";
    toast(
        "Case #1042 accepted"
    );
    render();
}

function markResponding() {
    state.status =
        "RESPONDING";
    toast(
        "Responder is responding to #1042"
    );
    render();
}

function toast(message) {
    const element =
        document.createElement("div");
    element.className =
        "toast";
    element.textContent =
        message;
    document.body.appendChild(
        element
    );

    setTimeout(
        function() {
            element.remove();
        },
        2200
    );
}

window.addEventListener(
    "online",
    function() {
        state.network =
            "Connected";
        if (state.role) {
            render();
        }
    }
);

window.addEventListener(
    "offline",
    function() {
        state.network =
            "Offline";
        if (state.role) {
            render();
        }
    }
);

async function refreshBattery() {
    try {
        if (
            navigator.getBattery
        ) {
            const battery =
                await navigator.getBattery();
            state.battery =
                Math.round(
                    battery.level * 100
                ) + "%";

            battery.addEventListener(
                "levelchange",
                function() {
                    state.battery =
                        Math.round(
                            battery.level * 100
                        ) + "%";
                    if (state.role) {
                        render();
                    }
                }
            );
        }
    } catch (error) {
        console.log(
            "Battery information unavailable"
        );
    }
}

function render() {
    if (!state.role) {
        showLogin();
        return;
    }

    let content;
    if (
        state.role === "user"
    ) {
        if (
            state.page === "home"
        ) {
            content =
                userHome();
        }

        else if (
            state.page === "safety"
        ) {
            content =
                safetyPage();
        }

        else if (
            state.page === "history"
        ) {
            content =
                historyPage();
        }
        else {
            content =
                profilePage();
        }
    }

    else {
        if (
            state.page === "home"
        ) {
            content =
                responderHome();
        }
        else if (
            state.page === "cases"
        ) {
            content =
                casesPage();
        }
        else {
            content =
                profilePage();
        }
    }
    app.innerHTML =
        shell(content);
    if (
        state.role === "user" &&
        state.page === "home" &&
        !state.emergency
    ) {
        setupSOS();
    }
}
render();
refreshBattery();