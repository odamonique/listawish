const bcrypt = require("bcrypt");

test("Senha deve ser armazenada como hash", async () => {
    const senha = "1234567";
    const hash = await bcrypt.hash(senha, 10);

    expect(hash).not.toBe(senha);
    const match = await bcrypt.compare(senha, hash);
    expect(match).toBe(true);
});

test("Login deve falhar com senha incorreta", async () => {
    const senha = "1234567";
    const hash = await bcrypt.hash(senha, 10);

    const senhaErrada = "0000000";
    const match = await bcrypt.compare(senhaErrada, hash);
    expect(match).toBe(false);
});