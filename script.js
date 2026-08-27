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

    /*
        Valores usados na simulação:
        - Cada painel ocupa aproximadamente 2 m²
        - Cada painel possui aproximadamente 0,55 kWp
        - Eficiência geral considerada: 80%
    */

    const quantidadePaineis = Math.floor(area / 2);

    if (quantidadePaineis < 1) {
        alert("A área informada é muito pequena para a simulação.");
        return;
    }

    const potenciaInstalada = quantidadePaineis * 0.55;
    const geracaoMensal = potenciaInstalada * horasSol * 30 * 0.8;

    const percentualAtendido = Math.min(
        (geracaoMensal / consumo) * 100,
        100
    );

    const energiaAproveitada = Math.min(geracaoMensal, consumo);
    const economiaMensal = energiaAproveitada * tarifa;

    const custoSistema = potenciaInstalada * 4500;
    const economiaAnual = economiaMensal * 12;
    const retornoAnos = custoSistema / economiaAnual;

    document.getElementById("geracao").textContent =
        geracaoMensal.toFixed(0) + " kWh/mês";

    document.getElementById("percentual").textContent =
        percentualAtendido.toFixed(1) + "%";

    document.getElementById("economia").textContent =
        economiaMensal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) + "/mês";

    document.getElementById("retorno").textContent =
        retornoAnos.toFixed(1) + " anos";

    document.getElementById("resultado").style.display = "block";
}
