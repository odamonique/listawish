test("Item não pode ser comprado duas vezes", async () => {
    const item = {status: "comprado"};

    function podeComprar(item) {
        if (item.status === "comprado") {
            return false;
        }
        return true;
    }
    expect(podeComprar(item)).toBe(false);
});