// ==============================
// Glass Portfolio Interactive JS
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".glass-card");
    const links = document.querySelectorAll(".social-link");
    const profileImg = document.querySelector(".profile-image");

    // ---------- Entrance animation ----------
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
        card.style.transition = "all 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 100);

    // ---------- Profile glow animation ----------
    let glow = false;
    setInterval(() => {
        glow = !glow;
        profileImg.style.boxShadow = glow
            ? "0 0 25px rgba(147,51,234,0.8)"
            : "0 0 10px rgba(147,51,234,0.4)";
    }, 1200);

    // ---------- Ripple + Tap animation ----------
    links.forEach(link => {
        link.addEventListener("click", e => {
            // Mobile tap scale
            link.style.transform = "scale(0.96)";
            setTimeout(() => link.style.transform = "", 150);

            // Ripple
            const ripple = document.createElement("span");
            ripple.className = "ripple";

            const rect = link.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            link.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ---------- Theme switcher ----------
    const themes = [
        {
            name: "purple",
            glow: "rgba(147,51,234,0.8)",
            border: "rgba(147,51,234,0.4)"
        },
        {
            name: "cyan",
            glow: "rgba(34,211,238,0.8)",
            border: "rgba(34,211,238,0.4)"
        },
        {
            name: "red",
            glow: "rgba(239,68,68,0.8)",
            border: "rgba(239,68,68,0.4)"
        }
    ];

    let currentTheme = 0;

    // Double click profile image to change theme
    profileImg.addEventListener("dblclick", () => {
        currentTheme = (currentTheme + 1) % themes.length;
        const theme = themes[currentTheme];

        document.documentElement.style.setProperty(
            "--accent-glow",
            theme.glow
        );
        document.documentElement.style.setProperty(
            "--accent-border",
            theme.border
        );

        profileImg.style.boxShadow = `0 0 30px ${theme.glow}`;
    });
});

// ---------- Injected CSS ----------
const style = document.createElement("style");
style.innerHTML = `
:root {
    --accent-glow: rgba(147,51,234,0.8);
    --accent-border: rgba(147,51,234,0.4);
}

.profile-image {
    transition: box-shadow 0.4s ease;
}

.social-link {
    border: 1px solid var(--accent-border) !important;
}

.social-link:hover {
    box-shadow: 0 8px 20px var(--accent-glow) !important;
}

.ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255,255,255,0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(1);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(12);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
