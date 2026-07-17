document.addEventListener("DOMContentLoaded", function() {

    // Menu mobile
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    // --- Orçamento ---
    const tipoProjeto = document.getElementById("tipo-projeto");
    const adicionais = document.querySelectorAll(".adicional");
    const valorTotalSpan = document.getElementById("valor-total");

    function calcularOrcamento() {
        if (!tipoProjeto || !valorTotalSpan) return;
        let baseValue = parseFloat(tipoProjeto.value) || 0;
        let additionalValue = 0;
        adicionais.forEach(function(checkbox) {
            if (checkbox.checked) {
                additionalValue += parseFloat(checkbox.value);
            }
        });
        let total = baseValue + additionalValue;
        valorTotalSpan.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    if (tipoProjeto) {
        tipoProjeto.addEventListener("change", calcularOrcamento);
        adicionais.forEach(cb => cb.addEventListener("change", calcularOrcamento));
        calcularOrcamento();
    }

    // --- Contato via WhatsApp (corrigido) ---
    const formContato = document.getElementById("form-contato");
    if (formContato) {
        formContato.addEventListener("submit", function(event) {
            event.preventDefault();
            const nome = document.getElementById("contato-nome").value.trim();
            const email = document.getElementById("contato-email").value.trim();
            const mensagem = document.getElementById("contato-mensagem").value.trim();
            const text = `Olá! Vim pelo site Durand Tech System\n\nNome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`;
            window.open(`https://wa.me/5553991833588?text=${encodeURIComponent(text)}`, "_blank");
        });
    }

    // --- Orçamento via WhatsApp ---
    const form = document.getElementById("form-orcamento");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const email = document.getElementById("email").value.trim();
            const tipoEl = document.getElementById("tipo-projeto");
            const tipoText = tipoEl.options[tipoEl.selectedIndex].text;
            const descricao = document.getElementById("descricao").value.trim();
            const totalFinal = valorTotalSpan ? valorTotalSpan.textContent : "a combinar";

            if (tipoEl.value === "0") {
                alert("Por favor, selecione ao menos uma categoria de projeto!");
                return;
            }

            let adicionaisTxt = [];
            document.querySelectorAll(".adicional:checked").forEach(cb => {
                adicionaisTxt.push(cb.parentElement.textContent.trim());
            });

            const body = `*Novo Orçamento - Durand Tech*\n\nNome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}\nProjeto: ${tipoText}\nAdicionais: ${adicionaisTxt.join(", ") || "Nenhum"}\nValor Estimado: ${totalFinal}\n\nDescrição:\n${descricao}`;
            window.open(`https://wa.me/5553991833588?text=${encodeURIComponent(body)}`, "_blank");
        });
    }

    // --- Scroll Ativo ---
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");
    const skillsSection = document.getElementById("habilidades");
    const skillProgressBars = document.querySelectorAll(".skill-progress");

    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight - 120 && rect.bottom >= 0;
    }

    function animateSkillBars() {
        if (!skillsSection || skillsSection.classList.contains("skills-animated")) return;
        if (isInViewport(skillsSection)) {
            skillProgressBars.forEach(bar => {
                bar.style.width = bar.dataset.progress + "%";
            });
            skillsSection.classList.add("skills-animated");
        }
    }

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });
        navItems.forEach(a => {
            a.classList.remove("active");
            if (current && a.getAttribute("href") && a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
        animateSkillBars();
    });

    animateSkillBars();
});
