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

    // --- Envio do Formulário de Contato via e-mail ---
    const formContato = document.getElementById("form-contato");
    if (formContato) {
        formContato.addEventListener("submit", function(event) {
            event.preventDefault();

            const nomeContato = document.getElementById("contato-nome").value.trim();
            const emailContato = document.getElementById("contato-email").value.trim();
            const mensagemContato = document.getElementById("contato-mensagem").value.trim();

            const subject = "Nova mensagem pelo formulário de contato - Durand Tech";
            const body = `Nome: ${nomeContato}\nE-mail: ${emailContato}\n\nMensagem:\n${mensagemContato}`;
            const mailtoLink = `mailto:durandtechsysten@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
        });
    }

    // --- Envio do Formulário de Orçamento via e-mail ---
    const form = document.getElementById("form-orcamento");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const email = document.getElementById("email").value.trim();
            const tipo = document.getElementById("tipo-projeto").value;
            const descricao = document.getElementById("descricao").value.trim();
            const totalFinal = valorTotalSpan.textContent;

            if (tipo === "0") {
                alert("Por favor, selecione ao menos uma categoria de projeto!");
                return;
            }

            const body = `Nome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}\nTipo de Projeto: ${tipo}\nValor Estimado: ${totalFinal}\n\nDescrição do Projeto:\n${descricao}`;
            const whatsappNumber = "5533991833588";
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;

            window.open(whatsappLink, "_blank");
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