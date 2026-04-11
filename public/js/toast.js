function toast(msg, actionText = null, actionCallback = null) {
    const el = document.createElement("div");

    el.textContent = msg;

    el.style.position = "fixed";
    el.style.bottom = "20px";
    el.style.right = "20px";
    el.style.background = "rgba(0,0,0,0.85)";
    el.style.color = "#fff";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "6px";
    el.style.fontSize = "14px";
    el.style.zIndex = "9999";
    el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    el.style.display = "flex";
    el.style.gap = "10px";
    el.style.alignItems = "center";

    const text = document.createElement("span");
    text.textContent = msg;

    el.innerHTML = "";
    el.appendChild(text);

    if (actionText && actionCallback) {
        const btn = document.createElement("button");

        btn.textContent = actionText;
        btn.style.background = "#fff";
        btn.style.color = "#000";
        btn.style.border = "none";
        btn.style.padding = "5px 8px";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";

        btn.onclick = () => {
            actionCallback();
            el.remove();
        };

        el.appendChild(btn);
    }

    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 5000);
}