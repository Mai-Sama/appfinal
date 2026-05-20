async function submitSupportReport() {
    const tipo = document.getElementById('supportProblemType').value;
    const descripcion = document.getElementById('supportDescription').value.trim();
    const urlEvidencia = document.getElementById('supportEvidenceUrl').value.trim();
    const errorContainer = document.getElementById('supportError');

    errorContainer.classList.add('d-none');
    errorContainer.textContent = '';

    if (!tipo) {
        errorContainer.textContent = 'Selecciona el tipo de problema.';
        errorContainer.classList.remove('d-none');
        return;
    }
    if (!descripcion) {
        errorContainer.textContent = 'Describe el problema para que podamos ayudarte.';
        errorContainer.classList.remove('d-none');
        return;
    }

    try {
        const response = await fetch('/api/support', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                tipo_problema: tipo,
                descripcion,
                url_evidencia: urlEvidencia || null
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'No se pudo enviar el reporte');
        }

        await showSuccess('Reporte enviado', 'Tu solicitud de soporte ha sido enviada correctamente.');
        document.getElementById('supportProblemType').value = '';
        document.getElementById('supportDescription').value = '';
        document.getElementById('supportEvidenceUrl').value = '';
        const supportModal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
        supportModal?.hide();
    } catch (error) {
        errorContainer.textContent = error.message;
        errorContainer.classList.remove('d-none');
    }
}
