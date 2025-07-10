document.addEventListener("DOMContentLoaded", function () {
  // --- LÓGICA PARA MENU HAMBÚRGUER (MOBILE) ---
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // --- LÓGICA PARA OS MODAIS DE PROJETOS ---
  const projectCards = document.querySelectorAll(".project-card-new");
  const modals = document.querySelectorAll(".modal-backdrop");
  const body = document.body;

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        body.style.overflow = "hidden";
      }
    });
  });

  modals.forEach((modal) => {
    const closeButton = modal.querySelector(".modal-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        body.style.overflow = "auto";
      });
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        body.style.overflow = "auto";
      }
    });
  });

  // --- LÓGICA PARA O FILTRO DE PROJETOS ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card-new");

  if (filterButtons.length > 0 && projects.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        projects.forEach((project) => {
          const category = project.getAttribute("data-category");
          if (filter === "all" || (category && category.includes(filter))) {
            project.style.display = "block";
          } else {
            project.style.display = "none";
          }
        });
      });
    });
  }

  // --- LÓGICA PARA O FORMULÁRIO DE CONTATO (AJAX) ---
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      const formData = new FormData(form);
      
      // O Google Apps Script espera um objeto simples, não FormData diretamente
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch(form.action, {
        method: "POST",
        // O Apps Script comumente tem problemas com 'application/json',
        // então enviamos como texto e o script do lado do Google faz o parse.
        // A forma mais robusta é criar um 'redirect' no Apps Script, mas para este caso,
        // o envio como texto plano de um objeto stringificado funciona.
        body: JSON.stringify(data),
        mode: 'no-cors', // Adicionado para evitar problemas de CORS com o redirect do Google
      })
      .then(() => {
          // Como estamos em modo 'no-cors', não podemos ler a resposta.
          // Assumimos sucesso e damos o feedback ao usuário.
          form.reset();
          formMessage.textContent = "Mensagem enviada com sucesso! Obrigado.";
          formMessage.className = "form-message success";
          formMessage.style.display = "block";
      })
      .catch((error) => {
        formMessage.textContent = "Erro ao enviar a mensagem. Tente novamente.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
        console.error("Error:", error);
      })
      .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      });
    });
  }
});
