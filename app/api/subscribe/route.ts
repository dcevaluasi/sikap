import type { NextApiRequest, NextApiResponse, NextComponentType } from "next";
import {z} from 'zod'

type Data = {
    status: string;
    error: string;
}

const Input = z.object({
    nik: z.string(),
    captcha: z.string(),
})

const verifyEndpoint = 'https://www.google.com/recaptcha/api/siteverify'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    if (req.method === "POST") {
      // Validate request
      const data = Input.parse(req.body);
      const { nik, captcha } = data;
  
      // Validate a "token" that the client-side reCAPTCHA script generated for the user
      const captchaResponse = await fetch(verifyEndpoint, {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY, 
          response: captcha, 
        }),
      }).then((res) => res.json());
  
      // If the verification fails, return 500x code
      if (!captchaResponse.success) {
        return res
          .status(500)
          .json({ status: "error", error: captchaResponse["error-codes"][0] });
      }
  
      // If verification succeeds, create a contact with your email provider
      // (this is just a mock)
      await myEmailProvider.addContact(email);
  
      res.status(200).json({ status: "ok" });
    } else {
      res.status(404); // Unhandled HTTP request
    }
  }