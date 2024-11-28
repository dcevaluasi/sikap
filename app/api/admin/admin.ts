import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const randomId = Math.random().toString(36).substring(2, 10);
    res.redirect(307, `/${randomId}/auth/login`);
}
