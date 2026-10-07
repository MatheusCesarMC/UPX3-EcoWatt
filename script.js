const botao = document.getElementById("btnSimular");

botao.addEventListener("click", fazerSimulacao);

function fazerSimulacao() {
    const consumo = Number(document.getElementById("consumo").value);
    const area = Number(document.getElementById("area").value);
    const horasSol = Number(document.getElementById("cidade").value);
    const tarifa = Number(document.getElementById("tarifa").value);

    if (consumo <= 0 || area <= 0 || tarifa <= 0) {
        alert("Preencha os campos corretamente para fazer a simulação.");
        return;
    }

    const quantidadePaineis = Math.floor(area / 2);

    if (quantidadePaineis < 1) {
        alert("A área informada é muito pequena para a simulação.");
        return;
    }

    const potenciaInstalada = quantidadePaineis * 0.55;

    const geracaoMensal =
        potenciaInstalada * horasSol * 30 * 0.8;

    const percentualAtendido = Math.min(
        (geracaoMensal / consumo) * 100,
        100
    );

    const energiaAproveitada = Math.min(
        geracaoMensal,
        consumo
    );

    const consumoRestante = Math.max(
        consumo - geracaoMensal,
        0
    );

    const economiaMensal =
        energiaAproveitada * tarifa;

    const economiaAnual =
        economiaMensal * 12;

    const custoSistema =
        potenciaInstalada * 4500;

    const retornoAnos =
        custoSistema / economiaAnual;

    document.getElementById("paineis").textContent =
        quantidadePaineis + " painéis";

    document.getElementById("potencia").textContent =
        potenciaInstalada.toFixed(2) + " kWp";

    document.getElementById("geracao").textContent =
        geracaoMensal.toFixed(0) + " kWh/mês";

    document.getElementById("percentual").textContent =
        percentualAtendido.toFixed(1) + "%";

    document.getElementById("economia").textContent =
        economiaMensal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) + "/mês";

    document.getElementById("economiaAnual").textContent =
        economiaAnual.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) + "/ano";

    document.getElementById("restante").textContent =
        consumoRestante.toFixed(0) + " kWh/mês";

    document.getElementById("retorno").textContent =
        retornoAnos.toFixed(1) + " anos";

    document.getElementById("consumoAtual").textContent =
        consumo.toFixed(0) + " kWh/mês";

    document.getElementById("energiaGerada").textContent =
        geracaoMensal.toFixed(0) + " kWh/mês";

    document.getElementById("resultado").style.display = "block";
}