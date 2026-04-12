test("deve gerar link público da lista", () => {
    function gerarLink(token) {
        return `https://site.com/lista-publica.html?token=${token}`;
    }

    const link = gerarLink("abc123");

    expect(link).toContain("token=abc123");
});