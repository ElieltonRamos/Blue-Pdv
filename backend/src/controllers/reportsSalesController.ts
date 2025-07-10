import { Request, Response } from 'express';
import reportSalesService from '../services/reportsSalesService';
import mapHttpStatus from '../utils/mapStatusHttp';

const internalMsgError = 'Internal server error';

async function generateReportByDate(req: Request, res: Response) {
  try {
    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).json({ message: 'E necessario informar a data para o relatorio' });
    }
    const filters = {
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
    };
    const { status, data } = await reportSalesService.generateReportByDate(filters);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error get report:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

export default {
  generateReportByDate,
};
