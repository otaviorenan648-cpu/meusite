document.addEventListener("DOMContentLoaded", function() {

    // --- Lógica de Simulação de Orçamento ---
    const tipoProjeto = document.getElementById("tipo-projeto");
    const adicionais = document.querySelectorAll(".adicional");
    const valorTotalSpan = document.getElementById("valor-total");
    const btnFecharOrcamento = document.getElementById("btn-fechar-orcamento");

    function calcularOrcamento() {
        let baseValue = parseFloat(tipoProjeto.value) || 0;
        let additionalValue = 0;

        // Soma os serviços adicionais marcados
        adicionais.forEach(function(checkbox) {
            if (checkbox.checked) {
                additionalValue += parseFloat(checkbox.value);
            }
        });

        let total = baseValue + additionalValue;

        // Formata o valor final para Real Brasileiro (BRL)
        valorTotalSpan.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Escuta mudanças nos inputs de orçamento
    tipoProjeto.addEventListener("change", calcularOrcamento);
    adicionais.forEach(function(checkbox) {
        checkbox.addEventListener("change", calcularOrcamento);
    });

    btnFecharOrcamento.addEventListener("click", function() {
        const totalFinal = valorTotalSpan.textContent;
        if (tipoProjeto.value === "0") {
            alert("Por favor, selecione ao menos uma categoria de projeto!");
        } else {
            alert(`Obrigado pelo interesse! Seu pré-orçamento foi calculado em ${totalFinal}. Nossa equipe entrará em contato para alinhar os detalhes finais.`);
        }
    });

    // --- Envio Simulado do Formulário de Contato ---
    const formContato = document.querySelector(".contact-form");
    if (formContato) {
        formContato.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Mensagem enviada com sucesso! Responderemos em até 24 horas úteis.");
            formContato.reset();
        });
    }

    // --- Scroll Ativo na Navigation Bar ---
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    });

});