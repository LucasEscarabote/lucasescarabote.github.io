    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        if (contactForm && formMessage) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

                formMessage.style.display = 'none'; // Esconde mensagens anteriores
                formMessage.classList.remove('success', 'error'); // Remove classes de estilo

                const formData = new FormData(contactForm);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                // Converte o objeto de dados para o formato URL-encoded
                const urlEncodedData = new URLSearchParams(data).toString();

                try {
                    // URL do seu aplicativo Google Apps Script
                    // SUBSTITUA PELO SEU URL REAL DO APPS SCRIPT
                    const scriptUrl = 'https://script.google.com/macros/s/AKfycby_2EwvnYMk_6iluhJtenX4oY1I6_d_HA14gLc_fPZXYH1_E-1bLX2NyhNFslBbGj0t/exec';

                    const response = await fetch(scriptUrl, {
                        method: 'POST',
                        mode: 'no-cors', // Importante para evitar erros CORS com o Apps Script
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: urlEncodedData,
                    });

                    // Como 'no-cors' não permite ler a resposta, assumimos sucesso aqui
                    // Em um cenário real, você faria um 'mode: cors' e leria o JSON de resposta
                    formMessage.textContent = 'Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.';
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    contactForm.reset(); // Limpa os campos do formulário

                } catch (error) {
                    console.error('Erro ao enviar o formulário:', error);
                    formMessage.textContent = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';
                    formMessage.classList.add('error');
                    formMessage.style.display = 'block';
                }
            });
        }
    });
    