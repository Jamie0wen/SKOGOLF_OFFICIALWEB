// =========================================================
// CONTACT.JS — contact.html only
// Load AFTER base.js.
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // ===== CHARACTER COUNTER =====
    // ==============================
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (textarea && charCount) {
        const maxLength = textarea.maxLength > 0 ? textarea.maxLength : 500;

        const updateCount = () => {
            const charLength = textarea.value.length;
            charCount.textContent = `${charLength} / ${maxLength} characters`;

            charCount.classList.remove('halfway', 'warning', 'limit');

            if (charLength >= maxLength) {
                charCount.classList.add('limit');       // red
            } else if (charLength >= maxLength * 0.75) {
                charCount.classList.add('warning');      // orange
            } else if (charLength >= maxLength * 0.5) {
                charCount.classList.add('halfway');       // yellow
            }
        };

        textarea.addEventListener('input', updateCount);
        updateCount();
    }

    // ==============================
    // ===== FORM SUBMIT (Formspree, redirect to success.html) =====
    // NOTE: there is only ONE listener here. The original
    // script.js accidentally attached this exact same listener
    // twice, which submitted every message to Formspree twice.
    // (removed from window.location.href /SKOGOLF_OFFICIALWEB/ , may need changing with new domain)
    // ==============================
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    window.location.href = 'success.html';
                } else {
                    alert('Error submitting form');
                }
            } catch (error) {
                alert('Network error');
            }
        });
    }

});