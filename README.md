# MASS Payroll Solutions website

React + Vite + Tailwind CSS v4 rebuild of the "Option D" design.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

- Copy (phone numbers, payslip, benefits) lives in `src/content.js`.
- Sections are components in `src/components/`.
- Design tokens and custom utilities are in `src/index.css`.

## Build and deploy to S3

```bash
npm run build                                   # outputs static files to dist/
aws s3 sync dist/ s3://<your-bucket> --delete   # upload
```

`vite.config.js` sets `base: './'`, so the build works from any bucket or folder.
`public/brochure.pdf` is copied into the build as-is.

The contact form has no backend: it opens WhatsApp (+91 98409 92989) with the visitor's details filled in.
