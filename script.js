document.addEventListener("DOMContentLoaded", function () {

  // --- LÓGICA PARA OS MODAIS DE PROJETOS ---

  const projectCards = document.querySelectorAll(".project-card-new");

  const modals = document.querySelectorAll(".modal-backdrop");

  const body = document.body;



  projectCards.forEach((card) => {

    card.addEventListener("click", () => {

      const modalId = card.getAttribute("data-modal");

      const modal = document.getElementById(modalId);

      if (modal) {

        // ATUALIZADO: Altera o estilo 'display' para mostrar o modal

        modal.style.display = "flex";

        body.style.overflow = "hidden"; // Impede o scroll da página ao fundo

      }

    });

  });



  modals.forEach((modal) => {

    // Evento para fechar no botão 'x'

    const closeButton = modal.querySelector(".modal-close");

    if (closeButton) {

      closeButton.addEventListener("click", () => {

        // ATUALIZADO: Altera o estilo 'display' para esconder o modal

        modal.style.display = "none";

        body.style.overflow = "auto"; // Restaura o scroll

      });

    }



    // Evento para fechar clicando fora do modal (no backdrop)

    modal.addEventListener("click", function (event) {

      if (event.target === modal) {

        // ATUALIZADO: Altera o estilo 'display' para esconder o modal

        modal.style.display = "none";

        body.style.overflow = "auto"; // Restaura o scroll

      }

    });

  });



  // --- LÓGICA PARA O FILTRO DE PROJETOS ---

  const filterButtons = document.querySelectorAll(".filter-btn");

  const projects = document.querySelectorAll(".project-card-new");



  filterButtons.forEach((button) => {

    button.addEventListener("click", function () {

      // Remove a classe 'active' de todos os botões

      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona 'active' ao botão clicado

      this.classList.add("active");



      const filter = this.getAttribute("data-filter");



      projects.forEach((project) => {

        const category = project.getAttribute("data-category");

        if (filter === "all" || category.includes(filter)) {

          project.classList.remove("hide");

        } else {

          project.classList.add("hide");

        }

      });

    });

  });



  // --- LÓGICA PARA O FORMULÁRIO DE CONTATO (AJAX) ---

  const form = document.getElementById("contactForm");

  const formMessage = document.getElementById("formMessage");



  if (form) {

    form.addEventListener("submit", function (e) {

      e.preventDefault(); // Impede o recarregamento da página



      const submitButton = form.querySelector('button[type="submit"]');

      const originalButtonText = submitButton.textContent;

      submitButton.textContent = "Enviando...";

      submitButton.disabled = true;



      const formData = new FormData(form);

      const data = {};

      formData.forEach((value, key) => {

        data[key] = value;

      });



      fetch(form.action, {

        method: "POST",

        body: JSON.stringify(data), // Envia os dados como JSON

        headers: {

          "Content-Type": "text/plain;charset=utf-8", // Tipo de conteúdo para o Google Apps Script

        },

      })

        .then((response) => response.json())

        .then((data) => {

          if (data.result === "success") {

            form.reset(); // Limpa o formulário

            formMessage.textContent = "Mensagem enviada com sucesso! Obrigado.";

            formMessage.className = "form-message success";

            formMessage.style.display = "block";

          } else {

            throw new Error(data.message || "Ocorreu um erro.");

          }

        })

        .catch((error) => {

          formMessage.textContent =

            "Erro ao enviar a mensagem. Tente novamente.";

          formMessage.className = "form-message error";

          formMessage.style.display = "block";

          console.error("Error:", error);

        })

        .finally(() => {

          submitButton.textContent = originalButtonText;

          submitButton.disabled = false;

          // Esconde a mensagem após alguns segundos

          setTimeout(() => {

            formMessage.style.display = "none";

          }, 5000);

        });

    });

  }

});
        }, 5000);
      });
    });
  }
});
