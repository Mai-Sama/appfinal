const supabase = require('../config/db');

class SupportModel {
    static async create(reportData) {
        const { data, error } = await supabase
            .from('reportes_soporte')
            .insert([{
                usuario_id: reportData.usuario_id,
                tipo_problema: reportData.tipo_problema,
                descripcion: reportData.descripcion,
                url_evidencia: reportData.url_evidencia,
                estado: 'pendiente'
            }])
            .select();
        return { data, error };
    }
}

module.exports = SupportModel;
