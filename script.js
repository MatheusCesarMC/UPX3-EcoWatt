// Botão que inicia a simulação
const botao = document.getElementById("btnSimular");

botao.addEventListener("click", fazerSimulacao);

function fazerSimulacao() {
    // Pegamos os valores informados pelo usuário
    const consumo = Number(document.getElementById("consumo").value);
    const area = Number(document.getElementById("area").value);
    const horasSol = Number(document.getElementById("cidade").value);
    const tarifa = Number(document.getElementById("tarifa").value);

    // Evita fazer o cálculo se os campos estiverem vazios ou inválidos
    if (consumo <= 0 || area <= 0 || tarifa <= 0) {
        alert("Preencha os campos corretamente para fazer a simulação.");
        return;
    }

    /*
        Cálculo simplificado para o protótipo:

        - Cada painel ocupa aproximadamente 2 m²
        - Cada painel possui aproximadamente 0,55 kWp
        - Consideramos uma eficiência geral de 80%
    */

    const quantidadePaineis = Math.floor(area / 2);

    if (quantidadePaineis < 1) {
        alert("A área informada é muito pequena para a simulação.");
        return;
    }

    const potenciaInstalada = quantidadePaineis * 0.55;

    // Estimativa de geração mensal em kWh
    const geracaoMensal = potenciaInstalada * horasSol * 30 * 0.8;

    // O percentual não passa de 100%
    const percentualAtendido = Math.min((geracaoMensal / consumo) * 100, 100);

    // Para a economia, consideramos apenas o que seria consumido pelo imóvel
    const energiaAproveitada = Math.min(geracaoMensal, consumo);
    const economiaMensal = energiaAproveitada * tarifa;

    // Estimativa simples do custo do sistema
    const custoSistema = potenciaInstalada * 4500;

    // Tempo aproximado de retorno em anos
    const economiaAnual = economiaMensal * 12;
    const retornoAnos = custoSistema / economiaAnual;

    // Mostramos os resultados na tela
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

    // Faz a parte de resultados aparecer
    document.getElementById("resultado").style.display = "block";
}
