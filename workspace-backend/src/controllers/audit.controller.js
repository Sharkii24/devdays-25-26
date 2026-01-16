import auditService from '../services/audit.service.js';

export const getAllAudits = async (req, res) => {
    try {
        const audits = await auditService.getAllAudits();
        res.status(200).json(audits);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAuditById = async (req, res) => {
    const auditId = req.params.auditId;
    try {
        const audit = await auditService.getAuditById(auditId);
        if (audit) {
            res.status(200).json(audit);
        } else {
            res.status(404).json({ message: 'Audit not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const auditIssues = async (req, res) => {
    try {
        const savedAudit = await auditService.auditIssues();
        res.status(200).json(savedAudit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};