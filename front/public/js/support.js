async function submitSupportReport() {
    const tipo = document.getElementById('supportProblemType').value;
    const descripcion = document.getElementById('supportDescription').value.trim();
    const fileInput = document.getElementById('supportEvidenceFile');
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
        const formData = new FormData();
        formData.append('tipo_problema', tipo);
        formData.append('descripcion', descripcion);
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const f = fileInput.files[0];
            if (!f.type.startsWith('image/')) {
                throw new Error('La evidencia debe ser una imagen');
            }
            formData.append('evidencia', f);
        }

        const response = await fetch('/api/support', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'No se pudo enviar el reporte');
        }

        await showSuccess('Reporte enviado', 'Tu solicitud de soporte ha sido enviada correctamente.');
        document.getElementById('supportProblemType').value = '';
        document.getElementById('supportDescription').value = '';
        if (fileInput) fileInput.value = '';
        const supportModal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
        supportModal?.hide();
    } catch (error) {
        errorContainer.textContent = error.message;
        errorContainer.classList.remove('d-none');
    }
}
