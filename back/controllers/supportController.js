const SupportModel = require('../model/supportModel');

const allowedProblemTypes = [
    'Problemas de cuenta y acceso',
    'Falla en la carga de datos/archivos',
    'Errores de interfaz',
    'Sugerencia de mejora/comentarios'
];

exports.createReport = async (req, res) => {
    try {
        const usuario = req.user || req.session?.user;
        if (!usuario) {
            return res.status(401).json({ error: 'Sesión expirada o no iniciada' });
        }

        const { tipo_problema, descripcion, url_evidencia } = req.body;

        if (!tipo_problema || !allowedProblemTypes.includes(tipo_problema)) {
            return res.status(400).json({ error: 'Tipo de problema inválido' });
        }
        if (!descripcion || descripcion.trim().length === 0) {
            return res.status(400).json({ error: 'La descripción es obligatoria' });
        }
        if (descripcion.length > 1000) {
            return res.status(400).json({ error: 'La descripción no puede exceder 1000 caracteres' });
        }
        if (url_evidencia && url_evidencia.length > 255) {
            return res.status(400).json({ error: 'La URL de evidencia es demasiado larga' });
        }

        const { data, error } = await SupportModel.create({
            usuario_id: usuario.id,
            tipo_problema,
            descripcion,
            url_evidencia: url_evidencia || null
        });

        if (error) {
            console.error('Error al guardar el reporte de soporte:', error);
            throw error;
        }

        res.status(201).json({ message: 'Reporte de soporte enviado correctamente', ticket: data[0] });
    } catch (err) {
        console.error('Error en supportController.createReport:', err);
        res.status(500).json({ error: 'No se pudo crear el reporte de soporte' });
    }
};
