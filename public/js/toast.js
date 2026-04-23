function toast(msg, actionText = null, actionCallback = null) {
    const el = document.createElement("div");

    el.style.position = "fixed";
    el.style.bottom = "20px";
    el.style.right = "20px";
    el.style.background = "#ffffff";
    el.style.backdropFilter = "blur(8px)";
    el.style.border = "1px solid #e5e5e5";
    el.style.color = "#111";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "8px";
    el.style.fontSize = "14px";
    el.style.zIndex = "9999";
    el.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
    el.style.display = "flex";
    el.style.gap = "10px";
    el.style.alignItems = "center";

    // texto
    const text = document.createElement("span");
    text.textContent = msg;
    el.appendChild(text);

    // botão de ação
    if (actionText && actionCallback) {
        const btn = document.createElement("button");

        btn.textContent = actionText;

        // 🔧 AQUI está a correção principal (contraste no estilo)
        btn.style.background = "#f3f4f6";   // antes era branco puro
        btn.style.color = "#111";
        btn.style.border = "1px solid #d1d5db";
        btn.style.padding = "5px 10px";
        btn.style.borderRadius = "6px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "13px";

        // hover simples
        btn.onmouseover = () => {
            btn.style.background = "#e5e7eb";
        };

        btn.onmouseout = () => {
            btn.style.background = "#f3f4f6";
        };

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