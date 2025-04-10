// Salva o cronograma
function salvarCronograma() {
    const cronograma = {
      segunda: document.getElementById("segunda").value,
      terca: document.getElementById("terca").value,
      quarta: document.getElementById("quarta").value,
      quinta: document.getElementById("quinta").value,
      sexta: document.getElementById("sexta").value,
      sabado: document.getElementById("sabado").value,
      domingo: document.getElementById("domingo").value,
    };
    localStorage.setItem("meuCronograma", JSON.stringify(cronograma));
    document.getElementById("mensagemCronograma").innerText = "✅ Cronograma salvo com sucesso!";
  }
  
  // Mostra a etapa do dia baseado no cronograma salvo
  function mostrarEtapaDoDia() {
    const cronogramaSalvo = localStorage.getItem("meuCronograma");
    if (cronogramaSalvo) {
      const cronograma = JSON.parse(cronogramaSalvo);
      const dias = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
      const hoje = new Date().getDay();
      const nomeDia = dias[hoje];
      const etapaDeHoje = cronograma[nomeDia] || "Nenhuma etapa programada 💤";
      document.getElementById("etapa").innerText = etapaDeHoje;
    }
  }
  
  // Marca como feito e mostra pop-up com estrelinhas
  function marcarFeito() {
    const hoje = new Date().toDateString();
    localStorage.setItem("etapaFeitaHoje", hoje);
    document.getElementById("mensagem").innerText = "Prontinho! Etapa marcada com sucesso!✨";
  
    const popup = document.createElement("div");
    popup.className = "popup-confirmacao";
    popup.innerText = "✨ Etapa marcada, diva! ✨";
    document.body.appendChild(popup);
  
    setTimeout(() => popup.remove(), 3000);
  
    for (let i = 0; i < 10; i++) {
      const estrela = document.createElement("div");
      estrela.className = "estrelas";
      estrela.innerText = "✨";
      estrela.style.left = `${50 + Math.random() * 40 - 20}%`;
      estrela.style.top = `${50 + Math.random() * 40 - 20}%`;
      document.body.appendChild(estrela);
      setTimeout(() => estrela.remove(), 1000);
    }
  }
  
  // Verifica se a etapa de hoje foi marcada
  function verificarEtapaFeita() {
    const hoje = new Date().toDateString();
    const feito = localStorage.getItem("etapaFeitaHoje");
    if (feito === hoje) {
      document.getElementById("mensagem").innerText = "Prontinho! Etapa marcada com sucesso!✨";
    }
  }
  
  // Salva anotação
  function salvarAnotacao() {
    const texto = document.getElementById("anotacao").value;
    if (texto.trim() !== "") {
      document.getElementById("confirmacao").innerText = "Anotação salva com sucesso!💾📝";
    } else {
      document.getElementById("confirmacao").innerText = "Por favor, escreve algo antes de salvar!😅";
    }
  }
  
  // Gera cronograma automático com produtos recomendados
  function gerarCronogramaAutomatico() {
    const estado = document.getElementById("estadoCabelo").value;
  
    if (!estado) {
      alert("Escolha um estado do cabelo primeiro! 💇‍♀️");
      return;
    }
  
    const cronogramas = {
      danificado: {
        segunda: "Reconstrução (Ex: Joico K-PAK, Lola Argan Oil)",
        terca: "Nutrição (Ex: Elseve Óleo Extraordinário)",
        quarta: "Hidratação (Ex: Skala Babosa)",
        quinta: "Descanso 💤",
        sexta: "Reconstrução (Ex: Kérastase Force Architecte)",
        sabado: "Nutrição (Ex: Novex Óleo de Coco)",
        domingo: "Hidratação (Ex: Yamasterol)"
      },
      ressecado: {
        segunda: "Hidratação (Ex: Skala Mais Cachos)",
        terca: "Nutrição (Ex: Garnier Fructis Nutritivo)",
        quarta: "Hidratação (Ex: Salon Line Babosa)",
        quinta: "Descanso 💤",
        sexta: "Nutrição (Ex: Lola Morte Súbita)",
        sabado: "Hidratação (Ex: Kanechom Hidratação Intensa)",
        domingo: "Umectação com óleo (Ex: Óleo de Rícino, Coco ou Argan)"
      },
      oleoso: {
        segunda: "Hidratação leve (Ex: Scala Jaborandi)",
        terca: "Descanso 💤",
        quarta: "Hidratação (Ex: Lola Chá Verde)",
        quinta: "Nutrição leve (Ex: Máscara com babosa e óleos leves)",
        sexta: "Descanso 💤",
        sabado: "Hidratação (Ex: Seda Pureza Detox)",
        domingo: "Nutrição leve (Ex: Óleo de Semente de Uva)"
      },
      normal: {
        segunda: "Hidratação (Ex: Skala Ceramidas)",
        terca: "Nutrição (Ex: Novex Óleo de Coco)",
        quarta: "Hidratação (Ex: Pantene Brilho Extremo)",
        quinta: "Descanso 💤",
        sexta: "Reconstrução leve (Ex: G.Hair Queratina)",
        sabado: "Hidratação (Ex: Yamasterol)",
        domingo: "Nutrição (Ex: Garnier Óleo Reparação)"
      }
    };
  
    const resultado = cronogramas[estado];
    localStorage.setItem("meuCronograma", JSON.stringify(resultado));
    localStorage.setItem("estadoCabelo", estado);
  
    let html = "";
    for (let dia in resultado) {
      html += `<p><strong>${dia.charAt(0).toUpperCase() + dia.slice(1)}:</strong> ${resultado[dia]}</p>`;
    }
  
    document.getElementById("cronogramaResultado").innerHTML = html;
    document.getElementById("inicio").style.display = "none";
    document.getElementById("cronogramaSugerido").style.display = "block";
  
    mostrarEtapaDoDia();
  }
  
  // Quando o app abrir, já carrega o cronograma e as infos salvas
  document.addEventListener("DOMContentLoaded", () => {
    mostrarEtapaDoDia();
    verificarEtapaFeita();
  
    // Se já tiver cronograma salvo, exibe ele
    if (localStorage.getItem("estadoCabelo")) {
      const cronograma = JSON.parse(localStorage.getItem("meuCronograma"));
      let html = "";
      for (let dia in cronograma) {
        html += `<p><strong>${dia.charAt(0).toUpperCase() + dia.slice(1)}:</strong> ${cronograma[dia]}</p>`;
      }
      document.getElementById("cronogramaResultado").innerHTML = html;
      document.getElementById("inicio").style.display = "none";
      document.getElementById("cronogramaSugerido").style.display = "block";
    }
  });
  
  